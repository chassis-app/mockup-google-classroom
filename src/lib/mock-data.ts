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
  teacher: string;
  hero: string;
  theme: string;
  classCode: string;
  meetLink: string;
  roster: number;
  completion: number;
  upcoming: string;
};

export type Announcement = {
  id: string;
  author: string;
  time: string;
  title: string;
  body: string;
  tag: string;
  commentCount: number;
};

export type WorkItem = {
  id: string;
  type: "Assignment" | "Quiz assignment" | "Question" | "Material";
  title: string;
  description: string;
  topic: string;
  due: string;
  postedAt?: string;
  points?: number;
  status: "Published" | "Scheduled" | "Draft";
  assigned: number;
  turnedIn: number;
  rubric?: string;
  attachments?: string[];
};

export type AssignmentDraft = {
  title: string;
  instructions: string;
  forClass: string;
  assignedTo: string;
  points: number;
  due: string;
  topic: string;
  rubric: string;
  originalityReports: boolean;
  closeSubmissions: boolean;
  attachments: string[];
};

export type SubmissionRecord = {
  id: string;
  student: string;
  status: "Turned in" | "Returned" | "Missing";
  submittedAt: string;
  grade?: string;
  note: string;
  attachment?: string;
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
    name: "Biology 240",
    section: "Period 2",
    subject: "Life Science",
    room: "Lab 204",
    teacher: "Amina Rivera",
    hero: "Weekly lab reflections, cell signaling tasks, and quick support check-ins.",
    theme: "from-[#2f6f5e] via-[#3b7e6e] to-[#5f8d7a]",
    classCode: "XQ7-PLANT",
    meetLink: "meet.google.com/mock-bio-240",
    roster: 28,
    completion: 92,
    upcoming: "Storyboard due tomorrow",
  },
  {
    id: "history-studio",
    name: "World History Seminar",
    section: "Advisory",
    subject: "Humanities",
    room: "Room 118",
    teacher: "Marcus Lee",
    hero: "Source packets, discussion questions, and rubric-based seminars.",
    theme: "from-[#6a4d8d] via-[#7c5ca4] to-[#9070b8]",
    classCode: "ARCHIVE-9",
    meetLink: "meet.google.com/mock-history-118",
    roster: 34,
    completion: 88,
    upcoming: "Primary source notes due Friday",
  },
  {
    id: "algebra-lab",
    name: "Algebra Lab",
    section: "Period 5",
    subject: "Mathematics",
    room: "Room 306",
    teacher: "Nora Patel",
    hero: "Practice sets, worked examples, and intervention checkpoints.",
    theme: "from-[#355c99] via-[#4b73b1] to-[#6488c6]",
    classCode: "PARABOLA",
    meetLink: "meet.google.com/mock-math-306",
    roster: 31,
    completion: 84,
    upcoming: "Checkpoint quiz this afternoon",
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
    commentCount: 2,
  },
  {
    id: "a2",
    author: "Amina Rivera",
    time: "Yesterday, 4:25 PM",
    title: "Meet link opens 10 minutes early",
    body:
      "Students who need extra help can join before class. I will review the quiz retake window there.",
    tag: "Meet",
    commentCount: 0,
  },
  {
    id: "a3",
    author: "Marcus Lee",
    time: "Yesterday, 11:45 AM",
    title: "Material pack updated",
    body:
      "Added a high-contrast reading version and an audio summary to support independent review.",
    tag: "Material",
    commentCount: 3,
  },
];

export const workItems: WorkItem[] = [
  {
    id: "w1",
    type: "Assignment",
    title: "Cell signaling storyboard",
    description:
      "Create a short visual explanation showing how the signal moves, amplifies, and changes the cell response.",
    topic: "Unit 4",
    due: "Mar 20, 11:59 PM",
    postedAt: "Yesterday",
    points: 100,
    status: "Published",
    assigned: 28,
    turnedIn: 21,
    rubric: "Signal pathway · Scientific vocabulary",
    attachments: ["Drive template", "YouTube exemplar", "Rubric"],
  },
  {
    id: "w2",
    type: "Quiz assignment",
    title: "Genetics checkpoint",
    description: "Submit the quiz before advisory. Scores return after teacher review.",
    topic: "Unit 4",
    due: "Mar 21, 9:15 AM",
    postedAt: "Today",
    points: 20,
    status: "Published",
    assigned: 28,
    turnedIn: 26,
    attachments: ["Google Form"],
  },
  {
    id: "w3",
    type: "Question",
    title: "What causes a signal to amplify?",
    description: "Respond before discussion. One strong paragraph is enough.",
    topic: "Seminar prep",
    due: "Mar 22, 8:00 AM",
    postedAt: "Scheduled for tomorrow",
    points: 5,
    status: "Scheduled",
    assigned: 28,
    turnedIn: 0,
  },
  {
    id: "w4",
    type: "Material",
    title: "Microscopy reference board",
    description: "Always-on support material for lab setup and vocabulary review.",
    topic: "Resources",
    due: "Always available",
    postedAt: "Last week",
    status: "Published",
    assigned: 28,
    turnedIn: 0,
    attachments: ["Slide deck", "Vocabulary sheet"],
  },
  {
    id: "w5",
    type: "Assignment",
    title: "Learning pathway check-in",
    description: "Client extension surface for differentiated follow-up work and pacing prompts.",
    topic: "Prototype extras",
    due: "Drafting",
    postedAt: "Draft",
    points: 12,
    status: "Draft",
    assigned: 12,
    turnedIn: 0,
    attachments: ["Reflection template"],
  },
];

export const assignmentDraft: AssignmentDraft = {
  title: "Create your first video reflection",
  instructions:
    "Record a two-minute walkthrough of how the signal starts, amplifies, and changes the cell response. Use the storyboard template before you upload.",
  forClass: "Biology 240",
  assignedTo: "All students",
  points: 100,
  due: "Fri, Mar 22, 11:59 PM",
  topic: "Unit 4",
  rubric: "Signal pathway rubric",
  originalityReports: true,
  closeSubmissions: true,
  attachments: ["Drive", "YouTube", "Create", "Upload", "Link"],
};

export const submissionRecords: Record<string, SubmissionRecord[]> = {
  w1: [
    {
      id: "s1",
      student: "Sofia Carter",
      status: "Turned in",
      submittedAt: "Today, 8:14 AM",
      grade: "Draft 96/100",
      note: "Clear explanation and strong use of vocabulary.",
      attachment: "Storyboard video.mp4",
    },
    {
      id: "s2",
      student: "Elijah Brown",
      status: "Missing",
      submittedAt: "No submission yet",
      note: "Needs check-in before the due date closes.",
    },
    {
      id: "s3",
      student: "Nora Kim",
      status: "Returned",
      submittedAt: "Yesterday, 6:22 PM",
      grade: "100/100",
      note: "Excellent storyboard and strong explanation of amplification.",
      attachment: "Storyboard-v2.mov",
    },
  ],
  w2: [
    {
      id: "s4",
      student: "Sofia Carter",
      status: "Returned",
      submittedAt: "Today, 9:02 AM",
      grade: "19/20",
      note: "One missed genetics vocabulary item.",
      attachment: "Genetics checkpoint",
    },
  ],
};

export const people: Person[] = [
  {
    id: "p1",
    name: "Amina Rivera",
    role: "Primary teacher",
    email: "amina@northfield.edu",
    streak: "Replies within 2 hours",
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
    note: "Reinforces that Classroom feels tied to Meet, Drive, Docs, and Calendar.",
    path: "/references/12-workspace-tools.png",
    source: "Google for Education product page",
  },
];

export function getClassroom(classId: string) {
  return classes.find((item) => item.id === classId) ?? classes[0];
}

export function getWorkItem(workId: string) {
  return workItems.find((item) => item.id === workId) ?? workItems[0];
}

export function getSubmissionRecords(workId: string) {
  return submissionRecords[workId] ?? [];
}

export const tabs: Array<{ id: ClassTab; label: string }> = [
  { id: "stream", label: "Stream" },
  { id: "classwork", label: "Classwork" },
  { id: "people", label: "People" },
  { id: "grades", label: "Grades" },
  { id: "your-work", label: "Your work" },
  { id: "insights", label: "Insights+" },
];
