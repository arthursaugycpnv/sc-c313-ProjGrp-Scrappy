export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "scrappy_theme";

function safeWindow(): Window | null {
  return typeof window === "undefined" ? null : window;
}

export function getStoredTheme(): ThemePreference {
  const w = safeWindow();
  if (!w) return "system";

  const raw = w.localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return "system";
}

export function setStoredTheme(pref: ThemePreference) {
  const w = safeWindow();
  if (!w) return;
  w.localStorage.setItem(STORAGE_KEY, pref);
}

export function applyThemePreference(pref: ThemePreference) {
  const w = safeWindow();
  if (!w) return;

  const root = w.document.documentElement;
  root.classList.remove("dark", "light");

  if (pref === "dark") root.classList.add("dark");
  if (pref === "light") root.classList.add("light");
}

export function getEffectiveTheme(pref: ThemePreference): "light" | "dark" {
  const w = safeWindow();
  if (!w) return "light";

  if (pref === "light" || pref === "dark") return pref;

  return w.matchMedia && w.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function toggleTheme(pref: ThemePreference): ThemePreference {
  const next = getEffectiveTheme(pref) === "dark" ? "light" : "dark";
  setStoredTheme(next);
  applyThemePreference(next);
  return next;
}
