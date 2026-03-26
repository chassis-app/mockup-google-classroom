"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleDot,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Folder,
  Grip,
  Home,
  Menu,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  X,
  Youtube,
} from "lucide-react";
import {
  calendarEvents,
  classes,
  getClassAnnouncements,
  getClassPeople,
  getClassWork,
  getClassroom,
  getComments,
  getWorkItem,
  studentProfile,
  tabs,
  type Attachment,
  type ClassTab,
  type Person,
  type WorkItem,
} from "@/lib/mock-data";

type AppFrameProps = {
  children: React.ReactNode;
};

type ClassPageProps = {
  classId: string;
  activeTab: ClassTab | "your-work";
};

type WorkDetailProps = {
  classId: string;
  workId: string;
  source: "classwork" | "your-work";
};

const globalLinks = [
  { href: "/", label: "Classes", icon: Home },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/todo", label: "To-do", icon: ClipboardCheck },
];

const attachOptions = ["Google Drive", "Link", "File", "Docs", "Slides", "Drawing"];

const attachmentIcons: Record<Attachment["kind"], LucideIcon> = {
  "Drive file": FileText,
  "Google Form": ClipboardCheck,
  Link: ExternalLink,
  YouTube: Youtube,
  Doc: FileText,
  Slides: FileText,
};

export function DashboardPage() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <AppFrame>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[29px] font-normal tracking-[-0.02em] text-[var(--color-text)]">Classes</h1>
          </div>
          <button
            type="button"
            onClick={() => setJoinModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-blue)] shadow-[var(--shadow-card)]"
          >
            <Plus className="h-4 w-4" />
            Join class
          </button>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {classes.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]"
            >
              <div className={`relative h-[120px] bg-gradient-to-r ${item.theme} px-5 py-4 text-white`}>
                <div className="absolute right-5 top-4">
                  <button type="button" className="rounded-full bg-white/16 p-1.5">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="max-w-[78%] text-[22px] leading-tight font-normal">{item.name}</h2>
                <p className="mt-1 text-[13px] text-white/88">{item.section}</p>
                <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-white text-sm font-medium text-[var(--color-text)]">
                  {initials(item.teacher)}
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <p className="text-sm text-[var(--color-text-soft)]">{item.teacher}</p>
                  <p className="mt-3 min-h-12 text-sm leading-7 text-[var(--color-text-soft)]">
                    {item.inviteState === "invited" ? "Reference class used for screenshots and onboarding." : item.hero}
                  </p>
                </div>

                {item.inviteState === "invited" ? (
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      className="rounded-full px-3 py-2 text-sm font-medium text-[var(--color-text-soft)]"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => setJoinModalOpen(true)}
                      className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
                    >
                      Join
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-1 text-[var(--color-text-soft)]">
                    <button type="button" className="rounded-full p-2 hover:bg-[var(--color-surface-hover)]">
                      <Folder className="h-5 w-5" />
                    </button>
                    <Link
                      href={`/class/${item.id}/stream`}
                      className="rounded-full px-3 py-2 text-sm font-medium text-[var(--color-blue)] hover:bg-[var(--color-blue-soft)]"
                    >
                      Open
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>

      {joinModalOpen ? <JoinClassModal onClose={() => setJoinModalOpen(false)} /> : null}
    </AppFrame>
  );
}

export function TodoOverviewPage() {
  const all = classes.flatMap((classroom) =>
    getClassWork(classroom.id)
      .filter((item) => item.type !== "Material")
      .map((item) => ({ ...item, className: classroom.name })),
  );

  const grouped = {
    Missing: all.filter((item) => item.state === "Missing"),
    "To do": all.filter((item) => item.state === "Assigned"),
    Done: all.filter((item) => item.state === "Turned in" || item.state === "Returned"),
  };

  return (
    <AppFrame>
      <div className="mx-auto max-w-4xl rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
        <div className="border-b border-[var(--color-border)] px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-[26px] font-medium text-[var(--color-text)]">To-do</h1>
            <div className="inline-flex rounded-full bg-[var(--color-surface-subtle)] p-1 text-sm">
              <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">To-do</span>
              <span className="px-4 py-1.5 text-[var(--color-text-soft)]">Done</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {Object.entries(grouped).map(([label, items]) => (
            <section key={label}>
              <h2 className="mb-3 text-sm font-medium text-[var(--color-text-soft)]">{label}</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/class/${item.classId}/your-work/${item.id}`}
                    className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] px-4 py-4 hover:border-[var(--color-blue-border)] hover:bg-[var(--color-surface-hover)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
                      <p className="mt-1 text-sm text-[var(--color-text-soft)]">
                        {item.className} · {item.due}
                      </p>
                    </div>
                    <StatusChip label={item.state} />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

export function CalendarOverviewPage() {
  const [monthIndex, setMonthIndex] = useState(0);
  const months = ["Apr 22-28, 2020", "Apr 27-May 3, 2020", "Mar 29-Apr 4, 2020"];
  const activeMonth = months[monthIndex];
  const events = calendarEvents.filter((item) => item.month === activeMonth);

  return (
    <AppFrame>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[28px] font-medium tracking-[-0.02em] text-[var(--color-text)]">Calendar</h1>
          <div className="flex items-center gap-2">
            {months.map((month, index) => (
              <button
                key={month}
                type="button"
                onClick={() => setMonthIndex(index)}
                className={`rounded-full px-3 py-2 text-sm ${
                  index === monthIndex
                    ? "bg-[var(--color-blue-soft)] text-[var(--color-blue)]"
                    : "text-[var(--color-text-soft)]"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <Surface className="p-5">
            <h2 className="text-base font-medium text-[var(--color-text)]">All classes</h2>
            <div className="mt-4 space-y-2">
              {classes.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-xl px-2 py-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.accent }} />
                  <span className="text-sm text-[var(--color-text)]">{item.name}</span>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="overflow-hidden p-0">
            <div className="border-b border-[var(--color-border)] px-6 py-5">
              <h2 className="text-base font-medium text-[var(--color-text)]">{activeMonth}</h2>
            </div>
            <div className="grid grid-cols-7 border-b border-[var(--color-border)] text-center text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="border-r border-[var(--color-border)] px-2 py-3 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: 35 }, (_, index) => {
                const day = index - 1;
                const event = events.find((item) => item.date === day);
                return (
                  <div
                    key={index}
                    className="min-h-34 border-r border-b border-[var(--color-border)] px-2 py-2 last:border-r-0"
                  >
                    {day > 0 ? (
                      <>
                        <p className="text-sm text-[var(--color-text-soft)]">{day}</p>
                        {event ? (
                          <div className="mt-2 rounded-lg bg-[var(--color-blue)] px-2 py-2 text-xs text-white">
                            {event.title}
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Surface>
        </div>
      </div>
    </AppFrame>
  );
}

export function ClassPage({ classId, activeTab }: ClassPageProps) {
  const classroom = getClassroom(classId);
  const work = getClassWork(classId);
  const grouped = groupWork(work);
  const teacher = getClassPeople(classId).find((item) => item.role === "Teacher");

  return (
    <AppFrame>
      <div className="mx-auto max-w-[1048px] space-y-4">
        <ClassHero classId={classId} />

        {activeTab === "stream" ? (
          <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
            <Surface className="h-fit p-5">
              <h2 className="text-sm font-medium text-[var(--color-text)]">Upcoming</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{classroom.upcoming}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-soft)]">{classroom.teacher}</p>
                </div>
                <Link
                  href={`/class/${classId}/your-work`}
                  className="inline-flex rounded-full px-3 py-2 text-sm font-medium text-[var(--color-blue)] hover:bg-[var(--color-blue-soft)]"
                >
                  View all
                </Link>
              </div>
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Class code</p>
                <p className="mt-2 text-lg font-medium text-[var(--color-text)]">{classroom.classCode}</p>
              </div>
            </Surface>

            <div className="space-y-4">
              <Surface className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={studentProfile.name} />
                  <div className="rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-text-muted)]">
                    Share something with your class...
                  </div>
                </div>
              </Surface>

              {getClassAnnouncements(classId).map((announcement) => (
                <Surface key={announcement.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Avatar name={announcement.author} />
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)]">{announcement.author}</p>
                        <p className="text-xs text-[var(--color-text-soft)]">
                          {announcement.time} · {announcement.tag}
                        </p>
                      </div>
                    </div>
                    <button type="button" className="rounded-full p-1.5 text-[var(--color-text-soft)]">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text)]">{announcement.body}</p>
                </Surface>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "classwork" ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-end gap-4 px-1 text-sm">
              <Link href={`/class/${classId}/your-work`} className="font-medium text-[var(--color-blue)]">
                View your work
              </Link>
              <Link href="/calendar" className="text-[var(--color-blue)]">
                Google Calendar
              </Link>
              <Link href="#" className="text-[var(--color-blue)]">
                Class Drive folder
              </Link>
            </div>

            <div className="space-y-3">
              {Object.entries(grouped).map(([topic, items]) => (
                <div key={topic} className="space-y-1">
                  <div className="flex items-center justify-between border-b border-[var(--color-blue-border)] px-1 pb-1">
                    <h2 className="text-[28px] font-normal text-[var(--color-blue)]">{topic}</h2>
                    <span className="text-[var(--color-text-soft)]">
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/class/${classId}/classwork/${item.id}`}
                        className="grid grid-cols-[40px_minmax(0,1fr)_max-content] items-center gap-3 rounded-[8px] px-2 py-2 hover:bg-white"
                      >
                        <TypeIcon type={item.type} />
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
                          <p className="mt-1 text-xs text-[var(--color-text-soft)]">{item.type === "Material" ? classroom.teacher : item.due}</p>
                        </div>
                        {item.type === "Material" ? (
                          <span className="text-[var(--color-text-soft)]">
                            <MoreVertical className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="text-xs text-[var(--color-text-soft)]">{item.due.replace("Due ", "")}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "people" ? (
          <div className="space-y-5">
            <section>
              <h2 className="border-b border-[var(--color-blue-border)] pb-2 text-[28px] font-normal text-[var(--color-blue)]">
                Teachers
              </h2>
              <div className="mt-3">
                {teacher ? <PersonRow person={teacher} /> : null}
              </div>
            </section>
            <section>
              <h2 className="border-b border-[var(--color-blue-border)] pb-2 text-[28px] font-normal text-[var(--color-blue)]">
                Classmates
              </h2>
              <div className="mt-3 divide-y divide-[var(--color-border)] rounded-[8px] bg-white px-2">
                {getClassPeople(classId)
                  .filter((item) => item.role === "Student")
                  .map((person) => (
                    <PersonRow key={person.id} person={person} />
                  ))}
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "grades" ? (
          <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
            <div className="space-y-1">
              {["All", "Assigned", "Returned", "Missing"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`flex w-full items-center rounded-[8px] px-3 py-2 text-left text-sm ${
                    label === "All"
                      ? "bg-[var(--color-surface-hover)] font-medium text-[var(--color-text)]"
                      : "text-[var(--color-text-soft)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <Surface className="overflow-hidden p-0">
              <div className="grid grid-cols-[minmax(0,1fr)_120px_120px] border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-5 py-3 text-sm font-medium text-[var(--color-text-soft)]">
                <span>Item</span>
                <span>Due</span>
                <span>Status</span>
              </div>
              {work
                .filter((item) => item.type !== "Material")
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/class/${classId}/your-work/${item.id}`}
                    className="grid grid-cols-[minmax(0,1fr)_120px_120px] gap-3 border-b border-[var(--color-border)] px-5 py-4 hover:bg-[var(--color-surface-hover)]"
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
                      {item.grade ? (
                        <p className="mt-1 text-sm text-[var(--color-text-soft)]">{item.grade}</p>
                      ) : null}
                    </div>
                    <span className="text-sm text-[var(--color-text-soft)]">{item.due.replace("Due ", "")}</span>
                    <span className={statusTextClass(item.state)}>{item.state}</span>
                  </Link>
                ))}
            </Surface>
          </div>
        ) : null}

        {activeTab === "your-work" ? (
          <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
            <div className="space-y-1">
              {["All", "Assigned", "Turned in", "Missing"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`flex w-full items-center rounded-[8px] px-3 py-2 text-left text-sm ${
                    label === "All"
                      ? "bg-[var(--color-surface-hover)] font-medium text-[var(--color-text)]"
                      : "text-[var(--color-text-soft)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {Object.entries(grouped).map(([topic, items]) => (
                <Surface key={topic} className="p-0">
                  <div className="border-b border-[var(--color-border)] px-5 py-4">
                    <h2 className="text-lg font-medium text-[var(--color-text)]">{topic}</h2>
                  </div>
                  <div className="divide-y divide-[var(--color-border)]">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/class/${classId}/your-work/${item.id}`}
                        className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[var(--color-surface-hover)]"
                      >
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
                          <p className="mt-1 text-sm text-[var(--color-text-soft)]">{item.due}</p>
                        </div>
                        <StatusChip label={item.state} />
                      </Link>
                    ))}
                  </div>
                </Surface>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </AppFrame>
  );
}

export function WorkDetailPage({ classId, workId, source }: WorkDetailProps) {
  const work = getWorkItem(workId);
  const classroom = getClassroom(classId);
  const comments = getComments(workId);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [turnInOpen, setTurnInOpen] = useState(false);

  return (
    <AppFrame>
      <div className="mx-auto max-w-[1048px] space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-soft)]">
          <Link href={`/class/${classId}/${source}`} className="hover:text-[var(--color-text)]">
            {source === "classwork" ? "Classwork" : "Your work"}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{classroom.name}</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <Surface className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--color-border)] pb-5">
              <div>
                <p className="text-sm text-[var(--color-text-soft)]">
                  {work.type} · {work.points ? `${work.points} points` : "No points"}
                </p>
                <h1 className="mt-1 text-[24px] leading-tight font-normal text-[var(--color-text)]">
                  {work.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-8 text-[var(--color-text-soft)]">
                  {work.instructions}
                </p>
              </div>
              <StatusChip label={work.state} />
            </div>

            <div className="space-y-6 py-6">
              {work.type === "Question" ? (
                <Surface className="border border-[var(--color-border)] p-4 shadow-none">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-text)]">Your answer</p>
                      <textarea
                        defaultValue={work.answer}
                        className="mt-3 min-h-40 w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-blue)]"
                        placeholder="Type your answer here..."
                      />
                    </div>
                    <div className="w-full rounded-2xl border border-[var(--color-border)] p-4 xl:w-64">
                      <p className="text-sm font-medium text-[var(--color-text)]">Your work</p>
                      <button
                        type="button"
                        className="mt-4 w-full rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
                      >
                        Turn in
                      </button>
                    </div>
                  </div>
                </Surface>
              ) : null}

              {work.attachments.length ? (
                <div>
                  <h2 className="text-sm font-medium text-[var(--color-text-soft)]">Attachments</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {work.attachments.map((attachment) => (
                      <AttachmentCard key={attachment.id} attachment={attachment} />
                    ))}
                  </div>
                </div>
              ) : null}

              {work.type === "Quiz assignment" ? (
                <Surface className="border border-[var(--color-border)] bg-[#f3ebfb] p-5 shadow-none">
                  <p className="text-sm text-[var(--color-text-soft)]">Google Forms</p>
                  <div className="mt-3 rounded-xl border border-[#d9c2f0] bg-white p-5">
                    <h2 className="text-xl font-medium text-[var(--color-text)]">Fibonacci Sequence Quiz</h2>
                    <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                      Requires sign-in. Open the form to answer the quiz and return here when finished.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-full bg-[#7e57c2] px-4 py-2 text-sm font-medium text-white"
                      >
                        Open quiz
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-[#d9c2f0] px-4 py-2 text-sm font-medium text-[#7e57c2]"
                      >
                        {work.formLabel ?? "View form"}
                      </button>
                    </div>
                  </div>
                </Surface>
              ) : null}

              <div>
                <h2 className="text-sm font-medium text-[var(--color-text-soft)]">Class comments</h2>
                <div className="mt-3 rounded-2xl border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
                  Add class comment
                </div>
              </div>
            </div>
          </Surface>

          <div className="space-y-4">
            <Surface className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-medium text-[var(--color-text)]">Your work</h2>
                <button type="button" className="rounded-full p-1.5 text-[var(--color-text-soft)]">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {work.submittedAt ? (
                <p className="mt-3 text-sm text-[var(--color-text-soft)]">{work.submittedAt}</p>
              ) : null}

              {work.grade ? (
                <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-3">
                  <p className="text-sm font-medium text-[var(--color-text)]">{work.grade}</p>
                </div>
              ) : null}

              {work.type !== "Question" && work.type !== "Quiz assignment" ? (
                <div className="mt-4 space-y-3">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setAddMenuOpen((value) => !value)}
                      className="flex w-full items-center justify-between rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)]"
                    >
                      Add or create
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {addMenuOpen ? (
                      <div className="absolute left-0 top-[calc(100%+8px)] z-10 w-full rounded-2xl border border-[var(--color-border)] bg-white p-2 shadow-[var(--shadow-card)]">
                        {attachOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className="flex w-full rounded-xl px-3 py-2 text-left text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => setTurnInOpen(true)}
                    className="w-full rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
                  >
                    Turn in
                  </button>
                </div>
              ) : null}

              {work.type === "Quiz assignment" ? (
                <button
                  type="button"
                  className="mt-4 w-full rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
                >
                  Mark as done
                </button>
              ) : null}
            </Surface>

            <Surface className="p-5">
              <h2 className="text-base font-medium text-[var(--color-text)]">Private comments</h2>
              <div className="mt-4 space-y-4">
                {comments.length ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <Avatar name={comment.author} />
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)]">{comment.author}</p>
                        <p className="text-xs text-[var(--color-text-soft)]">{comment.time}</p>
                        <p className="mt-2 text-sm text-[var(--color-text)]">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--color-text-soft)]">No private comments yet.</p>
                )}

                <div className="rounded-2xl border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
                  Add private comment
                </div>
              </div>
            </Surface>
          </div>
        </div>
      </div>

      {turnInOpen ? (
        <Modal onClose={() => setTurnInOpen(false)} title="Turn in your work?">
          <p className="text-sm leading-6 text-[var(--color-text-soft)]">
            Attached files will be visible to your teacher. You can still unsubmit later unless the due date has passed.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setTurnInOpen(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-soft)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setTurnInOpen(false)}
              className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
            >
              Turn in
            </button>
          </div>
        </Modal>
      ) : null}
    </AppFrame>
  );
}

function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setNavOpen((value) => !value)}
            className="rounded-full p-2 text-[var(--color-text-soft)] hover:bg-[var(--color-surface-hover)]"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2 text-[22px] font-medium text-[var(--color-text-soft)]">
            <Grip className="h-5 w-5 text-[#fbbc04]" />
            <span className="text-[var(--color-text)]">Google Classroom</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" className="rounded-full p-2 text-[var(--color-text-soft)] hover:bg-[var(--color-surface-hover)]">
              <Search className="h-5 w-5" />
            </button>
            <Avatar name={studentProfile.name} />
          </div>
        </div>
      </header>

      <div className="relative px-4 py-6 sm:px-6">
        <aside
          className={`fixed inset-y-16 left-0 z-40 w-[300px] border-r border-[var(--color-border)] bg-[var(--color-sidebar)] px-3 py-4 shadow-[var(--shadow-float)] transition-transform ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="space-y-1">
            {globalLinks.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={pathname === item.href}
              />
            ))}
          </nav>

          <div className="mt-6 border-t border-[var(--color-border)] pt-4">
            <p className="px-3 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Enrolled
            </p>
            <div className="mt-2 space-y-1">
              {classes.map((item) => (
                <NavItem
                  key={item.id}
                  href={`/class/${item.id}/stream`}
                  icon={CircleDot}
                  label={item.name}
                  active={pathname?.includes(`/class/${item.id}/`)}
                  accent={item.accent}
                />
              ))}
            </div>
          </div>
        </aside>

        {navOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-30 bg-black/20"
            onClick={() => setNavOpen(false)}
          />
        ) : null}

        <main className="mx-auto min-w-0 max-w-[1128px]">{children}</main>
      </div>
    </div>
  );
}

function ClassHero({ classId }: { classId: string }) {
  const classroom = getClassroom(classId);
  const pathname = usePathname();

  return (
    <div className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
      <div className={`relative h-52 bg-gradient-to-r ${classroom.theme} px-6 py-6 text-white`}>
        <div className="absolute right-14 top-10 hidden h-12 w-28 rounded-full border-[6px] border-[#174ea6] bg-transparent lg:block" />
        <div className="absolute right-24 top-14 hidden h-2 w-10 bg-[#174ea6] lg:block" />
        <div className="absolute bottom-0 right-0 hidden h-28 w-40 bg-[linear-gradient(135deg,#fdd663_0%,#f3c94a_55%,#e8b93d_100%)] [clip-path:polygon(38%_0,100%_0,100%_100%,0_100%)] lg:block" />
        <div className="relative">
          <p className="text-sm text-white/86">{classroom.section}</p>
          <h1 className="mt-2 max-w-3xl text-[36px] leading-tight font-normal tracking-[-0.02em]">
            {classroom.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/88">{classroom.hero}</p>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] px-4">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/class/${classId}/${tab.id}`}
              className={`border-b-2 px-4 py-4 text-sm font-medium ${
                pathname === `/class/${classId}/${tab.id}`
                  ? "border-[var(--color-blue)] text-[var(--color-blue)]"
                  : "border-transparent text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
          <Link
            href={`/class/${classId}/your-work`}
            className={`border-b-2 px-4 py-4 text-sm font-medium ${
              pathname === `/class/${classId}/your-work`
                ? "border-[var(--color-blue)] text-[var(--color-blue)]"
                : "border-transparent text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
            }`}
          >
            Your work
          </Link>
        </nav>
      </div>
    </div>
  );
}

function JoinClassModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} title="Join class">
      <div className="space-y-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-4">
          <p className="text-sm font-medium text-[var(--color-text)]">Class code</p>
          <input
            defaultValue="READ-918"
            className="mt-3 w-full border-b border-[var(--color-border)] bg-transparent px-0 py-2 text-sm outline-none focus:border-[var(--color-blue)]"
          />
          <p className="mt-3 text-xs leading-5 text-[var(--color-text-soft)]">
            Ask your teacher for the class code, then enter it here.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-soft)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
          >
            Join
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-md rounded-[12px] bg-white p-6 shadow-[var(--shadow-float)]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-[24px] font-medium text-[var(--color-text)]">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[var(--color-text-soft)]">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AttachmentCard({ attachment }: { attachment: Attachment }) {
  const Icon = attachmentIcons[attachment.kind];

  return (
    <div className="flex items-center gap-4 rounded-[10px] border border-[var(--color-border)] p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[var(--color-blue-soft)] text-[var(--color-blue)]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-[var(--color-text)]">{attachment.title}</p>
        <p className="mt-1 text-sm text-[var(--color-text-soft)]">{attachment.subtitle}</p>
      </div>
    </div>
  );
}

function PersonRow({ person }: { person: Person }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <Avatar name={person.name} />
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">{person.name}</p>
          <p className="text-sm text-[var(--color-text-soft)]">{person.email}</p>
        </div>
      </div>
      <button type="button" className="rounded-full p-1.5 text-[var(--color-text-soft)]">
        <MoreVertical className="h-4 w-4" />
      </button>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  accent,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  active?: boolean;
  accent?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-r-full px-4 py-3 text-sm ${
        active
          ? "bg-[var(--color-blue-soft)] font-medium text-[var(--color-blue)]"
          : "text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
      }`}
    >
      <Icon
        className="h-4 w-4"
        style={accent && !active ? { color: accent } : undefined}
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[12px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </section>
  );
}

function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "md" | "lg";
}) {
  const sizeClass = size === "lg" ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs";
  return (
    <div className={`flex ${sizeClass} items-center justify-center rounded-full bg-[#d7e3fc] font-medium text-[#174ea6]`}>
      {initials(name)}
    </div>
  );
}

function StatusChip({ label }: { label: WorkItem["state"] }) {
  const map = {
    Assigned: "bg-[var(--color-blue-soft)] text-[var(--color-blue)]",
    "Turned in": "bg-[var(--color-green-soft)] text-[var(--color-green)]",
    Missing: "bg-[var(--color-red-soft)] text-[var(--color-red)]",
    Returned: "bg-[#f3e8ff] text-[#7e57c2]",
    Done: "bg-[var(--color-surface-subtle)] text-[var(--color-text-soft)]",
  };

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${map[label]}`}>{label}</span>;
}

function TypeIcon({ type }: { type: WorkItem["type"] }) {
  const iconMap = {
    Assignment: FileText,
    Question: MessageSquare,
    "Quiz assignment": CircleAlert,
    Material: Youtube,
  };
  const Icon = iconMap[type];
  const bgMap = {
    Assignment: "bg-[var(--color-blue-soft)] text-[var(--color-blue)]",
    Question: "bg-[#f3e8ff] text-[#7e57c2]",
    "Quiz assignment": "bg-[var(--color-red-soft)] text-[var(--color-red)]",
    Material: "bg-[var(--color-surface-subtle)] text-[var(--color-text-soft)]",
  };

  return (
    <span className={`flex h-10 w-10 items-center justify-center rounded-full ${bgMap[type]}`}>
      <Icon className="h-4 w-4" />
    </span>
  );
}

function groupWork(items: WorkItem[]) {
  return items.reduce<Record<string, WorkItem[]>>((accumulator, item) => {
    if (!accumulator[item.topic]) {
      accumulator[item.topic] = [];
    }
    accumulator[item.topic].push(item);
    return accumulator;
  }, {});
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function statusTextClass(state: WorkItem["state"]) {
  switch (state) {
    case "Missing":
      return "text-sm font-medium text-[var(--color-red)]";
    case "Returned":
      return "text-sm font-medium text-[#7e57c2]";
    case "Turned in":
      return "text-sm font-medium text-[var(--color-green)]";
    default:
      return "text-sm text-[var(--color-text-soft)]";
  }
}
