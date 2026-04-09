"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
import { localizeHref, stripLocaleFromPathname, switchLocalePath, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import {
  getCalendarEvents,
  getCalendarRanges,
  getClasses,
  getClassAnnouncements,
  getClassPeople,
  getClassroom,
  getClassWork,
  getComments,
  getWorkItem,
  studentProfile,
  type AnnouncementTag,
  type Attachment,
  type CalendarRangeId,
  type ClassTab,
  type Person,
  type WorkItem,
  type WorkState,
  type WorkType,
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

const attachmentIcons: Record<Attachment["kind"], LucideIcon> = {
  "drive-file": FileText,
  "google-form": ClipboardCheck,
  link: ExternalLink,
  youtube: Youtube,
  doc: FileText,
  slides: FileText,
};

export function DashboardPage() {
  const { locale, dictionary } = useI18n();
  const classes = getClasses(locale);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <AppFrame>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[29px] font-normal tracking-[-0.02em] text-[var(--color-text)]">
              {dictionary.headings.classes}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setJoinModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-blue)] shadow-[var(--shadow-card)]"
          >
            <Plus className="h-4 w-4" />
            {dictionary.actions.joinClass}
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
                  <button type="button" className="rounded-full bg-white/16 p-1.5" aria-label="More options">
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
                    {item.inviteState === "invited" ? dictionary.miscellaneous.referenceInviteDescription : item.hero}
                  </p>
                </div>

                {item.inviteState === "invited" ? (
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      className="rounded-full px-3 py-2 text-sm font-medium text-[var(--color-text-soft)]"
                    >
                      {dictionary.actions.decline}
                    </button>
                    <button
                      type="button"
                      onClick={() => setJoinModalOpen(true)}
                      className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
                    >
                      {dictionary.actions.join}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-1 text-[var(--color-text-soft)]">
                    <button type="button" className="rounded-full p-2 hover:bg-[var(--color-surface-hover)]" aria-label="Folder">
                      <Folder className="h-5 w-5" />
                    </button>
                    <Link
                      href={localizeHref(locale, `/class/${item.id}/stream`)}
                      className="rounded-full px-3 py-2 text-sm font-medium text-[var(--color-blue)] hover:bg-[var(--color-blue-soft)]"
                    >
                      {dictionary.actions.open}
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
  const { locale, dictionary } = useI18n();
  const classes = getClasses(locale);
  const all = classes.flatMap((classroom) =>
    getClassWork(locale, classroom.id)
      .filter((item) => item.type !== "material")
      .map((item) => ({ ...item, className: classroom.name })),
  );

  const grouped = [
    {
      id: "missing",
      label: dictionary.filters.missing,
      items: all.filter((item) => item.state === "missing"),
    },
    {
      id: "todo",
      label: dictionary.filters.todo,
      items: all.filter((item) => item.state === "assigned"),
    },
    {
      id: "done",
      label: dictionary.filters.done,
      items: all.filter((item) => item.state === "turned-in" || item.state === "returned"),
    },
  ];

  return (
    <AppFrame>
      <div className="mx-auto max-w-4xl rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
        <div className="border-b border-[var(--color-border)] px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-[26px] font-medium text-[var(--color-text)]">{dictionary.headings.todo}</h1>
            <div className="inline-flex rounded-full bg-[var(--color-surface-subtle)] p-1 text-sm">
              <span className="rounded-full bg-white px-4 py-1.5 shadow-sm">{dictionary.filters.todo}</span>
              <span className="px-4 py-1.5 text-[var(--color-text-soft)]">{dictionary.filters.done}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {grouped.map((group) => (
            <section key={group.id}>
              <h2 className="mb-3 text-sm font-medium text-[var(--color-text-soft)]">{group.label}</h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <Link
                    key={item.id}
                    href={localizeHref(locale, `/class/${item.classId}/your-work/${item.id}`)}
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
  const { locale, dictionary } = useI18n();
  const ranges = getCalendarRanges(locale);
  const [monthId, setMonthId] = useState<CalendarRangeId>(ranges[0]?.id ?? "apr22-28-2020");
  const activeRange = ranges.find((range) => range.id === monthId) ?? ranges[0];
  const events = getCalendarEvents(locale, activeRange.id);
  const classes = getClasses(locale);

  return (
    <AppFrame>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[28px] font-medium tracking-[-0.02em] text-[var(--color-text)]">
            {dictionary.headings.calendar}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            {ranges.map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setMonthId(range.id)}
                className={`rounded-full px-3 py-2 text-sm ${
                  range.id === monthId
                    ? "bg-[var(--color-blue-soft)] text-[var(--color-blue)]"
                    : "text-[var(--color-text-soft)]"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <Surface className="p-5">
            <h2 className="text-base font-medium text-[var(--color-text)]">{dictionary.headings.allClasses}</h2>
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
              <h2 className="text-base font-medium text-[var(--color-text)]">{activeRange.label}</h2>
            </div>
            <div className="grid grid-cols-7 border-b border-[var(--color-border)] text-center text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
              {dictionary.calendar.daysShort.map((day) => (
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
  const { locale, dictionary } = useI18n();
  const classroom = getClassroom(locale, classId);
  const work = getClassWork(locale, classId);
  const grouped = groupWork(work);
  const teacher = getClassPeople(classId).find((item) => item.role === "teacher");

  return (
    <AppFrame>
      <div className="mx-auto max-w-[1048px] space-y-4">
        <ClassHero classId={classId} />

        {activeTab === "stream" ? (
          <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
            <Surface className="h-fit p-5">
              <h2 className="text-sm font-medium text-[var(--color-text)]">{dictionary.headings.upcoming}</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">{classroom.upcoming}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-soft)]">{classroom.teacher}</p>
                </div>
                <Link
                  href={localizeHref(locale, `/class/${classId}/your-work`)}
                  className="inline-flex rounded-full px-3 py-2 text-sm font-medium text-[var(--color-blue)] hover:bg-[var(--color-blue-soft)]"
                >
                  {dictionary.actions.viewAll}
                </Link>
              </div>
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  {dictionary.headings.classCode}
                </p>
                <p className="mt-2 text-lg font-medium text-[var(--color-text)]">{classroom.classCode}</p>
              </div>
            </Surface>

            <div className="space-y-4">
              <Surface className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={studentProfile.name} />
                  <div className="rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-text-muted)]">
                    {dictionary.placeholders.shareSomething}
                  </div>
                </div>
              </Surface>

              {getClassAnnouncements(locale, classId).map((announcement) => (
                <Surface key={announcement.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Avatar name={announcement.author} />
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text)]">{announcement.author}</p>
                        <p className="text-xs text-[var(--color-text-soft)]">
                          {announcement.time} · {formatAnnouncementTag(dictionary, announcement.tag)}
                        </p>
                      </div>
                    </div>
                    <button type="button" className="rounded-full p-1.5 text-[var(--color-text-soft)]" aria-label="More options">
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
              <Link href={localizeHref(locale, `/class/${classId}/your-work`)} className="font-medium text-[var(--color-blue)]">
                {dictionary.actions.viewYourWork}
              </Link>
              <Link href={localizeHref(locale, "/calendar")} className="text-[var(--color-blue)]">
                {dictionary.actions.googleCalendar}
              </Link>
              <Link href="#" className="text-[var(--color-blue)]">
                {dictionary.actions.classDriveFolder}
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
                        href={localizeHref(locale, `/class/${classId}/classwork/${item.id}`)}
                        className="grid grid-cols-[40px_minmax(0,1fr)_max-content] items-center gap-3 rounded-[8px] px-2 py-2 hover:bg-white"
                      >
                        <TypeIcon type={item.type} />
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
                          <p className="mt-1 text-xs text-[var(--color-text-soft)]">
                            {item.type === "material" ? classroom.teacher : item.due}
                          </p>
                        </div>
                        {item.type === "material" ? (
                          <span className="text-[var(--color-text-soft)]">
                            <MoreVertical className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="text-xs text-[var(--color-text-soft)]">{item.due}</span>
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
                {dictionary.headings.teachers}
              </h2>
              <div className="mt-3">{teacher ? <PersonRow person={teacher} /> : null}</div>
            </section>
            <section>
              <h2 className="border-b border-[var(--color-blue-border)] pb-2 text-[28px] font-normal text-[var(--color-blue)]">
                {dictionary.headings.classmates}
              </h2>
              <div className="mt-3 divide-y divide-[var(--color-border)] rounded-[8px] bg-white px-2">
                {getClassPeople(classId)
                  .filter((item) => item.role === "student")
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
              {[
                dictionary.filters.all,
                dictionary.filters.assigned,
                dictionary.filters.returned,
                dictionary.filters.missing,
              ].map((label, index) => (
                <button
                  key={label}
                  type="button"
                  className={`flex w-full items-center rounded-[8px] px-3 py-2 text-left text-sm ${
                    index === 0
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
                <span>{dictionary.headings.item}</span>
                <span>{dictionary.headings.due}</span>
                <span>{dictionary.headings.status}</span>
              </div>
              {work
                .filter((item) => item.type !== "material")
                .map((item) => (
                  <Link
                    key={item.id}
                    href={localizeHref(locale, `/class/${classId}/your-work/${item.id}`)}
                    className="grid grid-cols-[minmax(0,1fr)_120px_120px] gap-3 border-b border-[var(--color-border)] px-5 py-4 hover:bg-[var(--color-surface-hover)]"
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">{item.title}</p>
                      {item.grade ? <p className="mt-1 text-sm text-[var(--color-text-soft)]">{item.grade}</p> : null}
                    </div>
                    <span className="text-sm text-[var(--color-text-soft)]">{item.due}</span>
                    <span className={statusTextClass(item.state)}>{formatStatus(dictionary, item.state)}</span>
                  </Link>
                ))}
            </Surface>
          </div>
        ) : null}

        {activeTab === "your-work" ? (
          <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
            <div className="space-y-1">
              {[
                dictionary.filters.all,
                dictionary.filters.assigned,
                dictionary.filters.turnedIn,
                dictionary.filters.missing,
              ].map((label, index) => (
                <button
                  key={label}
                  type="button"
                  className={`flex w-full items-center rounded-[8px] px-3 py-2 text-left text-sm ${
                    index === 0
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
                        href={localizeHref(locale, `/class/${classId}/your-work/${item.id}`)}
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
  const { locale, dictionary } = useI18n();
  const work = getWorkItem(locale, workId);
  const classroom = getClassroom(locale, classId);
  const comments = getComments(locale, workId);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [turnInOpen, setTurnInOpen] = useState(false);

  return (
    <AppFrame>
      <div className="mx-auto max-w-[1048px] space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-soft)]">
          <Link href={localizeHref(locale, `/class/${classId}/${source}`)} className="hover:text-[var(--color-text)]">
            {source === "classwork" ? dictionary.tabs.classwork : dictionary.tabs.yourWork}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{classroom.name}</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <Surface className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--color-border)] pb-5">
              <div>
                <p className="text-sm text-[var(--color-text-soft)]">
                  {formatWorkType(dictionary, work.type)} · {work.points ? formatPoints(dictionary, work.points) : dictionary.miscellaneous.noPoints}
                </p>
                <h1 className="mt-1 text-[24px] leading-tight font-normal text-[var(--color-text)]">{work.title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-8 text-[var(--color-text-soft)]">{work.instructions}</p>
              </div>
              <StatusChip label={work.state} />
            </div>

            <div className="space-y-6 py-6">
              {work.type === "question" ? (
                <Surface className="border border-[var(--color-border)] p-4 shadow-none">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-text)]">{dictionary.headings.yourAnswer}</p>
                      <textarea
                        defaultValue={work.answer}
                        className="mt-3 min-h-40 w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-blue)]"
                        placeholder={dictionary.placeholders.typeYourAnswerHere}
                      />
                    </div>
                    <div className="w-full rounded-2xl border border-[var(--color-border)] p-4 xl:w-64">
                      <p className="text-sm font-medium text-[var(--color-text)]">{dictionary.headings.yourWork}</p>
                      <button
                        type="button"
                        className="mt-4 w-full rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
                      >
                        {dictionary.actions.turnIn}
                      </button>
                    </div>
                  </div>
                </Surface>
              ) : null}

              {work.attachments.length ? (
                <div>
                  <h2 className="text-sm font-medium text-[var(--color-text-soft)]">{dictionary.headings.attachments}</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {work.attachments.map((attachment) => (
                      <AttachmentCard key={attachment.id} attachment={attachment} />
                    ))}
                  </div>
                </div>
              ) : null}

              {work.type === "quiz-assignment" ? (
                <Surface className="border border-[var(--color-border)] bg-[#f3ebfb] p-5 shadow-none">
                  <p className="text-sm text-[var(--color-text-soft)]">{dictionary.quizCard.googleForms}</p>
                  <div className="mt-3 rounded-xl border border-[#d9c2f0] bg-white p-5">
                    <h2 className="text-xl font-medium text-[var(--color-text)]">{work.title}</h2>
                    <p className="mt-2 text-sm text-[var(--color-text-soft)]">{dictionary.quizCard.requiresSignIn}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-full bg-[#7e57c2] px-4 py-2 text-sm font-medium text-white"
                      >
                        {dictionary.actions.openQuiz}
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-[#d9c2f0] px-4 py-2 text-sm font-medium text-[#7e57c2]"
                      >
                        {work.formLabel ?? dictionary.actions.viewForm}
                      </button>
                    </div>
                  </div>
                </Surface>
              ) : null}

              <div>
                <h2 className="text-sm font-medium text-[var(--color-text-soft)]">{dictionary.headings.classComments}</h2>
                <div className="mt-3 rounded-2xl border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
                  {dictionary.placeholders.addClassComment}
                </div>
              </div>
            </div>
          </Surface>

          <div className="space-y-4">
            <Surface className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-medium text-[var(--color-text)]">{dictionary.headings.yourWork}</h2>
                <button type="button" className="rounded-full p-1.5 text-[var(--color-text-soft)]" aria-label="More options">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {work.submittedAt ? <p className="mt-3 text-sm text-[var(--color-text-soft)]">{work.submittedAt}</p> : null}

              {work.grade ? (
                <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-3">
                  <p className="text-sm font-medium text-[var(--color-text)]">{work.grade}</p>
                </div>
              ) : null}

              {work.type !== "question" && work.type !== "quiz-assignment" ? (
                <div className="mt-4 space-y-3">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setAddMenuOpen((value) => !value)}
                      className="flex w-full items-center justify-between rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)]"
                    >
                      {dictionary.actions.addOrCreate}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {addMenuOpen ? (
                      <div className="absolute left-0 top-[calc(100%+8px)] z-10 w-full rounded-2xl border border-[var(--color-border)] bg-white p-2 shadow-[var(--shadow-card)]">
                        {dictionary.attachOptions.map((option) => (
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
                    {dictionary.actions.turnIn}
                  </button>
                </div>
              ) : null}

              {work.type === "quiz-assignment" ? (
                <button
                  type="button"
                  className="mt-4 w-full rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
                >
                  {dictionary.actions.markAsDone}
                </button>
              ) : null}
            </Surface>

            <Surface className="p-5">
              <h2 className="text-base font-medium text-[var(--color-text)]">{dictionary.headings.privateComments}</h2>
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
                  <p className="text-sm text-[var(--color-text-soft)]">{dictionary.placeholders.noPrivateCommentsYet}</p>
                )}

                <div className="rounded-2xl border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
                  {dictionary.placeholders.addPrivateComment}
                </div>
              </div>
            </Surface>
          </div>
        </div>
      </div>

      {turnInOpen ? (
        <Modal onClose={() => setTurnInOpen(false)} title={dictionary.modals.turnIn.title}>
          <p className="text-sm leading-6 text-[var(--color-text-soft)]">{dictionary.modals.turnIn.body}</p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setTurnInOpen(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-soft)]"
            >
              {dictionary.actions.cancel}
            </button>
            <button
              type="button"
              onClick={() => setTurnInOpen(false)}
              className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
            >
              {dictionary.actions.turnIn}
            </button>
          </div>
        </Modal>
      ) : null}
    </AppFrame>
  );
}

function AppFrame({ children }: AppFrameProps) {
  const { locale, dictionary } = useI18n();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const normalizedPath = stripLocaleFromPathname(pathname);
  const classes = getClasses(locale);
  const globalLinks = useMemo(
    () => [
      { href: "/", label: dictionary.navigation.classes, icon: Home },
      { href: "/calendar", label: dictionary.navigation.calendar, icon: CalendarDays },
      { href: "/todo", label: dictionary.navigation.todo, icon: ClipboardCheck },
    ],
    [dictionary.navigation.calendar, dictionary.navigation.classes, dictionary.navigation.todo],
  );

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setNavOpen((value) => !value)}
            className="rounded-full p-2 text-[var(--color-text-soft)] hover:bg-[var(--color-surface-hover)]"
            aria-label={dictionary.navigation.closeNavigation}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href={localizeHref(locale, "/")} className="flex items-center gap-2 text-[22px] font-medium text-[var(--color-text-soft)]">
            <Grip className="h-5 w-5 text-[#fbbc04]" />
            <span className="text-[var(--color-text)]">{dictionary.brand.classroom}</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label={dictionary.navigation.search}
              className="rounded-full p-2 text-[var(--color-text-soft)] hover:bg-[var(--color-surface-hover)]"
            >
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
                active={normalizedPath === item.href}
              />
            ))}
          </nav>

          <div className="mt-6 border-t border-[var(--color-border)] pt-4">
            <p className="px-3 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              {dictionary.navigation.enrolled}
            </p>
            <div className="mt-2 space-y-1">
              {classes.map((item) => (
                <NavItem
                  key={item.id}
                  href={`/class/${item.id}/stream`}
                  icon={CircleDot}
                  label={item.name}
                  active={normalizedPath.includes(`/class/${item.id}/`)}
                  accent={item.accent}
                />
              ))}
            </div>
          </div>
        </aside>

        {navOpen ? (
          <button
            type="button"
            aria-label={dictionary.navigation.closeNavigation}
            className="fixed inset-0 z-30 bg-black/20"
            onClick={() => setNavOpen(false)}
          />
        ) : null}

        <main className="mx-auto min-w-0 max-w-[1128px]">{children}</main>
      </div>
    </div>
  );
}

function LanguageSwitcher() {
  const { dictionary, locale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const currentLabel = dictionary.language.options[locale];

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={dictionary.language.label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm text-[var(--color-text)]"
      >
        <span className="max-w-40 truncate">{currentLabel}</span>
        <ChevronDown className={`h-4 w-4 text-[var(--color-text-soft)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label={dictionary.navigation.closeNavigation}
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-64 rounded-2xl border border-[var(--color-border)] bg-white p-2 shadow-[var(--shadow-card)]">
            <p className="px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              {dictionary.language.label}
            </p>
            {Object.entries(dictionary.language.options).map(([value, label]) => {
              const isActive = value === locale;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.push(switchLocalePath(pathname, value as Locale));
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                    isActive
                      ? "bg-[var(--color-blue-soft)] font-medium text-[var(--color-blue)]"
                      : "text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  <span>{label}</span>
                  {isActive ? <span>•</span> : null}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

function ClassHero({ classId }: { classId: string }) {
  const { locale, dictionary } = useI18n();
  const classroom = getClassroom(locale, classId);
  const pathname = usePathname();
  const normalizedPath = stripLocaleFromPathname(pathname);
  const tabs = [
    { id: "stream", label: dictionary.tabs.stream },
    { id: "classwork", label: dictionary.tabs.classwork },
    { id: "people", label: dictionary.tabs.people },
    { id: "grades", label: dictionary.tabs.grades },
  ] as const;

  return (
    <div className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
      <div className={`relative h-52 bg-gradient-to-r ${classroom.theme} px-6 py-6 text-white`}>
        <div className="absolute right-14 top-10 hidden h-12 w-28 rounded-full border-[6px] border-[#174ea6] bg-transparent lg:block" />
        <div className="absolute right-24 top-14 hidden h-2 w-10 bg-[#174ea6] lg:block" />
        <div className="absolute bottom-0 right-0 hidden h-28 w-40 bg-[linear-gradient(135deg,#fdd663_0%,#f3c94a_55%,#e8b93d_100%)] [clip-path:polygon(38%_0,100%_0,100%_100%,0_100%)] lg:block" />
        <div className="relative">
          <p className="text-sm text-white/86">{classroom.section}</p>
          <h1 className="mt-2 max-w-3xl text-[36px] leading-tight font-normal tracking-[-0.02em]">{classroom.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/88">{classroom.hero}</p>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] px-4">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const href = `/class/${classId}/${tab.id}`;
            return (
              <Link
                key={tab.id}
                href={localizeHref(locale, href)}
                className={`border-b-2 px-4 py-4 text-sm font-medium ${
                  normalizedPath === href
                    ? "border-[var(--color-blue)] text-[var(--color-blue)]"
                    : "border-transparent text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
          <Link
            href={localizeHref(locale, `/class/${classId}/your-work`)}
            className={`border-b-2 px-4 py-4 text-sm font-medium ${
              normalizedPath === `/class/${classId}/your-work`
                ? "border-[var(--color-blue)] text-[var(--color-blue)]"
                : "border-transparent text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
            }`}
          >
            {dictionary.tabs.yourWork}
          </Link>
        </nav>
      </div>
    </div>
  );
}

function JoinClassModal({ onClose }: { onClose: () => void }) {
  const { dictionary } = useI18n();

  return (
    <Modal onClose={onClose} title={dictionary.modals.joinClass.title}>
      <div className="space-y-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-4">
          <p className="text-sm font-medium text-[var(--color-text)]">{dictionary.modals.joinClass.classCodeLabel}</p>
          <input
            defaultValue="READ-918"
            className="mt-3 w-full border-b border-[var(--color-border)] bg-transparent px-0 py-2 text-sm outline-none focus:border-[var(--color-blue)]"
          />
          <p className="mt-3 text-xs leading-5 text-[var(--color-text-soft)]">{dictionary.modals.joinClass.classCodeHelp}</p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-soft)]"
          >
            {dictionary.actions.cancel}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--color-blue)] px-4 py-2 text-sm font-medium text-white"
          >
            {dictionary.actions.join}
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
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[var(--color-text-soft)]" aria-label="Close dialog">
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
      <button type="button" className="rounded-full p-1.5 text-[var(--color-text-soft)]" aria-label="More options">
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
  const { locale } = useI18n();

  return (
    <Link
      href={localizeHref(locale, href)}
      className={`flex items-center gap-3 rounded-r-full px-4 py-3 text-sm ${
        active
          ? "bg-[var(--color-blue-soft)] font-medium text-[var(--color-blue)]"
          : "text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
      }`}
    >
      <Icon className="h-4 w-4" style={accent && !active ? { color: accent } : undefined} />
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
    <section className={`rounded-[12px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] ${className}`}>
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

function StatusChip({ label }: { label: WorkState }) {
  const { dictionary } = useI18n();
  const map: Record<WorkState, string> = {
    assigned: "bg-[var(--color-blue-soft)] text-[var(--color-blue)]",
    "turned-in": "bg-[var(--color-green-soft)] text-[var(--color-green)]",
    missing: "bg-[var(--color-red-soft)] text-[var(--color-red)]",
    returned: "bg-[#f3e8ff] text-[#7e57c2]",
    done: "bg-[var(--color-surface-subtle)] text-[var(--color-text-soft)]",
  };

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${map[label]}`}>{formatStatus(dictionary, label)}</span>;
}

function TypeIcon({ type }: { type: WorkType }) {
  const iconMap: Record<WorkType, LucideIcon> = {
    assignment: FileText,
    question: MessageSquare,
    "quiz-assignment": CircleAlert,
    material: Youtube,
  };
  const Icon = iconMap[type];
  const bgMap: Record<WorkType, string> = {
    assignment: "bg-[var(--color-blue-soft)] text-[var(--color-blue)]",
    question: "bg-[#f3e8ff] text-[#7e57c2]",
    "quiz-assignment": "bg-[var(--color-red-soft)] text-[var(--color-red)]",
    material: "bg-[var(--color-surface-subtle)] text-[var(--color-text-soft)]",
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

function formatStatus(dictionary: ReturnType<typeof useI18n>["dictionary"], state: WorkState) {
  switch (state) {
    case "assigned":
      return dictionary.statusLabels.assigned;
    case "turned-in":
      return dictionary.statusLabels.turnedIn;
    case "missing":
      return dictionary.statusLabels.missing;
    case "returned":
      return dictionary.statusLabels.returned;
    case "done":
      return dictionary.statusLabels.done;
  }
}

function formatWorkType(dictionary: ReturnType<typeof useI18n>["dictionary"], type: WorkType) {
  switch (type) {
    case "assignment":
      return dictionary.workTypeLabels.assignment;
    case "question":
      return dictionary.workTypeLabels.question;
    case "quiz-assignment":
      return dictionary.workTypeLabels.quizAssignment;
    case "material":
      return dictionary.workTypeLabels.material;
  }
}

function formatAnnouncementTag(dictionary: ReturnType<typeof useI18n>["dictionary"], tag: AnnouncementTag) {
  switch (tag) {
    case "announcement":
      return dictionary.announcementTags.announcement;
    case "reminder":
      return dictionary.announcementTags.reminder;
    case "classwork":
      return dictionary.announcementTags.classwork;
  }
}

function formatPoints(dictionary: ReturnType<typeof useI18n>["dictionary"], points: number) {
  return `${points} ${dictionary.miscellaneous.pointsSuffix}`;
}

function statusTextClass(state: WorkState) {
  switch (state) {
    case "missing":
      return "text-sm font-medium text-[var(--color-red)]";
    case "returned":
      return "text-sm font-medium text-[#7e57c2]";
    case "turned-in":
      return "text-sm font-medium text-[var(--color-green)]";
    default:
      return "text-sm text-[var(--color-text-soft)]";
  }
}
