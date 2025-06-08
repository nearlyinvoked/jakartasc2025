"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button, Menu, MenuItem } from "@mui/material"
import { Language } from "@mui/icons-material"
import { type Locale, locales } from "@/lib/i18n"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const changeLanguage = (locale: Locale) => {
    // Get current path segments
    const segments = pathname.split("/")

    // Find if there's already a locale in the path
    const localeIndex = segments.findIndex((segment) => locales.includes(segment as Locale))

    // Replace or add the locale
    if (localeIndex !== -1) {
      segments[localeIndex] = locale
    } else if (segments[1] === "") {
      segments[1] = locale
    } else {
      segments.splice(1, 0, locale)
    }

    // Navigate to the new path
    router.push(segments.join("/"))
    handleClose()
  }

  return (
    <>
      <Button color="inherit" onClick={handleClick} startIcon={<Language />} sx={{ minWidth: "auto", p: 1 }}>
        {pathname.includes("/en") ? "EN" : pathname.includes("/id") ? "ID" : "EN"}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage("id")}>Bahasa Indonesia</MenuItem>
      </Menu>
    </>
  )
}
