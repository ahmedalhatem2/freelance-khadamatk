# 🧪 دليل تشغيل الاختبارات - KhadamatK Frontend

## 📋 نظرة عامة

هذا الدليل يوضح كيفية تشغيل جميع أنواع الاختبارات في مشروع KhadamatK Frontend.

---

## 🛠️ متطلبات التشغيل

### تثبيت التبعيات:

```bash
npm install
```

### تثبيت أدوات الاختبار الإضافية:

```bash
npm install -D @playwright/test lighthouse-ci vite-bundle-analyzer
```

### تثبيت متصفحات Playwright:

```bash
npx playwright install
```

---

## 🧪 اختبارات الوحدات (Unit Tests)

### تشغيل جميع الاختبارات:

```bash
npm run test
```

### تشغيل الاختبارات في وضع المراقبة:

```bash
npm run test:watch
```

### تشغيل الاختبارات مع تقرير التغطية:

```bash
npm run test:coverage
```

### تشغيل اختبار محدد:

```bash
npm test -- --testNamePattern="Navbar Component"
```

---

## 🎭 اختبارات End-to-End (E2E)

### تشغيل جميع اختبارات E2E:

```bash
npm run test:e2e
```

### تشغيل اختبارات E2E مع واجهة المستخدم:

```bash
npm run test:e2e:ui
```

### تشغيل اختبارات E2E مع المتصفح المرئي:

```bash
npm run test:e2e:headed
```

### تشغيل اختبار محدد:

```bash
npx playwright test tests/e2e/navigation.spec.ts
```

### تشغيل اختبارات على متصفح محدد:

```bash
npx playwright test --project=chromium
```

---

## 📊 اختبارات الأداء (Lighthouse)

### تشغيل اختبارات Lighthouse:

```bash
npm run lighthouse
```

### تشغيل Lighthouse على صفحة محددة:

```bash
npx lhci autorun --url=http://localhost:5173/services
```

### تشغيل Lighthouse في وضع التطوير:

```bash
npx lhci collect --url=http://localhost:5173/
npx lhci assert
```

---

## 🔍 تحليل الكود

### تشغيل ESLint:

```bash
npm run lint
```

### إصلاح الأخطاء تلقائياً:

```bash
npm run lint:fix
```

### فحص أنواع TypeScript:

```bash
npm run type-check
```

---

## 📦 تحليل حجم الحزمة

### بناء المشروع وتحليل الحزمة:

```bash
npm run analyze
```

### بناء المشروع فقط:

```bash
npm run build
```

---

## 🚀 تشغيل جميع الاختبارات

### تشغيل سلسلة الاختبارات الكاملة:

```bash
npm run test:all
```

هذا الأمر سيشغل:

1. ESLint (تحليل الكود)
2. TypeScript Check (فحص الأنواع)
3. Unit Tests (اختبارات الوحدات)
4. E2E Tests (اختبارات التكامل)

---

## 📊 فهم النتائج

### نتائج اختبارات الوحدات:

```bash
✅ PASS  src/components/__tests__/Navbar.test.tsx
✅ PASS  src/components/__tests__/ServiceCard.test.tsx

Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        3.45 s
```

### نتائج اختبارات E2E:

```bash
✅ 11 tests passed
⏱️  2.3s
📊 11/11 tests passed
```

### نتائج Lighthouse:

```json
{
  "performance": 92,
  "accessibility": 95,
  "best-practices": 88,
  "seo": 90
}
```

---

## 🔧 استكشاف الأخطاء

### مشاكل شائعة في اختبارات الوحدات:

```bash
# خطأ: Cannot find module
npm install

# خطأ: Test environment
npm install -D jsdom

# خطأ: React Testing Library
npm install -D @testing-library/react @testing-library/jest-dom
```

### مشاكل شائعة في اختبارات E2E:

```bash
# خطأ: Browser not found
npx playwright install

# خطأ: Port already in use
lsof -ti:5173 | xargs kill -9

# خطأ: Timeout
# زيادة timeout في playwright.config.ts
```

### مشاكل شائعة في Lighthouse:

```bash
# خطأ: Chrome not found
npm install -g lighthouse

# خطأ: Port not accessible
# تأكد من تشغيل الخادم على localhost:5173
```

---

## 📈 تحسين الأداء

### تحسين سرعة الاختبارات:

```bash
# تشغيل الاختبارات بالتوازي
npm test -- --maxWorkers=4

# تشغيل اختبارات E2E بالتوازي
npx playwright test --workers=4
```

### تحسين تغطية الاختبارات:

```bash
# عرض تقرير التغطية التفصيلي
npm run test:coverage -- --coverageReporters=html

# فتح تقرير التغطية في المتصفح
open coverage/lcov-report/index.html
```

---

## 🎯 أفضل الممارسات

### كتابة اختبارات الوحدات:

```typescript
// ✅ جيد
test("should render component correctly", () => {
  render(<Component />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});

// ❌ سيء
test("should work", () => {
  // اختبار غامض
});
```

### كتابة اختبارات E2E:

```typescript
// ✅ جيد
test("should navigate to services page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Services");
  await expect(page).toHaveURL("/services");
});

// ❌ سيء
test("should work", async ({ page }) => {
  await page.goto("/");
  // اختبار غامض
});
```

---

## 📞 الدعم والمساعدة

### للحصول على المساعدة:

1. راجع هذا الدليل
2. تحقق من وثائق الأدوات المستخدمة
3. راجع ملفات التكوين في المشروع

### روابط مفيدة:

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/docs/intro)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [ESLint](https://eslint.org/docs/user-guide/)

---

_تم إنشاء هذا الدليل لضمان جودة عالية في اختبارات المشروع._
