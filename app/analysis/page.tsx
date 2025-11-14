"use client"

import Link from "next/link"
import { Rocket, Search } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

export default function AnalysisIndex() {
  const { t } = useI18n()
  const cards = [
    {
      title: t("analysis.index.cards.meli.title"),
      desc: t("analysis.index.cards.meli.desc"),
      href: "/analysis/ml",
      icon: Rocket,
    },
    {
      title: t("analysis.index.cards.practice.title"),
      desc: t("analysis.index.cards.practice.desc"),
      href: "/analysis/practice",
      icon: Search,
    },
  ]
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">{t("analysis.index.title")}</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.title} href={c.href} className="group rounded-lg border border-border bg-card p-6 hover:border-primary">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <c.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}