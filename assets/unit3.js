/* Unit 3 workbook data. Projects are original remixes of the local class-writing
   handouts and labs; secure FRQs and assessment content remain in the LMS. */

var UNIT3_META = {
  slug: "unit3",
  name: "Unit 3",
  title: "Class Creation",
  dates: "11 Nov – 8 Jan",
  meetings: "13 meetings",
  topics: "3.1–3.9",
  weight: "10–18%",
  storageKey: "apcsa-workbook-v1"
};

function unit3Build(spec) {
  return {
    id: `u3l${spec.number}`, number: spec.number, unitLesson: spec.number - 22,
    lessonType: spec.lessonType || "build", topic: spec.topic, title: spec.title,
    outcome: spec.outcome, deliverable: spec.deliverable, duration: "75 min",
    ap: spec.ap, source: spec.source,
    download: spec.slug ? `../downloads/unit3/u3l${spec.number}-${spec.slug}.zip` : undefined,
    downloadLabel: spec.lessonType === "extended-lab" ? "verified lab project" : undefined,
    project: {
      heading: spec.projectHeading,
      runTarget: spec.runTarget || "",
      baseline: spec.baseline,
      output: spec.output,
      files: spec.files || [
        [`${spec.runTarget}.java`, "Edit and run", spec.fileRole],
        [`${spec.runTarget}Check.java`, "Read and run", "Executable behavior checks; do not edit."],
        ["README.md", "Read", "Offline directions and evidence criteria."]
      ]
    },
    prediction: { prompt: spec.predict, reveal: spec.reveal },
    model: { code: spec.modelCode, output: spec.modelOutput, explanation: spec.modelExplanation },
    missions: spec.missions,
    checks: spec.checks,
    apTransfer: spec.apTransfer,
    reflection: spec.reflection,
    processing: spec.processing
  };
}

var UNIT3_LESSONS = [
  unit3Build({
    number: 23, topic: "3.1–3.2", title: "Design the class boundary",
    outcome: "Separate an object's state and behavior from the code that uses it.",
    deliverable: "ClassDesign.java with all six responsibility checks passing",
    ap: "Abstraction · Program design", slug: "class-design", runTarget: "ClassDesign",
    source: "Remixed from the local UML Card, Duck, and GamePiece class-design handouts.",
    baseline: "The starter compiles and labels every responsibility as undecided.",
    output: "undecided\nundecided", fileRole: "Classify responsibilities before writing fields or methods.",
    predict: "A game has score, drawScore(), saveScore(), and readMouse(). Which two responsibilities belong inside a ScoreBoard class, and which belong to the user interface?",
    reveal: "The score state and score-changing behavior belong together. Drawing and mouse input belong at the boundary that talks to the user.",
    modelCode: `class ScoreBoard {
  private int score;

  public void addPoints(int amount) {
    score += amount;
  }
}`,
    modelOutput: "One class owns one coherent piece of state and the behavior that protects it.",
    modelExplanation: "A class boundary is a design decision. Put behavior beside the state it changes; keep screen, keyboard, and file concerns outside unless they define the object.",
    missions: [
      ["Run the baseline", "Record how the starter classifies two sample responsibilities.", "Both are undecided before implementation."],
      ["Classify state behavior", "Return model for responsibilities that store or change the object's own data.", "Field and update examples pass."],
      ["Classify boundary behavior", "Return interface for drawing, keyboard, or file-delivery work.", "All boundary examples pass."],
      ["Write a CRC note", "Name the class, its responsibilities, and one collaborator.", "The collaborator is another object, not a method."]
    ],
    checks: [["state", "State ownership", "field examples → model"], ["behavior", "Behavior ownership", "state-changing methods → model"], ["boundary", "Interface boundary", "drawing and input → interface"], ["crc", "CRC design note", "class, responsibilities, collaborator"]],
    apTransfer: "Design a class for a step tracker. List its private instance variables and public methods, then name one responsibility that should stay outside the class.",
    reflection: "Which responsibility was hardest to place, and what ownership rule resolved it?",
    processing: { title: "Split model from sketch", time: "15 min", why: "A familiar sketch makes the class boundary concrete.", prompt: "Choose one prior Processing sketch and circle the state/behavior that could move into one ordinary Java model class.", status: "Planning extension; no Processing code is required." }
  }),
  unit3Build({
    number: 24, topic: "3.3", title: "Build a class skeleton",
    outcome: "Declare a public class with private instance variables and observable public behavior.",
    deliverable: "GamePiece.java with all six structure and behavior checks passing",
    ap: "Class anatomy · Encapsulation", slug: "class-skeleton", runTarget: "GamePiece",
    source: "Remixed from the local GamePiece UML and Bicycle class-writing materials.",
    baseline: "The starter compiles with placeholder accessors.",
    output: "0,0", fileRole: "Complete private state, accessors, and movement behavior.",
    predict: "If x is public, what can client code do that a move method cannot validate or prevent?",
    reveal: "Client code can assign any value directly, bypassing every invariant the class intended to protect.",
    modelCode: `public class Point {
  private int x;

  public int getX() {
    return x;
  }
}`,
    modelOutput: "Client code observes state through a public method; it cannot assign the field directly.",
    modelExplanation: "The AP habit is simple and graded: instance variables private, behavior public when clients need it.",
    missions: [["Inspect the skeleton", "Mark the header, two fields, constructor, and methods.", "Every member has an explicit access modifier."], ["Protect state", "Declare x and y as private integers.", "Structure checks pass."], ["Expose behavior", "Implement getX, getY, and move.", "Positive and negative movement checks pass."], ["Test client access", "Explain why direct assignment is rejected.", "Your explanation names private access."]],
    checks: [["private", "Private fields", "x and y cannot be accessed directly"], ["accessors", "Accessor results", "constructor values returned"], ["move", "Movement behavior", "both coordinates update"], ["explain", "Encapsulation explanation", "names the protected invariant"]],
    apTransfer: "Write only the class header, two private fields, and accessor headers for a Book with title and pageCount.",
    reflection: "What can the class guarantee once its fields are private?"
  }),
  unit3Build({
    number: 25, topic: "3.4", title: "Construct a valid object",
    outcome: "Initialize every instance variable from constructor parameters while preserving a precondition.",
    deliverable: "Bicycle.java with all seven constructor checks passing",
    ap: "Constructors · Parameters · Preconditions", slug: "constructor-contracts", runTarget: "Bicycle",
    source: "Remixed from the imported Bicycle lab and class-practice handouts.",
    baseline: "The starter compiles, but the constructor ignores its parameters.",
    output: "unnamed @ 0", fileRole: "Initialize model, gear, and speed; preserve nonnegative speed.",
    predict: "A constructor parameter and field are both named speed. What does speed = speed assign, and what syntax identifies the field?",
    reveal: "It assigns the parameter to itself. this.speed names the instance variable owned by the new object.",
    modelCode: `public Bicycle(String model, int speed) {
  this.model = model;
  this.speed = Math.max(0, speed);
}`,
    modelOutput: "Every field is initialized, and invalid speed cannot enter the object's state.",
    modelExplanation: "A constructor establishes the object's first valid state. Use this when a parameter shadows a field.",
    missions: [["Run the broken object", "Record the ignored model and speed.", "Baseline is unnamed @ 0."], ["Initialize fields", "Use all three constructor parameters.", "Normal construction passes."], ["Preserve the precondition", "Clamp negative speed to zero.", "Negative-speed check passes."], ["Audit initialization", "Explain what value every field has after construction.", "No field is left accidental."]],
    checks: [["normal", "Normal construction", "model, gear, speed preserved"], ["negative", "Invalid speed", "stored as zero"], ["all-fields", "Every field initialized", "no default used accidentally"], ["this", "Shadowing explanation", "this identifies instance state"]],
    apTransfer: "Write a constructor for Song with private title, artist, and seconds fields. Assume seconds must be positive.",
    reflection: "Which constructor line establishes an invariant rather than merely copying data?"
  }),
  unit3Build({
    number: 26, topic: "3.4", title: "Overload without duplicating rules",
    outcome: "Write overloaded constructors that delegate to one complete initialization path.",
    deliverable: "Card.java with all six constructor checks passing",
    ap: "Overloaded constructors · this(...)", slug: "overloaded-constructors", runTarget: "Card",
    source: "Remixed from the UML Card handout; placed before Thanksgiving as consolidation.",
    baseline: "The two-argument constructor works; the one-argument constructor produces placeholder state.",
    output: "7 of hearts\n? of ?", fileRole: "Complete the convenience constructor by delegating.",
    predict: "Two constructors repeat the same validation. What bug appears when the rule changes in only one copy?",
    reveal: "Objects become valid or invalid depending on which constructor was called. Delegation keeps one source of truth.",
    modelCode: `public Card(String rank) {
  this(rank, "spades");
}`,
    modelOutput: "The shorter constructor chooses a default and reuses the complete constructor.",
    modelExplanation: "Overloading changes the parameter list, not the class name or return type. Constructor delegation must be the first statement.",
    missions: [["Compare paths", "Trace which fields each constructor initializes.", "The incomplete path is identified."], ["Delegate", "Use this(...) in the convenience constructor.", "Default-suit check passes."], ["Keep validation central", "Reject blank values in the complete constructor.", "Both entry paths share the rule."], ["Explain placement", "State why this(...) is first.", "Java's constructor rule is named."]],
    checks: [["full", "Complete constructor", "rank and suit retained"], ["default", "Convenience constructor", "default suit applied"], ["validation", "Shared validation", "blank input repaired"], ["delegation", "One initialization path", "no duplicated assignment block"]],
    apTransfer: "Write two constructors for a Timer: one accepts seconds; the other has no parameters and delegates with a default of 60.",
    reflection: "What duplicated rule did constructor delegation remove?"
  }),
  unit3Build({
    number: 27, topic: "3.5", title: "Return information, not output",
    outcome: "Write methods whose return values let client code make the next decision.",
    deliverable: "Elevator.java with all eight method checks passing",
    ap: "Method signatures · Return values", slug: "returning-methods", runTarget: "Elevator",
    source: "Remixed from Elevator Lab and the measured gap in value-returning methods.",
    baseline: "The elevator moves, but its query methods return placeholders.",
    output: "floor 1\nfalse", fileRole: "Complete state-changing and value-returning methods.",
    predict: "Why is a method that prints the current floor less reusable than one that returns an int?",
    reveal: "A returned int can be printed, compared, tested, or used in another calculation. Printed text can only be observed.",
    modelCode: `public boolean canMoveUp() {
  return floor < topFloor;
}`,
    modelOutput: "The method reports a fact without deciding how the client will use it.",
    modelExplanation: "A return type is a contract. Every reachable path must produce a compatible value.",
    missions: [["Run the baseline", "Observe which query lies.", "canMoveUp returns false on floor 1."], ["Return current state", "Implement getFloor.", "Initial and moved-floor checks pass."], ["Return a condition", "Implement canMoveUp and canMoveDown.", "Boundary checks pass."], ["Use the query", "Make moveUp respect canMoveUp.", "The elevator cannot cross the top floor."]],
    checks: [["getter", "Current floor", "initial and updated values"], ["queries", "Boundary queries", "top and bottom reported"], ["move", "Guarded movement", "never crosses bounds"], ["return", "Return-value use", "client can branch on result"]],
    apTransfer: "Write a public method isFull for a Theater whose private seatsTaken and capacity fields are ints.",
    reflection: "Where did returning a value make the client simpler?"
  }),
  unit3Build({
    number: 28, topic: "3.5", title: "Complete the public interface",
    outcome: "Implement accessors, a validated mutator, and toString as distinct contracts.",
    deliverable: "PasswordRule.java with all eight interface checks passing",
    ap: "Accessors · Mutators · toString", slug: "public-interface", runTarget: "PasswordRule",
    source: "Remixed from Password Validator Class and the local class-practice set.",
    baseline: "The object constructs, but its accessor, mutator, and text representation are unfinished.",
    output: "minimum 0\nunfinished", fileRole: "Complete a small, testable public interface.",
    predict: "Should setMinimumLength accept -4 because an int can store it? Separate Java's type rule from the class's validity rule.",
    reveal: "No. The type allows -4, but the class should enforce its own invariant, such as a minimum length of at least 1.",
    modelCode: `public void setMinimumLength(int value) {
  if (value >= 1) {
    minimumLength = value;
  }
}`,
    modelOutput: "Invalid input leaves the object in its previous valid state.",
    modelExplanation: "An accessor reports, a mutator controls change, and toString describes. Their names are less important than their contracts.",
    missions: [["Implement the accessor", "Return the stored minimum length.", "Constructor value is observable."], ["Guard the mutator", "Accept positive values and ignore invalid ones.", "Both change cases pass."], ["Describe the object", "Return the exact required text from toString.", "String check passes."], ["Separate responsibilities", "Explain why toString does not print.", "Return versus output is explicit."]],
    checks: [["accessor", "Accessor", "returns stored length"], ["mutator", "Validated mutator", "valid changes; invalid ignored"], ["string", "Text representation", "exact contract"], ["roles", "Method roles", "query, change, description distinguished"]],
    apTransfer: "For a Thermostat, write signatures for an accessor, a validated mutator, and toString. State the invariant the mutator protects.",
    reflection: "Which public method has the strongest responsibility for protecting the object?"
  }),
  unit3Build({
    number: 29, topic: "3.6", title: "Pass references with intent",
    outcome: "Predict when two variables refer to one object and control whether a method returns an alias.",
    deliverable: "PlayerRoster.java with all seven reference checks passing",
    ap: "Object references · Aliasing", slug: "reference-ownership", runTarget: "PlayerRoster",
    source: "Remixed from Tracing References, Changing People, and the earlier aliasing workbook.",
    baseline: "The roster returns its stored Player directly, so outside code can silently change team state.",
    output: "Mina: 10\nMina: 99",
    files: [["Player.java", "Read", "Mutable object used to expose aliasing."], ["PlayerRoster.java", "Edit and run", "Control reference ownership at the class boundary."], ["PlayerRosterCheck.java", "Read and run", "Seven aliasing and copy checks."], ["README.md", "Read", "Box-and-pointer trace and directions."]],
    predict: "If getCaptain returns the exact Player stored by the roster, what happens when client code calls setScore(99) on the returned reference?",
    reveal: "The roster's captain changes too. Both references point to the same Player object.",
    modelCode: `public Player getCaptainCopy() {
  return new Player(captain.getName(), captain.getScore());
}`,
    modelOutput: "The caller receives equal-looking state in a different object.",
    modelExplanation: "Passing or returning an object reference can share mutable state. Copy only when the contract requires independence.",
    missions: [["Trace the alias", "Draw roster.captain and the returned variable.", "Both arrows reach one object."], ["Reproduce mutation", "Run the unchanged baseline.", "Outside change appears inside roster."], ["Return a copy", "Implement getCaptainCopy.", "Copy-mutation check passes."], ["State the contract", "Choose alias or copy for two scenarios.", "The choice follows intended ownership."]],
    checks: [["alias", "Original alias", "shared mutation observed"], ["copy", "Independent copy", "outside mutation isolated"], ["state", "Copied state", "name and score preserved"], ["contract", "Ownership reasoning", "choice justified by specification"]],
    apTransfer: "A Team method getRoster returns an ArrayList field directly. Explain one possible consequence and describe a safer alternative without writing code.",
    reflection: "When is returning the original reference exactly the right contract?"
  }),
  unit3Build({
    number: 30, topic: "3.7", title: "Share state with static",
    outcome: "Distinguish one value per class from one value per object.",
    deliverable: "Ticket.java with all seven static-state checks passing",
    ap: "Class variables · static", slug: "static-state", runTarget: "Ticket",
    source: "Remixed from class-writing labs and the cohort's measured zero exposure to static state.",
    baseline: "Every Ticket receives the same placeholder id.",
    output: "0, 0\ncreated: 0", fileRole: "Assign unique ids using shared class state.",
    predict: "Three Ticket objects are created. How many copies of nextId exist if it is static, and how many if it is an instance variable?",
    reveal: "Static creates one shared nextId for the class. An instance field creates three separate copies, each starting from the same initial value.",
    modelCode: `private static int nextId = 1;
private int id;

public Ticket() {
  id = nextId;
  nextId++;
}`,
    modelOutput: "Each object keeps its own id while all constructors coordinate through one counter.",
    modelExplanation: "Static belongs to the class. Use it for genuinely shared facts, not merely to make instance access convenient.",
    missions: [["Observe the bug", "Create two tickets and compare ids.", "Both placeholder ids match."], ["Add shared state", "Declare and update nextId.", "Ids become sequential."], ["Count objects", "Implement getCreatedCount as a class method.", "Count tracks all instances."], ["Label ownership", "Mark each field class or instance.", "nextId shared; id individual."]],
    checks: [["unique", "Unique ids", "sequential across objects"], ["count", "Created count", "shared total"], ["instance", "Per-object id", "earlier id does not change"], ["ownership", "Ownership explanation", "class versus object stated"]],
    apTransfer: "Design fields for a LibraryBook where title differs per object but libraryName is shared. Include access modifiers and static where appropriate.",
    reflection: "What would break if id were static too?"
  }),
  unit3Build({
    number: 31, topic: "3.7", title: "Audit static method access",
    outcome: "Explain and repair code that confuses class context with object context.",
    deliverable: "CounterTools.java with all six access checks passing",
    ap: "Static methods · Instance context", slug: "static-access", runTarget: "CounterTools",
    source: "Remixed from static-method notes and retired PDE assumptions about globally available state.",
    baseline: "The starter compiles because the invalid access is replaced by a placeholder.",
    output: "0\n12", fileRole: "Choose instance or static context for each method.",
    predict: "Why can a static method read a static field but not an instance field without receiving or creating an object?",
    reveal: "A static call has a class but no particular instance. Java cannot know which object's field you mean.",
    modelCode: `public static int totalOf(CounterTools item) {
  return item.count;
}`,
    modelOutput: "The object reference makes the intended instance explicit.",
    modelExplanation: "Repair by changing the ownership contract, not by adding static everywhere. Ask whether the behavior logically belongs to an object or the class.",
    missions: [["Classify members", "Mark count instance and calls shared.", "Ownership labels match behavior."], ["Implement instance query", "Return this object's count.", "Two-object checks remain independent."], ["Implement static utility", "Accept an object parameter and read through it.", "Utility check passes."], ["Explain the compile error", "Write the missing-context reason.", "A particular instance is named."]],
    checks: [["independent", "Instance independence", "two counters differ"], ["shared", "Static call count", "one class total"], ["utility", "Static utility", "uses supplied object"], ["reason", "Access explanation", "no implicit this in static context"]],
    apTransfer: "Explain whether each should be static: Math.abs, a BankAccount getBalance method, and a BankAccount count of all accounts.",
    reflection: "Which repair was tempting but would have changed the program's meaning?"
  }),
  unit3Build({
    number: 32, topic: "3.8–3.9", title: "Resolve scope with this",
    outcome: "Trace name lookup across parameters, local variables, and instance variables.",
    deliverable: "HotelRoom.java with all eight scope checks passing",
    ap: "Scope · Access · this", slug: "scope-and-this", runTarget: "HotelRoom",
    source: "Remixed from ClassPractice—Hotel and the local UML class handouts.",
    baseline: "The starter constructs a room, but parameter shadowing leaves its number at zero.",
    output: "room 0: vacant", fileRole: "Repair shadowing and keep local calculations local.",
    predict: "Inside setNumber(int number), which declaration does bare number name? What does this.number name?",
    reveal: "Bare number names the nearest declaration—the parameter. this.number names the field of the current object.",
    modelCode: `public void setNumber(int number) {
  if (number > 0) {
    this.number = number;
  }
}`,
    modelOutput: "The parameter supplies a candidate; the field changes only when it is valid.",
    modelExplanation: "Scope determines which names are visible. this is useful when a nearer declaration shadows a field and when clarity matters.",
    missions: [["Reproduce shadowing", "Run the baseline and locate number = number.", "Room remains zero."], ["Repair with this", "Assign validated parameter to the field.", "Room number checks pass."], ["Keep locals local", "Calculate a display label without adding a field.", "No unnecessary state added."], ["Trace three names", "Label parameter, local, and field in one method.", "Each lifetime and owner is correct."]],
    checks: [["shadow", "Shadowing repair", "constructor number retained"], ["validation", "Field invariant", "invalid number ignored"], ["occupied", "Independent field", "occupancy changes"], ["scope", "Name trace", "parameter, local, field separated"]],
    apTransfer: "Trace what each occurrence of value means in a constructor with a private int value field, an int value parameter, and a local String valueText.",
    reflection: "When does this improve correctness, and when is it only a readability choice?"
  }),
  unit3Build({
    number: 33, lessonType: "review", topic: "FRQ Question 2", title: "Write a complete class under time",
    outcome: "Plan and handwrite a class that satisfies a six-part specification.",
    deliverable: "A timed class response plus self-scored evidence",
    ap: "FRQ Question 2 · Class design",
    source: "Original CupcakeMachine-style practice; secure or copyrighted question text stays in the classroom system.",
    projectHeading: "Open the writing packet", baseline: "Do not open a Java editor until the timed response is complete.",
    files: [["Prompt", "Read", "Class specification distributed in class."], ["Planning box", "Complete", "Fields, constructor, method contracts."], ["Scoring guide", "Use after time", "Evidence categories, not copied secure text."]],
    predict: "Before seeing code, list the six evidence categories a complete class response is likely to need.",
    reveal: "Class header, private fields, constructor, required method(s), correct algorithm/state change, and required return or observable result.",
    modelCode: `public class Meter {
  private int total;

  public Meter(int start) {
    total = start;
  }

  public int add(int amount) {
    total += amount;
    return total;
  }
}`,
    modelOutput: "The class is complete, encapsulated, and every required method returns or changes exactly what its contract promises.",
    modelExplanation: "Plan from nouns and verbs, then check the specification line by line. Extra accessors or toString do not replace required rubric evidence.",
    missions: [["Plan for three minutes", "List fields, constructor parameters, and methods.", "Every specification noun or verb has a home."], ["Write for twelve minutes", "Complete the class on paper without compiler help.", "No unresolved placeholder remains."], ["Self-score", "Highlight evidence category by category.", "Every claimed point has exact code evidence."], ["Revise once", "Fix the highest-value omission in a different color.", "Revision targets the contract, not cosmetics."]],
    checks: [["plan", "Complete plan", "fields, constructor, methods"], ["timed", "Timed response", "complete within the limit"], ["evidence", "Evidence mapping", "code cited for each category"], ["revision", "One targeted revision", "highest-value issue fixed"]],
    apTransfer: "Write a second constructor or method variation supplied by your teacher without using an editor. Annotate where each precondition is used.",
    reflection: "Which specification phrase was easiest to miss under time pressure?"
  }),
  unit3Build({
    number: 34, lessonType: "review", topic: "Re-entry + FRQ Q2", title: "Rebuild the class pattern from memory",
    outcome: "Retrieve the complete class pattern after break and apply it without notes.",
    deliverable: "Cold retrieval map, timed class response, and error classification",
    ap: "FRQ Question 2 · Retrieval",
    source: "Original StepTracker-style retrieval cycle aligned to Progress Checks 3.1–3.2.",
    projectHeading: "Open materials only after retrieval", baseline: "Start with blank paper. Notes are the check, not the prompt.",
    files: [["Blank paper", "Complete first", "Cold class template from memory."], ["FRQ-style prompt", "Time", "New class specification."], ["Unit notes", "Open last", "Correct omissions and classify them."]],
    predict: "From memory, write the order in which you will scan a class-writing prompt before writing any Java.",
    reveal: "Identify required fields, constructor inputs/initialization, each method's parameters and return type, then the state change or algorithm each method requires.",
    modelCode: `header → private fields → constructor
→ required method signatures
→ algorithm/state changes → returns`,
    modelOutput: "A fixed scan order reduces omissions even when the class context changes.",
    modelExplanation: "Retrieval after a long gap is diagnostic. The goal is not perfect recall; it is identifying exactly which link disappeared.",
    missions: [["Cold template", "Write a generic class skeleton with no notes.", "Header, field, constructor, method, return all appear."], ["Timed response", "Complete the new prompt.", "Response is syntactically complete."], ["Compare", "Use notes only after time.", "Every difference is marked."], ["Classify errors", "Label syntax, contract, state, or algorithm.", "One next-step drill is chosen."]],
    checks: [["template", "Cold class template", "all structural parts"], ["response", "Timed response", "complete Java"], ["compare", "Evidence comparison", "omissions marked"], ["next", "Targeted next step", "matches error category"]],
    apTransfer: "Explain why a response with perfect syntax can still lose most of its points. Give one concrete contract error.",
    reflection: "What survived the 21-day break, and what needs one more retrieval cycle?"
  }),
  {
    id: "u3l35", number: 35, unitLesson: 13, lessonType: "assessment",
    topic: "Assessment", title: "Unit 3 test",
    outcome: "Demonstrate class-design reasoning and complete-class writing without executing code.",
    deliverable: "Unit 3 assessment submitted through the classroom system",
    duration: "75 min", ap: "Topics 3.1–3.9",
    source: "Local assessment blueprint; secure questions and keys are not published on this site.",
    assessment: {
      scope: ["Abstraction and program design", "Private instance variables", "Constructors and overloaded constructors", "Methods with return values", "Object references", "static state and methods", "Scope, access, and this", "Complete class writing"],
      conditions: ["Java Quick Reference available", "No compiler or autocomplete", "Show planning and trace work", "Inheritance, extends, super, polymorphism, and interfaces are out of scope", "Submit through the classroom system"]
    }
  }
];

window.UNIT3_META = UNIT3_META;
window.UNIT3_LESSONS = UNIT3_LESSONS;
