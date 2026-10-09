import { getTranslations } from "next-intl/server";

import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";

/**
 * پوستهٔ مسیرهای فعلی (دیزاین‌سیستم ADR-0017).
 *
 * گروه مسیر `(site)` مسیرهای موجود را نگه می‌دارد تا گروه `(ui)` — که پوستهٔ
 * پورت‌شدهٔ بستهٔ UI را دارد — بدون هیچ تغییری در ظاهر/رفتار آن‌ها در کنارش
 * رشد کند (نقشهٔ فازها در `docs/ui-port-ledger.md`). این پوسته مو‌به‌مو همان
 * چیزی است که پیش‌تر در `[locale]/layout.tsx` رندر می‌شد؛ فقط جابه‌جا شده تا
 * هر گروه پوستهٔ خودش را داشته باشد (layout تودرتو نمی‌تواند هدر/فوتر والد را
 * حذف کند).
 */
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {tCommon("skipToContent")}
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
