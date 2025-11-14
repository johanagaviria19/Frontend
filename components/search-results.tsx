"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star, TrendingUp } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import type { SearchResult } from "@/lib/api"

interface SearchResultsProps {
  results: SearchResult[]
  onAnalyzeProduct: (url: string) => void
}

export function SearchResults({ results, onAnalyzeProduct }: SearchResultsProps) {
  const { t } = useI18n()
  if (!results || results.length === 0) {
    return null
  }

  // Group by platform for comparison
  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.platform]) {
        acc[result.platform] = []
      }
      acc[result.platform].push(result)
      return acc
    },
    {} as Record<string, SearchResult[]>,
  )

  const lowestPrice = Math.min(...results.map((r) => r.price))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("searchResults.title")}</h2>
        <Badge variant="secondary" className="text-sm">
          {results.length} {t("searchResults.productsFound")}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => (
          <Card key={index} className="p-6 transition-all hover:shadow-lg neon-panel gradient-border">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <Badge variant="outline" className="capitalize">
                  {result.platform}
                </Badge>
                {result.price === lowestPrice && (
                  <Badge className="bg-green-500 neon-icon">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {t("searchResults.bestPrice")}
                  </Badge>
                )}
              </div>

              <h3 className="line-clamp-2 font-semibold leading-tight">{result.name}</h3>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold neon-number">${result.price.toFixed(2)}</span>
                  </div>

                  {result.rating && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 neon-icon" />
                        <span className="font-medium">{result.rating.toFixed(1)} / 5{result.reviews_count ? ` · ${result.reviews_count.toLocaleString()} ${t("analysis.reviews")}` : ""}</span>
                      </div>
                    </div>
                  )}
              </div>

              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1 neon-panel" onClick={() => onAnalyzeProduct(result.url)}>
                  {t("searchResults.analyzeReviews")}
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 neon-icon" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
