// app/prices/fuel/page.tsx
import { createServerSupabase } from "@/lib/supabase-server";
import { generateMetadata, BreadcrumbSchema } from "@/lib/seo";
import { formatNumber, formatDate } from "@/lib/format";
import Script from "next/script";
import { BackButton } from "@/components/BackButton";
import { Fuel } from "lucide-react";

export const metadata = generateMetadata({
  title: "أسعار المحروقات",
  description: "أسعار البنزين والمازوت والغاز في سوريا",
  path: "/prices/fuel",
});

export default async function FuelPage() {
  const supabase = createServerSupabase();
  const { data: fuels } = await supabase.from("fuel_prices").select("*").eq("is_latest", true).order("fuel_type");

  const breadcrumb = BreadcrumbSchema([
    { name: "الرئيسية", url: "https://lirasyp.com/" },
    { name: "أسعار المحروقات", url: "https://lirasyp.com/prices/fuel" },
  ]);

  const grouped = (fuels || []).reduce((acc: any, item: any) => {
    if (!acc[item.fuel_type]) acc[item.fuel_type] = [];
    acc[item.fuel_type].push(item);
    return acc;
  }, {});

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-black mb-2">أسعار المحروقات</h1>
        <p className="text-muted-foreground mb-8">آخر تحديث: {fuels?.[0] ? formatDate(fuels[0].fetched_at) : "—"}</p>

        <div className="space-y-8">
          {Object.entries(grouped).map(([type, items]: [string, any]) => (
            <div key={type}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Fuel className="w-5 h-5 text-primary" />
                {type}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item: any) => (
                  <div key={item.id} className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{item.subtype || item.fuel_type}</span>
                      <span className="text-sm text-muted-foreground">{item.unit}</span>
                    </div>
                    <p className="text-3xl font-black">{formatNumber(item.price)} ل.س</p>
                    {item.change_percent !== 0 && (
                      <p className={`text-sm mt-2 ${item.change_percent > 0 ? "text-red-600" : "text-green-600"}`}>
                        {item.change_percent > 0 ? "↑" : "↓"} {Math.abs(item.change_percent)}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
