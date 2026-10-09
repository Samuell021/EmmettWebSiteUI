import { setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/seo/json-ld";
import { Home } from "@/components/ui-port/home";
import type { AppLocale } from "@/i18n/routing";
import { getFaqForPath } from "@/lib/api/seo";
import { faqJsonLd } from "@/lib/seo/json-ld";

/**
 * صفحهٔ اصلی — پورت ۱:۱ بستهٔ UI (فاز ۲).
 *
 * ترکیب بخش‌ها عیناً همان `UI/src/app/pages/Home.tsx` است. تنها افزودهٔ این
 * لایه، JSON-LD پرسش‌های متداول از بک‌اند است (مسیر ``/``) که پیش‌تر هم در
 * همین صفحه بود و برای سئو حفظ شده؛ اگر ادمین هیچ FAQItem نداشته باشد بلوک
 * ساخت‌یافته اصلاً رندر نمی‌شود.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  const faqItems = await getFaqForPath("/", locale);

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <Home />
    </>
  );
}
