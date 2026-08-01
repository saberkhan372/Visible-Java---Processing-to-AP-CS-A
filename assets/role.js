/* Session-scoped presentation role. This controls rendering only; it is not access control. */
(function () {
  "use strict";

  const ROLE_KEY = "apcsa-workbook-role";
  const listeners = new Set();

  function readRole() {
    try {
      return sessionStorage.getItem(ROLE_KEY) === "teacher" ? "teacher" : "student";
    } catch (error) {
      return "student";
    }
  }

  function writeRole(role) {
    try {
      if (role === "teacher") sessionStorage.setItem(ROLE_KEY, "teacher");
      else sessionStorage.removeItem(ROLE_KEY);
    } catch (error) {
      // Storage can be unavailable for local files or locked-down browsers.
    }
  }

  function stripTeacherParam() {
    const url = new URL(location.href);
    if (!url.searchParams.has("teacher")) return;
    url.searchParams.delete("teacher");
    try {
      history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    } catch (error) {
      // Some file:// origins restrict history updates; role clearing still succeeds.
    }
  }

  function currentRole() {
    return readRole();
  }

  function isTeacher() {
    return currentRole() === "teacher";
  }

  function teacherHref() {
    return /\/unit\d+\/lesson-\d+\.html$/.test(location.pathname) ? "../teacher.html" : "teacher.html";
  }

  function decorate() {
    document.querySelectorAll("[data-teacher-mode-badge], [data-teacher-tool-link]").forEach(node => node.remove());
    if (!isTeacher()) {
      document.querySelectorAll("[data-teacher-only]").forEach(node => node.remove());
      return;
    }

    const badge = document.createElement("aside");
    badge.className = "teacher-mode-badge";
    badge.dataset.teacherModeBadge = "";
    badge.setAttribute("aria-label", "Teacher mode controls");
    badge.innerHTML = '<strong>Teacher mode</strong><span aria-hidden="true">·</span><button type="button">Leave</button>';
    badge.querySelector("button").addEventListener("click", () => setRole("student"));
    document.body.appendChild(badge);

    const footer = document.querySelector("footer .wrap");
    if (footer && location.pathname.split("/").pop() !== "teacher.html") {
      const link = document.createElement("a");
      link.href = teacherHref();
      link.textContent = "Open teacher response tool";
      link.className = "teacher-tool-link";
      link.dataset.teacherToolLink = "";
      link.dataset.teacherOnly = "";
      footer.appendChild(link);
    }
  }

  function setRole(role) {
    writeRole(role === "teacher" ? "teacher" : "student");
    stripTeacherParam();
    decorate();
    listeners.forEach(listener => listener(currentRole()));
    window.dispatchEvent(new CustomEvent("apcsa-role-change", { detail: { role: currentRole() } }));
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  const params = new URLSearchParams(location.search);
  if (params.get("teacher") === "1") {
    writeRole("teacher");
    stripTeacherParam();
  }

  window.APCSARole = { currentRole, setRole, isTeacher, decorate, subscribe };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", decorate, { once: true });
  else decorate();
})();
