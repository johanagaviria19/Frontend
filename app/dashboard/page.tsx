"use client"

import Link from "next/link"
import { FileUp, Rocket, Search } from "lucide-react"
import { BackendStatus } from "@/components/backend-status"
import { useI18n } from "@/components/i18n-provider"

export default function Dashboard() {
  const { t } = useI18n()
  const cards = [
    {
      title: t("dashboard.cards.products.title"),
      desc: t("dashboard.cards.products.desc"),
      href: "/products",
      icon: FileUp,
    },
    {
      title: t("dashboard.cards.analysis.title"),
      desc: t("dashboard.cards.analysis.desc"),
      href: "/analysis/ml",
      icon: Rocket,
    },
    {
      title: t("dashboard.cards.practice.title"),
      desc: t("dashboard.cards.practice.desc"),
      href: "/analysis/practice",
      icon: Search,
    },
  ]

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <BackendStatus />
      </div>
      <h1 className="mb-6 text-3xl font-bold">{t("dashboard.title")}</h1>
      <p className="mb-8 text-muted-foreground">{t("dashboard.subtitle")}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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