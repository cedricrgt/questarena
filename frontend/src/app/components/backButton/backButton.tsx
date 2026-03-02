"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center p-2 rounded-full text-secondary transition-all duration-300 hover:bg-secondary/10 hover:shadow-[0_0_15px_rgba(169,111,255,0.5)] group animate-bounce"
    >
      <ArrowLeft size={32} strokeWidth={2.5} />
    </Link>
  );
}
