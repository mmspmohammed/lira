// app/terms/page.tsx
import { generateMetadata } from "@/lib/seo";
import { BackButton } from "@/components/BackButton";

export const metadata = generateMetadata({
  title: "شروط الاستخدام",
  description: "شروط وأحكام استخدام موقع ليرة سوريا",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <BackButton />
      <h1 className="text-3xl font-black mb-6">شروط الاستخدام</h1>

      <div className="prose dark:prose-invert max-w-none space-y-4">
        <p>باستخدامك لموقع <strong>ليرة سوريا</strong>، فإنك توافق على الشروط التالية:</p>

        <h2 className="text-xl font-bold">1. دقة المعلومات</h2>
        <p>نبذل قصارى جهدنا لضمان دقة البيانات، لكن الأسعار تتغير باستمرار وقد تختلف في السوق الفعلي. ننصح بالتحقق من الأسعار قبل أي معاملة مالية.</p>

        <h2 className="text-xl font-bold">2. الاستخدام الشخصي</h2>
        <p>المحتوى مخصص للاستخدام الشخصي غير التجاري. يحظر إعادة نشر البيانات آلياً (scraping) دون إذن.</p>

        <h2 className="text-xl font-bold">3. الإشعارات</h2>
        <p>الإشعارات هي خدمة اختيارية. نحن غير مسؤولين عن تأخر أو فشل وصول الإشعارات بسبب مشاكل تقنية خارجة عن إرادتنا.</p>
      </div>
    </div>
  );
}
