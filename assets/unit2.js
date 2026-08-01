/* Unit 2 uses the shared workbook model. Java projects live in
   coursework/unit-2 and are published as verified ZIP files. */

var UNIT2_META = {
  slug: "unit2",
  name: "Unit 2",
  title: "Selection and Iteration",
  dates: "8 Oct – 9 Nov",
  meetings: "11 meetings",
  topics: "2.1–2.12",
  weight: "25–35%",
  storageKey: "apcsa-workbook-v1"
};

var UNIT2_LESSONS = [
  {
    id: "u2l12", number: 12, unitLesson: 1, lessonType: "build",
    topic: "2.1–2.3", title: "Selection speed-run",
    outcome: "Trace an ordered decision and implement boundary-safe selection.",
    deliverable: "DecisionAudit.java with all six checks passing",
    duration: "75 min", ap: "Selection · Boolean expressions · if statements",
    source: "Remixed from Unit 2 Labs — Conditionals and the positive/negative/even/odd classification task.",
    download: "../downloads/unit2/u2l12-selection-speed-run.zip",
    project: {
      runTarget: "DecisionAudit", baseline: "The starter compiles and runs before you edit it.",
      output: "unfinished\nunfinished\nfalse",
      files: [
        ["DecisionAudit.java", "Edit and run", "Complete two required methods."],
        ["DecisionAuditCheck.java", "Read and run", "Six behavior checks; do not edit."],
        ["README.md", "Read", "Offline directions and completion criteria."]
      ]
    },
    prediction: {
      prompt: "For value 0, which branch must be tested first so that zero is not classified as even? Explain before running code.",
      reveal: "Test zero before the positive-even branch. Mathematically zero is even, but this specification gives it its own category."
    },
    model: {
      code: `if (value < 0) {
  return "negative";
} else if (value == 0) {
  return "zero";
} else if (value % 2 == 0) {
  return "even";
} else {
  return "odd";
}`,
      output: "One branch runs; branch order encodes the specification.",
      explanation: "An if/else-if chain stops at the first true condition. Put exceptional and boundary cases before broader categories."
    },
    missions: [
      ["Run the unchanged baseline", "Open the folder and run DecisionAudit before editing.", "Record the three baseline lines."],
      ["Complete classify", "Return negative, zero, even, or odd in the required order.", "Run the check class; four classification checks pass."],
      ["Complete inRange", "Include both endpoints and honor the stated precondition.", "The low-endpoint and above-high checks pass."],
      ["Add a boundary test", "In main, add one call at a boundary not already printed.", "Predict before running and compare the result."]
    ],
    checks: [
      ["baseline", "Baseline run", "unfinished / unfinished / false"],
      ["classification", "Four classifications", "negative, zero, even, and odd pass"],
      ["range", "Inclusive range", "endpoint accepted; value above high rejected"],
      ["student-test", "Original boundary test", "prediction matches observed result"]
    ],
    apTransfer: "Trace classify(0), classify(-8), and classify(13). Then write one sentence explaining why reordering the zero and even conditions changes the specified result.",
    reflection: "Which boundary case made the branch order visible?",
    processing: {
      title: "Color by category", time: "15 min",
      why: "A visual makes mutually exclusive branches immediately visible.",
      prompt: "Use classify to choose one of four colors for a moving value. Keep classify in ordinary Java-compatible form.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u2l13", number: 13, unitLesson: 2, lessonType: "build",
    topic: "2.4–2.5", title: "Nested and compound decisions",
    outcome: "Choose branch order and parentheses that preserve a written rule.",
    deliverable: "Admission.java with all seven checks passing",
    duration: "75 min", ap: "Nested if · Compound Boolean expressions",
    source: "Remixed from the Birthday, Goldilocks, and four-number conditional labs.",
    download: "../downloads/unit2/u2l13-compound-decisions.zip",
    project: {
      runTarget: "Admission", baseline: "The starter compiles; both methods return placeholders.",
      output: "unfinished\nfalse",
      files: [
        ["Admission.java", "Edit and run", "Ordered categories and one compound rule."],
        ["AdmissionCheck.java", "Read and run", "Boundary and grouping checks."],
        ["README.md", "Read", "Offline directions."]
      ]
    },
    prediction: {
      prompt: "A 14-year-old is with an adult but has no pass. Evaluate age >= 16 || (withAdult && hasPass) one operator at a time.",
      reveal: "false || (true && false) becomes false || false, so the result is false."
    },
    model: {
      code: `boolean mayEnter = age >= 16 || (withAdult && hasPass);`,
      output: "&& is evaluated before ||; parentheses make the intended grouping explicit.",
      explanation: "Translate the English rule into named pieces before compressing it. Parentheses communicate structure even when precedence would produce the same result."
    },
    missions: [
      ["Run and annotate", "Run the baseline; underline the two independent ways to enter.", "Explain the parentheses in plain language."],
      ["Order ticket groups", "Handle invalid ages, children, seniors, students, then regular admission.", "Boundary checks at 12 and 65 pass."],
      ["Implement mayEnter", "Translate the exact rule without adding unrelated conditions.", "All three entry checks pass."],
      ["Challenge the grouping", "Temporarily remove the parentheses and explain whether Java changes the value.", "Restore the clearest form before finishing."]
    ],
    checks: [
      ["baseline", "Baseline run", "unfinished / false"],
      ["order", "Ordered categories", "invalid, child, senior, and student pass"],
      ["compound", "Compound entry rule", "adult and minor cases pass"],
      ["explanation", "Grouping explanation", "names the two entry routes"]
    ],
    apTransfer: "Write a single Boolean expression for: a player qualifies if score is at least 80, or if score is at least 70 and attendance is at least 95. Then test score 75 with attendance 94 and 95.",
    reflection: "When is an else-if chain clearer than several independent if statements?"
  },
  {
    id: "u2l14", number: 14, unitLesson: 3, lessonType: "build",
    topic: "2.6", title: "Prove De Morgan's laws",
    outcome: "Use a truth table to prove two Boolean expressions equivalent.",
    deliverable: "BooleanLab.java plus a completed four-row truth table",
    duration: "75 min", ap: "Comparing Boolean expressions",
    source: "Remixed from Boolean Truth Tables HW and the propositional-logic activities.",
    present: { notes: {
      prediction: "Poll the room before revealing. Ask which operator must change when the whole condition is negated.",
      "mission:3": "This is the likely stall point. Ask students to name one truth-table row that would expose a bad repair."
    } },
    download: "../downloads/unit2/u2l14-demorgan-proof.zip",
    project: {
      runTarget: "BooleanLab", baseline: "The starter compiles and prints false / false.",
      output: "false\nfalse",
      files: [
        ["BooleanLab.java", "Edit and run", "Access rule and equivalence method."],
        ["BooleanLabCheck.java", "Read and run", "Exercises every truth-table row."],
        ["README.md", "Read", "Offline directions."]
      ]
    },
    prediction: {
      prompt: "Negate !(hasBadge && hasCode) without putting ! in front of parentheses. Which operator changes, and why?",
      reveal: "!hasBadge || !hasCode. Negating the whole conjunction means at least one requirement is missing."
    },
    model: {
      code: `!(a && b) == (!a || !b)
!(a || b) == (!a && !b)`,
      output: "A truth table must match on every possible input row.",
      explanation: "Move the negation inward, negate each condition, and switch && with || or || with &&."
    },
    missions: [
      ["Build the truth table", "List all four combinations of a and b before coding.", "Both expressions match on every row."],
      ["Implement access", "A badge or staff status is required, and lockdown overrides both.", "Four access checks pass."],
      ["Implement the proof", "Return whether the two De Morgan forms match for the supplied row.", "All four equivalence checks pass."],
      ["State the transformation", "Write the three moves used to push ! inward.", "Negate pieces, switch operator, remove outer !."]
    ],
    checks: [
      ["truth-table", "Four-row truth table", "equivalent on all rows"],
      ["access", "Access cases", "role grants access unless locked down"],
      ["demorgan", "Automated equivalence", "all four rows pass"],
      ["rule", "Transformation rule", "conditions negated and operator switched"]
    ],
    apTransfer: "Rewrite !(score >= 70 && submitted) without an outer negation. Then explain what the rewritten condition means in plain language.",
    reflection: "Which truth-table row would most quickly expose a failure to switch the operator?"
  },
  {
    id: "u2l15", number: 15, unitLesson: 4, lessonType: "build",
    topic: "2.6", title: "Negation repair shop",
    outcome: "Diagnose incorrect compound negations using counterexamples.",
    deliverable: "Eligibility.java with all eight checks passing",
    duration: "75 min", ap: "Equivalent Boolean expressions · Logic errors",
    source: "Remixed from Boolean quizzes, Venn-diagram practice, and CodingBat Logic-1 patterns.",
    download: "../downloads/unit2/u2l15-negation-repair.zip",
    project: {
      runTarget: "Eligibility", baseline: "The starter compiles; the weekend result is intentionally wrong.",
      output: "false\nfalse\ntrue",
      files: [
        ["Eligibility.java", "Edit and run", "Three negation repairs."],
        ["EligibilityCheck.java", "Read and run", "Eight boundary and truth-value checks."],
        ["README.md", "Read", "Offline directions."]
      ]
    },
    prediction: {
      prompt: "Why is day != 1 || day != 7 always true? Find the value of day that you think should make it false and evaluate both comparisons.",
      reveal: "For day 7, day != 1 is already true. For day 1, day != 7 is true. No day can equal both 1 and 7, so the OR never becomes false."
    },
    model: {
      code: `// not Sunday AND not Saturday
return day != 1 && day != 7;`,
      output: "A counterexample is often faster than a full proof when repairing code.",
      explanation: "Start with the input the method is supposed to reject. Trace the actual expression before changing an operator."
    },
    missions: [
      ["Reproduce the bug", "Run the unchanged starter and trace notWeekend(7).", "Record the wrong true result."],
      ["Repair the range", "Return true only below 0 or above 100.", "Four score checks pass."],
      ["Apply De Morgan", "Negate submitted && signed without an outer !.", "Both requirement checks pass."],
      ["Repair notWeekend", "Change the smallest possible piece and justify it.", "Saturday and Wednesday checks pass."]
    ],
    checks: [
      ["bug", "Bug reproduced", "notWeekend(7) incorrectly returns true"],
      ["range", "Range boundaries", "0 and 100 inside; -1 and 101 outside"],
      ["requirements", "Negated requirements", "both key rows pass"],
      ["weekend", "Weekend repair", "Saturday false; Wednesday true"]
    ],
    apTransfer: "A method should return true when x is not between 10 and 20 inclusive. Write two equivalent expressions and identify the four boundary test values you would use.",
    reflection: "What was the smallest counterexample that disproved the original weekend expression?"
  },
  {
    id: "u2l16", number: 16, unitLesson: 5, lessonType: "build",
    topic: "2.7–2.8", title: "Trace loops before writing them",
    outcome: "Trace loop state and distinguish iteration count from final values.",
    deliverable: "LoopTrace.java plus one complete trace table",
    duration: "75 min", ap: "while loops · for loops · Code analysis",
    source: "Remixed from Loop Programs 1 and the course's single-loop practice.",
    present: { notes: {
      prediction: "Have students trace the update after the last printed value; do not run the program yet.",
      checks: "Ask which check establishes termination rather than merely confirming the final sum."
    } },
    download: "../downloads/unit2/u2l16-loop-tracing.zip",
    project: {
      runTarget: "LoopTrace", baseline: "The starter compiles and prints two placeholder zeros.",
      output: "0\n0",
      files: [
        ["LoopTrace.java", "Edit and run", "One while loop and one for loop."],
        ["LoopTraceCheck.java", "Read and run", "Five termination and boundary checks."],
        ["README.md", "Read", "Offline directions."]
      ]
    },
    prediction: {
      prompt: "For values 1, 3, 5, 7 produced by a loop, what is the next loop-control value after the final body execution? Why does that value not print?",
      reveal: "The next value is 9. The update runs, then the condition fails before the body can print 9."
    },
    model: {
      code: `int sum = 0;
int value = 1;
while (value <= 5) {
  sum += value;
  value++;
}`,
      output: "Final state: sum = 15 and value = 6.",
      explanation: "A trace table needs a row for the failed condition. Otherwise students often confuse the last body value with the final variable value."
    },
    missions: [
      ["Trace first", "Trace sumTo(3) on paper, including the failed condition.", "Final row shows value 4 and sum 6."],
      ["Implement sumTo", "Use a while loop and honor n >= 0.", "Empty and five-value checks pass."],
      ["Implement countBy", "Use an inclusive for loop with a positive step.", "Three count checks pass."],
      ["Compare forms", "Identify initialization, test, body, and update in both loops.", "Explain which form makes the update easiest to see."]
    ],
    checks: [
      ["trace", "Trace table", "includes the failed-condition row"],
      ["sum", "while-loop sum", "0 and 5 cases pass"],
      ["count", "for-loop count", "endpoint and non-landing step pass"],
      ["parts", "Loop anatomy", "initialization, test, body, and update identified"]
    ],
    apTransfer: "Without running code, give the output and final value of i for: for (int i = 2; i <= 11; i += 3). Then state how many times the body executes.",
    reflection: "Which trace-table column prevented your most likely mistake?",
    processing: {
      title: "Frame count versus loop count", time: "15 min",
      why: "Processing's draw loop hides the same test/update cycle that Java makes explicit.",
      prompt: "Display a frame counter and stop the sketch after the same number of updates as countBy(2, 10, 2).",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u2l17", number: 17, unitLesson: 6, lessonType: "build",
    topic: "2.10", title: "Scan a String safely",
    outcome: "Traverse every valid one-character substring without crossing a boundary.",
    deliverable: "StringScan.java with all five checks passing",
    duration: "75 min", ap: "Implementing String algorithms",
    source: "Remixed from String Activity, String Four Corners, and the course's character-counting tasks.",
    download: "../downloads/unit2/u2l17-string-scan.zip",
    project: {
      runTarget: "StringScan", baseline: "The starter compiles and prints 0 / -1.",
      output: "0\n-1",
      files: [
        ["StringScan.java", "Edit and run", "Count and first-index methods."],
        ["StringScanCheck.java", "Read and run", "Five normal and edge cases."],
        ["README.md", "Read", "Offline directions."]
      ]
    },
    prediction: {
      prompt: "For a String of length 6, list every legal i for substring(i, i + 1). What value of i would fail?",
      reveal: "Legal starts are 0 through 5. Starting at 6 would request substring(6, 7), whose end is beyond the String."
    },
    model: {
      code: `for (int i = 0; i < text.length(); i++) {
  String current = text.substring(i, i + 1);
  // inspect current
}`,
      output: "For length n, the body runs n times and the last substring is (n - 1, n).",
      explanation: "The end index is excluded, so i + 1 may equal length even though i may not."
    },
    missions: [
      ["Mark the bounds", "Write the first and last substring calls for banana.", "First is (0,1); last is (5,6)."],
      ["Count matches", "Increment only when the one-character substring equals target.", "Repeated and empty cases pass."],
      ["Return the first index", "Return immediately on the first match; return -1 after the loop.", "First, middle, and missing cases pass."],
      ["Add a final-position test", "Test a target at text.length() - 1.", "Prediction matches the returned index."]
    ],
    checks: [
      ["bounds", "Substring bounds", "first and last calls are legal"],
      ["count", "Count matches", "banana and empty String pass"],
      ["first", "First index", "first, middle, and missing pass"],
      ["student-test", "Final-position test", "returns text.length() - 1"]
    ],
    apTransfer: "Write a method body that returns the number of uppercase A characters in a String. Use only methods on the Java Quick Reference and state the safe loop bound.",
    reflection: "Why may a substring end index equal length when a character index may not?"
  },
  {
    id: "u2l18", number: 18, unitLesson: 7, lessonType: "build",
    topic: "2.10", title: "Build a String algorithm",
    outcome: "Accumulate a new String and manage an index that sometimes advances twice.",
    deliverable: "StringAlgorithms.java with six provided checks and one original test",
    duration: "75 min", ap: "String algorithms · Loop invariants · Edge cases",
    source: "Remixed from remove-all-letter, second-occurrence, and String-2 practice.",
    present: { notes: {
      prediction: "Mark the character pairs physically. Watch for students who reuse the middle characters.",
      "mission:2": "Ask what the accumulator contains before discussing the next index value."
    } },
    download: "../downloads/unit2/u2l18-string-algorithms.zip",
    project: {
      runTarget: "StringAlgorithms", baseline: "The starter compiles and prints a blank line / 0.",
      output: "\n0",
      files: [
        ["StringAlgorithms.java", "Edit and run", "Removal and non-overlapping-pair methods."],
        ["StringAlgorithmsCheck.java", "Read and run", "Six edge-case checks."],
        ["README.md", "Read", "Clarifies the non-overlapping specification."]
      ]
    },
    prediction: {
      prompt: "How many non-overlapping aa pairs are in aaaa? Commit to an answer and mark which characters each pair uses.",
      reveal: "Two: positions 0–1 and 2–3. After a match, advance the index by two so a character is not reused."
    },
    model: {
      code: `String result = "";
for (int i = 0; i < text.length(); i++) {
  String current = text.substring(i, i + 1);
  if (!current.equals(target)) {
    result += current;
  }
}`,
      output: "The result contains exactly the characters processed so far that should be kept.",
      explanation: "State the invariant in words before coding. It tells you what result must mean after every iteration."
    },
    missions: [
      ["Define the invariant", "Complete: result contains every processed character except...", "The sentence matches the specification."],
      ["Remove a character", "Build and return a new String; do not mutate the original.", "Typical, missing, and empty checks pass."],
      ["Count non-overlapping pairs", "Use a while loop and advance by two after a match.", "Pair and short-String checks pass."],
      ["Write an original test", "Choose a case that distinguishes overlapping from non-overlapping counting.", "Predict, run, and record the result."]
    ],
    checks: [
      ["invariant", "Accumulator invariant", "explains exactly what result contains"],
      ["remove", "Removal behavior", "three cases pass"],
      ["pairs", "Non-overlapping pairs", "three cases pass"],
      ["student-test", "Distinguishing test", "prediction and result recorded"]
    ],
    apTransfer: "Write a method that returns a String containing only the digits from its parameter. Explain what the accumulator contains after i characters have been processed.",
    reflection: "When did your loop advance by two, and what bug would advancing by one create?"
  },
  {
    id: "u2l19", number: 19, unitLesson: 8, lessonType: "build",
    topic: "2.9, 2.11", title: "Nested iteration patterns",
    outcome: "Assign one responsibility to each loop and predict total executions.",
    deliverable: "PatternLab.java with its staircase and factor-pair checks passing",
    duration: "75 min", ap: "Selection/iteration algorithms · Nested iteration",
    source: "Remixed from Nested Loop Matchup and Loop Programs 3.",
    download: "../downloads/unit2/u2l19-nested-iteration.zip",
    project: {
      runTarget: "PatternLab", baseline: "The starter compiles and prints a blank line / 0.",
      output: "\n0",
      files: [
        ["PatternLab.java", "Edit and run", "A pattern builder and a pair counter."],
        ["PatternLabCheck.java", "Read and run", "Four output and counting checks."],
        ["README.md", "Read", "Offline directions."]
      ]
    },
    prediction: {
      prompt: "In a five-row staircase, what does the outer loop control? What do the two inner loops control? Answer without writing code.",
      reveal: "The outer loop chooses the row. One inner loop writes the leading dashes; the other writes the remaining stars."
    },
    model: {
      code: `for (int row = 0; row < size; row++) {
  for (int dash = 0; dash < row; dash++) {
    result += "-";
  }
  for (int star = row; star < size; star++) {
    result += "*";
  }
}`,
      output: "Each row contains row dashes and size - row stars.",
      explanation: "Name loops by purpose, not i/j/k, while designing. The variable names expose the output relationship."
    },
    missions: [
      ["Match loops to output", "Annotate which loop controls rows, dashes, and stars.", "Every printed character has one responsible loop."],
      ["Build the staircase", "Return exact newlines without adding one after the final row.", "Size 1 and size 3 checks pass."],
      ["Count factor pairs", "Use a <= b so symmetric pairs are not counted twice.", "Limit 2 and limit 5 checks pass."],
      ["Count executions", "For size 5, total the two inner-loop body counts.", "The two totals sum to 25 character writes."]
    ],
    checks: [
      ["roles", "Loop responsibilities", "row, dash, and star roles identified"],
      ["pattern", "Staircase output", "size 1 and 3 exact output pass"],
      ["pairs", "Factor-pair count", "both limits pass"],
      ["count", "Character writes", "15 stars + 10 dashes = 25"]
    ],
    apTransfer: "For nested loops with row from 1 through 4 and col from row through 4, list the number of inner executions per row and the total. Do not run code.",
    reflection: "Which loop variable changed the width of each row?",
    processing: {
      title: "Pixels reveal the nested loops", time: "20 min",
      why: "A row/column drawing makes loop responsibility visible.",
      prompt: "Draw a triangular field of marks using the same row and column bounds as the console staircase.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u2l20", number: 20, unitLesson: 9, lessonType: "build",
    topic: "2.12", title: "Count work, not milliseconds",
    outcome: "Determine informal runtime by counting loop-body executions.",
    deliverable: "RuntimeLab.java plus a three-row growth comparison",
    duration: "75 min", ap: "Informal run-time analysis",
    source: "Remixed from loop-tracing practice and the CED runtime-analysis topic.",
    download: "../downloads/unit2/u2l20-runtime-counting.zip",
    project: {
      runTarget: "RuntimeLab", baseline: "The starter compiles and prints 0 / 0 / 0.",
      output: "0\n0\n0",
      files: [
        ["RuntimeLab.java", "Edit and run", "Linear, triangular, and square counters."],
        ["RuntimeLabCheck.java", "Read and run", "Six exact execution counts."],
        ["README.md", "Read", "Offline directions."]
      ]
    },
    prediction: {
      prompt: "When n doubles from 5 to 10, predict how linearCount and squareCount change. Give counts, not elapsed time.",
      reveal: "Linear work doubles from 5 to 10. Square work quadruples from 25 to 100."
    },
    model: {
      code: `for (int row = 0; row < n; row++) {
  for (int col = 0; col < n; col++) {
    count++;
  }
}`,
      output: "The body runs n times for each of n rows: n × n executions.",
      explanation: "The AP task is informal counting and comparison. Hardware timing adds noise and answers a different question."
    },
    missions: [
      ["Predict n = 5", "Predict all three counts before editing.", "Predictions are 5, 15, and 25."],
      ["Implement each shape", "Write loops whose counters measure the intended work.", "All six checks pass."],
      ["Compare n = 5 and n = 10", "Record how each count changes.", "Linear doubles; square quadruples."],
      ["Name the scale", "Label the three methods linear, triangular/quadratic-scale, or quadratic.", "Labels are justified by counts."]
    ],
    checks: [
      ["prediction", "n = 5 predictions", "5 / 15 / 25"],
      ["program", "Check program", "all six counts pass"],
      ["doubling", "Doubling comparison", "linear ×2; square ×4"],
      ["classification", "Growth labels", "based on execution counts"]
    ],
    apTransfer: "A loop runs n times. Inside it, another loop always runs 8 times. If n doubles, by what factor does the total body count change? Explain without using formal Big-O notation.",
    reflection: "Why is execution counting more useful here than timing the method?"
  },
  {
    id: "u2l21", number: 21, unitLesson: 10, lessonType: "extended-lab",
    topic: "Magpie 2.0", title: "Chatbot lab and timed MCQ",
    outcome: "Test branch order in a chatbot and document one evidence-based repair.",
    deliverable: "Teacher-specified Magpie files plus the workbook evidence record in the LMS",
    duration: "75 min", ap: "Selection · indexOf · Testing · Timed MCQ",
    source: "Magpie 2.0 is distributed through AP Classroom; this public page supplies only original companion prompts.",
    present: { notes: {
      project: "Pause here while students obtain the authorized files from the LMS. Do not project secure source.",
      "mission:3": "Invite one non-secure failing input and ask which earlier branch captured it."
    } },
    download: "../downloads/unit2/u2l21-magpie-evidence.md",
    project: {
      runTarget: "Teacher-specified Magpie runner", baseline: "Obtain the lab files through AP Classroom or the LMS, then run them unchanged.",
      output: "Record the actual baseline response to three teacher-provided inputs.",
      files: [
        ["Magpie source files", "LMS only", "Use the names supplied by your teacher."],
        ["u2l21-magpie-evidence.md", "Download and complete", "Original evidence template; contains no secure content."],
        ["Submission", "LMS", "Source files and evidence are stored outside this public site."]
      ]
    },
    prediction: {
      prompt: "If a general keyword branch appears before a more specific phrase branch, which response wins when both conditions are true?",
      reveal: "The first true branch wins. Put a specific case before the general case when the specification requires it."
    },
    model: {
      code: `if (statement.indexOf("no") >= 0) {
  // specific response
} else if (statement.indexOf("know") >= 0) {
  // different response
}`,
      output: "Substring tests can overlap; choose test data that exposes the overlap.",
      explanation: "Treat this as a testing problem: expected response, observed response, smallest repair, rerun."
    },
    missions: [
      ["Acquire and run", "Open the authorized lab files from the LMS and run the unchanged baseline.", "Record three input/response pairs."],
      ["Map the branches", "Find one input for each major response route assigned by your teacher.", "The evidence table names the expected branch."],
      ["Expose and repair", "Choose one ordering or search problem and make the smallest justified change.", "The original case and one regression case both pass."],
      ["Timed MCQ", "Complete the first timed set under the teacher's conditions.", "Record the error pattern, not secure question text."]
    ],
    checks: [
      ["baseline", "Authorized baseline", "three input/response pairs recorded"],
      ["coverage", "Branch coverage", "one input per major assigned branch"],
      ["repair", "Repair and regression", "problem case and old behavior both checked"],
      ["lms", "LMS submission", "required artifact submitted outside this site"]
    ],
    apTransfer: "Without copying a secure question, describe one MCQ error as a reusable pattern: condition grouping, branch order, String search, loop trace, or runtime count. State the check you will use next time.",
    reflection: "Which test input told you the most about branch order?"
  },
  {
    id: "u2l22", number: 22, unitLesson: 11, lessonType: "assessment",
    topic: "Assessment", title: "Unit 2 test",
    outcome: "Demonstrate Unit 2 reasoning under AP-style conditions without executing code.",
    deliverable: "Unit 2 assessment submitted through the classroom system",
    duration: "75 min", ap: "Topics 2.1–2.12",
    source: "Local assessment blueprint; secure questions and keys are not published on this site.",
    assessment: {
      scope: ["Boolean expressions and De Morgan's laws", "if/else and branch order", "while and for loop traces", "String algorithms", "Nested iteration", "Informal runtime analysis"],
      conditions: ["Java Quick Reference available", "No compiler or autocomplete", "Show trace work", "Submit through the classroom system"]
    }
  }
];
