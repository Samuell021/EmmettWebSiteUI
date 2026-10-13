import { expect, test, type Page } from "@playwright/test";

/**
 * تست‌های E2E اختصاصی پورت UI (فاز ۸ پورت — ADR-0037).
 *
 * سوئیت‌های قدیمی فاز ۴ (``public-pages`` و…) مسیرهای داخلی را می‌سنجند؛ این
 * فایل قرارداد رفتاری خودِ پوستهٔ پورت‌شده را قفل می‌کند: خانه با بخش‌های
 * زنده‌اش، دو صفحهٔ محصولی که پورت ساخت (``/products/pentestor`` و
 * ``/products/crm``)، پالت ⌘K (فقط فیلتر فهرست داخلی صفحات — اتصال به
 * جست‌وجوی API عمداً خارج از فاز ۸ است و جست‌وجوی واقعی صفحهٔ ``/search``
 * می‌ماند)، کشوی موبایل به‌صورت دیالوگ، و احترام لودر به
 * ``prefers-reduced-motion``.
 *
 * فرض داده: بک‌اند با ``seed_demo_data`` بالا آمده است (همان پیش‌شرط بقیهٔ
 * سوئیت؛ ر.ک. ``e2e/README.md``). متن‌های ثابت از ``messages/fa.json``
 * می‌آیند، چون این فایل فقط در پروژهٔ ``fa`` اجرا می‌شود.
 */

/** لودر آغازین پوسته تمام‌صفحه است؛ پیش از هر کلیک باید رفته باشد. */
async function waitForLoader(page: Page) {
  await expect(page.locator(".ui-loader")).toBeHidden({ timeout: 15_000 });
}

test.describe("خانهٔ پورت‌شده", () => {
  test("هیرو و بخش‌های اصلی با دادهٔ زنده رندر می‌شوند", async ({ page }) => {
    await page.goto("/");
    await waitForLoader(page);

    await expect(page.locator("h1")).toContainText("سیستم‌های");
    await expect(page.locator("h1")).toContainText("هوشمند.");

    // عنوان ثابت بخش‌ها از پیام‌های پوسته می‌آید و مستقل از دادهٔ API است.
    await expect(
      page.getByRole("heading", { level: 2, name: "مهندسی در تمام لایه‌های استک." }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /کارهای ما را ببینید/ })).toHaveAttribute(
      "href",
      "/projects",
    );

    // دادهٔ زندهٔ بخش محصولات: حداقل یک کارت به جزئیات یک پروژه/محصول لینک می‌دهد.
    await expect(page.locator('a[href^="/projects/"]').first()).toBeVisible();
  });

  test("نوار ناوبری دسکتاپ لینک‌های پوسته را با href درست نشان می‌دهد", async ({ page }) => {
    await page.goto("/");
    await waitForLoader(page);

    const nav = page.getByRole("navigation", { name: "ناوبری اصلی" });
    await expect(nav.getByRole("link", { name: "محصولات" })).toHaveAttribute("href", "/products");
    await expect(nav.getByRole("link", { name: "کتابخانه" })).toHaveAttribute("href", "/blog");
    await expect(nav.getByRole("link", { name: "شروع یک پروژه" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});

test.describe("صفحات محصول پورت (ComingSoon)", () => {
  const productPages = [
    { path: "/products/pentestor", title: "Pentestor", subtitle: "مهندسی امنیت با هوش مصنوعی" },
    {
      path: "/products/crm",
      title: "CRM",
      subtitle: "سیستم کسب‌وکار، مهندسی‌شده حول جریان کار واقعی",
    },
  ] as const;

  for (const product of productPages) {
    test(`${product.path} با عنوان، زیرعنوان و canonical خودش رندر می‌شود`, async ({ page }) => {
      await page.goto(product.path);
      await waitForLoader(page);

      await expect(page.getByRole("heading", { level: 1, name: product.title })).toBeVisible();
      await expect(page.getByText(product.subtitle)).toBeVisible();
      await expect(page.getByRole("link", { name: /بازگشت به خانه/ })).toHaveAttribute("href", "/");

      // فاز ۶ پورت: این دو صفحه دیگر canonical خانه را به ارث نمی‌برند.
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute("href", new RegExp(`${product.path}$`));
    });
  }
});

test.describe("پالت ⌘K (فهرست داخلی صفحات)", () => {
  test("با Ctrl/⌘K باز می‌شود، فیلتر می‌کند و به صفحهٔ محصول می‌رود", async ({ page }) => {
    await page.goto("/");
    await waitForLoader(page);

    await page.keyboard.press("ControlOrMeta+k");
    const palette = page.locator("#command-palette");
    await expect(palette).toBeVisible();
    await expect(palette).toHaveAttribute("aria-modal", "true");

    // فوکوس باید داخل دیالوگ، روی ورودی جست‌وجو باشد (قرارداد useDialogA11y).
    const input = page.getByPlaceholder("جست‌وجوی صفحه، محصول، فرمان…");
    await expect(input).toBeFocused();

    await input.fill("CRM");
    const crmItem = palette.locator("button", { hasText: "CRM — سیستم‌های کسب‌وکار" });
    await expect(crmItem).toBeVisible();
    await expect(palette.locator("button", { hasText: "خدمات — سیستم مهندسی" })).toBeHidden();

    await crmItem.click();
    await expect(page).toHaveURL(/\/products\/crm$/);
    await expect(page.getByRole("heading", { level: 1, name: "CRM" })).toBeVisible();
  });

  test("عبارت بی‌نتیجه پیام خالی نشان می‌دهد و Escape پالت را می‌بندد", async ({ page }) => {
    await page.goto("/");
    await waitForLoader(page);

    await page.keyboard.press("ControlOrMeta+k");
    const palette = page.locator("#command-palette");
    await expect(palette).toBeVisible();

    await page.getByPlaceholder("جست‌وجوی صفحه، محصول، فرمان…").fill("zzznoresultzzz");
    await expect(palette.getByText("نتیجه‌ای پیدا نشد.")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(palette).toBeHidden();
    // پس از بستن، محتوای اصلی دوباره inert نیست.
    await expect(page.locator("#main-content")).not.toHaveAttribute("inert", /.*/);
  });

  test("در عرض ۳۲۰ پالت از viewport بیرون نمی‌زند", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/");
    await waitForLoader(page);

    await page.keyboard.press("ControlOrMeta+k");
    const palette = page.locator("#command-palette");
    await expect(palette).toBeVisible();

    const box = await palette.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  });
});

test.describe("کشوی موبایل و حرکت کاهش‌یافته", () => {
  test("در عرض ۳۹۰ همبرگر دیالوگ منو را باز می‌کند و فوکوس برمی‌گردد", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await waitForLoader(page);

    const hamburger = page.getByRole("button", { name: "باز کردن منو" });
    await expect(hamburger).toBeVisible();
    // ناوبری دسکتاپ در این عرض نباید دیده شود.
    await expect(
      page.getByRole("navigation", { name: "ناوبری اصلی" }).getByRole("link", { name: "خدمات" }),
    ).toBeHidden();

    await hamburger.click();
    const drawer = page.locator("#mobile-nav");
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveAttribute("aria-modal", "true");
    await expect(drawer.getByRole("link", { name: "خدمات" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(hamburger).toBeFocused();
  });

  test("با prefers-reduced-motion لودر آغازین نمایش داده نمی‌شود", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator(".ui-loader")).toBeHidden();
    await expect(page.locator("h1")).toContainText("هوشمند.");
  });
});
