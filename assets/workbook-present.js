/* Derived presentation view for workbook lessons. */
(function () {
  "use strict";

  const DEFAULT_MINUTES = { launch: 5, model: 10, project: 5, missions: 25, checks: 13, transfer: 10, finish: 7 };

  function safeText(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function codeHtml(code) {
    return typeof highlight === "function" ? highlight(code) : safeText(code);
  }

  function table(headers, rows) {
    return `<div class="present-table-wrap"><table><thead><tr>${headers.map(item => `<th>${safeText(item)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(item => `<td>${safeText(item)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function slide(key, section, segment, kicker, title, body) {
    return { key, section, segment, kicker, title, body };
  }

  function paperSlide(lesson) {
    const rule = lesson.paper.when === "after"
      ? "Consolidation. Close the editor for this."
      : "Devices closed. Do not open the editor until this is finished.";
    const materials = lesson.paper.materials
      ? `<div class="present-checkpoint"><span>Materials</span><strong>${safeText(lesson.paper.materials)}</strong></div>`
      : "";
    return slide("paper", "paper", "paper", `Off screen · ${lesson.paper.time}`, lesson.paper.title,
      `<p class="present-callout">${safeText(rule)}</p><p>${safeText(lesson.paper.prompt)}</p>${materials}`);
  }

  function buildSlides(lesson) {
    const slides = [slide("outcome", "lesson-top", "launch", "Outcome", lesson.title,
      `<p>${safeText(lesson.outcome)}</p><div class="present-deliverable"><span>Deliverable</span><strong>${safeText(lesson.deliverable)}</strong></div>`)];

    if (lesson.lessonType === "assessment") {
      slides.push(slide("scope", "assessment-scope", "model", "Assessment", "Scope",
        `<ul>${lesson.assessment.scope.map(item => `<li>${safeText(item)}</li>`).join("")}</ul>`));
      slides.push(slide("conditions", "assessment-conditions", "finish", "Assessment", "Conditions",
        `<ul>${lesson.assessment.conditions.map(item => `<li>${safeText(item)}</li>`).join("")}</ul>`));
      slides.push(slide("assessment-logistics", "assessment-logistics", "finish", "Assessment", "Submission and remediation",
        '<p>Questions, responses, and keys remain in the classroom system.</p><p class="present-callout">After results are returned, identify one misconception to revisit without copying secure question text.</p>'));
      return slides;
    }

    if (lesson.prediction) {
      slides.push(slide("prediction", "prediction", "launch", "Predict", "Commit before the reveal", `<p>${safeText(lesson.prediction.prompt)}</p>`));
      slides.push(slide("prediction:reveal", "prediction", "launch", "Reveal", "Reason through the result", `<p>${safeText(lesson.prediction.reveal)}</p>`));
    }
    if (lesson.paper && lesson.paper.when !== "after") {
      slides.push(paperSlide(lesson));
    }
    if (lesson.model) {
      slides.push(slide("model", "model", "model", "Model", "Study one complete idea",
        `<pre><code>${codeHtml(lesson.model.code)}</code></pre><p class="present-callout">${safeText(lesson.model.output)}</p>`));
    }
    if (lesson.project) {
      slides.push(slide("project", "project", "project", "Open", "Know the files before you edit",
        `${table(["File", "Your action", "Role"], lesson.project.files)}<div class="present-baseline"><span>Baseline</span><pre>${safeText(lesson.project.output)}</pre></div>`));
    }
    (lesson.missions || []).forEach((mission, index) => {
      slides.push(slide(`mission:${index + 1}`, "missions", "missions", `Mission ${index + 1} of ${lesson.missions.length}`, mission[0],
        `<p>${safeText(mission[1])}</p><div class="present-checkpoint"><span>Checkpoint</span><strong>${safeText(mission[2])}</strong></div>`));
    });
    if ((lesson.checks || []).length) {
      slides.push(slide("checks", "checks", "checks", "Test", "Compare expected and actual",
        table(["Check", "Expected"], lesson.checks.map(item => [item[1], item[2]]))));
    }
    if (lesson.paper && lesson.paper.when === "after") {
      slides.push(paperSlide(lesson));
    }
    if (lesson.apTransfer) {
      slides.push(slide("transfer", "transfer", "transfer", "AP transfer", "Move it to exam form", `<p>${safeText(lesson.apTransfer)}</p>`));
    }
    if (lesson.lessonType === "build") {
      slides.push(slide("finish", "evidence", "finish", "Finish", "Prepare the exit slip",
        `<p>${safeText(lesson.reflection)}</p><div class="present-checkpoint"><span>Before you submit</span><strong>Complete the reflection and one line about what you are still unsure about.</strong></div>`));
    }
    if (lesson.home) {
      slides.push(slide("home", "home", null, "Before next class", lesson.home.est,
        `<p>${safeText(lesson.home.task)}</p><div class="present-checkpoint"><span>Bring back</span><strong>${safeText(lesson.home.evidence)}</strong></div>`));
    }
    const skipped = new Set((lesson.present && lesson.present.skip) || []);
    return slides.filter(item => !skipped.has(item.key) && !skipped.has(item.section));
  }

  /* A manipulative has to come out of the block somewhere. By default it is taken
     from build time; a lesson can override the split with its own `segments`. */
  function segmentMinutes(lesson) {
    const minutes = Object.assign({}, DEFAULT_MINUTES);
    if (lesson.paper) {
      const requested = Number(String(lesson.paper.time).replace(/[^0-9]/g, "")) || 12;
      minutes.paper = requested;
      minutes.missions = Math.max(5, minutes.missions - requested);
    }
    (lesson.segments || []).forEach(item => {
      if (Object.prototype.hasOwnProperty.call(minutes, item.key) && Number(item.minutes) > 0) minutes[item.key] = Number(item.minutes);
    });
    return minutes;
  }

  function formatTime(seconds) {
    const negative = seconds < 0;
    const total = Math.abs(seconds);
    const value = `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
    return negative ? `−${value}` : value;
  }

  function isRequested() {
    return new URLSearchParams(location.search).has("present");
  }

  function render(options) {
    const { mount, lesson, meeting, meta, announce } = options;
    const slides = buildSlides(lesson);
    const timerEnabled = lesson.lessonType !== "assessment";
    const minutes = segmentMinutes(lesson);
    const remaining = Object.fromEntries(Object.entries(minutes).map(([key, value]) => [key, Math.round(value * 60)]));
    const presenterNotes = window.APCSAPresenterGuidance
      ? APCSAPresenterGuidance.forLesson(lesson)
      : (lesson.present && lesson.present.notes) || {};
    let index = 0;
    let paused = false;
    let notesVisible = false;
    let touchStartX = null;

    document.body.classList.add("is-presenting");
    mount.innerHTML = `<div class="present" data-present-root>
      <div class="present-screen" role="region" aria-live="polite" aria-label="Lesson presentation slide"></div>
      <div class="present-blank-screen" aria-hidden="true"></div>
      <div class="present-controls" aria-label="Presentation controls">
        <button type="button" data-present-action="previous" aria-label="Previous slide">←</button>
        <button type="button" data-present-action="next" aria-label="Next slide">→</button>
        ${timerEnabled ? '<button type="button" data-present-action="pause">Pause timer</button>' : ""}
        ${lesson.lessonType !== "assessment" && window.APCSARole && APCSARole.isTeacher() ? '<button type="button" data-present-action="notes" data-teacher-only>Notes</button>' : ""}
        <button type="button" data-present-action="blank">Blank</button>
        <button type="button" data-present-action="dark">Dark</button>
        <button type="button" data-present-action="study">Study view</button>
      </div>
    </div>`;

    const root = mount.querySelector("[data-present-root]");
    const screen = root.querySelector(".present-screen");
    const pauseButton = root.querySelector('[data-present-action="pause"]');

    function timerClass(seconds) {
      if (seconds <= 0) return "is-over";
      if (seconds <= 120) return "is-warning";
      return "";
    }

    function renderSlide() {
      const current = slides[index];
      const slideTimerEnabled = timerEnabled && current.segment && Object.prototype.hasOwnProperty.call(remaining, current.segment);
      const seconds = slideTimerEnabled ? remaining[current.segment] : null;
      const note = presenterNotes[current.key] || "";
      const notes = lesson.lessonType !== "assessment" && window.APCSARole && APCSARole.isTeacher() && notesVisible && note
        ? `<aside class="present-notes" data-teacher-only><span>Presenter note</span><p>${safeText(note)}</p></aside>` : "";
      screen.innerHTML = `<article class="present-slide" aria-roledescription="slide" aria-label="Slide ${index + 1} of ${slides.length}">
        <div class="present-slide-copy"><span class="present-kicker">${safeText(current.kicker)}</span><h1>${safeText(current.title)}</h1><div class="present-body">${current.body}</div>${notes}</div>
        <footer><span>${safeText(meta.name)} · Lesson ${lesson.unitLesson}</span><span>${index + 1}/${slides.length} · ${safeText(current.section)}</span>${slideTimerEnabled ? `<strong class="present-timer ${timerClass(seconds)}">${formatTime(seconds)}</strong>` : ""}</footer>
      </article>`;
      if (pauseButton) pauseButton.hidden = !slideTimerEnabled;
      if (index === 0) root.querySelector('[data-present-action="previous"]').disabled = true;
      else root.querySelector('[data-present-action="previous"]').disabled = false;
      if (index === slides.length - 1) root.querySelector('[data-present-action="next"]').disabled = true;
      else root.querySelector('[data-present-action="next"]').disabled = false;
      document.title = `${lesson.title} — present — AP Computer Science A`;
    }

    function move(delta) {
      const next = Math.max(0, Math.min(slides.length - 1, index + delta));
      if (next === index) return;
      index = next;
      renderSlide();
    }

    function studyView() {
      const url = new URL(location.href);
      url.searchParams.delete("present");
      url.hash = slides[index].section ? `#${slides[index].section}` : "";
      location.href = url.toString();
    }

    function action(name) {
      if (name === "previous") move(-1);
      if (name === "next") move(1);
      if (name === "pause") {
        if (!timerEnabled || !pauseButton) return;
        paused = !paused;
        pauseButton.textContent = paused ? "Resume timer" : "Pause timer";
        pauseButton.setAttribute("aria-pressed", String(paused));
        announce(paused ? "Presentation timer paused." : "Presentation timer resumed.");
      }
      if (name === "notes" && window.APCSARole && APCSARole.isTeacher()) {
        notesVisible = !notesVisible;
        const button = root.querySelector('[data-present-action="notes"]');
        if (button) button.setAttribute("aria-pressed", String(notesVisible));
        renderSlide();
      }
      if (name === "blank") {
        document.body.classList.toggle("present-is-blank");
        const pressed = document.body.classList.contains("present-is-blank");
        const button = root.querySelector('[data-present-action="blank"]');
        button.setAttribute("aria-pressed", String(pressed));
        button.textContent = pressed ? "Return to slides" : "Blank";
      }
      if (name === "dark") {
        document.body.classList.toggle("present-is-dark");
        const pressed = document.body.classList.contains("present-is-dark");
        root.querySelector('[data-present-action="dark"]').setAttribute("aria-pressed", String(pressed));
      }
      if (name === "study") studyView();
    }

    root.querySelectorAll("[data-present-action]").forEach(button => button.addEventListener("click", () => action(button.dataset.presentAction)));
    root.addEventListener("click", event => {
      if (event.target.closest("button, a, table, pre")) return;
      const third = event.clientX / window.innerWidth;
      if (third < 0.33) move(-1);
      if (third > 0.67) move(1);
    });
    root.addEventListener("touchstart", event => { touchStartX = event.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", event => {
      if (touchStartX == null) return;
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
      touchStartX = null;
    }, { passive: true });
    window.addEventListener("keydown", event => {
      if (event.target.closest && event.target.closest("button, input, textarea, select")) return;
      if (event.key === "ArrowRight" || event.key === " ") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key.toLowerCase() === "p") action("pause");
      if (event.key.toLowerCase() === "n" && window.APCSARole && APCSARole.isTeacher()) action("notes");
      if (event.key.toLowerCase() === "b") action("blank");
      if (event.key.toLowerCase() === "d") action("dark");
      if (event.key.toLowerCase() === "s" || event.key === "Escape") studyView();
    });

    setInterval(() => {
      if (!timerEnabled || paused || document.hidden) return;
      const current = slides[index];
      if (!current.segment || !Object.prototype.hasOwnProperty.call(remaining, current.segment)) return;
      remaining[current.segment]--;
      const timer = screen.querySelector(".present-timer");
      if (timer) {
        timer.textContent = formatTime(remaining[current.segment]);
        timer.className = `present-timer ${timerClass(remaining[current.segment])}`;
      }
    }, 1000);

    if (window.APCSARole) APCSARole.subscribe(() => renderSlide());
    renderSlide();
  }

  window.APCSAPresent = { isRequested, buildSlides, render };
})();
