import { neon } from "@neondatabase/serverless";
import { EmptyRoom } from "@/lib/types";

interface ClassRow {
  location: string;
  startTime: string;
  durationMinutes: number;
  capacity: number;
}

function parseLocation(location: string): {
  buildingCode: string;
  roomNumber: string;
} {
  const match = location.match(/^([A-Za-z]+)\s*(\d+.*)$/);
  if (match) {
    return { buildingCode: match[1].toUpperCase(), roomNumber: match[2] };
  }
  return { buildingCode: location.toUpperCase(), roomNumber: "" };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;
  const nowParam = params.get("now");

  if (typeof nowParam != "string") {
    return Response.json([]);
  }

  const now = new Date(nowParam);
  const weekday = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeMinutes = currentHour * 60 + currentMinute;

  const sql = neon(`${process.env.DATABASE_URL}`);

  const allClasses = (await sql`
    SELECT location, "startTime", "durationMinutes", capacity
    FROM live_classes
    WHERE weekday = ${weekday}
      AND instructor != ''
    ORDER BY "startTime" ASC
  `) as ClassRow[];

  const roomsMap = new Map<
    string,
    { capacity: number; roomNumber: string; buildingCode: string }
  >();

  for (const cls of allClasses) {
    if (!roomsMap.has(cls.location)) {
      const { buildingCode, roomNumber } = parseLocation(cls.location);
      roomsMap.set(cls.location, {
        capacity: cls.capacity,
        roomNumber,
        buildingCode,
      });
    }
  }

  const activeClasses = allClasses.filter((cls) => {
    const [hours, minutes] = cls.startTime.split(":").map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + cls.durationMinutes;
    return (
      startMinutes <= currentTimeMinutes && endMinutes > currentTimeMinutes
    );
  });

  const activeLocations = new Set(activeClasses.map((c) => c.location));

  const emptyRooms: EmptyRoom[] = [];

  for (const [location, roomInfo] of roomsMap) {
    if (activeLocations.has(location)) {
      continue;
    }

    const locationClasses = allClasses.filter((c) => c.location === location);

    const nextClassStartMinutes = locationClasses
      .map((c) => {
        const [h, m] = c.startTime.split(":").map(Number);
        return h * 60 + m;
      })
      .filter((startMins) => startMins > currentTimeMinutes)
      .sort((a, b) => a - b)[0];

    const dayEndMinutes = 21 * 60;

    const availableUntilMinutes = nextClassStartMinutes || dayEndMinutes;
    const minutesAvailable = availableUntilMinutes - currentTimeMinutes;

    if (minutesAvailable >= 30) {
      const untilDate = new Date(now);
      untilDate.setHours(
        Math.floor(availableUntilMinutes / 60),
        availableUntilMinutes % 60,
        0,
        0,
      );

      emptyRooms.push({
        location,
        buildingCode: roomInfo.buildingCode,
        roomNumber: roomInfo.roomNumber,
        capacity: roomInfo.capacity,
        availableFrom: now.toISOString(),
        availableUntil: untilDate.toISOString(),
        minutesAvailable,
      });
    }
  }

  emptyRooms.sort((a, b) => b.minutesAvailable - a.minutesAvailable);

  return Response.json(emptyRooms.slice(0, 100));
}
