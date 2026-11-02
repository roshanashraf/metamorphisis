import {
  normalizeCompanionVariant,
  readCompanionVariant,
} from './companion-variant.ts';

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const ANCHOR_MODES = {
    hero: { x: 0.76, y: 0.27 },
    work: { x: 0.18, y: 0.42 },
    method: { x: 0.82, y: 0.44 },
    toolkit: { x: 0.62, y: 0.52 },
    faq: { x: 0.78, y: 0.58 },
    contact: { x: 0.72, y: 0.45 },
  };

  function anchorModeFor(el, index, total) {
    const explicit = el.getAttribute('data-guide-mode');
    if (explicit && ANCHOR_MODES[explicit]) return explicit;
    if (index === 0) return 'hero';
    if (index === total - 1) return 'contact';
    const middle = ['work', 'method', 'toolkit'];
    return middle[(index - 1) % middle.length];
  }

  function readTheme() {
    const root = getComputedStyle(document.documentElement);
    return {
      inkRgb: root.getPropertyValue('--color-home-ink-rgb').trim() || '10, 10, 10',
      inkSolid: root.getPropertyValue('--color-home-ink').trim() || '#0a0a0a',
      eyePaper: root.getPropertyValue('--color-home').trim() || '#fafafa',
    };
  }

export function mountCaseCompanion() {
    const mascot = document.querySelector('[data-case-companion]');
    const canvas = mascot?.querySelector('[data-companion-canvas]');
    const bubble = mascot?.querySelector('[data-guide-line]');
    if (!mascot || !canvas || !bubble) return () => {};

    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};

    const sections = [...document.querySelectorAll('[data-guide]')];
    if (!sections.length) return () => {};

    let theme = readTheme();
    const fallbackLine = mascot.getAttribute('data-default-line') || '';

    const state = {
      tick: 0,
      lastFrame: 0,
      pos: { x: window.innerWidth * 0.76, y: window.innerHeight * 0.27 },
      vel: { x: 0, y: 0 },
      pointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
      blinkAt: performance.now() + 2800,
      halfW: 66,
      halfH: 66,
      cvW: 132,
      cvH: 132,
      activeLine: '',
      variant: readCompanionVariant(),
      blocks: sections.map((el, index) => ({
        key: anchorModeFor(el, index, sections.length),
        el,
      })),
    };

    function clamp(v, lo, hi) {
      return Math.max(lo, Math.min(hi, v));
    }

    function isMobile() {
      if (window.innerWidth < 640) return true;
      return window.innerWidth <= 1024 && window.innerHeight > window.innerWidth;
    }

    function contentColumn() {
      const main = document.querySelector('main.home-shell');
      if (main) {
        const rect = main.getBoundingClientRect();
        return { left: rect.left, right: rect.right };
      }
      const pad = 52;
      return { left: pad, right: window.innerWidth - pad };
    }

    function keepInGutter(x, y) {
      const margin = 18;
      const bar = document.querySelector('.case-study-bar');
      const barBottom = bar ? bar.getBoundingClientRect().bottom : 0;
      const header = Math.max(80, barBottom);
      const col = contentColumn();
      const bodyPad = 48;
      const halfW = state.halfW;
      const halfH = state.halfH;

      const leftEdge = x - halfW;
      const rightEdge = x + halfW;
      const overCopy =
        window.innerWidth > 720 &&
        rightEdge > col.left + bodyPad &&
        leftEdge < col.right - bodyPad;

      if (overCopy) {
        const rightSlot = col.right + margin + halfW;
        const leftSlot = col.left - margin - halfW;
        if (rightSlot + halfW <= window.innerWidth - margin) x = rightSlot;
        else if (leftSlot - halfW >= margin) x = leftSlot;
        else x = window.innerWidth - margin - halfW;
      }

      x = clamp(x, margin + halfW, window.innerWidth - margin - halfW);
      y = clamp(y, header + halfH, window.innerHeight - margin - halfH);
      return { x, y };
    }

    function measureCompanion() {
      if (state.variant === 'roshan') {
        state.halfW = 28;
        state.halfH = 22;
        return;
      }
      state.halfW = mascot.offsetWidth / 2;
      state.halfH = mascot.offsetHeight / 2;
    }

    function setVariant(next) {
      next = normalizeCompanionVariant(next);
      state.variant = next;
      mascot.dataset.variant = state.variant;
      measureCompanion();
      drawMascot();
      applyPosition();
      startFrame();
    }

    function activeBlock() {
      const anchorY = window.innerHeight * 0.48;
      let winner = state.blocks[0];
      let score = Infinity;
      for (const block of state.blocks) {
        const rect = block.el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        const center = rect.top + rect.height * 0.42;
        const next = Math.abs(center - anchorY);
        if (next < score) {
          score = next;
          winner = block;
        }
      }
      return winner || state.blocks[0];
    }

    function idleFollowPoint(block) {
      let base = ANCHOR_MODES[block.key] || ANCHOR_MODES.hero;
      if (block.key === 'hero' && isMobile()) base = { x: 0.94, y: 0.115 };
      else if (isMobile() && block.key !== 'hero') base = { x: 0.94, y: 0.1 };

      let x = window.innerWidth * base.x;
      let y = window.innerHeight * base.y;

      if (block.el && block.key !== 'hero') {
        const rect = block.el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const mx = isMobile() ? 90 : 140;
          x = clamp(rect.left + rect.width * base.x, 120, window.innerWidth - mx);
          y = clamp(rect.top + rect.height * base.y, 130, window.innerHeight - 140);
        }
      }

      return { x, y };
    }

    function followTarget() {
      const block = activeBlock();
      let target = idleFollowPoint(block);

      const dx = state.pointer.x - target.x;
      const dy = state.pointer.y - target.y;
      const d = Math.hypot(dx, dy);
      if (d > 1 && d < 420) {
        target = { x: target.x + (dx / d) * 16, y: target.y + (dy / d) * 12 };
      }

      return keepInGutter(target.x, target.y);
    }

    function setLine(text) {
      const line = text || fallbackLine;
      if (line === state.activeLine) return;
      state.activeLine = line;
      bubble.textContent = line;
    }

    function setBubbleOpen(open) {
      bubble.hidden = !open;
      mascot.classList.toggle('is-open', open);
    }

    function syncLine() {
      const block = activeBlock();
      setLine(block.el.getAttribute('data-guide') || '');
    }

    function sphereDots(dots, cx, cy, radius, t, breathSpeed, count) {
      for (let i = 0; i < count; i += 1) {
        const z = 1 - (2 * i) / (count - 1);
        const slice = Math.sqrt(1 - z * z);
        const phase = i * 2.399963 + t;
        const x3 = Math.cos(phase) * slice;
        const y3 = Math.sin(phase) * slice;
        const rotY = t * 0.9;
        const rotX = Math.sin(t * 0.42) * 0.34;
        const px = x3 * Math.cos(rotY) + z * Math.sin(rotY);
        const pz = -x3 * Math.sin(rotY) + z * Math.cos(rotY);
        const py = y3 * Math.cos(rotX) - pz * Math.sin(rotX);
        const depth = (pz + 1) / 2;
        const perspective = 0.68 + depth * 0.38;
        const breath = 1 + Math.sin(t * breathSpeed + i * 0.07) * 0.035;
        dots.push({
          gx: cx + px * radius * perspective * breath,
          gy: cy + py * radius * perspective * breath,
          r: 1 + depth * 2.25,
          alpha: 0.24 + depth * 0.68,
        });
      }
    }

    function drawEyes(cx, cy, radius) {
      const now = performance.now();
      let openness = 1;
      const untilBlink = state.blinkAt - now;
      if (untilBlink < 130 && untilBlink > -130) openness = Math.abs(untilBlink) / 130;
      if (untilBlink <= -130) state.blinkAt = now + 2600 + Math.random() * 3600;

      const dx = state.pointer.x - state.pos.x;
      const dy = state.pointer.y - state.pos.y;
      const dist = Math.max(1, Math.hypot(dx, dy));
      const lookX = (dx / dist) * Math.min(1, dist / 240) * radius * 0.16;
      const lookY = (dy / dist) * Math.min(1, dist / 240) * radius * 0.16;

      const eyeOffsetX = radius * 0.34;
      const eyeOffsetY = -radius * 0.18;
      const eyeR = radius * 0.2;

      for (const side of [-1, 1]) {
        const ex = cx + side * eyeOffsetX + lookX * 0.6;
        const ey = cy + eyeOffsetY + lookY * 0.6;
        if (openness < 0.12) {
          ctx.strokeStyle = theme.eyePaper;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(ex - eyeR * 0.9, ey);
          ctx.lineTo(ex + eyeR * 0.9, ey);
          ctx.stroke();
          continue;
        }
        ctx.save();
        ctx.translate(ex, ey);
        ctx.scale(1, Math.max(0.12, openness));
        ctx.fillStyle = theme.eyePaper;
        ctx.beginPath();
        ctx.arc(0, 0, eyeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = theme.inkSolid;
        ctx.beginPath();
        ctx.arc(lookX * 0.5, (lookY * 0.5) / Math.max(0.2, openness), eyeR * 0.46, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawMascot() {
      if (state.variant === 'roshan') {
        ctx.clearRect(0, 0, canvas.width || 1, canvas.height || 1);
        return;
      }

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (state.tick % 15 === 0) {
        const rect = canvas.getBoundingClientRect();
        state.cvW = rect.width || 132;
        state.cvH = rect.height || 132;
      }
      const w = Math.floor(state.cvW * dpr);
      const h = Math.floor(state.cvH * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const width = state.cvW;
      const height = state.cvH;
      const cx = width / 2;
      const cy = height / 2;
      const t = state.tick * 0.018;
      const radius = Math.min(width, height) * 0.33;
      const speed = Math.hypot(state.vel.x, state.vel.y);
      const squash = clamp(speed / 2400, 0, 1) * 0.2;
      const angle = Math.atan2(state.vel.y, state.vel.x);

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(cx, cy);
      if (squash > 0.015) {
        ctx.rotate(angle);
        ctx.scale(1 + squash, 1 - squash * 0.72);
        ctx.rotate(-angle);
      }
      ctx.translate(-cx, -cy);

      const dots = [];
      sphereDots(dots, cx, cy, radius, t, 1.6, 170);
      for (const d of dots) {
        ctx.fillStyle = `rgba(${theme.inkRgb},${d.alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.gx, d.gy, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = theme.inkSolid;
      const coreR = Math.max(8, radius * 0.16 + Math.sin(t * 2) * 1.1);
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      drawEyes(cx, cy, radius);
      ctx.restore();
    }

    function applyPosition() {
      mascot.style.setProperty('--companion-x', `${(state.pos.x - state.halfW).toFixed(1)}px`);
      mascot.style.setProperty('--companion-y', `${(state.pos.y - state.halfH).toFixed(1)}px`);
      mascot.classList.toggle('bubble-low', state.pos.y < 190);
    }

    let frame = 0;

    function stopFrame() {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function step(now) {
      state.tick += 1;
      const dt = clamp((now - state.lastFrame) / 1000, 0.001, 0.05);
      state.lastFrame = now;

      if (state.tick === 1) syncLine();

      const target = followTarget();
      if (state.tick <= 2) {
        state.pos.x = target.x;
        state.pos.y = target.y;
        state.vel.x = 0;
        state.vel.y = 0;
      }

      const k = 52;
      const c = 12.6;
      state.vel.x += (k * (target.x - state.pos.x) - c * state.vel.x) * dt;
      state.vel.y += (k * (target.y - state.pos.y) - c * state.vel.y) * dt;
      const vmax = 2800;
      const vlen = Math.hypot(state.vel.x, state.vel.y);
      if (vlen > vmax) {
        state.vel.x *= vmax / vlen;
        state.vel.y *= vmax / vlen;
      }
      state.pos.x += state.vel.x * dt;
      state.pos.y += state.vel.y * dt;

      if (state.tick % 120 === 0) {
        measureCompanion();
      }

      applyPosition();
      drawMascot();

      if (motionQuery.matches) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(step);
    }

    function startFrame() {
      if (frame) return;
      state.lastFrame = performance.now();
      frame = requestAnimationFrame(step);
    }

    function onScroll() {
      syncLine();
      startFrame();
    }

    function onPointerMove(event) {
      state.pointer.x = event.clientX;
      state.pointer.y = event.clientY;
      startFrame();
    }

    function onResize() {
      theme = readTheme();
      measureCompanion();
      syncLine();
      startFrame();
    }

    function onThemeChange() {
      theme = readTheme();
      drawMascot();
    }

    function onVariantChange(event) {
      const detail = event instanceof CustomEvent ? event.detail : readCompanionVariant();
      setVariant(detail);
    }

    function onMotionChange() {
      if (motionQuery.matches) {
        stopFrame();
        const target = followTarget();
        state.pos.x = target.x;
        state.pos.y = target.y;
        applyPosition();
        drawMascot();
      } else {
        startFrame();
      }
    }

    const observer = new IntersectionObserver(
      () => {
        syncLine();
        startFrame();
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: [0, 0.25, 0.5] },
    );
    for (const section of sections) observer.observe(section);

    syncLine();
    setVariant(readCompanionVariant());
    const start = followTarget();
    state.pos.x = start.x;
    state.pos.y = start.y;
    applyPosition();
    drawMascot();
    setBubbleOpen(false);
    startFrame();

    const body = mascot.querySelector('.case-companion__body');

    function onPointerIn() {
      setBubbleOpen(true);
    }

    function onPointerOut(event) {
      if (event.relatedTarget instanceof Node && mascot.contains(event.relatedTarget)) return;
      setBubbleOpen(false);
    }

    body?.addEventListener('pointerenter', onPointerIn);
    bubble.addEventListener('pointerenter', onPointerIn);
    mascot.addEventListener('pointerleave', onPointerOut);
    mascot.addEventListener('focusin', onPointerIn);
    mascot.addEventListener('focusout', onPointerOut);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('companion-variant', onVariantChange);
    window.addEventListener('theme-change', onThemeChange);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      observer.disconnect();
      body?.removeEventListener('pointerenter', onPointerIn);
      bubble.removeEventListener('pointerenter', onPointerIn);
      mascot.removeEventListener('pointerleave', onPointerOut);
      mascot.removeEventListener('focusin', onPointerIn);
      mascot.removeEventListener('focusout', onPointerOut);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('companion-variant', onVariantChange);
      window.removeEventListener('theme-change', onThemeChange);
      motionQuery.removeEventListener('change', onMotionChange);
      stopFrame();
      mascot.style.removeProperty('--companion-x');
      mascot.style.removeProperty('--companion-y');
    };
  }
