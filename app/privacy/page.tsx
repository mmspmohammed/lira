// app/privacy/page.tsx
import { generateMetadata } from "@/lib/seo";
import { BackButton } from "@/components/BackButton";

export const metadata = generateMetadata({
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لموقع ليرة سوريا",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <BackButton />
      <h1 className="text-3xl font-black mb-6">سياسة الخصوصية</h1>

      <div className="prose dark:prose-invert max-w-none space-y-4">
        <p>نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>

        <h2 className="text-xl font-bold">البيانات التي نجمعها</h2>
        <ul className="list-disc list-inside">
          <li>اشتراكات الإشعارات (Push Notifications) — تخزن بشكل مشفر</li>
          <li>عنوان IP — لأغراض أمنية وتحليلية فقط</li>
          <li>User Agent — لتحسين تجربة الاستخدام</li>
        </ul>

        <h2 className="text-xl font-bold">كيف نستخدم البيانات</h2>
        <p>نستخدم البيانات فقط لإرسال التنبيهات التي اشتركت بها وتحسين أداء الموقع. لا نبيع أو نشارك بياناتك مع أطراف ثالثة.</p>

        <h2 className="text-xl font-bold">الإشعارات</h2>
        <p>يمكنك إلغاء اشتراك الإشعارات في أي وقت عبر إعدادات المتصفح أو زر "إلغاء الإشعارات" في القائمة.</p>
      </div>
    </div>
  );
}
