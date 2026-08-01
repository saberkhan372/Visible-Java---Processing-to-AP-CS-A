/* Unit 1 workbook data. Standard-Java projects live in coursework/unit-1
   and are published as verified student ZIP files. */

var UNIT1_META = {
  slug: "unit1",
  name: "Unit 1",
  title: "Using Objects and Methods",
  dates: "4 Sep – 6 Oct",
  meetings: "11 meetings",
  topics: "1.1–1.15",
  weight: "15–25%",
  storageKey: "apcsa-workbook-v1"
};

var UNIT1_LESSONS = [
  {
    id: "u1l01", number: 1, unitLesson: 1, lessonType: "build",
    topic: "Orientation", title: "Leave the PDE deliberately",
    outcome: "Create, compile, and run a complete Java class whose file name and public class agree.",
    deliverable: "JavaLaunch.java with all four checks passing",
    duration: "75 min", ap: "Program structure · Output · Compiler feedback",
    source: "Remixed from the Processing-to-Java port project and the course's first-day setup materials.",
    download: "../downloads/unit1/u1l01-java-launch.zip",
    project: {
      runTarget: "JavaLaunch", baseline: "The starter compiles and runs before you edit it.",
      output: "unfinished\n0",
      files: [
        ["JavaLaunch.java", "Edit and run", "Complete two methods and keep the class/file contract."],
        ["JavaLaunchCheck.java", "Read and run", "Four behavior checks; do not edit."],
        ["README.md", "Read", "Editor-neutral setup and completion criteria."]
      ]
    },
    prediction: {
      prompt: "A file is named Welcome.java but contains public class Greeting. Predict what happens before trying it, and name the two identifiers Java compares.",
      reveal: "Compilation fails because a public class must be stored in a file with the same case-sensitive name: Greeting.java."
    },
    model: {
      code: `public class Greeting {
  public static void main(String[] args) {
    System.out.println("Hello");
  }
}`,
      output: "The file is Greeting.java, execution starts in main, and the statement prints one line.",
      explanation: "Processing supplied the outer program structure. In standard Java, the class, file name, main method, and explicit calls are visible."
    },
    missions: [
      ["Run the baseline", "Compile both Java files and run JavaLaunch before editing.", "The two placeholder lines match the published baseline."],
      ["Return a greeting", "Make greeting return AP Computer Science A.", "The exact-text check passes."],
      ["Count printed lines", "Make lineCount report the number of lines printed by main.", "The numeric check passes."],
      ["Read one compiler error", "Temporarily create a class/file mismatch, save the message, then restore the correct name.", "The project compiles again and the error is explained in your notes."]
    ],
    checks: [
      ["compile", "Project compiles", "both source files compile together"],
      ["greeting", "Greeting text", "AP Computer Science A"],
      ["line-count", "Line count", "2"],
      ["contract", "Class/file contract", "JavaLaunch lives in JavaLaunch.java"]
    ],
    apTransfer: "Write, from memory, a complete class named ExamWarmup whose main method prints 42. Then label the class header, main header, and method call.",
    reflection: "Which piece of structure did Processing previously hide from you, and what compiler message will help you recognize it?",
    paper: {
      title: "Java Quick Reference scavenger hunt",
      time: "12 min", materials: "One cardstock Java Quick Reference per student",
      when: "before",
      prompt: "Before the editor opens, find these on the sheet and mark them: the six String methods; the one that takes two arguments; the return type of substring; and every place a method name is followed by empty parentheses. Then answer in one line — how do you tell a method from a field on this sheet?",
      evidenceNote: "You will use this sheet on both sections of the exam. Fluency with it is a testable skill."
    },
    home: {
      type: "build", est: "20 min",
      task: "Get the class editor running on the machine you will use at home. Create a class, compile it, print one line, and run it. If you cannot install an editor at home, open the classroom sandbox instead and do the same three steps there.",
      evidence: "Which editor you used, and the exact text of any error you had to get past"
    },
    processing: {
      title: "Name the hidden launcher", time: "10 min",
      why: "Connecting setup and draw to a real Java class makes the transition explicit.",
      prompt: "Sketch the PApplet class and main method that would launch a 400 by 200 canvas. Label which code the PDE used to supply.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u1l02", number: 2, unitLesson: 2, lessonType: "build",
    topic: "1.1–1.6", title: "Make numeric types visible",
    outcome: "Predict expression types and values, then repair accidental integer division and casting errors.",
    deliverable: "ExpressionLab.java with all seven checks passing",
    duration: "75 min", ap: "Primitive types · Expressions · Assignment · Casting",
    source: "Remixed from Unit 1 numeric labs and the course's recurring integer-division diagnostics.",
    download: "../downloads/unit1/u1l02-expression-lab.zip",
    project: {
      runTarget: "ExpressionLab", baseline: "The starter compiles but preserves two common numeric mistakes.",
      output: "86.0\n0\n0",
      files: [
        ["ExpressionLab.java", "Edit and run", "Repair average, whole-part, and remainder methods."],
        ["ExpressionLabCheck.java", "Read and run", "Seven type-and-value checks."],
        ["README.md", "Read", "Prediction table and run directions."]
      ]
    },
    prediction: {
      prompt: "Predict the value and type of 7 / 2, 7 / 2.0, and (double) 7 / 2. Which operand changes the operation?",
      reveal: "They are int 3, double 3.5, and double 3.5. A double operand forces floating-point division before assignment."
    },
    model: {
      code: `int total = 7;
int people = 2;

System.out.println(total / people);          // 3
System.out.println((double) total / people); // 3.5`,
      output: "Casting one operand changes the division; casting the already-truncated result would be too late.",
      explanation: "Java decides the operation from operand types. The destination variable cannot restore a fractional part that integer division already removed."
    },
    missions: [
      ["Predict before editing", "Record the baseline values and types for each method.", "Every prediction names both value and type."],
      ["Repair average", "Change one operand so average keeps its fractional part.", "Typical and exact-average checks pass."],
      ["Separate cast and remainder", "Implement wholePart and remainder without mixing their meanings.", "Positive and boundary checks pass."],
      ["Explain assignment conversion", "Explain why double x = 7 / 2 stores 3.0.", "The explanation names evaluation before assignment."]
    ],
    checks: [
      ["average", "Fractional average", "86.33333333333333 within tolerance"],
      ["exact", "Exact average", "80.0"],
      ["whole", "Whole part", "(int) 4.9 is 4"],
      ["remainder", "Remainder", "17 % 4 is 1"]
    ],
    apTransfer: "Trace int a = 11 / 4; double b = 11 / 4; double c = 11 / 4.0; and explain each stored value without running code.",
    reflection: "At what exact moment is the fractional part lost, and which smallest code change prevents it?",
    paper: {
      title: "Remainder and divisibility drill",
      time: "12 min", materials: "Drill sheet, no device",
      when: "before",
      prompt: "Fill the two slots in this pattern: multiple % factor == 0. Then write Boolean expressions for “a is a factor of b”, “b is a multiple of a”, “n is even”, “n is odd”, and “n is non-negative”. Test every divisibility question against zero — never against one. Last, evaluate -17 % 4 by hand and say why Java's answer is not Python's.",
      evidenceNote: "Java has a remainder operator, not a modulo operator."
    },
    home: {
      type: "video", est: "20 min",
      task: "Watch Tim Gallagher's Unit 1 topic videos for 1.1–1.6 and write down the one rule about integer division you are least sure of.",
      link: "https://www.youtube.com/@TimGallagherComputerScience/playlists",
      evidence: "The rule you are least sure of, in your own words"
    },
    processing: {
      title: "Smooth versus stepped size", time: "15 min",
      why: "A changing diameter makes truncation visible instead of merely numeric.",
      prompt: "Describe how a circle driven by width / 3 differs from one driven by width / 3.0 as width changes. Identify any cast required at the drawing boundary.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u1l03", number: 3, unitLesson: 3, lessonType: "build",
    topic: "1.7, 1.8, 1.11", title: "Control a random range",
    outcome: "Use Math methods and transform a sample in [0.0, 1.0) into an inclusive integer range.",
    deliverable: "DiceLab.java with deterministic boundary checks and a random range check passing",
    duration: "75 min", ap: "Math class · Random values · Preconditions · Comments",
    source: "Remixed from the Point, Dice, powers, and random-range tasks in Unit 1 More Labs.",
    download: "../downloads/unit1/u1l03-dice-lab.zip",
    project: {
      runTarget: "DiceLab", baseline: "The starter compiles and currently maps every sample to the minimum.",
      output: "1\n1\n1",
      files: [
        ["DiceLab.java", "Edit and run", "Implement deterministic scaling and the random wrapper."],
        ["DiceLabCheck.java", "Read and run", "Boundary, width, and repeated range checks."],
        ["README.md", "Read", "Precondition and interval notation."]
      ]
    },
    prediction: {
      prompt: "For min 20 and max 25, why is the multiplier max - min + 1 rather than max - min? Name every possible integer result.",
      reveal: "There are six values: 20, 21, 22, 23, 24, and 25. The width must therefore be 6."
    },
    model: {
      code: `int value = (int)(Math.random() * (max - min + 1)) + min;`,
      output: "Multiplication creates integer-width buckets, the cast chooses a bucket, and adding min shifts the first bucket.",
      explanation: "Keep the transformation in a separate method that accepts a known sample; deterministic inputs make the range arithmetic testable."
    },
    missions: [
      ["State the preconditions", "Document min <= max and 0.0 <= sample < 1.0.", "Both preconditions appear beside the correct methods."],
      ["Scale known samples", "Implement scaleSample before calling Math.random.", "Minimum, middle, and near-one checks pass."],
      ["Wrap Math.random", "Make roll call scaleSample with Math.random().", "Repeated rolls remain within the requested range."],
      ["Explain the interval", "Write why 1.0 is excluded from Math.random.", "The explanation connects exclusion to max + 1 never occurring."]
    ],
    checks: [
      ["minimum", "Sample 0.0", "maps to min"],
      ["middle", "Middle bucket", "maps predictably"],
      ["maximum", "Sample just below 1.0", "maps to max"],
      ["random-range", "Repeated rolls", "every result is inside the inclusive range"]
    ],
    apTransfer: "Write one expression for an integer from -3 through 4 inclusive. Annotate the bucket count and the final shift.",
    reflection: "Which part of the formula controls the number of outcomes, and which part controls the first outcome?",
    paper: {
      title: "Random-interval number lines",
      time: "15 min", materials: "Number-line sheet, no device",
      when: "before",
      prompt: "Work both directions on paper. Given (int)(Math.random() * 800) + 15, draw the number line and name the first and last value. Then reverse it: for the inclusive interval -100 to 100, write the expression. Use last minus first plus one to get the multiplier, then add the first value to shift.",
      evidenceNote: "Multiply to stretch the interval, add to slide it. These are cheap FRQ points that students routinely lose."
    },
    home: {
      type: "practice", est: "20 min",
      task: "Six more intervals, three in each direction, from the drill sheet. Write the multiplier and the shift separately before you combine them.",
      evidence: "Your six answers, with the multiplier and shift shown"
    },
    processing: {
      title: "Scatter with the AP random source", time: "15 min",
      why: "Position and diameter ranges make inclusive and half-open intervals concrete.",
      prompt: "Plan 30 circles whose positions use Math.random and whose diameters satisfy 10.0 <= d < 40.0. Label each interval before coding.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u1l04", number: 4, unitLesson: 4, lessonType: "build",
    topic: "1.9–1.10", title: "Honor the method contract",
    outcome: "Match a required method signature exactly and use overloading to reuse one algorithm.",
    deliverable: "Geometry.java with both distance overloads and six checks passing",
    duration: "75 min", ap: "Method signatures · Parameters · Return values · Overloading",
    source: "Remixed from M&M's Parameters and the Point-distance practice in Unit 1 More Labs.",
    download: "../downloads/unit1/u1l04-geometry-contracts.zip",
    project: {
      runTarget: "Geometry", baseline: "Both required method signatures compile and return placeholder values.",
      output: "0.0\n0.0",
      files: [
        ["Geometry.java", "Edit and run", "Complete both distance methods without changing headers."],
        ["GeometryCheck.java", "Read and run", "Six distance and delegation-oriented cases."],
        ["README.md", "Read", "Method-contract checklist."]
      ]
    },
    prediction: {
      prompt: "Can Java overload two methods that differ only in return type? List the parts Java uses to distinguish method signatures.",
      reveal: "No. A signature uses the method name plus parameter number, types, and order—not the return type or parameter names."
    },
    model: {
      code: `public static double distance(double x, double y) {
  return distance(0, 0, x, y);
}`,
      output: "The two-parameter overload delegates to the four-parameter method instead of duplicating the formula.",
      explanation: "On an FRQ, the printed header is part of the specification. Copy it exactly, then make each method do one clear job."
    },
    missions: [
      ["Freeze the headers", "Mark every method-contract part before editing.", "Name, parameter types/order, and return type match the specification."],
      ["Implement general distance", "Use dx, dy, and Math.sqrt in the four-parameter method.", "Horizontal, vertical, and 3-4-5 cases pass."],
      ["Delegate from the origin", "Call the first overload from the second.", "Origin cases pass without repeated arithmetic."],
      ["Test a zero distance", "Add or run a case where both points are identical.", "The result is 0.0."]
    ],
    checks: [
      ["horizontal", "Horizontal distance", "5.0"],
      ["vertical", "Vertical distance", "7.0"],
      ["triangle", "3-4-5 distance", "5.0"],
      ["origin", "Origin overload", "same result as four-parameter method"]
    ],
    apTransfer: "Given public static double scale(double value, int factor), write a legal call, name the argument corresponding to each parameter, and explain why swapping them fails.",
    reflection: "Which part of a method belongs to its signature, and which contract details still matter even though they are not part of the signature?",
    paper: {
      title: "Read the API before the code",
      time: "12 min", materials: "Printed class API, no device",
      when: "before",
      prompt: "You are given only a class API — no source. Mark each entry as constructor, void method, or value-returning method, and say how you can tell. Then write one legal call to each, inventing the arguments. Do not write the method bodies.",
      evidenceNote: "Reading an API is the skill; the parentheses and the return type carry the information."
    },
    home: {
      type: "video", est: "15 min",
      task: "Watch Tim Gallagher's topic videos for 1.9–1.10. Note one method signature from the Quick Reference whose return type surprised you.",
      link: "https://www.youtube.com/@TimGallagherComputerScience/playlists",
      evidence: "The signature, and why it surprised you"
    },
    processing: {
      title: "Extract one drawing method", time: "15 min",
      why: "Repeated drawing code makes method parameters and reuse visually obvious.",
      prompt: "Design void petal(float x, float y, float size), then list four calls that place petals around a center without duplicating the drawing body.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u1l05", number: 5, unitLesson: 5, lessonType: "build",
    topic: "1.12–1.13", title: "Build an object with valid state",
    outcome: "Define private instance variables, initialize them in a constructor, and expose state through methods.",
    deliverable: "Player.java and PlayerDemo.java with all seven checks passing",
    duration: "75 min", ap: "Classes · Objects · Constructors · Instance methods",
    source: "Remixed from the Point and Dice object labs plus the existing class-creation handouts.",
    download: "../downloads/unit1/u1l05-player-class.zip",
    project: {
      runTarget: "PlayerDemo", baseline: "The two-file starter compiles but constructs placeholder state.",
      output: "unknown 0\nunknown 0",
      files: [
        ["Player.java", "Edit", "Complete fields, constructor behavior, accessors, and addScore."],
        ["PlayerDemo.java", "Run", "Construct and exercise two independent objects."],
        ["PlayerCheck.java", "Read and run", "Seven construction and behavior checks."],
        ["README.md", "Read", "Two-file project map."]
      ]
    },
    prediction: {
      prompt: "In Player p = new Player(\"Ada\", 4), which part declares a reference, which part constructs the object, and when does the constructor run?",
      reveal: "Player p declares the reference variable. new Player(...) constructs the object and immediately runs the matching constructor."
    },
    model: {
      code: `public class Player {
  private String name;

  public Player(String startName) {
    name = startName;
  }

  public String getName() {
    return name;
  }
}`,
      output: "Every Player owns its own private name, and construction establishes that state.",
      explanation: "A class is a blueprint; new creates an object. A constructor has the class name and no return type—not even void."
    },
    missions: [
      ["Map the files", "Identify which file defines the class and which contains main.", "Both public classes match their file names."],
      ["Initialize every field", "Make the constructor store both parameters in private fields.", "Two different players retain different state."],
      ["Expose behavior", "Complete accessors and addScore without making fields public.", "Accessor and mutation checks pass."],
      ["Draw two object boxes", "Record each object's state after the demo runs.", "The boxes show independent names and scores."]
    ],
    checks: [
      ["construction", "Constructor state", "name and score match arguments"],
      ["independence", "Independent objects", "changing one score leaves the other unchanged"],
      ["accessors", "Accessor methods", "report current private state"],
      ["behavior", "addScore", "updates exactly one receiver"]
    ],
    apTransfer: "Write only the fields and constructor for a Book with a private String title and private int pages. Explain why public void Book(...) is not a constructor.",
    reflection: "What state does the constructor promise to establish before any other method is called?",
    paper: {
      title: "Constructor call from a specification",
      time: "12 min", materials: "Specification sheet, no device",
      when: "before",
      prompt: "From a written description of an object, list the attributes it must store, then write the constructor header you would need and one sample call. Circle any attribute that has no matching constructor parameter — the description names it in prose rather than in the parameter list.",
      evidenceNote: "This is exactly how the FRQ Q2 specification is read. The sample call tells you the header; the prose tells you the extra field."
    },
    home: {
      type: "practice", est: "20 min",
      task: "Two more specifications from the sheet. For each, list attributes, write the constructor header, and mark the field with no parameter.",
      evidence: "Two constructor headers and the field you marked in each"
    },
    processing: {
      title: "One object, two audiences", time: "20 min",
      why: "The same Ball state can feed a console report or a visual display.",
      prompt: "Plan a Ball class with private x and y, a constructor, move, and accessors. Mark which code belongs to Ball and which would belong to a PApplet viewer.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u1l06", number: 6, unitLesson: 6, lessonType: "build",
    topic: "1.14", title: "Trace references and aliases",
    outcome: "Distinguish primitive copies from object aliases and predict mutations through shared references.",
    deliverable: "AliasingLab.java and Player.java with six checks and a reference trace",
    duration: "75 min", ap: "Object references · Aliasing · Parameter passing",
    source: "Remixed directly from M&M's Parameters: primitive values, Strings, mutable objects, and pass-by-value tracing.",
    download: "../downloads/unit1/u1l06-aliasing-lab.zip",
    project: {
      runTarget: "AliasingLab", baseline: "The supporting Player class is complete; the lab methods compile with placeholder behavior.",
      output: "false\n0\n0",
      files: [
        ["Player.java", "Read; do not edit", "Complete supporting mutable class."],
        ["AliasingLab.java", "Edit and run", "Implement alias detection and mutation stories."],
        ["AliasingCheck.java", "Read and run", "Six identity and state checks."],
        ["TRACE.md", "Complete", "Reference arrows after each assignment."],
        ["README.md", "Read", "File roles and completion criteria."]
      ]
    },
    prediction: {
      prompt: "After Player b = a; and b.addScore(5);, what score is visible through a? Draw the number of objects and reference arrows before answering.",
      reveal: "The score through a also increases by 5. There is one object and two references to it."
    },
    model: {
      code: `Player a = new Player("Ada", 0);
Player b = a;

b.addScore(5);
System.out.println(a.getScore()); // 5`,
      output: "Assignment copied the reference value, not the Player object.",
      explanation: "Java is pass-by-value: for an object variable, the copied value is a reference. That is why another method can reach and mutate the same object."
    },
    missions: [
      ["Trace separate objects", "Draw two objects created by two new expressions.", "sameObject reports false."],
      ["Create an alias", "Assign one Player variable to another without calling new.", "sameObject reports true."],
      ["Mutate through the alias", "Change score through one name and return the score through the other.", "Both mutation checks pass."],
      ["Preserve a primitive copy", "Contrast int assignment with Player assignment in TRACE.md.", "The primitive values diverge after one variable changes."]
    ],
    checks: [
      ["separate", "Two new expressions", "produce different objects"],
      ["alias", "Reference assignment", "produces two names for one object"],
      ["mutation", "Mutation through alias", "visible through the original reference"],
      ["primitive", "Primitive assignment", "copies the int value"]
    ],
    apTransfer: "Trace a method that receives a Player parameter, assigns it to a local variable, and changes its score. Explain precisely what value is passed and why the caller observes the mutation.",
    reflection: "Which line changes the number of objects, and which line changes only the number of names reaching an object?",
    paper: {
      title: "Box-and-pointer by hand",
      time: "15 min", materials: "Blank paper, two colours",
      when: "before",
      prompt: "Draw the two-part system. A reference variable is a labelled box holding an address; the object lives elsewhere with an arrow pointing to it. Draw the assignment of one object reference to a second variable, then mutate through one of them. Show, on the drawing, why the change is visible through both names.",
      evidenceNote: "Draw every reference as a box plus an arrow, never as a box containing the object. The whole unit depends on that distinction."
    },
    home: {
      type: "practice", est: "20 min",
      task: "Redraw two traces from today with a primitive variable and a reference variable side by side. Write one sentence naming what changes when you assign each one.",
      evidence: "Your one sentence about the difference"
    },
    processing: {
      title: "Draw both references", time: "15 min",
      why: "Two differently sized circles drawn at one position make shared identity visible.",
      prompt: "Plan two Ball variables that point to one Ball. Move through the second and draw through both. Predict why the shapes remain centered together.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u1l07", number: 7, unitLesson: 7, lessonType: "build",
    topic: "1.15", title: "Index a String safely",
    outcome: "Use length, substring, and indexOf while reasoning explicitly about inclusive and exclusive bounds.",
    deliverable: "WordTools.java with all seven normal and edge-case checks passing",
    duration: "75 min", ap: "String methods · Indices · Immutability",
    source: "Remixed from String Activity and String Output Lineup, preserving their index-first tracing routine.",
    download: "../downloads/unit1/u1l07-word-tools.zip",
    project: {
      runTarget: "WordTools", baseline: "The starter compiles and returns empty placeholders.",
      output: "\n",
      files: [
        ["WordTools.java", "Edit and run", "Implement firstWord and safeSlice."],
        ["WordToolsCheck.java", "Read and run", "Seven normal, missing-delimiter, and boundary checks."],
        ["README.md", "Read", "String index map and run directions."]
      ]
    },
    prediction: {
      prompt: "For computer, mark the characters selected by substring(2, 5). Why may the end index equal length even though a character index may not?",
      reveal: "The result is mpu. The end is a boundary after the final included character, so length is a legal exclusive endpoint."
    },
    model: {
      code: `int space = text.indexOf(" ");
if (space == -1) {
  return text;
}
return text.substring(0, space);`,
      output: "The missing-delimiter case is handled before -1 can become a substring bound.",
      explanation: "String methods return new values because Strings are immutable. Every indexOf result must be interpreted before it is reused as an index."
    },
    missions: [
      ["Build an index row", "Write indices under every character in AP CS A.", "The last index is length - 1."],
      ["Handle a missing space", "Implement firstWord without throwing when indexOf returns -1.", "Phrase and one-word checks pass."],
      ["Validate slice bounds", "Return invalid for negative, reversed, or too-large boundaries.", "All boundary checks pass."],
      ["Test the empty String", "Predict and run firstWord on an empty String.", "The result is empty and no exception occurs."]
    ],
    checks: [
      ["first-word", "Phrase first word", "rain"],
      ["no-space", "No delimiter", "returns the whole String"],
      ["empty", "Empty String", "returns empty"],
      ["bounds", "Safe slice", "accepts legal endpoints and rejects illegal ones"]
    ],
    apTransfer: "For a String of length n, state the legal values of start and end in substring(start, end), including the zero-length cases. Then trace substring(1, 1).",
    reflection: "What does -1 mean when returned by indexOf, and why is it dangerous to pass directly to substring?",
    paper: {
      title: "Index grid and substring colouring",
      time: "15 min", materials: "Index-grid worksheet, coloured pencils",
      when: "before",
      prompt: "The String is laid out one character per cell with an index row above it. Colour the range returned by substring(2, 7). Then colour substring(4). Then answer: what does substring(3, 3) return, and is it legal? Write the largest legal second argument and say why it is not out of bounds.",
      evidenceNote: "The second index stops one before. The whole method makes sense once that is visible rather than asserted."
    },
    home: {
      type: "practice", est: "25 min",
      task: "CodingBat String-1, the first eight problems. Work them on the site, then copy each finished method body into your notes.",
      link: "https://codingbat.com/java/String-1",
      evidence: "Your eight method bodies, pasted"
    },
    processing: {
      title: "Reveal a title by boundary", time: "15 min",
      why: "A moving exclusive endpoint turns substring bounds into a visible animation.",
      prompt: "Plan a counter shown that grows from 0 through title.length(), and identify the substring call that displays exactly shown characters.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u1l08", number: 8, unitLesson: 8, lessonType: "build",
    topic: "1.15 + Unit 4 preview", title: "Compare String contents",
    outcome: "Choose equals or compareTo from the question being asked and reject reference equality as a content test.",
    deliverable: "StringRelations.java with all eight comparison checks passing",
    duration: "75 min", ap: "String equality · Lexicographic comparison · Unit 4 preview",
    source: "Remixed from String Activity, Unit 1 More Labs, and the comparison stations in String Four Corners.",
    download: "../downloads/unit1/u1l08-string-relations.zip",
    project: {
      runTarget: "StringRelations", baseline: "The starter compiles but uses identity for one content question and placeholder ordering.",
      output: "false\n0",
      files: [
        ["StringRelations.java", "Edit and run", "Implement content equality and normalized ordering."],
        ["StringRelationsCheck.java", "Read and run", "Eight literal, constructed, equal, and ordered cases."],
        ["README.md", "Read", "Comparison decision table."]
      ]
    },
    prediction: {
      prompt: "Let a be the literal cat and b be new String(\"cat\"). Predict a == b, a.equals(b), and a.compareTo(b). Explain why one result may surprise Processing users.",
      reveal: "Identity is false, equals is true, and compareTo is zero. The objects differ but their character sequences match."
    },
    model: {
      code: `if (left.equals(right)) {
  return 0;
} else if (left.compareTo(right) < 0) {
  return -1;
} else {
  return 1;
}`,
      output: "The method reports only negative/zero/positive meaning, not an implementation-specific difference value.",
      explanation: "Use equals for same contents and compareTo for ordering. Use == only when the question truly asks whether two references reach the same object."
    },
    missions: [
      ["Expose the identity trap", "Run a literal against a separately constructed equal String.", "The prediction distinguishes == from equals."],
      ["Implement sameText", "Use the content question's method.", "Literal and constructed cases pass."],
      ["Normalize ordering", "Return -1, 0, or 1 from the sign of compareTo.", "Before, equal, and after checks pass."],
      ["Keep the preview labeled", "Identify split and Integer.parseInt as Unit 4 topics 4.6 and 4.7.", "No preview method is required in this Unit 1 project."]
    ],
    checks: [
      ["constructed", "Constructed equal Strings", "sameText is true"],
      ["different", "Different contents", "sameText is false"],
      ["before", "Earlier String", "returns -1"],
      ["equal", "Equal String", "returns 0"],
      ["after", "Later String", "returns 1"]
    ],
    apTransfer: "Write a three-branch expression or method that returns first, same, or second based only on the sign of left.compareTo(right). Do not assume an exact nonzero value.",
    reflection: "What question does == answer for object variables, and why is that not the same question as equals?",
    paper: {
      title: "String identity card sort",
      time: "15 min", materials: "Cut card set per pair",
      when: "before",
      prompt: "Each card holds a pair of String expressions. Sort every card into three piles: == is true, == is false, and .equals is true. Some cards belong in two piles. When you finish, write the rule you used — in terms of addresses and objects, not in terms of the characters.",
      evidenceNote: "== compares what is in the variable. Two variables can name one object; new String always makes a second."
    },
    home: {
      type: "practice", est: "25 min",
      task: "CodingBat String-1, the next eight problems. At least two must use equals rather than ==.",
      link: "https://codingbat.com/java/String-1",
      evidence: "Your eight method bodies, pasted"
    },
    processing: {
      title: "Preview a data line", time: "20 min",
      why: "Parsing a line into values previews the later file-data workflow without redefining Unit 1 scope.",
      prompt: "On paper, split 12,7,30 and label which later Unit 4 method converts each piece to an int. Do not treat these as Unit 1 required methods.",
      status: "Unit 4 preview only; Processing source waits for its optional toolchain gate."
    }
  },
  {
    id: "u1l09", number: 9, unitLesson: 9, lessonType: "build",
    topic: "1.15", title: "Build a one-pass String algorithm",
    outcome: "Traverse one-character substrings with a safe bound and maintain a meaningful accumulator.",
    deliverable: "LetterAlgorithms.java with eight checks and one original edge case",
    duration: "75 min", ap: "String algorithms · Accumulators · Edge cases",
    source: "Remixed from String Four Corners, String Activity, and remove-all-letter tasks in Unit 1 More Labs.",
    download: "../downloads/unit1/u1l09-letter-algorithms.zip",
    project: {
      runTarget: "LetterAlgorithms", baseline: "The starter compiles and returns zero or empty placeholders.",
      output: "0\n",
      files: [
        ["LetterAlgorithms.java", "Edit and run", "Implement countLetter and removeLetter."],
        ["LetterAlgorithmsCheck.java", "Read and run", "Eight repeated, missing, empty, and boundary cases."],
        ["README.md", "Read", "Loop invariant and test prompts."]
      ]
    },
    prediction: {
      prompt: "For a String of length 6, list every i used by substring(i, i + 1). What happens if the loop condition is i <= length?",
      reveal: "i runs from 0 through 5. At i = 6, substring(6, 7) requests an end beyond length and throws."
    },
    model: {
      code: `int count = 0;
for (int i = 0; i < text.length(); i++) {
  if (text.substring(i, i + 1).equals(target)) {
    count++;
  }
}`,
      output: "After i characters, count equals the number of target matches among exactly those processed characters.",
      explanation: "State the accumulator meaning before coding. The loop bound then follows from the one-character substring call."
    },
    missions: [
      ["State the invariant", "Complete: count equals the matches among...", "The statement names the processed prefix."],
      ["Count safely", "Implement countLetter with one-character substrings.", "Repeated, missing, and empty cases pass."],
      ["Build a new String", "Implement removeLetter without attempting to mutate text.", "Removal and unchanged cases pass."],
      ["Design an edge case", "Add one case involving the first or final character.", "Prediction and actual result are recorded."]
    ],
    checks: [
      ["count", "Repeated-letter count", "banana contains three a characters"],
      ["missing", "Missing target", "returns 0"],
      ["empty", "Empty String", "returns 0 or empty as specified"],
      ["remove", "Removal accumulator", "returns a new String without target characters"],
      ["student-test", "Original edge case", "prediction matches actual"]
    ],
    apTransfer: "Write a method body that returns a String containing only uppercase A characters from its parameter. State what the accumulator means after each iteration.",
    reflection: "How did the substring call determine the loop's safe final value?",
    paper: {
      title: "String method line-up",
      time: "15 min", materials: "Ten question cards in sleeves, one indexed reference sheet each",
      when: "after",
      prompt: "Everyone holds one card showing the same String and one question about it — a length, an indexOf, or a substring. Answer your own, then move around the room and answer everyone else's. You keep your indexed reference sheet; the goal is speed, not method.",
      evidenceNote: "Self-correcting by design: by the end every question has been answered by every student, and disagreements surface themselves."
    },
    home: {
      type: "practice", est: "25 min",
      task: "Finish CodingBat String-1. Then write, on paper and without an editor, one method that returns the number of times a given character appears in a String.",
      link: "https://codingbat.com/java/String-1",
      evidence: "Your handwritten method, copied in exactly as you wrote it on paper"
    },
    processing: {
      title: "Letter-frequency chart", time: "20 min",
      why: "Bar height makes a numeric accumulator observable and rewards method reuse.",
      prompt: "Plan one bar per alphabet letter whose height comes from countLetter. Identify where the standard-Java method can be reused unchanged.",
      status: "Prompt only until the optional Processing toolchain gate passes."
    }
  },
  {
    id: "u1l10", number: 10, unitLesson: 10, lessonType: "review",
    topic: "Review", title: "Retrieve, diagnose, target",
    outcome: "Diagnose Unit 1 gaps through mixed retrieval instead of rereading completed pages.",
    deliverable: "Unit1Review.java checks plus a named error pattern and next practice step",
    duration: "75 min", ap: "Topics 1.1–1.15 · Mixed retrieval",
    source: "Remixed from the full Unit 1 handout set and the current AP Classroom progress-check sequence.",
    download: "../downloads/unit1/u1l10-retrieval-review.zip",
    project: {
      runTarget: "Unit1Review", baseline: "The review starter compiles with six independent placeholder methods.",
      output: "0.0\n0\n0.0\n0\n\n0",
      files: [
        ["Unit1Review.java", "Edit selectively", "Repair only the skills your diagnostic identifies."],
        ["Unit1ReviewCheck.java", "Run in rounds", "Six topic checks, reported separately."],
        ["README.md", "Read and annotate", "Three-round review protocol and error categories."]
      ]
    },
    prediction: {
      prompt: "Rank these before running anything: expression tracing, random ranges, method calls, constructors/references, substring bounds, and String algorithms. Which two deserve the first check?",
      reveal: "There is no universal ranking. The useful answer predicts your own performance, then compares that prediction with check evidence."
    },
    model: {
      code: `error pattern: substring boundary
evidence: used <= length
next check: trace first and final legal i`,
      output: "A diagnosis names the reusable misconception and a targeted action—not merely the correct answer.",
      explanation: "Review is retrieval plus decision-making. Run one round, classify errors, then spend time only where the evidence points."
    },
    missions: [
      ["Round 1: predict", "Write expected outputs for all six methods without an editor.", "Every method has a committed prediction."],
      ["Round 2: check", "Run the check class and label each miss by topic.", "The report separates six skills."],
      ["Round 3: repair", "Repair the two weakest methods first and rerun.", "Those checks pass before unrelated polishing."],
      ["Choose next practice", "Name one AP Classroom or local practice target without copying secure content.", "The target names a skill and success condition."]
    ],
    checks: [
      ["division", "Numeric expression", "fractional average"],
      ["range", "Random-range arithmetic", "known sample maps to expected bucket"],
      ["method", "Method call", "distance from origin"],
      ["alias", "Reference mutation", "score visible through both aliases"],
      ["substring", "Substring boundary", "first word or whole String"],
      ["algorithm", "String traversal", "correct repeated-letter count"]
    ],
    apTransfer: "Write one mixed trace containing integer division, an object alias, and a substring call. Solve it on paper, then name the order in which you checked the three risks.",
    reflection: "Which error category appeared, what evidence exposed it, and what exact practice will show that it is repaired?",
    paper: {
      title: "Cold retrieval sheet",
      time: "20 min", materials: "Blank retrieval sheet, second pen colour",
      when: "before",
      prompt: "Blank page first. Write everything you can produce cold for all six Unit 1 skills — no notes, no editor, no Quick Reference. Then open your resources and correct yourself in a second colour. What you wrote in the first colour is the diagnosis; the second colour is the study list.",
      evidenceNote: "The useful evidence is what you could produce cold, not what you could produce with help."
    },
    home: {
      type: "practice", est: "30 min",
      task: "Work the AP Classroom topic questions assigned for your two weakest Unit 1 topics. Do not look anything up until you have committed an answer.",
      evidence: "Which two topics you chose and how many you missed in each"
    },
  },
  {
    id: "u1l11", number: 11, unitLesson: 11, lessonType: "assessment",
    topic: "Assessment", title: "Unit 1 test",
    outcome: "Demonstrate Unit 1 reasoning under AP-style conditions without executing code.",
    deliverable: "Unit 1 assessment submitted through the classroom system",
    duration: "75 min", ap: "Topics 1.1–1.15",
    source: "Local assessment blueprint; secure questions, student responses, and keys are not published here.",
    assessment: {
      scope: ["Primitive types, expressions, assignment, and casting", "Math methods and inclusive random ranges", "Method signatures, calls, and return values", "Classes, constructors, objects, and aliases", "String methods, bounds, equality, and one-pass algorithms"],
      conditions: ["Java Quick Reference available", "No compiler, Run button, or autocomplete", "Show trace work and preserve required headers", "Submit through the classroom system"]
    }
  }
];
