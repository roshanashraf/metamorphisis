const OPEN_DELAY = 120;
const MARK = 'data-case-index-target';

export function mountCaseIndex() {
  const nav = document.querySelector('[data-case-index]');
  if (!(nav instanceof HTMLElement)) return () => {};

  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const pairs = links.flatMap((link) => {
    const id = decodeURIComponent(link.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return [];
    target.setAttribute(MARK, '');
    return [{ link, target }];
  });

  if (!pairs.length) return () => {};

  let frame = 0;
  let openTimer = 0;
  let hovering = false;

  function setCurrent(id: string) {
    for (const pair of pairs) {
      if (pair.target.id === id) pair.link.setAttribute('aria-current', 'location');
      else pair.link.removeAttribute('aria-current');
    }
  }

  function marker() {
    const bar = document.querySelector('.case-study-bar');
    const barHeight = bar instanceof HTMLElement ? bar.offsetHeight : 0;
    return barHeight + 24;
  }

  function layoutTop(element: HTMLElement) {
    let top = 0;
    let node: HTMLElement | null = element;
    while (node) {
      top += node.offsetTop;
      node = node.offsetParent instanceof HTMLElement ? node.offsetParent : null;
    }
    return top;
  }

  function scrollToSection(target: HTMLElement, behavior: ScrollBehavior) {
    const top = layoutTop(target) - marker();
    window.scrollTo({ top: Math.max(0, top), behavior });
  }

  function pick() {
    const atEnd =
      window.scrollY > 0 &&
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atEnd) {
      setCurrent(pairs[pairs.length - 1].target.id);
      return;
    }

    const line = marker() + 2;
    let current = pairs[0];
    for (const pair of pairs) {
      if (pair.target.getBoundingClientRect().top <= line) current = pair;
    }
    setCurrent(current.target.id);
  }

  function onScroll() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(pick);
  }

  function open() {
    nav.classList.add('is-open');
  }

  function close() {
    nav.classList.remove('is-open');
  }

  function focusedInside() {
    const active = document.activeElement;
    return active instanceof Node && active !== document.body && nav.contains(active);
  }

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType === 'touch') return;
    hovering = true;
    window.clearTimeout(openTimer);
    openTimer = window.setTimeout(open, OPEN_DELAY);
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType === 'touch') return;
    hovering = false;
    window.clearTimeout(openTimer);
    if (focusedInside()) return;
    close();
  }

  function onFocusIn() {
    window.clearTimeout(openTimer);
    open();
  }

  function onFocusOut(event: FocusEvent) {
    if (event.relatedTarget instanceof Node && nav.contains(event.relatedTarget)) return;
    if (hovering) return;
    close();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;
    close();
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }

  function onClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest('a');
    if (!(link instanceof HTMLAnchorElement) || !nav.contains(link)) return;

    const id = decodeURIComponent(link.hash.slice(1));
    const section = document.getElementById(id);
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (coarse && !nav.classList.contains('is-open')) {
      event.preventDefault();
      open();
      return;
    }

    if (!section) return;
    event.preventDefault();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    scrollToSection(section, motion);
    history.replaceState(null, '', `#${id}`);
    if (coarse) close();
  }

  function onPointerDown(event: PointerEvent) {
    if (event.target instanceof Node && nav.contains(event.target)) return;
    hovering = false;
    close();
  }

  const hashId = decodeURIComponent(window.location.hash.slice(1));
  const hashed = pairs.find((pair) => pair.target.id === hashId);
  if (hashed) scrollToSection(hashed.target, 'auto');
  pick();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  nav.addEventListener('pointerenter', onPointerEnter);
  nav.addEventListener('pointerleave', onPointerLeave);
  nav.addEventListener('focusin', onFocusIn);
  nav.addEventListener('focusout', onFocusOut);
  nav.addEventListener('keydown', onKeyDown);
  nav.addEventListener('click', onClick);
  document.addEventListener('pointerdown', onPointerDown);

  return () => {
    cancelAnimationFrame(frame);
    window.clearTimeout(openTimer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    nav.removeEventListener('pointerenter', onPointerEnter);
    nav.removeEventListener('pointerleave', onPointerLeave);
    nav.removeEventListener('focusin', onFocusIn);
    nav.removeEventListener('focusout', onFocusOut);
    nav.removeEventListener('keydown', onKeyDown);
    nav.removeEventListener('click', onClick);
    document.removeEventListener('pointerdown', onPointerDown);
    nav.classList.remove('is-open');
    for (const pair of pairs) pair.target.removeAttribute(MARK);
  };
}
