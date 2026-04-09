export const locales = ["en", "zh-HK", "zh-CN"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "preferred-locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizeHref(locale: Locale, href: string) {
  if (href.startsWith("http") || href.startsWith("#")) {
    return href;
  }

  const normalized = href === "/" ? "" : href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${normalized}`;
}

export function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) {
    return "/";
  }

  if (isLocale(segments[0])) {
    const nextPath = segments.slice(1).join("/");
    return nextPath ? `/${nextPath}` : "/";
  }

  return pathname;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const stripped = stripLocaleFromPathname(pathname);
  return localizeHref(locale, stripped);
}
