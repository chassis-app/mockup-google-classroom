# Google Classroom Enhanced Feature List

Last updated: 2026-03-25

## Purpose

This feature list combines:

- the repo's existing Classroom study in `docs/google-classroom-study.md`,
- the local Google reference assets in `refs/google-classroom/`,
- and the real-product UI evidence captured in `Google Classroom Screenshots.pdf`.

The goal is to turn the current research into a more implementation-ready feature list for a high-fidelity mockup.

## What the screenshot PDF confirms

The PDF is image-based and shows real Classroom flows across teacher and student views. It confirms the following product details beyond the current high-level study:

### 1. Dashboard and navigation

- classes dashboard with a left rail for `Home`, `Calendar`, teaching classes, enrolled classes, `To review`, archived classes, and settings
- class card grid with themed banners and quick access to class pages
- top-level `Create class` modal with fields for class name, section, subject, and room
- persistent class-level tabs: `Stream`, `Classwork`, `People`, and `Grades`
- utility actions in the class header for calendar, additional tools, and settings

### 2. Stream behavior

- class hero/banner at the top of the stream
- `Meet` card with link-generation management
- class code card with copy/display action
- upcoming-work card with `View all`
- announcement composer embedded in the stream
- announcement formatting controls
- announcement attachments from integrated sources
- class comments directly under posts
- stream settings entry point
- visible stream posts generated from classwork activity

### 3. Classwork authoring and organization

- topic-based organization with empty-state guidance
- topic creation modal
- topic filter dropdown (`All topics`)
- create menu with:
  - assignment
  - quiz assignment
  - question
  - material
  - reuse post
  - topic
- classwork cards that show due date, counts, and rubric metadata
- teacher-side status counts such as `Turned in` and `Assigned`

### 4. Assignment composer

- title and instructions editor
- assignment targeting by class and by student segment
- points selector
- due date and due time controls
- topic selection
- rubric creation entry
- originality / plagiarism checkbox
- option to close submissions after the due date
- attach actions for:
  - Drive
  - YouTube
  - Create Google file
  - Upload
  - Link
- assign action plus saved-draft behavior

### 5. Rubrics

- rubric builder with scoring toggle
- configurable point ordering
- multiple criteria
- multiple performance levels per criterion
- criterion descriptions and level descriptions
- rubric score surfaced back on the classwork card and submission/grading views

### 6. People and roster flows

- separate teachers and students sections
- invite-teacher and invite-student controls
- empty-state messaging for classes without students yet

### 7. Student submission flow

- student assignment detail page with due date, points, and instructions
- `Your work` card on the right side
- `Add or create` action inside the submission panel
- `Mark as done` workflow
- `Turn in` workflow after attaching work
- class comments and private comments as separate channels
- teacher feedback shown in private comments
- rubric visible to the student during work/review

### 8. Teacher grading flow

- submission review screen with `Instructions` and `Student work` tabs
- roster list grouped or filtered by submission state
- sort by status flow
- per-student grading panel
- rubric-based scoring in the grading view
- `Return` action to send grades back
- teacher-student private comment thread inside grading
- gradebook grid with sortable student list and class average row

### 9. Settings and policy controls

- editable class details: name, description, section, room, subject
- invite-link management
- class code management and display
- stream posting permissions such as `Students can post and comment`
- classwork-on-stream display mode such as condensed notifications
- deleted-items visibility toggle
- Meet link management area
- grade calculation mode
- overall-grade visibility toggle for students
- grade categories area

## Features already supported by the existing study but not always visible in the PDF

These remain important because they are documented in the repo's study and Google reference materials:

- co-teacher role and permission differences
- guardian summaries by email
- Calendar integration and due-date calendar views
- Drive class folder and file storage model
- Gmail / email flows from roster-related screens
- questions with short-answer and multiple-choice variants
- materials as non-submission content
- originality reports as a supported grading aid
- add-ons / external tool attachments
- analytics and education-leader reporting
- SIS sync / roster provisioning
- admin controls
- AI-assisted and differentiated-learning features referenced in the product-page assets

## Recommended enhanced feature list for the mockup

This is the suggested implementation-facing feature list after combining the screenshot evidence with the current study.

### A. Core Classroom parity

- multi-class dashboard with teaching, enrolled, and review-oriented left-rail sections
- rich class cards with banner art, teacher identity, quick actions, and invitation state
- class shell with stable tabs for Stream, Classwork, People, Grades, and student `Your work`
- stream page with Meet card, class code card, upcoming work, announcements, and threaded comments
- classwork page with topics, filters, create menu, and mixed work-item cards
- assignment builder with attachments, due-date controls, targeting, topic placement, and draft/assign states
- people page with teachers/students sections, invite flows, and empty states
- gradebook with class average, sortable roster, and assignment columns
- teacher grading screen with rubric scoring, comments, and return flow
- student submission screen with `Add or create`, `Mark as done`, `Turn in`, rubric visibility, and private comments
- settings page with class metadata, permissions, invite controls, Meet controls, and grade-calculation settings

### B. High-value fidelity upgrades

- `To review` surface for teachers as a first-class workload inbox
- archived-class access and archived state styling
- class banner customization and theme selection
- generated stream events when assignments are posted or updated
- per-topic empty states and topic-management actions
- status chips for assigned, turned in, returned, missing, and late
- work summary counts on cards and in grade views
- reused-post workflow in classwork creation
- condensed-vs-full classwork notifications on the stream
- class-code copy, reveal, and invite-link affordances

### C. Workspace integration layer

- Drive folder entry points and attachment previews
- YouTube-first media assignment flow
- Google file creation shortcuts from assignment authoring
- Calendar surface tied to due dates and class events
- Meet entry points from stream and settings
- Gmail-style email actions from people/roster views

### D. Advanced teacher controls

- assignment targeting to selected students
- close-submissions-after-due-date policy
- rubric templates and rubric reuse
- originality-report indicator and review state
- grade categories and configurable overall-grade mode
- stream posting/comment permissions by role
- deleted-item visibility and moderation affordances

### E. Student experience layer

- clear `Your work` status panel per assignment
- lightweight student dashboard for missing, assigned, and returned work
- visible due dates, rubric criteria, and grading feedback
- separate class comments and private teacher comments
- direct path from stream activity to assignment detail

### F. Admin, analytics, and extension layer

- educator insight dashboard summarizing assignment completion and missing work
- school leader / admin overview screens from the existing product research
- SIS sync placeholders and roster provenance indicators
- guardian summary placeholders
- add-on marketplace or integrated-tool cards
- AI helper placeholders for practice sets, differentiated support, or teacher assist

## Suggested prioritization

### MVP

- dashboard with class cards and left navigation
- stream with announcements, class code, upcoming work, and Meet block
- classwork with topics and create menu
- assignment detail and assignment composer
- people roster
- grades grid
- student submission page

### Phase 2

- rubric builder and rubric grading
- assignment status counts and `To review`
- archived classes
- settings page with permissions and grading controls
- calendar view
- invite-link and class-code management

### Phase 3

- originality reporting
- add-ons and external integrations
- analytics / educator insights
- guardian and admin views
- AI support surfaces

## Key product takeaway

The screenshot PDF makes the product feel more concrete than the current written study alone: Classroom is not just a class feed with assignments, but a tightly connected workflow system with visible teacher tooling, student submission states, rubric-driven assessment, and settings-level policy controls. A strong mockup should preserve that operational depth, not only the tab structure.
