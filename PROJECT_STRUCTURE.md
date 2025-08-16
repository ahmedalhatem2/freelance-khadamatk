# 🏗️ هيكلية مشروع KhadamatK Frontend

## 📋 نظرة عامة على المشروع

**اسم المشروع:** KhadamatK - منصة خدمات فريلانس  
**نوع التطبيق:** Single Page Application (SPA)  
**التقنيات الأساسية:** React 18.3.1, TypeScript 5.5.3, Tailwind CSS 3.4.11, Vite 5.4.1  
**إدارة الحالة:** React Query + Context API  
**نظام التوجيه:** React Router DOM  
**مكونات UI:** Radix UI + Shadcn/ui

---

## 📁 هيكلية المجلدات والملفات

```
freelance-khadamatk/
├── 📄 ملفات التكوين الأساسية
│   ├── package.json                 # تبعيات المشروع وسكريبتات التشغيل
│   ├── package-lock.json           # قفل إصدارات التبعيات
│   ├── bun.lockb                  # قفل إصدارات Bun
│   ├── tsconfig.json              # تكوين TypeScript الرئيسي
│   ├── tsconfig.app.json          # تكوين TypeScript للتطبيق
│   ├── tsconfig.node.json         # تكوين TypeScript لـ Node.js
│   ├── vite.config.ts             # تكوين Vite للبناء والتطوير
│   ├── tailwind.config.ts         # تكوين Tailwind CSS
│   ├── postcss.config.js          # تكوين PostCSS
│   ├── eslint.config.js           # تكوين ESLint
│   ├── components.json            # تكوين Shadcn/ui
│   └── index.html                # ملف HTML الرئيسي
│
├── 📁 public/                     # الملفات العامة
│   └── placeholder.svg            # صورة placeholder
│
├── 📁 src/                        # كود المصدر الرئيسي
│   ├── 📄 main.tsx               # نقطة دخول التطبيق
│   ├── 📄 App.tsx                # المكون الرئيسي للتطبيق
│   ├── 📄 App.css                # أنماط CSS للتطبيق
│   ├── 📄 index.css              # أنماط CSS العامة
│   ├── 📄 vite-env.d.ts          # تعريفات Vite
│   │
│   ├── 📁 api/                   # خدمات API
│   │   ├── categories.ts          # API للفئات
│   │   ├── conversations.ts       # API للمحادثات
│   │   ├── notifications.ts       # API للإشعارات
│   │   ├── orders.ts             # API للطلبات
│   │   ├── rates.ts              # API للتقييمات
│   │   ├── regions.ts            # API للمناطق
│   │   ├── roles.ts              # API للأدوار
│   │   ├── services.ts           # API للخدمات
│   │   └── users.ts             # API للمستخدمين
│   │
│   ├── 📁 assets/                # الأصول الثابتة
│   │   └── 📁 images/           # الصور
│   │       ├── k1.jpg           # صورة 1
│   │       ├── k2.jpg           # صورة 2
│   │       └── pictur_profile.jpg # صورة الملف الشخصي
│   │
│   ├── 📁 components/            # مكونات React
│   │   ├── 📁 auth/             # مكونات المصادقة
│   │   │   └── PrivateRoute.tsx  # مكون حماية المسارات
│   │   │
│   │   ├── 📁 footer/           # مكونات التذييل
│   │   │   └── Footer.tsx       # مكون التذييل
│   │   │
│   │   ├── 📁 freelancers/      # مكونات الفريلانسرز
│   │   │   └── Freelancers.tsx  # مكون قائمة الفريلانسرز
│   │   │
│   │   ├── 📁 hero/             # مكونات القسم الرئيسي
│   │   │   └── Hero.tsx         # مكون القسم الرئيسي
│   │   │
│   │   ├── 📁 navbar/           # مكونات شريط التنقل
│   │   │   ├── Navbar.tsx       # مكون شريط التنقل
│   │   │   └── NotificationsDropdown.tsx # قائمة الإشعارات
│   │   │
│   │   ├── 📁 providers/        # مكونات مقدمي الخدمات
│   │   │   ├── ProviderCard.tsx  # بطاقة مقدم الخدمة
│   │   │   ├── ProviderInfo.tsx  # معلومات مقدم الخدمة
│   │   │   ├── ProviderReviews.tsx # تقييمات مقدم الخدمة
│   │   │   ├── ProviderServiceCard.tsx # بطاقة خدمة المقدم
│   │   │   ├── ProviderServices.tsx # خدمات المقدم
│   │   │   ├── ProvidersList.tsx # قائمة مقدمي الخدمات
│   │   │   └── ServiceForm.tsx   # نموذج إضافة خدمة
│   │   │
│   │   ├── 📁 services/         # مكونات الخدمات
│   │   │   ├── Category.tsx      # مكون الفئة
│   │   │   ├── ServiceCard.tsx   # بطاقة الخدمة
│   │   │   ├── ServiceRequestDialog.tsx # حوار طلب الخدمة
│   │   │   └── ServicesList.tsx  # قائمة الخدمات
│   │   │
│   │   ├── 📁 theme/            # مكونات السمة
│   │   │   └── ThemeToggle.tsx   # مفتاح تبديل السمة
│   │   │
│   │   ├── 📁 ui/               # مكونات UI الأساسية (Shadcn/ui)
│   │   │   ├── accordion.tsx     # مكون الأكورديون
│   │   │   ├── alert-dialog.tsx  # حوار التنبيه
│   │   │   ├── alert.tsx         # مكون التنبيه
│   │   │   ├── aspect-ratio.tsx  # نسبة الأبعاد
│   │   │   ├── avatar.tsx        # مكون الصورة الرمزية
│   │   │   ├── badge.tsx         # مكون الشارة
│   │   │   ├── breadcrumb.tsx    # مكون فتات الخبز
│   │   │   ├── button.tsx        # مكون الزر
│   │   │   ├── calendar.tsx      # مكون التقويم
│   │   │   ├── card.tsx          # مكون البطاقة
│   │   │   ├── carousel.tsx      # مكون العرض المتحرك
│   │   │   ├── chart.tsx         # مكون الرسم البياني
│   │   │   ├── checkbox.tsx      # مكون مربع الاختيار
│   │   │   ├── collapsible.tsx   # مكون قابل للطي
│   │   │   ├── command.tsx       # مكون الأمر
│   │   │   ├── context-menu.tsx  # قائمة السياق
│   │   │   ├── custom-badge.tsx  # شارة مخصصة
│   │   │   ├── dialog.tsx        # مكون الحوار
│   │   │   ├── drawer.tsx        # مكون الدرج
│   │   │   ├── dropdown-menu.tsx # قائمة منسدلة
│   │   │   ├── form.tsx          # مكون النموذج
│   │   │   ├── hover-card.tsx    # بطاقة التحويم
│   │   │   ├── input-otp.tsx     # إدخال OTP
│   │   │   ├── input.tsx         # مكون الإدخال
│   │   │   ├── label.tsx         # مكون التسمية
│   │   │   ├── menubar.tsx       # شريط القائمة
│   │   │   ├── navigation-menu.tsx # قائمة التنقل
│   │   │   ├── pagination.tsx    # مكون الترقيم
│   │   │   ├── popover.tsx       # مكون الفقاعة
│   │   │   ├── progress.tsx      # مكون شريط التقدم
│   │   │   ├── radio-group.tsx   # مجموعة الأزرار الراديو
│   │   │   ├── resizable.tsx     # مكون قابل للتغيير
│   │   │   ├── scroll-area.tsx   # منطقة التمرير
│   │   │   ├── select.tsx        # مكون الاختيار
│   │   │   ├── separator.tsx     # مكون الفاصل
│   │   │   ├── sheet.tsx         # مكون الورقة
│   │   │   ├── sidebar.tsx       # مكون الشريط الجانبي
│   │   │   ├── skeleton.tsx      # مكون الهيكل العظمي
│   │   │   ├── slider.tsx        # مكون المنزلق
│   │   │   ├── sonner.tsx        # مكون الإشعارات
│   │   │   ├── switch.tsx        # مكون المفتاح
│   │   │   ├── table.tsx         # مكون الجدول
│   │   │   ├── tabs.tsx          # مكون التبويبات
│   │   │   ├── textarea.tsx      # مكون منطقة النص
│   │   │   ├── toast.tsx         # مكون الإشعار
│   │   │   ├── toaster.tsx       # مكون عارض الإشعارات
│   │   │   ├── toggle-group.tsx   # مجموعة المفاتيح
│   │   │   ├── toggle.tsx        # مكون المفتاح
│   │   │   ├── tooltip.tsx       # مكون التلميح
│   │   │   └── use-toast.ts      # Hook للإشعارات
│   │   │
│   │   └── 📁 __tests__/        # اختبارات المكونات
│   │       ├── Navbar.test.tsx   # اختبارات شريط التنقل
│   │       └── ServiceCard.test.tsx # اختبارات بطاقة الخدمة
│   │
│   ├── 📁 config/                # ملفات التكوين
│   │   └── api.ts               # تكوين API
│   │
│   ├── 📁 context/               # Context API
│   │   └── AuthProvider.tsx      # مزود المصادقة
│   │
│   ├── 📁 hooks/                 # Custom Hooks
│   │   ├── use-mobile.tsx        # Hook للكشف عن الأجهزة المحمولة
│   │   └── use-toast.ts          # Hook للإشعارات
│   │
│   ├── 📁 lib/                   # مكتبات مساعدة
│   │   └── utils.ts              # دوال مساعدة
│   │
│   ├── 📁 pages/                 # صفحات التطبيق
│   │   ├── 📁 admin/             # صفحات الإدارة
│   │   │   ├── AdminCategories.tsx # إدارة الفئات
│   │   │   ├── AdminDashboard.tsx  # لوحة تحكم الإدارة
│   │   │   ├── AdminLayout.tsx     # تخطيط الإدارة
│   │   │   ├── AdminProfile.tsx    # ملف الإدارة الشخصي
│   │   │   ├── AdminRegions.tsx    # إدارة المناطق
│   │   │   ├── AdminRoles.tsx      # إدارة الأدوار
│   │   │   ├── AdminServices.tsx   # إدارة الخدمات
│   │   │   └── AdminUsers.tsx     # إدارة المستخدمين
│   │   │
│   │   ├── ClientProfile.tsx      # ملف العميل الشخصي
│   │   ├── Conversations.tsx      # صفحة المحادثات
│   │   ├── EditProviderProfile.tsx # تعديل ملف مقدم الخدمة
│   │   ├── Index.tsx             # الصفحة الرئيسية
│   │   ├── Login.tsx             # صفحة تسجيل الدخول
│   │   ├── NotFound.tsx          # صفحة 404
│   │   ├── ProviderDetails.tsx    # تفاصيل مقدم الخدمة
│   │   ├── ProviderProfile.tsx    # ملف مقدم الخدمة الشخصي
│   │   ├── Providers.tsx         # صفحة مقدمي الخدمات
│   │   ├── Register.tsx          # صفحة التسجيل
│   │   ├── RegisterSteps.tsx     # خطوات التسجيل
│   │   ├── ServiceDetails.tsx     # تفاصيل الخدمة
│   │   ├── Services.tsx          # صفحة الخدمات
│   │   └── ShoppingCart.tsx      # صفحة سلة التسوق
│   │
│   ├── 📁 providers/             # مزودي Context
│   │   └── ThemeProvider.tsx     # مزود السمة
│   │
│   ├── 📁 types/                 # تعريفات TypeScript
│   │   └── api.ts               # أنواع API
│   │
│   └── 📄 setupTests.ts          # إعداد الاختبارات
│
├── 📁 tests/                     # اختبارات E2E
│   └── 📁 e2e/                  # اختبارات End-to-End
│       ├── navigation.spec.ts     # اختبارات التنقل
│       └── authentication.spec.ts # اختبارات المصادقة
│
├── 📄 ملفات الاختبار والتكوين
│   ├── jest.config.js             # تكوين Jest للاختبارات
│   ├── playwright.config.ts       # تكوين Playwright
│   ├── lighthouserc.js           # تكوين Lighthouse CI
│   ├── .eslintrc.js              # تكوين ESLint
│   ├── TEST_REPORT.md            # تقرير الاختبارات
│   └── TESTING_GUIDE.md          # دليل تشغيل الاختبارات
│
└── 📄 ملفات التوثيق
    ├── README.md                  # دليل المشروع
    └── FRONTEND_ENGINEERING_TEST.md # اختبار هندسة Frontend
```

---

## 🏛️ الهيكلية المعمارية

### 📊 **نمط التصميم المستخدم:**

- **Component-Based Architecture:** بناء على مكونات React
- **Provider Pattern:** استخدام Context API لإدارة الحالة
- **Custom Hooks:** إعادة استخدام المنطق
- **Service Layer:** فصل منطق الأعمال عن المكونات

### 🔄 **تدفق البيانات:**

```
API Layer (src/api/)
    ↓
Service Layer (Custom Hooks)
    ↓
Context Layer (src/context/)
    ↓
Component Layer (src/components/, src/pages/)
    ↓
UI Layer (src/components/ui/)
```

### 🎯 **فصل المسؤوليات:**

#### **1. طبقة العرض (Presentation Layer):**

- `src/components/ui/` - مكونات UI الأساسية
- `src/components/` - مكونات الأعمال
- `src/pages/` - صفحات التطبيق

#### **2. طبقة المنطق (Logic Layer):**

- `src/hooks/` - Custom Hooks
- `src/context/` - إدارة الحالة العامة
- `src/lib/` - دوال مساعدة

#### **3. طبقة البيانات (Data Layer):**

- `src/api/` - خدمات API
- `src/types/` - تعريفات TypeScript

#### **4. طبقة التكوين (Configuration Layer):**

- `src/config/` - إعدادات التطبيق
- `src/providers/` - مزودي Context

---

## 🛠️ التقنيات والأدوات

### **Frontend Framework:**

- **React 18.3.1** - مكتبة واجهة المستخدم
- **TypeScript 5.5.3** - لغة البرمجة مع أنواع ثابتة

### **Styling:**

- **Tailwind CSS 3.4.11** - إطار عمل CSS
- **Shadcn/ui** - مكتبة مكونات UI
- **Radix UI** - مكونات UI بدائية

### **Build Tools:**

- **Vite 5.4.1** - أداة البناء والتطوير
- **PostCSS** - معالج CSS
- **Autoprefixer** - إضافة prefixes تلقائياً

### **State Management:**

- **React Query (TanStack Query)** - إدارة حالة الخادم
- **Context API** - إدارة الحالة المحلية

### **Routing:**

- **React Router DOM 6.26.2** - نظام التوجيه

### **Forms:**

- **React Hook Form 7.53.0** - إدارة النماذج
- **Zod 3.23.8** - التحقق من صحة البيانات

### **Testing:**

- **Jest 29.7.0** - إطار عمل الاختبارات
- **React Testing Library 16.2.0** - اختبار مكونات React
- **Playwright** - اختبارات End-to-End
- **Lighthouse CI** - اختبارات الأداء

### **Development Tools:**

- **ESLint 9.9.0** - تحليل الكود
- **TypeScript ESLint** - قواعد ESLint لـ TypeScript
- **Prettier** - تنسيق الكود

---

## 📋 أنواع الملفات

### **ملفات TypeScript/React:**

- `.tsx` - ملفات React مع TypeScript
- `.ts` - ملفات TypeScript عادية
- `.css` - ملفات الأنماط

### **ملفات التكوين:**

- `.json` - ملفات JSON للتكوين
- `.js` - ملفات JavaScript للتكوين
- `.config.js` - ملفات تكوين الأدوات

### **ملفات الاختبار:**

- `.test.tsx` - ملفات اختبار المكونات
- `.spec.ts` - ملفات اختبار E2E

### **ملفات التوثيق:**

- `.md` - ملفات Markdown للتوثيق

---

## 🎯 أفضل الممارسات المطبقة

### **1. تنظيم الملفات:**

- فصل واضح بين المكونات والصفحات
- تجميع الملفات المتعلقة في مجلدات
- استخدام أسماء واضحة ووصفية

### **2. إدارة الحالة:**

- استخدام Context API للحالة العامة
- استخدام React Query لبيانات الخادم
- فصل منطق الأعمال في Custom Hooks

### **3. إعادة الاستخدام:**

- مكونات UI قابلة لإعادة الاستخدام
- Custom Hooks للمنطق المشترك
- دوال مساعدة في `src/lib/`

### **4. الأمان:**

- حماية المسارات مع `PrivateRoute`
- التحقق من الأدوار والصلاحيات
- معالجة آمنة للبيانات

### **5. الأداء:**

- تقسيم الكود (Code Splitting)
- تحميل كسول للمكونات
- تحسين حجم الحزمة

---

## 🔧 إعدادات التطوير

### **Ports المستخدمة:**

- **5173** - خادم التطوير (Vite)
- **8000** - خادم API (Backend)

### **Environment Variables:**

- `VITE_API_BASE_URL` - عنوان API الأساسي
- `VITE_APP_NAME` - اسم التطبيق

### **Scripts المتاحة:**

```bash
npm run dev          # تشغيل خادم التطوير
npm run build        # بناء المشروع للإنتاج
npm run preview      # معاينة البناء
npm run test         # تشغيل الاختبارات
npm run test:e2e     # تشغيل اختبارات E2E
npm run lint         # تحليل الكود
npm run type-check   # فحص أنواع TypeScript
```

---

_تم إنشاء هذا الملف لتوضيح هيكلية المشروع ومساعدة المطورين على فهم البنية المعمارية._
