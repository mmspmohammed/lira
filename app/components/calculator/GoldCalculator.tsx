"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { calculateGoldKarats } from "@/lib/format";

export function GoldCalculator() {
  const [usdRate, setUsdRate] = useState(0);
  const [ounceUsd, setOunceUsd] = useState(2000);
  const [karat, setKarat] = useState(21);
  const [grams, setGrams] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    supabase.from("v_latest_exchange_rates").select("sell_rate").eq("currency_code", "USD").single()
      .then(({ data }) => setUsdRate(data?.sell_rate || 15000));
    supabase.from("v_latest_gold").select("ounce_usd").single()
      .then(({ data }) => data?.ounce_usd && setOunceUsd(data.ounce_usd));
  }, []);

  useEffect(() => {
    const karats = calculateGoldKarats(ounceUsd, usdRate);
    const gramPrice = (karats as any)[`karat_${karat}`] || karats.karat_21;
    setPrice(Math.round(gramPrice * grams));
  }, [ounceUsd, usdRate, karat, grams]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">العيار</label>
          <select value={karat} onChange={(e) => setKarat(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-4 py-3">
            {[24, 22, 21, 18, 14].map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">الجرامات</label>
          <input type="number" value={grams} onChange={(e) => setGrams(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-4 py-3" />
        </div>
      </div>
      <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">السعر التقريبي</p>
        <p className="text-4xl font-black text-yellow-600">{price.toLocaleString()} <span className="text-lg">ل.س</span></p>
      </div>
    </div>
  );
}
