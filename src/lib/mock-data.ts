export type ClassTab =
  | "stream"
  | "classwork"
  | "people"
  | "grades"
  | "your-work"
  | "insights";

export type Classroom = {
  id: string;
  name: string;
  section: string;
  subject: string;
  room: string;
  hero: string;
  theme: string;
  classCode: string;
  meetLink: string;
  roster: number;
  completion: number;
};

export type Announcement = {
  id: string;
  author: string;
  time: string;
  title: string;
  body: string;
  tag: string;
};

export type WorkItem = {
  id: string;
  type: "Assignment" | "Quiz" | "Question" | "Material";
  title: string;
  topic: string;
  due: string;
  points?: number;
  status: "Published" | "Scheduled" | "Draft";
};

export type Person = {
  id: string;
  name: string;
  role: string;
  email: string;
  streak: string;
};

export type GradeRow = {
  student: string;
  turnedIn: number;
  missing: number;
  average: string;
  risk: string;
};

export type ReferenceImage = {
  title: string;
  note: string;
  path: string;
  source: string;
};

export const classes: Classroom[] = [
  {
    id: "biology-240",
    name: "Biology of Change",
    section: "Period 2",
    subject: "Life Science",
    room: "Lab 204",
    hero: "Signals, systems, and student momentum.",
    theme: "from-[#1f8f76] via-[#2b6f9a] to-[#f5b84f]",
    classCode: "XQ7-PLANT",
    meetLink: "meet.google.com/mock-bio-240",
    roster: 28,
    completion: 92,
  },
  {
    id: "history-studio",
    name: "World History Studio",
    section: "Advisory",
    subject: "Humanities",
    room: "Room 118",
    hero: "Context-first learning with rich source packs.",
    theme: "from-[#7d4a2f] via-[#c46b3d] to-[#f3d6a4]",
    classCode: "ARCHIVE-9",
    meetLink: "meet.google.com/mock-his-118",
    roster: 34,
    completion: 88,
  },
  {
    id: "algebra-lab",
    name: "Algebra Lab",
    section: "Period 5",
    subject: "Mathematics",
    room: "Room 306",
    hero: "Practice loops, instant feedback, confident mastery.",
    theme: "from-[#2f4f6f] via-[#305fb0] to-[#8dd4ff]",
    classCode: "PARABOLA",
    meetLink: "meet.google.com/mock-math-306",
    roster: 31,
    completion: 84,
  },
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    author: "Amina Rivera",
    time: "Today, 8:10 AM",
    title: "Field notes are live",
    body:
      "Use the new annotation template before tomorrow's lab. I added exemplars and a five-minute walkthrough.",
    tag: "Stream",
  },
  {
    id: "a2",
    author: "Amina Rivera",
    time: "Yesterday, 4:25 PM",
    title: "Meet link opens 10 minutes early",
    body:
      "Students who need extra help can join the room before class. I'll review the genetics quiz retake window there.",
    tag: "Meet",
  },
  {
    id: "a3",
    author: "Marcus Lee",
    time: "Yesterday, 11:45 AM",
    title: "Material pack updated",
    body:
      "Added a high-contrast reading version and an audio summary to support independent review.",
    tag: "Material",
  },
];

export const workItems: WorkItem[] = [
  {
    id: "w1",
    type: "Assignment",
    title: "Cell signaling storyboard",
    topic: "Unit 4 - Communication",
    due: "Mar 20, 11:59 PM",
    points: 20,
    status: "Published",
  },
  {
    id: "w2",
    type: "Quiz",
    title: "Genetics checkpoint",
    topic: "Unit 4 - Communication",
    due: "Mar 21, 9:15 AM",
    points: 15,
    status: "Published",
  },
  {
    id: "w3",
    type: "Question",
    title: "What causes a signal to amplify?",
    topic: "Seminar prep",
    due: "Mar 22, 8:00 AM",
    points: 5,
    status: "Scheduled",
  },
  {
    id: "w4",
    type: "Material",
    title: "Microscopy reference board",
    topic: "Toolkit",
    due: "Always available",
    status: "Published",
  },
  {
    id: "w5",
    type: "Assignment",
    title: "Client-requested extension: learning pathway rules",
    topic: "Prototype extras",
    due: "Drafting",
    points: 12,
    status: "Draft",
  },
];

export const people: Person[] = [
  {
    id: "p1",
    name: "Amina Rivera",
    role: "Primary teacher",
    email: "amina@northfield.edu",
    streak: "Replies within 2h",
  },
  {
    id: "p2",
    name: "Marcus Lee",
    role: "Co-teacher",
    email: "marcus@northfield.edu",
    streak: "Lab facilitator",
  },
  {
    id: "p3",
    name: "Sofia Carter",
    role: "Student",
    email: "sofia.carter@northfield.edu",
    streak: "3 assignments early",
  },
  {
    id: "p4",
    name: "Elijah Brown",
    role: "Student",
    email: "elijah.brown@northfield.edu",
    streak: "Needs check-in",
  },
  {
    id: "p5",
    name: "Nora Kim",
    role: "Student",
    email: "nora.kim@northfield.edu",
    streak: "Perfect attendance",
  },
  {
    id: "p6",
    name: "Micah Ortiz",
    role: "Guardian summary",
    email: "guardian.digest@northfield.edu",
    streak: "Weekly Friday recap",
  },
];

export const gradeRows: GradeRow[] = [
  { student: "Sofia Carter", turnedIn: 12, missing: 0, average: "98%", risk: "On track" },
  { student: "Elijah Brown", turnedIn: 9, missing: 2, average: "74%", risk: "Watch" },
  { student: "Nora Kim", turnedIn: 12, missing: 0, average: "96%", risk: "On track" },
  { student: "Javier Fox", turnedIn: 10, missing: 1, average: "88%", risk: "Stable" },
  { student: "Mia Ahmed", turnedIn: 11, missing: 0, average: "93%", risk: "On track" },
];

export const referenceImages: ReferenceImage[] = [
  {
    title: "AI tools panel",
    note: "Official Classroom product image showing a left nav and card-heavy workspace.",
    path: "/references/01-ai-tools-built-for-educators.png",
    source: "Google for Education product page",
  },
  {
    title: "Practice set interaction",
    note: "Useful for the assignment detail composition and right-side helper actions.",
    path: "/references/03-popular-integrations.png",
    source: "Google for Education product page",
  },
  {
    title: "Workspace tool ecosystem",
    note: "Good reminder that Classroom feels connected to Meet, Drive, Docs, and Calendar.",
    path: "/references/12-workspace-tools.png",
    source: "Google for Education product page",
  },
];

export function getClassroom(classId: string) {
  return classes.find((item) => item.id === classId) ?? classes[0];
}

export const tabs: Array<{ id: ClassTab; label: string }> = [
  { id: "stream", label: "Stream" },
  { id: "classwork", label: "Classwork" },
  { id: "people", label: "People" },
  { id: "grades", label: "Grades" },
  { id: "your-work", label: "Your work" },
  { id: "insights", label: "Insights+" },
];
