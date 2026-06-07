// components/BackButton.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BackButton({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-6"
    >
      <ArrowRight className="w-4 h-4" />
      العودة
    </Link>
  );
}
