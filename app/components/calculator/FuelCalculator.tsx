"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function FuelCalculator() {
  const [fuels, setFuels] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [liters, setLiters] = useState(20);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    supabase.from("fuel_prices").select("*").eq("is_latest", true).then(({ data }) => {
      setFuels(data || []);
      if (data?.[0]) setSelected(data[0].id);
    });
  }, []);

  useEffect(() => {
    const fuel = fuels.find((f) => f.id === selected);
    setPrice(Math.round((fuel?.price || 0) * liters));
  }, [selected, liters, fuels]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">نوع الوقود</label>
          <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3">
            {fuels.map((f) => <option key={f.id} value={f.id}>{f.subtype || f.fuel_type}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">عدد الليترات</label>
          <input type="number" value={liters} onChange={(e) => setLiters(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-4 py-3" />
        </div>
      </div>
      <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">التكلفة</p>
        <p className="text-4xl font-black text-red-600">{price.toLocaleString()} <span className="text-lg">ل.س</span></p>
      </div>
    </div>
  );
}
