// lib/env.ts
export const siteConfig = {
  name: "ليرة سوريا",
  description: "أسعار صرف الليرة السورية والذهب والعملات الرقمية والمحروقات والكهرباء لحظياً",
  url: "https://lirasyp.com",
  ogImage: "https://lirasyp.com/og-image.jpg",
  twitter: "@lirasyp",
  locale: "ar_SY",
  links: {
    twitter: "https://twitter.com/lirasyp",
    facebook: "https://facebook.com/lirasyp",
  },
};

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
