import { getTranslations, setRequestLocale } from "next-intl/server";

import { ComingSoon } from "@/components/ui-port/coming-soon";
import type { AppLocale } from "@/i18n/routing";

/**
 * مسیر `/products/crm` — در بستهٔ UI صفحهٔ ComingSoon با همین متن است
 * (ر.ک. `UI/src/app/App.tsx`). این مسیر در پروژه معادل دیگری ندارد، پس عیناً
 * همان صفحهٔ UI ساخته شد تا لینک‌های ناوبری/پالت هیچ‌گاه 404 ندهند.
 */
export default async function CrmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  const t = await getTranslations({ locale, namespace: "ui.comingSoon" });
  return <ComingSoon page={t("crmTitle")} subtitle={t("crmSubtitle")} />;
}
