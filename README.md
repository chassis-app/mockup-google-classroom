# Classroom Atelier

Frontend-only Google Classroom-inspired mockup for exploring client-requested UI and feature extensions before any backend work starts.

## What is included

- classes dashboard
- class pages for `Stream`, `Classwork`, `People`, `Grades`, `Your work`, and a custom `Insights+` extension
- local mock data only; no backend
- official Google Classroom reference screenshots in `refs/google-classroom/`
- research notes in `docs/google-classroom-study.md`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Key files

- `src/components/classroom-mock.tsx`
- `src/lib/mock-data.ts`
- `docs/google-classroom-study.md`
- `refs/google-classroom/README.md`
