// components/LiveTicker.tsx
"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function LiveTicker({ rates }: { rates: any[] }) {
  const [current, setCurrent] = useState(0);

  const importantRates = rates.filter((r) => ["USD", "TRY", "EUR", "SAR", "BTC"].includes(r.currency_code));

  useEffect(() => {
    if (importantRates.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % importantRates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [importantRates.length]);

  if (!importantRates.length) return null;

  const rate = importantRates[current];
  const isPositive = (rate?.change_percent || 0) >= 0;

  return (
    <div className="border-y border-border/50 bg-background/40 backdrop-blur-sm py-3">
      <div className="container mx-auto px-4 flex items-center justify-center gap-6 text-sm">
        <span className="text-muted-foreground">مباشر:</span>
        <div className="flex items-center gap-2 font-bold">
          <span>{rate.currency_code}</span>
          <span>{rate.sell_rate?.toLocaleString()} ل.س</span>
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
            {Math.abs(rate.change_percent || 0).toFixed(2)}%
          </span>
        </div>
        <div className="flex gap-1">
          {importantRates.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition ${i === current ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
