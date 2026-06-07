"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function ElectricityCalculator() {
  const [tiers, setTiers] = useState<any[]>([]);
  const [kwh, setKwh] = useState(300);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    supabase.from("electricity_tariffs").select("*").eq("is_active", true).order("min_consumption")
      .then(({ data }) => setTiers(data || []));
  }, []);

  useEffect(() => {
    let remaining = kwh;
    let cost = 0;
    for (const tier of tiers) {
      if (remaining <= 0) break;
      const tierKwh = tier.max_consumption ? Math.min(remaining, tier.max_consumption - tier.min_consumption) : remaining;
      cost += tierKwh * tier.price_per_kwh;
      remaining -= tierKwh;
    }
    setTotal(Math.round(cost));
  }, [kwh, tiers]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">الاستهلاك الشهري (كيلو واط)</label>
        <input type="range" min="0" max="1000" value={kwh} onChange={(e) => setKwh(Number(e.target.value))} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>0</span>
          <span className="font-bold text-foreground">{kwh} كيلو واط</span>
          <span>1000</span>
        </div>
      </div>
      <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">التكلفة التقديرية</p>
        <p className="text-4xl font-black text-green-600">{total.toLocaleString()} <span className="text-lg">ل.س</span></p>
      </div>
    </div>
  );
}
