import { Course, LiveClass } from './types';

// ai generated fake courses 

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: '1',
    code: 'CPSC 310',
    name: 'Software Engineering',
    section: '101',
    location: 'DMP 110',
    instructor: 'Prof. Reid',
    description: 'Introduction to software development processes.',
    sneakScore: 'High',
    level: 'Intermediate',
    duration: 90,
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    directions: 'https://maps.google.com/?q=DMP+UBC',
    progress: 65
  },
  {
    id: '2',
    code: 'ECON 101',
    name: 'Microeconomics',
    section: '202',
    location: 'BUCH A101',
    instructor: 'Prof. Gateman',
    description: 'Fundamental principles of microeconomics.',
    sneakScore: 'Low',
    level: 'Beginner',
    duration: 60,
    startTime: '1:00 PM',
    endTime: '2:00 PM',
    directions: 'https://maps.google.com/?q=Buchanan+Building+UBC',
    progress: 85
  },
  {
    id: '3',
    code: 'PHYS 401',
    name: 'Quantum Mechanics',
    section: '001',
    location: 'HEBB 10',
    instructor: 'Prof. Singh',
    description: 'Advanced study of quantum systems.',
    sneakScore: 'Medium',
    level: 'Advanced',
    duration: 120,
    startTime: '2:30 PM',
    endTime: '4:30 PM',
    directions: 'https://maps.google.com/?q=Hebb+Theatre+UBC',
    progress: 20
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    code: 'ASTR 101',
    name: 'Introduction to the Solar System',
    section: '101',
    location: 'Hebb Theatre 101',
    instructor: 'Dr. Stella',
    description: 'A survey of the celestial bodies in our cosmic neighborhood, from the blistering surface of Mercury to the icy reaches of the Oort Cloud.',
    sneakScore: 'High',
    level: 'Beginner',
    duration: 50,
    startTime: '9:00 AM',
    endTime: '9:50 AM',
    directions: 'https://maps.google.com/?q=Hebb+Theatre+UBC',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-1hb3J6NhQ9XdNUFR6Hj-z7ca9Gq_X0xldxNGhl2AiPxLAMUGSqkHINW8gOctW237atk36cHYvbzHJDv91YwL5eC5GTc6mI6VKDvrB0efEVN61FRaechXd1yc4DEZwhJZvpmsyPy8i4qvjlT2IgehMX_5NRVF9yP_zTnZrjizzLGVI06_J7HlkyJtPzOB2Jc8bQMHMho2811ax8QuAX_TsXAyFLja9eI0wrseiNJYFUMxXQoCMRtKxx-4Wf7y2HVzCWs9Pkqv2tAb'
  },
  {
    id: 'c2',
    code: 'PHYS 310',
    name: 'Principles of Astrophysics',
    section: '201',
    location: 'MacLeod 202',
    instructor: 'Dr. Orbit',
    description: 'Exploring the physical processes governing stars, galaxies, and the universe at large. Includes hands-on telescope data analysis.',
    sneakScore: 'Medium',
    level: 'Intermediate',
    duration: 180,
    startTime: '2:00 PM',
    endTime: '5:00 PM',
    directions: 'https://maps.google.com/?q=MacLeod+Building+UBC',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq9UBR37pFKOdNmw2Y2F2bA3nmj5Uf43a5mFct2GsBdZvR10R24DaVE-3xzC8PRDs_cjTHDNaws68eynvlNVePSi7SgFxnEusBtN_hIBctLxTLjWB04cgqxzhrG-uZmlIyZPtuelSIXDNAOe3EC9WI3FWCp3yl_MWEQ0CnzFKy-0-dfSgPEPJjNerLX6RWqN6lmsXKVgOkoH9eTtQXdWofEXaASaskFnGy7tSlQab7SemXvMEX4zwRISBHE5zcgZH5QugRTPa9YiF2'
  }
];
