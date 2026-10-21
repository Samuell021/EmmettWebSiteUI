# راهنمای مشارکت در پروژهٔ امیت (Contributing Guide — FA / EN)

> **تقارنِ دو زبان:** بخشِ فارسی ۶ زیربخش دارد و بخشِ انگلیسی ۶ زیربخش؛ محتوا
> **آینهٔ کاربردی** است نه ترجمهٔ سطر‌به‌سطر. نگاشت: فارسی ۱ = انگلیسی 1 (چرخهٔ
> کاری)، فارسی ۲ = انگلیسی 6 (دامنهٔ قوانین)، فارسی ۳ = انگلیسی 2 (ابزارهای
> لینت/فرمت + Pre-commit)، فارسی ۴ = انگلیسی 3 (‏Conventional Commits)،
> فارسی ۵ = انگلیسی 4 (استاندارد توکن)، فارسی ۶ = انگلیسی 5 (چک‌لیست PR).
> تنها تفاوتِ باقی‌مانده: فهرستِ کاملِ دستوراتِ بررسیِ محلی در فارسی در بندِ ۶.۱
> `TECHNICAL_DOCUMENTATION.fa.md` است و در انگلیسی هم در بندِ 6.1 همان سند؛
> بخشِ انگلیسیِ این فایل خلاصه‌اش را درون‌خطی تکرار می‌کند. هیچ محتوایی تک‌زبانه نمانده است.
>
> **Parity:** both halves have six subsections and are a *functional* mirror, not a
> line-by-line translation. Mapping: Persian 1 = English 1 (workflow), Persian 2 =
> English 6 (scope of the rules), Persian 3 = English 2 (lint/format tooling plus
> pre-commit), Persian 4 = English 3 (Conventional Commits), Persian 5 =
> English 4 (design tokens), Persian 6 = English 5 (PR checklist). The one
> remaining difference: the full local-verification command list lives in section
> 6.1 of `TECHNICAL_DOCUMENTATION.{fa,en}.md` for both languages, and the English
> half of this file additionally repeats it inline. No content is single-language.

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

> **دامنهٔ این بخش، صریح:** این یک **خلاصه** است، نه فهرستِ کامل. قانون‌های ۳ و
> ۵ تا ۱۹ را پوشش می‌دهد؛ قانون‌های ۱، ۲، ۴ و ۲۰ اینجا نیامده‌اند. در هیچ سندِ
> دیگری از ریپو هم **فهرستِ شماره‌گذاری‌شدهٔ کاملِ هر ۲۰ قانون** وجود ندارد —
> ممیزیِ بستهٔ ۷ نشان داد ۱۹ قانون از ۲۰ قانون به‌صورت پراکنده در ADRها با
> شماره ارجاع داده می‌شوند (فقط «قانون ۱» هیچ‌جا ذکر نشده)، ولی متنِ رسمیِ
> یک‌جا گردآوری نشده است. اگر به متنِ دقیقِ یک قانون نیاز دارید، ADR مربوطه
> همان ارجاع را با زمینهٔ تصمیم آورده است. گردآوریِ فهرستِ کامل، کارِ بازِ
> نگهداری است نه چیزی که این سند ادعایش را داشته باشد.

- **قانون ۳ (ADR):** هیچ تصمیم معماری بدون ADR پذیرفته نمی‌شود.
- **قانون ۵ (امنیت رازها):** هرگز کلید، توکن یا رمز عبور در کد ننویسید؛ فقط از `.env` و `django-environ` استفاده کنید (`scripts/check_secrets.py`).
- **قانون ۶ (وابستگی‌ها):** هیچ پکیج جدیدی بدون توجیه فنی مکتوب در ADR اضافه نشود.
- **قانون ۷ (Type Safety):** کد پایتون باید از `mypy --strict` و کد فرانت‌اند از `tsc --noEmit` (`strict: true`) بدون حتی یک خطا عبور کند.
- **قانون ۸ (OpenAPI):** هر تغییر در API باید با `@extend_schema` مستند شده و از `manage.py spectacular --validate --fail-on-warn` عبور کند.
- **قانون ۹ تا ۱۱ (i18n و RTL):** هیچ رشتهٔ متنی در کد هاردکد نشود؛ تاریخ‌ها در فارسی شمسی و اعداد فارسی باشند؛ RTL/LTR در سطح کامپوننت مدیریت شود.
- **قانون ۱۲ تا ۱۴ (موتور AI):** تمام قابلیت‌های هوش مصنوعی منحصراً از `apps.ai_engine` با ورودی‌های بستهٔ کاتالوگ (Enum) و با اعمال Guardrail فرهنگی ایرانی عبور کنند.
- **قانون ۱۵ تا ۱۹ (کارایی، امنیت، سئو و دسترس‌پذیری):** کوئری‌ها بهینه (`select_related` / `prefetch_related`)، استاندارد WCAG AA رعایت‌شده و امتیاز Lighthouse CI در هر ۴ محور `≥ 95` باشد.

### ۳. راه‌اندازی هوک‌های Pre-commit و ابزارهای کیفیت

ابزارهایی که این هوک‌ها اجرا می‌کنند — بک‌اند: **Ruff** (`ruff check .`،
`ruff format --check .`)، **Black** (`black --check .`)، **Mypy** (`mypy apps config`)
و **Bandit** (`bandit -c pyproject.toml -r apps config -ll`)؛ فرانت‌اند: **Prettier**
(`npm run format:check`)، **ESLint** (`npm run lint`) و **TypeScript**
(`npm run typecheck`). فهرستِ کاملِ دستوراتِ بررسیِ محلی در بندِ **۶.۱**
`docs/TECHNICAL_DOCUMENTATION.fa.md` است.

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

- **ممنوع:** هگز، `rgba()` یا رنگِ عددیِ `0x…` داخل `className` (مثل `text-[#1FAE6E]`)، داخل `style={{}}`، یا به‌عنوانِ ورودیِ رنگِ یک کتابخانه (مثل مادّهٔ Three.js).
- **الزامی:** utility مبتنی بر توکن (`text-primary`، `bg-emerald-deep`) یا `var(--token)`.
- **توکن معادل وجود ندارد؟** نخست توکن را در `frontend/src/app/globals.css` بسازید: مقدار را در `:root` تعریف کنید **و** آن را در `@theme inline` به `--color-<name>` نگاشت کنید. بدون نگاشت، هیچ utility تولید نمی‌شود و نفر بعدی دوباره به لیترال خام برمی‌گردد.
- **مقدار توکن موجود را برای جور شدن با کد تازه تغییر ندهید؛** توکن تازه بسازید. تغییر مقدار یک توکن، ظاهر همهٔ مصرف‌کنندگانش را عوض می‌کند.

این قاعده توسط `frontend/src/app/hardcoded-colors.test.ts` **اجرا** می‌شود: شمار لیترال‌های رنگ هر فایل در `frontend/src/app/hardcoded-colors.baseline.ts` قفل شده و فقط مجاز است **کم** شود (یک جفت‌بند دوطرفه). افزودن لیترال تازه، یا کم‌کردن لیترال بدون پایین‌آوردن عدد در فهرست پایه، تست را قرمز می‌کند. گارد سه فرم را می‌شمارد: هگز (`#…`)، `rgba(`، و عددِ هگز (`0x…`، فرمی که Three.js/WebGL برای رنگ به کار می‌برد).

**پنج فایل استثنا دلیل مکتوب دارند** و دو دسته‌اند:

- چهار تای آن‌ها **آبشارِ CSS در دسترس ندارند**: تصویر Open Graph (satori)، `global-error.tsx`، `src/app/not-found.tsx` و سند HTML مستقلِ انتقال. سه تای آخر بیرونِ `[locale]/layout.tsx` رندر می‌شوند — تنها جایی که `globals.css` را import می‌کند — پس متغیرهای CSS در آن سند تعریف نشده‌اند.
- پنجمی (`neural-network-3d.tsx`) آبشار دارد ولی **ورودیِ رنگش عدد است**: رنگ را به Three.js/WebGL می‌دهد، جایی که `var()` به‌جای خودِ مقدار کار نمی‌کند.

افزودن استثنای تازه به دلیل فنی مکتوب و تأیید بازبین نیاز دارد. دو قاعده‌ای که هنگامِ تصمیم بینِ `RATCHET` و `EXCEPTIONS` لازم است:

- **سقفِ سختِ گارد فقط مجموعِ `RATCHET` است.** استثنا مقدار `scannedTotal` را بالا می‌برد ولی سقف را تکان نمی‌دهد، چون ضابطه `scannedTotal == baselineTotal + مجموعِ لیترالِ استثناها` است. معیارِ انتخاب: لیترال **بدهیِ مهاجرت‌پذیر** است (‏`RATCHET`، باید کم شود) یا **اجتناب‌ناپذیر** (`EXCEPTIONS`، قفل می‌ماند)؟ گذاشتنِ لیترالِ اجتناب‌ناپذیر در `RATCHET` سقف را بی‌دلیل بالا می‌برد و بدهیِ دروغینی می‌سازد که هرگز صفر نمی‌شود.
- **در متنِ دلیلِ استثنا مقدارِ رنگ ننویسید.** ‏`hardcoded-colors.baseline.ts` خودش زیر `src/` است و برخلافِ فایلِ تست کنار گذاشته نمی‌شود، پس توسط خودِ گارد شمارش می‌شود؛ آوردنِ مقدارِ رنگ در رشتهٔ دلیل، همان فایل را «فایلِ نامعلومِ دارای رنگ خام» می‌کند و گارد را قرمز می‌کند. رنگ را با **نقش** توصیف کنید نه با مقدار.

مستند تصمیم: `docs/adr/0039-design-token-standard-and-hardcoded-color-ratchet.md`. صفحهٔ `/design-system` مقدار زندهٔ هر توکن را در زمان اجرا از CSSOM می‌خواند و نشان می‌دهد، پس توکنِ تعریف‌نشده یا نگاشت‌نشده روی همان صفحه دیده می‌شود.

### ۶. چک‌لیست پیش از ارسال Pull Request

- [ ] `backend/.venv/bin/pre-commit run --all-files` بدون خطا اجرا شده است.
- [ ] تست‌های بک‌اند سبز هستند. **دستور باید با لایهٔ تنظیماتِ CI اجرا شود** (از پوشهٔ `backend/`):

      ```bash
      PYTHONPATH=../.github/ci DJANGO_SETTINGS_MODULE=ci_test_settings coverage run -m pytest -q && coverage report --fail-under=85
      ```

      بدونِ آن، `pytest.ini` تنظیماتِ `config.settings.dev` را بارگذاری می‌کند که حافظِ
      `CompressedManifestStaticFilesStorage` است؛ قالب‌های ادمین (jazzmin) سپس
      `{% static "vendor/bootswatch" %}` را روی یک **پوشه** صدا می‌زنند و هر تستی که
      ادمین را رندر می‌کند با `ValueError: Missing staticfiles manifest entry` و در
      نتیجه HTTP 500 می‌شکند — در اندازه‌گیریِ این ریپو **۲۹ تا ۳۴ شکستِ کاذب**.
      لایهٔ تنظیماتِ CI (‏`.github/ci/ci_test_settings.py`، موضوع `ADR-0038`) فقط کلید
      `staticfiles` را به `StaticFilesStorage` ساده تغییر می‌دهد. امضای این اشتباه،
      شکست در فایل‌هایی است که ادمین را رندر می‌کنند (`test_two_factor`، `test_security`،
      `test_redirects`، `test_admin_*`). توجه: اجرای `collectstatic` این مشکل را حل
      **نمی‌کند** (فقط ۳۴ را به ۲۹ کاهش می‌دهد) و CI عمداً هیچ گامِ `collectstatic` ندارد.
- [ ] تست‌های فرانت‌اند (`npm run test:coverage`) و `npm run build` سبز هستند. توجه: گیت ۸۵٪ فقط `src/lib` و `src/components/{ui,molecules,organisms,seo}` را می‌سنجد و `src/app/**`، `ui-port/**`، `src/i18n/**` و `src/proxy.ts` خارج از آن‌اند (بند ۶.۴ مستندات فنی) — با این حال کد تازه در هر مسیری که باشد باید تست داشته باشد.
- [ ] رنگ‌ها از توکن می‌آیند: `hardcoded-colors.test.ts` سبز است و شمار لیترال‌های رنگ هیچ فایلی افزایش نیافته.
- [ ] در صورت تغییر ترجمه، `python scripts/i18n.py check` سبز است و کلیدهای `messages/fa.json` و `messages/en.json` متقارن‌اند.
- [ ] مستندات به‌روزرسانی شده‌اند: `docs/TECHNICAL_DOCUMENTATION.{fa,en}.md` و `CHANGELOG.md`. **اگر ADR تازه‌ای نوشته‌اید، `docs/adr/README.md` (فهرستِ معتبر) و جدولِ خلاصهٔ ADRها در هر دو نسخهٔ `TECHNICAL_DOCUMENTATION` را هم اضافه کنید** — سه فهرستِ موازیِ ADR پیش‌تر کهنه مانده بودند و علتش همین بود.

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

- **Forbidden:** hex, `rgba()` or a numeric `0x…` color inside `className` (e.g. `text-[#1FAE6E]`), inside `style={{}}`, or as a library's color input (e.g. a Three.js material).
- **Required:** token-based utilities (`text-primary`, `bg-emerald-deep`) or `var(--token)`.
- **No matching token?** Create one in `frontend/src/app/globals.css` first: declare the value in `:root` **and** map it in `@theme inline` as `--color-<name>`. Without the mapping no utility is generated, and the next contributor falls back to a raw literal.
- **Never edit an existing token's value** to fit new code; add a new token instead. Changing a token value restyles every consumer of it.

Enforced by `frontend/src/app/hardcoded-colors.test.ts`: the raw-color count of every file is locked in `frontend/src/app/hardcoded-colors.baseline.ts` and may only go **down** (a two-way ratchet). Adding a literal — or removing one without lowering the recorded number — fails the test. The guard counts three forms: hex (`#…`), `rgba(`, and numeric hex (`0x…`, the form Three.js/WebGL takes colors in).

**Five files are documented exceptions**, in two groups:

- Four of them **have no CSS cascade available**: the Open Graph image (satori), `global-error.tsx`, `src/app/not-found.tsx`, and the standalone redirect HTML document. The last three render outside `[locale]/layout.tsx` — the only place that imports `globals.css` — so CSS custom properties are not defined in those documents.
- The fifth (`neural-network-3d.tsx`) does have a cascade but its **color input is a number**: it feeds Three.js/WebGL, where `var()` cannot stand in for the value itself.

A new exception requires a written technical reason and reviewer approval. Two rules matter when choosing between `RATCHET` and `EXCEPTIONS`:

- **The hard ceiling sums `RATCHET` only.** An exception raises `scannedTotal` but never moves the ceiling, because the invariant is `scannedTotal == baselineTotal + sum(exception literals)`. The test to apply: is the literal **migratable debt** (`RATCHET`, must go down) or **unavoidable** (`EXCEPTIONS`, stays locked)? Filing an unavoidable literal under `RATCHET` inflates the ceiling for no reason and invents a debt that can never reach zero.
- **Never put a color value in an exception's reason text.** `hardcoded-colors.baseline.ts` is itself under `src/` and, unlike the test file, is not excluded — so the guard scans it. A color literal in a reason string turns that very file into an "unknown file with raw colors" and fails the guard. Describe colors by **role**, not by value.

Decision record: `docs/adr/0039-design-token-standard-and-hardcoded-color-ratchet.md`.
### 5. Pre-Pull-Request Checklist

- [ ] `backend/.venv/bin/pre-commit run --all-files` passes with no errors.
- [ ] Backend tests are green. **They must be run through the CI settings shim** (from `backend/`):

      ```bash
      PYTHONPATH=../.github/ci DJANGO_SETTINGS_MODULE=ci_test_settings coverage run -m pytest -q && coverage report --fail-under=85
      ```

      Without it, `pytest.ini` loads `config.settings.dev`, which keeps
      `CompressedManifestStaticFilesStorage`; Jazzmin's admin templates then call
      `{% static "vendor/bootswatch" %}` on a directory and every admin-rendering
      test fails with `ValueError: Missing staticfiles manifest entry` — 29 to 34
      spurious failures in this repository. Running `collectstatic` does **not** fix
      it (34 merely drops to 29). See `ADR-0038`.
- [ ] Frontend tests (`npm run test:coverage`) and `npm run build` are green. Note the 85% gate measures only `src/lib` and `src/components/{ui,molecules,organisms,seo}`, not `src/app/**` or the `ui-port` shell.
- [ ] Colors come from tokens: `hardcoded-colors.test.ts` is green and no file's raw-color count has increased.
- [ ] If translations changed, `python scripts/i18n.py check` is green and the `messages/fa.json` and `messages/en.json` key trees are symmetric.
- [ ] Documentation is updated: `docs/TECHNICAL_DOCUMENTATION.{fa,en}.md` and `CHANGELOG.md`. **If you wrote a new ADR, also add it to `docs/adr/README.md` (the authoritative index) and to the ADR summary table in both `TECHNICAL_DOCUMENTATION` files** — three parallel ADR lists went stale previously for exactly this reason.

### 6. Scope of the "20 Hard Rules"

The Persian section 2 summarises the project's hard rules. That summary is
deliberately partial: it covers rules 3 and 5 through 19, and rules 1, 2, 4 and 20
are not restated there. **No complete enumerated list of all 20 rules exists
anywhere in this repository.** A Package 7 audit found that 19 of the 20 are cited
by number across the ADRs (only rule 1 is never mentioned), but the normative text
was never collected in one place. When you need the precise wording of a rule, the
ADR that cites it carries the decision context.
 The `/design-system` page reads every token's live value from the CSSOM at runtime and displays it, so an undefined or unmapped token is visible on that page.
