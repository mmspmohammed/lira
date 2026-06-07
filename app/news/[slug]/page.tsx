// app/news/[slug]/page.tsx
import { createServerSupabase } from "@/lib/supabase-server";
import { generateMetadata, NewsArticleSchema, BreadcrumbSchema } from "@/lib/seo";
import { formatDate, sanitizeHtml } from "@/lib/format";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BackButton } from "@/components/BackButton";
import { newsCategories } from "@/lib/categories";

export async function generateStaticParams() {
  const supabase = createServerSupabase();
  const { data } = await supabase.from("news_articles").select("slug").limit(50);
  return (data || []).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabase();
  const { data: article } = await supabase
    .from("news_articles")
    .select("title, summary, image_url, published_at")
    .eq("slug", params.slug)
    .single();

  if (!article) return generateMetadata({ title: "خبر غير موجود", noIndex: true });

  return generateMetadata({
    title: article.title,
    description: article.summary?.substring(0, 160) || undefined,
    path: `/news/${params.slug}`,
    image: article.image_url || undefined,
  });
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabase();
  const { data: article } = await supabase
    .from("news_articles")
    .select("*, price_sources(name)")
    .eq("slug", params.slug)
    .single();

  if (!article) notFound();

  const category = newsCategories[article.category as keyof typeof newsCategories] || newsCategories.general;

  const jsonLd = NewsArticleSchema({
    title: article.title,
    description: article.summary || "",
    url: `https://lirasyp.com/news/${params.slug}`,
    image: article.image_url || undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: article.author || "ليرة سوريا",
  });

  const breadcrumb = BreadcrumbSchema([
    { name: "الرئيسية", url: "https://lirasyp.com/" },
    { name: "الأخبار", url: "https://lirasyp.com/news" },
    { name: article.title, url: `https://lirasyp.com/news/${params.slug}` },
  ]);

  return (
    <>
      <Script id="news-article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <BackButton href="/news" />

        <div className="mb-6">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${category.color}`}>
            {category.icon} {category.label}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>{article.author}</span>
          <span>•</span>
          <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
        </div>

        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-3xl mb-8"
          />
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content || article.summary || "") }}
        />

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            المصدر: {article.price_sources?.name || article.author} •{" "}
            <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              رابط الخبر الأصلي
            </a>
          </p>
        </div>
      </article>
    </>
  );
}
