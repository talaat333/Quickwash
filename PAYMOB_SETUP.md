# إعداد Paymob (وضع الاختبار) — QuickWash

هذا التطبيق **Next.js واحد** (واجهة + خادم في نفس المشروع). كل أسرار Paymob تُقرأ في
الخادم فقط عبر متغيرات بيئة، ولا تصل للمتصفح إطلاقاً.

## 1) افتح لوحة Paymob
سجّل الدخول إلى حساب Paymob (اختر **Test Mode**).

## 2) احصل على القيم الأربع (وضع الاختبار)
| المتغيّر | من أين تحصل عليه في لوحة Paymob |
| --- | --- |
| `PAYMOB_SECRET_KEY`   | Settings → Account Info → **Secret Key** (يبدأ بـ `egy_sk_test_...`) |
| `PAYMOB_PUBLIC_KEY`   | Settings → Account Info → **Public Key** (يبدأ بـ `egy_pk_test_...`) |
| `PAYMOB_INTEGRATION_ID` | Developers → Payment Integrations → معرّف تكامل **البطاقة** (رقم) |
| `PAYMOB_HMAC_SECRET`  | Developers → **HMAC** |

## 3) ضعها في `.env.local`
انسخ `.env.example` إلى `.env.local` واملأ:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
PAYMOB_SECRET_KEY=egy_sk_test_xxxxxxxx
PAYMOB_PUBLIC_KEY=egy_pk_test_xxxxxxxx
PAYMOB_INTEGRATION_ID=123456
PAYMOB_HMAC_SECRET=xxxxxxxx
```
> لا تضع هذه القيم في الكود أو في متغيّرات `NEXT_PUBLIC_`.

## 4) روابط لوحة Paymob (بعد النشر، استبدل الدومين)
- **Transaction Processed Callback (Webhook):**
  `https://YOUR-DOMAIN.com/api/payments/webhook`
- **Transaction Response Callback (Customer Return):**
  `https://YOUR-DOMAIN.com/payment/result`

للتجربة محلياً استخدم نفقاً عاماً (مثل `ngrok http 3000`) وضع رابط النفق مكان الدومين،
واضبط `NEXT_PUBLIC_APP_URL` على رابط النفق.

## 5) شغّل تجربة دفع
1. `npm install && npm run dev`
2. افتح `http://localhost:3000/booking`
3. أكمل الحجز واختر **بطاقة أونلاين** ثم **تأكيد الطلب**.
4. ستُحوّل إلى صفحة Paymob (Unified Checkout).
5. استخدم بطاقة اختبار Paymob (من توثيق Paymob الرسمي لبطاقات الاختبار).

## 6) كيف تعرف أنها نجحت
- بعد الدفع تعود إلى `‎/payment/result`‎ وتظهر **"تم الدفع بنجاح"** — وتظهر فقط عندما
  يتحقّق توقيع HMAC القادم من Paymob في الخادم (لا نثق بـ `?success` وحده).
- يستقبل `‎/api/payments/webhook`‎ إشعار Paymob ويتحقق من HMAC ويسجّل النتيجة.

## ملاحظة مهمة
الكود يستخدم تدفّق Paymob الحالي: **Payment Intention + Unified Checkout**.
تأكّد من مطابقة أسماء الحقول وترتيب حقول HMAC مع توثيق حسابك في Paymob قبل الإنتاج.
