/* Paste-in, forget-on-reload response aggregator. No student response is persisted. */
(function () {
  "use strict";

  const KNOWN_KEYS = new Set(["missions", "checks", "open-checks", "editor", "prediction", "stuck", "debug", "transfer", "unsure"]);
  const CHECK_LABELS = new Map();
  [...(window.UNIT1_LESSONS || []), ...(window.UNIT2_LESSONS || []),
    ...(window.UNIT3_LESSONS || []), ...(window.UNIT4_LESSONS || [])].forEach(lesson => {
    (lesson.checks || []).forEach(check => CHECK_LABELS.set(`${lesson.id.toUpperCase()}:${check[0]}`, check[1]));
  });

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text != null) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function normalizeName(value) {
    return String(value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
  }

  function ratio(value) {
    const match = /^(\d+)\/(\d+)$/.exec(String(value || ""));
    return match ? { done: Number(match[1]), total: Number(match[2]) } : { done: 0, total: 0 };
  }

  function parseSlips(raw) {
    const lines = String(raw || "").replace(/\r/g, "").split("\n");
    const records = [];
    const malformed = [];
    let index = 0;
    while (index < lines.length) {
      if (!lines[index].startsWith("=== APCSA ")) { index++; continue; }
      const firstLine = lines[index];
      const header = /^=== APCSA (\S+) \| (.*)$/.exec(firstLine);
      const fields = {};
      let closed = false;
      index++;
      while (index < lines.length && !lines[index].startsWith("=== APCSA ")) {
        if (/^===\s*$/.test(lines[index])) { closed = true; index++; break; }
        const body = /^([\w-]+):\s*(.*)$/.exec(lines[index]);
        if (body) fields[body[1]] = body[2];
        else if (lines[index].trim()) fields[`unknownLine${index}`] = lines[index].trim();
        index++;
      }
      if (!header || !closed) {
        malformed.push(firstLine);
        continue;
      }
      records.push({ lessonId: header[1].toUpperCase(), name: header[2].trim(), fields });
    }
    return { records, malformed };
  }

  function median(values) {
    if (!values.length) return 0;
    const sorted = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      const field = document.createElement("textarea");
      field.value = value;
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

  function announce(message) {
    const live = document.getElementById("workbook-live");
    if (live) live.textContent = message;
  }

  function sortableTable(records) {
    const wrapper = node("div", null, "teacher-table-wrap");
    const table = node("table", null, "teacher-roster-table");
    const thead = node("thead");
    const headRow = node("tr");
    const columns = [
      ["name", "Student"], ["missions", "Missions"], ["checks", "Checks"],
      ["prediction", "Prediction"], ["unsure", "Still unsure"]
    ];
    let sortKey = "name";
    let ascending = true;
    const tbody = node("tbody");

    function value(record, key) {
      return key === "name" ? record.name : String(record.fields[key] || "—");
    }

    function drawRows() {
      tbody.replaceChildren();
      records.slice().sort((a, b) => {
        const left = value(a, sortKey);
        const right = value(b, sortKey);
        return left.localeCompare(right, undefined, { numeric: true }) * (ascending ? 1 : -1);
      }).forEach(record => {
        const row = node("tr");
        columns.forEach(([key]) => row.appendChild(node("td", value(record, key))));
        tbody.appendChild(row);
      });
    }

    columns.forEach(([key, label]) => {
      const th = node("th");
      const button = node("button", label);
      button.type = "button";
      button.addEventListener("click", () => {
        ascending = sortKey === key ? !ascending : true;
        sortKey = key;
        drawRows();
      });
      th.appendChild(button);
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.append(thead, tbody);
    wrapper.appendChild(table);
    drawRows();
    return wrapper;
  }

  function rankedOpenChecks(lessonId, records) {
    const counts = new Map();
    records.forEach(record => {
      const value = record.fields["open-checks"];
      if (!value) return;
      value.split(/\s+/).filter(Boolean).forEach(id => counts.set(id, (counts.get(id) || 0) + 1));
    });
    return [...counts.entries()].map(([id, count]) => ({ id, count, label: CHECK_LABELS.get(`${lessonId}:${id}`) || id }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }

  function rosterNames() {
    return document.getElementById("teacher-roster-input").value.split(/\r?\n/).map(item => item.trim()).filter(Boolean);
  }

  function renderLessonGroup(lessonId, records) {
    const section = node("section", null, "teacher-lesson-group stack-lg");
    section.appendChild(node("h2", `${lessonId} · ${records.length} slip${records.length === 1 ? "" : "s"}`));

    const nameCounts = new Map();
    records.forEach(record => {
      const key = normalizeName(record.name);
      nameCounts.set(key, (nameCounts.get(key) || 0) + 1);
    });
    const duplicates = [...nameCounts.entries()].filter(([, count]) => count > 1).map(([name, count]) => `${name} (${count})`);
    if (duplicates.length) section.appendChild(node("p", `Duplicate name or resubmission: ${duplicates.join(", ")}. Confirm which response to use.`, "teacher-warning"));

    section.appendChild(sortableTable(records));

    const digestGrid = node("div", null, "teacher-digest-grid");
    const openCard = node("article", null, "card stack");
    openCard.appendChild(node("h3", "Most-open checks"));
    openCard.appendChild(node("p", "Open means unconfirmed, not necessarily failed."));
    const openList = node("ol");
    const ranked = rankedOpenChecks(lessonId, records);
    if (!ranked.length) openList.appendChild(node("li", "No open checks reported."));
    ranked.forEach(item => openList.appendChild(node("li", `${item.label} [${item.id}] · ${item.count}`)));
    openCard.appendChild(openList);

    const unsureCard = node("article", null, "card stack");
    unsureCard.appendChild(node("h3", "Unsure digest"));
    const unsureList = node("ul");
    records.map(record => ({ name: record.name, text: record.fields.unsure || "—" }))
      .sort((a, b) => b.text.length - a.text.length)
      .forEach(item => unsureList.appendChild(node("li", `${item.name}: ${item.text}`)));
    unsureCard.appendChild(unsureList);
    digestGrid.append(openCard, unsureCard);
    section.appendChild(digestGrid);

    const debugDetails = node("details", null, "teacher-debug-digest");
    debugDetails.appendChild(node("summary", "Debug digest"));
    const debugList = node("ul");
    records.forEach(record => debugList.appendChild(node("li", `${record.name}: ${record.fields.debug || "—"}`)));
    debugDetails.appendChild(debugList);
    section.appendChild(debugDetails);

    const unknown = [];
    records.forEach(record => Object.entries(record.fields).forEach(([key, value]) => {
      if (!KNOWN_KEYS.has(key)) unknown.push(`${record.name} · ${key}: ${value}`);
    }));
    if (unknown.length) {
      const details = node("details", null, "teacher-unknown-fields");
      details.appendChild(node("summary", `Unknown fields (${unknown.length})`));
      const list = node("ul");
      unknown.forEach(item => list.appendChild(node("li", item)));
      details.appendChild(list);
      section.appendChild(details);
    }

    const submitted = new Set(records.map(record => normalizeName(record.name)));
    const missing = rosterNames().filter(name => !submitted.has(normalizeName(name)));
    const checkRatios = records.map(record => ratio(record.fields.checks));
    const totals = checkRatios.map(item => item.total).filter(Boolean);
    const commonTotal = totals.length ? totals[0] : 0;
    const med = median(checkRatios.map(item => item.done));
    const topOpen = ranked[0] ? `${ranked[0].label} (${ranked[0].count})` : "none";
    const teacherNote = document.getElementById("teacher-summary-note").value.trim();
    const summary = [
      `${lessonId} · ${records.length}${rosterNames().length ? ` of ${rosterNames().length}` : ""} submitted`,
      `checks: median ${Number.isInteger(med) ? med : med.toFixed(1)}/${commonTotal || "?"} · most open: ${topOpen}`,
      `missing: ${missing.length ? missing.join(", ") : "none"}`,
      `teacher note: ${teacherNote || "—"}`
    ].join("\n");
    const summaryCard = node("div", null, "teacher-copy-summary stack");
    summaryCard.appendChild(node("h3", "Copy summary"));
    const pre = node("pre", summary);
    summaryCard.appendChild(pre);
    const copyButton = node("button", "Copy summary");
    copyButton.type = "button";
    copyButton.addEventListener("click", async () => {
      if (await copyText(summary)) announce(`${lessonId} summary copied.`);
      else announce("Copy was blocked. Select the summary text manually.");
    });
    summaryCard.appendChild(copyButton);
    section.appendChild(summaryCard);
    return section;
  }

  function analyze() {
    const result = parseSlips(document.getElementById("teacher-slip-input").value);
    const output = document.getElementById("teacher-results");
    output.replaceChildren();
    if (!result.records.length) {
      output.appendChild(node("p", "No complete APCSA slips were found.", "note cut"));
    } else {
      const groups = new Map();
      result.records.forEach(record => {
        if (!groups.has(record.lessonId)) groups.set(record.lessonId, []);
        groups.get(record.lessonId).push(record);
      });
      [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).forEach(([lessonId, records]) => output.appendChild(renderLessonGroup(lessonId, records)));
    }
    if (result.malformed.length) {
      const malformed = node("section", null, "teacher-malformed stack");
      malformed.appendChild(node("h2", "Could not parse"));
      const list = node("ul");
      result.malformed.forEach(line => list.appendChild(node("li", line)));
      malformed.appendChild(list);
      output.appendChild(malformed);
    }
    announce(`Parsed ${result.records.length} slip${result.records.length === 1 ? "" : "s"}; ${result.malformed.length} malformed.`);
  }

  function clearPage() {
    document.querySelectorAll("textarea").forEach(field => { field.value = ""; });
    document.getElementById("teacher-results").replaceChildren();
  }

  window.addEventListener("pageshow", clearPage);
  document.getElementById("analyze-slips").addEventListener("click", analyze);
  document.getElementById("clear-teacher-tool").addEventListener("click", clearPage);
  if (window.APCSARole) {
    APCSARole.setRole("teacher");
    APCSARole.decorate();
  }
})();
