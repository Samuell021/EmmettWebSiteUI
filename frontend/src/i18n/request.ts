import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

import { getApiBaseUrl } from "@/lib/api/config";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { mergeDatabaseMessages } from "./database-messages";
import { routing } from "./routing";

interface FrontendCopyResponse {
  locale: string;
  messages: Record<string, string>;
}

async function getMessages(locale: string): Promise<Record<string, unknown>> {
  const bundled = (await import(`../../messages/${locale}.json`)).default as Record<
    string,
    unknown
  >;

  try {
    const response = await fetch(
      `${getApiBaseUrl()}/site-content/translations/?locale=${encodeURIComponent(locale)}`,
      {
        headers: { "Accept-Language": locale },
        next: {
          revalidate: 60,
          tags: [locale === "en" ? CACHE_TAGS.siteCopyEn : CACHE_TAGS.siteCopyFa],
        },
      },
    );
    if (!response.ok) return bundled;

    const payload = (await response.json()) as FrontendCopyResponse;
    if (
      payload.locale !== locale ||
      payload.messages === null ||
      typeof payload.messages !== "object" ||
      Array.isArray(payload.messages)
    ) {
      return bundled;
    }
    return mergeDatabaseMessages(bundled, payload.messages);
  } catch {
    // Keep page rendering available while the optional CMS translation feed is
    // not configured. Production readiness later makes this state explicit.
    return bundled;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await getMessages(locale),
  };
});
