/* ============================================================
   LESSONS

   One object per class meeting. Fields:
     n        calendar meeting number
     unit     matches the unit pages
     topic    CED topic label shown as a chip
     title    lesson title
     concept  exam-legal explanation (HTML)
     viz      optional id from VIZ in snippets.js
     ap       { prompt, starter, solution }  — exam-form practice
     vp       { prompt, starter, solution }  — Java + Processing practice
     note     optional closing line

   A lesson may omit `ap`, `vp` or `viz`. Review and test days omit both.
   ============================================================ */

const LESSONS = [
  {
    n: 1, unit: "Unit 1", topic: "Orientation",
    title: "Leaving the PDE",
    concept: `A Java program is a <strong>class</strong>, saved in a file whose name matches the
      class exactly &mdash; <code>Greeting.java</code> holds <code>public class Greeting</code>.
      Execution begins at <code>public static void main(String[] args)</code> and runs top to
      bottom, once. Nothing repeats and nothing is called unless you call it. The Processing
      editor wrote all of that scaffolding for you; from now on you write it.`,
    viz: "hello",
    example: `public class Greeting {

  public static void main(String[] args) {
    System.out.println("Hello");
  }
}`,
    ap: {
      prompt: `Write a complete class called <code>Greeting</code> whose <code>main</code> prints
        your name on one line and your favourite Processing project on the next.`,
      starter: `public class Greeting {

  public static void main(String[] args) {
    // your code here
  }
}`,
      solution: `public class Greeting {

  public static void main(String[] args) {
    System.out.println("Jordan Lee");
    System.out.println("Weather visualizer");
  }
}`
    },
    vp: {
      prompt: `Take the same idea back to a canvas. Fill in <code>settings()</code> and
        <code>draw()</code> so the sketch opens a 400&times;200 window and draws your name at
        (20, 100). You will need <code>text()</code> and <code>textSize()</code>.`,
      starter: `import processing.core.PApplet;

public class GreetingSketch extends PApplet {

  public void settings() {
    // set the window size
  }

  public void draw() {
    background(255);
    // draw your name
  }

  public static void main(String[] args) {
    PApplet.main("GreetingSketch");
  }
}`,
      solution: `import processing.core.PApplet;

public class GreetingSketch extends PApplet {

  public void settings() {
    size(400, 200);
  }

  public void draw() {
    background(255);
    fill(0);
    textSize(24);
    text("Jordan Lee", 20, 100);
  }

  public static void main(String[] args) {
    PApplet.main("GreetingSketch");
  }
}`
    },
    note: `Notice the two files are the same shape. <code>main</code> is at the bottom of both;
      the only difference is whether a window opens.`
  },

  {
    n: 2, unit: "Unit 1", topic: "1.1–1.6",
    title: "Types, expressions and casting",
    concept: `Only three primitive types are tested: <code>int</code>, <code>double</code> and
      <code>boolean</code>. Java also has <code>float</code>, but it is outside the AP subset.
      <code>float x = 3.5;</code> does not compile because <code>3.5</code> is a
      <code>double</code> literal; <code>float x = 3.5f;</code> is valid Java, but AP work should
      use <code>double</code> instead.
      <strong>Integer division truncates:</strong> <code>7 / 2</code> is <code>3</code>, and it
      happens <em>before</em> the result is stored, so <code>double avg = 7 / 2;</code> is
      <code>3.0</code>. Cast one operand to fix it: <code>(double) 7 / 2</code>.`,
    example: `int total = 7;
int people = 2;

System.out.println(total / people);           // 3
System.out.println((double) total / people);  // 3.5`,
    ap: {
      prompt: `<code>average</code> is supposed to return the mean of three test scores but
        always returns a whole number. Fix it by changing exactly one line, then check that
        <code>average(90, 85, 84)</code> returns <code>86.333…</code> and not <code>86.0</code>.`,
      starter: `public class Scores {

  public static double average(int a, int b, int c) {
    double mean = (a + b + c) / 3;
    return mean;
  }

  public static void main(String[] args) {
    System.out.println(average(90, 85, 84));
  }
}`,
      solution: `public class Scores {

  public static double average(int a, int b, int c) {
    double mean = (a + b + c) / 3.0;   // 3.0 forces double division
    return mean;
  }

  public static void main(String[] args) {
    System.out.println(average(90, 85, 84));   // 86.33333333333333
  }
}`
    },
    vp: {
      prompt: `This sketch should draw a circle whose diameter is exactly one third of the
        window width, and grow smoothly as you widen the window. It jumps in steps instead.
        Find the integer division and fix it.`,
      starter: `import processing.core.PApplet;

public class ThirdCircle extends PApplet {

  public void settings() {
    size(400, 400);
  }

  public void draw() {
    background(255);
    int d = width / 3;
    circle(width / 2, height / 2, d);
  }

  public static void main(String[] args) {
    PApplet.main("ThirdCircle");
  }
}`,
      solution: `import processing.core.PApplet;

public class ThirdCircle extends PApplet {

  public void settings() {
    size(400, 400);
  }

  public void draw() {
    background(255);
    double d = width / 3.0;              // keep the fraction
    circle(width / 2f, height / 2f, (float) d);
  }

  public static void main(String[] args) {
    PApplet.main("ThirdCircle");
  }
}`
    },
    note: `Processing let you get away with this because almost everything was
      <code>float</code>. In AP Java the truncation is silent and it is on the exam most years.`
  },

  {
    n: 3, unit: "Unit 1", topic: "1.7, 1.8, 1.11",
    title: "Libraries, comments and the Math class",
    concept: `Java's library is huge; the exam's is tiny. Only four <code>Math</code> methods are
      on the Java Quick Reference: <code>abs</code>, <code>pow</code>, <code>sqrt</code> and
      <code>random</code>. They are <strong>static</strong>, so you call them on the class:
      <code>Math.sqrt(16)</code>.
      <code>Math.random()</code> returns a <code>double</code> in <code>[0.0, 1.0)</code>, so the
      idiom for an integer from <em>min</em> to <em>max</em> inclusive is
      <code>(int)(Math.random() * (max - min + 1)) + min</code>. Learn that shape by heart.
      A <strong>precondition</strong> is a comment stating what must be true for a method to work.`,
    viz: "random",
    example: `System.out.println(Math.sqrt(16));   // 4.0
System.out.println(Math.abs(-3));    // 3

int roll = (int)(Math.random() * 6) + 1;   // 1..6`,
    ap: {
      prompt: `Write <code>roll</code> so it returns a value from <code>min</code> to
        <code>max</code> inclusive, and state the precondition in the comment.`,
      starter: `public class Dice {

  /** Precondition: ??? */
  public static int roll(int min, int max) {
    return 0;
  }

  public static void main(String[] args) {
    for (int i = 0; i < 10; i++) {
      System.out.println(roll(1, 6));
    }
  }
}`,
      solution: `public class Dice {

  /** Precondition: min <= max */
  public static int roll(int min, int max) {
    return (int)(Math.random() * (max - min + 1)) + min;
  }

  public static void main(String[] args) {
    for (int i = 0; i < 10; i++) {
      System.out.println(roll(1, 6));
    }
  }
}`
    },
    vp: {
      prompt: `Scatter 30 circles at random positions using <strong>only</strong>
        <code>Math.random()</code> &mdash; not Processing's <code>random()</code>. Their
        diameters should vary between 10 and 40.`,
      starter: `import processing.core.PApplet;

public class Scatter extends PApplet {

  public void settings() {
    size(400, 400);
  }

  public void setup() {
    background(255);
    noLoop();
    for (int i = 0; i < 30; i++) {
      // place one circle
    }
  }

  public static void main(String[] args) {
    PApplet.main("Scatter");
  }
}`,
      solution: `import processing.core.PApplet;

public class Scatter extends PApplet {

  public void settings() {
    size(400, 400);
  }

  public void setup() {
    background(255);
    noLoop();
    for (int i = 0; i < 30; i++) {
      float x = (float)(Math.random() * width);
      float y = (float)(Math.random() * height);
      float d = (float)(Math.random() * 30) + 10;   // 10.0 up to, but not including, 40.0
      circle(x, y, d);
    }
  }

  public static void main(String[] args) {
    PApplet.main("Scatter");
  }
}`
    }
  },

  {
    n: 4, unit: "Unit 1", topic: "1.9–1.10",
    title: "Method signatures",
    concept: `A method's <strong>signature</strong> is its name plus the number, types and order
      of its parameters &mdash; not the return type and not the parameter names. Two methods in
      one class may share a name only if their signatures differ; that is
      <strong>overloading</strong>.
      On a free-response question the header is printed in the prompt: copy it exactly. Changing
      <code>int</code> to <code>double</code>, or swapping two parameters, loses the point even if
      the body is perfect.`,
    viz: "distance",
    example: `public static double area(double w, double h) {
  return w * h;
}

// signature: area(double, double)
// the return type is NOT part of it`,
    ap: {
      prompt: `Write both <code>distance</code> methods. The four-parameter version measures
        between two points; the two-parameter version measures from the origin and must
        <em>call</em> the other one rather than repeat the arithmetic.`,
      starter: `public class Geometry {

  public static double distance(double x1, double y1, double x2, double y2) {
    return 0.0;
  }

  public static double distance(double x, double y) {
    return 0.0;
  }

  public static void main(String[] args) {
    System.out.println(distance(0, 0, 3, 4));   // 5.0
    System.out.println(distance(3, 4));         // 5.0
  }
}`,
      solution: `public class Geometry {

  public static double distance(double x1, double y1, double x2, double y2) {
    double dx = x2 - x1;
    double dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public static double distance(double x, double y) {
    return distance(0, 0, x, y);   // reuse, don't repeat
  }

  public static void main(String[] args) {
    System.out.println(distance(0, 0, 3, 4));   // 5.0
    System.out.println(distance(3, 4));         // 5.0
  }
}`
    },
    vp: {
      prompt: `Pull the repeated drawing code out into a method
        <code>void petal(float x, float y, float size)</code> and call it four times to make a
        flower. The signature is given &mdash; match it exactly.`,
      starter: `import processing.core.PApplet;

public class Flower extends PApplet {

  public void settings() {
    size(400, 400);
  }

  public void draw() {
    background(255);
    // call petal() four times around (200, 200)
  }

  void petal(float x, float y, float size) {
    // draw one petal
  }

  public static void main(String[] args) {
    PApplet.main("Flower");
  }
}`,
      solution: `import processing.core.PApplet;

public class Flower extends PApplet {

  public void settings() {
    size(400, 400);
  }

  public void draw() {
    background(255);
    petal(200, 160, 60);
    petal(240, 200, 60);
    petal(200, 240, 60);
    petal(160, 200, 60);
  }

  void petal(float x, float y, float size) {
    fill(230, 120, 150);
    ellipse(x, y, size, size * 1.6f);
  }

  public static void main(String[] args) {
    PApplet.main("Flower");
  }
}`
    }
  },

  {
    n: 5, unit: "Unit 1", topic: "1.12–1.13",
    title: "Objects and constructors",
    concept: `A <strong>class</strong> is the blueprint; an <strong>object</strong> is one thing
      built from it. <code>new</code> builds it and runs the <strong>constructor</strong>, whose
      job is to give every instance variable a starting value. A constructor has the same name as
      the class and <em>no return type</em> &mdash; not even <code>void</code>.
      You did this in sketches. What is new is that the fields are <code>private</code> and the
      constructor takes its values as parameters instead of hard-coding them.`,
    viz: "class",
    example: `public class Player {

  private String name;

  public Player(String startName) {
    name = startName;
  }

  public String getName() { return name; }
}`,
    ap: {
      prompt: `Complete the <code>Player</code> class: two private fields, a constructor that
        sets both, and accessors. Then create two players in <code>main</code> and print
        their names. <strong>This scaffold is intentionally incomplete and will not compile
        until you add the fields and accessors.</strong>`,
      starter: `public class Player {

  // fields

  public Player(String startName, int startScore) {
    // initialise both fields
  }

  // accessors

  public static void main(String[] args) {
    Player a = new Player("Ada", 0);
    Player b = new Player("Grace", 12);
    System.out.println(a.getName() + " " + b.getScore());
  }
}`,
      solution: `public class Player {

  private String name;
  private int score;

  public Player(String startName, int startScore) {
    name = startName;
    score = startScore;
  }

  public String getName() { return name; }
  public int getScore() { return score; }

  public static void main(String[] args) {
    Player a = new Player("Ada", 0);
    Player b = new Player("Grace", 12);
    System.out.println(a.getName() + " " + b.getScore());   // Ada 12
  }
}`
    },
    vp: {
      prompt: `Give the sketch a <code>Ball</code> class with private fields and a constructor
        that takes a starting position. Create one in <code>setup()</code> and draw it in
        <code>draw()</code> using its accessors. <strong>This scaffold is intentionally
        incomplete; use the finished solution to check the required supporting class.</strong>`,
      starter: `import processing.core.PApplet;

public class OneBall extends PApplet {

  private Ball b;

  public void settings() { size(400, 400); }

  public void setup() {
    // create the ball
  }

  public void draw() {
    background(255);
    // move and draw it
  }

  public static void main(String[] args) { PApplet.main("OneBall"); }

  static class Ball {
    // fields, constructor, move(), accessors
  }
}`,
      solution: `import processing.core.PApplet;

public class OneBall extends PApplet {

  private Ball b;

  public void settings() { size(400, 400); }

  public void setup() {
    b = new Ball(200, 0);
  }

  public void draw() {
    background(255);
    b.move();
    circle((float) b.getX(), (float) b.getY(), 40);
  }

  public static void main(String[] args) { PApplet.main("OneBall"); }

  static class Ball {
    private double x;
    private double y;

    public Ball(double startX, double startY) {
      x = startX;
      y = startY;
    }

    public void move() { y = y + 2; }

    public double getX() { return x; }
    public double getY() { return y; }
  }
}`
    },
    note: `The <code>Ball</code> class is identical in both exercises. Only its audience changes
      &mdash; a canvas, or a <code>println</code>.`
  },

  {
    n: 6, unit: "Unit 1", topic: "1.14",
    title: "References and aliasing",
    concept: `An object variable does not hold the object. It holds a <strong>reference</strong>
      &mdash; the address of an object living somewhere else. So <code>b = a;</code> does not copy
      the object; it makes both names point at the <em>same</em> one, and a change through either
      name is visible through the other. That is <strong>aliasing</strong>.
      Primitives behave differently: <code>int y = x;</code> really does copy the value. This
      distinction is heavily tested and it is the most common wipeout for students coming from
      Processing.`,
    viz: "class",
    example: `Player a = new Player("Ada");
Player b = a;            // one object, two names

b.setName("Grace");
System.out.println(a.getName());   // Grace`,
    ap: {
      prompt: `Predict the two printed lines <em>before</em> you run this. Write your prediction
        down, then check. If you were wrong, step through it in
        <a href="https://pythontutor.com/java.html">Java Tutor</a> until the arrows make sense.`,
      starter: `public class Aliasing {

  public static void main(String[] args) {
    Player a = new Player("Ada", 0);
    Player b = new Player("Grace", 12);

    a = b;
    b.setScore(99);

    System.out.println(a.getName() + " " + a.getScore());
    System.out.println(b.getName() + " " + b.getScore());
  }

  static class Player {
    private String name;
    private int score;

    public Player(String startName, int startScore) {
      name = startName;
      score = startScore;
    }

    public String getName() { return name; }
    public int getScore() { return score; }
    public void setScore(int newScore) { score = newScore; }
  }
}`,
      solution: `// Both lines print:  Grace 99
//
// After  a = b;  the "Ada" object has no name pointing at it any more.
// There is only one object left, and a and b are two names for it,
// so setScore(99) is visible through both.`
    },
    vp: {
      prompt: `Make the aliasing visible. Create two <code>Ball</code> variables, point the
        second at the <em>same</em> object as the first, then move only through
        <code>b2</code>. Draw both. You should see one circle, not two &mdash; explain why in a
        comment.`,
      starter: `import processing.core.PApplet;

public class AliasSketch extends PApplet {

  private Ball b1;
  private Ball b2;

  public void settings() { size(400, 400); }

  public void setup() {
    b1 = new Ball(200, 0);
    // point b2 at the same object
  }

  public void draw() {
    background(255);
    // move through b2 only, then draw both
  }

  public static void main(String[] args) { PApplet.main("AliasSketch"); }

  static class Ball {
    private double x, y;
    public Ball(double sx, double sy) { x = sx; y = sy; }
    public void move() { y = y + 2; }
    public double getX() { return x; }
    public double getY() { return y; }
  }
}`,
      solution: `import processing.core.PApplet;

public class AliasSketch extends PApplet {

  private Ball b1;
  private Ball b2;

  public void settings() { size(400, 400); }

  public void setup() {
    b1 = new Ball(200, 0);
    b2 = b1;                 // same object, second name
  }

  public void draw() {
    background(255);
    b2.move();               // moves the one and only Ball

    fill(31, 122, 99);
    circle((float) b1.getX(), (float) b1.getY(), 50);
    fill(11, 85, 112);
    circle((float) b2.getX(), (float) b2.getY(), 25);
    // One position, so the small circle sits exactly on the big one:
    // b1 and b2 are the same object.
  }

  public static void main(String[] args) { PApplet.main("AliasSketch"); }

  static class Ball {
    private double x, y;
    public Ball(double sx, double sy) { x = sx; y = sy; }
    public void move() { y = y + 2; }
    public double getX() { return x; }
    public double getY() { return y; }
  }
}`
    },
    note: `Change <code>b2 = b1;</code> to <code>b2 = new Ball(200, 0);</code> and run it again.
      Two circles drift apart. That one line is the whole concept.`
  },

  {
    n: 7, unit: "Unit 1", topic: "1.15",
    title: "Strings I — length, substring, indexOf",
    concept: `Strings are <strong>immutable</strong>: every method returns a <em>new</em> string
      and leaves the original alone, so <code>s.toUpperCase();</code> on its own does nothing.
      Indices start at 0. <code>substring(from, to)</code> includes <code>from</code> and
      <strong>excludes</strong> <code>to</code>, so the result is always <code>to - from</code>
      characters long. <code>indexOf</code> returns the position of the first match, or
      <code>-1</code> if there is none &mdash; always check for <code>-1</code> before using it.`,
    viz: "strings",
    example: `String s = "computer";

System.out.println(s.length());          // 8
System.out.println(s.substring(2, 5));   // mpu
System.out.println(s.indexOf("put"));    // 3
System.out.println(s.indexOf("xyz"));    // -1`,
    ap: {
      prompt: `Write <code>firstWord</code>, which returns everything before the first space.
        If there is no space, return the whole string. Do not let it throw.`,
      starter: `public class Words {

  public static String firstWord(String s) {
    return "";
  }

  public static void main(String[] args) {
    System.out.println(firstWord("rain catcher game"));   // rain
    System.out.println(firstWord("solo"));                // solo
  }
}`,
      solution: `public class Words {

  public static String firstWord(String s) {
    int space = s.indexOf(" ");

    if (space == -1) {
      return s;
    }

    return s.substring(0, space);
  }

  public static void main(String[] args) {
    System.out.println(firstWord("rain catcher game"));   // rain
    System.out.println(firstWord("solo"));                // solo
  }
}`
    },
    vp: {
      prompt: `Type out a title one character at a time, the way an opening credit reveals.
        Use <code>substring</code> and a counter &mdash; no arrays.`,
      starter: `import processing.core.PApplet;

public class Typewriter extends PApplet {

  private String title = "AP Computer Science A";
  private int shown = 0;

  public void settings() { size(500, 200); }

  public void draw() {
    background(255);
    fill(0);
    textSize(28);
    // draw only the first 'shown' characters, then advance
  }

  public static void main(String[] args) { PApplet.main("Typewriter"); }
}`,
      solution: `import processing.core.PApplet;

public class Typewriter extends PApplet {

  private String title = "AP Computer Science A";
  private int shown = 0;
  private int frame = 0;

  public void settings() { size(500, 200); }

  public void draw() {
    background(255);
    fill(0);
    textSize(28);
    text(title.substring(0, shown), 20, 110);

    frame++;
    if (frame % 8 == 0 && shown < title.length()) {
      shown++;
    }
  }

  public static void main(String[] args) { PApplet.main("Typewriter"); }
}`
    },
    note: `<code>substring(0, shown)</code> is the same call the visualisation above is making.
      Watch the highlighted characters and the index row underneath.`
  },

  {
    n: 8, unit: "Unit 1", topic: "1.15 + Unit 4 preview",
    title: "Strings II — equals and compareTo",
    concept: `<strong>Never compare strings with <code>==</code>.</strong> It compares references,
      not characters, and it sometimes returns <code>true</code> by accident because Java reuses
      identical literals &mdash; which makes the bug worse, not better. Use
      <code>equals</code>.
      <code>compareTo</code> returns a negative number, zero, or a positive number depending on
      alphabetical order &mdash; you are asked about the <em>sign</em>, never the exact value.
      <code>split</code> and <code>Integer.parseInt</code> appear in the optional extension as a
      <strong>preview</strong>. The current CED formally places them in topics 4.6 and 4.7,
      when the course reads and parses file data.`,
    example: `String a = "cat";
String b = new String("cat");

System.out.println(a == b);        // false
System.out.println(a.equals(b));   // true

String[] parts = "12,7,30".split(",");`,
    ap: {
      prompt: `Write <code>countMatches</code>, which returns how many entries of
        <code>names</code> equal <code>target</code>. Then explain in a comment why
        <code>==</code> would be wrong here.`,
      starter: `public class Roster {

  public static int countMatches(String[] names, String target) {
    return 0;
  }

  public static void main(String[] args) {
    String[] names = {"Ada", "Grace", "Ada", "Alan"};
    System.out.println(countMatches(names, "Ada"));   // 2
  }
}`,
      solution: `public class Roster {

  public static int countMatches(String[] names, String target) {
    int count = 0;

    for (int i = 0; i < names.length; i++) {
      if (names[i].equals(target)) {
        count++;
      }
    }

    return count;
  }

  // == asks "are these the same object in memory?"  Two strings built
  // at different times can hold identical characters and still be
  // different objects, so == would sometimes miss a match.

  public static void main(String[] args) {
    String[] names = {"Ada", "Grace", "Ada", "Alan"};
    System.out.println(countMatches(names, "Ada"));   // 2
  }
}`
    },
    vp: {
      prompt: `<strong>Optional Unit 4 preview:</strong> Given one comma-separated line of
        numbers, split it and draw a bar for each value. This is the parsing you will study
        formally in topics 4.6 and 4.7 when the data comes from a file.`,
      starter: `import processing.core.PApplet;

public class BarLine extends PApplet {

  private String data = "12,7,30,5,18";

  public void settings() { size(400, 300); }

  public void setup() {
    background(255);
    noLoop();
    // split the line and draw one bar per value
  }

  public static void main(String[] args) { PApplet.main("BarLine"); }
}`,
      solution: `import processing.core.PApplet;

public class BarLine extends PApplet {

  private String data = "12,7,30,5,18";

  public void settings() { size(400, 300); }

  public void setup() {
    background(255);
    noLoop();

    String[] parts = data.split(",");
    fill(11, 85, 112);

    for (int i = 0; i < parts.length; i++) {
      int value = Integer.parseInt(parts[i]);
      rect(20 + i * 70, height - value * 8, 50, value * 8);
    }
  }

  public static void main(String[] args) { PApplet.main("BarLine"); }
}`
    }
  },

  {
    n: 9, unit: "Unit 1", topic: "1.15",
    title: "Strings III — string algorithms",
    concept: `Most string questions are one loop over the characters. The standard move is
      <code>s.substring(i, i + 1)</code> to pull out a single character as a one-character string
      &mdash; the CED names this pattern explicitly.
      Watch the loop bound: <code>i &lt; s.length()</code>, never <code>&lt;=</code>. And note
      that strings use <code>length()</code> with parentheses while arrays use
      <code>length</code> without &mdash; a favourite multiple-choice trap.`,
    viz: "strings",
    example: `int count = 0;

for (int i = 0; i < s.length(); i++) {
  if (s.substring(i, i + 1).equals("a")) {
    count++;
  }
}`,
    ap: {
      prompt: `Write <code>countLetter</code>, which returns how many times a one-character
        string appears. Then predict what <code>countLetter("banana", "a")</code> returns before
        running it.`,
      starter: `public class Letters {

  public static int countLetter(String s, String letter) {
    return 0;
  }

  public static void main(String[] args) {
    System.out.println(countLetter("banana", "a"));   // ?
  }
}`,
      solution: `public class Letters {

  public static int countLetter(String s, String letter) {
    int count = 0;

    for (int i = 0; i < s.length(); i++) {
      if (s.substring(i, i + 1).equals(letter)) {
        count++;
      }
    }

    return count;
  }

  public static void main(String[] args) {
    System.out.println(countLetter("banana", "a"));   // 3
  }
}`
    },
    vp: {
      prompt: `Draw a letter-frequency chart for a phrase: one bar per letter of the alphabet,
        height proportional to how often it appears. Reuse your <code>countLetter</code> method
        &mdash; do not write the counting logic twice.`,
      starter: `import processing.core.PApplet;

public class Frequency extends PApplet {

  private String phrase = "the quick brown fox jumps over the lazy dog";

  public void settings() { size(540, 300); }

  public void setup() {
    background(255);
    noLoop();
    String alphabet = "abcdefghijklmnopqrstuvwxyz";
    // one bar per letter
  }

  public int countLetter(String s, String letter) {
    return 0;
  }

  public static void main(String[] args) { PApplet.main("Frequency"); }
}`,
      solution: `import processing.core.PApplet;

public class Frequency extends PApplet {

  private String phrase = "the quick brown fox jumps over the lazy dog";

  public void settings() { size(540, 300); }

  public void setup() {
    background(255);
    noLoop();
    String alphabet = "abcdefghijklmnopqrstuvwxyz";
    fill(31, 122, 99);

    for (int i = 0; i < alphabet.length(); i++) {
      String letter = alphabet.substring(i, i + 1);
      int n = countLetter(phrase, letter);
      rect(15 + i * 20, height - 40 - n * 25, 14, n * 25);

      fill(120);
      text(letter, 18 + i * 20, height - 20);
      fill(31, 122, 99);
    }
  }

  public int countLetter(String s, String letter) {
    int count = 0;
    for (int i = 0; i < s.length(); i++) {
      if (s.substring(i, i + 1).equals(letter)) {
        count++;
      }
    }
    return count;
  }

  public static void main(String[] args) { PApplet.main("Frequency"); }
}`
    },
    note: `The <code>countLetter</code> method is byte-for-byte the same in both exercises. That
      is the point of the whole unit: one method, two audiences.`
  },

  {
    n: 10, unit: "Unit 1", topic: "Review",
    title: "Review and Progress Checks",
    concept: `Use the Unit 1 lesson summaries, remixed folder practice, and AP Classroom
      Progress Checks for Unit 1 Parts 1&ndash;3. Bring anything you got wrong to class &mdash;
      especially anything involving <code>substring</code> bounds or integer division.`
  },

  {
    n: 11, unit: "Unit 1", topic: "Assessment",
    title: "Unit 1 Test",
    concept: `Covers topics 1.1&ndash;1.15. Roughly half tracing and half writing. No compiler,
      no autocomplete &mdash; the same conditions as May.`
  }
];

/* ============================================================
   DAILY LESSON GUIDES

   These notes remix the course's existing Unit 1 handouts into a
   consistent web lesson. AP Java is the required path. Java + Processing
   remains an optional extension on instructional lesson pages.
   ============================================================ */

const LESSON_GUIDES = {
  1: {
    target: "I can create, save, compile, and run a complete Java class whose file name matches its public class.",
    warmup: `In Processing, what calls <code>setup()</code>? What calls <code>draw()</code>?
      Write your best explanation before opening an editor.`,
    source: "Remixed from the Processing-to-Java port project and existing first-day setup materials.",
    practice: `Before copying the starter, create <code>Greeting.java</code> yourself and type the
      class header and <code>main</code> signature from memory. Compile once with an intentional
      file-name mismatch, read the error, then fix it.`,
    exit: `Without looking back, write the exact header for <code>main</code> and explain why
      <code>Greeting.java</code> cannot contain <code>public class Welcome</code>.`
  },
  2: {
    target: "I can predict the type and value of a Java expression and prevent accidental integer division.",
    warmup: `Predict both values: <code>7 / 2</code> and <code>7 / 2.0</code>. Then explain which
      operand changes the operation.`,
    source: "Remixed from the Unit 1 numeric labs and the course's recurring integer-division diagnostics.",
    practice: `For each expression, write the result and its type before running it:
      <code>5 + 2 * 3</code>, <code>10 / 4</code>, <code>(double) 10 / 4</code>, and
      <code>(int) 3.9</code>.`,
    exit: `Why does <code>double average = 7 / 2;</code> store <code>3.0</code> rather than
      <code>3.5</code>? Give one legal correction.`
  },
  3: {
    target: "I can call Math methods and generate an inclusive random integer range from a stated precondition.",
    warmup: `Processing's <code>random(1, 7)</code> can produce decimals. Sketch the arithmetic
      needed to turn <code>Math.random()</code> into an integer from 1 through 6.`,
    source: "Remixed from the Point, Dice, random-range, and powers tasks in Unit 1 More Labs.",
    practice: `Write three expressions only: the distance between two one-dimensional values,
      a random integer from 20 through 25, and 3 raised to the fourth power.`,
    exit: `State the interval returned by <code>Math.random()</code>, then explain why the range
      formula contains <code>max - min + 1</code>.`
  },
  4: {
    target: "I can match a required method signature exactly and use overloading without duplicating an algorithm.",
    warmup: `Which parts belong to a method signature: return type, method name, parameter names,
      parameter types, parameter order?`,
    source: "Remixed from the M&M's Parameters handout and the Point-distance practice in Unit 1 More Labs.",
    practice: `Annotate the supplied <code>distance</code> headers: underline the method name,
      box each parameter type, and circle the call that delegates to the four-parameter version.`,
    exit: `Explain why Java can overload <code>distance(double, double)</code> and
      <code>distance(double, double, double, double)</code> but not two methods that differ only
      in return type.`
  },
  5: {
    target: "I can construct objects, initialize private instance variables, and use accessors to inspect state.",
    warmup: `A sketch contains <code>Ball b;</code> and later <code>b = new Ball(20, 30);</code>.
      Which line declares a reference, and which line constructs an object?`,
    source: "Remixed from the Point and Dice object labs plus the existing class-creation handouts.",
    practice: `Draw a box for each <code>Player</code> object in the worked example. Inside each
      box, record its field values immediately after construction.`,
    exit: `What is wrong with <code>public void Player(String name)</code> as a constructor?
      Name both errors in the idea.`
  },
  6: {
    target: "I can trace primitive copies and object aliases and predict which mutations are visible through each reference.",
    warmup: `After <code>int b = a;</code>, changing <code>b</code> does not change <code>a</code>.
      Predict whether the same is true after <code>Player b = a;</code>, and say why.`,
    source: "Remixed directly from M&M's Parameters: primitive values, immutable Strings, mutable objects, and pass-by-value tracing.",
    practice: `Draw the reference arrows for the starter after each of these lines:
      <code>Player a = ...</code>, <code>Player b = ...</code>, <code>a = b</code>, and
      <code>b.setScore(99)</code>. Cross out an object only when no reference reaches it.`,
    exit: `Java is pass-by-value. Explain how that statement can be true while a method is still
      able to mutate an object received as a parameter.`
  },
  7: {
    target: "I can calculate valid String indices and use length, substring, and indexOf without a bounds error.",
    warmup: `Write index numbers under every character in <code>AP CS A</code>. What is the last
      valid index, and how does it relate to <code>length()</code>?`,
    source: "Remixed from String Activity and String Output Lineup, preserving their index-first tracing routine.",
    practice: `Use the String Output Lineup routine: predict ten calls on one shared String before
      running any code. For every <code>substring(from, to)</code>, mark the included and excluded
      boundaries on an index row.`,
    exit: `If <code>s.indexOf(" ")</code> returns <code>-1</code>, why must code check that result
      before calling <code>s.substring(0, space)</code>?`
  },
  8: {
    target: "I can compare String contents correctly and interpret the sign of compareTo.",
    warmup: `Predict all three results when <code>a</code> is a literal <code>"cat"</code> and
      <code>b</code> is <code>new String("cat")</code>: <code>a == b</code>,
      <code>a.equals(b)</code>, and <code>a.compareTo(b)</code>.`,
    source: "Remixed from String Activity, Unit 1 More Labs, and the comparison stations in String Four Corners.",
    practice: `Sort four supplied words by using only the sign of <code>compareTo</code>. Then use
      <code>equals</code> to explain why two separately constructed strings can still match.`,
    exit: `In one sentence each, explain the question answered by <code>==</code>,
      <code>equals</code>, and <code>compareTo</code>.`,
    preview: `The optional visual extension previews <code>split</code> and
      <code>Integer.parseInt</code>. Those are formally taught in Unit 4 topics 4.6 and 4.7.`
  },
  9: {
    target: "I can build a String algorithm by traversing one-character substrings with safe loop bounds.",
    warmup: `For a String of length 6, list every value taken by <code>i</code> in
      <code>for (int i = 0; i &lt; s.length(); i++)</code>. What substring extracts the character
      at each value?`,
    source: "Remixed from String Four Corners, String Activity, and the remove-all-letters and second-occurrence labs in Unit 1 More Labs.",
    practice: `Complete one Four Corners problem, then adapt the traversal to find the second
      occurrence of a letter. Test mentally with a letter at index 0, repeated letters, and no match.`,
    exit: `Why is <code>i &lt; s.length()</code> safe for
      <code>s.substring(i, i + 1)</code>, while <code>i &lt;= s.length()</code> is not?`
  },
  10: {
    target: "I can diagnose my Unit 1 gaps and choose targeted practice rather than rereading everything.",
    warmup: `On paper, rank these from strongest to weakest: expression tracing, method calls,
      constructors, aliases, substring bounds, and String algorithms.`,
    source: "Remixed from the complete Unit 1 handout set and the current AP Classroom progress-check sequence.",
    practice: `Use three rounds: trace five short expressions, repair two methods, then write one
      String algorithm without an editor. Record the error pattern for every missed item.`,
    exit: `Name the one Unit 1 skill that still costs you the most time and the exact practice
      you will complete before the assessment.`
  },
  11: {
    target: "I can demonstrate Unit 1 understanding under AP conditions without executing code.",
    warmup: `Before the assessment begins, write the three reminders you most need: one about
      integer division, one about references, and one about String bounds.`,
    source: "Assessment blueprint aligned to topics 1.1–1.15 and the current AP Java Quick Reference.",
    practice: `Assessment day: roughly half tracing and half code development. The Java Quick
      Reference is available; a compiler, autocomplete, and a Run button are not.`,
    exit: `After submitting, identify one response to revisit during the next retrieval cycle and
      explain the misconception—not merely the correct answer.`
  }
};

/* ============================================================
   Rendering. No need to edit below.
   ============================================================ */

function lessonExercise(kind, e, id, label, hint) {
  if (!e) return "";
  return `
    <div class="ex ex-${kind}">
      <div class="ex-bar"><span>${label}</span><span class="ex-hint">${hint}</span></div>
      <p class="ex-prompt">${e.prompt}</p>
      <div class="ex-code">
        <pre>${highlight(e.starter)}</pre>
        <button class="tri-copy" type="button" data-lesson="${id}" data-kind="${kind}"
                aria-live="polite" aria-label="Copy ${label.replace(/&middot;/g, "")} starter code">Copy</button>
      </div>
      <details class="ex-sol">
        <summary>Show a solution</summary>
        <pre>${highlight(e.solution)}</pre>
      </details>
    </div>`;
}

function lessonVisual(l) {
  if (!l.viz || typeof VIZ === "undefined" || !VIZ[l.viz]) return "";
  const label = VIZ[l.viz].label;
  return `
    <div class="lesson-viz">
      <div class="tri-bar">
        <span>${label}</span>
        <button class="viz-btn" type="button" data-viz="${l.viz}"
                aria-pressed="false" aria-label="Pause ${label} animation">Pause</button>
      </div>
      <canvas data-viz="${l.viz}" role="img"
              aria-label="Animated visualization: ${label}">Animated visualization: ${label}</canvas>
    </div>`;
}

function lessonWorkedExample(l) {
  if (!l.example) return "";
  return `
    <div class="worked-example">
      <div class="tri-bar"><span>Worked example &middot; read before you run</span></div>
      <pre>${highlight(l.example)}</pre>
    </div>`;
}

function bindLessonCopy(mount) {
  mount.querySelectorAll(".tri-copy[data-lesson]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const l = LESSONS.find(x => String(x.n) === btn.dataset.lesson);
      const code = l && l[btn.dataset.kind] ? l[btn.dataset.kind].starter : "";
      let ok = Boolean(code);
      try {
        if (ok) await navigator.clipboard.writeText(code);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = code; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e2) { ok = false; }
        document.body.removeChild(ta);
      }
      btn.textContent = ok ? "Copied" : "Press ⌘C";
      setTimeout(() => { btn.textContent = "Copy"; }, 1600);
    });
  });
}

function renderLessons(mountId, unitName) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const list = LESSONS.filter(l => l.unit === unitName);

  mount.innerHTML = list.map(l => `
    <article class="lesson" id="lesson-${l.n}">
      <div class="lesson-head">
        <span class="lesson-n">${l.n}</span>
        <div class="lesson-title">
          <span class="tag">${l.topic}</span>
          <h3>${l.title}</h3>
        </div>
      </div>
      <div class="lesson-body">
        <p class="lesson-concept">${l.concept}</p>
        ${lessonVisual(l)}
        ${lessonWorkedExample(l)}
        ${lessonExercise("ap", l.ap, l.n, "Exercise A &middot; AP Java", "console only — this is the exam form")}
        ${lessonExercise("vp", l.vp, l.n, "Exercise B &middot; Java + Processing", "optional visual extension")}
        ${l.note ? `<p class="lesson-note">${l.note}</p>` : ""}
      </div>
    </article>`).join("");

  bindLessonCopy(mount);
  if (typeof startVisuals === "function") startVisuals(mount);
}

function renderUnitOverview(mountId, unitName) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const list = LESSONS.filter(l => l.unit === unitName);

  mount.innerHTML = list.map(l => {
    const meeting = typeof MEETINGS !== "undefined" ? MEETINGS.find(m => m.n === l.n) : null;
    const guide = LESSON_GUIDES[l.n] || {};
    const file = `unit1/lesson-${String(l.n).padStart(2, "0")}.html`;
    const kind = l.n === 11 ? "assessment" : l.n === 10 ? "review" : "lesson";
    return `
      <a class="unit-lesson-card is-${kind}" href="${file}">
        <span class="unit-lesson-number">${String(l.n).padStart(2, "0")}</span>
        <span class="unit-lesson-date">${meeting ? `${meeting.date} · ${meeting.time}` : "Meeting " + l.n}</span>
        <span class="tag">${l.topic}</span>
        <h3>${l.title}</h3>
        <p>${guide.target || l.concept}</p>
        <span class="unit-lesson-action">Open ${kind} <span aria-hidden="true">→</span></span>
      </a>`;
  }).join("");
}

function renderLessonPage(mountId, lessonNumber) {
  const mount = document.getElementById(mountId);
  const l = LESSONS.find(item => item.n === Number(lessonNumber));
  if (!mount || !l) return;

  const guide = LESSON_GUIDES[l.n] || {};
  const meeting = typeof MEETINGS !== "undefined" ? MEETINGS.find(m => m.n === l.n) : null;
  const prev = l.n > 1 ? `lesson-${String(l.n - 1).padStart(2, "0")}.html` : "";
  const next = l.n < 11 ? `lesson-${String(l.n + 1).padStart(2, "0")}.html` : "";
  const meta = document.querySelector('meta[name="description"]');
  document.title = `Lesson ${l.n}: ${l.title} — AP Computer Science A`;
  if (meta) meta.content = guide.target || l.title;

  mount.innerHTML = `
    <section class="lesson-hero-section">
      <div class="wrap stack">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="../path.html">Units</a><span aria-hidden="true">/</span>
          <a href="../unit1.html">Unit 1</a><span aria-hidden="true">/</span>
          <span aria-current="page">Lesson ${l.n}</span>
        </nav>
        <span class="eyebrow">Unit 1 · Lesson ${String(l.n).padStart(2, "0")} · ${l.topic}</span>
        <h1>${l.title}</h1>
        <p class="lede">${guide.target || l.concept}</p>
        ${meeting ? `<div class="lesson-meta"><span>${meeting.date}</span><span>${meeting.rot}</span><span>${meeting.time}</span></div>` : ""}
      </div>
    </section>

    <section>
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>01</span> Start</div>
        <div class="lesson-stage stack">
          <h2>Predict before you run</h2>
          <div class="prompt-card"><p>${guide.warmup || "Write what you already know about today's idea."}</p></div>
          <p class="source-note">${guide.source || "Remixed from the course's Unit 1 materials."}</p>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>02</span> Learn</div>
        <div class="lesson-stage stack-lg">
          <div class="stack">
            <h2>Build the model</h2>
            <p class="lesson-concept">${l.concept}</p>
          </div>
          ${lessonVisual(l)}
          ${lessonWorkedExample(l)}
          ${l.note ? `<p class="lesson-note">${l.note}</p>` : ""}
        </div>
      </div>
    </section>

    <section>
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>03</span> Practice</div>
        <div class="lesson-stage stack-lg">
          <div class="stack">
            <h2>Work in AP Java</h2>
            <p>${guide.practice || "Trace the worked example, then complete the starter without changing its required method headers."}</p>
          </div>
          ${lessonExercise("ap", l.ap, l.n, "Required practice &middot; AP Java", "exam form — complete this first") || `
            <div class="prompt-card"><p>${guide.practice}</p></div>`}
          ${guide.preview ? `<div class="note"><p><strong>Scope note:</strong> ${guide.preview}</p></div>` : ""}
        </div>
      </div>
    </section>

    ${l.vp ? `
    <section>
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>04</span> Extend</div>
        <div class="lesson-stage">
          <details class="lesson-extension">
            <summary>
              <span>Optional · Java + Processing</span>
              Make the same idea visual
            </summary>
            <div class="lesson-extension-body">
              ${lessonExercise("vp", l.vp, l.n, "Optional extension &middot; Java + Processing", "open only after the AP Java practice")}
            </div>
          </details>
        </div>
      </div>
    </section>` : ""}

    <section>
      <div class="wrap lesson-stage-grid">
        <div class="lesson-stage-label"><span>${l.vp ? "05" : "04"}</span> Finish</div>
        <div class="lesson-stage stack">
          <h2>Exit ticket</h2>
          <div class="exit-ticket"><p>${guide.exit || "Explain today's key idea without using an editor."}</p></div>
          <nav class="lesson-pager" aria-label="Lesson navigation">
            ${prev ? `<a rel="prev" href="${prev}"><span aria-hidden="true">←</span> Lesson ${l.n - 1}</a>` : `<a href="../unit1.html"><span aria-hidden="true">←</span> Unit overview</a>`}
            <a href="../unit1.html">All Unit 1 lessons</a>
            ${next ? `<a rel="next" href="${next}">Lesson ${l.n + 1} <span aria-hidden="true">→</span></a>` : `<a href="../calendar.html">Full calendar <span aria-hidden="true">→</span></a>`}
          </nav>
        </div>
      </div>
    </section>`;

  bindLessonCopy(mount);
  if (typeof startVisuals === "function") startVisuals(mount);
}
