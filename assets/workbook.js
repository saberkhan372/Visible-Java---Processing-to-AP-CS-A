/* Companion-workbook renderer and local working state.
   The LMS remains the system of record for graded artifacts. */

(function () {
  "use strict";

  const ACTIVE_META = typeof UNIT1_META !== "undefined" ? UNIT1_META
    : typeof UNIT2_META !== "undefined" ? UNIT2_META
      : typeof UNIT3_META !== "undefined" ? UNIT3_META
        : typeof UNIT4_META !== "undefined" ? UNIT4_META
          : null;
  const ACTIVE_LESSONS = typeof UNIT1_LESSONS !== "undefined" ? UNIT1_LESSONS
    : typeof UNIT2_LESSONS !== "undefined" ? UNIT2_LESSONS
      : typeof UNIT3_LESSONS !== "undefined" ? UNIT3_LESSONS
        : typeof UNIT4_LESSONS !== "undefined" ? UNIT4_LESSONS
          : [];
  const STORAGE_KEY = ACTIVE_META.storageKey;
  const EMPTY_STATE = { schemaVersion: 2, profile: { editor: "generic" }, lessons: {} };
  const EDITORS = {
    generic: {
      label: "Teacher-configured editor",
      open: "Open the downloaded project folder in the Java editor used in class.",
      run: target => `Compile all Java files, then run ${target}.`
    },
    vscode: {
      label: "VS Code",
      open: "Use File → Open Folder and select the unzipped project folder.",
      run: target => `Open ${target}.java and choose Run Java above main. Run the Check class separately when directed.`
    },
    intellij: {
      label: "IntelliJ IDEA",
      open: "Use File → Open and select the unzipped project folder.",
      run: target => `Open ${target}.java and use the green run control beside main.`
    },
    bluej: {
      label: "BlueJ",
      open: "Use Project → Open Non BlueJ and select the unzipped folder.",
      run: target => `Compile the project, right-click ${target}, and run main(String[] args).`
    },
    terminal: {
      label: "Terminal",
      open: "Open a terminal in the unzipped project folder.",
      run: target => `Run javac *.java, then java ${target}.`
    }
  };

  function freshState() {
    return JSON.parse(JSON.stringify(EMPTY_STATE));
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!parsed || ![1, 2].includes(parsed.schemaVersion) || typeof parsed.lessons !== "object") return freshState();
      parsed.profile = parsed.profile || { editor: "generic" };
      delete parsed.profile.displayName;
      if (parsed.schemaVersion === 1) {
        parsed.schemaVersion = 2;
      }
      return parsed;
    } catch (error) {
      return freshState();
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      announce("This browser could not save locally. Export your evidence before leaving.");
      return false;
    }
  }

  function lessonState(id) {
    if (!state.lessons[id]) {
      state.lessons[id] = { checked: [], fields: {}, started: false, updatedAt: "" };
    }
    return state.lessons[id];
  }

  function lessonStatus(lesson) {
    if (lesson.lessonType === "assessment") return "assessment";
    const current = state.lessons[lesson.id];
    if (!current || !current.started) return "not-started";
    const requiredChecks = (lesson.checks || []).map(item => item[0]);
    const requiredFields = ["prediction", "apTransfer", "reflection"];
    if (lesson.lessonType === "build") requiredFields.push("unsure");
    const checksReady = requiredChecks.every(id => current.checked.includes(`check:${id}`));
    const fieldsReady = requiredFields.every(name => String(current.fields[name] || "").trim());
    return checksReady && fieldsReady ? "evidence-ready" : "in-progress";
  }

  function statusLabel(status) {
    return {
      "not-started": "Not started",
      "in-progress": "In progress",
      "evidence-ready": "Evidence ready",
      assessment: "Assessment"
    }[status] || status;
  }

  function touch(id) {
    const current = lessonState(id);
    current.started = true;
    current.updatedAt = new Date().toISOString();
    saveState();
  }

  function announce(message) {
    const live = document.getElementById("workbook-live");
    if (live) live.textContent = message;
  }

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

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function isLessonRoute() {
    return /\/unit\d+\/lesson-\d+\.html$/.test(location.pathname);
  }

  function unitHref() {
    return isLessonRoute() ? `../${ACTIVE_META.slug}.html` : `${ACTIVE_META.slug}.html`;
  }

  function calendarHref() {
    return isLessonRoute() ? "../calendar.html" : "calendar.html";
  }

  function downloadHref(path) {
    const normalized = path.replace(/^\.\.\//, "");
    return isLessonRoute() ? `../${normalized}` : normalized;
  }

  function editorOptions() {
    return Object.entries(EDITORS).map(([value, editor]) =>
      `<option value="${value}"${state.profile.editor === value ? " selected" : ""}>${editor.label}</option>`
    ).join("");
  }

  function editorDirections(target) {
    const editor = EDITORS[state.profile.editor] || EDITORS.generic;
    return `<p><strong>Open:</strong> ${editor.open}</p><p><strong>Run:</strong> ${editor.run(target)}</p>`;
  }

  function bindEditorSelects(root) {
    root.querySelectorAll("[data-editor-select]").forEach(select => {
      if (!select.options.length) select.innerHTML = editorOptions();
      select.value = state.profile.editor;
      select.addEventListener("change", () => {
        state.profile.editor = select.value;
        saveState();
        document.querySelectorAll("[data-editor-directions]").forEach(panel => {
          panel.innerHTML = editorDirections(panel.dataset.editorDirections);
        });
        document.querySelectorAll("[data-editor-select]").forEach(other => { other.value = select.value; });
        announce(`Editor set to ${EDITORS[select.value].label}.`);
      });
    });
  }

  function unitCard(lesson) {
    const meeting = typeof MEETINGS !== "undefined" ? MEETINGS.find(item => item.n === lesson.number) : null;
    const status = lessonStatus(lesson);
    const file = `${ACTIVE_META.slug}/lesson-${String(lesson.number).padStart(2, "0")}.html`;
    const action = status === "in-progress" ? "Resume" : status === "evidence-ready" ? "Review evidence" : "Open lesson";
    return `<a class="unit-lesson-card workbook-unit-card is-${lesson.lessonType}" href="${file}" data-unit-card="${lesson.id}">
      <span class="unit-lesson-number">${String(lesson.unitLesson).padStart(2, "0")}</span>
      <span class="unit-lesson-date">${meeting ? `${meeting.date} · ${meeting.time}` : `Meeting ${lesson.number}`}</span>
      <span class="workbook-status status-${status}">${statusLabel(status)}</span>
      <span class="tag">${lesson.topic}</span>
      <h3>${lesson.title}</h3>
      <p>${lesson.outcome}</p>
      <span class="unit-card-deliverable"><strong>Deliverable:</strong> ${lesson.deliverable}</span>
      <span class="unit-lesson-action">${action} <span aria-hidden="true">→</span></span>
    </a>`;
  }

  function renderWorkbookOverview(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    if (ACTIVE_LESSONS.some(lesson => lesson.arc)) {
      let activeArc = "";
      mount.innerHTML = ACTIVE_LESSONS.map(lesson => {
        const heading = lesson.arc && lesson.arc !== activeArc
          ? `<div class="unit-arc-heading"><span>${safeText(lesson.arc)}</span></div>` : "";
        activeArc = lesson.arc || activeArc;
        return heading + unitCard(lesson);
      }).join("");
    } else {
      mount.innerHTML = ACTIVE_LESSONS.map(unitCard).join("");
    }

    const counts = { "not-started": 0, "in-progress": 0, "evidence-ready": 0 };
    ACTIVE_LESSONS.filter(item => item.lessonType !== "assessment").forEach(item => {
      counts[lessonStatus(item)]++;
    });
    const summary = document.getElementById("workbook-progress-summary");
    if (summary) {
      summary.textContent = `${counts["evidence-ready"]} evidence ready · ${counts["in-progress"]} in progress · ${counts["not-started"]} not started`;
    }

    const resume = document.getElementById("workbook-resume");
    if (resume) {
      let target = ACTIVE_LESSONS.find(item => lessonStatus(item) === "in-progress");
      if (!target) target = ACTIVE_LESSONS.find(item => lessonStatus(item) === "not-started");
      if (!target) target = ACTIVE_LESSONS[0];
      resume.href = `${ACTIVE_META.slug}/lesson-${String(target.number).padStart(2, "0")}.html`;
      resume.textContent = lessonStatus(target) === "in-progress" ? `Resume lesson ${target.unitLesson}` : `Start lesson ${target.unitLesson}`;
    }

    bindEditorSelects(document);
    bindOverviewExport();
    if (window.APCSARole) APCSARole.decorate();
  }

  function atAGlance(lesson) {
    const downloadLabel = lesson.downloadLabel || (lesson.lessonType === "extended-lab" ? "verified lab project" : "verified Java project");
    const download = lesson.download
      ? `<a class="workbook-download" href="${downloadHref(lesson.download)}" download>Download ${downloadLabel}</a>`
      : `<span class="workbook-private">Distributed through the classroom system</span>`;
    return `<div class="workbook-glance">
      <div><span>Outcome</span><strong>${lesson.outcome}</strong></div>
      <div><span>Deliverable</span><strong>${lesson.deliverable}</strong></div>
      <div><span>Time</span><strong>${lesson.duration}</strong></div>
      <div><span>AP connection</span><strong>${lesson.ap}</strong></div>
      <div><span>Project</span>${download}</div>
      <div><span>Evidence</span><strong>Checks + explanation + AP transfer</strong></div>
    </div>`;
  }

  function predictionSection(lesson, n) {
    return `<section id="prediction">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Before</div>
        <div class="lesson-stage stack-lg">
          <div class="stack"><h2>Predict before you code</h2><p>${lesson.prediction.prompt}</p></div>
          <label class="workbook-field">Your prediction
            <textarea rows="4" data-workbook-field="prediction" placeholder="Commit to an answer before revealing the explanation."></textarea>
          </label>
          <details class="workbook-reveal"><summary>Reveal the reasoning</summary><p>${lesson.prediction.reveal}</p></details>
          <p class="source-note">${lesson.source}</p>
        </div>
      </div>
    </section>`;
  }

  function modelSection(lesson, n) {
    return `<section id="model">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Model</div>
        <div class="lesson-stage stack-lg">
          <div class="stack"><h2>Study one complete idea</h2><p>${lesson.model.explanation}</p></div>
          <div class="worked-example">
            <div class="tri-bar"><span>Worked model · study before you build</span></div>
            <pre>${codeHtml(lesson.model.code)}</pre>
            <p class="model-output"><strong>What it proves:</strong> ${lesson.model.output}</p>
          </div>
        </div>
      </div>
    </section>`;
  }

  function projectSection(lesson, n) {
    const rows = lesson.project.files.map(file => `<tr><td><code>${file[0]}</code></td><td>${file[1]}</td><td>${file[2]}</td></tr>`).join("");
    const downloadLabel = lesson.downloadLabel || (lesson.lessonType === "extended-lab" ? "verified lab project" : "verified project ZIP");
    const download = lesson.download
      ? `<a class="workbook-download" href="${downloadHref(lesson.download)}" download>Download ${downloadLabel}</a>`
      : "";
    const editor = lesson.project.runTarget ? `<div class="editor-panel">
            <label>Editor <select data-editor-select>${editorOptions()}</select></label>
            <div data-editor-directions="${safeText(lesson.project.runTarget)}">${editorDirections(lesson.project.runTarget)}</div>
          </div>` : "";
    const baseline = lesson.project.output == null ? "" : `<div class="baseline-box"><span>Expected unchanged baseline</span><pre>${safeText(lesson.project.output)}</pre></div>`;
    return `<section id="project">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Open</div>
        <div class="lesson-stage stack-lg">
          <div class="workbook-project-head"><div class="stack-sm"><h2>${lesson.project.heading || "Open the project"}</h2><p>${lesson.project.baseline}</p></div>${download}</div>
          <div class="tbl-scroll"><table><thead><tr><th>File</th><th>Your action</th><th>Role</th></tr></thead><tbody>${rows}</tbody></table></div>
          ${editor}
          ${baseline}
        </div>
      </div>
    </section>`;
  }

  function missionsSection(lesson, n) {
    const missions = lesson.missions.map((mission, index) => `<article class="workbook-mission">
      <label><input type="checkbox" data-workbook-check="mission:${index + 1}"><span>${index + 1}</span><strong>${mission[0]}</strong></label>
      <p>${mission[1]}</p>
      <details><summary>Checkpoint</summary><p>${mission[2]}</p></details>
    </article>`).join("");
    return `<section id="missions">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Build</div>
        <div class="lesson-stage stack-lg"><div class="stack"><h2>Complete the editor missions</h2><p>Check a mission only after its checkpoint is observable.</p></div><div class="workbook-missions">${missions}</div></div>
      </div>
    </section>`;
  }

  function checksSection(lesson, n) {
    const rows = lesson.checks.map(check => `<tr>
      <td><label class="check-label"><input type="checkbox" data-workbook-check="check:${check[0]}"><span>${check[1]}</span></label></td>
      <td>${check[2]}</td>
      <td><textarea rows="2" data-workbook-field="actual:${check[0]}" aria-label="Actual result for ${safeText(check[1])}" placeholder="Record actual result"></textarea></td>
    </tr>`).join("");
    return `<section id="checks">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Test</div>
        <div class="lesson-stage stack-lg">
          <div class="stack"><h2>Compare expected and actual</h2><p>“It ran” is not the same as “it met the specification.”</p></div>
          <div class="tbl-scroll workbook-check-table"><table><thead><tr><th>Check</th><th>Expected</th><th>Actual</th></tr></thead><tbody>${rows}</tbody></table></div>
          <div class="debug-record stack-sm"><h3>Debugging record</h3>
            <div class="debug-grid">
              <label>I expected<textarea rows="2" data-workbook-field="debugExpected"></textarea></label>
              <label>I observed<textarea rows="2" data-workbook-field="debugObserved"></textarea></label>
              <label>Smallest change I tried<textarea rows="2" data-workbook-field="debugChange"></textarea></label>
              <label>What I learned<textarea rows="2" data-workbook-field="debugLearning"></textarea></label>
            </div>
            <p>If no bug occurred, record a likely failure mode or explain why one test matters.</p>
          </div>
        </div>
      </div>
    </section>`;
  }

  function transferSection(lesson, n) {
    return `<section id="transfer">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Transfer</div>
        <div class="lesson-stage stack-lg">
          <div class="stack"><h2>Move it to AP form</h2><p>${lesson.apTransfer}</p></div>
          <label class="workbook-field">Your AP transfer response
            <textarea rows="7" data-workbook-field="apTransfer" placeholder="Write the trace, explanation, or method here."></textarea>
          </label>
        </div>
      </div>
    </section>`;
  }

  function paperSection(lesson, n) {
    if (!lesson.paper) return "";
    const printable = lesson.paper.printable
      ? `<a class="workbook-download" href="${downloadHref(lesson.paper.printable)}" download>Download printable</a>`
      : `<span class="workbook-private">Printed and handed out in class</span>`;
    const placement = lesson.paper.when === "after" ? "After the checks" : "Before the model";
    const rule = lesson.paper.when === "after"
      ? "Consolidation. Close the editor for this."
      : "Devices closed. Do not open the editor until this is finished.";
    return `<section id="paper">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Off screen</div>
        <div class="lesson-stage stack-lg">
          <div class="workbook-project-head"><div class="stack-sm"><h2>${lesson.paper.title}</h2><p class="paper-rule">${rule}</p><p>${lesson.paper.prompt}</p></div>${printable}</div>
          <div class="workbook-glance">
            <div><span>Time</span><strong>${lesson.paper.time}</strong></div>
            <div><span>Materials</span><strong>${lesson.paper.materials}</strong></div>
            <div><span>Placement</span><strong>${placement}</strong></div>
          </div>
          <label class="workbook-field">What you worked out by hand <span>(record it before you type anything)</span>
            <textarea rows="3" data-workbook-field="paper" placeholder="The rule, bound, or pattern this activity produced."></textarea>
          </label>
          ${lesson.paper.evidenceNote ? `<p class="source-note">${lesson.paper.evidenceNote}</p>` : ""}
        </div>
      </div>
    </section>`;
  }

  function homeSection(lesson, n) {
    if (!lesson.home) return "";
    const kinds = { practice: "Practice", video: "Watch", reading: "Read", build: "Build" };
    const link = lesson.home.link
      ? `<a class="workbook-download" href="${lesson.home.link}" target="_blank" rel="noopener noreferrer">Open the resource</a>`
      : "";
    return `<section id="home">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Before next class</div>
        <div class="lesson-stage stack-lg">
          <div class="workbook-project-head"><div class="stack-sm"><h2>${kinds[lesson.home.type] || "Before next class"} · ${lesson.home.est}</h2><p>${lesson.home.task}</p></div>${link}</div>
          <label class="workbook-field">${lesson.home.evidence}
            <textarea rows="5" data-workbook-field="home" placeholder="Bring this back to the next meeting."></textarea>
          </label>
        </div>
      </div>
    </section>`;
  }

  function processingSection(lesson, n) {
    if (!lesson.processing) return "";
    return `<section id="processing">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Optional</div>
        <div class="lesson-stage">
          <details class="lesson-extension">
            <summary><span>Optional Java + Processing · ${lesson.processing.time}</span>${lesson.processing.title}</summary>
            <div class="lesson-extension-body stack"><p><strong>Why this visual helps:</strong> ${lesson.processing.why}</p><p>${lesson.processing.prompt}</p><p class="source-note">${lesson.processing.status}</p></div>
          </details>
        </div>
      </div>
    </section>`;
  }

  const DISPLAY_NAME_KEY = "apcsa-workbook-display-name";

  function displayName() {
    try {
      return String(sessionStorage.getItem(DISPLAY_NAME_KEY) || "").trim();
    } catch (error) {
      return "";
    }
  }

  function storeDisplayName(value) {
    try {
      if (value) sessionStorage.setItem(DISPLAY_NAME_KEY, value);
      else sessionStorage.removeItem(DISPLAY_NAME_KEY);
    } catch (error) {
      // A student can still download a slip when session storage is unavailable.
    }
  }

  function oneLine(value, maxLength) {
    return String(value || "")
      .replace(/===/g, "")
      .replace(/[\r\n\t]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  function classroomUrl(lesson) {
    const fromLesson = lesson.submit && lesson.submit.classroomUrl;
    const fromDeployment = typeof CLASSROOM_LINKS !== "undefined" ? CLASSROOM_LINKS[lesson.id] : "";
    const candidate = String(fromLesson || fromDeployment || "");
    return /^https:\/\/classroom\.google\.com\//.test(candidate) ? candidate : "";
  }

  function exitSlip(lesson) {
    const current = lessonState(lesson.id);
    const fields = current.fields || {};
    const missions = (lesson.missions || []).filter((item, index) => current.checked.includes(`mission:${index + 1}`)).length;
    const completeChecks = (lesson.checks || []).filter(item => current.checked.includes(`check:${item[0]}`));
    const openChecks = (lesson.checks || []).filter(item => !current.checked.includes(`check:${item[0]}`)).map(item => item[0]);
    const debug = [fields.debugExpected, fields.debugObserved, fields.debugChange, fields.debugLearning]
      .map(item => oneLine(item, 80)).filter(Boolean).join(" / ");
    const name = oneLine(displayName(), 60).replace(/\|/g, " ") || "(no name)";
    const lines = [
      `=== APCSA ${lesson.id.toUpperCase()} | ${name}`,
      `missions: ${missions}/${(lesson.missions || []).length}`,
      `checks: ${completeChecks.length}/${(lesson.checks || []).length}`
    ];
    if (openChecks.length) lines.push(`open-checks: ${openChecks.join(" ")}`);
    lines.push(
      `editor: ${oneLine(state.profile.editor, 30)}`,
      `prediction: ${oneLine(fields.prediction, 200) || "blank"}`,
      `stuck: ${oneLine(fields.stuck, 120) || "blank"}`,
      `debug: ${oneLine(debug, 240) || "blank"}`,
      `transfer: ${oneLine(fields.apTransfer, 240) || "blank"}`,
      `unsure: ${oneLine(fields.unsure, 200) || "blank"}`,
      "==="
    );
    return lines.join("\n");
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      return copied;
    }
  }

  function submitPanel(lesson) {
    if (lesson.lessonType !== "build") return "";
    const link = classroomUrl(lesson);
    return `<section class="submit-panel" aria-labelledby="submit-panel-title">
      <div class="submit-panel-head"><div><span class="eyebrow">Classroom exit slip</span><h3 id="submit-panel-title">Copy one compact evidence record</h3></div><p class="slip-identity"><span data-slip-name>${displayName() ? `Signed in as ${safeText(displayName())}` : "Name not set"}</span> · <button type="button" data-change-slip-name>${displayName() ? "Not you?" : "Set name"}</button></p></div>
      <pre data-exit-slip-preview>${safeText(exitSlip(lesson))}</pre>
      <div class="submit-actions">
        <button type="button" data-copy-slip>Copy exit slip</button>
        <button type="button" data-download-slip>Download .txt</button>
        ${link ? `<a href="${safeText(link)}" target="_blank" rel="noopener">Open the Classroom question</a>` : '<span class="classroom-link-missing">Classroom link not configured yet</span>'}
      </div>
      <p class="submit-note">Your name is kept for this tab only. Paste the slip into Classroom; this page does not submit it for you.</p>
    </section>`;
  }

  function refreshSubmitPanel(root, lesson) {
    const preview = root.querySelector("[data-exit-slip-preview]");
    if (preview) preview.textContent = exitSlip(lesson);
    const name = root.querySelector("[data-slip-name]");
    if (name) name.textContent = displayName() ? `Signed in as ${displayName()}` : "Name not set";
    const nameButton = root.querySelector("[data-change-slip-name]");
    if (nameButton) nameButton.textContent = displayName() ? "Not you?" : "Set name";
  }

  function askForDisplayName(root, lesson) {
    const value = prompt("Name for this Classroom exit slip:", displayName());
    if (value == null) return false;
    const cleaned = oneLine(value, 60).replace(/\|/g, " ");
    if (!cleaned) {
      announce("Add your name before copying the exit slip.");
      return false;
    }
    storeDisplayName(cleaned);
    refreshSubmitPanel(root, lesson);
    return true;
  }

  function bindSubmitPanel(root, lesson) {
    if (lesson.lessonType !== "build") return;
    refreshSubmitPanel(root, lesson);
    const copyButton = root.querySelector("[data-copy-slip]");
    if (copyButton) copyButton.addEventListener("click", async () => {
      const unsure = lessonState(lesson.id).fields.unsure;
      if (!String(unsure || "").trim()) {
        const field = root.querySelector('[data-workbook-field="unsure"]');
        if (field) field.focus();
        announce("Add one line about what you are still unsure about. That is the part your teacher reads first.");
        return;
      }
      if (!displayName() && !askForDisplayName(root, lesson)) return;
      const copied = await copyText(exitSlip(lesson));
      if (!copied) {
        announce("The browser blocked copying. Download the text file instead.");
        return;
      }
      copyButton.textContent = "Copied";
      announce("Exit slip copied. Paste it into the Classroom question.");
      setTimeout(() => { copyButton.textContent = "Copy exit slip"; }, 1600);
    });
    const downloadButton = root.querySelector("[data-download-slip]");
    if (downloadButton) downloadButton.addEventListener("click", () => {
      downloadText(`${lesson.id}-exit-slip.txt`, exitSlip(lesson), "text/plain");
      announce("Exit slip downloaded as text.");
    });
    const nameButton = root.querySelector("[data-change-slip-name]");
    if (nameButton) nameButton.addEventListener("click", () => {
      if (displayName()) storeDisplayName("");
      askForDisplayName(root, lesson);
    });
  }

  function evidenceSection(lesson, n) {
    const submissionFields = lesson.lessonType === "build" ? `<div class="submit-reflection-grid">
            <label class="workbook-field">Where did you get stuck? <span>(one line, or “nowhere”)</span>
              <textarea rows="2" data-workbook-field="stuck"></textarea>
            </label>
            <label class="workbook-field">What are you still unsure about? <span>(required for Evidence ready)</span>
              <textarea rows="2" data-workbook-field="unsure"></textarea>
            </label>
          </div>` : "";
    return `<section id="evidence">
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${pad(n)}</span> Finish</div>
        <div class="lesson-stage stack-lg">
          <div class="stack"><h2>Prepare evidence for the LMS</h2><p>${lesson.reflection}</p></div>
          <label class="workbook-field">Reflection
            <textarea rows="4" data-workbook-field="reflection"></textarea>
          </label>
          <label class="workbook-field">Artifact or submission link <span>(optional working note)</span>
            <input type="url" data-workbook-field="artifactLink" placeholder="https://">
          </label>
          ${submissionFields}
          <div class="evidence-panel">
            <div><span>Workbook status</span><strong data-lesson-status>${statusLabel(lessonStatus(lesson))}</strong><small>Ready means prepared to submit, not submitted.</small></div>
            <div class="evidence-actions">
              <button type="button" data-export-lesson>Export lesson Markdown</button>
              <button type="button" data-backup>Back up JSON</button>
              <label class="import-label">Import JSON<input type="file" accept="application/json" data-import></label>
              <button type="button" class="danger-button" data-clear-lesson>Clear this lesson</button>
            </div>
          </div>
          ${submitPanel(lesson)}
          ${pager(lesson)}
        </div>
      </div>
    </section>`;
  }

  function pager(lesson) {
    const index = ACTIVE_LESSONS.indexOf(lesson);
    const previous = ACTIVE_LESSONS[index - 1];
    const next = ACTIVE_LESSONS[index + 1];
    return `<nav class="lesson-pager" aria-label="Lesson navigation">
      ${previous ? `<a rel="prev" href="lesson-${String(previous.number).padStart(2, "0")}.html"><span aria-hidden="true">←</span> Lesson ${previous.unitLesson}</a>` : `<a href="${unitHref()}"><span aria-hidden="true">←</span> Unit overview</a>`}
      <a href="${unitHref()}">All ${ACTIVE_META.name} lessons</a>
      ${next ? `<a rel="next" href="lesson-${String(next.number).padStart(2, "0")}.html">Lesson ${next.unitLesson} <span aria-hidden="true">→</span></a>` : `<a href="${calendarHref()}">Full calendar <span aria-hidden="true">→</span></a>`}
    </nav>`;
  }

  function lessonViewSwitch() {
    return `<nav class="lesson-view-switch" aria-label="Lesson view">
      <span aria-current="page">Study view</span>
      <a href="?present=1" aria-label="Open present view in large type">Present view</a>
    </nav>`;
  }

  function renderAssessment(lesson, meeting) {
    const scope = lesson.assessment.scope.map(item => `<li>${item}</li>`).join("");
    const conditions = lesson.assessment.conditions.map(item => `<li>${item}</li>`).join("");
    return `<section id="lesson-top" class="lesson-hero-section">
      <div class="wrap stack">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../path.html">Units</a><span aria-hidden="true">/</span><a href="../${ACTIVE_META.slug}.html">${ACTIVE_META.name}</a><span aria-hidden="true">/</span><span aria-current="page">Assessment</span></nav>
        ${lessonViewSwitch()}
        <span class="eyebrow">${ACTIVE_META.name} · Assessment · ${lesson.topic}</span><h1>${lesson.title}</h1><p class="lede">${lesson.outcome}</p>
        ${meeting ? `<div class="lesson-meta"><span>${meeting.date}</span><span>${meeting.rot}</span><span>${meeting.time}</span></div>` : ""}
      </div>
    </section>
    <section><div class="wrap assessment-grid">
      <div id="assessment-scope" class="card"><h2>Scope</h2><ul class="plain">${scope}</ul></div>
      <div id="assessment-conditions" class="card"><h2>Conditions</h2><ul class="plain">${conditions}</ul></div>
    </div></section>
    <section id="assessment-logistics"><div class="wrap stack-lg assessment-note"><div class="note cut"><p><strong>No public test content appears here.</strong> Questions, responses, and keys remain in the classroom system.</p></div>
      <details class="workbook-reveal"><summary>After results are returned</summary><div class="stack"><p>Identify one response to revisit and name the misconception rather than copying secure question text.</p><label class="workbook-field">Private remediation note<textarea rows="5" data-workbook-field="assessmentReflection"></textarea></label></div></details>
      ${pager(lesson)}
    </div></section>`;
  }

  /* Stage order. `paper` is placed by its own `when` value: "before" puts the
     manipulative ahead of the model, which is the point of it. Numbering is
     computed so optional stages never leave a gap. */
  function lessonStages(lesson) {
    const before = lesson.paper && lesson.paper.when !== "after";
    const builders = [
      predictionSection,
      before ? paperSection : null,
      modelSection,
      projectSection,
      missionsSection,
      checksSection,
      before ? null : paperSection,
      transferSection,
      processingSection,
      homeSection,
      evidenceSection
    ].filter(Boolean);
    let n = 0;
    return builders.map(build => {
      const html = build(lesson, n + 1);
      if (html) n += 1;
      return html;
    }).join("\n");
  }

  function renderWorkbookLesson(mountId, meetingNumber) {
    const mount = document.getElementById(mountId);
    const lesson = ACTIVE_LESSONS.find(item => item.number === Number(meetingNumber));
    if (!mount || !lesson) return;
    const meeting = typeof MEETINGS !== "undefined" ? MEETINGS.find(item => item.n === lesson.number) : null;
    document.title = `${lesson.title} — AP Computer Science A`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = lesson.outcome;

    if (window.APCSAPresent && APCSAPresent.isRequested()) {
      APCSAPresent.render({ mount, lesson, meeting, meta: ACTIVE_META, announce });
      if (window.APCSARole) APCSARole.decorate();
      return;
    }

    if (lesson.lessonType === "assessment") {
      mount.innerHTML = renderAssessment(lesson, meeting);
      bindLessonState(mount, lesson);
      if (window.APCSARole) APCSARole.decorate();
      return;
    }

    mount.innerHTML = `<section id="lesson-top" class="lesson-hero-section workbook-hero">
      <div class="wrap stack">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../path.html">Units</a><span aria-hidden="true">/</span><a href="../${ACTIVE_META.slug}.html">${ACTIVE_META.name}</a><span aria-hidden="true">/</span><span aria-current="page">Lesson ${lesson.unitLesson}</span></nav>
        ${lessonViewSwitch()}
        <span class="eyebrow">${ACTIVE_META.name} · Lesson ${String(lesson.unitLesson).padStart(2, "0")} · ${lesson.topic} · ${lesson.lessonType.replace("-", " ")}</span>
        <h1>${lesson.title}</h1><p class="lede">${lesson.outcome}</p>
        ${meeting ? `<div class="lesson-meta"><span>${meeting.date}</span><span>${meeting.rot}</span><span>${meeting.time}</span></div>` : ""}
        ${atAGlance(lesson)}
      </div>
    </section>
    ${lessonStages(lesson)}`;

    bindLessonState(mount, lesson);
    if (window.APCSARole) APCSARole.decorate();
  }

  function bindLessonState(root, lesson) {
    const current = lessonState(lesson.id);
    root.querySelectorAll("[data-workbook-field]").forEach(field => {
      const name = field.dataset.workbookField;
      field.value = current.fields[name] || "";
      field.addEventListener("input", () => {
        current.fields[name] = field.value;
        touch(lesson.id);
        updateLessonStatus(root, lesson);
        refreshSubmitPanel(root, lesson);
      });
    });
    root.querySelectorAll("[data-workbook-check]").forEach(box => {
      const id = box.dataset.workbookCheck;
      box.checked = current.checked.includes(id);
      box.addEventListener("change", () => {
        if (box.checked && !current.checked.includes(id)) current.checked.push(id);
        if (!box.checked) current.checked = current.checked.filter(item => item !== id);
        touch(lesson.id);
        updateLessonStatus(root, lesson);
        refreshSubmitPanel(root, lesson);
      });
    });
    bindEditorSelects(root);
    const exportButton = root.querySelector("[data-export-lesson]");
    if (exportButton) exportButton.addEventListener("click", () => exportLesson(lesson));
    root.querySelectorAll("[data-backup]").forEach(button => button.addEventListener("click", exportBackup));
    root.querySelectorAll("[data-import]").forEach(input => input.addEventListener("change", event => importBackup(event.target.files[0])));
    const clearButton = root.querySelector("[data-clear-lesson]");
    if (clearButton) clearButton.addEventListener("click", () => {
      if (!confirm(`Clear locally saved work for ${lesson.title}? This cannot be undone unless you exported a backup.`)) return;
      delete state.lessons[lesson.id];
      saveState();
      location.reload();
    });
    bindSubmitPanel(root, lesson);
    updateLessonStatus(root, lesson);
  }

  function updateLessonStatus(root, lesson) {
    const status = lessonStatus(lesson);
    root.querySelectorAll("[data-lesson-status]").forEach(node => {
      node.textContent = statusLabel(status);
      node.className = `status-${status}`;
    });
    announce(`${lesson.title}: ${statusLabel(status)}.`);
  }

  function lessonMarkdown(lesson) {
    const current = state.lessons[lesson.id] || { checked: [], fields: {}, updatedAt: "" };
    const lines = [
      `# AP CSA Workbook Evidence`, "",
      `## ${ACTIVE_META.name}, Lesson ${lesson.unitLesson} — ${lesson.title}`, "",
      `- Status: ${statusLabel(lessonStatus(lesson))}`,
      `- Deliverable: ${lesson.deliverable}`,
      `- Updated: ${current.updatedAt || "Not saved"}`, "",
      "### Prediction", current.fields.prediction || "", ""
    ];
    if (lesson.paper) {
      const placement = lesson.paper.when === "after" ? "After the checks" : "Before the model";
      lines.push(
        `### Off screen — ${lesson.paper.title}`, "",
        `- Time: ${lesson.paper.time}`,
        `- Materials: ${lesson.paper.materials}`,
        `- Placement: ${placement}`
      );
      if (lesson.paper.printable) lines.push(`- Printable: [Download printable](${lesson.paper.printable})`);
      lines.push("", lesson.paper.prompt, "");
      if (lesson.paper.evidenceNote) lines.push(`> ${lesson.paper.evidenceNote}`, "");
      lines.push("#### Your off-screen evidence", current.fields.paper || "", "");
    }
    lines.push("### Check evidence");
    (lesson.checks || []).forEach(check => {
      const mark = current.checked.includes(`check:${check[0]}`) ? "x" : " ";
      lines.push(`- [${mark}] ${check[1]} — expected: ${check[2]}`);
      if (current.fields[`actual:${check[0]}`]) lines.push(`  - Actual: ${current.fields[`actual:${check[0]}`]}`);
    });
    lines.push("", "### Debugging record",
      `- I expected: ${current.fields.debugExpected || ""}`,
      `- I observed: ${current.fields.debugObserved || ""}`,
      `- Smallest change: ${current.fields.debugChange || ""}`,
      `- What I learned: ${current.fields.debugLearning || ""}`, "",
      "### AP transfer", current.fields.apTransfer || "", "",
      "### Reflection", current.fields.reflection || "", "");
    if (lesson.home) {
      const homeKinds = { practice: "Practice", video: "Watch", reading: "Read", build: "Build" };
      lines.push(
        `### Before next class — ${lesson.home.task}`, "",
        `- Type: ${homeKinds[lesson.home.type] || lesson.home.type}`,
        `- Estimated time: ${lesson.home.est}`,
        `- Bring back: ${lesson.home.evidence}`
      );
      if (lesson.home.link) lines.push(`- Resource: [Open the resource](${lesson.home.link})`);
      lines.push("", "#### Your before-next-class evidence", current.fields.home || "", "");
    }
    lines.push("### Classroom exit reflection",
      `- Stuck: ${current.fields.stuck || ""}`,
      `- Still unsure: ${current.fields.unsure || ""}`, "",
      `- Artifact or submission link: ${current.fields.artifactLink || ""}`,
      "", "> This export is a working evidence record. The LMS is the system of record for graded work.");
    return lines.join("\n");
  }

  function downloadText(filename, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportLesson(lesson) {
    downloadText(`${lesson.id}-${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.md`, lessonMarkdown(lesson), "text/markdown");
    announce("Lesson evidence exported as Markdown.");
  }

  function exportUnit() {
    const body = ACTIVE_LESSONS.filter(item => item.lessonType !== "assessment").map(lessonMarkdown).join("\n\n---\n\n");
    downloadText(`apcsa-${ACTIVE_META.slug}-workbook-evidence.md`, body, "text/markdown");
    announce(`${ACTIVE_META.name} evidence exported as Markdown.`);
  }

  function exportBackup() {
    downloadText("apcsa-workbook-backup.json", JSON.stringify(state, null, 2), "application/json");
    announce("Workbook backup exported as JSON.");
  }

  function importBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (!imported || ![1, 2].includes(imported.schemaVersion) || typeof imported.lessons !== "object") throw new Error("Unsupported workbook backup");
        if (imported.schemaVersion === 1) {
          imported.schemaVersion = 2;
        }
        imported.profile = imported.profile || { editor: "generic" };
        delete imported.profile.displayName;
        state = imported;
        saveState();
        announce("Workbook backup imported. Reloading the page.");
        location.reload();
      } catch (error) {
        announce("That file is not a valid workbook backup.");
      }
    };
    reader.readAsText(file);
  }

  function bindOverviewExport() {
    const exportButton = document.getElementById("export-workbook-unit");
    if (exportButton) exportButton.addEventListener("click", exportUnit);
    const backupButton = document.getElementById("backup-workbook");
    if (backupButton) backupButton.addEventListener("click", exportBackup);
    const importInput = document.getElementById("import-workbook");
    if (importInput) importInput.addEventListener("change", event => importBackup(event.target.files[0]));
  }

  window.renderWorkbookOverview = renderWorkbookOverview;
  window.renderWorkbookLesson = renderWorkbookLesson;
  window.renderUnit2Overview = renderWorkbookOverview;
  window.renderUnit2Lesson = renderWorkbookLesson;
  window.renderUnit3Overview = renderWorkbookOverview;
  window.renderUnit3Lesson = renderWorkbookLesson;
  window.renderUnit4Overview = renderWorkbookOverview;
  window.renderUnit4Lesson = renderWorkbookLesson;
})();
