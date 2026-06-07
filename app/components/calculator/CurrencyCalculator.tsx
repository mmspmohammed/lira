"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowRightLeft } from "lucide-react";

export function CurrencyCalculator() {
  const [rates, setRates] = useState<any[]>([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("SYP");
  const [result, setResult] = useState(0);

  useEffect(() => {
    supabase.from("v_latest_exchange_rates").select("*").then(({ data }) => {
      setRates(data || []);
    });
  }, []);

  useEffect(() => {
    const fromRate = rates.find((r) => r.currency_code === from);
    const toRate = rates.find((r) => r.currency_code === to);
    if (!fromRate || !toRate) return;

    const val = from === "USD" && to === "SYP" 
      ? amount * (fromRate.sell_rate || 1)
      : from === "SYP" && to === "USD"
      ? amount / (toRate.sell_rate || 1)
      : amount * (fromRate.rate_vs_usd || 1) / (toRate.rate_vs_usd || 1);
    
    setResult(Number(val.toFixed(2)));
  }, [amount, from, to, rates]);

  const currencies = rates.map((r) => ({ code: r.currency_code, name: r.currency_name_ar }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">المبلغ</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-lg font-bold"
          />
        </div>
        <div className="w-32">
          <label className="text-sm font-medium mb-1 block">من</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3">
            {currencies.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
        </div>
        <div className="pt-6"><ArrowRightLeft className="w-5 h-5 text-muted-foreground" /></div>
        <div className="w-32">
          <label className="text-sm font-medium mb-1 block">إلى</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3">
            {currencies.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
        </div>
      </div>
      <div className="rounded-2xl bg-primary/10 border border-primary/20 p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">النتيجة</p>
        <p className="text-4xl font-black text-primary">{result.toLocaleString()} <span className="text-lg">{to}</span></p>
      </div>
    </div>
  );
}
