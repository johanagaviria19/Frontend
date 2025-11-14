"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type Language = "es" | "en"

type I18nContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Layout / Sidebar
    "layout.brand": "DBVision",
    "layout.tagline": "Análisis Inteligente de Productos",
    "layout.footer": "DBVision - Impulsado por FastAPI, React y Transformers",
    "sidebar.analytics": "Analytics",
    "sidebar.dashboard": "Dashboard",
    "sidebar.products": "Productos",
    "sidebar.analysis": "Análisis",
    "sidebar.settings": "Ajustes",
    "sidebar.admin": "Panel Admin",

    // Search Results
    "searchResults.title": "Resultados de comparación",
    "searchResults.productsFound": "productos encontrados",
    "searchResults.bestPrice": "Mejor precio",
    "searchResults.analyzeReviews": "Analizar reseñas",

    // Price Comparison
    "priceComparison.title": "Comparación de precios",
    "priceComparison.save": "Ahorra",
    "priceComparison.bestPrice": "Mejor precio",

    // Recent Analyses
    "recent.title": "Análisis Recientes",
    "recent.clearHistory": "Limpiar Historial",
    "recent.price": "Precio",
    "recent.rating": "Valoración",
    "recent.reviewsAnalyzed": "reseñas analizadas",
    "recent.openAnalysisOf": "Abrir análisis de",
    "recent.confirmDelete": "¿Estás seguro de que quieres eliminar este análisis?",
    "recent.errorDelete": "Error al eliminar el análisis",
    "recent.confirmClear": "¿Estás seguro de que quieres eliminar todo el historial?",
    "recent.errorClear": "Error al limpiar el historial",
    "recent.loading": "Cargando análisis recientes...",

    // Backend Status
    "backend.checking": "Verificando conexión con el backend...",
    "backend.offline.title": "El servidor backend está desconectado",
    "backend.offline.desc": "Asegúrate de que el servidor FastAPI esté ejecutándose. Abre una terminal en la carpeta backend y ejecuta:",
    "backend.connected.title": "Backend conectado",
    "backend.connected.desc": "El servidor de API está en ejecución y listo",

    // Auth / Login & Register
    "auth.login": "Login",
    "auth.logout": "Logout",
    "auth.welcomeBack": "Bienvenido de nuevo",
    "auth.signInSubtitle": "Inicia sesión en tu cuenta de DBVision",
    "auth.signIn": "Iniciar sesión",
    "auth.signingIn": "Iniciando sesión...",
    "auth.createAccount": "Crear cuenta",
    "auth.createAccountSubtitle": "Únete a DBVision para analizar productos",
    "auth.creatingAccount": "Creando cuenta...",
    "auth.alreadyHaveAccount": "¿Ya tienes una cuenta? ",
    "auth.dontHaveAccount": "¿No tienes una cuenta? ",
    "auth.failedLogin": "Error al iniciar sesión",
    "auth.failedRegister": "Error al registrarse. Intenta nuevamente.",
    "auth.errors.passwordMismatch": "Las contraseñas no coinciden",
    "auth.errors.passwordMin": "La contraseña debe tener al menos 6 caracteres",
    "auth.errors.usernameMin": "El usuario debe tener al menos 3 caracteres",
    "auth.errors.fullNameMin": "El nombre completo debe tener al menos 2 caracteres",
    "form.email": "Email",
    "form.password": "Contraseña",
    "form.fullName": "Nombre completo",
    "form.username": "Usuario",
    "form.confirmPassword": "Confirmar contraseña",
    "form.placeholder.email": "tu@ejemplo.com",
    "form.placeholder.username": "usuario",
    "form.placeholder.fullName": "Juan Pérez",

    // Products Page
    "products.title": "Productos - Carga de dataset",
    "products.subtitle": "Sube un archivo de reseñas (.json, .csv, .xlsx) para analizar sentimientos y obtener una calificación en estrellas y un resumen.",
    "products.selectFileError": "Selecciona un archivo .json, .csv o .xlsx",
    "products.uploadAnalyze": "Subir y analizar",
    "products.analyzing": "Analizando...",
    "products.uploadError": "Error al subir y analizar el archivo",
    "products.selectFileLabel": "Seleccionar archivo",
    "products.noFileSelected": "Ningún archivo seleccionado",
    "products.resultTitle": "Resultado",
    "products.product": "Producto",
    "products.rating": "Calificación",
    "products.sentimentAvg": "Promedio de sentimiento",
    "products.keywords": "Palabras clave",
    "products.opinion": "Opinión",

    // Practice Page
    "practice.title": "Practice Scraping",
    "practice.subtitle": "Scrapea sitios de práctica y ejecuta un análisis de sentimientos con nuestros métodos.",
    "practice.sourceLabel": "Fuente",
    "practice.nameOrUrl": "Nombre/URL",
    "practice.scrapeAnalyze": "Scrapear y Analizar",
    "practice.processing": "Procesando...",
    "practice.resultTitle": "Resultado",
    "practice.error": "Error en scraping/análisis",
    "practice.placeholder.trustpilot": "https://www.trustpilot.com/review/<dominio> o nombre",
    "practice.placeholder.rottentomatoes": "https://www.rottentomatoes.com/m/<pelicula> o título",
    "practice.placeholder.goodreads": "https://www.goodreads.com/book/show/<libro> o título",

    // Home
    "home.hero.title": "Analiza productos con insights impulsados por IA",
    "home.hero.subtitle": "Obtén análisis de sentimiento de productos de Mercado Libre.",
    "home.loading.title": "Analizando producto...",
    "home.loading.subtitle": "Extrayendo reseñas y ejecutando análisis de IA",

    // ML Page
    "ml.hero.title": "Analiza productos con insights impulsados por IA",
    "ml.hero.subtitle": "Obtén análisis de sentimiento de productos de Mercado Libre.",

    // Search Bar
    "search.placeholder": "Pega la URL de Mercado Libre",
    "search.analyze": "Analizar",
    "search.search": "Buscar",

    // Analysis Results
    "analysis.title": "Resultados del análisis",
    "analysis.product": "Producto",
    "analysis.price": "Precio",
    "analysis.rating": "Valoración oficial",
    "analysis.basedOn": "Basado en",
    "analysis.reviews": "reseñas",
    "analysis.overall": "Sentimiento general",
    "analysis.score": "Puntuación de sentimiento",
    "analysis.positiveReviews": "Reseñas positivas",
    "analysis.neutralReviews": "Reseñas neutrales",
    "analysis.negativeReviews": "Reseñas negativas",
    "analysis.sentimentDistribution": "Distribución de sentimiento",
    "analysis.keywords": "Palabras clave",

    // Chart labels
    "sentiment.positive": "Positivas",
    "sentiment.neutral": "Neutrales",
    "sentiment.negative": "Negativas",

    // Settings
    "settings.title": "Ajustes",
    "settings.language": "Idioma",
    "settings.language.es": "Español",
    "settings.language.en": "Inglés",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Elige una sección para continuar.",
    "dashboard.cards.products.title": "Productos",
    "dashboard.cards.products.desc": "Sube datasets (.json/.csv/.xlsx) y obtén análisis IA",
    "dashboard.cards.analysis.title": "Análisis (ML)",
    "dashboard.cards.analysis.desc": "Analiza productos de Mercado Libre por URL",
    "dashboard.cards.practice.title": "Practice Scraping",
    "dashboard.cards.practice.desc": "Trustpilot / RottenTomatoes / Goodreads con análisis",

    // Analysis index
    "analysis.index.title": "Análisis",
    "analysis.index.cards.meli.title": "Mercado Libre",
    "analysis.index.cards.meli.desc": "Analiza un producto pegando su URL",
    "analysis.index.cards.practice.title": "Practice Scraping",
    "analysis.index.cards.practice.desc": "Scrapea Trustpilot/RottenTomatoes/Goodreads y analiza",
  },
  en: {
    // Layout / Sidebar
    "layout.brand": "DBVision",
    "layout.tagline": "Intelligent Product Analysis",
    "layout.footer": "DBVision - Powered by FastAPI, React, and Transformers",
    "sidebar.analytics": "Analytics",
    "sidebar.dashboard": "Dashboard",
    "sidebar.products": "Products",
    "sidebar.analysis": "Analysis",
    "sidebar.settings": "Settings",
    "sidebar.admin": "Admin Panel",

    // Search Results
    "searchResults.title": "Comparison Results",
    "searchResults.productsFound": "products found",
    "searchResults.bestPrice": "Best Price",
    "searchResults.analyzeReviews": "Analyze Reviews",

    // Price Comparison
    "priceComparison.title": "Price Comparison",
    "priceComparison.save": "Save",
    "priceComparison.bestPrice": "Best Price",

    // Recent Analyses
    "recent.title": "Recent Analyses",
    "recent.clearHistory": "Clear History",
    "recent.price": "Price",
    "recent.rating": "Rating",
    "recent.reviewsAnalyzed": "reviews analyzed",
    "recent.openAnalysisOf": "Open analysis of",
    "recent.confirmDelete": "Are you sure you want to delete this analysis?",
    "recent.errorDelete": "Error deleting analysis",
    "recent.confirmClear": "Are you sure you want to clear the entire history?",
    "recent.errorClear": "Error clearing history",
    "recent.loading": "Loading recent analyses...",

    // Backend Status
    "backend.checking": "Checking backend connection...",
    "backend.offline.title": "Backend server is offline",
    "backend.offline.desc": "Make sure the FastAPI server is running. Open a terminal in the backend folder and run:",
    "backend.connected.title": "Backend connected",
    "backend.connected.desc": "API server is running and ready",

    // Auth / Login & Register
    "auth.login": "Login",
    "auth.logout": "Logout",
    "auth.welcomeBack": "Welcome Back",
    "auth.signInSubtitle": "Sign in to your DBVision account",
    "auth.signIn": "Sign In",
    "auth.signingIn": "Signing in...",
    "auth.createAccount": "Create Account",
    "auth.createAccountSubtitle": "Join DBVision to start analyzing products",
    "auth.creatingAccount": "Creating account...",
    "auth.alreadyHaveAccount": "Already have an account? ",
    "auth.dontHaveAccount": "Don't have an account? ",
    "auth.failedLogin": "Failed to login",
    "auth.failedRegister": "Failed to register. Please try again.",
    "auth.errors.passwordMismatch": "Passwords do not match",
    "auth.errors.passwordMin": "Password must be at least 6 characters",
    "auth.errors.usernameMin": "Username must be at least 3 characters",
    "auth.errors.fullNameMin": "Full name must be at least 2 characters",
    "form.email": "Email",
    "form.password": "Password",
    "form.fullName": "Full Name",
    "form.username": "Username",
    "form.confirmPassword": "Confirm Password",
    "form.placeholder.email": "you@example.com",
    "form.placeholder.username": "username",
    "form.placeholder.fullName": "John Doe",

    // Products Page
    "products.title": "Products - Dataset Upload",
    "products.subtitle": "Upload a reviews file (.json, .csv, .xlsx) to analyze sentiment, get a star rating and a summary.",
    "products.selectFileError": "Select a .json, .csv or .xlsx file",
    "products.uploadAnalyze": "Upload and analyze",
    "products.analyzing": "Analyzing...",
    "products.uploadError": "Error uploading and analyzing file",
    "products.selectFileLabel": "Select file",
    "products.noFileSelected": "No file selected",
    "products.resultTitle": "Result",
    "products.product": "Product",
    "products.rating": "Rating",
    "products.sentimentAvg": "Sentiment average",
    "products.keywords": "Keywords",
    "products.opinion": "Opinion",

    // Practice Page
    "practice.title": "Practice Scraping",
    "practice.subtitle": "Scrape practice sites and run sentiment analysis with our methods.",
    "practice.sourceLabel": "Source",
    "practice.nameOrUrl": "Name/URL",
    "practice.scrapeAnalyze": "Scrape and Analyze",
    "practice.processing": "Processing...",
    "practice.resultTitle": "Result",
    "practice.error": "Error during scraping/analysis",
    "practice.placeholder.trustpilot": "https://www.trustpilot.com/review/<domain> or name",
    "practice.placeholder.rottentomatoes": "https://www.rottentomatoes.com/m/<movie> or title",
    "practice.placeholder.goodreads": "https://www.goodreads.com/book/show/<book> or title",

    // Home
    "home.hero.title": "Analyze products with AI-powered insights",
    "home.hero.subtitle": "Get sentiment analysis for Mercado Libre products.",
    "home.loading.title": "Analyzing product...",
    "home.loading.subtitle": "Scraping reviews and running AI analysis",

    // ML Page
    "ml.hero.title": "Analyze products with AI-powered insights",
    "ml.hero.subtitle": "Get sentiment analysis for Mercado Libre products.",

    // Search Bar
    "search.placeholder": "Paste the Mercado Libre URL",
    "search.analyze": "Analyze",
    "search.search": "Search",

    // Analysis Results
    "analysis.title": "Analysis Results",
    "analysis.product": "Product",
    "analysis.price": "Price",
    "analysis.rating": "Official rating",
    "analysis.basedOn": "Based on",
    "analysis.reviews": "reviews",
    "analysis.overall": "Overall sentiment",
    "analysis.score": "Sentiment score",
    "analysis.positiveReviews": "Positive reviews",
    "analysis.neutralReviews": "Neutral reviews",
    "analysis.negativeReviews": "Negative reviews",
    "analysis.sentimentDistribution": "Sentiment distribution",
    "analysis.keywords": "Keywords",

    // Chart labels
    "sentiment.positive": "Positive",
    "sentiment.neutral": "Neutral",
    "sentiment.negative": "Negative",

    // Settings
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.language.es": "Spanish",
    "settings.language.en": "English",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Choose a section to continue.",
    "dashboard.cards.products.title": "Products",
    "dashboard.cards.products.desc": "Upload datasets (.json/.csv/.xlsx) and get AI analysis",
    "dashboard.cards.analysis.title": "Analysis (ML)",
    "dashboard.cards.analysis.desc": "Analyze Mercado Libre products by URL",
    "dashboard.cards.practice.title": "Practice Scraping",
    "dashboard.cards.practice.desc": "Trustpilot / RottenTomatoes / Goodreads with analysis",

    // Analysis index
    "analysis.index.title": "Analysis",
    "analysis.index.cards.meli.title": "Mercado Libre",
    "analysis.index.cards.meli.desc": "Analyze a product by pasting its URL",
    "analysis.index.cards.practice.title": "Practice Scraping",
    "analysis.index.cards.practice.desc": "Scrape Trustpilot/RottenTomatoes/Goodreads and analyze",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Language | null
      if (saved === "es" || saved === "en") {
        setLanguage(saved)
      }
    } catch {}
  }, [])

  const setLang = (lang: Language) => {
    setLanguage(lang)
    try {
      localStorage.setItem("lang", lang)
    } catch {}
  }

  const t = useMemo(() => {
    return (key: string) => translations[language]?.[key] ?? translations["en"][key] ?? key
  }, [language])

  const value: I18nContextType = { language, setLanguage: setLang, t }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider")
  return ctx
}