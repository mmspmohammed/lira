// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-muted-foreground animate-pulse">جاري التحميل...</p>
    </div>
  );
}
