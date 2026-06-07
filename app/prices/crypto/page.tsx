// app/prices/crypto/page.tsx
import { createServerSupabase } from "@/lib/supabase-server";
import { generateMetadata, PriceSchema, BreadcrumbSchema } from "@/lib/seo";
import { formatNumber, formatDate } from "@/lib/format";
import Script from "next/script";
import { BackButton } from "@/components/BackButton";
import { TrendingUp, TrendingDown } from "lucide-react";

export const metadata = generateMetadata({
  title: "أسعار العملات الرقمية",
  description: "أسعار البيتكوين والإيثيريوم والبينانس والسولانا والكاردانو والترون لحظياً",
  path: "/prices/crypto",
});

export default async function CryptoPage() {
  const supabase = createServerSupabase();
  const { data: cryptos } = await supabase.from("v_latest_crypto").select("*");

  const btc = cryptos?.find((c) => c.currency_code === "BTC");
  const jsonLd = btc ? PriceSchema("بيتكوين", btc.price_usd, "USD", "crypto") : undefined;
  const breadcrumb = BreadcrumbSchema([
    { name: "الرئيسية", url: "https://lirasyp.com/" },
    { name: "العملات الرقمية", url: "https://lirasyp.com/prices/crypto" },
  ]);

  return (
    <>
      {jsonLd && (
        <Script id="crypto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-black mb-2">العملات الرقمية</h1>
        <p className="text-muted-foreground mb-8">من Binance — آخر تحديث: {formatDate(new Date())}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptos?.map((coin) => {
            const isPositive = (coin.change_24h_percent || 0) >= 0;
            return (
              <div
                key={coin.id}
                className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl p-6 hover:bg-background/80 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center font-bold text-lg">
                      {coin.currency_code?.[0]}
                    </div>
                    <div>
                      <h3 className="font-bold">{coin.currency_name_ar}</h3>
                      <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(coin.change_24h_percent || 0).toFixed(2)}%
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">السعر (USD)</span>
                    <span className="font-bold text-lg">${formatNumber(coin.price_usd, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">السعر (SYP)</span>
                    <span className="font-medium">{formatNumber(coin.price_syp)} ل.س</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <span>أعلى 24س</span>
                    <span>${formatNumber(coin.high_24h, 2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>أدنى 24س</span>
                    <span>${formatNumber(coin.low_24h, 2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
