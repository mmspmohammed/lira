// lib/format.ts
import DOMPurify from "isomorphic-dompurify";

export function formatNumber(num: number, decimals = 2): string {
  if (num === null || num === undefined || isNaN(num)) return "—";
  return new Intl.NumberFormat("ar-SY", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatCurrency(num: number, currency = "ل.س"): string {
  return `${formatNumber(num)} ${currency}`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ar-SY", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diff < 60) return "الآن";
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
  return `منذ ${Math.floor(diff / 86400)} يوم`;
}

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return html;
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "br"] });
}

export function calculateGoldKarats(ounceUsd: number, usdSypRate: number) {
  const gram24 = ounceUsd / 31.1035;
  return {
    karat_24: gram24 * usdSypRate,
    karat_22: gram24 * (22 / 24) * usdSypRate,
    karat_21: gram24 * (21 / 24) * usdSypRate,
    karat_18: gram24 * (18 / 24) * usdSypRate,
    karat_14: gram24 * (14 / 24) * usdSypRate,
  };
}
