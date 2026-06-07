// app/prices/gold/page.tsx
import { createServerSupabase } from "@/lib/supabase-server";
import { generateMetadata, PriceSchema, BreadcrumbSchema } from "@/lib/seo";
import { formatNumber, formatDate } from "@/lib/format";
import Script from "next/script";
import { BackButton } from "@/components/BackButton";

export const metadata = generateMetadata({
  title: "أسعار الذهب",
  description: "أسعار الذهب عيار 24 و21 و18 بالليرة السورية والدولار لحظياً",
  path: "/prices/gold",
});

export default async function GoldPage() {
  const supabase = createServerSupabase();
  const { data: gold } = await supabase.from("v_latest_gold").select("*").single();
  const { data: usdRate } = await supabase
    .from("v_latest_exchange_rates")
    .select("sell_rate")
    .eq("currency_code", "USD")
    .single();

  const jsonLd = PriceSchema("الذهب عيار 21", gold?.karat_21 || 0, "SYP", "gold");
  const breadcrumb = BreadcrumbSchema([
    { name: "الرئيسية", url: "https://lirasyp.com/" },
    { name: "أسعار الذهب", url: "https://lirasyp.com/prices/gold" },
  ]);

  const karats = [
    { label: "عيار 24", key: "karat_24", color: "from-yellow-400 to-yellow-600" },
    { label: "عيار 22", key: "karat_22", color: "from-yellow-500 to-orange-500" },
    { label: "عيار 21", key: "karat_21", color: "from-orange-400 to-orange-600" },
    { label: "عيار 18", key: "karat_18", color: "from-orange-500 to-red-500" },
    { label: "عيار 14", key: "karat_14", color: "from-red-400 to-red-600" },
  ];

  return (
    <>
      <Script id="gold-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-black mb-2">أسعار الذهب</h1>
        <p className="text-muted-foreground mb-8">آخر تحديث: {gold ? formatDate(gold.fetched_at) : "—"}</p>

        {gold && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl p-6">
                <p className="text-sm text-muted-foreground mb-1">الأونصة العالمية</p>
                <p className="text-3xl font-black">${formatNumber(gold.ounce_usd)}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl p-6">
                <p className="text-sm text-muted-foreground mb-1">الأونصة بالليرة السورية</p>
                <p className="text-3xl font-black">{formatNumber(gold.ounce_syp)} ل.س</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {karats.map((k) => (
                <div key={k.key} className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl p-6 text-center hover:scale-[1.02] transition">
                  <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${k.color} mb-4 shadow-lg`} />
                  <h3 className="font-bold mb-2">{k.label}</h3>
                  <p className="text-2xl font-black">{formatNumber((gold as any)[k.key])} ل.س</p>
                  <p className="text-xs text-muted-foreground mt-2">للجرام</p>
                </div>
              ))}
            </div>

            {usdRate && (
              <div className="rounded-2xl bg-muted/50 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  سعر الدولار المستخدم: {formatNumber(usdRate.sell_rate)} ل.س
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
