# Google Classroom Styling Alignment Plan

Last updated: 2026-03-25

## Objective

Restyle the current mockup so it tracks much more closely to real Google Classroom UI patterns, while still leaving room for the client's extra features.

The priority is no longer "Google Classroom-inspired with a custom editorial skin." The priority is:

- preserve Google Classroom's visual structure,
- preserve Google Classroom's interaction density and spacing,
- preserve Google Classroom's color and component language,
- then layer client-specific features in a way that still feels native to Classroom.

## Why this needs to change

The current mockup intentionally departs from Google Classroom styling in several major ways:

- serif display typography instead of Google-style utilitarian product typography
- parchment / editorial color palette instead of Classroom's light gray, white, blue, green, and purple accents
- oversized rounded cards and decorative gradients instead of flatter Material-style surfaces
- dark branded sidebar shell instead of Classroom's light left rail
- conceptual marketing copy in page chrome instead of realistic product labels and controls
- "client extension" surfaces that visually dominate the baseline product instead of feeling like additive modules

This creates a useful concept piece, but it does not yet meet the client's request for a Google Classroom-tied UI.

## Styling direction we should target

### 1. Overall visual language

The mockup should feel like a close product-study reconstruction of Google Classroom:

- light app shell
- white cards on soft gray background
- restrained color usage
- simple borders and low-elevation shadows
- product-UI typography rather than brand/editorial typography
- more rectangular surfaces and smaller radii than the current mockup
- quiet tabs, icons, and controls rather than expressive hero sections

### 2. Typography

Target:

- use a Google-like sans-serif system
- remove decorative serif headings from product surfaces
- reduce oversized headline styling
- use consistent product-scale type sizes similar to Classroom tabs, cards, and settings screens

Implementation note:

- Google Sans is not generally available as a standard web font in this repo, so the practical substitute should be `Roboto` or a similar neutral sans
- product headings should look like interface labels, not marketing headlines

### 3. Color system

Target token families:

- page background: soft gray
- surface background: white
- subtle border: light gray
- primary text: near-black / dark gray
- secondary text: muted gray
- Classroom blue accents for links, selected states, and utility emphasis
- Classroom purple underline/accent where visible in class tabs and classwork controls
- Google green for Meet / education highlights where appropriate
- warning colors only for due / missing / alert states

What to avoid:

- parchment beige base
- gold highlight as a brand color
- dark navy shell
- large multicolor gradients as primary surfaces

### 4. Layout and spacing

Target:

- left rail similar to real Classroom navigation
- top bar closer to Classroom's lightweight header
- class page header using banner image + class name, not oversized descriptive hero copy
- two-column stream layout with essentials in a narrow side column
- flatter classwork cards with topic sections and simple metadata rows
- grades page as a denser table/grid
- settings page as long white sections with simple form rows

### 5. Shape language

Target:

- reduce card radii across the app
- use more subtle shadows
- rely more on borders than floating glassmorphism
- use rounded pills only where Classroom already does
- remove decorative blur/backdrop effects from most product surfaces

### 6. Iconography

Target:

- favor simpler Material-like icon usage
- keep icon size restrained
- use icons mainly for utility actions, not as strong decorative anchors

Implementation note:

- if the project stays on `lucide-react`, choose only the most neutral outlines and use them sparingly
- a later pass can switch to a Material Symbols package if closer visual fidelity is needed

### 7. Content tone inside the UI

Target:

- use realistic product labels and task-focused text
- remove pitch-like copy from banners and page intros
- use labels such as `Announce something to your class`, `Upcoming`, `Class code`, `View all`, `Turn in`, `Return`, `Invite students`

This matters because Google Classroom's styling is partly visual and partly textual. The current mockup sounds like a concept deck; the target should sound like a working product.

## Concrete restyle plan by file

### 1. [src/app/layout.tsx](/home/ubuntu/mockup-google-classroom/src/app/layout.tsx)

Planned changes:

- replace `Crimson Pro` heading font usage
- switch the app to a neutral sans-first font stack
- update metadata text so the app is described as a Classroom-style mockup rather than a branded editorial concept

### 2. [src/app/globals.css](/home/ubuntu/mockup-google-classroom/src/app/globals.css)

Planned changes:

- replace the parchment/ink token set with Classroom-like neutrals
- define a smaller, cleaner radii scale
- reduce or remove background gradients
- standardize subtle border and shadow tokens
- add reusable tokens for selected tabs, muted text, chip backgrounds, and status colors

This file should become the main design-token source for the restyle.

### 3. [src/components/classroom-mock.tsx](/home/ubuntu/mockup-google-classroom/src/components/classroom-mock.tsx)

Planned changes:

- rebuild `AppFrame` to match Classroom's light rail and lightweight top header
- remove the dark branded sidebar treatment
- replace the marketing-style dashboard hero with a class-card dashboard closer to real Classroom
- restyle class headers to use banner-based course identity instead of a large descriptive hero block
- restyle tabs to match Classroom's understated navigation
- restyle stream cards, classwork cards, roster sections, and grade views to be flatter and denser
- move client-specific features into secondary modules so they feel attached to Classroom rather than visually replacing it
- revise action buttons so primary actions match Classroom tone and scale

### 4. [src/lib/mock-data.ts](/home/ubuntu/mockup-google-classroom/src/lib/mock-data.ts)

Planned changes:

- replace some current custom/poetic course copy with more realistic classroom content
- add banner/theme metadata that aligns to real Classroom class headers
- add label text that supports Google-like UI language in cards, posts, and settings

### 5. [docs/google-classroom-enhanced-feature-list.md](/home/ubuntu/mockup-google-classroom/docs/google-classroom-enhanced-feature-list.md)

Planned changes:

- keep this as the feature reference
- use it to ensure the styling pass supports the actual Classroom surfaces: stream, classwork, people, grades, your work, and settings

## Implementation phases

### Phase 1. Shell alignment

Goal:

- make the app instantly read as Classroom before the user even inspects features

Changes:

- font swap
- token reset
- light navigation rail
- lightweight top header
- simpler backgrounds
- reduced radii and shadows

### Phase 2. Page-surface alignment

Goal:

- make each major page feel like a believable Classroom screen

Changes:

- dashboard cards
- class header banners
- stream layout
- classwork topic blocks
- people roster sections
- gradebook grid
- your-work right panel
- settings sections

### Phase 3. Interaction polish

Goal:

- make controls and states feel natively Classroom-like

Changes:

- selected tab states
- chips and status badges
- buttons and dropdown styling
- card hover behavior
- comment composer styling
- due/missing/returned state styling

### Phase 4. Client-extension blending

Goal:

- integrate custom client features without breaking the Google Classroom visual baseline

Changes:

- restyle `Insights+` and any custom additions so they inherit Classroom tokens
- use extension cards/panels that feel like adjacent product modules, not a separate design system

## Visual guardrails for implementation

- default to white surfaces on soft gray backgrounds
- keep most UI text between small-label and standard-body sizes
- use purple and blue as accents, not full-page themes
- keep banners and illustrations limited to places where Classroom already uses them
- avoid glassmorphism, frosted panels, editorial gradients, and oversized promotional copy
- custom client surfaces must inherit the same spacing, borders, buttons, tabs, and typography as baseline Classroom pages

## Success criteria

The styling pass is successful if:

- a user looking at the mockup immediately recognizes Google Classroom without explanation
- the shell, tabs, cards, settings, and grading surfaces feel visually close to the screenshot PDF
- custom features still feel like they belong inside Classroom
- the app remains usable on desktop and mobile
- the product feels like a realistic Google Classroom derivative, not a redesign concept

## Recommended execution order

1. Restyle global tokens and typography.
2. Rebuild the shell and dashboard.
3. Rework class header and tab navigation.
4. Rework Stream and Classwork.
5. Rework People, Grades, Your Work, and Settings.
6. Blend client extensions back into the Classroom visual system.
