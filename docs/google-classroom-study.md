# Google Classroom Study

Last updated: 2026-03-18

## Why this document exists

We need a Google Classroom-like starting point for a frontend-only mockup. The client wants changes and extra features on top of the familiar Classroom model, so this document maps the current product into:

1. what Google Classroom includes today,
2. how its information architecture is organized, and
3. how we should model a clone app with mock data and no backend.

## Important note on "architecture"

Google publicly documents the Classroom product, user flows, and API resource model. Google does **not** publish the full internal system architecture of Classroom. Because of that, this document separates:

- **Documented product structure**: pages, tabs, roles, features, and API entities from official Google docs.
- **Inferred clone architecture**: a recommended frontend information architecture and component/data model for our mockup.

## 1) What is available in Google Classroom today

### Core product purpose

Google Classroom is an education workflow app for organizing classes, sharing announcements and materials, assigning work, collecting submissions, grading, and communicating with students. It also connects tightly with Google Workspace tools such as Drive, Docs, Sheets, Slides, Forms, Meet, Calendar, Gmail, and YouTube.

### Main user roles

- **Teacher / primary teacher**
  - Creates classes
  - Posts announcements
  - Creates assignments, quiz assignments, questions, and materials
  - Invites students and co-teachers
  - Grades and returns work
  - Manages class settings, Meet link, grading, and class code

- **Co-teacher**
  - Can do most teacher actions
  - Cannot delete the class, remove the primary teacher, or mute another teacher

- **Student**
  - Joins a class by invite or class code
  - Reads announcements
  - Opens classwork, submits work, marks work done, answers questions
  - Views returned grades and sometimes overall grade
  - Joins class Meet links when enabled

- **Guardian**
  - Does not access Classroom directly
  - Can receive guardian summaries and classwork updates by email

- **Admin / education leader**
  - Can configure domain/class membership rules
  - Can provision classes and sync from SIS
  - Can manage reporting, analytics, and organization-wide settings

### Main surfaces in the product

#### A. Home / Classes page

This is the landing page. Officially, Google describes it as a page with:

- a main navigation area,
- a banner/global header,
- and a list of class cards.

Each class card can expose quick actions such as:

- open class,
- open "Your work",
- open class folder,
- accept/join invitation,
- reorder card,
- unenroll or leave.

#### B. Global navigation

From Google help docs, the main navigation includes access to:

- classes/home,
- calendar,
- settings/notifications.

In practice, the product also exposes class entry points, account switching, app launcher access, and join/create flows from the top/header area depending on role.

#### C. Inside a class

The class experience is the center of the product. Official documentation consistently describes these tabs/pages:

- **Stream**
- **Classwork**
- **People**
- **Grades** (teacher-only)

For students, Google also exposes **Your work** views from the class card and from inside a class.

### Teacher-facing class areas

#### Stream

The Stream page acts like the class message board. Teachers can:

- post announcements,
- see the class Meet link,
- see the class code,
- open class settings,
- control whether students can post/comment.

#### Classwork

The Classwork page is the work-management hub. Teachers can:

- create assignments,
- create quiz assignments,
- create questions,
- add materials,
- organize content under topics,
- view work status such as turned in or missing,
- open Drive folder,
- open Calendar,
- start Meet,
- schedule or draft work.

Google documents assignment options such as:

- assign to one or more classes,
- assign to selected students,
- add grade category,
- add grading period,
- set point value,
- set due date/time,
- add a topic,
- add attachments,
- add a rubric,
- turn on originality reports.

Supported attachment types in official docs include:

- Google Drive files,
- YouTube videos,
- links/URLs,
- Google-created files,
- add-ons,
- newer AI-related attachment options such as Gems in some product editions/workflows.

#### People

The People page is the roster/relationship view. Teachers can:

- see teachers and students,
- invite co-teachers,
- invite students,
- email students, guardians, or co-teachers,
- mute students,
- remove people,
- see invitation status.

#### Grades

The Grades page is the gradebook. Teachers can:

- view, enter, and return grades,
- open student submissions,
- see overall grades when grading mode supports it,
- export/download the gradebook.

### Student-facing class areas

#### Stream

Students can:

- read teacher announcements,
- sometimes post/comment depending on teacher settings,
- reach "View all work",
- sometimes reach Meet links from the stream.

#### Classwork

Students can:

- browse assignments, questions, quiz assignments, and materials,
- filter by topic,
- open work details,
- submit files,
- make copies of teacher-provided attachments,
- mark work as done when no file upload is needed,
- answer short-answer and multiple-choice questions.

#### People

Students can:

- see teachers,
- see classmates,
- sometimes email teachers/classmates if the school allows it.

#### Your work

This is a key student surface even though it is not a top-level teacher tab. Students can:

- see assigned work,
- see missing work,
- see returned-with-grade work,
- filter work by status,
- check overall grade if the teacher shares it.

### Other important product features

- **Meet integration**: teachers can expose a class Meet link; students can join when the teacher has started the meeting.
- **Calendar integration**: classwork due dates and class events show in Classroom Calendar / Google Calendar.
- **Drive integration**: each class has a Drive folder; assignment attachments and student copies live there.
- **Gmail/email integration**: teachers can email students/co-teachers/guardians from roster-related flows.
- **Rubrics**: teachers can create or reuse rubrics for assignments.
- **Originality reports**: plagiarism/citation checking for supported editions.
- **Add-ons / app integrations**: Classroom supports many EdTech integrations and add-on attachments.
- **Analytics**: Classroom analytics exists for educators/leaders in supported editions.
- **SIS integration**: supported syncing/export workflows exist with select SIS partners.
- **Guardian summaries**: guardians receive email updates instead of direct product access.
- **Provisioned classes**: admins can provision classes and sync rosters.
- **Topics**: used as the primary visual grouping mechanism on Classwork.
- **Question types**: short-answer and multiple-choice are explicitly supported.
- **Practice sets / interactive content / AI features**: newer differentiated-learning features exist, but some are edition-dependent and should be treated as optional in our clone.

## 2) Product structure and information architecture

### High-level information architecture

```text
Workspace account / user
|
+-- Home / Classes
|   +-- Class cards
|   +-- Join / Create / Accept flows
|   +-- Quick links: Your work, Folder, Gradebook
|
+-- Global tools
|   +-- Calendar
|   +-- Settings / Notifications
|   +-- Account switcher
|   +-- App launcher
|
+-- Class
    +-- Stream
    |   +-- Announcements
    |   +-- Class code
    |   +-- Meet link
    |   +-- Posting permissions
    |
    +-- Classwork
    |   +-- Topics
    |   +-- Assignment
    |   +-- Quiz assignment
    |   +-- Question
    |   +-- Material
    |   +-- Draft / Scheduled / Published states
    |
    +-- People
    |   +-- Teachers
    |   +-- Students
    |   +-- Invitations
    |
    +-- Grades (teacher)
    |   +-- Gradebook grid
    |   +-- Submission drill-down
    |
    +-- Your Work (student entry point)
    +-- Settings
```

### Navigation pattern

Google Classroom uses a very stable nested navigation model:

1. **Global level**: home/classes + calendar + settings + account tools
2. **Class level**: stream / classwork / people / grades
3. **Object level**: assignment detail, question detail, student submission, grade detail, roster detail

This is one of the most important things to preserve in a clone because it defines the product's mental model.

### Teacher mental model

For teachers, the class is the root object. Most actions start from a class and then branch into:

- communicate on **Stream**,
- organize work in **Classwork**,
- manage roster in **People**,
- review progress in **Grades**.

### Student mental model

For students, the class is also the root object, but task completion is the main focus:

- read updates on **Stream**,
- find tasks in **Classwork**,
- check status in **Your work**,
- view teachers/classmates in **People**.

## 3) Documented domain model from the official Classroom API

Google's Classroom API is extremely useful because it reveals the product's underlying entity model.

### Core entities

- **Course**
  - The foundational class object
  - Holds metadata such as name, description, location, and time

- **Alias**
  - Alternate identifier for a course

- **Invitation**
  - Used to invite a user into a course as teacher or student

- **Teacher**
  - A teacher membership inside a course

- **Student**
  - A student membership inside a course

- **UserProfile**
  - Generic person record outside a course role

- **Announcement**
  - Stream-post content

- **CourseWork**
  - Graded or ungraded assignment-like work
  - Can be assignment, short-answer question, or multiple-choice question

- **StudentSubmission**
  - Student work for a CourseWork item
  - Contains submission state, response data, files, and grade metadata

- **CourseWorkMaterial**
  - Non-submission content such as syllabus, readings, or class rules

- **Topic**
  - Visual grouping for Classwork items

- **AddOnAttachment**
  - Embedded or integrated third-party content/activity

- **Registration**
  - Notification subscription object for API integrations

### Official relationship model

```text
Course
|- has many Teachers
|- has many Students
|- has many Invitations
|- has many Announcements
|- has many CourseWork items
|- has many CourseWorkMaterials
|- has many Topics
|
`- CourseWork
   |- belongs to one Course
   |- optionally belongs to one Topic
   |- has many attachments
   `- has many StudentSubmissions
```

### Submission and grading model

Important product logic inferred from the official docs:

- only **CourseWork** accepts **StudentSubmissions**,
- **CourseWorkMaterial** does not require a submission,
- announcements are communication-only,
- grades live around submission/gradebook workflows,
- the gradebook is a view over classwork and submissions rather than a separate disconnected object.

## 4) Recommended clone architecture for our frontend-only mockup

This section is **our recommendation**, not a Google internal architecture claim.

### Product direction for the mockup

Because there is no backend yet, the best approach is:

- model the product as a **teacher-first Classroom clone**,
- support a **student preview mode** from the same mock data,
- use local fixtures and UI state only,
- keep the data model close to the official Classroom entities so future backend work is easier.

### Suggested route structure

```text
/
/classes
/calendar
/settings

/class/:classId
/class/:classId/stream
/class/:classId/classwork
/class/:classId/classwork/:itemId
/class/:classId/people
/class/:classId/grades
/class/:classId/settings
/class/:classId/your-work
```

If we later add role switching:

```text
?role=teacher
?role=student
```

or a simple in-app role toggle stored in local state.

### Suggested frontend data model

```ts
type UserRole = "teacher" | "coTeacher" | "student" | "guardian" | "admin";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
};

type Comment = {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
};

type GradeSettings = {
  gradingMode: "totalPoints" | "weightedCategories" | "noOverallGrade";
  categories?: Array<{ id: string; name: string; weight?: number }>;
};

type ClassRoom = {
  id: string;
  name: string;
  section?: string;
  subject?: string;
  room?: string;
  description?: string;
  theme?: string;
  classCode: string;
  meetLink?: string;
  teachers: string[];
  students: string[];
  topics: Topic[];
  streamItems: StreamItem[];
  gradeSettings: GradeSettings;
};

type Topic = {
  id: string;
  title: string;
  order: number;
};

type StreamItem =
  | Announcement
  | Assignment
  | QuizAssignment
  | Question
  | Material;

type Attachment =
  | { type: "drive"; title: string; url: string }
  | { type: "youtube"; title: string; url: string }
  | { type: "link"; title: string; url: string }
  | { type: "doc"; title: string; url: string }
  | { type: "addon"; title: string; vendor: string };

type Announcement = {
  id: string;
  kind: "announcement";
  classId: string;
  body: string;
  createdAt: string;
  authorId: string;
  attachments?: Attachment[];
};

type Assignment = {
  id: string;
  kind: "assignment";
  classId: string;
  topicId?: string;
  title: string;
  instructions?: string;
  points?: number;
  dueAt?: string;
  gradingPeriodId?: string;
  gradeCategory?: string;
  rubricId?: string;
  originalityReports?: boolean;
  assignedStudentIds?: string[];
  attachments?: Attachment[];
  status: "draft" | "scheduled" | "published";
};

type QuizAssignment = Assignment & {
  kind: "quizAssignment";
  formUrl?: string;
  lockedMode?: boolean;
};

type Question = {
  id: string;
  kind: "question";
  classId: string;
  topicId?: string;
  title: string;
  instructions?: string;
  questionType: "shortAnswer" | "multipleChoice";
  options?: string[];
  points?: number;
  dueAt?: string;
  status: "draft" | "scheduled" | "published";
};

type Material = {
  id: string;
  kind: "material";
  classId: string;
  topicId?: string;
  title: string;
  description?: string;
  attachments?: Attachment[];
  status: "draft" | "scheduled" | "published";
};

type Submission = {
  id: string;
  classId: string;
  courseWorkId: string;
  studentId: string;
  state: "assigned" | "turnedIn" | "returned" | "missing" | "late";
  grade?: number;
  privateComments?: Comment[];
  attachments?: Attachment[];
  submittedAt?: string;
};
```

### Suggested component architecture

```text
AppShell
|- GlobalSidebar
|- TopBar
`- RouteContent
   |- ClassesPage
   |- CalendarPage
   `- ClassLayout
      |- ClassHeader
      |- ClassTabs
      `- TabPage
         |- StreamPage
         |- ClassworkPage
         |- PeoplePage
         |- GradesPage
         |- SettingsPage
         `- YourWorkPage
```

### Suggested UI modules

- `components/layout/`
  - app shell
  - header
  - sidebar
  - tabs

- `components/classes/`
  - class card
  - class card menu
  - create/join class modal

- `components/stream/`
  - announcement composer
  - stream item card
  - comment thread

- `components/classwork/`
  - topic section
  - work item card
  - create-work menu
  - assignment detail drawer/page

- `components/people/`
  - roster table
  - invite modal

- `components/grades/`
  - gradebook table
  - submission status chip
  - rubric panel

- `components/shared/`
  - avatars
  - chips
  - dropdowns
  - due-date badges
  - attachment preview cards

### Mock data strategy

For a no-backend mockup, keep fixtures in static JSON or TS modules:

```text
data/
|- users.ts
|- classes.ts
|- topics.ts
|- stream.ts
|- assignments.ts
|- submissions.ts
|- gradebook.ts
`- activity.ts
```

Recommended approach:

- use a single source of truth for each entity collection,
- derive filtered views in selectors,
- fake mutations with local component state or a lightweight client store,
- persist temporarily to `localStorage` only if needed for demos.

## 5) Recommended MVP scope for the first mockup

To stay close to Classroom without overbuilding, the first mockup should include:

### Must-have

- classes dashboard with class cards
- class header with banner, class code, and Meet CTA
- stream tab with announcement feed
- classwork tab with topics and mixed work items
- people tab with teachers/students roster
- grades tab with simple gradebook grid
- student "your work" page
- assignment detail page/drawer
- create assignment / material / question UI

### Good second wave

- draft vs scheduled vs published states
- rubric UI
- originality report badge/state
- guardian summary placeholders
- calendar view
- class settings page
- class copy/archive flows

### Optional advanced layer

- analytics dashboards
- SIS sync screens
- add-on marketplace/integration surfaces
- AI helpers (practice sets, Gemini-like assistance, interactive video questions)
- leader/admin visit mode

## 6) Product principles we should preserve in the clone

- **Class is the primary container**: almost everything hangs off a class.
- **Classwork is structured content**: topics, work types, due dates, and statuses matter.
- **Stream is lightweight communication**: not the same thing as assignments.
- **Teacher and student views differ**: especially around grading, permissions, and submission actions.
- **Workspace integrations are part of the product feel**: Drive, Meet, Calendar, and attachments should appear even if mocked.
- **Status visibility is essential**: assigned, turned in, missing, late, returned-with-grade.
- **Roster and roles matter**: teacher/co-teacher/student/guardian are not cosmetic differences.

## 7) Key takeaways for our project

- Google Classroom is not just a feed; it is a class-centered workflow app with four core teacher areas: Stream, Classwork, People, and Grades.
- The most important entity model is: **Course -> Topic / StreamItem -> StudentSubmission**.
- For a frontend-only clone, we should mirror the official product structure closely, then add client-specific features on top.
- The safest starting point is a **teacher-first mockup** with a simple student preview mode and local fixture data.
- If we later add backend support, the official Classroom API resource model is a strong reference for our own schema.

## References

Official Google sources used for this study:

1. Google Classroom product page: https://edu.google.com/intl/en-US/workspace-for-education/products/classroom/
2. Classroom Help - Get started with Classroom for teachers: https://support.google.com/edu/classroom/answer/9582854?co=GENIE.Platform%3DDesktop&hl=en
3. Classroom Help - Use a screen reader with Classroom on your computer (for students): https://support.google.com/edu/classroom/answer/6084551
4. Classroom Help - Create a class: https://support.google.com/edu/classroom/answer/6020273?co=GENIE.Platform%3DDesktop&hl=en
5. Classroom Help - Create an assignment: https://support.google.com/edu/classroom/answer/6020265?co=GENIE.Platform%3DDesktop&hl=en
6. Classroom Help - Add a co-teacher to a class: https://support.google.com/edu/classroom/answer/6190760?co=GENIE.Platform%3DDesktop&hl=en
7. Classroom Help - View or update your gradebook: https://support.google.com/edu/classroom/answer/9199710?hl=en-EN
8. Classroom Help - Use the calendars as a teacher: https://support.google.com/edu/classroom/answer/7184151?co=GENIE.Platform%3DDesktop&hl=en
9. Classroom Help - Configure class settings: https://support.google.com/edu/classroom/answer/6173514?hl=en
10. Google Classroom API resources: https://developers.google.com/workspace/classroom/guides/key-concepts/api-structure
