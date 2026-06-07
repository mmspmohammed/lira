// app/news/page.tsx
import { createServerSupabase } from "@/lib/supabase-server";
import { generateMetadata, BreadcrumbSchema } from "@/lib/seo";
import { formatRelativeTime } from "@/lib/format";
import { newsCategories } from "@/lib/categories";
import Script from "next/script";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";

export const metadata = generateMetadata({
  title: "آخر الأخبار الاقتصادية",
  description: "آخر أخبار العملات والذهب والاقتصاد السوري",
  path: "/news",
});

export default async function NewsPage() {
  const supabase = createServerSupabase();
  const { data: articles } = await supabase
    .from("news_articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(50);

  const breadcrumb = BreadcrumbSchema([
    { name: "الرئيسية", url: "https://lirasyp.com/" },
    { name: "الأخبار", url: "https://lirasyp.com/news" },
  ]);

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-black mb-8">آخر الأخبار</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article) => {
            const cat = newsCategories[article.category as keyof typeof newsCategories] || newsCategories.general;
            return (
              <Link key={article.id} href={`/news/${article.slug}`} className="group block">
                <article className="rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl overflow-hidden hover:bg-background/80 transition h-full flex flex-col">
                  {article.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border w-fit mb-3 ${cat.color}`}>
                      {cat.icon} {cat.label}
                    </span>
                    <h2 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {article.summary}
                    </p>
                    <time className="text-xs text-muted-foreground">{formatRelativeTime(article.published_at)}</time>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
