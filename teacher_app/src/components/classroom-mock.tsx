import Image from "next/image";
import Link from "next/link";
import {
  Archive,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronDown,
  CircleDot,
  ClipboardList,
  Copy,
  Ellipsis,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  Link2,
  Menu,
  MonitorPlay,
  NotebookTabs,
  Plus,
  Search,
  Settings,
  Sparkles,
  Speech,
  Upload,
  Users,
  Video,
} from "lucide-react";
import {
  announcements,
  assignmentDraft,
  classes,
  getClassroom,
  getClassSettings,
  getSubmissionRecords,
  getWorkItem,
  gradeRows,
  people,
  referenceImages,
  tabs,
  workItems,
  type Announcement,
  type ClassTab,
  type Classroom,
  type SubmissionRecord,
  type WorkItem,
} from "@/lib/mock-data";

type DashboardProps = {
  activeClassId?: string;
};

type ClassPageProps = {
  classId: string;
  activeTab: ClassTab;
};

const globalLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
];

const createOptions = [
  "Assignment",
  "Quiz assignment",
  "Question",
  "Material",
  "Reuse post",
  "Topic",
];

export function DashboardPage({ activeClassId = classes[0].id }: DashboardProps) {
  const activeClass = getClassroom(activeClassId);

  return (
    <AppFrame currentHref="/">
      <div className="space-y-6">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <Card className="p-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] px-5 py-4 md:px-6">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-soft)]">Classes</p>
                <h1 className="mt-1 text-[28px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
                  Google Classroom-style dashboard
                </h1>
              </div>
              <div className="flex flex-wrap gap-2">
                <ActionButton label="Join class" subtle />
                <ActionButton label="Create class" icon={Plus} />
              </div>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
              {classes.map((item) => (
                <Link
                  key={item.id}
                  href={`/class/${item.id}/stream`}
                  className={`overflow-hidden rounded-[12px] border bg-white transition hover:border-[var(--color-border-strong)] hover:shadow-[0_2px_8px_rgba(60,64,67,0.15)] ${
                    item.id === activeClass.id ? "border-[var(--color-blue)]" : "border-[var(--color-border)]"
                  }`}
                >
                  <div className={`h-28 bg-gradient-to-br ${item.theme}`} />
                  <div className="space-y-3 px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-medium text-[var(--color-text)]">{item.name}</h3>
                        <p className="text-sm text-[var(--color-text-soft)]">{item.section}</p>
                      </div>
                      <button
                        type="button"
                        className="rounded-full p-1 text-[var(--color-text-soft)]"
                        aria-label={`Open options for ${item.name}`}
                      >
                        <Ellipsis className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm leading-6 text-[var(--color-text-soft)]">{item.hero}</p>
                    <div className="grid gap-1 text-xs text-[var(--color-text-soft)]">
                      <span>{item.teacher}</span>
                      <span>{item.subject} · {item.room}</span>
                      <span>{item.upcoming}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-soft)]">
                    <span>{item.roster} students</span>
                    <span className="text-[var(--color-blue)]">Open</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <p className="text-sm font-medium text-[var(--color-text)]">Create class</p>
              <div className="mt-4 space-y-3">
                {[
                  activeClass.name,
                  activeClass.section,
                  activeClass.subject,
                  activeClass.room,
                ].map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-3 text-sm text-[var(--color-text-soft)]"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[var(--color-text)]">Reference surfaces</p>
                <span className="text-xs text-[var(--color-text-soft)]">Google for Education</span>
              </div>
              <div className="mt-4 space-y-4">
                {referenceImages.map((image) => (
                  <div key={image.title} className="space-y-2">
                    <div className="overflow-hidden rounded-[10px] border border-[var(--color-border)]">
                      <Image
                        src={image.path}
                        alt={image.title}
                        width={1200}
                        height={700}
                        className="h-32 w-full object-cover object-top"
                        loading={image === referenceImages[0] ? "eager" : undefined}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">{image.title}</p>
                      <p className="text-xs leading-5 text-[var(--color-text-soft)]">{image.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-sm font-medium text-[var(--color-text)]">Revamp focus</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-soft)]">
                <li>Match Classroom shell, spacing, and card density.</li>
                <li>Keep teacher and student workflows visible in the same mockup.</li>
                <li>Blend custom client features into the Classroom baseline.</li>
              </ul>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard label="Roster" value={`${activeClass.roster} students`} note="Teachers and students separated in People." />
          <SummaryCard label="On-time turn-in" value={`${activeClass.completion}%`} note="Mirrors the grade and submission story." />
          <SummaryCard label="Client extension" value="Insights+" note="Keeps pacing and intervention as a secondary layer." />
        </section>
      </div>
    </AppFrame>
  );
}

export function CalendarOverviewPage() {
  const nextDeadlines = workItems
    .filter((item) => item.status !== "Draft")
    .slice(0, 4);

  return (
    <AppFrame currentHref="/calendar">
      <section className="space-y-4">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-soft)]">Calendar</p>
              <h1 className="mt-1 text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
                Upcoming work and class schedule
              </h1>
            </div>
            <ActionButton label="Add event" subtle />
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="p-5">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, index) => {
                  const day = index + 1;
                  const highlighted = [18, 20, 22, 24].includes(day);

                  return (
                    <div
                      key={day}
                      className={`min-h-20 rounded-[10px] border px-2 py-2 text-sm ${
                        highlighted
                          ? "border-[var(--color-blue)] bg-[var(--color-blue-soft)] text-[var(--color-text)]"
                          : "border-[var(--color-border)] bg-white text-[var(--color-text-soft)]"
                      }`}
                    >
                      <div className="font-medium">{day}</div>
                      {highlighted ? <p className="mt-2 text-xs">Classwork due</p> : null}
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="p-5">
                <p className="text-sm font-medium text-[var(--color-text)]">Due soon</p>
                <div className="mt-4 space-y-3">
                  {nextDeadlines.map((item) => (
                    <SubtleAction
                      key={item.id}
                      title={item.title}
                      body={`${item.topic} · ${item.due}`}
                    />
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <p className="text-sm font-medium text-[var(--color-text)]">Google Classroom fit</p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                  This page gives the shell a real calendar destination instead of routing the label back into a class
                  page. It keeps due dates and class events visible from the global workspace level.
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </section>
    </AppFrame>
  );
}

export function ReviewOverviewPage() {
  const reviewItems = getSubmissionRecords("w1");

  return (
    <AppFrame currentHref="/review">
      <section className="space-y-4">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-soft)]">To review</p>
              <h1 className="mt-1 text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
                Teacher review queue
              </h1>
            </div>
            <Link
              href="/class/biology-240/classwork/w1/review"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
            >
              Open review flow
            </Link>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="p-0">
              <div className="border-b border-[var(--color-border)] px-5 py-4">
                <p className="text-sm font-medium text-[var(--color-text)]">Needs attention</p>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {reviewItems.map((submission) => (
                  <div key={submission.id} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)]">{submission.student}</p>
                        <p className="mt-1 text-xs text-[var(--color-text-soft)]">{submission.submittedAt}</p>
                      </div>
                      <SubmissionStatus status={submission.status} />
                    </div>
                    <p className="mt-3 text-sm text-[var(--color-text-soft)]">{submission.note}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-4">
              <SummaryCard label="Turned in" value="21" note="Ready for rubric scoring." />
              <SummaryCard label="Missing" value="3" note="Still need a teacher follow-up." />
              <SummaryCard label="Returned" value="18" note="Already sent back with feedback." />
            </div>
          </div>
        </Card>
      </section>
    </AppFrame>
  );
}

export function TodoOverviewPage() {
  const todoItems = workItems.filter((item) => item.status !== "Draft").slice(0, 4);

  return (
    <AppFrame currentHref="/todo">
      <section className="space-y-4">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-soft)]">To-do</p>
              <h1 className="mt-1 text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
                Student work summary
              </h1>
            </div>
            <Link
              href="/class/biology-240/your-work"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text)]"
            >
              Open your work
            </Link>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="space-y-4">
              <SummaryCard label="Assigned" value="3" note="Current work ready to open." />
              <SummaryCard label="Returned" value="11" note="Includes rubric feedback." />
              <SummaryCard label="Missing" value="1" note="Needs follow-up before class." />
            </div>

            <Card className="p-0">
              <div className="border-b border-[var(--color-border)] px-5 py-4">
                <p className="text-sm font-medium text-[var(--color-text)]">Upcoming tasks</p>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {todoItems.map((item) => (
                  <Link key={item.id} href={`/class/biology-240/your-work/${item.id}`} className="block px-5 py-4">
                    <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
                    <p className="mt-1 text-sm text-[var(--color-text-soft)]">{item.topic} · {item.due}</p>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </Card>
      </section>
    </AppFrame>
  );
}

export function ArchivedClassesPage() {
  const archived = classes.slice(1);

  return (
    <AppFrame currentHref="/archived">
      <section className="space-y-4">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-soft)]">Archived classes</p>
              <h1 className="mt-1 text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
                Past classes and templates
              </h1>
            </div>
            <ActionButton label="Restore class" subtle />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {archived.map((item) => (
              <Card key={item.id} className="p-5">
                <p className="text-lg font-medium text-[var(--color-text)]">{item.name}</p>
                <p className="mt-1 text-sm text-[var(--color-text-soft)]">{item.section}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--color-text-soft)]">{item.description ?? item.hero}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-[var(--color-text-soft)]">
                  <span>{item.teacher}</span>
                  <Link href={`/class/${item.id}/stream`} className="text-[var(--color-blue)]">
                    Open
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>
    </AppFrame>
  );
}

export function ClassPage({ classId, activeTab }: ClassPageProps) {
  const classroom = getClassroom(classId);

  return (
    <ClassScaffold currentHref={`/class/${classroom.id}/${activeTab}`} classroom={classroom} activeTab={activeTab}>
      {activeTab === "stream" && <StreamTab classroom={classroom} />}
      {activeTab === "classwork" && <ClassworkTab classroom={classroom} />}
      {activeTab === "people" && <PeopleTab />}
      {activeTab === "grades" && <GradesTab />}
      {activeTab === "your-work" && <YourWorkTab classroom={classroom} />}
      {activeTab === "insights" && <InsightsTab />}
    </ClassScaffold>
  );
}

export function ClassSettingsPage({ classId }: { classId: string }) {
  const classroom = getClassroom(classId);
  const settings = getClassSettings(classId);

  return (
    <ClassScaffold currentHref={`/class/${classroom.id}/settings`} classroom={classroom}>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/class/${classroom.id}/stream`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-blue)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to class
          </Link>
          <ActionButton label="Save" />
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">Class details</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <ComposerField label="Class name" value={classroom.name} />
              <ComposerField label="Section" value={classroom.section} />
              <ComposerField label="Subject" value={classroom.subject} />
              <ComposerField label="Room" value={classroom.room} />
              <div className="md:col-span-2">
                <ComposerField label="Description" value={classroom.description ?? ""} />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-xl font-medium text-[var(--color-text)]">General</h3>
            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <ComposerField label="Invite link" value={settings.inviteLink} />
                <ComposerField label="Class code" value={classroom.classCode} />
                <ComposerField label="Stream" value={settings.streamPermission} />
                <ComposerField label="Classwork on the stream" value={settings.classworkOnStream} />
              </div>

              <div className="space-y-4">
                <CheckboxPanel
                  title="Invite codes"
                  description="Settings apply to both invite links and class codes."
                  checked={settings.inviteCodesEnabled}
                />
                <CheckboxPanel
                  title="Show deleted items"
                  description="Only teachers can view deleted items."
                  checked={settings.showDeletedItems}
                />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-xl font-medium text-[var(--color-text)]">Manage Meet link</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">{settings.meetLinkMessage}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <ComposerField label="Meet link" value={classroom.meetLink} />
              <ComposerField label="Visibility" value="Visible to students" />
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-xl font-medium text-[var(--color-text)]">Grading</h3>
            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <ComposerField label="Overall grade calculation" value={settings.overallGradeCalculation} />
                <ComposerField label="Grade categories" value={settings.gradeCategories.join(" · ")} />
              </div>

              <div className="space-y-4">
                <CheckboxPanel
                  title="Show overall grade to students"
                  description="Student visibility follows the selected grading mode."
                  checked={settings.showOverallGradeToStudents}
                />
                <Card className="p-4">
                  <p className="text-sm font-medium text-[var(--color-text)]">Why this matters</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                    This screen rounds out the mock with the class-level policy controls visible in real Classroom:
                    invite management, stream permissions, Meet visibility, and grading behavior.
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </ClassScaffold>
  );
}

export function AssignmentComposerPage({ classId }: { classId: string }) {
  const classroom = getClassroom(classId);

  return (
    <ClassScaffold
      classroom={classroom}
      activeTab="classwork"
      currentHref={`/class/${classroom.id}/classwork/new-assignment`}
    >
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/class/${classroom.id}/classwork`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-blue)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to classwork
          </Link>
          <div className="flex flex-wrap gap-2">
            <ActionButton label="Save draft" subtle />
            <ActionButton label="Assign" />
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
              <ClipboardList className="h-4 w-4 text-[var(--color-purple)]" />
              Assignment
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-soft)]">Title</p>
                <p className="mt-2 text-lg text-[var(--color-text)]">{assignmentDraft.title}</p>
              </div>

              <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
                  Instructions
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                  {assignmentDraft.instructions}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-[var(--color-text-soft)]">
                  <ComposerTool label="Bold" />
                  <ComposerTool label="Italic" />
                  <ComposerTool label="Underline" />
                  <ComposerTool label="Bullets" />
                </div>
              </div>

              <div className="rounded-[10px] border border-[var(--color-border)] px-4 py-4">
                <p className="text-sm font-medium text-[var(--color-text)]">Attach</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {assignmentDraft.attachments.map((label) => (
                    <AttachmentOption key={label} label={label} />
                  ))}
                </div>
              </div>

              <div className="rounded-[10px] border border-[var(--color-border)] px-4 py-4">
                <p className="text-sm font-medium text-[var(--color-text)]">Rubric preview</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <RubricCriterionCard
                    title="Signal pathway"
                    body="Explains how the signal starts, moves, and changes the cell response."
                  />
                  <RubricCriterionCard
                    title="Scientific vocabulary"
                    body="Uses correct terms for receptors, amplification, and response."
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <p className="text-sm font-medium text-[var(--color-text)]">Assignment settings</p>
              <div className="mt-4 space-y-3">
                <ComposerField label="For" value={assignmentDraft.forClass} />
                <ComposerField label="Assigned to" value={assignmentDraft.assignedTo} />
                <ComposerField label="Points" value={`${assignmentDraft.points}`} />
                <ComposerField label="Due" value={assignmentDraft.due} />
                <ComposerField label="Topic" value={assignmentDraft.topic} />
                <ComposerField label="Rubric" value={assignmentDraft.rubric} />
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-sm font-medium text-[var(--color-text)]">Submission rules</p>
              <div className="mt-4 space-y-4 text-sm text-[var(--color-text-soft)]">
                <CheckboxRow
                  label="Check originality reports"
                  checked={assignmentDraft.originalityReports}
                />
                <CheckboxRow
                  label="Close submissions after due date"
                  checked={assignmentDraft.closeSubmissions}
                />
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-sm font-medium text-[var(--color-text)]">What this adds</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                This page turns the classwork tab into a real teacher authoring workflow instead of a visual placeholder.
                It aligns to the Classroom screenshots with title, instructions, attachments, due settings, rubric, and
                submission policy controls.
              </p>
            </Card>
          </div>
        </section>
      </section>
    </ClassScaffold>
  );
}

export function AssignmentDetailPage({
  classId,
  workId,
}: {
  classId: string;
  workId: string;
}) {
  const classroom = getClassroom(classId);
  const item = getWorkItem(workId);
  const submissions = getSubmissionRecords(workId);

  return (
    <ClassScaffold
      classroom={classroom}
      activeTab="classwork"
      currentHref={`/class/${classroom.id}/classwork/${workId}`}
    >
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/class/${classroom.id}/classwork`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-blue)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to classwork
          </Link>
          <div className="flex flex-wrap gap-2">
            <ActionButton label="Edit assignment" subtle />
            <Link
              href={`/class/${classroom.id}/classwork/${workId}/review`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
            >
              Open submissions
            </Link>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                <div>
                  <p className="text-sm text-[var(--color-text-soft)]">{item.type}</p>
                  <h2 className="mt-1 text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)]">
                    {item.description}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <SummaryCard label="Assigned" value={`${item.assigned}`} note="Students selected for this work." />
                <SummaryCard label="Turned in" value={`${item.turnedIn}`} note="Ready for review or return." />
                <SummaryCard
                  label="Rubric"
                  value={item.rubric ?? "No rubric"}
                  note="Visible in grading and student work."
                />
              </div>

              {item.attachments?.length ? (
                <div className="mt-5">
                  <p className="text-sm font-medium text-[var(--color-text)]">Attachments</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.attachments.map((attachment) => (
                      <AttachmentPill key={attachment} label={attachment} />
                    ))}
                  </div>
                </div>
              ) : null}
            </Card>

            <Card className="p-5">
              <p className="text-sm font-medium text-[var(--color-text)]">Rubric criteria</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <RubricCriterionCard
                  title="Signal pathway"
                  body="Shows how the receptor triggers the signal and how the cell response changes."
                />
                <RubricCriterionCard
                  title="Scientific vocabulary"
                  body="Uses accurate terms and connects them to the diagram or explanation."
                />
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-[var(--color-text)]">Student work</p>
                <span className="text-sm text-[var(--color-text-soft)]">Recent submissions</span>
              </div>
              <div className="mt-4 space-y-3">
                {submissions.map((submission) => (
                  <SubmissionRow key={submission.id} submission={submission} />
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <p className="text-sm font-medium text-[var(--color-text)]">Assignment details</p>
              <div className="mt-4 space-y-3">
                <ComposerField label="Topic" value={item.topic} />
                <ComposerField label="Due" value={item.due} />
                <ComposerField label="Points" value={item.points ? `${item.points}` : "Ungraded"} />
                <ComposerField label="Posted" value={item.postedAt ?? "Recently posted"} />
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-sm font-medium text-[var(--color-text)]">Teacher flow</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                This page gives the teacher a believable midpoint between classwork and grading: assignment context,
                rubric, attachment set, and a quick view of who is turned in, returned, or missing.
              </p>
            </Card>
          </div>
        </section>
      </section>
    </ClassScaffold>
  );
}

export function SubmissionReviewPage({
  classId,
  workId,
}: {
  classId: string;
  workId: string;
}) {
  const classroom = getClassroom(classId);
  const item = getWorkItem(workId);
  const submissions = getSubmissionRecords(workId);
  const selectedSubmission = submissions[0];

  return (
    <ClassScaffold
      classroom={classroom}
      activeTab="classwork"
      currentHref={`/class/${classroom.id}/classwork/${workId}/review`}
    >
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/class/${classroom.id}/classwork/${workId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-blue)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to assignment
          </Link>
          <div className="flex flex-wrap gap-2">
            <ActionButton label="Return" />
            <ActionButton label="Email student" subtle />
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <Card className="p-0">
            <div className="border-b border-[var(--color-border)] px-5 py-4">
              <p className="text-sm font-medium text-[var(--color-text)]">Student work</p>
              <p className="mt-1 text-sm text-[var(--color-text-soft)]">{item.title}</p>
            </div>
            <div className="space-y-2 p-4">
              {submissions.map((submission) => (
                <Link
                  key={submission.id}
                  href={`/class/${classroom.id}/classwork/${workId}/review`}
                  className={`block rounded-[10px] border px-4 py-4 ${
                    submission.id === selectedSubmission?.id
                      ? "border-[var(--color-blue)] bg-[var(--color-blue-soft)]"
                      : "border-[var(--color-border)] bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-[var(--color-text)]">{submission.student}</p>
                    <SubmissionStatus status={submission.status} />
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-text-soft)]">{submission.submittedAt}</p>
                  {submission.grade ? (
                    <p className="mt-2 text-sm font-medium text-[var(--color-text)]">{submission.grade}</p>
                  ) : null}
                </Link>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                <div>
                  <p className="text-sm text-[var(--color-text-soft)]">{selectedSubmission.student}</p>
                  <h2 className="mt-1 text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                    Turned in · {selectedSubmission.submittedAt}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-[var(--color-text)]">{selectedSubmission.grade ?? "Ungraded"}</p>
                  <p className="text-sm text-[var(--color-text-soft)]">{item.points} points</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="space-y-4">
                  <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-5">
                    <p className="text-sm font-medium text-[var(--color-text)]">Submitted work</p>
                    <p className="mt-3 text-sm text-[var(--color-text-soft)]">
                      {selectedSubmission.attachment ?? "Student attachment not uploaded yet."}
                    </p>
                  </div>

                  <div className="rounded-[10px] border border-[var(--color-border)] px-4 py-4">
                    <p className="text-sm font-medium text-[var(--color-text)]">Private comments</p>
                    <div className="mt-4 space-y-3 text-sm text-[var(--color-text-soft)]">
                      <CommentBubble author={selectedSubmission.student} body={selectedSubmission.note} />
                      <CommentBubble
                        author={classroom.teacher}
                        body="Strong explanation overall. Tighten the connection between the receptor and the final response."
                        teacher
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="p-4">
                    <p className="text-sm font-medium text-[var(--color-text)]">Rubric scoring</p>
                    <div className="mt-4 space-y-3">
                      <ScoreRow label="Signal pathway" value="46 / 50" />
                      <ScoreRow label="Scientific vocabulary" value="50 / 50" />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <p className="text-sm font-medium text-[var(--color-text)]">Teacher actions</p>
                    <div className="mt-4 space-y-2">
                      <ActionButton label="Return work" />
                      <ActionButton label="Save draft score" subtle />
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </section>
    </ClassScaffold>
  );
}

export function StudentAssignmentPage({
  classId,
  workId,
}: {
  classId: string;
  workId: string;
}) {
  const classroom = getClassroom(classId);
  const item = getWorkItem(workId);

  return (
    <ClassScaffold
      classroom={classroom}
      activeTab="your-work"
      currentHref={`/class/${classroom.id}/your-work/${workId}`}
    >
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/class/${classroom.id}/your-work`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-blue)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to your work
          </Link>
          <div className="flex flex-wrap gap-2">
            <ActionButton label="Mark as done" subtle />
            <ActionButton label="Turn in" />
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] pb-4">
              <div>
                <p className="text-sm text-[var(--color-text-soft)]">{classroom.teacher} · {item.postedAt}</p>
                <h2 className="mt-1 text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{item.description}</p>
              </div>
              <div className="text-right text-sm text-[var(--color-text-soft)]">
                <p>{item.points} points</p>
                <p>{item.due}</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {item.rubric?.split(" · ").map((criterion) => (
                <div key={criterion} className="rounded-[10px] border border-[var(--color-border)] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-[var(--color-text)]">{criterion}</span>
                    <span className="text-sm text-[var(--color-text-soft)]">/50</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                    Review this criterion before you upload so your explanation stays aligned with the rubric.
                  </p>
                </div>
              ))}

              <div className="rounded-[10px] border border-[var(--color-border)] px-4 py-4">
                <p className="text-sm font-medium text-[var(--color-text)]">Class comments</p>
                <div className="mt-4 space-y-3">
                  <CommentBubble
                    author="Sofia Carter"
                    body="Can we use the annotation template from yesterday's lab?"
                  />
                  <CommentBubble
                    author={classroom.teacher}
                    body="Yes. You can attach the template and record your explanation over it."
                    teacher
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[var(--color-text)]">Your work</p>
                <span className="text-xs font-medium text-[var(--color-blue)]">Assigned</span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-3 text-sm text-[var(--color-text)]">
                  Storyboard video.mp4
                </div>
                <button type="button" className="w-full rounded-[8px] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)]">
                  Add or create
                </button>
                <button type="button" className="w-full rounded-[8px] bg-[var(--color-text)] px-3 py-2 text-sm font-medium text-white">
                  Turn in
                </button>
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-sm font-medium text-[var(--color-text)]">Private comments</p>
              <div className="mt-4 space-y-3">
                <CommentBubble author="Sofia Carter" body="I updated the amplification section." />
                <CommentBubble
                  author={classroom.teacher}
                  body="Looks stronger. Make sure the last frame explains the final cell response clearly."
                  teacher
                />
              </div>
            </Card>
          </div>
        </section>
      </section>
    </ClassScaffold>
  );
}

function ClassScaffold({
  classroom,
  activeTab,
  currentHref,
  children,
}: {
  classroom: Classroom;
  activeTab?: ClassTab;
  currentHref: string;
  children: React.ReactNode;
}) {
  const resolvedActiveTab =
    activeTab ?? tabs.find((tab) => currentHref.startsWith(`/class/${classroom.id}/${tab.id}`))?.id;

  return (
    <AppFrame currentHref={currentHref}>
      <div className="space-y-5">
        <ClassBanner classroom={classroom} />
        <ClassTabs classroom={classroom} activeTab={resolvedActiveTab} />
        {children}
      </div>
    </AppFrame>
  );
}

function AppFrame({ children, currentHref }: { children: React.ReactNode; currentHref: string }) {
  const currentClassId = currentHref.match(/\/class\/([^/]+)/)?.[1] ?? classes[0].id;
  const utilityLinks = [
    { href: "/review", label: "To review", icon: NotebookTabs },
    { href: "/todo", label: "To-do", icon: BookOpen },
    { href: "/archived", label: "Archived classes", icon: Archive },
    { href: `/class/${currentClassId}/settings`, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-blue)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-r border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-5">
          <div className="flex items-center gap-3 px-2">
            <button type="button" className="rounded-full p-2 text-[var(--color-text-soft)]" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#e8f0fe] text-[var(--color-blue)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-[30px] font-normal tracking-[-0.01em] text-[var(--color-text)]">Classroom</span>
          </div>

          <nav className="mt-5 space-y-5" aria-label="Sidebar">
            <div className="space-y-1">
              {globalLinks.map((item) => (
                <SidebarLink key={item.label} {...item} currentHref={currentHref} />
              ))}
            </div>

            <div>
              <p className="px-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-soft)]">
                Teaching
              </p>
              <div className="mt-2 space-y-1">
                {classes.map((item) => (
                  <SidebarLink
                    key={item.id}
                    href={`/class/${item.id}/stream`}
                    label={item.name}
                    icon={Users}
                    currentHref={currentHref}
                    detail={item.section}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="px-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-soft)]">
                Workspace
              </p>
              <div className="mt-2 space-y-1">
                {utilityLinks.map((item) => (
                  <SidebarLink key={item.label} {...item} currentHref={currentHref} />
                ))}
              </div>
            </div>
          </nav>
        </aside>

        <main id="main-content" className="min-w-0">
          <header className="border-b border-[var(--color-border)] bg-white px-4 py-3 md:px-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="min-w-[260px] flex-1">
                <div className="flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-2.5 text-[var(--color-text-soft)]">
                  <Search className="h-4 w-4" />
                  <span className="text-sm">Search this mockup</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <HeaderIconButton icon={Plus} label="Create" />
                <HeaderIconButton icon={CalendarDays} label="Calendar" href="/calendar" />
                <HeaderIconButton icon={Settings} label="Settings" href={`/class/${currentClassId}/settings`} />
              </div>
            </div>
          </header>

          <div className="px-4 py-5 md:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function ClassBanner({ classroom }: { classroom: Classroom }) {
  return (
    <section className="overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-white">
      <div className={`relative h-44 bg-gradient-to-r ${classroom.theme}`}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,33,36,0.05),rgba(32,33,36,0.55))]" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 px-5 py-5 text-white md:px-6">
          <div>
            <h1 className="text-[32px] font-medium tracking-[-0.02em]">{classroom.name}</h1>
            <p className="mt-1 text-sm text-white/88">
              {classroom.section} · {classroom.subject} · {classroom.room}
            </p>
            <p className="mt-1 text-sm text-white/78">{classroom.teacher}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/88">
            <span className="rounded-full border border-white/35 bg-white/12 px-3 py-1">{classroom.classCode}</span>
            <span className="rounded-full border border-white/35 bg-white/12 px-3 py-1">{classroom.upcoming}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClassTabs({
  classroom,
  activeTab,
}: {
  classroom: Classroom;
  activeTab?: ClassTab;
}) {
  return (
    <nav
      aria-label="Class tabs"
      className="flex flex-wrap gap-6 border-b border-[var(--color-border)] bg-white px-1"
    >
      {tabs.map((tab) => {
        const href = `/class/${classroom.id}/${tab.id}`;
        const active = tab.id === activeTab;

        return (
          <Link
            key={tab.id}
            href={href}
            scroll={false}
            className={`border-b-[3px] px-1 py-3 text-sm font-medium transition ${
              active
                ? "border-[var(--color-purple)] text-[var(--color-text)]"
                : "border-transparent text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

function StreamTab({ classroom }: { classroom: Classroom }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MonitorPlay className="h-4 w-4 text-[var(--color-green)]" />
              <span className="text-sm font-medium text-[var(--color-text)]">Meet</span>
            </div>
            <button type="button" className="rounded-full p-1 text-[var(--color-text-soft)]" aria-label="Meet options">
              <Ellipsis className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            className="mt-4 inline-flex rounded-md border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)]"
          >
            Generate link
          </button>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--color-text)]">Class code</span>
            <button type="button" className="rounded-full p-1 text-[var(--color-text-soft)]" aria-label="Copy class code">
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 text-[32px] font-medium tracking-[0.04em] text-[var(--color-text)]">
            {classroom.classCode}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--color-text)]">Upcoming</span>
            <Link href={`/class/${classroom.id}/your-work`} className="text-sm text-[var(--color-blue)]">
              View all
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-soft)]">{classroom.upcoming}</p>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AvatarCircle name={classroom.teacher} />
            <button
              type="button"
              className="min-h-14 flex-1 rounded-[8px] border border-[var(--color-border)] px-4 text-left text-sm text-[var(--color-text-soft)]"
            >
              Announce something to your class
            </button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <Link href={`/class/${classroom.id}/classwork/${workItems[0].id}`} className="flex gap-3">
              <div className="rounded-full bg-[var(--color-blue-soft)] p-2 text-[var(--color-blue)]">
                <FolderKanban className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">
                  {classroom.teacher} posted a new assignment
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-soft)]">{workItems[0].title}</p>
              </div>
            </Link>
            <span className="text-xs text-[var(--color-text-soft)]">{workItems[0].due}</span>
          </div>
        </Card>

        {announcements.map((item) => (
          <AnnouncementCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function ClassworkTab({ classroom }: { classroom: Classroom }) {
  const workByTopic = groupWorkByTopic(workItems);

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/class/${classroom.id}/classwork/new-assignment`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-purple)] px-4 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            Create
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[8px] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)]"
          >
            All topics
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {Object.entries(workByTopic).map(([topic, items]) => (
          <Card key={topic} className="p-5">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
              <h2 className="text-[28px] font-normal text-[var(--color-purple)]">{topic}</h2>
              <button type="button" className="rounded-full p-1 text-[var(--color-text-soft)]" aria-label={`More actions for ${topic}`}>
                <Ellipsis className="h-4 w-4" />
              </button>
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {items.map((item) => (
                <WorkRow key={item.id} item={item} classroomId={classroom.id} />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <Card className="p-5">
          <p className="text-sm font-medium text-[var(--color-text)]">Create menu</p>
          <div className="mt-4 space-y-2">
            {createOptions.map((label) => (
              <Link
                key={label}
                href={label === "Assignment" ? `/class/${classroom.id}/classwork/new-assignment` : `/class/${classroom.id}/classwork`}
                className="flex items-center justify-between rounded-[8px] px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
              >
                <span>{label}</span>
                <ArrowRight className="h-4 w-4 text-[var(--color-text-soft)]" />
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-medium text-[var(--color-text)]">Assignment draft</p>
          <div className="mt-4 space-y-4">
            <Link
              href={`/class/${classroom.id}/classwork/new-assignment`}
              className="block rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-3 text-sm text-[var(--color-text)]"
            >
              {assignmentDraft.title}
            </Link>
            <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-4 text-sm leading-6 text-[var(--color-text-soft)]">
              {assignmentDraft.instructions}
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-[var(--color-text-soft)]">
              {assignmentDraft.attachments.slice(0, 3).map((label) => (
                <AttachmentChip key={label} label={label} />
              ))}
            </div>
            <div className="grid gap-2 text-sm text-[var(--color-text-soft)]">
              <span>For: {assignmentDraft.forClass}</span>
              <span>Due: {assignmentDraft.due}</span>
              <span>Rubric: {assignmentDraft.rubric}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-medium text-[var(--color-text)]">Client extension</p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
            Keep pathway prompts and intervention hints in lightweight side panels so the classwork board still
            reads as Classroom first.
          </p>
        </Card>
      </div>
    </section>
  );
}

function PeopleTab() {
  const teachers = people.filter((person) => person.role.toLowerCase().includes("teacher"));
  const students = people.filter((person) => person.role === "Student");

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="p-0">
        <RosterSection title="Teachers" items={teachers} />
        <RosterSection title="Students" items={students} />
      </Card>

      <div className="space-y-4">
        <Card className="p-5">
          <p className="text-sm font-medium text-[var(--color-text)]">Roster actions</p>
          <div className="mt-4 space-y-3">
            <SubtleAction title="Invite students" body="Send invite links or share the class code." />
            <SubtleAction title="Invite co-teacher" body="Mirror Classroom's co-teacher workflow." />
            <SubtleAction title="Email guardians" body="Keep guardian communication secondary to the roster." />
          </div>
        </Card>
      </div>
    </section>
  );
}

function GradesTab() {
  return (
    <section className="space-y-4">
      <Card className="p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <p className="text-sm font-medium text-[var(--color-text)]">Grades</p>
            <p className="text-sm text-[var(--color-text-soft)]">Class average and assignment scores</p>
          </div>
          <ActionButton label="Export gradebook" subtle />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface-subtle)] text-[var(--color-text-soft)]">
              <tr>
                <th className="px-5 py-4 font-medium">Student</th>
                <th className="px-5 py-4 font-medium">Turned in</th>
                <th className="px-5 py-4 font-medium">Missing</th>
                <th className="px-5 py-4 font-medium">Average</th>
                <th className="px-5 py-4 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--color-border)] bg-white">
                <td className="px-5 py-4 font-medium text-[var(--color-text)]">Class average</td>
                <td className="px-5 py-4 text-[var(--color-text-soft)]">10.8</td>
                <td className="px-5 py-4 text-[var(--color-text-soft)]">0.6</td>
                <td className="px-5 py-4 font-medium text-[var(--color-text)]">90%</td>
                <td className="px-5 py-4 text-[var(--color-text-soft)]">Stable</td>
              </tr>
              {gradeRows.map((row) => (
                <tr key={row.student} className="border-t border-[var(--color-border)] bg-white">
                  <td className="px-5 py-4 font-medium text-[var(--color-text)]">{row.student}</td>
                  <td className="px-5 py-4 text-[var(--color-text-soft)]">{row.turnedIn}</td>
                  <td className="px-5 py-4 text-[var(--color-text-soft)]">{row.missing}</td>
                  <td className="px-5 py-4 font-medium text-[var(--color-text)]">{row.average}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[var(--color-blue-soft)] px-3 py-1 text-xs font-medium text-[var(--color-blue)]">
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Returned today" value="18" note="Includes private comments." />
        <SummaryCard label="Missing alerts" value="4" note="Auto-highlighted in the grade flow." />
        <SummaryCard label="On track" value="22 students" note="Ready for the next topic." />
      </div>
    </section>
  );
}

function YourWorkTab({ classroom }: { classroom: Classroom }) {
  const focusItem = workItems[0];

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] pb-4">
          <div>
            <p className="text-sm text-[var(--color-text-soft)]">{classroom.teacher} · Yesterday</p>
            <h2 className="mt-1 text-[32px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
              {focusItem.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-soft)]">{focusItem.description}</p>
          </div>
          <div className="text-right text-sm text-[var(--color-text-soft)]">
            <p>{focusItem.points} points</p>
            <p>{focusItem.due}</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {focusItem.rubric?.split(" · ").map((criterion) => (
            <div key={criterion} className="rounded-[10px] border border-[var(--color-border)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-[var(--color-text)]">{criterion}</span>
                <span className="text-sm text-[var(--color-text-soft)]">/50</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[var(--color-surface-subtle)]">
                <div className="h-2 w-2/3 rounded-full bg-[var(--color-purple)]" />
              </div>
            </div>
          ))}

          <div className="rounded-[10px] border border-[var(--color-border)] px-4 py-4">
            <p className="text-sm font-medium text-[var(--color-text)]">Class comments</p>
            <div className="mt-4 space-y-3">
              <CommentBubble
                author="Sofia Carter"
                body="Can we add the template and the recorded explanation together?"
              />
              <CommentBubble
                author={classroom.teacher}
                body="Yes. Attach both and use private comments if you want me to review before you turn it in."
                teacher
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[var(--color-text)]">Your work</p>
            <span className="text-xs font-medium text-[var(--color-blue)]">Assigned</span>
          </div>
          <div className="mt-4 space-y-2">
            <Link
              href={`/class/${classroom.id}/your-work/${focusItem.id}`}
              className="block w-full rounded-[8px] border border-[var(--color-border)] px-3 py-2 text-center text-sm text-[var(--color-text)]"
            >
              Add or create
            </Link>
            <Link
              href={`/class/${classroom.id}/your-work/${focusItem.id}`}
              className="block w-full rounded-[8px] bg-[var(--color-text)] px-3 py-2 text-center text-sm font-medium text-white"
            >
              Turn in
            </Link>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-sm font-medium text-[var(--color-text)]">Private comments</p>
          <div className="mt-3 space-y-3 text-sm text-[var(--color-text-soft)]">
            <CommentBubble author="Sofia Carter" body="I have a draft ready. Can you check the vocabulary section?" />
            <CommentBubble author={classroom.teacher} body="Yes. Submit it and I will leave feedback in the rubric." teacher />
          </div>
        </Card>
      </div>
    </section>
  );
}

function InsightsTab() {
  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Attention heat" value="6 students" note="Need a teacher check-in." />
        <SummaryCard label="Guardian digest" value="Ready" note="Friday summary prepared." />
        <SummaryCard label="Pathway drift" value="2 topics" note="Behind the intended pacing." />
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-purple)]" />
          <p className="text-sm font-medium text-[var(--color-text)]">Insights+</p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <SubtleAction title="Group by learning path" body="Show which students need reteach, core work, or extension." />
          <SubtleAction title="Guardian-ready notes" body="Summarize missing work and praise in a single card." />
          <SubtleAction title="Engagement pulse" body="Blend submission pace with meeting attendance." />
          <SubtleAction title="Suggested teacher move" body="Prompt a next step without replacing Classroom's flow." />
        </div>
      </Card>
    </section>
  );
}

function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <AvatarCircle name={item.author} />
          <div>
            <p className="text-sm font-medium text-[var(--color-text)]">{item.author}</p>
            <p className="text-xs text-[var(--color-text-soft)]">{item.time}</p>
          </div>
        </div>
        <button type="button" className="rounded-full p-1 text-[var(--color-text-soft)]" aria-label={`Open options for ${item.title}`}>
          <Ellipsis className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4">
        <p className="text-base font-medium text-[var(--color-text)]">{item.title}</p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{item.body}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3">
        <span className="text-sm text-[var(--color-text-soft)]">{item.commentCount} class comments</span>
        <span className="text-xs font-medium text-[var(--color-blue)]">{item.tag}</span>
      </div>
    </Card>
  );
}

function WorkRow({ item, classroomId }: { item: WorkItem; classroomId: string }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 py-4">
      <Link href={`/class/${classroomId}/classwork/${item.id}`} className="flex gap-3">
        <div className="rounded-full bg-[var(--color-blue-soft)] p-2 text-[var(--color-blue)]">
          <CircleDot className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-soft)]">
            <span>{item.type}</span>
            <span>•</span>
            <span>{item.due}</span>
            {item.points ? (
              <>
                <span>•</span>
                <span>{item.points} points</span>
              </>
            ) : null}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-soft)]">
            <span>{item.turnedIn} turned in</span>
            <span>•</span>
            <span>{item.assigned} assigned</span>
            {item.rubric ? (
              <>
                <span>•</span>
                <span>{item.rubric}</span>
              </>
            ) : null}
          </div>
        </div>
      </Link>
      <StatusBadge status={item.status} />
    </div>
  );
}

function RosterSection({
  title,
  items,
}: {
  title: string;
  items: typeof people;
}) {
  return (
    <section className="border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <h2 className="text-[32px] font-normal tracking-[-0.02em] text-[var(--color-text)]">{title}</h2>
        <button type="button" className="rounded-full p-2 text-[var(--color-purple)]" aria-label={`Invite ${title.toLowerCase()}`}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {items.map((person) => (
          <div key={person.id} className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div className="flex items-center gap-3">
              <AvatarCircle name={person.name} />
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">{person.name}</p>
                <p className="text-sm text-[var(--color-text-soft)]">{person.email}</p>
              </div>
            </div>
            <span className="text-sm text-[var(--color-text-soft)]">{person.role}</span>
            <span className="text-sm text-[var(--color-text-soft)]">{person.streak}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  currentHref,
  detail,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  currentHref: string;
  detail?: string;
}) {
  const active = detail
    ? currentHref.startsWith(href.replace("/stream", ""))
    : currentHref === href || currentHref.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-r-full px-4 py-3 text-sm ${
        active
          ? "bg-[var(--color-blue-soft)] text-[var(--color-text)]"
          : "text-[var(--color-text-soft)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <div className="min-w-0">
        <p className="truncate">{label}</p>
        {detail ? <p className="truncate text-xs text-[var(--color-text-soft)]">{detail}</p> : null}
      </div>
    </Link>
  );
}

function HeaderIconButton({
  icon: Icon,
  label,
  href,
}: {
  icon: typeof Plus;
  label: string;
  href?: string;
}) {
  const className =
    "inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)]";

  if (href) {
    return (
      <Link href={href} className={className}>
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function ActionButton({
  label,
  icon: Icon,
  subtle,
}: {
  label: string;
  icon?: typeof Plus;
  subtle?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
        subtle
          ? "border border-[var(--color-border)] bg-white text-[var(--color-text)]"
          : "bg-[var(--color-blue)] text-white"
      }`}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {label}
    </button>
  );
}

function SummaryCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-soft)]">{label}</p>
      <p className="mt-2 text-[24px] font-medium tracking-[-0.02em] text-[var(--color-text)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{note}</p>
    </Card>
  );
}

function SubtleAction({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
      <p className="text-sm font-medium text-[var(--color-text)]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{body}</p>
    </div>
  );
}

function ComposerField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-3">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-soft)]">{label}</p>
      <p className="mt-2 text-sm text-[var(--color-text)]">{value}</p>
    </div>
  );
}

function ComposerTool({ label }: { label: string }) {
  return (
    <span className="rounded-[6px] border border-[var(--color-border)] px-2 py-1 text-xs">{label}</span>
  );
}

function CheckboxRow({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${
          checked
            ? "border-[var(--color-blue)] bg-[var(--color-blue)] text-white"
            : "border-[var(--color-border)] bg-white text-transparent"
        }`}
      >
        <Plus className="h-3 w-3 rotate-45" />
      </span>
      <span>{label}</span>
    </div>
  );
}

function CheckboxPanel({
  title,
  description,
  checked,
}: {
  title: string;
  description: string;
  checked: boolean;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-1 flex h-4 w-4 items-center justify-center rounded-[4px] border ${
            checked
              ? "border-[var(--color-blue)] bg-[var(--color-blue)] text-white"
              : "border-[var(--color-border)] bg-white text-transparent"
          }`}
        >
          <Plus className="h-3 w-3 rotate-45" />
        </span>
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">{title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function AttachmentOption({ label }: { label: string }) {
  const iconMap = {
    Drive: FolderKanban,
    YouTube: Video,
    Create: FileText,
    Upload,
    Link: Link2,
  } as const;

  const Icon = iconMap[label as keyof typeof iconMap] ?? FileText;

  return (
    <div className="rounded-[10px] border border-[var(--color-border)] bg-white px-3 py-4 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-2 text-xs font-medium text-[var(--color-text)]">{label}</p>
    </div>
  );
}

function RubricCriterionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-[var(--color-text)]">{title}</p>
        <span className="text-xs text-[var(--color-text-soft)]">50 pts</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{body}</p>
    </div>
  );
}

function AttachmentPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-2 text-sm text-[var(--color-text-soft)]">
      {label}
    </span>
  );
}

function SubmissionRow({ submission }: { submission: SubmissionRecord }) {
  return (
    <div className="rounded-[10px] border border-[var(--color-border)] px-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">{submission.student}</p>
          <p className="mt-1 text-xs text-[var(--color-text-soft)]">{submission.submittedAt}</p>
        </div>
        <SubmissionStatus status={submission.status} />
      </div>
      {submission.grade ? <p className="mt-3 text-sm font-medium text-[var(--color-text)]">{submission.grade}</p> : null}
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{submission.note}</p>
    </div>
  );
}

function CommentBubble({
  author,
  body,
  teacher,
}: {
  author: string;
  body: string;
  teacher?: boolean;
}) {
  return (
    <div className={`rounded-[10px] px-4 py-4 ${teacher ? "bg-[var(--color-blue-soft)]" : "bg-[var(--color-surface-subtle)]"}`}>
      <div className="flex items-center gap-2">
        {teacher ? <Speech className="h-4 w-4 text-[var(--color-blue)]" /> : null}
        <p className="text-sm font-medium text-[var(--color-text)]">{author}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{body}</p>
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-[var(--color-text)]">{label}</span>
        <span className="text-sm font-medium text-[var(--color-text)]">{value}</span>
      </div>
    </div>
  );
}

function AttachmentChip({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-[var(--color-border)] px-3 py-2 text-center">{label}</div>
  );
}

function SubmissionStatus({ status }: { status: SubmissionRecord["status"] }) {
  const tones = {
    "Turned in": "bg-[var(--color-blue-soft)] text-[var(--color-blue)]",
    Returned: "bg-[var(--color-green-soft)] text-[var(--color-green)]",
    Missing: "bg-[#fce8e6] text-[#c5221f]",
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${tones[status]}`}>{status}</span>;
}

function StatusBadge({ status }: { status: WorkItem["status"] }) {
  const tones = {
    Published: "bg-[var(--color-green-soft)] text-[var(--color-green)]",
    Scheduled: "bg-[var(--color-blue-soft)] text-[var(--color-blue)]",
    Draft: "bg-[#fef7e0] text-[#9a6700]",
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${tones[status]}`}>{status}</span>;
}

function AvatarCircle({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-blue-soft)] text-sm font-medium text-[var(--color-blue)]">
      {initials}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[12px] border border-[var(--color-border)] bg-white shadow-[0_1px_2px_rgba(60,64,67,0.1)] ${className}`}>
      {children}
    </div>
  );
}

function groupWorkByTopic(items: WorkItem[]) {
  return items.reduce<Record<string, WorkItem[]>>((accumulator, item) => {
    if (!accumulator[item.topic]) {
      accumulator[item.topic] = [];
    }

    accumulator[item.topic].push(item);
    return accumulator;
  }, {});
}
