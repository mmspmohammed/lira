// app/prices/electricity/page.tsx
import { createServerSupabase } from "@/lib/supabase-server";
import { generateMetadata, BreadcrumbSchema } from "@/lib/seo";
import { formatNumber } from "@/lib/format";
import Script from "next/script";
import { BackButton } from "@/components/BackButton";
import { Zap } from "lucide-react";

export const metadata = generateMetadata({
  title: "أسعار الكهرباء",
  description: "شرائح أسعار الكهرباء والتقنين في سوريا",
  path: "/prices/electricity",
});

export default async function ElectricityPage() {
  const supabase = createServerSupabase();
  const { data: tiers } = await supabase.from("electricity_tariffs").select("*").eq("is_active", true).order("min_consumption");

  const breadcrumb = BreadcrumbSchema([
    { name: "الرئيسية", url: "https://lirasyp.com/" },
    { name: "أسعار الكهرباء", url: "https://lirasyp.com/prices/electricity" },
  ]);

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-black mb-2">أسعار الكهرباء</h1>
        <p className="text-muted-foreground mb-8">شرائح الاستهلاك والتعرفة</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiers?.map((tier) => (
            <div key={tier.id} className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-bold">{tier.tier_name}</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">الاستهلاك</span>
                  <span className="font-medium">
                    {tier.min_consumption} - {tier.max_consumption || "أكثر"} كيلو واط
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">السعر للكيلو واط</span>
                  <span className="font-bold text-lg">{formatNumber(tier.price_per_kwh)} {tier.currency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-muted/50 p-6">
          <h3 className="font-bold mb-4">مثال حسابي</h3>
          <p className="text-muted-foreground leading-relaxed">
            إذا كان استهلاكك الشهري 300 كيلو واط، وكانت الشريحة الأولى (0-100) بسعر 250 ل.س والثانية (101-300) بسعر 400 ل.س:
            <br />
            <br />
            100 × 250 = 25,000 ل.س
            <br />
            200 × 400 = 80,000 ل.س
            <br />
            <strong>المجموع: 105,000 ل.س</strong>
          </p>
        </div>
      </div>
    </>
  );
}
