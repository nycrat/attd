export interface Course {
    id: string;
    code: string; 
    name: string; 
    section: string;
    location: string;
    instructor: string;
    description: string;
    image?: string;
    sneakScore: 'High' | 'Medium' | 'Low';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: number;
    startTime: string;
    endTime: string;
    directions: string; // URL or either wayfinder or google maps (google maps set up right now )
    imageUrl: string; 
  }
  
  export interface LiveClass {
    id: string;
    code: string;
    name: string;
    section: string;
    location: string;
    instructor: string;
    description: string;
    sneakScore: 'High' | 'Medium' | 'Low';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: number;
    startTime: string;
    endTime: string;
    directions: string; 
    progress?: number;
  }