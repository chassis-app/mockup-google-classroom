import type { Locale } from "@/i18n/config";

export type ClassTab = "stream" | "classwork" | "people" | "grades";
export type InviteState = "invited";
export type AnnouncementTag = "announcement" | "reminder" | "classwork";
export type AttachmentKind = "drive-file" | "google-form" | "link" | "youtube" | "doc" | "slides";
export type WorkType = "assignment" | "question" | "quiz-assignment" | "material";
export type WorkState = "assigned" | "turned-in" | "missing" | "returned" | "done";
export type PersonRole = "teacher" | "student";
export type CalendarEventType = "assignment" | "quiz" | "question";
export type CalendarRangeId = "apr22-28-2020" | "apr27-may3-2020" | "mar29-apr4-2020";

type LocalizedText = Record<Locale, string>;

type StudentClassRecord = {
  id: string;
  name: LocalizedText;
  section: LocalizedText;
  subject: LocalizedText;
  room: LocalizedText;
  teacher: string;
  teacherEmail: string;
  hero: LocalizedText;
  theme: string;
  accent: string;
  classCode: string;
  upcoming: LocalizedText;
  roster: number;
  inviteState?: InviteState;
};

type AnnouncementRecord = {
  id: string;
  classId: string;
  author: string;
  time: LocalizedText;
  body: LocalizedText;
  tag: AnnouncementTag;
};

type AttachmentRecord = {
  id: string;
  title: LocalizedText;
  kind: AttachmentKind;
  subtitle: LocalizedText;
};

type WorkItemRecord = {
  id: string;
  classId: string;
  type: WorkType;
  title: LocalizedText;
  topic: LocalizedText;
  due: LocalizedText;
  points?: number;
  summary: LocalizedText;
  instructions: LocalizedText;
  attachments: AttachmentRecord[];
  state: WorkState;
  submittedAt?: LocalizedText;
  grade?: string;
  answer?: string;
  formLabel?: LocalizedText;
};

type PersonRecord = {
  id: string;
  classId: string;
  name: string;
  role: PersonRole;
  email: string;
};

type PrivateCommentRecord = {
  id: string;
  workId: string;
  author: string;
  text: LocalizedText;
  time: LocalizedText;
};

type CalendarRangeRecord = {
  id: CalendarRangeId;
  label: LocalizedText;
};

type CalendarEventRecord = {
  id: string;
  classId: string;
  title: LocalizedText;
  date: number;
  rangeId: CalendarRangeId;
  type: CalendarEventType;
};

export type StudentClass = Omit<StudentClassRecord, "name" | "section" | "subject" | "room" | "hero" | "upcoming"> & {
  name: string;
  section: string;
  subject: string;
  room: string;
  hero: string;
  upcoming: string;
};

export type Announcement = Omit<AnnouncementRecord, "time" | "body"> & {
  time: string;
  body: string;
};

export type Attachment = Omit<AttachmentRecord, "title" | "subtitle"> & {
  title: string;
  subtitle: string;
};

export type WorkItem = Omit<WorkItemRecord, "title" | "topic" | "due" | "summary" | "instructions" | "attachments" | "submittedAt" | "formLabel"> & {
  title: string;
  topic: string;
  due: string;
  summary: string;
  instructions: string;
  attachments: Attachment[];
  submittedAt?: string;
  formLabel?: string;
};

export type Person = PersonRecord;

export type CalendarRange = {
  id: CalendarRangeId;
  label: string;
};

export type CalendarEvent = Omit<CalendarEventRecord, "title"> & {
  title: string;
};

export type PrivateComment = Omit<PrivateCommentRecord, "text" | "time"> & {
  text: string;
  time: string;
};

function pick(locale: Locale, value: LocalizedText) {
  return value[locale];
}

function localizeAttachment(locale: Locale, attachment: AttachmentRecord): Attachment {
  return {
    id: attachment.id,
    title: pick(locale, attachment.title),
    kind: attachment.kind,
    subtitle: pick(locale, attachment.subtitle),
  };
}

export const studentProfile = {
  name: "Monevuu Student",
  email: "monevuu@student.demo.edu",
};

const classes: StudentClassRecord[] = [
  {
    id: "math-class",
    name: {
      en: "Math Class",
      "zh-HK": "數學課",
      "zh-CN": "数学课",
    },
    section: {
      en: "Basic Algebra",
      "zh-HK": "基礎代數",
      "zh-CN": "基础代数",
    },
    subject: {
      en: "Mathematics",
      "zh-HK": "數學",
      "zh-CN": "数学",
    },
    room: {
      en: "Room 203",
      "zh-HK": "203 室",
      "zh-CN": "203 教室",
    },
    teacher: "Ross Geller",
    teacherEmail: "ross.geller@demo.edu",
    hero: {
      en: "Homework, quiz warmups, and extension practice all live here.",
      "zh-HK": "家課、小測預習及延伸練習都會集中在這裡。",
      "zh-CN": "作业、小测预习和拓展练习都会集中在这里。",
    },
    theme: "from-[#e53935] via-[#ef5350] to-[#ff8a80]",
    accent: "#d93025",
    classCode: "MATH-452",
    upcoming: {
      en: "Fibonacci quiz opens April 29",
      "zh-HK": "斐波那契數列小測將於 4 月 29 日開放",
      "zh-CN": "斐波那契数列测验将于 4 月 29 日开放",
    },
    roster: 31,
  },
  {
    id: "english-class",
    name: {
      en: "English Class",
      "zh-HK": "英文課",
      "zh-CN": "英语课",
    },
    section: {
      en: "Essay Composition",
      "zh-HK": "論說文寫作",
      "zh-CN": "作文写作",
    },
    subject: {
      en: "Language Arts",
      "zh-HK": "語文",
      "zh-CN": "语文",
    },
    room: {
      en: "Room 118",
      "zh-HK": "118 室",
      "zh-CN": "118 教室",
    },
    teacher: "Bryan Cortez Silva",
    teacherEmail: "bryan.cortez@demo.edu",
    hero: {
      en: "Essays, reading responses, and class announcements.",
      "zh-HK": "作文、閱讀回應及課堂公告都會在這裡發布。",
      "zh-CN": "作文、阅读回应和课堂公告都会在这里发布。",
    },
    theme: "from-[#1a73e8] via-[#2b7de9] to-[#5e97f6]",
    accent: "#1a73e8",
    classCode: "READ-918",
    upcoming: {
      en: "Weekly Reading due Tue 8:00 AM",
      "zh-HK": "每週閱讀於星期二上午 8:00 截止",
      "zh-CN": "每周阅读于周二上午 8:00 截止",
    },
    roster: 28,
  },
  {
    id: "bryants-demo",
    name: {
      en: "Bryant's Demo Google Classroom",
      "zh-HK": "Bryant 的 Google Classroom 示範課堂",
      "zh-CN": "Bryant 的 Google Classroom 演示课堂",
    },
    section: {
      en: "Support Communications",
      "zh-HK": "支援通訊",
      "zh-CN": "支持沟通",
    },
    subject: {
      en: "Demo",
      "zh-HK": "示範",
      "zh-CN": "演示",
    },
    room: {
      en: "Online",
      "zh-HK": "線上",
      "zh-CN": "线上",
    },
    teacher: "Bryant S.",
    teacherEmail: "bryant@demo.edu",
    hero: {
      en: "Reference class used for screenshots and onboarding.",
      "zh-HK": "此參考課堂用於截圖和新手導覽。",
      "zh-CN": "此参考课堂用于截图和新手引导。",
    },
    theme: "from-[#8e24aa] via-[#ab47bc] to-[#ce93d8]",
    accent: "#9334e6",
    classCode: "BRYANT-10",
    upcoming: {
      en: "Invitation pending",
      "zh-HK": "邀請尚待接受",
      "zh-CN": "邀请尚待接受",
    },
    roster: 12,
    inviteState: "invited",
  },
];

const announcements: AnnouncementRecord[] = [
  {
    id: "ann-1",
    classId: "english-class",
    author: "Bryan Cortez Silva",
    time: {
      en: "Mar 27, 8:15 AM",
      "zh-HK": "3 月 27 日 上午 8:15",
      "zh-CN": "3 月 27 日 上午 8:15",
    },
    body: {
      en: "Be sure can edits are set correctly with your docs here.",
      "zh-HK": "請確認你的文件分享權限已正確設為可編輯。",
      "zh-CN": "请确认你的文档共享权限已正确设置为可编辑。",
    },
    tag: "announcement",
  },
  {
    id: "ann-2",
    classId: "english-class",
    author: "Bryan Cortez Silva",
    time: {
      en: "Mar 26, 3:40 PM",
      "zh-HK": "3 月 26 日 下午 3:40",
      "zh-CN": "3 月 26 日 下午 3:40",
    },
    body: {
      en: "Great work on your weekly reading. Check Classroom before class tomorrow for the TED Talk prompt.",
      "zh-HK": "你們的每週閱讀表現很好。明天上課前請到 Classroom 查看 TED Talk 提示。",
      "zh-CN": "你们的每周阅读完成得很好。明天上课前请到 Classroom 查看 TED Talk 提示。",
    },
    tag: "reminder",
  },
  {
    id: "ann-3",
    classId: "math-class",
    author: "Ross Geller",
    time: {
      en: "Apr 27, 8:00 AM",
      "zh-HK": "4 月 27 日 上午 8:00",
      "zh-CN": "4 月 27 日 上午 8:00",
    },
    body: {
      en: "The Fibonacci sequence extension has been posted. Start with the short video before taking the quiz.",
      "zh-HK": "斐波那契數列延伸作業已發布。請先觀看短片，再完成小測。",
      "zh-CN": "斐波那契数列拓展作业已发布。请先观看短片，再完成测验。",
    },
    tag: "classwork",
  },
];

const workItems: WorkItemRecord[] = [
  {
    id: "weekly-reading",
    classId: "english-class",
    type: "assignment",
    title: {
      en: "Weekly Reading",
      "zh-HK": "每週閱讀",
      "zh-CN": "每周阅读",
    },
    topic: {
      en: "Assignments",
      "zh-HK": "作業",
      "zh-CN": "作业",
    },
    due: {
      en: "Due Tue, Apr 27",
      "zh-HK": "截止：4 月 27 日（星期二）",
      "zh-CN": "截止：4 月 27 日，周二",
    },
    points: 15,
    summary: {
      en: "Read the article and submit a short reflection with one quoted passage.",
      "zh-HK": "閱讀文章後提交一段短反思，並引用其中一句內容。",
      "zh-CN": "阅读文章后提交一段简短反思，并引用其中一句内容。",
    },
    instructions: {
      en: "Open the attached reading and answer the reflection prompt in a short paragraph. Cite one sentence from the text and explain why it matters.",
      "zh-HK": "打開附件閱讀材料，用一段短文回應反思提示。請引用文中的一句句子，並說明其重要性。",
      "zh-CN": "打开附件阅读材料，用一段短文回答反思提示。请引用文中的一句句子，并说明其重要性。",
    },
    attachments: [
      {
        id: "att-wr-1",
        title: {
          en: "Weekly Reading Packet",
          "zh-HK": "每週閱讀資料包",
          "zh-CN": "每周阅读资料包",
        },
        kind: "doc",
        subtitle: {
          en: "Google Docs assignment",
          "zh-HK": "Google 文件作業",
          "zh-CN": "Google 文档作业",
        },
      },
    ],
    state: "missing",
    submittedAt: {
      en: "Apr 27",
      "zh-HK": "4 月 27 日",
      "zh-CN": "4 月 27 日",
    },
  },
  {
    id: "ted-talk",
    classId: "english-class",
    type: "assignment",
    title: {
      en: "TED Talk & three paragraphs",
      "zh-HK": "TED Talk 與三段回應",
      "zh-CN": "TED Talk 与三段回应",
    },
    topic: {
      en: "Essay Writing",
      "zh-HK": "論說文寫作",
      "zh-CN": "作文写作",
    },
    due: {
      en: "Apr 27",
      "zh-HK": "4 月 27 日",
      "zh-CN": "4 月 27 日",
    },
    points: 100,
    summary: {
      en: "Watch the video and respond with three focused paragraphs.",
      "zh-HK": "觀看影片後，以三段聚焦回應作答。",
      "zh-CN": "观看视频后，用三段聚焦回应作答。",
    },
    instructions: {
      en: "Watch the attached TED Talk and write three paragraphs in your assigned doc. Paragraph one should summarize the central idea, paragraph two should analyze the speaker's strategy, and paragraph three should connect the talk to our current unit.",
      "zh-HK": "觀看附件中的 TED Talk，並在已指派的文件中寫三段回應。第一段總結核心觀點，第二段分析講者策略，第三段把演講與本單元內容連結。",
      "zh-CN": "观看附件中的 TED Talk，并在已分配的文档中写三段回应。第一段总结核心观点，第二段分析演讲者策略，第三段把演讲与本单元内容联系起来。",
    },
    attachments: [
      {
        id: "att-ted-1",
        title: {
          en: "Get the power of...",
          "zh-HK": "Get the power of...",
          "zh-CN": "Get the power of...",
        },
        kind: "youtube",
        subtitle: {
          en: "youtube.com",
          "zh-HK": "youtube.com",
          "zh-CN": "youtube.com",
        },
      },
      {
        id: "att-ted-2",
        title: {
          en: "TED Talk 3 paragraph response",
          "zh-HK": "TED Talk 三段回應",
          "zh-CN": "TED Talk 三段回应",
        },
        kind: "doc",
        subtitle: {
          en: "Assigned template in Drive",
          "zh-HK": "Drive 中的指定範本",
          "zh-CN": "Drive 中的指定模板",
        },
      },
    ],
    state: "assigned",
  },
  {
    id: "reading-time",
    classId: "english-class",
    type: "assignment",
    title: {
      en: "Reading Time!",
      "zh-HK": "閱讀時間！",
      "zh-CN": "阅读时间！",
    },
    topic: {
      en: "Reading Time!",
      "zh-HK": "閱讀時間！",
      "zh-CN": "阅读时间！",
    },
    due: {
      en: "Due Tue 8:00 AM",
      "zh-HK": "截止：星期二上午 8:00",
      "zh-CN": "截止：周二上午 8:00",
    },
    points: 10,
    summary: {
      en: "Short reading check tied to this week's chapter.",
      "zh-HK": "與本週章節相關的簡短閱讀檢查。",
      "zh-CN": "与本周章节相关的简短阅读检查。",
    },
    instructions: {
      en: "Read your chapter selection and answer the two comprehension prompts in Classroom before the bell.",
      "zh-HK": "閱讀指定章節，並在上課鈴響前於 Classroom 回答兩條理解問題。",
      "zh-CN": "阅读指定章节，并在上课铃响前于 Classroom 回答两道理解问题。",
    },
    attachments: [],
    state: "turned-in",
    submittedAt: {
      en: "Turned in late at 6:07 AM",
      "zh-HK": "於上午 6:07 逾時繳交",
      "zh-CN": "于上午 6:07 逾时提交",
    },
    grade: "8/10",
  },
  {
    id: "monthly-essay",
    classId: "english-class",
    type: "question",
    title: {
      en: "Monthly Essay",
      "zh-HK": "每月作文",
      "zh-CN": "每月作文",
    },
    topic: {
      en: "Monthly Essay",
      "zh-HK": "每月作文",
      "zh-CN": "每月作文",
    },
    due: {
      en: "Due Apr 30",
      "zh-HK": "截止：4 月 30 日",
      "zh-CN": "截止：4 月 30 日",
    },
    points: 20,
    summary: {
      en: "Quick check-in question for your monthly essay planning.",
      "zh-HK": "用於每月作文規劃的簡短檢查問題。",
      "zh-CN": "用于每月作文规划的简短检查问题。",
    },
    instructions: {
      en: "Free-write one paragraph explaining your thesis and the three examples you plan to use in your essay.",
      "zh-HK": "自由寫作一段，說明你的論點以及你打算在作文中使用的三個例子。",
      "zh-CN": "自由写作一段，说明你的论点以及你打算在作文中使用的三个例子。",
    },
    attachments: [],
    state: "assigned",
    answer: "",
  },
  {
    id: "fibonacci-video",
    classId: "math-class",
    type: "material",
    title: {
      en: "What is the Fibonacci sequence in nature?",
      "zh-HK": "自然界中的斐波那契數列是甚麼？",
      "zh-CN": "自然界中的斐波那契数列是什么？",
    },
    topic: {
      en: "Week of April 20",
      "zh-HK": "4 月 20 日當週",
      "zh-CN": "4 月 20 日当周",
    },
    due: {
      en: "Posted Apr 27",
      "zh-HK": "發布於 4 月 27 日",
      "zh-CN": "发布于 4 月 27 日",
    },
    summary: {
      en: "Prep material for the extension lesson and quiz.",
      "zh-HK": "延伸課和小測前的預習材料。",
      "zh-CN": "拓展课和测验前的预习材料。",
    },
    instructions: {
      en: "Watch the short clip and review the note card before moving on to the extension quiz.",
      "zh-HK": "先觀看短片並溫習提示卡，然後再進行延伸小測。",
      "zh-CN": "先观看短片并复习提示卡，然后再进行拓展测验。",
    },
    attachments: [
      {
        id: "att-fib-1",
        title: {
          en: "The Fibonacci sequence looks like this",
          "zh-HK": "斐波那契數列看起來是這樣",
          "zh-CN": "斐波那契数列看起来是这样的",
        },
        kind: "youtube",
        subtitle: {
          en: "Teacher attachment",
          "zh-HK": "老師附件",
          "zh-CN": "老师附件",
        },
      },
    ],
    state: "done",
  },
  {
    id: "fibonacci-extension",
    classId: "math-class",
    type: "assignment",
    title: {
      en: "Extension - Fibonacci Sequence in Nature",
      "zh-HK": "延伸作業－自然界中的斐波那契數列",
      "zh-CN": "拓展作业－自然界中的斐波那契数列",
    },
    topic: {
      en: "Week of April 20",
      "zh-HK": "4 月 20 日當週",
      "zh-CN": "4 月 20 日当周",
    },
    due: {
      en: "Due Wed, Apr 29",
      "zh-HK": "截止：4 月 29 日（星期三）",
      "zh-CN": "截止：4 月 29 日，周三",
    },
    points: 25,
    summary: {
      en: "Extension practice connecting the sequence to natural patterns.",
      "zh-HK": "把數列與自然圖樣聯繫起來的延伸練習。",
      "zh-CN": "把数列与自然图案联系起来的拓展练习。",
    },
    instructions: {
      en: "Review the article and image cards, then complete the extension response. Use complete sentences and cite one example from the article.",
      "zh-HK": "閱讀文章和圖片卡後完成延伸回應。請用完整句子作答，並引用文章中的一個例子。",
      "zh-CN": "阅读文章和图片卡后完成拓展回应。请使用完整句子作答，并引用文章中的一个例子。",
    },
    attachments: [
      {
        id: "att-ext-1",
        title: {
          en: "Fibonacci Sequence in Nature",
          "zh-HK": "自然界中的斐波那契數列",
          "zh-CN": "自然界中的斐波那契数列",
        },
        kind: "link",
        subtitle: {
          en: "Article and examples",
          "zh-HK": "文章與例子",
          "zh-CN": "文章与示例",
        },
      },
    ],
    state: "assigned",
  },
  {
    id: "fibonacci-quiz",
    classId: "math-class",
    type: "quiz-assignment",
    title: {
      en: "Fibonacci Sequence Quiz",
      "zh-HK": "斐波那契數列小測",
      "zh-CN": "斐波那契数列测验",
    },
    topic: {
      en: "Week of April 20",
      "zh-HK": "4 月 20 日當週",
      "zh-CN": "4 月 20 日当周",
    },
    due: {
      en: "Mon, Apr 27",
      "zh-HK": "4 月 27 日（星期一）",
      "zh-CN": "4 月 27 日，周一",
    },
    points: 10,
    summary: {
      en: "Google Forms quiz on the sequence and related patterns.",
      "zh-HK": "關於數列及其相關圖樣的 Google 表單小測。",
      "zh-CN": "关于数列及相关图案的 Google 表单测验。",
    },
    instructions: {
      en: "Click the attached form to begin the quiz. Once you finish the Google Form, return here and mark the assignment complete.",
      "zh-HK": "按一下附件表單開始小測。完成 Google 表單後，返回此頁並將作業標示為完成。",
      "zh-CN": "点击附件表单开始测验。完成 Google 表单后，返回此页并将作业标记为完成。",
    },
    attachments: [
      {
        id: "att-quiz-1",
        title: {
          en: "Fibonacci Sequence Quiz",
          "zh-HK": "斐波那契數列小測",
          "zh-CN": "斐波那契数列测验",
        },
        kind: "google-form",
        subtitle: {
          en: "Google Forms",
          "zh-HK": "Google 表單",
          "zh-CN": "Google 表单",
        },
      },
    ],
    state: "returned",
    submittedAt: {
      en: "Turned in Apr 27, 2:09 PM",
      "zh-HK": "已於 4 月 27 日 下午 2:09 繳交",
      "zh-CN": "已于 4 月 27 日 下午 2:09 提交",
    },
    grade: "9/10",
    formLabel: {
      en: "View score",
      "zh-HK": "查看分數",
      "zh-CN": "查看分数",
    },
  },
];

const people: PersonRecord[] = [
  {
    id: "p-1",
    classId: "english-class",
    name: "Bryan Cortez Silva",
    role: "teacher",
    email: "bryan.cortez@demo.edu",
  },
  {
    id: "p-2",
    classId: "english-class",
    name: "Monevuu Student",
    role: "student",
    email: "monevuu@student.demo.edu",
  },
  {
    id: "p-3",
    classId: "english-class",
    name: "Javier Lopez",
    role: "student",
    email: "javier.lopez@student.demo.edu",
  },
  {
    id: "p-4",
    classId: "english-class",
    name: "Emily Zhang",
    role: "student",
    email: "emily.zhang@student.demo.edu",
  },
  {
    id: "p-5",
    classId: "math-class",
    name: "Ross Geller",
    role: "teacher",
    email: "ross.geller@demo.edu",
  },
  {
    id: "p-6",
    classId: "math-class",
    name: "Monevuu Student",
    role: "student",
    email: "monevuu@student.demo.edu",
  },
  {
    id: "p-7",
    classId: "math-class",
    name: "Maya Singh",
    role: "student",
    email: "maya.singh@student.demo.edu",
  },
];

const privateComments: PrivateCommentRecord[] = [
  {
    id: "pc-1",
    workId: "ted-talk",
    author: "Bryan Cortez Silva",
    text: {
      en: "Make sure your second paragraph focuses on strategy, not summary.",
      "zh-HK": "請確保第二段重點分析策略，而不是單純總結。",
      "zh-CN": "请确保第二段重点分析策略，而不是单纯总结。",
    },
    time: {
      en: "Mar 27, 9:04 AM",
      "zh-HK": "3 月 27 日 上午 9:04",
      "zh-CN": "3 月 27 日 上午 9:04",
    },
  },
  {
    id: "pc-2",
    workId: "fibonacci-extension",
    author: "Ross Geller",
    text: {
      en: "Use the sunflower example if you need a clearer natural pattern.",
      "zh-HK": "如果你需要更清晰的自然圖樣例子，可以使用向日葵。",
      "zh-CN": "如果你需要更清晰的自然图案示例，可以使用向日葵。",
    },
    time: {
      en: "Apr 28, 4:15 PM",
      "zh-HK": "4 月 28 日 下午 4:15",
      "zh-CN": "4 月 28 日 下午 4:15",
    },
  },
];

const calendarRanges: CalendarRangeRecord[] = [
  {
    id: "apr22-28-2020",
    label: {
      en: "Apr 22-28, 2020",
      "zh-HK": "2020 年 4 月 22 日至 28 日",
      "zh-CN": "2020 年 4 月 22 日至 28 日",
    },
  },
  {
    id: "apr27-may3-2020",
    label: {
      en: "Apr 27-May 3, 2020",
      "zh-HK": "2020 年 4 月 27 日至 5 月 3 日",
      "zh-CN": "2020 年 4 月 27 日至 5 月 3 日",
    },
  },
  {
    id: "mar29-apr4-2020",
    label: {
      en: "Mar 29-Apr 4, 2020",
      "zh-HK": "2020 年 3 月 29 日至 4 月 4 日",
      "zh-CN": "2020 年 3 月 29 日至 4 月 4 日",
    },
  },
];

const calendarEvents: CalendarEventRecord[] = [
  {
    id: "cal-1",
    classId: "english-class",
    title: {
      en: "Assignments 10 TED Talk & 3 paragraphs",
      "zh-HK": "作業 10：TED Talk 與三段回應",
      "zh-CN": "作业 10：TED Talk 与三段回应",
    },
    date: 25,
    rangeId: "apr22-28-2020",
    type: "assignment",
  },
  {
    id: "cal-2",
    classId: "math-class",
    title: {
      en: "Quiz 1 Fibonacci sequence",
      "zh-HK": "小測 1：斐波那契數列",
      "zh-CN": "测验 1：斐波那契数列",
    },
    date: 29,
    rangeId: "apr27-may3-2020",
    type: "quiz",
  },
  {
    id: "cal-3",
    classId: "english-class",
    title: {
      en: "Question Monthly Essay draft",
      "zh-HK": "問題：每月作文草稿",
      "zh-CN": "问题：每月作文草稿",
    },
    date: 31,
    rangeId: "mar29-apr4-2020",
    type: "question",
  },
];

export function getClasses(locale: Locale): StudentClass[] {
  return classes.map((item) => ({
    id: item.id,
    name: pick(locale, item.name),
    section: pick(locale, item.section),
    subject: pick(locale, item.subject),
    room: pick(locale, item.room),
    teacher: item.teacher,
    teacherEmail: item.teacherEmail,
    hero: pick(locale, item.hero),
    theme: item.theme,
    accent: item.accent,
    classCode: item.classCode,
    upcoming: pick(locale, item.upcoming),
    roster: item.roster,
    inviteState: item.inviteState,
  }));
}

export function getClassroom(locale: Locale, classId: string) {
  return getClasses(locale).find((item) => item.id === classId) ?? getClasses(locale)[0];
}

export function getClassAnnouncements(locale: Locale, classId: string): Announcement[] {
  return announcements
    .filter((item) => item.classId === classId)
    .map((item) => ({
      id: item.id,
      classId: item.classId,
      author: item.author,
      time: pick(locale, item.time),
      body: pick(locale, item.body),
      tag: item.tag,
    }));
}

export function getClassWork(locale: Locale, classId: string): WorkItem[] {
  return workItems
    .filter((item) => item.classId === classId)
    .map((item) => ({
      id: item.id,
      classId: item.classId,
      type: item.type,
      title: pick(locale, item.title),
      topic: pick(locale, item.topic),
      due: pick(locale, item.due),
      points: item.points,
      summary: pick(locale, item.summary),
      instructions: pick(locale, item.instructions),
      attachments: item.attachments.map((attachment) => localizeAttachment(locale, attachment)),
      state: item.state,
      submittedAt: item.submittedAt ? pick(locale, item.submittedAt) : undefined,
      grade: item.grade,
      answer: item.answer,
      formLabel: item.formLabel ? pick(locale, item.formLabel) : undefined,
    }));
}

export function getWorkItem(locale: Locale, workId: string) {
  return getClassWork(locale, workItems.find((item) => item.id === workId)?.classId ?? classes[0].id).find(
    (item) => item.id === workId,
  ) ?? getClassWork(locale, classes[0].id)[0];
}

export function getClassPeople(classId: string) {
  return people.filter((item) => item.classId === classId);
}

export function getComments(locale: Locale, workId: string): PrivateComment[] {
  return privateComments
    .filter((item) => item.workId === workId)
    .map((item) => ({
      id: item.id,
      workId: item.workId,
      author: item.author,
      text: pick(locale, item.text),
      time: pick(locale, item.time),
    }));
}

export function getCalendarRanges(locale: Locale): CalendarRange[] {
  return calendarRanges.map((item) => ({
    id: item.id,
    label: pick(locale, item.label),
  }));
}

export function getCalendarEvents(locale: Locale, rangeId?: CalendarRangeId): CalendarEvent[] {
  return calendarEvents
    .filter((item) => (rangeId ? item.rangeId === rangeId : true))
    .map((item) => ({
      id: item.id,
      classId: item.classId,
      title: pick(locale, item.title),
      date: item.date,
      rangeId: item.rangeId,
      type: item.type,
    }));
}
