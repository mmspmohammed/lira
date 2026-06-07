// components/StatsSection.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Globe, Newspaper } from "lucide-react";

const stats = [
  { label: "تحديث كل", value: "5 دقائق", icon: Clock, color: "text-blue-500" },
  { label: "عملات مدعومة", value: "20+", icon: Globe, color: "text-green-500" },
  { label: "مصادر موثوقة", value: "6", icon: TrendingUp, color: "text-purple-500" },
  { label: "أخبار يومية", value: "50+", icon: Newspaper, color: "text-orange-500" },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-border/50 bg-background/40 backdrop-blur-xl p-6 text-center"
        >
          <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
          <p className="text-2xl font-black">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
