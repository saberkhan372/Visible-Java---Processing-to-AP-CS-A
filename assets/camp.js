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

  function initPoster() {
    const canvas = document.getElementById("camp-poster-canvas");
    const poster = canvas && canvas.closest(".camp-poster");
    const frameOutput = document.getElementById("camp-poster-frame");
    if (!canvas || !poster || !frameOutput) return;

    const context = canvas.getContext("2d");
    const consoleLines = Array.from(poster.querySelectorAll(".camp-poster-console-line"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["#65d9b8", "#6f9ab1", "#7b6a9d", "#d9ad59"];
    const nodes = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let lastTime = 0;
    let frame = 0;
    let visibleLineCount = -1;
    let inView = true;
    const startedAt = performance.now();

    function seedNodes() {
      nodes.length = 0;
      const count = width < 520 ? 15 : 21;
      for (let index = 0; index < count; index += 1) {
        const direction = index % 2 === 0 ? 1 : -1;
        nodes.push({
          x: width * (0.06 + ((index * 37) % 88) / 100),
          y: height * (0.09 + ((index * 53) % 82) / 100),
          vx: direction * (3.5 + (index % 5) * 1.4),
          vy: (index % 3 - 1) * (2.5 + (index % 4)),
          radius: Math.max(3, width * (0.0045 + (index % 4) * 0.0018)),
          color: colors[index % colors.length],
        });
      }
    }

    function resize() {
      const rect = poster.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(280, rect.width);
      height = Math.max(360, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seedNodes();
      draw();
    }

    function update(delta) {
      nodes.forEach(function (node) {
        node.x += node.vx * delta;
        node.y += node.vy * delta;

        const margin = node.radius + width * 0.025;
        if (node.x < margin || node.x > width - margin) node.vx *= -1;
        if (node.y < margin || node.y > height - margin) node.vy *= -1;
        node.x = Math.max(margin, Math.min(width - margin, node.x));
        node.y = Math.max(margin, Math.min(height - margin, node.y));
      });
    }

    function drawPerspectiveGrid() {
      const horizon = height * 0.49;
      context.strokeStyle = "rgba(101, 217, 184, 0.035)";
      context.lineWidth = 1;

      for (let index = -5; index <= 5; index += 1) {
        context.beginPath();
        context.moveTo(width * 0.5, horizon);
        context.lineTo(width * (0.5 + index * 0.16), height);
        context.stroke();
      }

      for (let index = 0; index < 8; index += 1) {
        const progress = index / 8;
        const y = horizon + Math.pow(progress, 1.7) * (height - horizon);
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      drawPerspectiveGrid();

      const connectionDistance = width * 0.16;
      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < connectionDistance) {
            context.globalAlpha = (1 - distance / connectionDistance) * 0.24;
            context.strokeStyle = a.color;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      nodes.forEach(function (node, index) {
        context.globalAlpha = index % 5 === 0 ? 0.2 : 0.43;
        context.fillStyle = node.color;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();

        context.globalAlpha = 0.09;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * 2.4, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
    }

    function updateConsole(time) {
      const cycle = (time - startedAt) % 8800;
      let count = 0;
      if (cycle >= 500 && cycle < 7600) {
        count = Math.min(consoleLines.length, 1 + Math.floor((cycle - 500) / 820));
      }
      if (cycle >= 4600 && cycle < 7600) count = consoleLines.length;
      if (count === visibleLineCount) return;
      visibleLineCount = count;
      consoleLines.forEach(function (line, index) {
        line.classList.toggle("is-visible", index < count);
      });
    }

    function animate(time) {
      if (!inView || document.hidden) {
        animationFrame = 0;
        return;
      }

      const delta = Math.min(0.04, Math.max(0, (time - lastTime) / 1000 || 0));
      lastTime = time;
      update(delta);
      draw();
      updateConsole(time);
      frame = (frame + 1) % 100000;
      frameOutput.textContent = String(frame).padStart(5, "0");
      animationFrame = window.requestAnimationFrame(animate);
    }

    function start() {
      if (reducedMotion || animationFrame || document.hidden || !inView) return;
      lastTime = performance.now();
      animationFrame = window.requestAnimationFrame(animate);
    }

    function stop() {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    if ("ResizeObserver" in window) {
      new ResizeObserver(resize).observe(poster);
    } else {
      window.addEventListener("resize", resize);
    }

    if ("IntersectionObserver" in window && !reducedMotion) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) start(); else stop();
      }, { rootMargin: "180px 0px" }).observe(poster);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    resize();
    if (reducedMotion) {
      poster.classList.add("is-reduced");
      consoleLines.forEach(function (line) { line.classList.add("is-visible"); });
    } else {
      start();
    }
  }

  function initForm() {
    const form = document.getElementById("camp-interest-form");
    const responseFrame = document.getElementById("camp-form-response");
    const status = document.getElementById("camp-form-status");
    const error = document.getElementById("camp-form-error");
    const thanks = document.getElementById("camp-form-thanks");
    const another = document.getElementById("camp-form-another");
    if (!form || !responseFrame || !status || !thanks || !another) return;

    const SEND_TIMEOUT = 12000;
    let submitted = false;
    let timeoutId = 0;

    function resetButton() {
      const button = form.querySelector('button[type="submit"]');
      button.disabled = false;
      button.textContent = "Join the interest list";
    }

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
      if (error) error.hidden = true;
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = "Sending…";
      status.textContent = "Sending your response…";

      // The response iframe is cross-origin, so a submission that never lands looks
      // identical to one still in flight. Give up after SEND_TIMEOUT and point at the
      // Google-hosted form rather than leaving the button stuck on "Sending…".
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(function () {
        if (!submitted) return;
        submitted = false;
        status.textContent = "";
        if (error) error.hidden = false;
        resetButton();
      }, SEND_TIMEOUT);
    });

    responseFrame.addEventListener("load", function () {
      if (!submitted) return;
      submitted = false;
      window.clearTimeout(timeoutId);
      form.reset();
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus();
      status.textContent = "";
      if (error) error.hidden = true;
      resetButton();
    });

    another.addEventListener("click", function () {
      thanks.hidden = true;
      form.hidden = false;
      const firstField = form.querySelector("input:not([type=hidden]), select, textarea");
      if (firstField) firstField.focus();
    });
  }

  initSketch();
  initPoster();
  initForm();
}());
