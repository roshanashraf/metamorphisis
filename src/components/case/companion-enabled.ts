export const COMPANION_ENABLED_KEY = 'companion-enabled';

export function readCompanionEnabled(): boolean {
  const fromDom = document.documentElement.dataset.companionEnabled;
  if (fromDom === 'on') return true;
  if (fromDom === 'off') return false;

  try {
    const saved = localStorage.getItem(COMPANION_ENABLED_KEY);
    if (saved === 'on') return true;
    if (saved === 'off') return false;
  } catch {
    /* ignore */
  }

  return false;
}

export function applyCompanionEnabled(enabled: boolean) {
  document.documentElement.dataset.companionEnabled = enabled ? 'on' : 'off';
  window.dispatchEvent(new CustomEvent('companion-enabled', { detail: enabled }));
}

export function saveCompanionEnabled(enabled: boolean) {
  try {
    localStorage.setItem(COMPANION_ENABLED_KEY, enabled ? 'on' : 'off');
  } catch {
    /* ignore */
  }
}
