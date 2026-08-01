(function () {
  "use strict";

  function initSketch() {
    const canvas = document.getElementById("camp-sketch");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const objects = [];
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let lastTime = 0;

    function cssColor(name, fallback) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
    }

    function seedObjects() {
      objects.length = 0;
      const count = width < 480 ? 11 : 16;
      for (let index = 0; index < count; index += 1) {
        const angle = index * 2.39996;
        const speed = 16 + (index % 5) * 4;
        objects.push({
          x: width * (0.18 + ((index * 37) % 67) / 100),
          y: height * (0.18 + ((index * 53) % 65) / 100),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 5 + (index % 4) * 2,
          kind: index % 3,
        });
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(280, rect.width);
      height = Math.max(260, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seedObjects();
      draw();
    }

    function update(delta) {
      objects.forEach(function (object) {
        if (pointer.active) {
          const dx = pointer.x - object.x;
          const dy = pointer.y - object.y;
          const distance = Math.max(50, Math.hypot(dx, dy));
          const pull = 1100 / (distance * distance);
          object.vx += dx * pull * delta;
          object.vy += dy * pull * delta;
        }

        const speed = Math.hypot(object.vx, object.vy);
        if (speed > 54) {
          object.vx *= 54 / speed;
          object.vy *= 54 / speed;
        }

        object.x += object.vx * delta;
        object.y += object.vy * delta;

        if (object.x < object.radius || object.x > width - object.radius) {
          object.vx *= -1;
          object.x = Math.max(object.radius, Math.min(width - object.radius, object.x));
        }
        if (object.y < object.radius || object.y > height - object.radius) {
          object.vy *= -1;
          object.y = Math.max(object.radius, Math.min(height - object.radius, object.y));
        }
      });
    }

    function drawGrid(rule) {
      context.strokeStyle = rule;
      context.lineWidth = 1;
      const size = width < 480 ? 34 : 42;
      for (let x = size; x < width; x += size) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = size; y < height; y += size) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    }

    function draw() {
      const panel = cssColor("--panel", "#ffffff");
      const rule = cssColor("--rule-2", "#eaf0ee");
      const sketch = cssColor("--sketch", "#1f7a63");
      const consoleColor = cssColor("--console", "#0b5570");
      const plum = cssColor("--plum", "#6b4a8c");
      const ink3 = cssColor("--ink-3", "#6f7c79");
      const colors = [sketch, consoleColor, plum];

      context.clearRect(0, 0, width, height);
      context.fillStyle = panel;
      context.fillRect(0, 0, width, height);
      drawGrid(rule);

      for (let first = 0; first < objects.length; first += 1) {
        for (let second = first + 1; second < objects.length; second += 1) {
          const a = objects[first];
          const b = objects[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 92) {
            context.globalAlpha = (1 - distance / 92) * 0.42;
            context.strokeStyle = a.kind === b.kind ? colors[a.kind] : ink3;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;

      objects.forEach(function (object, index) {
        context.fillStyle = colors[object.kind];
        context.beginPath();
        context.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
        context.fill();

        if (index < 3 && width > 430) {
          context.fillStyle = ink3;
          context.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
          context.fillText(["state", "move()", "objects[]"][index], object.x + 13, object.y + 4);
        }
      });
    }

    function animate(time) {
      const delta = Math.min(0.034, Math.max(0, (time - lastTime) / 1000 || 0));
      lastTime = time;
      update(delta);
      draw();
      animationFrame = window.requestAnimationFrame(animate);
    }

    function updatePointer(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    canvas.addEventListener("pointermove", updatePointer);
    canvas.addEventListener("pointerleave", function () { pointer.active = false; });
    canvas.addEventListener("pointerdown", updatePointer);

    if ("ResizeObserver" in window) {
      new ResizeObserver(resize).observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    document.addEventListener("visibilitychange", function () {
      if (reducedMotion) return;
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
      } else {
        lastTime = performance.now();
        animationFrame = window.requestAnimationFrame(animate);
      }
    });

    resize();
    if (!reducedMotion) animationFrame = window.requestAnimationFrame(animate);
  }

  function initForm() {
    const form = document.getElementById("camp-interest-form");
    const responseFrame = document.getElementById("camp-form-response");
    const status = document.getElementById("camp-form-status");
    const thanks = document.getElementById("camp-form-thanks");
    const another = document.getElementById("camp-form-another");
    if (!form || !responseFrame || !status || !thanks || !another) return;

    let submitted = false;

    function validateChoiceGroup(group) {
      const choices = Array.from(group.querySelectorAll('input[type="checkbox"]'));
      const valid = choices.some(function (choice) { return choice.checked; });
      if (choices[0]) {
        choices[0].setCustomValidity(valid ? "" : "Choose at least one option.");
      }
      return valid;
    }

    document.querySelectorAll(".camp-choice-group[data-required]").forEach(function (group) {
      group.addEventListener("change", function () { validateChoiceGroup(group); });
    });

    form.addEventListener("submit", function (event) {
      let groupsValid = true;
      document.querySelectorAll(".camp-choice-group[data-required]").forEach(function (group) {
        if (!validateChoiceGroup(group)) groupsValid = false;
      });

      if (!groupsValid || !form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
      }

      submitted = true;
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = "Sending…";
      status.textContent = "Sending your response…";
    });

    responseFrame.addEventListener("load", function () {
      if (!submitted) return;
      submitted = false;
      form.reset();
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus();
      status.textContent = "";
      const button = form.querySelector('button[type="submit"]');
      button.disabled = false;
      button.textContent = "Join the interest list";
    });

    another.addEventListener("click", function () {
      thanks.hidden = true;
      form.hidden = false;
      form.querySelector("input").focus();
    });
  }

  initSketch();
  initForm();
}());
