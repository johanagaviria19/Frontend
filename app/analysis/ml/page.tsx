"use client"

import { useEffect, useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { AnalysisResults } from "@/components/analysis-results"
import { SearchResults } from "@/components/search-results"
import type { SearchResult, AnalysisResult } from "@/lib/api"
import { useI18n } from "@/components/i18n-provider"

export default function AnalysisMLPage() {
  const { t } = useI18n()
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const handleAnalysisComplete = (data: AnalysisResult) => {
    setAnalysisData(data)
    setIsAnalyzing(false)
  }

  const handleAnalysisStart = () => {
    setIsAnalyzing(true)
    setAnalysisData(null)
    setSearchResults([])
  }

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results)
    setIsAnalyzing(false)
    setAnalysisData(null)
  }

  const handleAnalyzeFromSearch = async (url: string) => {
    setIsAnalyzing(true)
    setSearchResults([])

    try {
      const { api } = await import("@/lib/api")
      const response = await api.analyzeProduct({ product_url: url })

      setTimeout(async () => {
        try {
          const analysis = await api.getAnalysis(response.product_id)
          setAnalysisData(analysis)
          setIsAnalyzing(false)
        } catch (err) {
          setIsAnalyzing(false)
        }
      }, 3000)
    } catch (err) {
      setIsAnalyzing(false)
    }
  }

  useEffect(() => {
    if (analysisData && !isAnalyzing) {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {}
    }
  }, [analysisData, isAnalyzing])

  return (
    <main className="container mx-auto px-4 py-10">

      <div className="mb-12 text-center">
        <h1 className="mb-4 text-balance text-4xl font-bold">
          {t("ml.hero.title").charAt(0).toUpperCase() + t("ml.hero.title").slice(1)}
        </h1>
        <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
          {t("ml.hero.subtitle")}
        </p>
      </div>

      <div className="mb-12">
        <SearchBar
          onAnalysisComplete={handleAnalysisComplete}
          onAnalysisStart={handleAnalysisStart}
          onSearchResults={handleSearchResults}
        />
      </div>

      {searchResults.length > 0 && !isAnalyzing && (
        <div className="mb-12">
          <SearchResults results={searchResults} onAnalyzeProduct={handleAnalyzeFromSearch} />
        </div>
      )}

      {isAnalyzing && (
        <div className="mb-12">
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-lg font-medium text-foreground">{t("home.loading.title")}</p>
            <p className="text-sm text-muted-foreground">{t("home.loading.subtitle")}</p>
          </div>
        </div>
      )}

      {analysisData && !isAnalyzing && (
        <div className="mb-12">
          <AnalysisResults data={analysisData} />
        </div>
      )}

      {/* Se elimina la sección de Análisis Recientes y sus funcionalidades */}
    </main>
  )
}