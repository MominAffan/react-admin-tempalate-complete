"use client"

import { createContext, useContext, useState } from "react"
import { translations } from "../locales/translations"

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageContextProvider")
  }
  return context
}

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")
  const [isRTL, setIsRTL] = useState(false)

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setIsRTL(lang === "ar" || lang === "he")
    document.dir = lang === "ar" || lang === "he" ? "rtl" : "ltr"
  }

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  return <LanguageContext.Provider value={{ language, isRTL, changeLanguage, t ,setIsRTL}}>{children}</LanguageContext.Provider>
}
