// app/about/page.tsx
import { generateMetadata } from "@/lib/seo";
import { BackButton } from "@/components/BackButton";

export const metadata = generateMetadata({
  title: "من نحن",
  description: "عن موقع ليرة سوريا - مصدرك الموثوق لمتابعة الأسعار لحظياً",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <BackButton />
      <h1 className="text-3xl font-black mb-6">من نحن</h1>

      <div className="prose dark:prose-invert max-w-none space-y-4">
        <p>
          <strong>ليرة سوريا</strong> هو موقع متخصص في تقديم أسعار صرف الليرة السورية والعملات الأجنبية والذهب والعملات الرقمية والمحروقات والكهرباء بشكل لحظي ودقيق.
        </p>
        <p>
          نعتمد على مصادر موثوقة متعددة مثل <strong>Binance</strong> للعملات الرقمية، و<strong>LiraNews</strong> للعملات المحلية، ونحدث البيانات كل 5 دقائق لضمان دقة المعلومات.
        </p>
        <p>
          هدفنا تسهيل متابعة الأسواق السورية للمواطنين والتجار والمهتمين بالشأن الاقتصادي.
        </p>

        <h2 className="text-xl font-bold mt-8">الميزات الرئيسية</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>تحديث لحظي كل 5 دقائق</li>
          <li>أسعار دقيقة من مصادر متعددة</li>
          <li>آخر الأخبار الاقتصادية المصنفة</li>
          <li>حاسبات ذكية لتحويل العملات والذهب</li>
          <li>تنبيهات فورية عبر المتصفح</li>
        </ul>
      </div>
    </div>
  );
}
