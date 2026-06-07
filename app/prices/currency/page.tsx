// app/prices/currency/page.tsx
import { createServerSupabase } from "@/lib/supabase-server";
import { generateMetadata, PriceSchema, BreadcrumbSchema } from "@/lib/seo";
import { formatNumber, formatDate } from "@/lib/format";
import Script from "next/script";
import { BackButton } from "@/components/BackButton";
import { TrendingUp, TrendingDown } from "lucide-react";

export const metadata = generateMetadata({
  title: "أسعار العملات والصرف",
  description: "أسعار الدولار والليرة التركية واليورو والريال السعودي والدرهم الإماراتي مقابل الليرة السورية لحظياً",
  path: "/prices/currency",
});

export default async function CurrencyPage() {
  const supabase = createServerSupabase();
  const { data: rates } = await supabase
    .from("v_latest_exchange_rates")
    .select("*")
    .order("sort_order", { ascending: true });

  const usdRate = rates?.find((r) => r.currency_code === "USD");

  const jsonLd = PriceSchema("سعر الدولار الأمريكي", usdRate?.sell_rate || 0, "SYP", "currency");
  const breadcrumb = BreadcrumbSchema([
    { name: "الرئيسية", url: "https://lirasyp.com/" },
    { name: "أسعار العملات", url: "https://lirasyp.com/prices/currency" },
  ]);

  return (
    <>
      <Script id="price-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-black mb-2">أسعار العملات</h1>
        <p className="text-muted-foreground mb-8">آخر تحديث: {formatDate(new Date())}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rates?.map((rate) => {
            const isPositive = (rate.change_percent || 0) >= 0;
            return (
              <div
                key={rate.id}
                className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl p-6 hover:bg-background/80 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black">{rate.symbol}</span>
                    <div>
                      <h3 className="font-bold">{rate.currency_name_ar}</h3>
                      <p className="text-xs text-muted-foreground">{rate.currency_code}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(rate.change_percent || 0).toFixed(2)}%
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">سعر البيع</span>
                    <span className="font-bold text-lg">{formatNumber(rate.sell_rate)} ل.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">سعر الشراء</span>
                    <span className="font-medium">{formatNumber(rate.buy_rate)} ل.س</span>
                  </div>
                  {rate.rate_vs_usd && (
                    <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                      <span>مقابل الدولار</span>
                      <span>{formatNumber(rate.rate_vs_usd, 4)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
