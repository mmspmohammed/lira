// app/sitemap.ts
import { MetadataRoute } from "next";
import { createServerSupabase } from "@/lib/supabase-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerSupabase();
  const baseUrl = "https://lirasyp.com";

  // Static routes
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "always" as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/prices/currency`, lastModified: new Date(), changeFrequency: "always" as const, priority: 0.9 },
    { url: `${baseUrl}/prices/gold`, lastModified: new Date(), changeFrequency: "always" as const, priority: 0.9 },
    { url: `${baseUrl}/prices/crypto`, lastModified: new Date(), changeFrequency: "always" as const, priority: 0.9 },
    { url: `${baseUrl}/prices/fuel`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 },
    { url: `${baseUrl}/prices/electricity`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  // Dynamic news articles
  const { data: articles } = await supabase
    .from("news_articles")
    .select("slug, updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);

  const newsRoutes = (articles || []).map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
