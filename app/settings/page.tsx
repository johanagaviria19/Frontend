"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/components/i18n-provider"

export default function SettingsPage() {
  const { language, setLanguage, t } = useI18n()

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">{t("settings.title")}</h1>
      <Card className="p-6 max-w-xl">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="lang">{t("settings.language")}</Label>
            <div className="mt-2">
              <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
                <SelectTrigger id="lang" className="w-56">
                  <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">{t("settings.language.es")}</SelectItem>
                  <SelectItem value="en">{t("settings.language.en")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </main>
  )
}