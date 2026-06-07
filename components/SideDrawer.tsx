// components/SideDrawer.tsx
"use client";

import Link from "next/link";
import { X, Home, Newspaper, Coins, TrendingUp, Zap, Fuel, Info, Shield, FileText } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/prices/currency", label: "العملات", icon: Coins },
  { href: "/prices/gold", label: "الذهب", icon: TrendingUp },
  { href: "/prices/crypto", label: "العملات الرقمية", icon: TrendingUp },
  { href: "/prices/fuel", label: "المحروقات", icon: Fuel },
  { href: "/prices/electricity", label: "الكهرباء", icon: Zap },
  { href: "/news", label: "الأخبار", icon: Newspaper },
  { href: "/about", label: "من نحن", icon: Info },
  { href: "/privacy", label: "الخصوصية", icon: Shield },
  { href: "/terms", label: "الشروط", icon: FileText },
];

export function SideDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, setTheme } = useTheme();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-80 bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold text-lg">القائمة</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-foreground"
            >
              <link.icon className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted hover:bg-muted/80 transition font-medium"
          >
            {theme === "dark" ? "🌞 الوضع النهاري" : "🌙 الوضع الليلي"}
          </button>
        </div>
      </div>
    </>
  );
}
