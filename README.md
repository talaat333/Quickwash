# كويك واش — QuickWash

موقع تعريفي وحجز لخدمة **غسيل سيارات جاف متنقّل**، مبني بـ Next.js 14 (App Router) و TypeScript و Tailwind CSS، بواجهة عربية RTL بالكامل.

> ملاحظة مهمة: هذه خدمة غسيل **جاف بدون ماء**. لا تُستخدم أي صور أو نصوص تُوحي بالماء أو الخراطيم أو أنفاق الغسيل.

## التشغيل محلياً

المتطلبات: Node.js 18.18+ (يُفضّل 20).

```bash
# 1) تثبيت الحزم
npm install

# 2) إعداد متغيرات البيئة
copy .env.example .env.local   # على ويندوز
# cp .env.example .env.local   # على ماك/لينكس
# ثم عدّل القيم، أهمها NEXT_PUBLIC_API_BASE_URL

# 3) وضع التطوير
npm run dev
# افتح http://localhost:3000

# 4) بناء الإنتاج
npm run build
npm start
```

سكربتات إضافية: `npm run typecheck` للتحقق من الأنواع، و`npm run lint` للتحقق من الجودة.

## متغيرات البيئة

| المتغير | الوصف |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | العنوان الأساسي لواجهة الـ ASP.NET Core الخلفية (بدون / في النهاية). |
| `NEXT_PUBLIC_SITE_URL` | عنوان الموقع (يُستخدم في SEO وخريطة الموقع). |
| `NEXT_PUBLIC_APP_STORE_URL` / `NEXT_PUBLIC_GOOGLE_PLAY_URL` | روابط التطبيق. |
| `NEXT_PUBLIC_CONTACT_PHONE` / `_WHATSAPP` / `_EMAIL` | قنوات التواصل الظاهرة في الواجهة. |

## البنية

```
src/
  app/                # الصفحات (App Router) + layout + globals.css + الخطوط
    (marketing)/      # الصفحة الرئيسية بأقسامها
    booking/          # صفحة الحجز
    subscription/     # صفحة الاشتراك
  components/
    ui/               # نظام التصميم (أزرار، حقول، Stepper، Dialog…)
    layout/           # Navbar، Footer، Container، Section، CustomCursor
    marketing/        # أقسام الصفحة الرئيسية
    booking/          # معالج الحجز وخطواته
    subscription/     # معالج الاشتراك وخطواته
    system/           # حالات الخطأ/عدم الاتصال/الفراغ
  features/           # منطق كل مجال (تحقق Zod، DTOs، استدعاءات API)
    bookings/  subscriptions/  payments/
  data/               # المحتوى (خدمات، اشتراكات، أسئلة، آراء…)
  lib/                # عميل API + أدوات مساعدة
  types/              # نماذج المجال
  config/             # إعدادات الموقع + التوكنز
public/               # الصور والأصول (استبدل الصور النائبة بصور حقيقية)
```

## ملاحظات للتطوير اللاحق

- **الربط بالـ Backend**: كل الاستدعاءات تمر عبر `src/lib/api/client.ts` وملفات `features/*/api`. اضبط `NEXT_PUBLIC_API_BASE_URL` ووصّل الـ endpoints في `src/lib/api/endpoints.ts`.
- **الدفع**: ملفات `src/features/payments/api` عبارة عن أماكن مخصّصة للربط ببوابة الدفع. لا يتم تأكيد أي دفعة من جهة الواجهة؛ الحالة تُعتمد من الـ Backend فقط. لا تضع بيانات سرية في الواجهة.
- **الاشتراك**: إرسال الطلب لا يُفعّل الاشتراك. تبدأ دورة العقد الورقي من الـ Backend (تجهيز → تسليم → توقيع → استلام → مراجعة → تفعيل).
- **الصور الحقيقية**: يستخدم الموقع `next/image` لتحميل صور فوتوغرافية حقيقية لكل قسم (مضبوطة في `src/config/images.ts`). على جهازك تظهر الصور مباشرةً (Unsplash مسموح في `next.config.mjs`)، ولو تعذّر تحميل صورة تظهر رسمة أنيقة كبديل تلقائي. لاستخدام صورك الخاصة ضع الملفات في `/public/images` بالأسماء الموضّحة في `public/images/IMAGES.md`. الخدمة غسيل **جاف** — تجنّب صور الماء.
- **الشعار**: مكوّن `Logo` نائب — استبدله بالشعار الرسمي.
- **الخط**: IBM Plex Sans Arabic مُستضاف محلياً داخل `src/app/fonts` (لا يعتمد على الإنترنت وقت البناء).
