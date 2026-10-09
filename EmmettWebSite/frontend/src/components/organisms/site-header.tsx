"use client";

import { useEffect, useState } from "react";
import { Menu, Search, User, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/molecules/locale-switcher";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  "home",
  "services",
  "products",
  "projects",
  "library",
  "academy",
  "advisor",
  "estimate",
  "about",
] as const;

// «library» در ناوبری برچسب نمایشی «کتابخانه»/«Library» دارد اما طبق قرارداد
// URL بک‌اند (ر.ک. ``apps.blog.signals``/``apps.blog.feeds``) مسیر واقعی
// همیشه ``/blog`` است، نه ``/library``.
const NAV_HREF_OVERRIDES: Partial<Record<(typeof NAV_ITEMS)[number], string>> = {
  home: "/",
  library: "/blog",
};

/**
 * هدر سایت — طبق «Navigation Bar» سند مشخصات طراحی: شفاف روی Hero، هنگام
 * اسکرول (~80px) به حالت تیره+بلور+hairline تبدیل می‌شود (۲۰۰ms ease-out).
 *
 * نوار دسکتاپ از 90rem (۱۴۴۰px) دیده می‌شود. کامنت قدیمی «زیر ۱۰۲۴px» را
 * می‌گفت چون `md` آن‌وقت ۱۰۲۴px بود؛ اندازه‌گیری برچسب‌های fa (۹ لینک + لوگو
 * + جستجو/حساب/زبان/تم/CTA، وزن ۷۰۰ به‌عنوان سقف) ردیف را حدود ۱۲۳۸px نشان
 * داد. با padding مربوط به `lg` فقط ظرف ۹۰rem جا می‌شود. زیر این عرض منوی
 * همبرگری می‌ماند تا سرریز افقی پیش نیاید (بازبینی عرض‌های فاز ۲).
 */
export function SiteHeader() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-base",
        isScrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-(--container-site) items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
          Emmett
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 min-[90rem]:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={NAV_HREF_OVERRIDES[item] ?? `/${item}`}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {t(item)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 min-[90rem]:flex">
          <Link
            href="/search"
            aria-label={t("search")}
            className="inline-flex size-9 items-center justify-center rounded-sm text-foreground/80 transition-colors hover:text-foreground"
          >
            <Search aria-hidden="true" className="size-4" />
          </Link>
          <Link
            href="/profile"
            aria-label={t("account")}
            className="inline-flex size-9 items-center justify-center rounded-sm text-foreground/80 transition-colors hover:text-foreground"
          >
            <User aria-hidden="true" className="size-4" />
          </Link>
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/contact">{tCommon("startProject")}</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          className="inline-flex size-11 items-center justify-center rounded-sm text-foreground min-[90rem]:hidden"
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="flex flex-col gap-1 border-t border-border bg-background px-4 py-4 min-[90rem]:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={NAV_HREF_OVERRIDES[item] ?? `/${item}`}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-sm px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {t(item)}
            </Link>
          ))}
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-3">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
