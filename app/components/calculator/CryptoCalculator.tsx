"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function CryptoCalculator() {
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [selected, setSelected] = useState("BTC");
  const [amount, setAmount] = useState(1);
  const [usdRate, setUsdRate] = useState(0);

  useEffect(() => {
    supabase.from("v_latest_crypto").select("*").then(({ data }) => setCryptos(data || []));
    supabase.from("v_latest_exchange_rates").select("sell_rate").eq("currency_code", "USD").single()
      .then(({ data }) => setUsdRate(data?.sell_rate || 0));
  }, []);

  const coin = cryptos.find((c) => c.currency_code === selected);
  const usdValue = (coin?.price_usd || 0) * amount;
  const sypValue = usdValue * usdRate;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">العملة</label>
          <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3">
            {cryptos.map((c) => <option key={c.currency_code} value={c.currency_code}>{c.currency_name_ar} ({c.currency_code})</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">الكمية</label>
          <input type="number" step="0.0001" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-4 py-3" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4 text-center">
          <p className="text-xs text-muted-foreground">USD</p>
          <p className="text-2xl font-black text-purple-600">${usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4 text-center">
          <p className="text-xs text-muted-foreground">SYP</p>
          <p className="text-2xl font-black text-primary">{sypValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} ل.س</p>
        </div>
      </div>
    </div>
  );
}
