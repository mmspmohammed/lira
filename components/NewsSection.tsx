// components/NewsSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatRelativeTime } from "@/lib/format";
import { newsCategories } from "@/lib/categories";

export function NewsSection({ articles }: { articles: any[] }) {
  if (!articles?.length) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">آخر الأخبار</h2>
        <Link href="/news" className="text-primary font-medium hover:underline">
          عرض الكل →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, i) => {
          const cat = newsCategories[article.category as keyof typeof newsCategories] || newsCategories.general;
          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/news/${article.slug}`} className="group block">
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
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {article.summary}
                    </p>
                    <time className="text-xs text-muted-foreground">{formatRelativeTime(article.published_at)}</time>
                  </div>
                </article>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
