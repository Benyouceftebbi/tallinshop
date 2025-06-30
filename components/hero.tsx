"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div
        className="absolute inset-0 z-0 opacity-0 animate-fade-in"
        style={{ animationDuration: "1.5s", animationFillMode: "forwards" }}
      >
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Sabot Aniq Hero Image"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/30"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-slate-800 dark:text-stone-100 p-4">
        <div className="max-w-3xl">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 opacity-0 animate-slide-in-rtl"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            راحة وأناقة في كل خطوة
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-600 dark:text-stone-300 mb-8 opacity-0 animate-slide-in-rtl"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            سابو نسائي خفيف وعصري لتألقي اليومي
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-in-rtl"
            style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
          >
            <Button
              size="lg"
              className="bg-slate-800 hover:bg-slate-900 dark:bg-rose-600 dark:hover:bg-rose-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform"
            >
              اطلبي الآن
            </Button>
            <Badge className="bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/50 dark:text-rose-200 dark:border-rose-800 border px-4 py-2 text-md">
              توصيل إلى جميع الولايات
            </Badge>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-rtl {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in { animation-name: fade-in; }
        .animate-slide-in-rtl { animation-name: slide-in-rtl; }
      `}</style>
    </section>
  )
}
