import { now } from "./constants";

export function stringToTime(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);

  const today = now;

  today.setHours(hours, minutes, 0, 0);

  return today;
}

export function formatTime(datetime: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${pad(datetime.getHours())}:${pad(datetime.getMinutes())}`;
}
