const DESKTOP = '(min-width: 960px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

export function mountPickupNumbersScrolly() {
  const root = document.querySelector('[data-pickup-numbers-scrolly]');
  if (!(root instanceof HTMLElement)) return () => {};

  const steps = [
    ...root.querySelectorAll<HTMLElement>('.pickup-numbers-scrolly__step'),
  ];
  if (!steps.length) return () => {};

  const desktop = window.matchMedia(DESKTOP);
  const reduced = window.matchMedia(REDUCED);

  const ratios = new Map<Element, number>();
  let observer: IntersectionObserver | null = null;

  function setStep(value: string) {
    root.dataset.activeStep = value;
  }

  function fallbackStep() {
    const mid = window.innerHeight * 0.45;
    for (let i = steps.length - 1; i >= 0; i -= 1) {
      const rect = steps[i].getBoundingClientRect();
      if (rect.top <= mid) {
        return steps[i].dataset.step || '1';
      }
    }
    return '1';
  }

  function syncFromRatios() {
    let best = 0;
    let stepId = '1';
    for (const step of steps) {
      const ratio = ratios.get(step) ?? 0;
      if (ratio > best) {
        best = ratio;
        stepId = step.dataset.step || '1';
      }
    }
    if (best === 0) stepId = fallbackStep();
    setStep(stepId);
  }

  function disconnect() {
    observer?.disconnect();
    observer = null;
    ratios.clear();
  }

  function connect() {
    disconnect();
    if (!desktop.matches) {
      root.removeAttribute('data-active-step');
      root.removeAttribute('data-reduced');
      return;
    }

    if (reduced.matches) {
      setStep('4');
      root.dataset.reduced = '';
      return;
    }

    root.removeAttribute('data-reduced');

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }
        syncFromRatios();
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.05, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    for (const step of steps) observer.observe(step);
    syncFromRatios();
  }

  function onDesktopChange() {
    connect();
  }

  function onReducedChange() {
    connect();
  }

  desktop.addEventListener('change', onDesktopChange);
  reduced.addEventListener('change', onReducedChange);
  connect();

  return () => {
    desktop.removeEventListener('change', onDesktopChange);
    reduced.removeEventListener('change', onReducedChange);
    disconnect();
    root.removeAttribute('data-active-step');
    root.removeAttribute('data-reduced');
  };
}
