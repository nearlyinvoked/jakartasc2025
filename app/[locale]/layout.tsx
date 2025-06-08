import type React from "react"
import { type Locale, locales } from "@/lib/i18n"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  return <div lang={locale}>{children}</div>
}
