// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/prices/", "/news/", "/about"],
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/og-image.jpg", "/images/"],
      },
    ],
    sitemap: "https://lirasyp.com/sitemap.xml",
    host: "https://lirasyp.com",
  };
}
