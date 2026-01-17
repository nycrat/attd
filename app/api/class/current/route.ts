import { LiveClass } from "@/app/types";

export async function GET() {
	const res: LiveClass[] = [
		{
			id: "",
			course: {
				code: "CPSC 110",
				name: "How to get the name?",
				description: "idk gemini help us",
				imageUrl: "",
				level: "Beginner",
			},
			instructor: "Ronald Garcia",
			location: "SWNG 102",
			startTime: "13:30",
			durationMinutes: 60,
			capacity: 200,
			sneakScore: "High",
		},
		{
			id: "",
			course: {
				code: "CPSC 121",
				name: "How to get the name?",
				description: "idk gemini help us",
				imageUrl: "",
				level: "Beginner",
			},
			instructor: "Karina Mochetti",
			location: "SWNG 201",
			startTime: "13:30",
			durationMinutes: 90,
			capacity: 200,
			sneakScore: "High",
		},
	];
	return Response.json(res);
}
