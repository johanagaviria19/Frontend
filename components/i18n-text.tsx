"use client"

import React from "react"
import { useI18n } from "./i18n-provider"

export function I18nText({ k, className }: { k: string; className?: string }) {
  const { t } = useI18n()
  return <span className={className}>{t(k)}</span>
}