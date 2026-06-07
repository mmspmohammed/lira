// app/error.tsx
"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">حدث خطأ ما</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {error.message || "عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground hover:scale-105 transition"
      >
        <RefreshCw className="w-4 h-4" />
        إعادة المحاولة
      </button>
    </div>
  );
}
