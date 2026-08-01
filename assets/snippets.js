/* ============================================================
   THREE VIEWS OF THE SAME IDEA

   Every entry has three runnable versions:
     processing — paste into the Processing PDE, press Run
     papplet    — real Java, still visual (needs core.jar on the classpath)
     java       — AP-legal Java, console only

   Each is a COMPLETE program. Students should be able to copy any
   pane and have it run without edits.

   To add one: append an object. Nothing else changes.
   ============================================================ */

const SNIPPETS = [
  {
    id: "hello",
    unit: "Unit 1",
    title: "Saying something",
    note: "Start here. The only difference between the left and right panes is who is listening — the sketch console, or the terminal.",
    processing: `void setup() {
  println("Hello, world");
}`,
    papplet: `import processing.core.PApplet;

public class Hello extends PApplet {

  public void setup() {
    println("Hello, world");
  }

  public static void main(String[] args) {
    PApplet.main("Hello");
  }
}`,
    java: `public class Hello {

  public static void main(String[] args) {
    System.out.println("Hello, world");
  }
}`
  },

  {
    id: "moving-ball",
    unit: "Unit 1",
    title: "Something that moves",
    note: "The animation loop is the hardest habit to give up. In the right-hand pane nothing loops for you — <em>you</em> write the loop, and the ball's position becomes three lines of text.",
    processing: `float y = 0;

void setup() {
  size(400, 400);
}

void draw() {
  background(255);
  circle(200, y, 40);
  y = y + 2;
}`,
    papplet: `import processing.core.PApplet;

public class MovingBall extends PApplet {

  private float y = 0;

  public void settings() {
    size(400, 400);
  }

  public void draw() {
    background(255);
    circle(200, y, 40);
    y = y + 2;
  }

  public static void main(String[] args) {
    PApplet.main("MovingBall");
  }
}`,
    java: `public class MovingBall {

  public static void main(String[] args) {
    double y = 0;

    for (int frame = 0; frame < 5; frame++) {
      System.out.println("y = " + y);
      y = y + 2;
    }
  }
}`
  },

  {
    id: "random",
    unit: "Unit 1",
    title: "Rolling a die",
    note: "<code>random()</code> is Processing's. <code>Math.random()</code> returns a <code>double</code> from 0.0 up to (but not including) 1.0, so you scale it and cast. Memorise the AP idiom: <code>(int)(Math.random() * range) + min</code>.",
    processing: `void setup() {
  int roll = int(random(1, 7));
  println("You rolled " + roll);
}`,
    papplet: `import processing.core.PApplet;

public class DiceRoll extends PApplet {

  public void setup() {
    int roll = (int) random(1, 7);
    println("You rolled " + roll);
  }

  public static void main(String[] args) {
    PApplet.main("DiceRoll");
  }
}`,
    java: `public class DiceRoll {

  public static void main(String[] args) {
    int roll = (int)(Math.random() * 6) + 1;
    System.out.println("You rolled " + roll);
  }
}`
  },

  {
    id: "distance",
    unit: "Unit 1",
    title: "Distance between two points",
    note: "<code>dist()</code> does not exist outside Processing. Rebuilding it is two lines and it is the clearest example of a convenience function you have to earn back.",
    processing: `void setup() {
  float d = dist(0, 0, 3, 4);
  println(d);
}`,
    papplet: `import processing.core.PApplet;

public class Distance extends PApplet {

  public void setup() {
    float d = dist(0, 0, 3, 4);
    println(d);
  }

  public static void main(String[] args) {
    PApplet.main("Distance");
  }
}`,
    java: `public class Distance {

  public static double dist(double x1, double y1, double x2, double y2) {
    double dx = x2 - x1;
    double dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public static void main(String[] args) {
    System.out.println(dist(0, 0, 3, 4));
  }
}`
  },

  {
    id: "strings",
    unit: "Unit 1",
    title: "Taking a string apart",
    note: "You drew strings last year; you never opened one up. This example demonstrates all six String methods on the current Java Quick Reference. <code>split</code> is included as a Unit 4 preview; under the current exam specification, Question 1 Part B requires calls to String methods.",
    processing: `void setup() {
  String s = "Processing";
  println(s.length());
  println(s.substring(0, 4));
  println(s.indexOf("cess"));
  println(s.equals("processing"));
  println(s.compareTo("Python") < 0);
  String[] parts = "Processing,Java".split(",");
  println(parts[1]);
}`,
    papplet: `import processing.core.PApplet;

public class StringParts extends PApplet {

  public void setup() {
    String s = "Processing";
    println(s.length());
    println(s.substring(0, 4));
    println(s.indexOf("cess"));
    println(s.equals("processing"));
    println(s.compareTo("Python") < 0);
    String[] parts = "Processing,Java".split(",");
    println(parts[1]);
  }

  public static void main(String[] args) {
    PApplet.main("StringParts");
  }
}`,
    java: `public class StringParts {

  public static void main(String[] args) {
    String s = "Processing";

    System.out.println(s.length());          // 10
    System.out.println(s.substring(0, 4));   // Proc
    System.out.println(s.indexOf("cess"));   // 3
    System.out.println(s.equals("processing")); // false
    System.out.println(s.compareTo("Python") < 0); // true
    String[] parts = "Processing,Java".split(",");
    System.out.println(parts[1]);             // Java (Unit 4 preview)
  }
}`
  },

  {
    id: "class",
    unit: "Unit 3",
    title: "A class of your own",
    note: "Same class, three levels of formality. As you move right, the design becomes explicit: a class header, private fields, a constructor, and public behavior. Those are the structural pieces Question 2 scores; its remaining points come from the required method's header, algorithm, and return value.",
    processing: `Ball b;

void setup() {
  size(400, 400);
  b = new Ball(200, 0);
}

void draw() {
  background(255);
  b.move();
  circle(b.x, b.y, 40);
}

class Ball {
  float x;
  float y;

  Ball(float startX, float startY) {
    x = startX;
    y = startY;
  }

  void move() {
    y = y + 2;
  }
}`,
    papplet: `import processing.core.PApplet;

public class BallSketch extends PApplet {

  private Ball b;

  public void settings() {
    size(400, 400);
  }

  public void setup() {
    b = new Ball(200, 0);
  }

  public void draw() {
    background(255);
    b.move();
    circle((float) b.getX(), (float) b.getY(), 40);
  }

  public static void main(String[] args) {
    PApplet.main("BallSketch");
  }

  // In a real project this class lives in its own file, Ball.java
  static class Ball {
    private double x;
    private double y;

    public Ball(double startX, double startY) {
      x = startX;
      y = startY;
    }

    public void move() {
      y = y + 2;
    }

    public double getX() { return x; }
    public double getY() { return y; }
  }
}`,
    java: `public class Ball {

  private double x;
  private double y;

  public Ball(double startX, double startY) {
    x = startX;
    y = startY;
  }

  public void move() {
    y = y + 2;
  }

  public double getX() { return x; }
  public double getY() { return y; }

  public String toString() {
    return "Ball at (" + x + ", " + y + ")";
  }

  public static void main(String[] args) {
    Ball b = new Ball(200, 0);

    for (int i = 0; i < 3; i++) {
      b.move();
      System.out.println(b);
    }
  }
}`
  },

  {
    id: "array-objects",
    unit: "Unit 4A",
    title: "An array of objects",
    note: "You built worlds out of these. The only new idea on the right is that the traversal computes an <em>answer</em> instead of drawing a frame.",
    processing: `Ball[] balls = new Ball[5];

void setup() {
  size(400, 400);
  for (int i = 0; i < balls.length; i++) {
    balls[i] = new Ball(random(400), random(400));
  }
}

void draw() {
  background(255);
  for (int i = 0; i < balls.length; i++) {
    balls[i].move();
    circle(balls[i].x, balls[i].y, 20);
  }
}

class Ball {
  float x;
  float y;
  Ball(float startX, float startY) {
    x = startX;
    y = startY;
  }
  void move() {
    y = y + 2;
  }
}`,
    papplet: `import processing.core.PApplet;

public class BallField extends PApplet {

  private Ball[] balls = new Ball[5];

  public void settings() {
    size(400, 400);
  }

  public void setup() {
    for (int i = 0; i < balls.length; i++) {
      balls[i] = new Ball(random(400), random(400));
    }
  }

  public void draw() {
    background(255);
    for (int i = 0; i < balls.length; i++) {
      balls[i].move();
      circle((float) balls[i].getX(), (float) balls[i].getY(), 20);
    }
  }

  public static void main(String[] args) {
    PApplet.main("BallField");
  }

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
}`,
    java: `public class BallField {

  /** Returns how many balls are below the given line. */
  public static int countBelow(Ball[] balls, double line) {
    int count = 0;

    for (int i = 0; i < balls.length; i++) {
      if (balls[i].getY() > line) {
        count++;
      }
    }

    return count;
  }

  public static void main(String[] args) {
    Ball[] balls = new Ball[5];
    for (int i = 0; i < balls.length; i++) {
      balls[i] = new Ball(0, i * 50);
    }

    System.out.println(countBelow(balls, 100));
  }

  static class Ball {
    private double x;
    private double y;

    public Ball(double startX, double startY) {
      x = startX;
      y = startY;
    }

    public double getX() { return x; }
    public double getY() { return y; }
  }
}`
  },

  {
    id: "arraylist",
    unit: "Unit 4C",
    title: "A list that grows and shrinks",
    note: "Adding is easy in both. Removal is a high-value ArrayList hazard: <code>remove(i)</code> slides everything after <code>i</code> down one while a forward loop counter keeps going up. Question 3 is worth 5 points and requires students to use, analyze, and manipulate ArrayList data.",
    processing: `ArrayList<Integer> scores = new ArrayList<Integer>();

void setup() {
  scores.add(10);
  scores.add(0);
  scores.add(0);
  scores.add(7);

  // remove every zero
  for (int i = scores.size() - 1; i >= 0; i--) {
    if (scores.get(i) == 0) {
      scores.remove(i);
    }
  }

  println(scores);
}`,
    papplet: `import processing.core.PApplet;
import java.util.ArrayList;

public class ScoreList extends PApplet {

  public void setup() {
    ArrayList<Integer> scores = new ArrayList<Integer>();
    scores.add(10);
    scores.add(0);
    scores.add(0);
    scores.add(7);

    for (int i = scores.size() - 1; i >= 0; i--) {
      if (scores.get(i) == 0) {
        scores.remove(i);
      }
    }

    println(scores);
  }

  public static void main(String[] args) {
    PApplet.main("ScoreList");
  }
}`,
    java: `import java.util.ArrayList;

public class ScoreList {

  /** Removes every zero. Loops backwards so removal cannot skip an element. */
  public static void removeZeros(ArrayList<Integer> scores) {
    for (int i = scores.size() - 1; i >= 0; i--) {
      if (scores.get(i) == 0) {
        scores.remove(i);
      }
    }
  }

  public static void main(String[] args) {
    ArrayList<Integer> scores = new ArrayList<Integer>();
    scores.add(10);
    scores.add(0);
    scores.add(0);
    scores.add(7);

    removeZeros(scores);
    System.out.println(scores);   // [10, 7]
  }
}`
  },

  {
    id: "grid",
    unit: "Unit 4D",
    title: "A grid",
    note: "You have drawn a hundred grids with nested loops and pixel arithmetic. A 2D array is the same nested loop, except the grid now <em>holds</em> something instead of just being drawn. <code>col * 40</code> was your column index all along.",
    processing: `int cols = 4;
int rows = 3;

void setup() {
  size(400, 400);
}

void draw() {
  background(255);
  for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
      rect(col * 40, row * 40, 38, 38);
    }
  }
}`,
    papplet: `import processing.core.PApplet;

public class Grid extends PApplet {

  private int[][] grid = new int[3][4];

  public void settings() {
    size(400, 400);
  }

  public void setup() {
    for (int row = 0; row < grid.length; row++) {
      for (int col = 0; col < grid[0].length; col++) {
        grid[row][col] = row + col;
      }
    }
  }

  public void draw() {
    background(255);
    for (int row = 0; row < grid.length; row++) {
      for (int col = 0; col < grid[0].length; col++) {
        fill(grid[row][col] * 40);
        rect(col * 40, row * 40, 38, 38);
      }
    }
  }

  public static void main(String[] args) {
    PApplet.main("Grid");
  }
}`,
    java: `public class Grid {

  /** Returns the sum of one row of the grid. */
  public static int rowSum(int[][] grid, int row) {
    int sum = 0;

    for (int col = 0; col < grid[0].length; col++) {
      sum += grid[row][col];
    }

    return sum;
  }

  public static void main(String[] args) {
    int[][] grid = new int[3][4];

    for (int row = 0; row < grid.length; row++) {
      for (int col = 0; col < grid[0].length; col++) {
        grid[row][col] = row + col;
      }
    }

    System.out.println(grid.length);      // 3  rows
    System.out.println(grid[0].length);   // 4  columns
    System.out.println(rowSum(grid, 1));  // 1+2+3+4 = 10
  }
}`
  },

  {
    id: "files",
    unit: "Unit 4B",
    title: "Reading a file",
    note: "New to you <em>and</em> new to the course as of 2025. Processing hands you an array of lines; Java hands you a <code>Scanner</code> you have to drive. Save a file called <code>scores.txt</code> next to your program with a few numbers in it.",
    processing: `void setup() {
  String[] lines = loadStrings("scores.txt");

  int total = 0;
  for (int i = 0; i < lines.length; i++) {
    total += int(lines[i]);
  }

  println("Total: " + total);
}`,
    papplet: `import processing.core.PApplet;

public class ReadScores extends PApplet {

  public void setup() {
    String[] lines = loadStrings("scores.txt");

    int total = 0;
    for (int i = 0; i < lines.length; i++) {
      total += Integer.parseInt(lines[i].trim());
    }

    println("Total: " + total);
  }

  public static void main(String[] args) {
    PApplet.main("ReadScores");
  }
}`,
    java: `import java.io.File;
import java.util.Scanner;

public class ReadScores {

  public static void main(String[] args) throws Exception {
    Scanner input = new Scanner(new File("scores.txt"));

    int total = 0;
    while (input.hasNext()) {
      total += input.nextInt();
    }

    input.close();
    System.out.println("Total: " + total);
  }
}`
  }
];

/* ============================================================
   VISUALISATIONS

   One entry per snippet id. `draw(ctx, t, w, h, c)` is called ~30×/sec:
     ctx — 2D canvas context, already scaled for the display
     t   — frame counter, starts at 0 and resets when the viz loops
     w,h — logical width and height in CSS pixels
     c   — palette pulled from the stylesheet: c.ink, c.dim, c.line,
           c.sketch, c.console, c.plum, c.warn, c.panel

   Leave an id out and that snippet simply shows no canvas.
   ============================================================ */

const VIZ = {
  hello: {
    label: "The console",
    draw(ctx, t, w, h, c) {
      const msg = "Hello, world";
      const n = Math.min(msg.length, Math.floor(t / 4) % (msg.length + 14));
      ctx.font = "16px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim;
      ctx.fillText("> run", 20, 36);
      ctx.fillStyle = c.ink;
      ctx.fillText(msg.slice(0, n), 20, 66);
      if (Math.floor(t / 12) % 2 === 0) {
        ctx.fillRect(20 + ctx.measureText(msg.slice(0, n)).width + 2, 54, 8, 14);
      }
    }
  },

  "moving-ball": {
    label: "One ball, falling",
    draw(ctx, t, w, h, c) {
      const y = (t * 2) % (h + 40) - 20;
      ctx.fillStyle = c.sketch;
      ctx.beginPath();
      ctx.arc(w / 2, y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "13px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim;
      ctx.fillText("y = " + Math.round(y), 14, h - 14);
    }
  },

  random: {
    label: "One die",
    draw(ctx, t, w, h, c) {
      const step = Math.floor(t / 20);
      const roll = 1 + ((step * 7919) % 6);
      const s = 90, x = w / 2 - s / 2, y = h / 2 - s / 2 - 8;
      ctx.strokeStyle = c.line;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, s, s);
      const pips = {
        1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]],
        4: [[0, 0], [2, 0], [0, 2], [2, 2]],
        5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
        6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]]
      }[roll];
      ctx.fillStyle = c.plum;
      pips.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(x + 20 + px * 25, y + 20 + py * 25, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.font = "13px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim;
      ctx.fillText("roll = " + roll, 14, h - 14);
    }
  },

  distance: {
    label: "Two points",
    draw(ctx, t, w, h, c) {
      const cx = w / 2 - 40, cy = h / 2;
      const a = t / 40;
      const x2 = cx + Math.cos(a) * 70, y2 = cy + Math.sin(a) * 55;
      ctx.strokeStyle = c.line; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x2, y2); ctx.stroke();
      [[cx, cy, c.sketch], [x2, y2, c.console]].forEach(([px, py, col]) => {
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
      });
      const d = Math.sqrt((x2 - cx) ** 2 + (y2 - cy) ** 2);
      ctx.font = "13px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim;
      ctx.fillText("dist = " + d.toFixed(1), 14, h - 14);
    }
  },

  strings: {
    label: "substring(0, 4)",
    draw(ctx, t, w, h, c) {
      const s = "Processing";
      const end = 1 + (Math.floor(t / 25) % s.length);
      const cw = 24, x0 = w / 2 - (s.length * cw) / 2, y0 = h / 2 - 16;
      ctx.font = "17px ui-monospace, Menlo, monospace";
      for (let i = 0; i < s.length; i++) {
        const inside = i < end;
        ctx.fillStyle = inside ? c.console : "transparent";
        if (inside) ctx.fillRect(x0 + i * cw, y0 - 18, cw - 2, 26);
        ctx.fillStyle = inside ? c.panel : c.ink;
        ctx.fillText(s[i], x0 + i * cw + 5, y0);
        ctx.fillStyle = c.dim;
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.fillText(i, x0 + i * cw + 8, y0 + 20);
        ctx.font = "17px ui-monospace, Menlo, monospace";
      }
      ctx.font = "13px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim;
      ctx.fillText('substring(0, ' + end + ') → "' + s.slice(0, end) + '"', 14, h - 14);
    }
  },

  class: {
    label: "One object, with state",
    draw(ctx, t, w, h, c) {
      const y = (t * 2) % (h + 40) - 20;
      ctx.fillStyle = c.sketch;
      ctx.beginPath(); ctx.arc(w * 0.32, y, 18, 0, Math.PI * 2); ctx.fill();
      const bx = w * 0.55, by = 28;
      ctx.strokeStyle = c.line; ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, 120, 60);
      ctx.font = "11px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim; ctx.fillText("Ball", bx + 8, by + 17);
      ctx.fillStyle = c.ink;
      ctx.fillText("x = " + Math.round(w * 0.32), bx + 8, by + 36);
      ctx.fillText("y = " + Math.round(y), bx + 8, by + 52);
    }
  },

  "array-objects": {
    label: "Five objects in an array",
    draw(ctx, t, w, h, c) {
      const n = 5, line = h * 0.62;
      ctx.strokeStyle = c.line; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, line); ctx.lineTo(w, line); ctx.stroke();
      ctx.setLineDash([]);
      let below = 0;
      for (let i = 0; i < n; i++) {
        const y = ((t * (1 + i * 0.5)) % (h + 30)) - 15;
        if (y > line) below++;
        ctx.fillStyle = y > line ? c.warn : c.sketch;
        ctx.beginPath();
        ctx.arc((i + 0.5) * (w / n), y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.font = "13px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim;
      ctx.fillText("countBelow = " + below, 14, h - 14);
    }
  },

  arraylist: {
    label: "Removing while looping",
    draw(ctx, t, w, h, c) {
      const full = [10, 0, 0, 7];
      const stage = Math.floor(t / 45) % 3;
      const list = stage === 0 ? full : stage === 1 ? [10, 0, 7] : [10, 7];
      const bw = 54, x0 = w / 2 - (list.length * bw) / 2, y = h / 2 - 22;
      list.forEach((v, i) => {
        const zero = v === 0;
        ctx.fillStyle = zero ? c.warn : c.console;
        ctx.fillRect(x0 + i * bw, y, bw - 6, 44);
        ctx.fillStyle = c.panel;
        ctx.font = "16px ui-monospace, Menlo, monospace";
        ctx.fillText(String(v), x0 + i * bw + 18, y + 29);
        ctx.fillStyle = c.dim;
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.fillText(i, x0 + i * bw + 22, y + 58);
      });
      ctx.font = "13px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim;
      ctx.fillText("size() = " + list.length, 14, h - 14);
    }
  },

  grid: {
    label: "Row-major traversal",
    draw(ctx, t, w, h, c) {
      const rows = 3, cols = 4, s = 44;
      const x0 = w / 2 - (cols * s) / 2, y0 = h / 2 - (rows * s) / 2 - 6;
      const idx = Math.floor(t / 14) % (rows * cols);
      const cr = Math.floor(idx / cols), cc = idx % cols;
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          const on = r === cr && col === cc;
          ctx.fillStyle = on ? c.console : c.line;
          ctx.fillRect(x0 + col * s, y0 + r * s, s - 4, s - 4);
          ctx.fillStyle = on ? c.panel : c.dim;
          ctx.font = "12px ui-monospace, Menlo, monospace";
          ctx.fillText(r + col, x0 + col * s + 16, y0 + r * s + 26);
        }
      }
      ctx.font = "13px ui-monospace, Menlo, monospace";
      ctx.fillStyle = c.dim;
      ctx.fillText("grid[" + cr + "][" + cc + "]", 14, h - 14);
    }
  },

  files: {
    label: "Consuming a file",
    draw(ctx, t, w, h, c) {
      const vals = [12, 7, 30, 5];
      const upto = Math.floor(t / 35) % (vals.length + 1);
      const x0 = 28;
      ctx.font = "14px ui-monospace, Menlo, monospace";
      vals.forEach((v, i) => {
        const done = i < upto;
        ctx.fillStyle = done ? c.dim : c.ink;
        ctx.fillText((done ? "✓ " : "  ") + v, x0, 34 + i * 24);
      });
      const total = vals.slice(0, upto).reduce((a, b) => a + b, 0);
      ctx.fillStyle = c.console;
      ctx.font = "14px ui-monospace, Menlo, monospace";
      ctx.fillText("total = " + total, w * 0.52, 34 + Math.max(0, upto - 1) * 24);
      ctx.fillStyle = c.dim;
      ctx.font = "12px ui-monospace, Menlo, monospace";
      ctx.fillText(upto < vals.length ? "hasNext() → true" : "hasNext() → false", x0, h - 14);
    }
  }
};

/* ============================================================
   Rendering. No need to edit below.
   ============================================================ */

const SOURCE_VIEWS = [
  { key: "processing", label: "Processing", hint: "Paste into the PDE and press Run." },
  { key: "papplet", label: "Java + Processing", hint: "Real Java, still visual. Needs Processing's core.jar on the classpath." }
];

function palette(el) {
  const cs = getComputedStyle(el);
  const v = n => cs.getPropertyValue(n).trim();
  return {
    ink: v("--ink"), dim: v("--ink-3"), line: v("--rule"),
    sketch: v("--sketch"), console: v("--console"), plum: v("--plum"),
    warn: v("--warn"), panel: v("--panel")
  };
}

function renderSnippets(mountId, filter) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const list = filter ? SNIPPETS.filter(filter) : SNIPPETS;

  mount.innerHTML = list.map(s => {
    const v = VIZ[s.id];
    return `
    <article class="tri" id="ex-${s.id}">
      <div class="tri-head">
        <h3>${s.title}</h3>
        <span class="tag">${s.unit}</span>
      </div>
      <p class="tri-note">${s.note}</p>

      <div class="tri-main">
        ${v ? `
        <div class="tri-viz">
          <div class="tri-bar">
            <span>${v.label}</span>
            <button class="viz-btn" type="button" data-viz="${s.id}"
                    aria-pressed="false" aria-label="Pause ${v.label} animation">Pause</button>
          </div>
          <canvas data-viz="${s.id}" role="img"
                  aria-label="Animated visualization: ${v.label}">Animated visualization: ${v.label}</canvas>
        </div>` : ""}
        <div class="tri-code">
          <div class="tri-bar">
            <span>AP Java</span>
            <button class="tri-copy" type="button" data-code="${s.id}:java"
                    aria-live="polite" aria-label="Copy ${s.title} AP Java code">Copy</button>
          </div>
          <pre>${highlight(s.java)}</pre>
        </div>
      </div>

      <details class="tri-src">
        <summary>How you wrote this in Processing</summary>
        <div class="tri-tabs" role="tablist">
          ${SOURCE_VIEWS.map((sv, i) => `
            <button role="tab" id="tab-${s.id}-${sv.key}"
                    class="tri-tab${i === 0 ? " is-on" : ""}"
                    data-target="${s.id}" data-view="${sv.key}"
                    aria-controls="panel-${s.id}-${sv.key}"
                    aria-selected="${i === 0}" tabindex="${i === 0 ? "0" : "-1"}">${sv.label}</button>`).join("")}
        </div>
        ${SOURCE_VIEWS.map((sv, i) => `
          <div role="tabpanel" id="panel-${s.id}-${sv.key}"
               aria-labelledby="tab-${s.id}-${sv.key}"
               class="tri-pane${i === 0 ? " is-on" : ""}" data-target="${s.id}" data-view="${sv.key}"
               ${i === 0 ? "" : "hidden"}>
            <p class="tri-hint">${sv.hint}</p>
            <pre>${highlight(s[sv.key])}</pre>
            <button class="tri-copy" type="button" data-code="${s.id}:${sv.key}"
                    aria-live="polite" aria-label="Copy ${s.title} ${sv.label} code">Copy</button>
          </div>`).join("")}
      </details>
    </article>`;
  }).join("");

  const activateTab = (tab, moveFocus = false) => {
      const id = tab.dataset.target, view = tab.dataset.view;
      mount.querySelectorAll(`.tri-tab[data-target="${id}"]`).forEach(t => {
        const on = t.dataset.view === view;
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      mount.querySelectorAll(`.tri-pane[data-target="${id}"]`).forEach(p => {
        const on = p.dataset.view === view;
        p.classList.toggle("is-on", on);
        p.hidden = !on;
      });
      if (moveFocus) tab.focus();
  };

  mount.querySelectorAll(".tri-tab").forEach(tab => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", event => {
      const tabs = [...mount.querySelectorAll(`.tri-tab[data-target="${tab.dataset.target}"]`)];
      const current = tabs.indexOf(tab);
      let next = current;
      if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[next], true);
    });
  });

  mount.querySelectorAll(".tri-copy").forEach(btn => {
    btn.addEventListener("click", async () => {
      const [id, view] = btn.dataset.code.split(":");
      const code = SNIPPETS.find(x => x.id === id)[view];
      let ok = true;
      try {
        await navigator.clipboard.writeText(code);
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

  startVisuals(mount);
}

function startVisuals(mount) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = [];

  function paint(i) {
    if (!i.w) return;
    i.ctx.clearRect(0, 0, i.w, i.h);
    i.viz.draw(i.ctx, i.t, i.w, i.h, palette(i.cv));
  }

  mount.querySelectorAll("canvas[data-viz]").forEach(cv => {
    const id = cv.dataset.viz;
    // start mid-animation so the still frame is representative
    const item = { cv, ctx: cv.getContext("2d"), viz: VIZ[id], t: 28, on: !reduce, seen: true };
    items.push(item);

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = cv.clientWidth || 320, hh = 190;
      cv.width = w * dpr;
      cv.height = hh * dpr;
      cv.style.height = hh + "px";
      item.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      item.w = w;
      item.h = hh;
      paint(item);          // always leave a readable still frame
    };
    size();
    new ResizeObserver(size).observe(cv);
  });

  mount.querySelectorAll(".viz-btn").forEach(btn => {
    const item = items.find(i => i.cv.dataset.viz === btn.dataset.viz);
    if (!item) return;
    btn.textContent = item.on ? "Pause" : "Play";
    btn.setAttribute("aria-pressed", String(!item.on));
    btn.setAttribute("aria-label", `${item.on ? "Pause" : "Play"} ${item.viz.label} animation`);
    btn.addEventListener("click", () => {
      item.on = !item.on;
      btn.textContent = item.on ? "Pause" : "Play";
      btn.setAttribute("aria-pressed", String(!item.on));
      btn.setAttribute("aria-label", `${item.on ? "Pause" : "Play"} ${item.viz.label} animation`);
      if (item.on) paint(item);
    });
  });

  // Only animate what is on screen; still frames stay drawn either way.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const item = items.find(i => i.cv === e.target);
        if (!item) return;
        item.seen = e.isIntersecting;
        if (e.isIntersecting) paint(item);
      });
    }, { rootMargin: "120px" });
    items.forEach(i => io.observe(i.cv));
  }

  let last = 0;
  function frame(now) {
    if (now - last > 33) {
      last = now;
      items.forEach(i => {
        if (!i.seen || !i.on) return;
        i.t++;
        paint(i);
      });
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Expose for testing and for pages that want to step frames manually.
  return { items, paint };
}
