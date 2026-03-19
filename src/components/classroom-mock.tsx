import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChartLine,
  CircleDot,
  CopyPlus,
  Ellipsis,
  FolderKanban,
  GraduationCap,
  LayoutGrid,
  MessageSquareText,
  MonitorPlay,
  NotebookTabs,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  announcements,
  classes,
  getClassroom,
  gradeRows,
  people,
  referenceImages,
  tabs,
  workItems,
  type ClassTab,
} from "@/lib/mock-data";

type DashboardProps = {
  activeClassId?: string;
};

type ClassPageProps = {
  classId: string;
  activeTab: ClassTab;
};

const tabCopy: Record<ClassTab, { eyebrow: string; title: string; detail: string }> = {
  stream: {
    eyebrow: "Class feed",
    title: "Make the stream feel calm, not chaotic.",
    detail:
      "Announcements, upcoming work, and quick teacher actions live together so the opening screen stays useful for both desktop and mobile.",
  },
  classwork: {
    eyebrow: "Learning design",
    title: "Organize everything by topic and momentum.",
    detail:
      "Assignments, materials, quizzes, and custom client extensions are grouped into visible pathways rather than a flat list.",
  },
  people: {
    eyebrow: "Roster UX",
    title: "Surface relationships, not just names.",
    detail:
      "Teachers, students, and guardian summaries get their own utility chips, making admin actions feel less buried than in standard LMS tables.",
  },
  grades: {
    eyebrow: "Teacher workflow",
    title: "Keep the gradebook dense but humane.",
    detail:
      "This mockup uses a paper-like grid, alert badges, and progress context so intervention decisions are obvious at a glance.",
  },
  "your-work": {
    eyebrow: "Student view",
    title: "Clarify what is next, late, or done.",
    detail:
      "A student-focused lane shows completion status, due moments, and support cues without sending learners into the teacher UI.",
  },
  insights: {
    eyebrow: "Client extension",
    title: "Show the added-value layer the client actually wants.",
    detail:
      "This custom insights page turns the Classroom baseline into a richer intervention dashboard with pacing, attention, and guardian digest prompts.",
  },
};

const primaryNav = [
  { href: "/", label: "Classes", icon: LayoutGrid },
  { href: "/class/biology-240/stream", label: "Active class", icon: NotebookTabs },
  { href: "/class/biology-240/your-work", label: "Student mode", icon: BookOpen },
  { href: "/class/biology-240/insights", label: "Client extras", icon: Sparkles },
];

const quickStats = [
  { label: "Roster", value: "28 learners", tone: "bg-[#d8efe7] text-[#145640]" },
  { label: "On-time turn-in", value: "92%", tone: "bg-[#dbe9f7] text-[#1b4870]" },
  { label: "Guardian digest", value: "Friday 4 PM", tone: "bg-[#f9ead0] text-[#7a4d11]" },
];

export function DashboardPage({ activeClassId = classes[0].id }: DashboardProps) {
  const activeClass = getClassroom(activeClassId);

  return (
    <AppFrame currentHref="/">
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className={`overflow-hidden rounded-[28px] bg-gradient-to-br ${activeClass.theme} p-[1px] shadow-[0_24px_80px_rgba(28,44,63,0.14)]`}>
            <div className="rounded-[27px] bg-[linear-gradient(145deg,rgba(247,244,236,0.94),rgba(255,255,255,0.9))] p-7 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-ink-soft)]">
                    UI/UX direction from `ui-ux-pro-max`
                  </p>
                  <h1 className="max-w-xl font-heading text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
                    A Google Classroom clone with an academic editorial edge.
                  </h1>
                  <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-soft)] md:text-base">
                    We kept the familiar classroom workflow but shifted the visual language toward parchment,
                    deep ink, and structured dashboards so the client can layer new features without the UI
                    feeling like a plain copy.
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/70 bg-white/70 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-ink-soft)]">
                    Design system
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink)]">
                    <li>Crimson Pro + Atkinson Hyperlegible</li>
                    <li>Paper base + ink nav + green/gold accents</li>
                    <li>Dense information with calm spacing</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="rounded-[20px] border border-white/80 bg-white/80 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-ink-soft)]">{stat.label}</p>
                    <div className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${stat.tone}`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink href="/class/biology-240/stream" icon={ArrowRight} label="Open teacher mockup" />
                <ActionLink href="/class/biology-240/insights" icon={Sparkles} label="View client extension" subtle />
              </div>
            </div>
          </div>

          <Card className="p-6">
            <SectionKicker label="Reference pack" />
            <h2 className="mt-3 font-heading text-3xl text-[var(--color-ink)]">Official screenshots downloaded</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--color-ink-soft)]">
              The gallery below uses images downloaded from Google for Education product pages so the mockup
              stays anchored to Classroom&apos;s current surfaces and supporting ecosystem.
            </p>
            <div className="mt-6 grid gap-4">
              {referenceImages.map((image) => (
                <div key={image.title} className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-panel)] p-3">
                  <div className="overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-white">
                    <Image
                      src={image.path}
                      alt={image.title}
                      width={1200}
                      height={700}
                      className="h-40 w-full object-cover object-top"
                    />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-[var(--color-ink)]">{image.title}</h3>
                      <span className="rounded-full bg-[var(--color-mist)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-soft)]">
                        {image.source}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-[var(--color-ink-soft)]">{image.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <SectionKicker label="Classes dashboard" />
                <h2 className="mt-2 font-heading text-3xl text-[var(--color-ink)]">Mockup entry points</h2>
              </div>
              <Link
                href="/class/biology-240/classwork"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:-translate-y-0.5"
              >
                Browse full classwork
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {classes.map((item) => (
                <Link
                  key={item.id}
                  href={`/class/${item.id}/stream`}
                  className={`group overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(28,44,63,0.12)] ${
                    item.id === activeClass.id ? "ring-2 ring-[var(--color-highlight)]" : ""
                  }`}
                >
                  <div className={`h-28 bg-gradient-to-br ${item.theme}`} />
                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-heading text-2xl text-[var(--color-ink)]">{item.name}</h3>
                        <p className="text-sm text-[var(--color-ink-soft)]">{item.section}</p>
                      </div>
                      <span className="rounded-full bg-[var(--color-mist)] px-3 py-1 text-xs font-semibold text-[var(--color-ink-soft)]">
                        {item.subject}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-[var(--color-ink-soft)]">{item.hero}</p>
                    <div className="flex items-center justify-between text-sm text-[var(--color-ink-soft)]">
                      <span>{item.roster} learners</span>
                      <span>{item.room}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionKicker label="What changed" />
            <h2 className="mt-2 font-heading text-3xl text-[var(--color-ink)]">Client-ready extension layer</h2>
            <div className="mt-5 space-y-4">
              <FeatureRow
                icon={Sparkles}
                title="Insights+ page"
                body="A custom page for pacing, intervention, and guardian prompts that sits beyond standard Classroom tabs."
              />
              <FeatureRow
                icon={FolderKanban}
                title="Pathway grouping"
                body="Assignments are grouped by topic and teaching intent so differentiated flows are easier to explain in demos."
              />
              <FeatureRow
                icon={MonitorPlay}
                title="Meet + prep sidebar"
                body="The stream keeps the class code, live call access, and support windows visible without extra clicks."
              />
            </div>
          </Card>
        </section>
      </div>
    </AppFrame>
  );
}

export function ClassPage({ classId, activeTab }: ClassPageProps) {
  const classroom = getClassroom(classId);
  const copy = tabCopy[activeTab];

  return (
    <AppFrame currentHref={`/class/${classroom.id}/${activeTab}`}>
      <div className="space-y-6">
        <section className={`overflow-hidden rounded-[30px] bg-gradient-to-br ${classroom.theme} p-[1px] shadow-[0_24px_80px_rgba(28,44,63,0.16)]`}>
          <div className="rounded-[29px] bg-[linear-gradient(180deg,rgba(247,244,236,0.9),rgba(255,255,255,0.94))] p-7 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-ink-soft)]">
                  {copy.eyebrow}
                </p>
                <h1 className="font-heading text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
                  {classroom.name}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-[var(--color-ink-soft)] md:text-base">
                  {copy.title} {copy.detail}
                </p>
              </div>
              <div className="grid min-w-[260px] gap-3 rounded-[24px] border border-white/70 bg-white/75 p-4 backdrop-blur">
                <DataChip label="Class code" value={classroom.classCode} />
                <DataChip label="Meet" value={classroom.meetLink} />
                <DataChip label="Completion" value={`${classroom.completion}% this week`} />
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-4 z-20 rounded-[24px] border border-[var(--color-border)] bg-[rgba(247,244,236,0.82)] p-3 shadow-[0_18px_44px_rgba(28,44,63,0.08)] backdrop-blur">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const href = `/class/${classroom.id}/${tab.id}`;
              const active = tab.id === activeTab;
              return (
                <Link
                  key={tab.id}
                  href={href}
                  scroll={false}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--color-ink)] text-white"
                      : "bg-white text-[var(--color-ink-soft)] hover:bg-[var(--color-mist)]"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </section>

        {activeTab === "stream" && <StreamTab />}
        {activeTab === "classwork" && <ClassworkTab />}
        {activeTab === "people" && <PeopleTab />}
        {activeTab === "grades" && <GradesTab />}
        {activeTab === "your-work" && <YourWorkTab />}
        {activeTab === "insights" && <InsightsTab />}
      </div>
    </AppFrame>
  );
}

function AppFrame({ children, currentHref }: { children: React.ReactNode; currentHref: string }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(245,184,79,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(43,111,154,0.16),transparent_26%),linear-gradient(180deg,#f7f4ec,#f4efe4_36%,#efe8da)] text-[var(--color-ink)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[260px_minmax(0,1fr)] xl:px-6">
        <aside className="rounded-[30px] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(180deg,#10263b,#17344d)] p-5 text-white shadow-[0_24px_60px_rgba(14,27,41,0.34)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5b84f] text-[#17344d] shadow-[0_10px_20px_rgba(245,184,79,0.28)]">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="font-heading text-2xl">Classroom Atelier</p>
              <p className="text-sm text-white/70">Mockup system</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2" aria-label="Primary">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const active = currentHref === item.href || currentHref.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    active ? "bg-white text-[var(--color-ink)]" : "text-white/78 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/6 p-4">
            <p className="text-xs uppercase tracking-[0.26em] text-white/60">Structure kept</p>
            <ul className="mt-4 space-y-3 text-sm text-white/82">
              <li>Home / Classes</li>
              <li>Stream / Classwork / People / Grades</li>
              <li>Student Your Work</li>
              <li>Client extension: Insights+</li>
            </ul>
          </div>
        </aside>

        <main id="main-content" className="space-y-6">
          <header className="rounded-[28px] border border-[var(--color-border)] bg-[rgba(247,244,236,0.72)] px-5 py-4 shadow-[0_18px_44px_rgba(28,44,63,0.08)] backdrop-blur md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-soft)]">
                  Frontend-only prototype
                </p>
                <h2 className="mt-1 font-heading text-3xl text-[var(--color-ink)]">Google Classroom baseline + new client surfaces</h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <ToolbarButton icon={CopyPlus} label="Create" />
                <ToolbarButton icon={CalendarDays} label="Calendar" />
                <ToolbarButton icon={Ellipsis} label="More" />
              </div>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

function StreamTab() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <SectionKicker label="Announcement composer" />
            <h2 className="mt-2 font-heading text-3xl text-[var(--color-ink)]">Teacher-first stream</h2>
          </div>
          <button className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--color-highlight)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5">
            <Plus className="h-4 w-4" />
            Post update
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {announcements.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-[0_10px_24px_rgba(28,44,63,0.05)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-ink-soft)]">{item.time}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{item.title}</h3>
                </div>
                <span className="rounded-full bg-[var(--color-mist)] px-3 py-1 text-xs font-semibold text-[var(--color-ink-soft)]">
                  {item.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">{item.body}</p>
              <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[var(--color-ink-soft)]">
                <span>By {item.author}</span>
                <button className="cursor-pointer font-medium text-[var(--color-ink)]">Open thread</button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <SectionKicker label="Class essentials" />
          <div className="mt-4 grid gap-3">
            <DataChip label="Meet room" value="Ready for advisory check-ins" />
            <DataChip label="Class code" value="XQ7-PLANT" />
            <DataChip label="Upcoming due" value="Storyboard tomorrow" />
          </div>
        </Card>
        <Card className="p-6">
          <SectionKicker label="Why this matters" />
          <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">
            The stream should remain a lightweight communication surface. This design keeps the post feed as the
            main column while letting the right rail hold the code, Meet, and pacing reminders that teachers need
            constantly.
          </p>
        </Card>
      </div>
    </section>
  );
}

function ClassworkTab() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <SectionKicker label="Topics and work" />
            <h2 className="mt-2 font-heading text-3xl text-[var(--color-ink)]">Structured classwork board</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Assignment", icon: FolderKanban },
              { label: "Question", icon: MessageSquareText },
              { label: "Material", icon: BookOpen },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {workItems.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-[var(--color-border)] bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-ink-soft)]">{item.topic}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{item.title}</h3>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--color-ink-soft)]">
                <InfoPill icon={CircleDot}>{item.type}</InfoPill>
                <InfoPill icon={CalendarDays}>{item.due}</InfoPill>
                {item.points ? <InfoPill icon={ChartLine}>{item.points} pts</InfoPill> : null}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <SectionKicker label="Client additions" />
          <div className="mt-4 space-y-4">
            <FeatureRow
              icon={Sparkles}
              title="Pathway cards"
              body="Each topic can include guidance cues, pacing labels, and extension prompts beyond stock Classroom topics."
            />
            <FeatureRow
              icon={NotebookTabs}
              title="Rubric sidecar"
              body="Attach a rubric preview without forcing the teacher to leave the classwork board."
            />
          </div>
        </Card>
        <Card className="p-6">
          <SectionKicker label="Reference signal" />
          <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">
            The board stays close to official Classroom structure: assignments, questions, quizzes, and materials,
            all grouped under topics with due date and publication states.
          </p>
        </Card>
      </div>
    </section>
  );
}

function PeopleTab() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <SectionKicker label="Roster" />
            <h2 className="mt-2 font-heading text-3xl text-[var(--color-ink)]">People and invitation states</h2>
          </div>
          <button className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--color-highlight)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5">
            <Plus className="h-4 w-4" />
            Invite people
          </button>
        </div>
        <div className="mt-6 divide-y divide-[var(--color-border)] overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white">
          {people.map((person) => (
            <div key={person.id} className="grid gap-3 px-5 py-4 md:grid-cols-[1.1fr_0.9fr_0.7fr] md:items-center">
              <div>
                <p className="text-base font-semibold text-[var(--color-ink)]">{person.name}</p>
                <p className="text-sm text-[var(--color-ink-soft)]">{person.email}</p>
              </div>
              <div className="text-sm text-[var(--color-ink-soft)]">{person.role}</div>
              <div className="text-sm font-medium text-[var(--color-ink)]">{person.streak}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <SectionKicker label="Actions" />
          <div className="mt-4 space-y-3">
            <ActionCard title="Email guardians" body="Send a summary digest with missing work and intervention notes." />
            <ActionCard title="Mute / support" body="Keep behavior tools close to the roster rather than hiding them in overflow menus." />
            <ActionCard title="Invite co-teacher" body="Dedicated invite card for staff roles mirrors official Classroom membership flows." />
          </div>
        </Card>
      </div>
    </section>
  );
}

function GradesTab() {
  return (
    <section className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="border-b border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff,#fbf7ef)] px-6 py-5 md:px-7">
          <SectionKicker label="Gradebook" />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-heading text-3xl text-[var(--color-ink)]">Dense, readable performance grid</h2>
            <button className="rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)]">
              Export gradebook
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[var(--color-mist)] text-[var(--color-ink-soft)]">
                <th className="px-5 py-4 font-medium">Student</th>
                <th className="px-5 py-4 font-medium">Turned in</th>
                <th className="px-5 py-4 font-medium">Missing</th>
                <th className="px-5 py-4 font-medium">Average</th>
                <th className="px-5 py-4 font-medium">Risk lane</th>
              </tr>
            </thead>
            <tbody>
              {gradeRows.map((row) => (
                <tr key={row.student} className="border-t border-[var(--color-border)] bg-white hover:bg-[#fcfaf4]">
                  <td className="px-5 py-4 font-medium text-[var(--color-ink)]">{row.student}</td>
                  <td className="px-5 py-4 text-[var(--color-ink-soft)]">{row.turnedIn}</td>
                  <td className="px-5 py-4 text-[var(--color-ink-soft)]">{row.missing}</td>
                  <td className="px-5 py-4 font-semibold text-[var(--color-ink)]">{row.average}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[var(--color-mist)] px-3 py-1 text-xs font-semibold text-[var(--color-ink-soft)]">
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-3">
        <MetricCard title="Returned today" value="18" note="with private comments" />
        <MetricCard title="Missing alerts" value="4" note="auto-highlighted" />
        <MetricCard title="Average trend" value="+6%" note="vs last unit" />
      </div>
    </section>
  );
}

function YourWorkTab() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="p-6 md:p-7">
        <SectionKicker label="Student preview" />
        <h2 className="mt-2 font-heading text-3xl text-[var(--color-ink)]">A clearer &quot;what do I do next?&quot; view</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <StudentStatusCard label="To do" value="3" note="1 due tomorrow" tone="bg-[#dbe9f7] text-[#1b4870]" />
          <StudentStatusCard label="Returned" value="11" note="2 with feedback" tone="bg-[#d8efe7] text-[#145640]" />
          <StudentStatusCard label="Missing" value="1" note="annotation pack" tone="bg-[#f8d9cf] text-[#8b3927]" />
          <StudentStatusCard label="Overall grade" value="94%" note="shared by teacher" tone="bg-[#f9ead0] text-[#7a4d11]" />
        </div>
        <div className="mt-6 space-y-3">
          {workItems.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-[var(--color-border)] bg-white px-4 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">{item.type}</p>
                <h3 className="mt-1 font-semibold text-[var(--color-ink)]">{item.title}</h3>
              </div>
              <div className="text-right text-sm text-[var(--color-ink-soft)]">
                <p>{item.due}</p>
                <p>{item.status === "Published" ? "Ready to open" : item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <SectionKicker label="Design intent" />
        <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-ink-soft)]">
          <p>
            The student page deliberately avoids teacher-only controls. It answers three questions first: what is due,
            what is missing, and where feedback lives.
          </p>
          <p>
            This gives the client room to add support nudges, checkpoints, and self-reflection prompts without
            cluttering the teacher workflow.
          </p>
        </div>
      </Card>
    </section>
  );
}

function InsightsTab() {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <MetricCard title="Attention heat" value="6 learners" note="need a check-in" accent="teal" />
        <MetricCard title="Guardian digest" value="Ready" note="send Friday 4 PM" accent="gold" />
        <MetricCard title="Pathway drift" value="2 topics" note="behind plan" accent="ink" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 md:p-7">
          <SectionKicker label="Custom feature page" />
          <h2 className="mt-2 font-heading text-3xl text-[var(--color-ink)]">Client-specific interventions and pacing</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ActionCard title="Group by learning path" body="See which students are on the core pathway, reteach loop, or extension lane." />
            <ActionCard title="Guardian-ready notes" body="Summarize attendance, missing work, and praise into one digest card." />
            <ActionCard title="Engagement pulse" body="Blend submission pace with Meet attendance to spot quiet drop-off patterns." />
            <ActionCard title="Next best teacher move" body="Prompt a suggested action such as reteach, nudge, or celebrate." />
          </div>
        </Card>
        <Card className="p-6">
          <SectionKicker label="Why this page exists" />
          <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">
            Google Classroom provides the baseline mental model. The client extension layer should feel native to
            that structure while clearly adding value. This Insights+ page is the clearest place to express those
            non-standard features in the mockup.
          </p>
        </Card>
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[30px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.82)] shadow-[0_18px_44px_rgba(28,44,63,0.08)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function SectionKicker({ label }: { label: string }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ink-soft)]">{label}</p>;
}

function DataChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-ink-soft)]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--color-ink)]">{value}</p>
    </div>
  );
}

function ActionLink({
  href,
  icon: Icon,
  label,
  subtle,
}: {
  href: string;
  icon: typeof ArrowRight;
  label: string;
  subtle?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
        subtle
          ? "border border-[var(--color-border-strong)] bg-white text-[var(--color-ink)]"
          : "bg-[var(--color-highlight)] text-[var(--color-ink)]"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function ToolbarButton({ icon: Icon, label }: { icon: typeof Plus; label: string }) {
  return (
    <button className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[var(--color-ink)] transition hover:bg-[var(--color-mist)]">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function FeatureRow({ icon: Icon, title, body }: { icon: typeof Sparkles; title: string; body: string }) {
  return (
    <div className="flex gap-4 rounded-[20px] border border-[var(--color-border)] bg-white p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-mist)] text-[var(--color-ink)]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-ink)]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[var(--color-ink-soft)]">{body}</p>
      </div>
    </div>
  );
}

function ActionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[20px] border border-[var(--color-border)] bg-white p-4">
      <h3 className="text-sm font-semibold text-[var(--color-ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-ink-soft)]">{body}</p>
    </div>
  );
}

function InfoPill({ icon: Icon, children }: { icon: typeof CircleDot; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-mist)] px-3 py-1.5">
      <Icon className="h-4 w-4" />
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: "Published" | "Scheduled" | "Draft" }) {
  const tones = {
    Published: "bg-[#d8efe7] text-[#145640]",
    Scheduled: "bg-[#dbe9f7] text-[#1b4870]",
    Draft: "bg-[#f9ead0] text-[#7a4d11]",
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[status]}`}>{status}</span>;
}

function MetricCard({
  title,
  value,
  note,
  accent = "teal",
}: {
  title: string;
  value: string;
  note: string;
  accent?: "teal" | "gold" | "ink";
}) {
  const accents = {
    teal: "from-[#d8efe7] to-white text-[#145640]",
    gold: "from-[#f9ead0] to-white text-[#7a4d11]",
    ink: "from-[#dbe9f7] to-white text-[#1b4870]",
  };

  return (
    <Card className="bg-white p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-ink-soft)]">{title}</p>
      <div className={`mt-4 rounded-[22px] bg-gradient-to-br p-5 ${accents[accent]}`}>
        <p className="font-heading text-4xl">{value}</p>
        <p className="mt-2 text-sm font-medium">{note}</p>
      </div>
    </Card>
  );
}

function StudentStatusCard({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: string;
}) {
  return (
    <div className="rounded-[22px] border border-[var(--color-border)] bg-white p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">{label}</p>
      <div className={`mt-3 inline-flex rounded-full px-3 py-1 text-lg font-semibold ${tone}`}>{value}</div>
      <p className="mt-3 text-sm text-[var(--color-ink-soft)]">{note}</p>
    </div>
  );
}
