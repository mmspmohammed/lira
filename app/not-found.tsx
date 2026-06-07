// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">الصفحة المطلوبة غير موجودة</p>
      <a href="/" className="rounded-full bg-primary px-6 py-3 text-primary-foreground font-bold hover:scale-105 transition">
        العودة للرئيسية
      </a>
    </div>
  );
}
