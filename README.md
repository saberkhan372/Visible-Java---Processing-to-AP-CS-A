# AP Computer Science A — course site

The course site for AP CS A, E block, 2026–27. Calendar, units, free response and tools.

**What makes it this course and not a generic one:** every new idea is anchored to something
students already built in Processing. They arrive with a year of Java behind them, so the
site never starts from zero.

**Design principle: make the local material coherent.** The course folder is the curriculum
source: existing handouts, labs, assessments, and examples are remixed into the current
four-unit CED sequence. External sites are optional practice. The distinctive connective
tissue is the Java/Processing comparison, translation layer, port exercise, and trap deck.

## Pages

| File | What it is |
|---|---|
| `index.html` | Start here. The gap, what was cut in 2025, where to go next. |
| `calendar.html` | All 71 meetings: date, rotation, time, topic, activity, assessments. Data in `assets/calendar.js`. |
| `unit1.html` | Broad Unit 1 overview and workbook dashboard: reference visual, Java anchor, resume state, editor profile, export, and eleven typed lessons. |
| `unit1/lesson-01.html`–`lesson-11.html` | Workbook lessons with predictions, verified projects, missions, evidence, AP transfer, optional Processing prompts, review, and assessment shapes. Data in `assets/unit1.js`; behavior in `assets/workbook.js`. |
| `unit2.html` | Broad Unit 2 overview and workbook dashboard: resume state, editor profile, export, and eleven typed lessons. |
| `unit2/lesson-12.html`–`lesson-22.html` | Workbook-model lessons: prediction, verified project, numbered missions, expected/actual evidence, AP transfer, optional Processing prompt, lab boundary, and assessment shape. Data in `assets/unit2.js`; behavior in `assets/workbook.js`. |
| `unit3.html` | Broad Unit 3 overview and workbook dashboard for class design and object behavior. |
| `unit3/lesson-23.html`–`lesson-35.html` | Thirteen workbook routes: ten verified Java projects, retrieval/FRQ work, and a protected assessment. Data in `assets/unit3.js`. |
| `unit4.html` | Broad Unit 4 overview, grouped into arcs 4A–4E. |
| `unit4/lesson-36.html`–`lesson-65.html` | Thirty workbook routes spanning data, arrays, files, ArrayList, 2D structures, search, sort, recursion, extended labs, review, and assessment. Data in `assets/unit4.js`. |
| `teacher.html` | Teacher-role, paste-in exit-slip aggregator. It sends and persists no student response data. |
| `audit.html` | **Not for students.** Type-aware coverage matrix over all 65 lessons. Required content, shared/custom presenter guidance, optional Processing, and annual Classroom configuration are reported separately. |
| `path.html` | Year timeline + broad route through the remixed course folder, unit by unit. |
| `examples.html` | **Original.** Ten programs in three runnable versions each, with copy buttons. Data in `assets/snippets.js`. |
| `translate.html` | **Original.** Every Processing habit → its AP CS A replacement. |
| `port.html` | **Original.** Port a sketch students already wrote into exam-legal Java, mapped onto FRQ types. |
| `traps.html` | **Original.** 18 predict-the-output problems. |
| `frq.html` | The four FRQ types, triage of old released questions, how to read a prompt. |
| `setup.html` | Leaving the PDE: IDEs, keeping graphics, week-one compiler errors. |
| `camp.html` | Processing for AP CS A educator-camp concept, session arc, sample materials, FAQ, and Google Forms interest form. |
| `tools/create-processing-workshop-form.gs` | Run-once Google Apps Script that creates the workshop interest form and linked response spreadsheet. |

## Running it

The HTML/CSS/JavaScript site has no rendering build step and no backend. Open `index.html` in a
browser. Unit 1–4 project bundles have a separate release build so the Java downloads can
be compiled, checked, and packaged before publication.

To serve locally:

```bash
python3 -m http.server 8000 --directory /Users/saberkhan/Documents/coding/apcsa/site
```

## Deploying

Any static host. Drag the `site/` folder onto Netlify, or push to a GitHub repo and turn on
Pages. There is no login or transmitted student data. The Unit 1–4 workbooks store editor choice
and student-entered working progress in `localStorage` after interaction and export Markdown/JSON;
an untouched page need not create state. Teacher role and temporary display name use
`sessionStorage`. The LMS remains the system of record.

## Verifying and building workbook projects

Unit 1–4 source projects live in `../coursework/unit-1/` through `../coursework/unit-4/`.
The course verification baseline is OpenJDK 17. Run:

```bash
../tools/verify.sh
../tools/build-bundles.sh
../tools/release.sh
```

`verify.sh` compiles all 51 starters and solutions and runs 366 checks against the solutions.
`build-bundles.sh` creates 51 student ZIP files without solution code. Unit 2 contains ten lesson
directories but nine Java projects because its Magpie companion intentionally does not republish
authorized source. `release.sh` performs both steps and verifies 81 HTML pages, 65 workbook routes,
51 manifests, skip links, main landmarks, downloads, local HTML links, every JavaScript asset's
syntax, workbook data schemas, and Present slide ordering. Node.js is required for the JavaScript
release checks. Processing verification is a separate optional gate and is not required for
standard-Java bundles.

The submission panel appears on all 47 build lessons. `assets/classroom-links.js` currently has no
active current-course URLs, so release verification warns for 47 lessons (18 in Units 1–2 and 29 in
Units 3–4). This does not block static publication, copy, or slip download; it only withholds the
per-lesson **Open Classroom** link until configuration is added.

## Editing content

**Traps and translation rows live in `assets/content.js`** — plain arrays at the top of the
file. Add an entry and it appears. Nothing else needs to change.

A trap looks like this:

```js
{
  id: 19, unit: "Unit 2", title: "Short descriptive name",
  code: `int x = 5;
System.out.println(x);`,
  output: "5",
  why: "Explain the misconception. HTML is allowed here."
}
```

- `code` is a template literal — write Java normally, no escaping. Syntax highlighting is
  automatic.
- `output` is what it actually prints. Use `\n` for multiple lines; each line renders as its
  own chip.
- `why` should name the *misconception*, not just restate the answer.

**The calendar lives in `assets/calendar.js`** — one object per meeting with `date`, `rot`,
`time`, `unit`, `topic`, `act` and `kind` (`test` / `quiz` / `lab` / `frq` / `due`). Dates were
generated by parsing the Secondary Planner; topics are hand-written. Edit `topic`/`act`/`kind`
freely. If the school calendar changes, re-derive the dates rather than hand-editing 71 rows.

**Legacy lesson-reader material lives in `assets/lessons.js`** — one object per calendar meeting,
with `concept`,
an optional `viz` (an id from `VIZ`), and two exercises: `ap` (required exam-form Java) and
`vp` (optional Java + Processing transfer). Each exercise is `{ prompt, starter, solution }`.
`LESSON_GUIDES` adds the daily target, launch, source handout, practice direction, and exit
ticket. Omit `ap`/`vp`/`viz` freely — review and test days have none.

⚠️ **Starters and solutions are template literals — no backticks inside them.** Use single
quotes when referring to a variable in a comment. A stray backtick silently breaks the file.

**Workbook lessons live in `assets/unit1.js` through `assets/unit4.js`.** Each entry declares its
lesson type, outcome, deliverable, prediction, project metadata, missions, checkpoints, AP transfer,
optional Processing prompt, and reflection. `assets/workbook.js` renders all 65 thin Unit 1–4
lesson routes, stores the shared local working copy, calculates Evidence ready, and handles
Markdown/JSON export. Standard-Java project sources stay in `../coursework/unit-1/` through
`../coursework/unit-4/`; edit those files and rebuild the student ZIPs rather than copying Java into
the page data.

`assets/lessons.js` is retained as source/reference material and no longer drives the Unit 1 routes.

## Two views and Classroom exit slips

Every Unit 1–4 lesson has a visible **Study view / Present view** switch. Present view can also be
opened directly by adding `?present=1` to its URL. The deck is available to students as a large-type
accessibility view. Teacher mode is selected with `?teacher=1`; the session-scoped amber badge
exposes presenter notes and the link to `teacher.html`. Teacher mode is a rendering convenience,
not access control, and presenter notes must never contain secrets or secure assessment content.
Build, review, and extended-lab lessons receive shared type-specific stage directions; individual
lessons may override them with more specific `present.notes`.

Build lessons add `stuck` and `unsure` evidence fields and a plain-text exit-slip preview. A student
copies or downloads the slip and submits it through the LMS. The student name is stored only for
the current tab; it is not added to the long-lived workbook state. `teacher.html` groups pasted
slips locally and clears them on reload.

Current-course Classroom Question URLs belong in `assets/classroom-links.js`, keyed by lesson id.
Keeping them outside the unit data files prevents annual Classroom IDs from becoming part of
the reusable curriculum. Missing links leave copy/download working and render a configuration note.

Relevant shared files:

- `assets/workbook.js`: study view, state migration, evidence status, exit slips, and exports.
- `assets/workbook-present.js`: derived slides, controls, timer, projection behavior, and note gate.
- `assets/role.js`: site-wide, session-only student/teacher rendering role.
- `assets/teacher-tools.js`: response parser and local class summaries.

**The three-view examples live in `assets/snippets.js`** — one object per example with
`processing`, `papplet` and `java` keys. **Every pane must be a complete, runnable program**,
because students copy them directly. The `papplet` version needs Processing's `core.jar` on
the classpath and uses `PApplet.main("ClassName")`; note `size()` belongs in `settings()`,
not `setup()`, when running outside the PDE.

Prose changes are plain HTML in the page files. The nav is duplicated across the pages — if you add one, add the link everywhere.
Unit pages are not in the top nav; they hang off `path.html`.

**`port.html` uses real code from last year's sketches** (`Objects_with_arrays_and_nested_loops.pde`
and the Unit 3 grid project). If you change the Processing course, swap those examples for
whatever the new cohort actually built — the whole point is that students recognise the
left-hand column as their own work.

## Design notes

- Palette is derived from the Processing PDE's own syntax colors: keyword green `#33997E`,
  function blue `#006699`, literal plum `#7D4793`. Green = the Processing side, blue = the
  Java side, throughout.
- Light and dark themes both defined via CSS custom properties in `assets/site.css`.
  Respects OS preference; the button in the footer of `index.html` overrides it.
- No web fonts (nothing to load, nothing to break offline). Serif headings, system sans
  body, mono for code and labels.

## Deliberate omissions

- **No code execution.** Bluebook has no Run button either — committing to an answer before
  revealing it *is* the exam skill. This also drops the heaviest technical dependency.
- **No hosted PDFs.** Released FRQs and the College Board lab guides are public on AP
  Central — link to those. The textbook PDF and the publisher's lab exercises in
  `AP Computer Science A 26-27/` should stay behind the LMS.
- **No inheritance content.** Removed from the exam in 2025. See below.

## Facts baked into the copy — recheck these each year

Verified July 2026 directly against the CED in
`../classroom-materials/Class Documents/2025 AP Computer Science A CED/`:

- Four units. Weights: U1 15–25%, U2 25–35%, U3 10–18%, U4 30–40%.
- Exam: 42 MCQ / 90 min (55%) + 4 FRQ / 90 min (45%), fully digital in Bluebook.
- FRQ points: Q1 Methods & Control Structures 7 · Q2 Class Design 7 ·
  Q3 Data Analysis with ArrayList 5 · Q4 2D Array 6. Q1 Part B always requires
  `String` methods.
- MCQ skill weights: **Analyze Code 37–53%**, Develop Code 22–38%, Document 10–15%,
  Design 2–10%, Responsible Use 2–10%.
- **Cut in 2025:** inheritance, polymorphism, `extends`, `super`, interfaces, and *writing*
  recursive methods. The CED's exclusion statement covers *designing and implementing*
  inheritance — the vocabulary still appears in topic 1.12, so don't tell students the word
  won't show up.
- **Added in 2025:** text files with `Scanner`, working with data sets, recursion *tracing*,
  and `split` on the Java Quick Reference.
- Unit 1 source attributions were checked against the imported M&amp;M's Parameters, String
  Activity, String Four Corners, String Output Lineup, and Unit 1 More Labs handouts.

Claims about what students already know come from measuring all 140 `.pde` files in
`../Copy of C - Comp Prog in Java 2025 - 2026/`: zero 2D arrays, zero `String` methods, zero
file reading, `ArrayList` in only 4 files. If next year's Processing course changes, re-run
that check before trusting `path.html`.

If College Board revises the course again, `path.html`, `frq.html` and `index.html` are
where the version-specific claims live.

## Pacing

The timeline at the top of `path.html` mirrors `../SCOPE-AND-SEQUENCE.md` — **71 meetings**
of 75 minutes before the exam, split 11 / 11 / 13 / 30 / 6. **If you change the pacing, change
both.** Counts and dates live in the page's `.tl-blocks` and `.tl-when` spans.

Dates come from the real 2026–27 Secondary Planner. E block is a **Gold-day** class: first
meeting Fri 4 Sep 2026, last before the exam Mon 10 May 2027, exam Wed 12 May 2027 12:00 PM.
If the block letter changes for 2026–27, re-derive the meeting list — the scope and sequence
has the parser output in its appendix.

## Never copy into this folder

- `Class Documents/2026 FRQ Student Samples/` — secure APSI material, explicitly not for
  websites.
- `Copy of C - Comp Prog in Java 2025 - 2026/` — contains named student work and recordings.
- Publisher PDFs (Lewis & Loftus, *Learning Processing*).

The site references all of these by name only; students get them through the LMS.
