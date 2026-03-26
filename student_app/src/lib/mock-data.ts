export type ClassTab = "stream" | "classwork" | "people" | "grades" | "your-work";

export type StudentClass = {
  id: string;
  name: string;
  section: string;
  subject: string;
  room: string;
  teacher: string;
  teacherEmail: string;
  hero: string;
  theme: string;
  accent: string;
  classCode: string;
  upcoming: string;
  roster: number;
  inviteState?: "invited";
};

export type Announcement = {
  id: string;
  classId: string;
  author: string;
  time: string;
  body: string;
  tag: string;
};

export type Attachment = {
  id: string;
  title: string;
  kind: "Drive file" | "Google Form" | "Link" | "YouTube" | "Doc" | "Slides";
  subtitle: string;
};

export type WorkItem = {
  id: string;
  classId: string;
  type: "Assignment" | "Question" | "Quiz assignment" | "Material";
  title: string;
  topic: string;
  due: string;
  points?: number;
  summary: string;
  instructions: string;
  attachments: Attachment[];
  state: "Assigned" | "Turned in" | "Missing" | "Returned" | "Done";
  submittedAt?: string;
  grade?: string;
  answer?: string;
  formLabel?: string;
};

export type Person = {
  id: string;
  classId: string;
  name: string;
  role: "Teacher" | "Student";
  email: string;
};

export type CalendarEvent = {
  id: string;
  classId: string;
  title: string;
  date: number;
  month: string;
  type: "Assignment" | "Quiz" | "Question";
};

export type PrivateComment = {
  id: string;
  workId: string;
  author: string;
  text: string;
  time: string;
};

export const studentProfile = {
  name: "Monevuu Student",
  email: "monevuu@student.demo.edu",
};

export const classes: StudentClass[] = [
  {
    id: "math-class",
    name: "Math Class",
    section: "Basic Algebra",
    subject: "Mathematics",
    room: "Room 203",
    teacher: "Ross Geller",
    teacherEmail: "ross.geller@demo.edu",
    hero: "Homework, quiz warmups, and extension practice all live here.",
    theme: "from-[#e53935] via-[#ef5350] to-[#ff8a80]",
    accent: "#d93025",
    classCode: "MATH-452",
    upcoming: "Fibonacci quiz opens April 29",
    roster: 31,
  },
  {
    id: "english-class",
    name: "English Class",
    section: "Essay Composition",
    subject: "Language Arts",
    room: "Room 118",
    teacher: "Bryan Cortez Silva",
    teacherEmail: "bryan.cortez@demo.edu",
    hero: "Essays, reading responses, and class announcements.",
    theme: "from-[#1a73e8] via-[#2b7de9] to-[#5e97f6]",
    accent: "#1a73e8",
    classCode: "READ-918",
    upcoming: "Weekly Reading due Tue 8:00 AM",
    roster: 28,
  },
  {
    id: "bryants-demo",
    name: "Bryant's Demo Google Classroom",
    section: "Support Communications",
    subject: "Demo",
    room: "Online",
    teacher: "Bryant S.",
    teacherEmail: "bryant@demo.edu",
    hero: "Reference class used for screenshots and onboarding.",
    theme: "from-[#8e24aa] via-[#ab47bc] to-[#ce93d8]",
    accent: "#9334e6",
    classCode: "BRYANT-10",
    upcoming: "Invitation pending",
    roster: 12,
    inviteState: "invited",
  },
];

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    classId: "english-class",
    author: "Bryan Cortez Silva",
    time: "Mar 27, 8:15 AM",
    body: "Be sure can edits are set correctly with your docs here.",
    tag: "Announcement",
  },
  {
    id: "ann-2",
    classId: "english-class",
    author: "Bryan Cortez Silva",
    time: "Mar 26, 3:40 PM",
    body: "Great work on your weekly reading. Check Classroom before class tomorrow for the TED Talk prompt.",
    tag: "Reminder",
  },
  {
    id: "ann-3",
    classId: "math-class",
    author: "Ross Geller",
    time: "Apr 27, 8:00 AM",
    body: "The Fibonacci sequence extension has been posted. Start with the short video before taking the quiz.",
    tag: "Classwork",
  },
];

export const workItems: WorkItem[] = [
  {
    id: "weekly-reading",
    classId: "english-class",
    type: "Assignment",
    title: "Weekly Reading",
    topic: "Assignments",
    due: "Due Tue, Apr 27",
    points: 15,
    summary: "Read the article and submit a short reflection with one quoted passage.",
    instructions:
      "Open the attached reading and answer the reflection prompt in a short paragraph. Cite one sentence from the text and explain why it matters.",
    attachments: [
      {
        id: "att-wr-1",
        title: "Weekly Reading Packet",
        kind: "Doc",
        subtitle: "Google Docs assignment",
      },
    ],
    state: "Missing",
    submittedAt: "Apr 27",
  },
  {
    id: "ted-talk",
    classId: "english-class",
    type: "Assignment",
    title: "TED Talk & three paragraphs",
    topic: "Essay Writing",
    due: "Apr 27",
    points: 100,
    summary: "Watch the video and respond with three focused paragraphs.",
    instructions:
      "Watch the attached TED Talk and write three paragraphs in your assigned doc. Paragraph one should summarize the central idea, paragraph two should analyze the speaker's strategy, and paragraph three should connect the talk to our current unit.",
    attachments: [
      {
        id: "att-ted-1",
        title: "Get the power of...",
        kind: "YouTube",
        subtitle: "youtube.com",
      },
      {
        id: "att-ted-2",
        title: "TED Talk 3 paragraph response",
        kind: "Doc",
        subtitle: "Assigned template in Drive",
      },
    ],
    state: "Assigned",
  },
  {
    id: "reading-time",
    classId: "english-class",
    type: "Assignment",
    title: "Reading Time!",
    topic: "Reading Time!",
    due: "Due Tue 8:00 AM",
    points: 10,
    summary: "Short reading check tied to this week's chapter.",
    instructions:
      "Read your chapter selection and answer the two comprehension prompts in Classroom before the bell.",
    attachments: [],
    state: "Turned in",
    submittedAt: "Turned in late at 6:07 AM",
    grade: "8/10",
  },
  {
    id: "monthly-essay",
    classId: "english-class",
    type: "Question",
    title: "Monthly Essay",
    topic: "Monthly Essay",
    due: "Due Apr 30",
    points: 20,
    summary: "Quick check-in question for your monthly essay planning.",
    instructions:
      "Free-write one paragraph explaining your thesis and the three examples you plan to use in your essay.",
    attachments: [],
    state: "Assigned",
    answer: "",
  },
  {
    id: "fibonacci-video",
    classId: "math-class",
    type: "Material",
    title: "What is the Fibonacci sequence in nature?",
    topic: "Week of April 20",
    due: "Posted Apr 27",
    summary: "Prep material for the extension lesson and quiz.",
    instructions:
      "Watch the short clip and review the note card before moving on to the extension quiz.",
    attachments: [
      {
        id: "att-fib-1",
        title: "The Fibonacci sequence looks like this",
        kind: "YouTube",
        subtitle: "Teacher attachment",
      },
    ],
    state: "Done",
  },
  {
    id: "fibonacci-extension",
    classId: "math-class",
    type: "Assignment",
    title: "Extension - Fibonacci Sequence in Nature",
    topic: "Week of April 20",
    due: "Due Wed, Apr 29",
    points: 25,
    summary: "Extension practice connecting the sequence to natural patterns.",
    instructions:
      "Review the article and image cards, then complete the extension response. Use complete sentences and cite one example from the article.",
    attachments: [
      {
        id: "att-ext-1",
        title: "Fibonacci Sequence in Nature",
        kind: "Link",
        subtitle: "Article and examples",
      },
    ],
    state: "Assigned",
  },
  {
    id: "fibonacci-quiz",
    classId: "math-class",
    type: "Quiz assignment",
    title: "Fibonacci Sequence Quiz",
    topic: "Week of April 20",
    due: "Mon, Apr 27",
    points: 10,
    summary: "Google Forms quiz on the sequence and related patterns.",
    instructions:
      "Click the attached form to begin the quiz. Once you finish the Google Form, return here and mark the assignment complete.",
    attachments: [
      {
        id: "att-quiz-1",
        title: "Fibonacci Sequence Quiz",
        kind: "Google Form",
        subtitle: "Google Forms",
      },
    ],
    state: "Returned",
    submittedAt: "Turned in Apr 27, 2:09 PM",
    grade: "9/10",
    formLabel: "View score",
  },
];

export const people: Person[] = [
  {
    id: "p-1",
    classId: "english-class",
    name: "Bryan Cortez Silva",
    role: "Teacher",
    email: "bryan.cortez@demo.edu",
  },
  {
    id: "p-2",
    classId: "english-class",
    name: "Monevuu Student",
    role: "Student",
    email: "monevuu@student.demo.edu",
  },
  {
    id: "p-3",
    classId: "english-class",
    name: "Javier Lopez",
    role: "Student",
    email: "javier.lopez@student.demo.edu",
  },
  {
    id: "p-4",
    classId: "english-class",
    name: "Emily Zhang",
    role: "Student",
    email: "emily.zhang@student.demo.edu",
  },
  {
    id: "p-5",
    classId: "math-class",
    name: "Ross Geller",
    role: "Teacher",
    email: "ross.geller@demo.edu",
  },
  {
    id: "p-6",
    classId: "math-class",
    name: "Monevuu Student",
    role: "Student",
    email: "monevuu@student.demo.edu",
  },
  {
    id: "p-7",
    classId: "math-class",
    name: "Maya Singh",
    role: "Student",
    email: "maya.singh@student.demo.edu",
  },
];

export const privateComments: PrivateComment[] = [
  {
    id: "pc-1",
    workId: "ted-talk",
    author: "Bryan Cortez Silva",
    text: "Make sure your second paragraph focuses on strategy, not summary.",
    time: "Mar 27, 9:04 AM",
  },
  {
    id: "pc-2",
    workId: "fibonacci-extension",
    author: "Ross Geller",
    text: "Use the sunflower example if you need a clearer natural pattern.",
    time: "Apr 28, 4:15 PM",
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "cal-1",
    classId: "english-class",
    title: "Assignments 10 TED Talk & 3 paragraphs",
    date: 25,
    month: "Apr 22-28, 2020",
    type: "Assignment",
  },
  {
    id: "cal-2",
    classId: "math-class",
    title: "Quiz 1 Fibonacci sequence",
    date: 29,
    month: "Apr 27-May 3, 2020",
    type: "Quiz",
  },
  {
    id: "cal-3",
    classId: "english-class",
    title: "Question Monthly Essay draft",
    date: 31,
    month: "Mar 29-Apr 4, 2020",
    type: "Question",
  },
];

export const tabs: Array<{ id: ClassTab; label: string }> = [
  { id: "stream", label: "Stream" },
  { id: "classwork", label: "Classwork" },
  { id: "people", label: "People" },
  { id: "grades", label: "Grades" },
];

export function getClassroom(classId: string) {
  return classes.find((item) => item.id === classId) ?? classes[0];
}

export function getClassAnnouncements(classId: string) {
  return announcements.filter((item) => item.classId === classId);
}

export function getClassWork(classId: string) {
  return workItems.filter((item) => item.classId === classId);
}

export function getWorkItem(workId: string) {
  return workItems.find((item) => item.id === workId) ?? workItems[0];
}

export function getClassPeople(classId: string) {
  return people.filter((item) => item.classId === classId);
}

export function getComments(workId: string) {
  return privateComments.filter((item) => item.workId === workId);
}
