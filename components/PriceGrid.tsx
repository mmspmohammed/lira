// components/PriceGrid.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Coins, Bitcoin } from "lucide-react";
import Link from "next/link";

interface PriceCardProps {
  title: string;
  subtitle: string;
  price: string;
  change?: number;
  icon: React.ReactNode;
  href: string;
  color: string;
  delay: number;
}

function PriceCard({ title, subtitle, price, change, icon, href, color, delay }: PriceCardProps) {
  const isPositive = (change || 0) >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href} className="group block">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background/40 backdrop-blur-xl p-6 transition-all duration-300 hover:bg-background/60 hover:scale-[1.02] hover:shadow-2xl">
          <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${color} opacity-20 blur-2xl transition-opacity group-hover:opacity-30`} />
          
          <div className="relative flex items-start justify-between mb-4">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${color} bg-opacity-10 text-2xl`}>
              {icon}
            </div>
            {change !== undefined && (
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${isPositive ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(change).toFixed(2)}%
              </span>
            )}
          </div>

          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-3xl font-black tracking-tight mb-1">{price}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function PriceGrid({ rates, gold, crypto }: any) {
  const usdRate = rates.find((r: any) => r.currency_code === "USD");
  const tryRate = rates.find((r: any) => r.currency_code === "TRY");
  const eurRate = rates.find((r: any) => r.currency_code === "EUR");
  const btcRate = crypto.find((c: any) => c.currency_code === "BTC");

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">أسعار اللحظة</h2>
        <p className="text-muted-foreground">محدثة مباشرة من المصادر الموثوقة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PriceCard
          title="الدولار الأمريكي"
          subtitle="سعر البيع مقابل الليرة"
          price={usdRate ? `${usdRate.sell_rate?.toLocaleString()} ل.س` : "—"}
          change={usdRate?.change_percent}
          icon={<DollarSign className="w-6 h-6 text-blue-500" />}
          href="/prices/currency"
          color="bg-blue-500"
          delay={0}
        />
        <PriceCard
          title="الليرة التركية"
          subtitle="سعر البيع مقابل الليرة"
          price={tryRate ? `${tryRate.sell_rate?.toLocaleString()} ل.س` : "—"}
          change={tryRate?.change_percent}
          icon={<span className="text-red-500 text-xl">₺</span>}
          href="/prices/currency"
          color="bg-red-500"
          delay={0.1}
        />
        <PriceCard
          title="الذهب"
          subtitle="جرام عيار 21"
          price={gold ? `${gold.karat_21?.toLocaleString()} ل.س` : "—"}
          icon={<Coins className="w-6 h-6 text-yellow-500" />}
          href="/prices/gold"
          color="bg-yellow-500"
          delay={0.2}
        />
        <PriceCard
          title="بيتكوين"
          subtitle="السعر بالدولار"
          price={btcRate ? `$${btcRate.price_usd?.toLocaleString()}` : "—"}
          change={btcRate?.change_24h_percent}
          icon={<Bitcoin className="w-6 h-6 text-orange-500" />}
          href="/prices/crypto"
          color="bg-orange-500"
          delay={0.3}
        />
      </div>
    </div>
  );
}
