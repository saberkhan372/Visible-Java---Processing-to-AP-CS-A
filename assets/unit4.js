/* Unit 4 workbook data. The five arcs follow the calendar: data and arrays,
   files, ArrayList, 2D structures, then searching/sorting/recursion. */

var UNIT4_META = {
  slug: "unit4",
  name: "Unit 4",
  title: "Data Collections",
  dates: "12 Jan – 22 Apr",
  meetings: "30 meetings",
  topics: "4.1–4.17",
  weight: "30–40%",
  storageKey: "apcsa-workbook-v1"
};

function unit4Build(spec) {
  return {
    id: `u4l${spec.number}`, number: spec.number, unitLesson: spec.number - 35,
    lessonType: spec.lessonType || "build", arc: spec.arc,
    topic: spec.topic, title: spec.title, outcome: spec.outcome,
    deliverable: spec.deliverable, duration: "75 min", ap: spec.ap, source: spec.source,
    download: spec.slug ? `../downloads/unit4/u4l${spec.number}-${spec.slug}.zip` : undefined,
    downloadLabel: spec.downloadLabel,
    project: {
      heading: spec.projectHeading,
      runTarget: spec.runTarget || "", baseline: spec.baseline, output: spec.output,
      files: spec.files || [
        [`${spec.runTarget}.java`, "Edit and run", spec.fileRole],
        [`${spec.runTarget}Check.java`, "Read and run", "Executable behavior checks; do not edit."],
        ["README.md", "Read", "Offline directions and evidence criteria."]
      ]
    },
    prediction: { prompt: spec.predict, reveal: spec.reveal },
    model: { code: spec.modelCode, output: spec.modelOutput, explanation: spec.modelExplanation },
    missions: spec.missions, checks: spec.checks, apTransfer: spec.apTransfer,
    reflection: spec.reflection, processing: spec.processing
  };
}

var UNIT4_LESSONS = [
  unit4Build({
    number: 36, arc: "4A · Data and arrays", topic: "4.1", title: "Audit a data decision",
    outcome: "Identify a data-use risk and encode a transparent consent rule.",
    deliverable: "DataConsent.java with six policy checks and one written tradeoff",
    ap: "Ethical and social implications of computing", slug: "data-consent", runTarget: "DataConsent",
    source: "Original companion built from the unit's ethics/AI goal; no student records or live data are included.",
    baseline: "The starter compiles but grants no use of collected data.", output: "false\nfalse",
    fileRole: "Implement purpose, consent, and sensitive-data decisions.",
    predict: "A fitness app collected location to draw a route. Can it automatically reuse that data to train an advertising model because the user agreed to location collection?",
    reveal: "Collection consent for one stated purpose is not blanket consent for a different use. Purpose, notice, sensitivity, and the ability to decline all matter.",
    modelCode: `return consented
    && statedPurpose.equals(requestedPurpose)
    && !containsSensitiveData;`,
    modelOutput: "The code exposes a policy; the written analysis still has to name who benefits, who is exposed, and what is missing.",
    modelExplanation: "Technical correctness does not settle an ethical question. Make assumptions visible and test whose interests the rule protects.",
    missions: [["Read the scenario", "Name the collector, subject, stated purpose, and requested use.", "All four roles are explicit."], ["Implement same-purpose use", "Require consent and matching purpose.", "Purpose checks pass."], ["Handle sensitivity", "Reject sensitive reuse in this simplified policy.", "Sensitive-data checks pass."], ["Write the tradeoff", "Name one benefit, one harm, and missing evidence.", "The analysis is not only an opinion."]],
    checks: [["purpose", "Purpose limitation", "mismatched purpose rejected"], ["consent", "Consent", "no consent rejected"], ["sensitive", "Sensitive data", "simplified policy rejects"], ["analysis", "Stakeholder analysis", "benefit, harm, missing evidence"]],
    apTransfer: "A school predicts course success from attendance and device-use data. Name one stakeholder, one possible benefit, one possible harm, and one additional fact needed before deployment.",
    reflection: "Which assumption in the coded policy is most contestable?"
  }),
  unit4Build({
    number: 37, arc: "4A · Data and arrays", topic: "4.2", title: "Match data to a question",
    outcome: "Decide whether a data set contains the variables and coverage needed for a claim.",
    deliverable: "DatasetFit.java with seven fit checks passing",
    ap: "Data sets · Valid conclusions", slug: "dataset-fit", runTarget: "DatasetFit",
    source: "Original companion aligned to the current data-set topic and local weather/gradebook lab contexts.",
    baseline: "The starter labels every data set insufficient.", output: "insufficient\ninsufficient",
    fileRole: "Evaluate variable presence, sample coverage, and claim scope.",
    predict: "Can one week of noon temperatures answer whether mornings became warmer over ten years? Name each mismatch.",
    reveal: "No: time of day, duration, and historical coverage all mismatch the question.",
    modelCode: `boolean usable = hasNeededVariable
    && coversPopulation
    && coversTimePeriod;`,
    modelOutput: "A large row count cannot repair a missing variable or a biased sampling frame.",
    modelExplanation: "Start from the question, then inventory the data. Do not start from what is available and overclaim.",
    missions: [["Name the claim", "Underline population, variable, and time span.", "Three requirements are visible."], ["Implement fit", "Require all three coverage conditions.", "Truth-table checks pass."], ["Classify a mismatch", "Return variable, population, time, or usable.", "Scenario checks pass."], ["Limit a conclusion", "Rewrite one overclaim to match the data.", "Claim scope shrinks to evidence."]],
    checks: [["fit", "Three-part fit", "all requirements enforced"], ["variable", "Missing variable", "classified correctly"], ["coverage", "Coverage mismatch", "population/time distinguished"], ["claim", "Bounded conclusion", "does not exceed data"]],
    apTransfer: "List the minimum variables and sampling frame needed to study whether travel time affects first-period attendance at your school.",
    reflection: "What kind of missing data is easiest to overlook when a data set is large?"
  }),
  unit4Build({
    number: 38, arc: "4A · Data and arrays", topic: "4.3", title: "Create and index arrays safely",
    outcome: "Create arrays, use valid indexes, and distinguish array length from String length and ArrayList size.",
    deliverable: "ArrayAccess.java with eight boundary checks passing",
    ap: "Array creation and access", slug: "array-access", runTarget: "ArrayAccess",
    source: "Remixed from the local Student Average and array-practice labs.",
    baseline: "The starter compiles; first and last return placeholder values.", output: "0\n0",
    fileRole: "Implement safe first, last, and replacement operations.",
    predict: "For int[] values = new int[5], what is the last valid index, and what exception occurs at values[5]?",
    reveal: "The last index is 4. values[5] compiles but throws ArrayIndexOutOfBoundsException when executed.",
    modelCode: `int last = values[values.length - 1];`,
    modelOutput: "length is a count; the last valid index is one smaller.",
    modelExplanation: "Arrays use the public field .length. Strings use .length(); ArrayList uses .size().",
    missions: [["Mark the boundary", "List every valid index for length five.", "0 through 4."], ["Implement first and last", "Return endpoints without constants.", "Empty-array contract and normal checks pass."], ["Replace one element", "Use an index only after validating it.", "Valid changes; invalid request ignored."], ["Build the syntax table", "Compare array, String, and ArrayList counts.", "All three forms exact."]],
    checks: [["first", "First element", "normal array"], ["last", "Last element", "length - 1"], ["replace", "Guarded replacement", "valid and invalid index"], ["syntax", "Count syntax", ".length / .length() / .size()"]],
    apTransfer: "Write code that creates a 12-element double array, stores 3.5 in its final element, and returns that final value.",
    reflection: "Which boundary expression should become automatic before the exam?",
    processing: { title: "Pixels to indexes", time: "15 min", why: "A row of visual cells makes index versus position visible.", prompt: "Draw six cells and label each index; highlight the cell selected by mouseX / cellWidth.", status: "Optional visual extension." }
  }),
  unit4Build({
    number: 39, arc: "4A · Data and arrays", topic: "4.4", title: "Traverse exactly once",
    outcome: "Write complete traversals that visit every element without crossing the boundary.",
    deliverable: "ArrayTraversal.java with seven traversal checks passing",
    ap: "Array traversal · Accumulators", slug: "array-traversal", runTarget: "ArrayTraversal",
    source: "Remixed from Student Average Lab and the cohort's earlier Processing array loops.",
    baseline: "The starter compiles but sum and countPositive return zero.", output: "0\n0",
    fileRole: "Implement indexed traversals with accumulators.",
    predict: "What value does i have after a loop for (int i = 0; i < values.length; i++) finishes, and why is it never used as an index in the body?",
    reveal: "It reaches values.length. The condition fails before the body executes with that out-of-range value.",
    modelCode: `int total = 0;
for (int i = 0; i < values.length; i++) {
  total += values[i];
}`,
    modelOutput: "Each valid index is used once; the accumulator persists across iterations.",
    modelExplanation: "Separate the loop-control variable from the accumulated result when tracing.",
    missions: [["Trace first", "Make a row for each index and running total.", "Failed condition included."], ["Implement sum", "Visit all elements exactly once.", "Empty, one, and many pass."], ["Count positives", "Do not count zero.", "Mixed and boundary cases pass."], ["Audit mutation", "Explain whether either method changes the array.", "Both are read-only."]],
    checks: [["sum", "Sum traversal", "empty and many"], ["count", "Positive count", "zero excluded"], ["bounds", "Traversal bounds", "no skipped or extra index"], ["mutation", "Side-effect audit", "input unchanged"]],
    apTransfer: "Write a method that returns how many adjacent pairs in an int array are equal. State the correct loop bound.",
    reflection: "Which trace column exposed the difference between index and accumulated value?"
  }),
  unit4Build({
    number: 40, arc: "4A · Data and arrays", topic: "4.4", title: "Know the enhanced-for limit",
    outcome: "Choose indexed or enhanced-for traversal based on whether position or replacement is required.",
    deliverable: "ForEachLimits.java with eight traversal checks passing",
    ap: "Enhanced for loop · Array mutation", slug: "foreach-limits", runTarget: "ForEachLimits",
    source: "Remixed from local array exercises and the NumberJumble mutation patterns.",
    baseline: "The starter sum works, but doubleValues does not change the array.", output: "6\n[1, 2, 3]",
    fileRole: "Contrast reading element values with replacing array slots.",
    predict: "Why does for (int value : values) { value *= 2; } leave an int array unchanged?",
    reveal: "value is a local copy of each primitive element. Reassigning the copy does not write into the array slot.",
    modelCode: `for (int i = 0; i < values.length; i++) {
  values[i] *= 2;
}`,
    modelOutput: "An index identifies the slot that must be replaced.",
    modelExplanation: "Enhanced for is ideal when you only need each element value. Use an index when position, neighbors, or replacement matter.",
    missions: [["Reproduce the non-change", "Run and record the unchanged array.", "Values remain 1, 2, 3."], ["Use enhanced for to read", "Implement sum.", "Read-only checks pass."], ["Use indexes to replace", "Repair doubleValues.", "All slots double."], ["Choose a loop", "Classify four tasks by required traversal.", "Reason names index/neighbor/replacement."]],
    checks: [["read", "Enhanced-for read", "sum correct"], ["replace", "Indexed replacement", "array changes"], ["empty", "Empty input", "both methods safe"], ["choice", "Traversal choice", "position need identified"]],
    apTransfer: "Can an enhanced for loop replace every String in an array with its uppercase version? Explain, then write the indexed header you would use.",
    reflection: "What information disappears when a traversal gives you only each element?"
  }),
  unit4Build({
    number: 41, arc: "4A · Data and arrays", topic: "4.5", title: "Build the array algorithm toolkit",
    outcome: "Implement sum, count, minimum, maximum, and sequential-match patterns.",
    deliverable: "ArrayAlgorithms.java with ten algorithm checks passing",
    ap: "Array algorithms · Accumulators", slug: "array-algorithms", runTarget: "ArrayAlgorithms",
    source: "Remixed from Student Average Lab, Array practice, and Searching Lab.",
    baseline: "The starter compiles with placeholder minimum and match counts.", output: "0\n0",
    fileRole: "Implement minimum and count-match patterns.",
    predict: "Why is int min = 0 incorrect for an array containing only positive values? What initialization uses actual data?",
    reveal: "Zero may not be in the array and would remain a false minimum. Initialize from values[0] when the precondition guarantees a nonempty array.",
    modelCode: `int min = values[0];
for (int value : values) {
  if (value < min) min = value;
}`,
    modelOutput: "The accumulator begins with a valid candidate from the data.",
    modelExplanation: "Each standard algorithm differs mainly in its accumulator and update rule. Preconditions determine safe initialization.",
    missions: [["State preconditions", "Mark which methods require nonempty input.", "Minimum does; count does not."], ["Implement minimum", "Initialize from data.", "Positive and negative arrays pass."], ["Count a target", "Visit every value.", "Absent and repeated targets pass."], ["Name the pattern", "Identify accumulator and update for five algorithms.", "Each contract maps to a pattern."]],
    checks: [["min", "Minimum", "positive and negative"], ["count", "Target count", "absent and repeated"], ["single", "Single element", "safe initialization"], ["patterns", "Algorithm map", "accumulator/update named"]],
    apTransfer: "Write a method that returns the largest even value in a nonempty array that is guaranteed to contain an even value.",
    reflection: "Which algorithm needs the strongest precondition, and why?"
  }),
  unit4Build({
    number: 42, arc: "4A · Data and arrays", topic: "4.5", title: "Shift without overwriting",
    outcome: "Choose traversal direction that preserves source values during rearrangement.",
    deliverable: "ArrayShift.java with eight shift and insert checks passing",
    ap: "Array rearrangement · FRQ transfer", slug: "array-shift", runTarget: "ArrayShift",
    source: "Remixed from NumberJumble rotation tasks and AP-style array algorithm practice.",
    baseline: "The starter compiles, but shiftRight overwrites values as it moves left to right.", output: "[1, 1, 1, 1]",
    fileRole: "Repair shift direction and insert at the front.",
    predict: "When shifting elements one position right in the same array, why must traversal start at the right end?",
    reveal: "Starting left overwrites values before they have been copied. Starting right consumes each source before its slot changes.",
    modelCode: `for (int i = values.length - 1; i > 0; i--) {
  values[i] = values[i - 1];
}`,
    modelOutput: "Every source survives until it has been copied.",
    modelExplanation: "For in-place algorithms, trace which values are still needed. Traversal direction is part of correctness.",
    missions: [["Reproduce overwrite", "Trace [1,2,3,4] left to right.", "Array becomes repeated ones."], ["Reverse direction", "Repair shiftRight.", "All original sources preserved."], ["Insert a value", "Shift then write index zero.", "Insert checks pass."], ["Draw the invariant", "Mark processed and unprocessed regions.", "Unprocessed sources remain intact."]],
    checks: [["shift", "Right shift", "source order preserved"], ["insert", "Front insert", "new value plus shifted data"], ["short", "Length zero/one", "safe behavior"], ["invariant", "Direction reasoning", "overwrite risk named"]],
    apTransfer: "Write an algorithm that removes the element at index k by shifting later elements left. State the loop start and bound.",
    reflection: "How did the trace reveal the required traversal direction?"
  }),
  {
    id: "u4l43", number: 43, unitLesson: 8, lessonType: "assessment", arc: "4A · Data and arrays",
    topic: "Assessment", title: "Unit 4A test", outcome: "Demonstrate data-set and one-dimensional array reasoning without executing code.",
    deliverable: "Unit 4A assessment submitted through the classroom system", duration: "75 min",
    ap: "Topics 4.1–4.5", source: "Local assessment blueprint; secure questions and keys are not published on this site.",
    assessment: { scope: ["Ethical and social impacts of data use", "Matching data to questions", "Array creation and indexing", "Indexed and enhanced-for traversals", "Array algorithms and rearrangement"], conditions: ["Java Quick Reference available", "No compiler or autocomplete", "Show array traces", "Submit through the classroom system"] }
  },
  unit4Build({
    number: 44, arc: "4B · Text files", topic: "4.6", title: "Read tokens with File and Scanner",
    outcome: "Open a text file, traverse tokens with hasNext, and close the Scanner.",
    deliverable: "TokenReader.java with six file checks passing",
    ap: "File · Scanner · hasNext", slug: "scanner-tokens", runTarget: "TokenReader",
    source: "Original bridge into the local Chapter 7.5 file labs; exam-facing examples use hasNext.",
    baseline: "The starter opens tokens.txt but returns a placeholder token count.", output: "0",
    files: [["TokenReader.java", "Edit and run", "Open a file and count tokens."], ["TokenReaderCheck.java", "Read and run", "Creates temporary files for six checks."], ["tokens.txt", "Read", "Small baseline input."], ["README.md", "Read", "File-location and run directions."]],
    predict: "What two different failures can occur if the file name is correct Java but the file is not in the program's working directory?",
    reveal: "Compilation can succeed, then execution throws FileNotFoundException. Source location and process working directory are different ideas.",
    modelCode: `Scanner input = new Scanner(new File(path));
while (input.hasNext()) {
  String token = input.next();
}
input.close();`,
    modelOutput: "hasNext guards next; the file path is resolved when the program runs.",
    modelExplanation: "The exam reference lists hasNext. Real editors may also support more specialized Scanner methods, but build exam answers from the listed subset.",
    missions: [["Locate the working directory", "Run the unchanged project from the project folder.", "tokens.txt is found."], ["Count tokens", "Use hasNext and next.", "Empty and multi-token files pass."], ["Close the resource", "Close after traversal.", "Resource step documented."], ["Explain failure layers", "Separate compile-time from runtime file failure.", "Both layers named."]],
    checks: [["tokens", "Token count", "whitespace handled"], ["empty", "Empty file", "zero"], ["guard", "Scanner guard", "hasNext before next"], ["layers", "Failure explanation", "compile versus runtime"]],
    apTransfer: "Write the loop that reads every whitespace-delimited token from a Scanner named input and counts tokens equal to target.",
    reflection: "What file assumption did your editor make that the Java source did not show?"
  }),
  unit4Build({
    number: 45, arc: "4B · Text files", lessonType: "extended-lab", topic: "4.6", title: "Inventory Auditor",
    outcome: "Read inventory records line by line and report low-stock items.",
    deliverable: "InventoryAudit.java, passing checks, and one malformed-row note",
    ap: "File traversal · Data validation", slug: "inventory-auditor", runTarget: "InventoryAudit",
    downloadLabel: "verified Inventory Auditor lab",
    source: "Original verified remix of the planned Inventory Auditor file lab.",
    baseline: "The starter reads inventory.txt but reports zero low-stock items.", output: "low stock: 0",
    files: [["InventoryAudit.java", "Edit and run", "Count valid low-stock records."], ["InventoryAuditCheck.java", "Read and run", "Temporary-file checks."], ["inventory.txt", "Read", "Sample name,quantity records."], ["README.md", "Read", "Lab stages and evidence."]],
    predict: "A line contains pencils,4. Which operations turn the text 4 into a value that can be compared with a threshold?",
    reveal: "Split the line, select the quantity field, then use Integer.parseInt on that field.",
    modelCode: `String[] parts = line.split(",");
int quantity = Integer.parseInt(parts[1]);`,
    modelOutput: "The pipeline is read → split → select → parse → validate → accumulate.",
    modelExplanation: "File algorithms are collection algorithms with an input step. Keep parsing separate from the decision you make with the value.",
    missions: [["Run sample data", "Confirm the file is found.", "Baseline reports zero."], ["Parse records", "Split each nonblank token record.", "Valid-record checks pass."], ["Count low stock", "Use the supplied threshold.", "Boundary quantity is handled."], ["Document malformed input", "State the chosen precondition or handling rule.", "Behavior is explicit."]],
    checks: [["parse", "Record parsing", "name and quantity separated"], ["low", "Low-stock count", "boundary correct"], ["empty", "Empty input", "zero"], ["malformed", "Malformed-row contract", "precondition or response stated"]],
    apTransfer: "Describe the accumulator and condition for returning the name of the lowest-stock item in a nonempty file.",
    reflection: "Where in the pipeline should malformed data be detected?"
  }),
  unit4Build({
    number: 46, arc: "4B · Text files", lessonType: "extended-lab", topic: "4.6", title: "Weather Data Analyzer",
    outcome: "Parse comma-separated weather rows and compute a conditional average.",
    deliverable: "WeatherData.java with seven parser and average checks passing",
    ap: "split · Double.parseDouble · File data", slug: "weather-data", runTarget: "WeatherData",
    downloadLabel: "verified Weather Data lab",
    source: "Original verified remix of the planned Weather Data Analyzer lab.",
    baseline: "The starter opens weather.txt but returns 0.0 for every average.", output: "0.0",
    files: [["WeatherData.java", "Edit and run", "Average values for a requested station."], ["WeatherDataCheck.java", "Read and run", "Temporary-file and boundary checks."], ["weather.txt", "Read", "Sample station,date,value rows."], ["README.md", "Read", "Lab stages and preconditions."]],
    predict: "Why must an average method track both total and count rather than divide by the number of lines in the file?",
    reveal: "Only matching, valid rows belong in the average. File length may include other stations or records.",
    modelCode: `if (parts[0].equals(target)) {
  total += Double.parseDouble(parts[2]);
  count++;
}`,
    modelOutput: "The same condition controls both accumulator updates.",
    modelExplanation: "A conditional average is two synchronized accumulators. Dividing by the wrong count produces plausible but incorrect output.",
    missions: [["Trace one file", "Mark matching and nonmatching rows.", "Count includes only target station."], ["Parse values", "Split and parse station,value.", "Decimal checks pass."], ["Compute average", "Update total and count together.", "Mixed-station average passes."], ["Handle no matches", "Follow the stated zero-result contract.", "No-match check passes."]],
    checks: [["parse", "Decimal parsing", "values retained"], ["filter", "Station filter", "other rows excluded"], ["average", "Conditional average", "correct total/count"], ["none", "No matches", "returns 0.0"]],
    apTransfer: "Write the core statements for averaging only positive values read from a Scanner. You may assume input supplies doubles.",
    reflection: "Which wrong denominator would have produced the most believable bug?"
  }),
  unit4Build({
    number: 47, arc: "4B · Text files", lessonType: "extended-lab", topic: "Files wrap-up", title: "Gradebook Validator",
    outcome: "Validate file records before including them in a summary.",
    deliverable: "GradebookValidator.java with eight validity checks passing",
    ap: "File validation · Parsing · Quiz preparation", slug: "gradebook-validator", runTarget: "GradebookValidator",
    downloadLabel: "verified Gradebook Validator lab",
    source: "Original verified remix of the planned Gradebook Validator lab; the timed quiz remains private.",
    baseline: "The starter opens grades.txt but treats every record as invalid.", output: "valid: 0\ninvalid: 4",
    files: [["GradebookValidator.java", "Edit and run", "Validate name, score, and field count."], ["GradebookValidatorCheck.java", "Read and run", "Eight record checks."], ["grades.txt", "Read", "Sample records."], ["README.md", "Read", "Lab and quiz handoff."]],
    predict: "Should 100 be valid for a score range 0 through 100? List the four boundary values that distinguish inclusive from exclusive logic.",
    reveal: "Yes. Test -1, 0, 100, and 101.",
    modelCode: `return parts.length == 2
    && !parts[0].equals("")
    && score >= 0 && score <= 100;`,
    modelOutput: "Structure and value constraints both belong to validity.",
    modelExplanation: "Validate before accumulating. One invalid record should not silently distort a summary.",
    missions: [["Write boundary cases", "List -1, 0, 100, 101.", "Expected validity recorded."], ["Validate shape", "Require exactly two nonempty fields.", "Shape checks pass."], ["Validate score", "Enforce inclusive range.", "Four boundaries pass."], ["Summarize file", "Count valid and invalid records.", "Totals cover every row."]],
    checks: [["shape", "Record shape", "field count/name"], ["bounds", "Score boundaries", "0 and 100 included"], ["summary", "File summary", "every row classified"], ["quiz", "Quiz readiness note", "one remaining file-reading risk"]],
    apTransfer: "Write a Boolean expression that validates an int score and a nonempty String name. Then negate the entire valid-record condition.",
    reflection: "Which validation belongs before parsing, and which can happen only after parsing?"
  }),
  unit4Build({
    number: 48, arc: "4C · ArrayList", topic: "4.7", title: "Cross the wrapper boundary",
    outcome: "Use Integer and Double values where collections require objects.",
    deliverable: "WrapperLab.java with seven boxing and parsing checks passing",
    ap: "Wrapper classes · Autoboxing", slug: "wrapper-classes", runTarget: "WrapperLab",
    source: "Remixed from local ArrayList materials and the early Unit 4 preview of parseInt.",
    baseline: "The starter parses text but leaves boxing and unboxing methods unfinished.", output: "42\n0",
    fileRole: "Convert among String, primitive, and wrapper values.",
    predict: "Why can ArrayList<Integer> store 7 even though 7 is an int primitive?",
    reveal: "Autoboxing converts the int to an Integer object. Reading it into an int performs unboxing.",
    modelCode: `Integer boxed = 7;
int primitive = boxed;
int parsed = Integer.parseInt("42");`,
    modelOutput: "Boxing changes representation; parsing interprets text.",
    modelExplanation: "Do not confuse new Integer values with parsing Strings. The AP subset uses Integer and Double as collection element types.",
    missions: [["Map conversions", "Draw String → int → Integer.", "Parsing and boxing labeled separately."], ["Box and unbox", "Complete roundTrip.", "Positive and negative checks pass."], ["Parse safely under precondition", "Implement addTextNumbers.", "Multi-digit check passes."], ["Explain equality", "State what intValue contributes.", "Primitive value distinguished from object."]],
    checks: [["round", "Box/unbox round trip", "value preserved"], ["parse", "String parsing", "sum correct"], ["negative", "Negative values", "preserved"], ["terms", "Vocabulary map", "parse, box, unbox"]],
    apTransfer: "Explain the conversions in: ArrayList<Double> values = new ArrayList<>(); values.add(3.5); double x = values.get(0);",
    reflection: "Which conversion happens because of collection type, and which because data began as text?"
  }),
  unit4Build({
    number: 49, arc: "4C · ArrayList", topic: "4.8", title: "Use the five ArrayList methods",
    outcome: "Predict how add, get, set, remove, and size change positions and values.",
    deliverable: "ListMethods.java with ten method checks passing",
    ap: "ArrayList methods", slug: "arraylist-methods", runTarget: "ListMethods",
    source: "Remixed from NumberJumble and the local AP-subset method reference.",
    baseline: "The starter creates a list but rotateLeft and replaceMiddle are unfinished.", output: "[1, 2, 3, 4]",
    fileRole: "Implement rotations and replacement with AP-subset methods.",
    predict: "After list.remove(1), what happens to the old elements at indexes 2 and later?",
    reveal: "They shift one position left, and size decreases by one.",
    modelCode: `Integer first = list.remove(0);
list.add(first);`,
    modelOutput: "Removal returns the removed value; add without an index appends it.",
    modelExplanation: "Trace both contents and indexes after every mutating call. Method syntax is easy; index movement causes the errors.",
    missions: [["Trace five calls", "Write the list after each supplied operation.", "Indexes relabeled every row."], ["Rotate left", "Use remove and add without a loop.", "Normal and short lists pass."], ["Replace middle", "Use set without changing size.", "Odd-length check passes."], ["Build the method table", "Record return value and size effect.", "Five methods exact."]],
    checks: [["rotate", "Left rotation", "first moves to end"], ["set", "Replacement", "size unchanged"], ["short", "Short list", "safe behavior"], ["table", "Method contract table", "returns and shifts correct"]],
    apTransfer: "Trace [A,B,C,D] after remove(1), add(2, 'X'), and set(0, 'Z'). Give final size.",
    reflection: "Which method changes indexes without changing size?"
  }),
  unit4Build({
    number: 50, arc: "4C · ArrayList", topic: "4.9", title: "Traverse a changing-size collection",
    outcome: "Choose index or enhanced-for traversal for ArrayList queries and mutations.",
    deliverable: "ListTraversal.java with eight traversal checks passing",
    ap: "ArrayList traversals", slug: "arraylist-traversal", runTarget: "ListTraversal",
    source: "Remixed from NumberList and Words lab traversal patterns.",
    baseline: "The starter compiles but longest and addSuffix return placeholders.", output: "unfinished\n[]",
    fileRole: "Implement query and replacement traversals.",
    predict: "Can an enhanced for loop replace each String element by assigning to its loop variable? Connect your answer to the earlier array lesson.",
    reveal: "No. The loop variable is not the collection slot. Use set with an index to replace elements.",
    modelCode: `for (int i = 0; i < words.size(); i++) {
  words.set(i, words.get(i) + suffix);
}`,
    modelOutput: "Index-based traversal can identify and replace each slot.",
    modelExplanation: "The same choice rule applies: enhanced for for read-only element access; indexes for position, neighbors, and replacement.",
    missions: [["Implement longest", "Use enhanced for and preserve the first tie.", "Empty and tie contract pass."], ["Replace strings", "Use get and set by index.", "All elements change."], ["Protect size", "Confirm replacement does not add.", "Size remains constant."], ["Compare syntax", "Map array and ArrayList traversal headers.", "length versus size exact."]],
    checks: [["longest", "Longest query", "ties and normal"], ["replace", "Suffix replacement", "all positions"], ["size", "Size invariant", "replacement only"], ["syntax", "Traversal syntax", "array/list distinguished"]],
    apTransfer: "Write a method that returns the index of the first negative Integer in an ArrayList, or -1.",
    reflection: "What extra capability did the indexed traversal provide?"
  }),
  unit4Build({
    number: 51, arc: "4C · ArrayList", topic: "4.10", title: "Remove without skipping",
    outcome: "Remove matching elements while accounting for index shifts.",
    deliverable: "ListRemoval.java with ten removal checks passing",
    ap: "ArrayList algorithms · Removal", slug: "arraylist-removal", runTarget: "ListRemoval",
    source: "Remixed from NumberJumble duplicate removal and local ArrayList algorithm practice.",
    baseline: "The starter removes left to right and skips adjacent matches.", output: "[1, 2, 2, 3]",
    fileRole: "Repair removal traversal and remove consecutive duplicates.",
    predict: "Why does incrementing i immediately after remove(i) skip the element that shifted into i?",
    reveal: "The next element moves into the current index. Incrementing advances past it before it is tested.",
    modelCode: `int i = 0;
while (i < values.size()) {
  if (values.get(i) < 0) values.remove(i);
  else i++;
}`,
    modelOutput: "The index advances only when no removal shifts a new value into the current position.",
    modelExplanation: "Forward with a conditional increment and backward traversal are both valid. Choose from the contract and explain the invariant.",
    missions: [["Reproduce the skip", "Trace adjacent matches.", "Shifted value is identified."], ["Remove negatives", "Use conditional increment or traverse backward.", "Adjacent and edge matches pass."], ["Remove duplicates", "Compare neighbors and preserve one copy.", "Runs of three pass."], ["State the invariant", "Explain what portion is already clean.", "Index shift appears in reasoning."]],
    checks: [["negative", "Negative removal", "adjacent matches"], ["edges", "Edge removals", "first/last/all"], ["duplicates", "Consecutive duplicates", "one copy retained"], ["invariant", "Shift reasoning", "new occupant retested"]],
    apTransfer: "Complete a loop that removes every String of length 0 from an ArrayList without skipping adjacent empty Strings.",
    reflection: "Which traversal strategy do you trust more under exam time, and why?"
  }),
  unit4Build({
    number: 52, arc: "4C · ArrayList", lessonType: "review", topic: "FRQ Question 3", title: "Plan two-list analysis under time",
    outcome: "Handwrite an ArrayList method that compares two collections without losing index alignment.",
    deliverable: "Timed FRQ response, synchronized trace, and self-score",
    ap: "FRQ Question 3 · Data analysis",
    source: "Original two-list FRQ-style practice; released or secure prompt text remains in the classroom system.",
    projectHeading: "Open the writing packet", baseline: "Complete the timed response before using a Java editor or notes.",
    files: [["Prompt", "Read", "Two-list specification distributed in class."], ["Trace table", "Complete", "Index, list A, list B, decision."], ["Scoring guide", "Use after time", "Evidence categories and revision."]],
    predict: "Two lists represent names and scores at matching indexes. What precondition makes one indexed loop safe for both?",
    reveal: "The lists must have equal size (or the prompt must define how unmatched elements are handled).",
    modelCode: `for (int i = 0; i < names.size(); i++) {
  if (scores.get(i) >= cutoff) {
    result.add(names.get(i));
  }
}`,
    modelOutput: "One index preserves the relationship between parallel collections.",
    modelExplanation: "Write the precondition beside the loop before coding. Then trace one matching and one nonmatching row.",
    missions: [["Plan", "Name inputs, output, precondition, and accumulator.", "All contracts visible."], ["Trace", "Complete two representative rows.", "Index alignment preserved."], ["Write under time", "Complete the method without execution.", "No placeholder remains."], ["Self-score", "Cite exact evidence and revise once.", "Revision targets correctness."]],
    checks: [["contract", "Method contract", "inputs/output/precondition"], ["trace", "Synchronized trace", "alignment preserved"], ["timed", "Timed method", "complete"], ["revision", "Evidence revision", "one gap repaired"]],
    apTransfer: "Explain how the algorithm changes if removing from one of the parallel lists is required.",
    reflection: "Which list operation was most likely to break alignment?"
  }),
  {
    id: "u4l53", number: 53, unitLesson: 18, lessonType: "assessment", arc: "4C · ArrayList",
    topic: "Assessment", title: "ArrayList quiz and timed MCQ set", outcome: "Demonstrate wrapper, ArrayList method, traversal, and removal reasoning under time.",
    deliverable: "Quiz and MCQ set submitted through the classroom system", duration: "75 min",
    ap: "Topics 4.7–4.10", source: "Local assessment blueprint; secure questions and keys are not published on this site.",
    assessment: { scope: ["Integer and Double wrappers", "add, get, set, remove, size", "Indexed and enhanced-for traversals", "Removal during traversal", "ArrayList data analysis"], conditions: ["Timed", "No compiler or autocomplete", "Trace list contents after each mutation", "Submit through the classroom system"] }
  },
  unit4Build({
    number: 54, arc: "4D · Two-dimensional data", topic: "4.11", title: "Turn pixel position into row and column",
    outcome: "Create and access a rectangular 2D array using row-column coordinates.",
    deliverable: "GridBridge.java with eight coordinate checks passing",
    ap: "2D array creation and access", slug: "grid-bridge", runTarget: "GridBridge",
    source: "Remixed from the cohort's Processing grid projects: pixel division becomes a row or column index.",
    baseline: "The starter creates a grid but converts every pixel position to [0][0].", output: "row 0, col 0",
    fileRole: "Map pixels to grid indexes and guard boundaries.",
    predict: "With 100-pixel cells, what column contains x = 349? What happens at x = 400 in a four-column grid?",
    reveal: "349 / 100 is column 3. 400 / 100 is column 4, which is out of bounds for indexes 0–3.",
    modelCode: `int row = y / cellSize;
int col = x / cellSize;
return grid[row][col];`,
    modelOutput: "Pixel arithmetic was grid indexing all along; Java stores row first, then column.",
    modelExplanation: "A 2D array is an array of rows. grid.length counts rows; grid[0].length counts columns when at least one row exists.",
    missions: [["Map positions", "Convert four pixel coordinates by hand.", "Quotients match row/column."], ["Implement row/column", "Use integer division.", "Interior coordinates pass."], ["Guard the edge", "Reject negative and outside positions.", "Boundary checks pass."], ["Label dimensions", "State row and column counts.", "length expressions exact."]],
    checks: [["map", "Pixel mapping", "interior cells"], ["edge", "Boundary guard", "negative/outside"], ["access", "Grid access", "row then column"], ["dimensions", "Dimension syntax", "rows versus columns"]],
    apTransfer: "Write a method that returns true when row and col are valid for a nonempty rectangular int[][] grid.",
    reflection: "Which Processing coordinate idea made the new syntax feel familiar?",
    processing: { title: "Interactive grid bridge", time: "20 min", why: "Mouse coordinates visibly select row and column.", prompt: "Highlight grid[mouseY / cellSize][mouseX / cellSize] and display both indexes.", status: "Optional visual extension." }
  }),
  unit4Build({
    number: 55, arc: "4D · Two-dimensional data", topic: "4.12", title: "Trace row-major traversal",
    outcome: "Traverse every cell in row-major order with correct rectangular bounds.",
    deliverable: "GridTraversal.java with eight order and count checks passing",
    ap: "Nested 2D traversal · Row-major order", slug: "grid-traversal", runTarget: "GridTraversal",
    source: "Remixed from local grid/Game of Life materials and the planned Picture Lab bridge.",
    baseline: "The starter traverses only a square corner of rectangular grids.", output: "1 2\n4 5",
    fileRole: "Repair inner bounds and return row-major text.",
    predict: "For a 2-by-3 grid, how many times does the inner body run? Which expression supplies the inner bound?",
    reveal: "Six times. The inner bound is grid[row].length (or grid[0].length for a rectangular nonempty grid).",
    modelCode: `for (int row = 0; row < grid.length; row++) {
  for (int col = 0; col < grid[row].length; col++) {
    visit(grid[row][col]);
  }
}`,
    modelOutput: "Each row is selected before each column in that row.",
    modelExplanation: "Never use grid.length for both bounds unless the specification guarantees square data.",
    missions: [["Trace 2 by 3", "List row,col order.", "(0,0) through (1,2)."], ["Repair inner bound", "Use current row length.", "Rectangular check passes."], ["Build row-major text", "Separate values predictably.", "Order checks pass."], ["Count visits", "Relate dimensions to executions.", "2×3 → 6."]],
    checks: [["rectangle", "Rectangular traversal", "all cells"], ["order", "Row-major order", "rows before next row"], ["single", "One row/column", "safe"], ["count", "Execution count", "rows × columns"]],
    apTransfer: "Give the row,col visit order for a 3-by-2 grid and state the final row and col values after both loops terminate.",
    reflection: "What bug appears when square sample data hides a wrong inner bound?"
  }),
  unit4Build({
    number: 56, arc: "4D · Two-dimensional data", topic: "4.13", title: "Build row and column algorithms",
    outcome: "Compute row sums, scan a column, and locate a target in a 2D array.",
    deliverable: "GridAlgorithms.java with ten 2D checks passing",
    ap: "2D array algorithms", slug: "grid-algorithms", runTarget: "GridAlgorithms",
    source: "Remixed from grid labs, Student Average accumulators, and AP-style 2D algorithms.",
    baseline: "The starter compiles but rowSum and columnContains return placeholders.", output: "0\nfalse",
    fileRole: "Implement one-row and one-column traversals.",
    predict: "For rowSum(grid, r), which index changes and which stays fixed? Reverse the answer for scanning column c.",
    reveal: "Row sum fixes r and changes col. Column scan fixes c and changes row.",
    modelCode: `int total = 0;
for (int col = 0; col < grid[row].length; col++) {
  total += grid[row][col];
}`,
    modelOutput: "A one-dimensional traversal lives inside the 2D structure.",
    modelExplanation: "Name the fixed index before writing the loop. Many 2D errors are row/column role swaps, not nested-loop errors.",
    missions: [["Mark fixed/changing", "Annotate row sum and column scan.", "Roles correct."], ["Implement rowSum", "Traverse one selected row.", "First/last rows pass."], ["Implement columnContains", "Traverse rows at one column.", "Present/absent pass."], ["Locate a target", "Return row-major first coordinate.", "Tie order documented."]],
    checks: [["row", "Row sum", "first and last"], ["column", "Column scan", "present and absent"], ["locate", "Target location", "row-major first"], ["roles", "Index roles", "fixed versus changing"]],
    apTransfer: "Write code that returns the number of negative values in column c of a rectangular int[][] grid.",
    reflection: "Which word in the problem tells you which index stays fixed?"
  }),
  unit4Build({
    number: 57, arc: "4D · Two-dimensional data", lessonType: "extended-lab", topic: "Picture Lab I", title: "Mirror with coordinate pairs",
    outcome: "Plan and implement a horizontal mirror by pairing source and destination columns.",
    deliverable: "Picture Lab mirror artifact and workbook evidence",
    ap: "2D traversal · Pixel algorithms",
    source: "Companion to Picture Lab. Authorized lab files are distributed through the classroom system and are not republished here.",
    projectHeading: "Open the classroom Picture Lab project", baseline: "Run the supplied baseline image, then preserve an untouched copy for comparison.",
    files: [["Picture Lab project", "Open in editor", "Authorized lab code and images."], ["Mirror method", "Edit", "Pair pixels across a row."], ["Before/after image", "Save", "Observable lab evidence."]],
    predict: "For width 8, which source column pairs with destination column 7? Generalize the destination expression for source col.",
    reveal: "Source 0 pairs with 7. The mirror column is width - 1 - col.",
    modelCode: `for (int row = 0; row < pixels.length; row++) {
  for (int col = 0; col < pixels[row].length / 2; col++) {
    int mirrorCol = pixels[row].length - 1 - col;
  }
}`,
    modelOutput: "Only half of each row needs to supply source pixels.",
    modelExplanation: "Plan coordinate pairs before touching Pixel methods. The underlying algorithm is ordinary 2D indexing.",
    missions: [["Draw pairs", "Map columns for widths 7 and 8.", "Center handling correct."], ["Run baseline", "Save an unchanged image.", "Before evidence exists."], ["Implement mirror", "Follow the lab API and coordinate plan.", "Output mirrors expected half."], ["Inspect boundaries", "Check first, last, and center columns.", "No out-of-range access."]],
    checks: [["pairs", "Mirror pairs", "odd and even widths"], ["baseline", "Before image", "saved"], ["mirror", "Mirrored output", "orientation correct"], ["bounds", "Boundary audit", "edge/center safe"]],
    apTransfer: "Write only the column calculation that maps every column to its horizontal mirror partner.",
    reflection: "Which part was 2D-array reasoning, and which part was specific to the Picture API?",
    processing: { title: "Processing mirror preview", time: "20 min", why: "Pixels and coordinates are already familiar in Processing.", prompt: "Mirror a small color grid using width - 1 - col before applying the lab API.", status: "Optional visual transfer; the required lab stays Java." }
  }),
  unit4Build({
    number: 58, arc: "4D · Two-dimensional data", lessonType: "extended-lab", topic: "Picture Lab II", title: "Transform neighborhoods and compose evidence",
    outcome: "Use neighboring pixels for an edge decision and document a multi-step image transformation.",
    deliverable: "Picture Lab collage/edge artifact, checks, and algorithm explanation",
    ap: "2D neighbors · Image algorithms",
    source: "Companion to Picture Lab. Authorized code and image assets remain in the classroom system.",
    projectHeading: "Continue the classroom Picture Lab project", baseline: "Resume yesterday's verified mirror before beginning the neighborhood algorithm.",
    files: [["Picture Lab project", "Continue", "Authorized lab code and images."], ["Edge method", "Edit", "Compare neighboring pixels."], ["Collage output", "Save", "Multi-step artifact and evidence."]],
    predict: "If an algorithm compares pixel (row,col) with (row,col+1), what must the column loop exclude?",
    reveal: "It must exclude the final column because col + 1 would equal the row length.",
    modelCode: `for (int col = 0; col < rowLength - 1; col++) {
  compare(current, rightNeighbor);
}`,
    modelOutput: "A neighbor access changes the safe traversal bound.",
    modelExplanation: "Derive bounds from the farthest index expression used in the body, not from a memorized loop header.",
    missions: [["Derive neighbor bound", "Start from col + 1 < width.", "Simplify to col < width - 1."], ["Implement edge step", "Follow the supplied pixel-distance contract.", "No boundary exception."], ["Compose collage", "Apply transformations in the required order.", "Artifact shows each stage."], ["Explain one pixel", "Trace source and neighbor coordinates.", "Decision matches output."]],
    checks: [["bound", "Neighbor bound", "last safe source"], ["edge", "Edge output", "threshold behavior"], ["collage", "Composed artifact", "stages visible"], ["trace", "One-pixel trace", "coordinates and decision"]],
    apTransfer: "For an algorithm that compares grid[row][col] with grid[row+1][col], derive the outer-loop bound.",
    reflection: "How did using a neighbor change the traversal contract?"
  }),
  unit4Build({
    number: 59, arc: "4E · Retrieval and algorithms", lessonType: "review", topic: "Re-entry retrieval", title: "Recover collection patterns cold",
    outcome: "Retrieve array, ArrayList, and 2D traversal patterns after spring break.",
    deliverable: "Cold pattern sheet, corrections, and one targeted drill",
    ap: "Cumulative data-structure retrieval",
    source: "Original re-entry cycle placed after the calendar's 19-day spring break.",
    projectHeading: "Start from blank paper", baseline: "Do not open earlier lessons until the first retrieval pass is complete.",
    files: [["Blank pattern sheet", "Complete first", "Array, ArrayList, row-major, removal."], ["Prior workbook exports", "Open second", "Evidence for correction."], ["Targeted drill", "Complete last", "One weakest pattern."]],
    predict: "Write four count expressions from memory: String, array, ArrayList, and the current row of a 2D array.",
    reveal: "text.length(), values.length, list.size(), and grid[row].length.",
    modelCode: `array:      i < values.length
ArrayList:  i < list.size()
2D inner:   col < grid[row].length`,
    modelOutput: "Small syntax differences encode different types and are frequent exam traps.",
    modelExplanation: "Cold retrieval measures what survived. Corrections should be categorized, not merely copied.",
    missions: [["Cold headers", "Write four traversals from memory.", "No notes used."], ["Cold algorithms", "Sketch accumulator, removal, and 2D scan.", "Core invariants named."], ["Compare", "Use workbook exports to correct.", "Differences highlighted."], ["Target one gap", "Complete one five-minute drill.", "Drill matches weakest category."]],
    checks: [["headers", "Traversal headers", "four structures"], ["patterns", "Algorithm patterns", "accumulate/remove/2D"], ["correction", "Correction evidence", "differences marked"], ["target", "Targeted drill", "weakest gap practiced"]],
    apTransfer: "Explain which of the four structures can change size during traversal and how that affects the loop.",
    reflection: "What survived nineteen days, and which syntax or invariant disappeared?"
  }),
  unit4Build({
    number: 60, arc: "4E · Retrieval and algorithms", lessonType: "review", topic: "FRQ Question 4", title: "Solve a 2D FRQ under time",
    outcome: "Plan, trace, and handwrite a complete two-dimensional algorithm.",
    deliverable: "Timed FRQ response, coordinate trace, and self-score",
    ap: "FRQ Question 4 · 2D arrays",
    source: "Original FRQ-style practice; released or secure prompt text remains in the classroom system.",
    projectHeading: "Open the writing packet", baseline: "No compiler, autocomplete, or prior solution until time is called.",
    files: [["Prompt", "Read", "2D specification distributed in class."], ["Coordinate trace", "Complete", "Fixed/changing indexes and bounds."], ["Scoring guide", "Use after time", "Evidence categories and revision."]],
    predict: "Before writing nested loops, what three questions should you answer about the required cells?",
    reveal: "Which index is fixed or changing, whether every cell or a subset is visited, and whether any neighbor access tightens a bound.",
    modelCode: `1. mark row/column roles
2. derive bounds from every index expression
3. choose accumulator and update
4. trace a tiny rectangle`,
    modelOutput: "The plan catches transposed indexes and unsafe neighbor access before syntax obscures them.",
    modelExplanation: "A 2D FRQ is an algorithm contract plus coordinate bookkeeping. Use a 2-by-3 trace, not a square.",
    missions: [["Plan for four minutes", "Mark indexes, bounds, accumulator, and result.", "All four present."], ["Trace 2 by 3", "Execute representative cells.", "Rectangular data used."], ["Write under time", "Complete the response.", "No placeholders."], ["Self-score and revise", "Cite evidence and fix one issue.", "Revision is visible."]],
    checks: [["plan", "2D plan", "indexes/bounds/accumulator/result"], ["trace", "Rectangular trace", "coordinates correct"], ["timed", "Timed response", "complete"], ["revision", "Self-scored revision", "evidence cited"]],
    apTransfer: "Describe how the loops would change to process only the border cells of a rectangular grid.",
    reflection: "Which planning step prevented the largest likely point loss?"
  }),
  {
    id: "u4l61", number: 61, unitLesson: 26, lessonType: "assessment", arc: "4E · Retrieval and algorithms",
    topic: "Assessment", title: "Unit 4D test", outcome: "Demonstrate 2D-array creation, traversal, and algorithm reasoning without executing code.",
    deliverable: "2D array assessment submitted through the classroom system", duration: "75 min",
    ap: "Topics 4.11–4.13", source: "Local assessment blueprint; secure questions and keys are not published on this site.",
    assessment: { scope: ["2D creation and access", "Rows versus columns", "Row-major nested loops", "Rectangular arrays", "Row, column, and neighbor algorithms", "Picture/pixel transfer"], conditions: ["Java Quick Reference available", "No compiler or autocomplete", "Show coordinate traces", "Submit through the classroom system"] }
  },
  unit4Build({
    number: 62, arc: "4E · Retrieval and algorithms", topic: "4.14", title: "Choose sequential or binary search",
    outcome: "Implement both searches and state the precondition that makes binary search valid.",
    deliverable: "SearchLab.java with ten search checks passing",
    ap: "Sequential search · Binary search", slug: "search-algorithms", runTarget: "SearchLab",
    source: "Remixed from the local Searching Lab and its integer/String data sets.",
    baseline: "Sequential search works; binary search returns -1 for every target.", output: "3\n-1",
    fileRole: "Implement iterative binary search and compare contracts.",
    predict: "Binary search runs on [8,2,9,1]. Is a -1 result evidence that the target is absent? Why or why not?",
    reveal: "No. The sorted-order precondition is false, so the algorithm's result is not trustworthy.",
    modelCode: `while (low <= high) {
  int mid = (low + high) / 2;
  if (values[mid] == target) return mid;
  if (values[mid] < target) low = mid + 1;
  else high = mid - 1;
}`,
    modelOutput: "Each comparison eliminates half of a sorted search interval.",
    modelExplanation: "Sequential search needs no order. Binary search is faster only when its sorted precondition holds.",
    missions: [["Trace intervals", "Record low, mid, high for one hit and miss.", "Interval strictly shrinks."], ["Implement binary search", "Update the correct boundary.", "First/middle/last/miss pass."], ["Compare contracts", "State input requirement and worst-case idea.", "Sorted precondition explicit."], ["Test duplicate values", "Explain acceptable returned index.", "Any target index meets contract."]],
    checks: [["hits", "Binary hits", "first/middle/last"], ["miss", "Binary miss", "-1"], ["shrink", "Interval progress", "terminates"], ["contract", "Search choice", "sorted precondition"]],
    apTransfer: "Trace low, mid, and high while searching for 14 in [2,5,8,11,14,17,20].",
    reflection: "Which boundary update was easiest to reverse?"
  }),
  unit4Build({
    number: 63, arc: "4E · Retrieval and algorithms", topic: "4.15", title: "Trace sorting invariants",
    outcome: "Identify the sorted region in selection and insertion sort and compare their moves.",
    deliverable: "SortTrace.java with nine pass and invariant checks",
    ap: "Selection sort · Insertion sort · Merge sort", slug: "sorting-invariants", runTarget: "SortTrace",
    source: "Remixed from the local Sorting Lab and SAT-word data sets; the project uses small transparent arrays.",
    baseline: "The starter performs one broken selection pass.", output: "[4, 2, 3, 1]",
    fileRole: "Repair selection pass and trace insertion behavior.",
    predict: "After the first complete selection-sort pass on [4,2,3,1], which value is fixed and at what index?",
    reveal: "The minimum, 1, is fixed at index 0.",
    modelCode: `int minIndex = start;
for (int j = start + 1; j < values.length; j++) {
  if (values[j] < values[minIndex]) minIndex = j;
}
swap(values, start, minIndex);`,
    modelOutput: "One pass grows a sorted prefix by one position.",
    modelExplanation: "Trace regions, not just values: sorted, current candidate, and unexamined. Merge sort is compared conceptually; recursion writing is not required.",
    missions: [["Trace one pass", "Mark minIndex after each comparison.", "Final minimum correct."], ["Repair selection pass", "Swap once after scanning.", "Normal and duplicate checks pass."], ["Trace insertion", "Show the sorted prefix and shifted values.", "One insertion pass correct."], ["Compare moves", "State selection swap versus insertion shift.", "Invariants distinguished."]],
    checks: [["selection", "Selection pass", "minimum fixed"], ["duplicate", "Duplicate values", "multiset preserved"], ["insertion", "Insertion trace", "sorted prefix"], ["compare", "Invariant comparison", "swap versus shift"]],
    apTransfer: "Trace the first two outer-loop passes of selection sort on [5,1,4,2].",
    reflection: "Which representation—values, indexes, or regions—made the sort understandable?"
  }),
  unit4Build({
    number: 64, arc: "4E · Retrieval and algorithms", topic: "4.16", title: "Trace recursion without writing it",
    outcome: "Identify base cases, recursive calls, and return values while unwinding.",
    deliverable: "RecursionTrace.java with eight trace predictions verified",
    ap: "Recursion tracing · Base cases", slug: "recursion-tracing", runTarget: "RecursionTrace",
    source: "Remixed from older recursion exercises, reframed to match the current tracing-only expectation.",
    baseline: "The complete recursive methods run; your work is to predict before revealing output.", output: "10\n321",
    fileRole: "Run only after completing call-stack traces.",
    predict: "For sumTo(3), list calls on the way down and returned values on the way back up.",
    reveal: "Calls: sumTo(3), (2), (1), (0). Returns: 0, 1, 3, 6.",
    modelCode: `public static int sumTo(int n) {
  if (n == 0) return 0;
  return n + sumTo(n - 1);
}`,
    modelOutput: "The base case stops descent; pending additions happen during unwinding.",
    modelExplanation: "Separate call order from return order. The AP task is to analyze recursive code, not invent it from scratch.",
    missions: [["Trace down", "List parameters until the base case.", "Argument moves toward stopping."], ["Trace up", "Record each returned value.", "Pending operation applied once."], ["Predict two methods", "Commit before running.", "Predictions saved."], ["Diagnose nontermination", "Find a call that moves away from its base case.", "Progress failure named."]],
    checks: [["down", "Call sequence", "reaches base"], ["up", "Return sequence", "unwinds correctly"], ["predict", "Output predictions", "verified after run"], ["infinite", "Nontermination diagnosis", "no progress toward base"]],
    apTransfer: "Trace mystery(4) for a supplied recursive method and show both call and return columns.",
    reflection: "Which half of the trace—descent or unwinding—caused more errors?"
  }),
  unit4Build({
    number: 65, arc: "4E · Retrieval and algorithms", topic: "4.17", title: "Trace recursive search and merge sort",
    outcome: "Trace divide-and-conquer intervals and connect them to the iterative algorithms already learned.",
    deliverable: "RecursiveAlgorithms.java trace sheet, verified outputs, and LMS quiz",
    ap: "Recursive binary search · Merge sort · Timed quiz", slug: "recursive-algorithms", runTarget: "RecursiveAlgorithms",
    source: "Remixed from the local Searching and Sorting labs; secure quiz questions remain in the LMS.",
    baseline: "Complete methods run only after interval and split predictions are recorded.", output: "index 4\n[1, 2, 4, 5]",
    fileRole: "Observe recursive intervals and merge results after tracing.",
    predict: "What interval replaces low=0, high=6 when mid=3 is smaller than the target in recursive binary search?",
    reveal: "low becomes 4 and high stays 6. The next call receives only the right half.",
    modelCode: `if (low > high) return -1;
int mid = (low + high) / 2;
if (values[mid] < target)
  return search(values, target, mid + 1, high);`,
    modelOutput: "The recursive call carries the same shrinking interval as the iterative loop.",
    modelExplanation: "Divide-and-conquer changes control flow, not the core invariant. Trace intervals and subarrays instead of trying to visualize all calls at once.",
    missions: [["Trace recursive search", "Record low, mid, high until hit/miss.", "Interval shrinks."], ["Trace merge splits", "Draw halves until size one.", "Base subarrays visible."], ["Predict merge order", "Combine two sorted halves by hand.", "All values preserved and ordered."], ["Take the private quiz", "Use the classroom system after practice.", "No secure content copied here."]],
    checks: [["search", "Recursive intervals", "hit and miss"], ["split", "Merge splits", "size-one base"], ["merge", "Merge result", "sorted and complete"], ["quiz", "Quiz handoff", "submitted in LMS"]],
    apTransfer: "Explain one similarity and one difference between iterative and recursive binary search.",
    reflection: "Which invariant connected the recursive version to an algorithm you already trusted?"
  })
];

window.UNIT4_META = UNIT4_META;
window.UNIT4_LESSONS = UNIT4_LESSONS;
