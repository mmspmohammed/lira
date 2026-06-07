// app/not-found.tsx
import Link from "next/link";
import { Home } from "lucide-react";

export const metadata = {
  title: "404 - الصفحة غير موجودة | ليرة سوريا",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-9xl font-black bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
        404
      </div>
      <h1 className="text-2xl font-bold mb-4">الصفحة المطلوبة غير موجودة</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        ربما تم نقل الصفحة أو حذفها. يمكنك العودة للصفحة الرئيسية.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105"
      >
        <Home className="w-5 h-5" />
        العودة للرئيسية
      </Link>
    </div>
  );
}
