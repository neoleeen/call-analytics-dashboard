import { useEffect, useState } from "react"

function getStartingTheme() {
  const saved = sessionStorage.getItem("theme")
  if (saved === "light" || saved === "dark") {
    return saved
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getStartingTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    // sessionStorage, not localStorage, so each tab keeps its own theme
    sessionStorage.setItem("theme", theme)
  }, [theme])

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="glass flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:scale-110"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  )
}

export default ThemeToggle