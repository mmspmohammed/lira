// app/page.tsx
import { Suspense } from "react";
import { createServerSupabase } from "@/lib/supabase-server";
import { generateMetadata, BreadcrumbSchema, FAQSchema } from "@/lib/seo";
import Script from "next/script";
import { HeroSection } from "@/components/HeroSection";
import { PriceGrid } from "@/components/PriceGrid";
import { NewsSection } from "@/components/NewsSection";
import { LiveTicker } from "@/components/LiveTicker";
import { StatsSection } from "@/components/StatsSection";

export const metadata = generateMetadata({
  title: "أسعار الصرف والذهب والعملات الرقمية",
  description: "تابع أسعار الدولار والليرة السورية والذهب والبيتكوين والعملات الأجنبية لحظياً مع تحليلات وآخر الأخبار الاقتصادية",
  path: "/",
});

const faqs = [
  {
    question: "ما هو سعر الدولار اليوم في سوريا؟",
    answer: "يتم تحديث سعر الدولار مقابل الليرة السورية لحظياً من مصادر متعددة. يمكنك مشاهدة السعر المحدث في قسم العملات.",
  },
  {
    question: "كيف يتم حساب سعر الذهب بالليرة السورية؟",
    answer: "سعر الذهب يحسب بناءً على سعر الأونصة العالمي بالدولار مضروباً بسعر صرف الدولار في السوق السورية.",
  },
  {
    question: "هل الأسعار المعروضة دقيقة؟",
    answer: "نعم، نجلب البيانات من مصادر موثوقة مثل Binance للعملات الرقمية و LiraNews للعملات المحلية مع تحديث كل 5 دقائق.",
  },
];

export default async function HomePage() {
  const supabase = createServerSupabase();
  
  const [{ data: latestRates }, { data: latestGold }, { data: latestCrypto }, { data: news }] = await Promise.all([
    supabase.from("v_latest_exchange_rates").select("*").limit(10),
    supabase.from("v_latest_gold").select("*").single(),
    supabase.from("v_latest_crypto").select("*").limit(8),
    supabase.from("news_articles").select("*").eq("is_featured", true).order("published_at", { ascending: false }).limit(6),
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(BreadcrumbSchema([{ name: "الرئيسية", url: "https://lirasyp.com/" }])),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQSchema(faqs)),
        }}
      />

      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        
        <HeroSection />
        <LiveTicker rates={latestRates || []} />
        
        <section className="container mx-auto px-4 py-16 space-y-24">
          <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-3xl" />}>
            <PriceGrid 
              rates={latestRates || []} 
              gold={latestGold} 
              crypto={latestCrypto || []} 
            />
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-3xl" />}>
            <StatsSection />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-3xl" />}>
            <NewsSection articles={news || []} />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              الأسئلة الشائعة
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl p-6 transition-all hover:bg-background/80"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-lg">
                    {faq.question}
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
