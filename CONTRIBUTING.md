# راهنمای مشارکت در پروژهٔ امیت (Contributing Guide — FA / EN)

از مشارکت شما در توسعهٔ پلتفرم وب‌سایت گروه توسعه نرم‌افزار **امیت (Emmett)** استقبال می‌کنیم. این سند قواعد مهندسی، چرخهٔ کاری اجباری، استاندارد پیام‌های کامیت و گیت‌های کیفیت را به دو زبان **فارسی** و **انگلیسی** شرح می‌دهد.

---

## بخش فارسی (Persian)

### ۱. چرخهٔ کاری اجباری (Workflow)

هر تغییر یا قابلیت جدید در این مخزن باید دقیقاً از چرخهٔ زیر پیروی کند:

```
Discovery → Questions → Plan → ADR → Implementation → Test → Review → Document
```

1. **Discovery:** مطالعهٔ کامل کدهای مرتبط، تاریخچهٔ کامیت‌ها و اسناد `docs/adr/` پیش از نوشتن کد.
2. **Questions:** رفع هرگونه ابهام پیش از پیاده‌سازی.
3. **Plan & ADR:** ثبت هر تصمیم معماری جدید در قالب یک فایل شماره‌گذاری‌شده در `docs/adr/00XX-*.md` (شامل بخش‌های `Context`, `Options`, `Decision`, `Rationale`, `Consequences`).
4. **Implementation & Test:** پیاده‌سازی تایپ‌سیف همراه با تست‌های واحد، یکپارچه و در صورت نیاز E2E. گیت پوشش **حداقل ۸۵٪** است، اما توجه کنید که این گیت **کل مخزن را نمی‌سنجد**: در فرانت‌اند فقط `src/lib` و `src/components/{ui,molecules,organisms,seo}` (۳۲ فایل از ۹۳) و در بک‌اند فقط `apps/` اندازه‌گیری می‌شوند. دامنهٔ واقعی، اعداد تفکیکی و استثنائات در [بند ۶.۴ مستندات فنی](docs/TECHNICAL_DOCUMENTATION.fa.md) آمده است. **کد تازه باید در هر مسیری که هست تست داشته باشد، حتی اگر آن مسیر فعلاً سنجیده نشود** — به‌ویژه `src/app/**`، `src/components/ui-port/**`، `src/i18n/**` و `src/proxy.ts`.
5. **Review & Document:** هر Pull Request باید به‌گونه‌ای کوچک، تمیز و مستند باشد که توسط **۳ بازبین (Reviewer)** به‌راحتی قابل بررسی باشد و تغییرات در `CHANGELOG.md` و مستندات فنی ثبت گردد.

### ۲. خلاصهٔ ۲۰ قانون سخت‌گیرانه (Hard Rules)

- **قانون ۳ (ADR):** هیچ تصمیم معماری بدون ADR پذیرفته نمی‌شود.
- **قانون ۵ (امنیت رازها):** هرگز کلید، توکن یا رمز عبور در کد ننویسید؛ فقط از `.env` و `django-environ` استفاده کنید (`scripts/check_secrets.py`).
- **قانون ۶ (وابستگی‌ها):** هیچ پکیج جدیدی بدون توجیه فنی مکتوب در ADR اضافه نشود.
- **قانون ۷ (Type Safety):** کد پایتون باید از `mypy --strict` و کد فرانت‌اند از `tsc --noEmit` (`strict: true`) بدون حتی یک خطا عبور کند.
- **قانون ۸ (OpenAPI):** هر تغییر در API باید با `@extend_schema` مستند شده و از `manage.py spectacular --validate --fail-on-warn` عبور کند.
- **قانون ۹ تا ۱۱ (i18n و RTL):** هیچ رشتهٔ متنی در کد هاردکد نشود؛ تاریخ‌ها در فارسی شمسی و اعداد فارسی باشند؛ RTL/LTR در سطح کامپوننت مدیریت شود.
- **قانون ۱۲ تا ۱۴ (موتور AI):** تمام قابلیت‌های هوش مصنوعی منحصراً از `apps.ai_engine` با ورودی‌های بستهٔ کاتالوگ (Enum) و با اعمال Guardrail فرهنگی ایرانی عبور کنند.
- **قانون ۱۵ تا ۱۹ (کارایی، امنیت، سئو و دسترس‌پذیری):** کوئری‌ها بهینه (`select_related` / `prefetch_related`)، استاندارد WCAG AA رعایت‌شده و امتیاز Lighthouse CI در هر ۴ محور `≥ 95` باشد.

### ۳. راه‌اندازی هوک‌های Pre-commit

پیش از اولین کامیت، هوک‌های Pre-commit را نصب کنید:

```bash
backend/.venv/bin/pre-commit install
backend/.venv/bin/pre-commit install --hook-type commit-msg
backend/.venv/bin/pre-commit run --all-files
```

### ۴. استاندارد پیام کامیت (Conventional Commits)

تمام کامیت‌ها باید از الگوی **Conventional Commits** پیروی کنند (توسط هوک `commit-msg` و `scripts/check_commit_msg.py` بررسی می‌شود):

```text
<type>(<scope>): <short imperative summary>
```

- **انواع مجاز (`type`):**
  - `feat`: افزودن قابلیت جدید (مثلاً `feat(ai): add deterministic project estimator endpoint`)
  - `fix`: رفع باگ (مثلاً `fix(admin): resolve related presence filter model lookup`)
  - `security`: سخت‌سازی امنیتی (مثلاً `security(auth): enforce TOTP 2FA and login lockout`)
  - `perf`: بهبود کارایی و کاهش کوئری (مثلاً `perf(blog): add select_related on post detail queryset`)
  - `docs`: ایجاد یا به‌روزرسانی مستندات و ADRها
  - `test`: افزودن یا تکمیل تست‌های واحد، یکپارچه و E2E
  - `ci`: تغییرات پایپ‌لاین GitHub Actions یا Pre-commit
  - `refactor`, `style`, `build`, `chore`, `revert`

### ۵. استاندارد توکن‌های طراحی (Design Tokens)

رنگ در کد فرانت‌اند **باید** از توکن بیاید، نه از لیترال خام.

- **ممنوع:** هگز یا `rgba()` داخل `className` (مثل `text-[#1FAE6E]`) یا داخل `style={{}}`.
- **الزامی:** utility مبتنی بر توکن (`text-primary`، `bg-emerald-deep`) یا `var(--token)`.
- **توکن معادل وجود ندارد؟** نخست توکن را در `frontend/src/app/globals.css` بسازید: مقدار را در `:root` تعریف کنید **و** آن را در `@theme inline` به `--color-<name>` نگاشت کنید. بدون نگاشت، هیچ utility تولید نمی‌شود و نفر بعدی دوباره به لیترال خام برمی‌گردد.
- **مقدار توکن موجود را برای جور شدن با کد تازه تغییر ندهید؛** توکن تازه بسازید. تغییر مقدار یک توکن، ظاهر همهٔ مصرف‌کنندگانش را عوض می‌کند.

این قاعده توسط `frontend/src/app/hardcoded-colors.test.ts` **اجرا** می‌شود: شمار لیترال‌های رنگ هر فایل در `frontend/src/app/hardcoded-colors.baseline.ts` قفل شده و فقط مجاز است **کم** شود (یک جفت‌بند دوطرفه). افزودن لیترال تازه، یا کم‌کردن لیترال بدون پایین‌آوردن عدد در فهرست پایه، تست را قرمز می‌کند. چهار فایل استثنا دلیل مکتوب دارند (تصویر Open Graph، `global-error.tsx`، `src/app/not-found.tsx` و سند HTML مستقل انتقال) — وجهِ اشتراکِ سه تای آخر این است که بیرونِ `[locale]/layout.tsx` رندر می‌شوند، تنها جایی که `globals.css` را import می‌کند، پس متغیرهای CSS در آن‌ها تعریف نشده‌اند؛ افزودن استثنای تازه به دلیل فنی مکتوب و تأیید بازبین نیاز دارد.

مستند تصمیم: `docs/adr/0039-design-token-standard-and-hardcoded-color-ratchet.md`. صفحهٔ `/design-system` مقدار زندهٔ هر توکن را در زمان اجرا از CSSOM می‌خواند و نشان می‌دهد، پس توکنِ تعریف‌نشده یا نگاشت‌نشده روی همان صفحه دیده می‌شود.

### ۶. چک‌لیست پیش از ارسال Pull Request

- [ ] `backend/.venv/bin/pre-commit run --all-files` بدون خطا اجرا شده است.
- [ ] تست‌های بک‌اند (`coverage run -m pytest && coverage report --fail-under=85`) سبز هستند.
- [ ] تست‌های فرانت‌اند (`npm run test:coverage`) و `npm run build` سبز هستند. توجه: گیت ۸۵٪ فقط `src/lib` و `src/components/{ui,molecules,organisms,seo}` را می‌سنجد و `src/app/**`، `ui-port/**`، `src/i18n/**` و `src/proxy.ts` خارج از آن‌اند (بند ۶.۴ مستندات فنی) — با این حال کد تازه در هر مسیری که باشد باید تست داشته باشد.
- [ ] رنگ‌ها از توکن می‌آیند: `hardcoded-colors.test.ts` سبز است و شمار لیترال‌های رنگ هیچ فایلی افزایش نیافته.
- [ ] در صورت تغییر ترجمه، `python scripts/i18n.py check` سبز است و کلیدهای `messages/fa.json` و `messages/en.json` متقارن‌اند.
- [ ] مستندات (`docs/TECHNICAL_DOCUMENTATION.{fa,en}.md` و `CHANGELOG.md`) به‌روزرسانی شده‌اند.

---

## English Section

### 1. Mandatory Engineering Workflow

Every change must follow:
`Discovery → Questions → Plan → ADR → Implementation → Test → Review → Document`

- Document architectural decisions in `docs/adr/00XX-*.md`.
- Never commit secrets or `.env` files (`python3 scripts/check_secrets.py`).
- Maintain strict type safety (`mypy apps config` with `--strict` on backend; `npm run typecheck` on frontend).
- Keep test coverage `>= 85%` in both backend (`pytest` + `coverage`) and frontend (`vitest` + `@vitest/coverage-v8`). Note that this gate is **scoped, not repository-wide**: on the frontend it measures only `src/lib` and `src/components/{ui,molecules,organisms,seo}` (32 of 93 source files), and on the backend only `apps/`. New code must be tested regardless of whether its directory is currently measured — especially `src/app/**`, `src/components/ui-port/**`, `src/i18n/**` and `src/proxy.ts`. See §6.3 of `docs/TECHNICAL_DOCUMENTATION.en.md` for the actual scope, the per-directory figures and the compensating E2E controls.

### 2. Code Formatting & Linting

- **Backend (`backend/`):** Formatted and linted with **Ruff** (`ruff check .`, `ruff format --check .`), **Black** (`black --check .`), **Mypy** (`mypy apps config`), and **Bandit** (`bandit -c pyproject.toml -r apps config -ll`).
- **Frontend (`frontend/`):** Formatted and linted with **Prettier** (`npm run format:check`), **ESLint** (`npm run lint`), and **TypeScript** (`npm run typecheck`).

### 3. Conventional Commits Format

Commit messages are validated automatically by `scripts/check_commit_msg.py`:

```text
<type>(<optional-scope>): <description>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`, `security`.

### 4. Design Token Standard

Colors in frontend code **must** come from design tokens, never from raw literals.

- **Forbidden:** hex or `rgba()` inside `className` (e.g. `text-[#1FAE6E]`) or inside `style={{}}`.
- **Required:** token-based utilities (`text-primary`, `bg-emerald-deep`) or `var(--token)`.
- **No matching token?** Create one in `frontend/src/app/globals.css` first: declare the value in `:root` **and** map it in `@theme inline` as `--color-<name>`. Without the mapping no utility is generated, and the next contributor falls back to a raw literal.
- **Never edit an existing token's value** to fit new code; add a new token instead. Changing a token value restyles every consumer of it.

Enforced by `frontend/src/app/hardcoded-colors.test.ts`: the raw-color count of every file is locked in `frontend/src/app/hardcoded-colors.baseline.ts` and may only go **down** (a two-way ratchet). Adding a literal — or removing one without lowering the recorded number — fails the test. Four files are documented exceptions (the Open Graph image, `global-error.tsx`, `src/app/not-found.tsx`, and the standalone redirect HTML document); the last three share the same root cause — they render outside `[locale]/layout.tsx`, the only place that imports `globals.css`, so CSS custom properties are not defined there. A new exception requires a written technical reason and reviewer approval.

Decision record: `docs/adr/0039-design-token-standard-and-hardcoded-color-ratchet.md`. The `/design-system` page reads every token's live value from the CSSOM at runtime and displays it, so an undefined or unmapped token is visible on that page.
