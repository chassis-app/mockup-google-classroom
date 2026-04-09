import type { Locale } from "@/i18n/config";

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  brand: {
    classroom: string;
  };
  language: {
    label: string;
    options: Record<Locale, string>;
  };
  navigation: {
    classes: string;
    calendar: string;
    todo: string;
    enrolled: string;
    closeNavigation: string;
    search: string;
  };
  tabs: {
    stream: string;
    classwork: string;
    people: string;
    grades: string;
    yourWork: string;
  };
  actions: {
    joinClass: string;
    join: string;
    decline: string;
    open: string;
    viewAll: string;
    viewYourWork: string;
    googleCalendar: string;
    classDriveFolder: string;
    addOrCreate: string;
    turnIn: string;
    markAsDone: string;
    openQuiz: string;
    viewForm: string;
    cancel: string;
    done: string;
  };
  headings: {
    classes: string;
    todo: string;
    calendar: string;
    allClasses: string;
    upcoming: string;
    classCode: string;
    teachers: string;
    classmates: string;
    item: string;
    due: string;
    status: string;
    attachments: string;
    classComments: string;
    privateComments: string;
    yourWork: string;
    yourAnswer: string;
  };
  filters: {
    todo: string;
    done: string;
    all: string;
    assigned: string;
    returned: string;
    missing: string;
    turnedIn: string;
  };
  placeholders: {
    shareSomething: string;
    typeYourAnswerHere: string;
    addClassComment: string;
    addPrivateComment: string;
    noPrivateCommentsYet: string;
  };
  quizCard: {
    googleForms: string;
    requiresSignIn: string;
  };
  modals: {
    joinClass: {
      title: string;
      classCodeLabel: string;
      classCodeHelp: string;
    };
    turnIn: {
      title: string;
      body: string;
    };
  };
  statusLabels: {
    assigned: string;
    turnedIn: string;
    missing: string;
    returned: string;
    done: string;
  };
  workTypeLabels: {
    assignment: string;
    question: string;
    quizAssignment: string;
    material: string;
  };
  announcementTags: {
    announcement: string;
    reminder: string;
    classwork: string;
  };
  attachOptions: string[];
  miscellaneous: {
    noPoints: string;
    pointsSuffix: string;
    referenceInviteDescription: string;
  };
  calendar: {
    daysShort: string[];
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    metadata: {
      title: "Google Classroom Student Mockup",
      description: "Frontend-only Google Classroom student experience mockup with multilingual support.",
    },
    brand: {
      classroom: "Google Classroom",
    },
    language: {
      label: "Language",
      options: {
        en: "English",
        "zh-HK": "Traditional Chinese (Hong Kong)",
        "zh-CN": "Simplified Chinese",
      },
    },
    navigation: {
      classes: "Classes",
      calendar: "Calendar",
      todo: "To-do",
      enrolled: "Enrolled",
      closeNavigation: "Close navigation",
      search: "Search",
    },
    tabs: {
      stream: "Stream",
      classwork: "Classwork",
      people: "People",
      grades: "Grades",
      yourWork: "Your work",
    },
    actions: {
      joinClass: "Join class",
      join: "Join",
      decline: "Decline",
      open: "Open",
      viewAll: "View all",
      viewYourWork: "View your work",
      googleCalendar: "Google Calendar",
      classDriveFolder: "Class Drive folder",
      addOrCreate: "Add or create",
      turnIn: "Turn in",
      markAsDone: "Mark as done",
      openQuiz: "Open quiz",
      viewForm: "View form",
      cancel: "Cancel",
      done: "Done",
    },
    headings: {
      classes: "Classes",
      todo: "To-do",
      calendar: "Calendar",
      allClasses: "All classes",
      upcoming: "Upcoming",
      classCode: "Class code",
      teachers: "Teachers",
      classmates: "Classmates",
      item: "Item",
      due: "Due",
      status: "Status",
      attachments: "Attachments",
      classComments: "Class comments",
      privateComments: "Private comments",
      yourWork: "Your work",
      yourAnswer: "Your answer",
    },
    filters: {
      todo: "To-do",
      done: "Done",
      all: "All",
      assigned: "Assigned",
      returned: "Returned",
      missing: "Missing",
      turnedIn: "Turned in",
    },
    placeholders: {
      shareSomething: "Share something with your class...",
      typeYourAnswerHere: "Type your answer here...",
      addClassComment: "Add class comment",
      addPrivateComment: "Add private comment",
      noPrivateCommentsYet: "No private comments yet.",
    },
    quizCard: {
      googleForms: "Google Forms",
      requiresSignIn: "Requires sign-in. Open the form to answer the quiz and return here when finished.",
    },
    modals: {
      joinClass: {
        title: "Join class",
        classCodeLabel: "Class code",
        classCodeHelp: "Ask your teacher for the class code, then enter it here.",
      },
      turnIn: {
        title: "Turn in your work?",
        body: "Attached files will be visible to your teacher. You can still unsubmit later unless the due date has passed.",
      },
    },
    statusLabels: {
      assigned: "Assigned",
      turnedIn: "Turned in",
      missing: "Missing",
      returned: "Returned",
      done: "Done",
    },
    workTypeLabels: {
      assignment: "Assignment",
      question: "Question",
      quizAssignment: "Quiz assignment",
      material: "Material",
    },
    announcementTags: {
      announcement: "Announcement",
      reminder: "Reminder",
      classwork: "Classwork",
    },
    attachOptions: ["Google Drive", "Link", "File", "Docs", "Slides", "Drawing"],
    miscellaneous: {
      noPoints: "No points",
      pointsSuffix: "points",
      referenceInviteDescription: "Reference class used for screenshots and onboarding.",
    },
    calendar: {
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
  },
  "zh-HK": {
    metadata: {
      title: "Google Classroom 學生版模擬介面",
      description: "以多語言支援呈現的 Google Classroom 學生端前端模擬介面。",
    },
    brand: {
      classroom: "Google Classroom",
    },
    language: {
      label: "語言",
      options: {
        en: "English",
        "zh-HK": "繁體中文（香港）",
        "zh-CN": "簡體中文",
      },
    },
    navigation: {
      classes: "課堂",
      calendar: "日曆",
      todo: "待辦事項",
      enrolled: "已加入的課堂",
      closeNavigation: "關閉導覽",
      search: "搜尋",
    },
    tabs: {
      stream: "動態消息",
      classwork: "課堂作業",
      people: "成員",
      grades: "成績",
      yourWork: "你的作業",
    },
    actions: {
      joinClass: "加入課堂",
      join: "加入",
      decline: "拒絕",
      open: "開啟",
      viewAll: "查看全部",
      viewYourWork: "查看你的作業",
      googleCalendar: "Google 日曆",
      classDriveFolder: "課堂 Drive 資料夾",
      addOrCreate: "新增或建立",
      turnIn: "繳交",
      markAsDone: "標示為已完成",
      openQuiz: "開啟測驗",
      viewForm: "查看表單",
      cancel: "取消",
      done: "已完成",
    },
    headings: {
      classes: "課堂",
      todo: "待辦事項",
      calendar: "日曆",
      allClasses: "所有課堂",
      upcoming: "即將到來",
      classCode: "課堂代碼",
      teachers: "老師",
      classmates: "同學",
      item: "項目",
      due: "截止時間",
      status: "狀態",
      attachments: "附件",
      classComments: "課堂留言",
      privateComments: "私人留言",
      yourWork: "你的作業",
      yourAnswer: "你的答案",
    },
    filters: {
      todo: "待辦",
      done: "已完成",
      all: "全部",
      assigned: "已指派",
      returned: "已發還",
      missing: "缺交",
      turnedIn: "已繳交",
    },
    placeholders: {
      shareSomething: "與你的課堂分享內容...",
      typeYourAnswerHere: "在此輸入你的答案...",
      addClassComment: "新增課堂留言",
      addPrivateComment: "新增私人留言",
      noPrivateCommentsYet: "暫時沒有私人留言。",
    },
    quizCard: {
      googleForms: "Google 表單",
      requiresSignIn: "需要登入。開啟表單完成測驗後，再返回這裡。",
    },
    modals: {
      joinClass: {
        title: "加入課堂",
        classCodeLabel: "課堂代碼",
        classCodeHelp: "向老師索取課堂代碼，然後在此輸入。",
      },
      turnIn: {
        title: "要繳交你的作業嗎？",
        body: "已附加的檔案會讓老師看見。除非已過截止時間，否則之後仍可取消提交。",
      },
    },
    statusLabels: {
      assigned: "已指派",
      turnedIn: "已繳交",
      missing: "缺交",
      returned: "已發還",
      done: "已完成",
    },
    workTypeLabels: {
      assignment: "作業",
      question: "問題",
      quizAssignment: "小測驗作業",
      material: "教材",
    },
    announcementTags: {
      announcement: "公告",
      reminder: "提醒",
      classwork: "課堂作業",
    },
    attachOptions: ["Google 雲端硬碟", "連結", "檔案", "文件", "簡報", "繪圖"],
    miscellaneous: {
      noPoints: "不計分",
      pointsSuffix: "分",
      referenceInviteDescription: "此參考課堂用於截圖和新手導覽。",
    },
    calendar: {
      daysShort: ["日", "一", "二", "三", "四", "五", "六"],
    },
  },
  "zh-CN": {
    metadata: {
      title: "Google Classroom 学生端模拟应用",
      description: "支持多语言的 Google Classroom 学生端前端模拟应用。",
    },
    brand: {
      classroom: "Google Classroom",
    },
    language: {
      label: "语言",
      options: {
        en: "English",
        "zh-HK": "繁體中文（香港）",
        "zh-CN": "简体中文",
      },
    },
    navigation: {
      classes: "课堂",
      calendar: "日历",
      todo: "待办事项",
      enrolled: "已加入的课堂",
      closeNavigation: "关闭导航",
      search: "搜索",
    },
    tabs: {
      stream: "动态",
      classwork: "课堂作业",
      people: "成员",
      grades: "成绩",
      yourWork: "你的作业",
    },
    actions: {
      joinClass: "加入课堂",
      join: "加入",
      decline: "拒绝",
      open: "打开",
      viewAll: "查看全部",
      viewYourWork: "查看你的作业",
      googleCalendar: "Google 日历",
      classDriveFolder: "课堂 Drive 文件夹",
      addOrCreate: "添加或创建",
      turnIn: "提交",
      markAsDone: "标记为已完成",
      openQuiz: "打开测验",
      viewForm: "查看表单",
      cancel: "取消",
      done: "已完成",
    },
    headings: {
      classes: "课堂",
      todo: "待办事项",
      calendar: "日历",
      allClasses: "所有课堂",
      upcoming: "即将开始",
      classCode: "课堂代码",
      teachers: "老师",
      classmates: "同学",
      item: "项目",
      due: "截止时间",
      status: "状态",
      attachments: "附件",
      classComments: "课堂评论",
      privateComments: "私信评论",
      yourWork: "你的作业",
      yourAnswer: "你的答案",
    },
    filters: {
      todo: "待办",
      done: "已完成",
      all: "全部",
      assigned: "已布置",
      returned: "已发还",
      missing: "缺交",
      turnedIn: "已提交",
    },
    placeholders: {
      shareSomething: "和课堂分享内容...",
      typeYourAnswerHere: "在这里输入你的答案...",
      addClassComment: "添加课堂评论",
      addPrivateComment: "添加私信评论",
      noPrivateCommentsYet: "还没有私信评论。",
    },
    quizCard: {
      googleForms: "Google 表单",
      requiresSignIn: "需要登录。打开表单完成测验后，再返回这里。",
    },
    modals: {
      joinClass: {
        title: "加入课堂",
        classCodeLabel: "课堂代码",
        classCodeHelp: "向老师获取课堂代码，然后在这里输入。",
      },
      turnIn: {
        title: "要提交你的作业吗？",
        body: "已附加的文件会对老师可见。除非已过截止时间，否则之后仍可撤回提交。",
      },
    },
    statusLabels: {
      assigned: "已布置",
      turnedIn: "已提交",
      missing: "缺交",
      returned: "已发还",
      done: "已完成",
    },
    workTypeLabels: {
      assignment: "作业",
      question: "问题",
      quizAssignment: "测验作业",
      material: "资料",
    },
    announcementTags: {
      announcement: "公告",
      reminder: "提醒",
      classwork: "课堂作业",
    },
    attachOptions: ["Google 云端硬盘", "链接", "文件", "文档", "幻灯片", "绘图"],
    miscellaneous: {
      noPoints: "不计分",
      pointsSuffix: "分",
      referenceInviteDescription: "此参考课堂用于截图和新手引导。",
    },
    calendar: {
      daysShort: ["日", "一", "二", "三", "四", "五", "六"],
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
