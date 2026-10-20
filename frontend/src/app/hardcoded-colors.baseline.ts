/**
 * فهرست پایهٔ «رنگ خام» برای گارد رگرسیون توکن‌های طراحی (ADR-0039).
 *
 * قانون: هیچ فایل منبعی زیر `src/` نباید رنگ را به‌شکل لیترال خام
 * (هگز یا `rgba()`) در `className` یا `style` بنویسد؛ باید از توکن استفاده
 * کند. چون مهاجرت ۳۶۵ لیترال باقی‌مانده در یک گام ممکن نیست (بستهٔ ۶ کار
 * می‌کند)، این فهرست وضعیت فعلی را **قفل** می‌کند تا وضعیت بدتر نشود.
 *
 * این یک «جفت‌بند» (ratchet) دوطرفه است:
 * - بیشتر شدن شمار یک فایل ⇒ شکست (رگرسیون).
 * - کمتر شدن شمار یک فایل ⇒ هم شکست، تا کسی که لیترالی را به توکن تبدیل
 *   کرده عدد را اینجا پایین بیاورد و بهبود **قفل** شود. بدون این ضابطه،
 *   فهرست پایه به‌تدریج از واقعیت عقب می‌ماند و خاصیت بازدارندگی‌اش را
 *   از دست می‌دهد.
 *
 * شمارش توسط `hardcoded-colors.test.ts` انجام می‌شود: روی متن کد پس از حذف
 * خطوط کامنت (خطوطی که با `//`، `*` یا `/*` شروع می‌شوند)، با دو الگوی
 * «هگز سه تا هشت رقمی» و «`rgba(`». فایل‌های تست شمرده نمی‌شوند چون
 * گاهی عمداً مقدار توکن را در assertion می‌آورند.
 *
 * نکتهٔ نگهداری: مسیرها نسبت به ریشهٔ `frontend/` هستند تا با `git diff`
 * خوانا بمانند.
 */

/**
 * شمار لیترال رنگ خام در هر فایل. این عدد فقط مجاز است **کم** شود، و هر
 * کاهش باید در همان کامیتی ثبت شود که لیترال را به توکن تبدیل کرده است.
 */
export const RATCHET = {
  // ===== بستهٔ UI (ui-port) — هدف مهاجرت تدریجی در بستهٔ ۶ =====
  "src/components/ui-port/products-section.tsx": 52,
  "src/components/ui-port/library-section.tsx": 43,
  "src/components/ui-port/services-section.tsx": 37,
  "src/components/ui-port/hero.tsx": 36,
  "src/components/ui-port/navbar.tsx": 29,
  "src/components/ui-port/command-palette.tsx": 27,
  "src/components/ui-port/projects-section.tsx": 26,
  "src/components/ui-port/academy-section.tsx": 24,
  "src/components/ui-port/contact-section.tsx": 19,
  "src/components/ui-port/footer.tsx": 16,
  "src/components/ui-port/coming-soon.tsx": 14,
  "src/components/ui-port/page-frame.tsx": 10,
  "src/components/ui-port/loader.tsx": 6,
  "src/components/ui-port/locale-switch.tsx": 4,

  // ===== پوستهٔ برنامه — کاندیدای مهاجرت، نه استثنا =====
  "src/app/not-found.tsx": 5,
  "src/app/[locale]/(ui)/(pages)/search/page.tsx": 3,
  "src/app/[locale]/error.tsx": 1,
  "src/app/[locale]/not-found.tsx": 1,
} as const satisfies Readonly<Record<string, number>>;

/**
 * فایل‌هایی که لیترال رنگ در آن‌ها **اجتناب‌ناپذیر** است، با دلیل مکتوب.
 * دلیل‌ها توسط تست بررسی می‌شوند: استثنا بدون دلیل پذیرفته نیست، و استثنایی
 * که فایلش حذف شده یا دیگر لیترالی ندارد باید از این فهرست بیرون برود.
 */
export const EXCEPTIONS = {
  "src/app/[locale]/opengraph-image.tsx":
    "تصویر Open Graph با ImageResponse/satori رندر می‌شود؛ آن محیط نه آبشار CSS دارد " +
    "نه متغیر CSS را حل می‌کند، پس مقدار رنگ باید در خودِ JSX نوشته شود.",

  "src/app/global-error.tsx":
    "طبق قرارداد Next.js این فایل بیرون از root layout رندر می‌شود و خودش <html> و " +
    "<body> می‌سازد؛ globals.css (و در نتیجه توکن‌ها) در آن بارگذاری نمی‌شود و هیچ " +
    "import هم ندارد.",

  "src/lib/seo/redirects.ts":
    "این ماژول یک سند HTML مستقل را به‌صورت رشته برمی‌گرداند (صفحهٔ انتقال)؛ آن سند " +
    "هیچ پیوندی به شیوه‌نامهٔ سایت ندارد، پس سبک‌ها باید درون‌خطی و خودبسنده باشند.",
} as const satisfies Readonly<Record<string, string>>;
