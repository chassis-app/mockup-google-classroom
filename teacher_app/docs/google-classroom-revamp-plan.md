# Google Classroom Mockup Revamp Plan

Last updated: 2026-03-25

## Goal

Revamp the current mockup so it:

- looks much closer to real Google Classroom,
- covers the higher-fidelity feature set identified in the research,
- preserves the existing client-specific extension layer,
- and becomes a stronger demo foundation for future implementation work.

This plan combines:

- the baseline study in `docs/google-classroom-study.md`,
- the feature synthesis in `docs/google-classroom-enhanced-feature-list.md`,
- the styling strategy in `docs/google-classroom-styling-plan.md`,
- and the current implementation in `src/components/classroom-mock.tsx`, `src/app/globals.css`, and `src/lib/mock-data.ts`.

## Current state

The current app already has the right broad structure:

- dashboard
- Stream
- Classwork
- People
- Grades
- Your work
- custom `Insights+`

But it needs a full revamp because:

- the UI styling is not close enough to Google Classroom
- several real Classroom workflows are only implied, not represented in the UI
- the client extension layer currently feels visually separate from Classroom
- the shell, typography, and page copy still read more like a concept piece than a product mockup

## Revamp principles

### 1. Google Classroom first

The baseline UI should be recognizable as Classroom before any client-specific enhancements are introduced.

### 2. Additive enhancements, not redesign-for-redesign

New features should feel like they were added to Classroom, not like the product was rebranded into a new design system.

### 3. Product realism over marketing presentation

The UI should use believable labels, layouts, and data states that mirror real teacher and student workflows.

### 4. Teacher and student workflows both matter

The mockup should show the full loop:

- teacher creates and organizes work
- student completes and submits work
- teacher reviews, grades, and returns work

### 5. Styling and functionality should be planned together

The visual refresh should support the actual feature set. The app should not be restyled independently of the product workflows it needs to represent.

## Target outcome

After the revamp, the app should demonstrate:

- a believable Google Classroom-style dashboard and class shell
- realistic Stream, Classwork, People, Grades, Your Work, and Settings views
- stronger teacher authoring and grading flows
- stronger student submission and feedback flows
- client-specific enhancements presented as native-feeling extensions

## Workstreams

### Workstream 1. Styling system reset

Objective:

- replace the current editorial visual language with a Google Classroom-aligned UI system

Main changes:

- move to a neutral sans-serif product typography system
- replace parchment and dark-ink palette with Classroom-like neutrals and accents
- remove large decorative gradients, glassmorphism, and oversized rounded surfaces
- reduce shadow intensity and standardize border use
- update spacing, radii, and component density to feel closer to Classroom

Primary files:

- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/classroom-mock.tsx`

### Workstream 2. App shell and navigation

Objective:

- make the shell immediately recognizable as Google Classroom

Main changes:

- rebuild the left rail to match Classroom's light navigation model
- simplify the top header
- replace branded marketing chrome with product-like utility controls
- add realistic navigation sections such as classes, calendar, review, archived classes, and settings

Primary files:

- `src/components/classroom-mock.tsx`

### Workstream 3. Dashboard revamp

Objective:

- align the home screen with the real classes dashboard

Main changes:

- replace the current hero-led dashboard with class-card-first layout
- add a create-class flow representation
- improve class cards with banner art, teacher identity, quick actions, and status cues
- make dashboard content feel like an actual teaching workspace, not a design showcase

Primary files:

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`

### Workstream 4. Stream page parity

Objective:

- make Stream behave like a realistic class communication surface

Main changes:

- add banner-based class header
- add class code card
- add Meet card
- add upcoming work card
- use a realistic announcement composer
- show class comments and generated classwork posts
- make stream settings and permissions visible in the UI language

Primary files:

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`

### Workstream 5. Classwork and assignment-authoring expansion

Objective:

- represent Classroom's real content creation and organization model

Main changes:

- add topic sections and topic filtering
- reflect the real create menu:
  - assignment
  - quiz assignment
  - question
  - material
  - reuse post
  - topic
- add richer work-item cards with due dates, counts, rubric indicators, and statuses
- create a realistic assignment authoring surface with:
  - title
  - instructions
  - attachments
  - points
  - due date/time
  - topic
  - student targeting
  - originality flag
  - close-submissions setting
- represent draft, scheduled, and published states

Primary files:

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`

### Workstream 6. People and roster management

Objective:

- make the roster page look and behave like Classroom rather than a generic directory

Main changes:

- separate teachers and students sections clearly
- add invite actions for teachers and students
- represent empty-state and invitation-state patterns
- keep custom guardian-related enhancements secondary and contextual

Primary files:

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`

### Workstream 7. Grades and grading flow

Objective:

- strengthen the end-to-end teacher grading workflow

Main changes:

- make the gradebook denser and more table-like
- include class average and sortable roster
- reflect assignment columns and at-risk states
- add a submission review view with rubric scoring and private comments
- show return flow and status states such as turned in, returned, missing, and late

Primary files:

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`

### Workstream 8. Student `Your work` and submission flow

Objective:

- show a believable student-side task completion experience

Main changes:

- add assignment detail layout with `Your work` side panel
- show `Add or create`, `Mark as done`, and `Turn in`
- show class comments vs private comments
- show rubric visibility and returned feedback
- make due states and submission states clearer

Primary files:

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`

### Workstream 9. Settings and policy controls

Objective:

- represent Classroom's administrative controls inside the class

Main changes:

- add class details section
- add invite code and invite link management
- add class code display controls
- add stream posting permissions
- add classwork-on-stream notification mode
- add Meet management area
- add grading mode, overall-grade visibility, and category controls

Primary files:

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`

### Workstream 10. Client enhancement blending

Objective:

- keep the client's extra value visible without breaking Classroom fidelity

Main changes:

- keep `Insights+` as an extension surface, but inherit Classroom styling tokens
- present custom intervention and pacing modules as adjacent product panels
- avoid letting custom features visually dominate baseline pages
- ensure all custom cards, charts, and prompts feel like they belong in the same product

Primary files:

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`

## Recommended delivery phases

### Phase 1. Foundation reset

Scope:

- global tokens
- typography
- shell
- top header
- left rail
- dashboard shell structure

Outcome:

- the app immediately reads as a Classroom-like product

### Phase 2. Core page revamp

Scope:

- dashboard
- class header
- Stream
- Classwork
- People

Outcome:

- the most visible product surfaces align to Google Classroom

### Phase 3. Workflow depth

Scope:

- Grades
- student `Your work`
- assignment detail
- submission review
- settings

Outcome:

- the mockup supports real teacher-student workflow demos

### Phase 4. Client extension integration

Scope:

- `Insights+`
- custom intervention modules
- guardian/support enhancements
- analytics placeholders

Outcome:

- the custom features feel like a natural extension of Classroom

### Phase 5. Polish and validation

Scope:

- responsive tuning
- state consistency
- copy cleanup
- interaction polish
- visual consistency pass

Outcome:

- the mockup is demo-ready

## Page-by-page deliverables

### Dashboard

- light left rail
- class cards with authentic proportions and banner treatment
- create-class UI
- teaching / enrolled / review navigation cues

### Stream

- class banner header
- class code card
- Meet card
- upcoming work card
- announcement composer
- post feed with comments

### Classwork

- create menu
- topics
- topic filter
- work-item cards
- assignment detail / authoring entry

### People

- teachers section
- students section
- invite controls
- realistic empty / partially populated states

### Grades

- gradebook grid
- class average
- roster rows
- assignment columns
- submission-status indicators

### Your work

- student work panel
- attach/create flow
- turn-in flow
- private comments
- rubric / score visibility

### Settings

- class details
- invite controls
- code controls
- stream permissions
- Meet controls
- grading settings

### Insights+

- keep only the enhancements that support the client story
- align visual language to the rest of the app
- avoid creating a visually separate dashboard product

## Data-model enhancements needed for the revamp

The current mock data is too light for the higher-fidelity UI. It should be expanded to support:

- banner and theme metadata per class
- realistic teacher and student identities
- announcement threads and comments
- assignment metadata including due time, points, topic, attachments, and status
- rubric criteria and scores
- submission state and timestamps
- class settings and permission values
- gradebook columns and summary metrics
- student work panel states

Primary file:

- `src/lib/mock-data.ts`

## Risks and control points

### Risk 1. Over-customizing too early

Control:

- finish Classroom baseline styling and structure before expanding custom client layers

### Risk 2. Styling changes without workflow depth

Control:

- each styling pass should be tied to a page-level product behavior

### Risk 3. Losing fidelity by using concept copy

Control:

- rewrite labels and UI text to match real Classroom language

### Risk 4. Custom features feeling bolted on

Control:

- use shared tokens, shared card structures, and shared navigation conventions

### Risk 5. Dense desktop UI collapsing poorly on mobile

Control:

- validate every phase on both desktop and mobile layouts

## Acceptance criteria

The revamp is successful when:

- the visual shell strongly resembles Google Classroom
- major pages mirror real Classroom patterns from the screenshot research
- teacher and student flows are both demonstrable
- assignment creation, submission, grading, and settings all exist in believable form
- client enhancements feel native to the same product
- the app remains clean and responsive

## Recommended next execution step

Start with Phase 1 and Phase 2 together:

1. reset global tokens and typography
2. rebuild the shell and dashboard
3. rebuild the class header, tabs, Stream, and Classwork surfaces

This sequence gives the fastest visible improvement and creates the styling system the later pages can reuse.
