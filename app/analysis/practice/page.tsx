"use client"

import { useState } from "react"
import { api } from "@/lib/api"
import { SentimentChart } from "@/components/sentiment-chart"
import { Card } from "@/components/ui/card"
import { useI18n } from "@/components/i18n-provider"

type Source = "trustpilot" | "rottentomatoes" | "goodreads"

export default function PracticeScrapingPage() {
  const { t } = useI18n()
  const [source, setSource] = useState<Source>("trustpilot")
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function normalizeQuery(src: Source, input: string): string {
    const val = (input || "").trim()
    if (!val) return ""
    if (/^https?:\/\//i.test(val)) {
      try {
        const u = new URL(val)
        const path = u.pathname
        if (src === "trustpilot") {
          const m = path.match(/\/review\/([^\/?#]+)/i)
          if (m) return m[1]
        }
        if (src === "rottentomatoes") {
          const m = path.match(/\/m\/([^\/?#]+)/i)
          if (m) return m[1].replace(/-/g, " ")
        }
        if (src === "goodreads") {
          const m = path.match(/\/book\/show\/([^\/?#]+)/i)
          if (m) return m[1].replace(/-/g, " ")
        }
      } catch {}
    }
    return val
  }

  async function scrapeAndAnalyze() {
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const query = normalizeQuery(source, url)
      const analyzed = await api.analyzePractice(source, query)
      setResult(analyzed)
    } catch (e: any) {
      setError(e?.message || t("practice.error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">{t("practice.title")}</h1>
      <p className="mb-6 text-muted-foreground">{t("practice.subtitle")}</p>

      <div className="rounded-lg border border-border bg-card p-6">
        <label className="mb-2 block text-sm">{t("practice.sourceLabel")}</label>
        <select value={source} onChange={(e) => setSource(e.target.value as Source)} className="mb-4 w-full rounded border px-3 py-2">
          <option value="trustpilot">Trustpilot</option>
          <option value="rottentomatoes">RottenTomatoes</option>
          <option value="goodreads">Goodreads</option>
        </select>

        <label className="mb-2 block text-sm">{t("practice.nameOrUrl")}</label>
        <input
          type="url"
          placeholder={
            source === "trustpilot"
              ? t("practice.placeholder.trustpilot")
              : source === "rottentomatoes"
              ? t("practice.placeholder.rottentomatoes")
              : t("practice.placeholder.goodreads")
          }
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2"
        />

        <div className="flex gap-3">
          <button onClick={scrapeAndAnalyze} disabled={loading} className="rounded bg-primary px-4 py-2 text-white">
            {loading ? t("practice.processing") : t("practice.scrapeAnalyze")}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>

      {/* Ocultamos la lista de reseñas: el usuario solo necesita el resumen */}

      {result && (
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">{t("practice.resultTitle")}</h2>
          <p className="mt-2">{t("products.rating")}: {Number(result.stars).toFixed(1)} ⭐ ({result.sentiment_label})</p>
          <p className="mt-2">{t("products.sentimentAvg")}: {(Number(result.avg_sentiment) * 5).toFixed(1)} / 5 · {result.total_reviews} {t("analysis.reviews")}</p>
          <p className="mt-2">{t("products.keywords")}: {(result.keywords || []).join(", ")}</p>
          <p className="mt-2">{t("products.opinion")}: {result.opinion_summary}</p>

          {/* Minigrid de conteos y porcentajes */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card className="p-6">
              <p className="mb-2 text-sm font-medium text-muted-foreground">{t("analysis.positiveReviews")}</p>
              <p className="text-3xl font-bold text-green-500 neon-number">{result.positive_count}</p>
              <p className="text-sm text-muted-foreground">
                {Number(result.positive_count) + Number(result.neutral_count) + Number(result.negative_count) > 0
                  ? ((Number(result.positive_count) / (Number(result.positive_count) + Number(result.neutral_count) + Number(result.negative_count))) * 100).toFixed(1)
                  : "0.0"}%
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-2 text-sm font-medium text-muted-foreground">{t("analysis.neutralReviews")}</p>
              <p className="text-3xl font-bold text-yellow-500 neon-number">{result.neutral_count}</p>
              <p className="text-sm text-muted-foreground">
                {Number(result.positive_count) + Number(result.neutral_count) + Number(result.negative_count) > 0
                  ? ((Number(result.neutral_count) / (Number(result.positive_count) + Number(result.neutral_count) + Number(result.negative_count))) * 100).toFixed(1)
                  : "0.0"}%
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-2 text-sm font-medium text-muted-foreground">{t("analysis.negativeReviews")}</p>
              <p className="text-3xl font-bold text-red-500 neon-number">{result.negative_count}</p>
              <p className="text-sm text-muted-foreground">
                {Number(result.positive_count) + Number(result.neutral_count) + Number(result.negative_count) > 0
                  ? ((Number(result.negative_count) / (Number(result.positive_count) + Number(result.neutral_count) + Number(result.negative_count))) * 100).toFixed(1)
                  : "0.0"}%
              </p>
            </Card>
          </div>

          {/* Gráfico de distribución de sentimiento */}
          <div className="mt-6">
            <SentimentChart data={result} />
          </div>
        </div>
      )}
    </main>
  )
}