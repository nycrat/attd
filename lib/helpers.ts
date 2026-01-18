import { now } from "./constants";
import { LiveClass } from "./types";

export function stringToTime(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);

  const today = new Date(now);

  today.setHours(hours, minutes, 0, 0);

  return today;
}

export function formatTime(datetime: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const time = `${pad(datetime.getHours() % 12 || 12)}:${pad(datetime.getMinutes())}`;
  const amPm = datetime.getHours() < 12 ? "AM" : "PM";

  return time + " " + amPm;
}

export function formatDatetime(datetime: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = datetime.getFullYear();
  const month = pad(datetime.getMonth() + 1); // 0-indexed
  const day = pad(datetime.getDate());
  const hours = pad(datetime.getHours());
  const minutes = pad(datetime.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getEnd(liveClass: LiveClass) {
  return new Date(
    stringToTime(liveClass.startTime).getTime() +
      liveClass.durationMinutes * 60000,
  );
}
