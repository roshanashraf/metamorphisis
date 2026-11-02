export const COMPANION_VARIANT_KEY = 'companion-variant';

export type CompanionVariant = 'dots' | 'roshan';

export function normalizeCompanionVariant(value: string | null | undefined): CompanionVariant {
  return value === 'roshan' ? 'roshan' : 'dots';
}

export function readCompanionVariant(): CompanionVariant {
  const fromDom = document.documentElement.dataset.companionVariant;
  if (fromDom === 'dots' || fromDom === 'roshan') return fromDom;

  try {
    const saved = localStorage.getItem(COMPANION_VARIANT_KEY);
    if (saved === 'dots' || saved === 'roshan') return saved;
  } catch {
    /* ignore */
  }

  return 'dots';
}

export function applyCompanionVariant(value: string) {
  const next = normalizeCompanionVariant(value);
  document.documentElement.dataset.companionVariant = next;
  window.dispatchEvent(new CustomEvent('companion-variant', { detail: next }));
}

export function saveCompanionVariant(value: CompanionVariant) {
  try {
    localStorage.setItem(COMPANION_VARIANT_KEY, value);
  } catch {
    /* ignore */
  }
}
