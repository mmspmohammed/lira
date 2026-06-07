// hooks/useRates.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useRates() {
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      const { data } = await supabase.from("v_latest_exchange_rates").select("*");
      setRates(data || []);
      setLoading(false);
    };

    fetchRates();

    const subscription = supabase
      .channel("exchange_rates")
      .on("postgres_changes", { event: "*", schema: "public", table: "exchange_rates" }, fetchRates)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { rates, loading };
}
