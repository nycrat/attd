export interface LiveClass {
  id: string;
  course: Course;
  instructor: string;
  location: string;
  startTime: string;
  durationMinutes: number;
  capacity: number;
  sneakScore: "High" | "Medium" | "Low";
  type: "Lecture" | "Seminar" | "Lab";
  weekday: number;
}

export interface EmptyRoom {
  location: string;
  buildingCode: string;
  roomNumber: string;
  capacity: number;
  availableFrom: string;
  availableUntil: string;
  minutesAvailable: number;
}

export interface Course {
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}
