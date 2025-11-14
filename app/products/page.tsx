"use client"

import { useState } from "react"
import { api } from "@/lib/api"
import { SentimentChart } from "@/components/sentiment-chart"
import { Card } from "@/components/ui/card"
import { useI18n } from "@/components/i18n-provider"

export default function ProductsPage() {
  const { t } = useI18n()
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<null | {
    product_id: number
    product_name: string
    stars: number
    sentiment_label: string
    avg_sentiment: number
    total_reviews: number
    positive_count: number
    neutral_count: number
    negative_count: number
    keywords: string[]
    opinion_summary: string
  }>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload() {
    setError(null)
    setResult(null)
    if (!file) {
      setError(t("products.selectFileError"))
      return
    }
    setLoading(true)
    try {
      const res = await api.uploadReviewsFile(file)
      setResult(res)
    } catch (e: any) {
      setError(e?.message || t("products.uploadError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">{t("products.title")}</h1>
      <p className="mb-6 text-muted-foreground">{t("products.subtitle")}</p>
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-2 flex items-center gap-2 text-sm">
          <label htmlFor="file-input" className="font-medium">{t("products.selectFileLabel")}</label>
          <span className="text-muted-foreground">{file ? file.name : t("products.noFileSelected")}</span>
        </div>
        <input
          id="file-input"
          type="file"
          accept=".json,.csv,.xlsx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        <button onClick={handleUpload} disabled={loading} className="rounded bg-primary px-4 py-2 text-white">
          {loading ? t("products.analyzing") : t("products.uploadAnalyze")}
        </button>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>

      {result && (
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">{t("products.resultTitle")}</h2>
          <p className="mt-2">{t("products.product")}: <span className="font-medium">{result.product_name}</span> (ID {result.product_id})</p>
          <p className="mt-2">{t("products.rating")}: <span className="font-medium">{result.stars} ⭐</span> ({result.sentiment_label})</p>
          <p className="mt-2">{t("products.sentimentAvg")}: {Number((result.avg_sentiment * 5).toFixed(1))} / 5 · {result.total_reviews} {t("analysis.reviews")}</p>
          <p className="mt-2">{t("products.keywords")}: {result.keywords.join(", ")}</p>
          <p className="mt-2">{t("products.opinion")}: {result.opinion_summary}</p>

          {/* Minigrid de conteos y porcentajes */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card className="p-6">
              <p className="mb-2 text-sm font-medium text-muted-foreground">{t("analysis.positiveReviews")}</p>
              <p className="text-3xl font-bold text-green-500 neon-number">{result.positive_count}</p>
              <p className="text-sm text-muted-foreground">
                {result.positive_count + result.neutral_count + result.negative_count > 0
                  ? ((result.positive_count / (result.positive_count + result.neutral_count + result.negative_count)) * 100).toFixed(1)
                  : "0.0"}%
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-2 text-sm font-medium text-muted-foreground">{t("analysis.neutralReviews")}</p>
              <p className="text-3xl font-bold text-yellow-500 neon-number">{result.neutral_count}</p>
              <p className="text-sm text-muted-foreground">
                {result.positive_count + result.neutral_count + result.negative_count > 0
                  ? ((result.neutral_count / (result.positive_count + result.neutral_count + result.negative_count)) * 100).toFixed(1)
                  : "0.0"}%
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-2 text-sm font-medium text-muted-foreground">{t("analysis.negativeReviews")}</p>
              <p className="text-3xl font-bold text-red-500 neon-number">{result.negative_count}</p>
              <p className="text-sm text-muted-foreground">
                {result.positive_count + result.neutral_count + result.negative_count > 0
                  ? ((result.negative_count / (result.positive_count + result.neutral_count + result.negative_count)) * 100).toFixed(1)
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

      {/* Se retira el mensaje de pruebas rápidas para mantener la vista limpia. */}
    </main>
  )
}