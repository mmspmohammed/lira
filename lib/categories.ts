// lib/categories.ts
export const newsCategories = {
  currency: {
    label: "عملات",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    icon: "💱",
  },
  gold: {
    label: "ذهب",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    icon: "🥇",
  },
  crypto: {
    label: "كريبتو",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    icon: "₿",
  },
  fuel: {
    label: "محروقات",
    color: "bg-red-500/10 text-red-600 border-red-200",
    icon: "⛽",
  },
  electricity: {
    label: "كهرباء",
    color: "bg-green-500/10 text-green-600 border-green-200",
    icon: "⚡",
  },
  economy: {
    label: "اقتصاد",
    color: "bg-slate-500/10 text-slate-600 border-slate-200",
    icon: "📊",
  },
  general: {
    label: "عام",
    color: "bg-gray-500/10 text-gray-600 border-gray-200",
    icon: "📰",
  },
} as const;

export type NewsCategory = keyof typeof newsCategories;
