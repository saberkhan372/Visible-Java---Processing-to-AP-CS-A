/* Shared presenter stage directions. Lesson-authored notes override these defaults.
   Guidance is public curriculum content, never a place for secure material or student data. */

(function () {
  "use strict";

  const DEFAULTS = {
    build: {
      prediction: "Give silent think time and require a committed prediction before revealing the explanation. Ask for reasoning, not a vote.",
      model: "Trace the model one line at a time. Pause before the output and ask which value, reference, or condition changes next.",
      "mission:1": "Protect the unchanged baseline run. Students should record what happened before they edit anything.",
      checks: "Use the first unmet check as debugging evidence. Ask what the result rules out before offering a hint.",
      transfer: "Time-box a short handwritten response, then compare it with the Java Quick Reference rather than the project solution."
    },
    review: {
      prediction: "Keep notes and earlier code closed for the first retrieval attempt. The useful evidence is what students can produce cold.",
      model: "Reveal the model only after students compare approaches. Name the invariant or contract that makes the pattern reusable.",
      "mission:1": "Preserve retrieval conditions: blank page first, resources second, correction in a different color or layer.",
      checks: "Group misses by misconception or pattern, not by student. Choose one class-wide repair and one individual target.",
      transfer: "Ask students to state the reusable pattern before they apply it to the new prompt."
    },
    "extended-lab": {
      prediction: "Have partners agree on the data, boundary, or object contract before opening the editor. Record one testable expectation.",
      project: "Confirm the baseline artifact and a recoverable copy before substantial edits. Identify the file or method each partner owns.",
      "mission:1": "Check the first milestone early. A working small case is better evidence than a nearly finished large case.",
      checks: "Require a saved artifact plus a boundary-case explanation. Passing output alone is not enough evidence for a multi-day lab.",
      evidence: "End with the next concrete action, the current blocker, and one question to carry into the next lab meeting."
    }
  };

  function authoredNotes(lesson) {
    return lesson && lesson.present && lesson.present.notes ? lesson.present.notes : {};
  }

  function forLesson(lesson) {
    if (!lesson || lesson.lessonType === "assessment") return {};
    const type = lesson.lessonType || "build";
    return Object.assign({}, DEFAULTS[type] || DEFAULTS.build, authoredNotes(lesson));
  }

  function source(lesson) {
    const count = Object.keys(authoredNotes(lesson)).length;
    if (!count) return "shared";
    return "custom + shared";
  }

  window.APCSAPresenterGuidance = { forLesson, source, authoredNotes };
})();
