/* ============================================================
   EDIT THIS FILE to add content. Nothing else needs to change.

   TRANSLATIONS -> the table on translate.html
   TRAPS        -> the deck on traps.html

   Each trap: { id, title, unit, code, output, why }
   `output` is what the program actually prints (or the error).
   `why` may contain HTML.
   ============================================================ */

const TRANSLATIONS = [
  {
    was: "float x = 3.5;",
    now: "double x = 3.5;",
    why: "In real Java <code>3.5</code> is a <code>double</code> literal, so assigning it to a <code>float</code> is a compile error. AP uses <code>double</code> everywhere; <code>float</code> is not in the tested subset. This is the single most common first-week error for Processing students."
  },
  {
    was: "void draw() runs 60&times;/sec",
    now: "public static void main(String[] args)",
    why: "Runs once, top to bottom, then exits. Nothing repeats unless you write the loop yourself. There is no frame, no animation clock, and no <code>frameCount</code>."
  },
  {
    was: "Variable at the top of the sketch",
    now: "private instance variable",
    why: "There is no shared sketch scope. If a method needs a value, it either takes it as a parameter or reads a field of its own object through <code>this</code>."
  },
  {
    was: "void move() { }",
    now: "public void move() { }",
    why: "Access modifiers were optional in the PDE. Now they are graded: instance variables <code>private</code>, methods usually <code>public</code>. Free-response rubrics award points for this."
  },
  {
    same: true,
    was: "println(\"bounce: \" + bounce);",
    now: "System.out.println(\"bounce: \" + bounce);",
    why: "You already do this &mdash; there are 81 <code>println</code> calls across last year's sketches. Same method, longer name. What changes is that it is now your <em>only</em> output, not a debug aid alongside the canvas."
  },
  {
    was: "text(score, 10, 20);",
    now: "System.out.println(score);",
    why: "The canvas is gone, so everything a program has to say, it says in text. Learn <code>print</code> vs <code>println</code>, <code>\\n</code>, <code>\\t</code>, and how <code>+</code> switches between adding and concatenating."
  },
  {
    was: "random(10)",
    now: "(int)(Math.random() * 10)",
    why: "<code>Math.random()</code> returns a <code>double</code> in [0.0, 1.0). Scale it, then cast. The idiom for <em>a</em> to <em>b</em> inclusive is <code>(int)(Math.random() * (b - a + 1)) + a</code> &mdash; worth memorizing outright."
  },
  {
    was: "abs(x), sqrt(x), pow(x, 2)",
    now: "Math.abs(x), Math.sqrt(x), Math.pow(x, 2)",
    why: "Processing exposed these as bare functions. In Java they are static methods of the <code>Math</code> class, and only <code>abs</code>, <code>pow</code>, <code>sqrt</code>, and <code>random</code> are on the exam's Java Quick Reference."
  },
  {
    was: "split(line, ' ')",
    now: "line.split(\" \")",
    why: "Closer than you'd expect &mdash; same idea, but it's a method <em>on</em> the string rather than a function you pass the string to. <code>split</code> was added to the exam's Java Quick Reference in 2025 alongside file reading, so it is fair game."
  },
  {
    was: "String methods generally",
    now: "length, substring, indexOf, equals, compareTo, split",
    why: "That is the <strong>entire</strong> list on the Java Quick Reference. No <code>toUpperCase</code>, no <code>charAt</code>, no <code>trim</code>, no <code>contains</code>. Free-response Question 1 Part B is guaranteed to need some of these, so learn all six cold."
  },
  {
    was: "color c = color(255, 0, 0);",
    now: "no such type",
    why: "<code>color</code> is a Processing type that does not exist in Java. Neither do <code>PImage</code>, <code>PVector</code>, or <code>PFont</code>. Anywhere your old sketches used <code>color</code> as a parameter type, plain Java needs an <code>int</code> or a class you write yourself."
  },
  {
    was: "map(), constrain(), dist(), lerp()",
    now: "write it yourself",
    why: "All four were Processing conveniences. Rebuilding <code>constrain</code> and <code>dist</code> from scratch is a genuinely good exercise, and <code>dist</code> is just <code>Math.sqrt</code> on a sum of squares."
  },
  {
    was: "ArrayList&lt;Ball&gt; balls",
    now: "ArrayList&lt;Integer&gt; nums",
    why: "Same class you already used, harder cases. Wrapper types (<code>Integer</code>, <code>Double</code>) autobox, and <code>remove(i)</code> shifts every later element left while your loop counter keeps going up."
  },
  {
    was: "PVector p = new PVector(3, 4);",
    now: "your own class with x and y",
    why: "<code>PVector</code> is Processing's. Writing your own two-field class with a constructor and accessors is exactly the free-response question that shows up every year."
  },
  {
    was: "All classes in one sketch",
    now: "One public class per .java file",
    why: "The filename must match the public class name exactly, including capitalisation. <code>Ball.java</code> holds <code>public class Ball</code>. Get this wrong and it will not compile."
  },
  {
    was: "mousePressed(), keyPressed()",
    now: "no event callbacks",
    why: "Nothing calls your methods for you. If a method should run, some other line of code has to call it. This is a bigger mental shift than it sounds."
  },
  {
    was: "Hit Run, look at the screen",
    now: "Trace it on paper",
    why: "The exam is digital, but Bluebook has no compiler and no Run button. Reading code and predicting its output is the single most tested skill in the course."
  },
  {
    same: true,
    was: "int[] a = new int[5];",
    now: "int[] a = new int[5];",
    why: "Unchanged &mdash; along with <code>if</code>/<code>else</code>, <code>for</code>, <code>while</code>, <code>&amp;&amp;</code>, <code>||</code>, <code>%</code>, casting, and writing a class with a constructor. Most of what you learned transfers untouched."
  }
];

const TRAPS = [
  {
    id: 1, unit: "Unit 1", title: "Integer division",
    code: `int total = 7;
int people = 2;
double each = total / people;
System.out.println(each);`,
    output: "3.0",
    why: "Not 3.5. Both operands are <code>int</code>, so Java divides as integers and discards the remainder <em>before</em> the <code>double</code> on the left ever sees the value. In Processing your numbers were <code>float</code>, so you rarely met this. Fix: <code>(double) total / people</code>."
  },
  {
    id: 2, unit: "Unit 1", title: "Comparing strings",
    code: `String a = "cat";
String b = "cat";
String c = new String("cat");
System.out.println(a == b);
System.out.println(a == c);
System.out.println(a.equals(c));`,
    output: "true\nfalse\ntrue",
    why: "The first <code>true</code> is what makes this dangerous &mdash; it convinces you <code>==</code> works. It only worked because Java reuses identical string literals. <code>==</code> compares <em>references</em>; <code>.equals()</code> compares <em>characters</em>. Always use <code>.equals()</code> on strings."
  },
  {
    id: 3, unit: "Unit 1", title: "String immutability",
    code: `String s = "hello";
s.toUpperCase();
System.out.println(s);`,
    output: "hello",
    why: "Strings cannot be changed. Every <code>String</code> method <em>returns a new string</em> and leaves the original alone. You have to catch the result: <code>s = s.toUpperCase();</code>"
  },
  {
    id: 4, unit: "Unit 1", title: "substring's second argument",
    code: `String s = "computer";
System.out.println(s.substring(2, 5));`,
    output: "mpu",
    why: "Indices are <code>c</code>0 <code>o</code>1 <code>m</code>2 <code>p</code>3 <code>u</code>4 <code>t</code>5 <code>e</code>6 <code>r</code>7. The first index is included, the second is <strong>excluded</strong>. So you get 2, 3, 4 &mdash; three characters, not four. The length of the result is always <code>end - start</code>."
  },
  {
    id: 5, unit: "Unit 1", title: "The float literal",
    code: `float x = 3.5;
System.out.println(x);`,
    output: "will not compile",
    why: "<code>error: incompatible types: possible lossy conversion from double to float</code>. The literal <code>3.5</code> is a <code>double</code>, and Java will not silently narrow it. Processing hid this from you. Use <code>double x = 3.5;</code> &mdash; and note that <code>float</code> is not on the AP exam at all."
  },
  {
    id: 6, unit: "Unit 1", title: "Increment inside an expression",
    code: `int i = 5;
System.out.println(i++);
System.out.println(i);
System.out.println(++i);`,
    output: "5\n6\n7",
    why: "<code>i++</code> hands over the <em>old</em> value and then increments, so the first line prints 5 even though <code>i</code> is now 6. <code>++i</code> increments first, then hands over the new value. When in doubt, put the increment on its own line."
  },
  {
    id: 7, unit: "Unit 2", title: "Modulo with a smaller number",
    code: `System.out.println(7 % 2);
System.out.println(10 % 5);
System.out.println(5 % 8);`,
    output: "1\n0\n5",
    why: "The last one surprises people. 8 goes into 5 zero times with 5 left over, so the remainder is the whole thing. Any time <code>a &lt; b</code>, <code>a % b</code> is just <code>a</code>. Expect <code>%</code> several times on the exam."
  },
  {
    id: 8, unit: "Unit 2", title: "Short-circuit evaluation",
    code: `int x = 0;
if (x != 0 && 10 / x > 1) {
    System.out.println("big");
}
System.out.println("done");`,
    output: "done",
    why: "No divide-by-zero crash. <code>&amp;&amp;</code> stops as soon as the answer is settled &mdash; the left side is <code>false</code>, so the right side is never evaluated. This is a deliberate guarding pattern, and the exam tests whether you know the second half is skipped."
  },
  {
    id: 9, unit: "Unit 2", title: "Counting nested iterations",
    code: `int count = 0;
for (int i = 0; i < 4; i++) {
    for (int j = i; j < 4; j++) {
        count++;
    }
}
System.out.println(count);`,
    output: "10",
    why: "The inner loop starts at <code>i</code>, not 0, so it shrinks each pass: 4 + 3 + 2 + 1 = 10. Whenever the inner bound depends on the outer variable, write out the count for each row rather than guessing <code>n &times; n</code>."
  },
  {
    id: 10, unit: "Unit 2", title: "print versus println",
    code: `for (int i = 1; i <= 3; i++) {
    System.out.print(i + " ");
}
System.out.println("done");`,
    output: "1 2 3 done",
    why: "All on one line. <code>print</code> leaves the cursor where it is; <code>println</code> moves to the next line <em>after</em> printing. Multiple-choice answers often differ only in line breaks, so read the last two characters of every option carefully."
  },
  {
    id: 11, unit: "Unit 3", title: "Passing an object to a method",
    code: `public static void change(Person p) {
    p.setName("Bo");
    p = new Person("Cy");
    p.setName("Dee");
}

Person a = new Person("Al");
change(a);
System.out.println(a.getName());`,
    output: "Bo",
    why: "Two different things happen. <code>p.setName(\"Bo\")</code> reaches through the reference and changes the caller's object &mdash; that sticks. Then <code>p = new Person(\"Cy\")</code> points the <em>local</em> variable somewhere else; the caller's <code>a</code> is unaffected, so <code>\"Dee\"</code> lands on an object nobody else can see. You can change an object through a parameter, but you cannot swap which object the caller holds."
  },
  {
    id: 12, unit: "Unit 3", title: "Aliasing",
    code: `Person p1 = new Person("Rachel");
Person p2 = new Person("Elly");
p1 = p2;
p2.setName("Bozo");
System.out.println(p1.getName());
System.out.println(p2.getName());`,
    output: "Bozo\nBozo",
    why: "After <code>p1 = p2</code> there is only one object left in play &mdash; both names point at it, and \"Rachel\" is unreachable. Variables hold <em>references</em>, not objects. Step through this one in <a href=\"https://pythontutor.com/java.html\">Java Tutor</a> and watch the arrows move; it is worth ten minutes."
  },
  {
    id: 13, unit: "Unit 3", title: "static is shared",
    code: `public class Dog {
    private static int count = 0;
    private String name;
    public Dog(String n) { name = n; count++; }
    public static int getCount() { return count; }
}

new Dog("a");
new Dog("b");
new Dog("c");
System.out.println(Dog.getCount());`,
    output: "3",
    why: "There is exactly one <code>count</code> for the whole class, not one per dog, so every constructor call bumps the same variable. That is the whole idea of <code>static</code>: it belongs to the class, which is also why a static method cannot touch an instance variable &mdash; there is no particular object to read it from."
  },
  {
    id: 14, unit: "Unit 4", title: "The off-by-one",
    code: `int[] nums = {3, 7, 2};
for (int i = 0; i <= nums.length; i++) {
    System.out.println(nums[i]);
}`,
    output: "3\n7\n2\nArrayIndexOutOfBoundsException",
    why: "Prints all three values, then crashes. <code>nums.length</code> is 3, but the valid indices are 0, 1, 2 &mdash; there is no <code>nums[3]</code>. Array traversals use <code>&lt;</code>, never <code>&lt;=</code>. Note also that arrays use <code>.length</code> with no parentheses, strings use <code>.length()</code> with them, and <code>ArrayList</code> uses <code>.size()</code>."
  },
  {
    id: 15, unit: "Unit 4", title: "An array of objects starts empty",
    code: `String[] words = new String[3];
System.out.println(words[0]);
System.out.println(words[0].length());`,
    output: "null\nNullPointerException",
    why: "<code>new String[3]</code> makes room for three references and fills them with <code>null</code>. It does not make three strings. Printing <code>null</code> is fine; calling a method on it is not. An array of <code>int</code> would have filled with 0 instead &mdash; only object arrays start null."
  },
  {
    id: 16, unit: "Unit 4", title: "Removing while looping",
    code: `ArrayList<String> list = new ArrayList<String>();
list.add("a");
list.add("b");
list.add("b");
list.add("c");
for (int i = 0; i < list.size(); i++) {
    if (list.get(i).equals("b")) {
        list.remove(i);
    }
}
System.out.println(list);`,
    output: "[a, b, c]",
    why: "One <code>\"b\"</code> survives. Removing index 1 slides the second <code>\"b\"</code> down into slot 1, but <code>i</code> has already moved on to 2, so it is skipped. Either loop backwards, or do not increment <code>i</code> on the passes where you removed something."
  },
  {
    id: 17, unit: "Unit 4", title: "2D array dimensions",
    code: `int[][] grid = new int[3][5];
System.out.println(grid.length);
System.out.println(grid[0].length);`,
    output: "3\n5",
    why: "<code>grid.length</code> is the number of <strong>rows</strong> (3); <code>grid[0].length</code> is the number of <strong>columns</strong> in a row (5). Read <code>new int[3][5]</code> as \"3 rows of 5\". The standard traversal is <code>for (int r...) for (int c...) grid[r][c]</code> &mdash; row first, always."
  },
  {
    id: 18, unit: "Unit 4", title: "Tracing recursion",
    code: `public static String rev(String s) {
    if (s.length() == 0) {
        return "";
    }
    return rev(s.substring(1)) + s.substring(0, 1);
}

System.out.println(rev("abc"));`,
    output: "cba",
    why: "Work down to the base case, then build back up: <code>rev(\"abc\")</code> waits on <code>rev(\"bc\")</code>, which waits on <code>rev(\"c\")</code>, which waits on <code>rev(\"\")</code> &rarr; <code>\"\"</code>. Now unwind: <code>\"\" + \"c\"</code> &rarr; <code>\"c\"</code>, then <code>\"c\" + \"b\"</code> &rarr; <code>\"cb\"</code>, then <code>\"cb\" + \"a\"</code> &rarr; <code>\"cba\"</code>. Swapping the order to <code>s.substring(0,1) + rev(...)</code> would print <code>abc</code> instead &mdash; the order of the concatenation is the whole question. You will only ever be asked to <em>trace</em> recursion, never to write it."
  }
];

/* ============================================================
   Rendering. You should not need to edit below this line.
   ============================================================ */

const JAVA_KEYWORDS = /^(public|private|protected|static|final|abstract|class|interface|enum|extends|implements|new|return|if|else|for|while|do|switch|case|default|break|continue|void|int|double|boolean|char|long|float|short|byte|true|false|null|this|super|import|package|throws|throw|try|catch|finally|instanceof)$/;

function highlight(src) {
  const escaped = src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const token = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')|(\b\d+\.?\d*\b)|(\b[A-Za-z_]\w*\b)/g;
  return escaped.replace(token, (match, comment, str, chr, num, word) => {
    if (comment) return '<span class="c">' + comment + "</span>";
    if (str || chr) return '<span class="s">' + (str || chr) + "</span>";
    if (num) return '<span class="n">' + num + "</span>";
    if (word) {
      if (JAVA_KEYWORDS.test(word)) return '<span class="k">' + word + "</span>";
      if (/^[A-Z]/.test(word)) return '<span class="t">' + word + "</span>";
    }
    return match;
  });
}

function escapeText(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderTranslations(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = TRANSLATIONS.map((row) => `
    <tr${row.same ? ' class="same"' : ""}>
      <td class="was"><code>${row.was}</code></td>
      <td class="now"><code>${row.now}</code></td>
      <td class="why">${row.why}</td>
    </tr>`).join("");
}

function renderTraps(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = TRAPS.map((trap) => `
    <article class="trap">
      <div class="trap-head">
        <span class="eyebrow">Trap ${String(trap.id).padStart(2, "0")}</span>
        <h3>${trap.title}</h3>
        <span class="tag" style="margin-left:auto">${trap.unit}</span>
      </div>
      <pre>${highlight(trap.code)}</pre>
      <button class="reveal-btn" type="button" aria-expanded="false" aria-controls="answer-${trap.id}">Show answer</button>
      <div class="answer" id="answer-${trap.id}" hidden>
        <p style="margin-bottom:0.5rem">Prints <span class="out">${escapeText(trap.output).replace(/\n/g, "</span> <span class='out'>")}</span></p>
        <p>${trap.why}</p>
      </div>
    </article>`).join("");

  mount.querySelectorAll(".reveal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = document.getElementById(btn.getAttribute("aria-controls"));
      const open = !answer.hidden;
      answer.hidden = open;
      btn.setAttribute("aria-expanded", String(!open));
      btn.textContent = open ? "Show answer" : "Hide answer";
    });
  });
}
