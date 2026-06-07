// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          تحديث لحظي — كل 5 دقائق
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-slate-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            أسعار سوريا
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-pink-500 to-purple-600 bg-clip-text text-transparent">
            في لحظتها
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          تابع أسعار <span className="text-primary font-semibold">الدولار</span> وال{" "}
          <span className="text-yellow-500 font-semibold">الذهب</span> وال{" "}
          <span className="text-purple-500 font-semibold">البيتكوين</span> والعملات الأجنبية
          مع آخر الأخبار الاقتصادية
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/prices/currency"
            className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95"
          >
            <TrendingUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            استعرض الأسعار
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-border bg-background/50 backdrop-blur-xl px-8 py-4 text-lg font-bold transition-all hover:bg-background/80 hover:scale-105 active:scale-95"
          >
            <Clock className="w-5 h-5" />
            آخر الأخبار
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 animate-bounce"
        >
          <ArrowDown className="w-6 h-6 mx-auto text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
