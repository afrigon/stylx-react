import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { type ColorRoleName } from "./roles"

export type ColorScheme = "light" | "dark"
export type ColorContrast = "standard" | "increased"

export type SchemePreference = ColorScheme | "system"
export type ContrastPreference = ColorContrast | "system"

interface ThemeContextValue {
    scheme: ColorScheme
    contrast: ColorContrast
}

const ThemeContext = createContext<ThemeContextValue>({ scheme: "light", contrast: "standard" })

export function useTheme(): ThemeContextValue {
    return useContext(ThemeContext)
}

function useMediaPreference(query: string, enabled: boolean): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        if (!enabled || typeof window === "undefined") {
            return
        }

        const media = window.matchMedia(query)
        const update = () => setMatches(media.matches)

        update()
        media.addEventListener("change", update)

        return () => media.removeEventListener("change", update)
    }, [query, enabled])

    return matches
}

export interface ThemeProviderProps {
    scheme?: SchemePreference
    contrast?: ContrastPreference
    role?: ColorRoleName
    className?: string
    children: ReactNode
}

export function ThemeProvider({
    scheme = "system",
    contrast = "system",
    role,
    className,
    children
}: ThemeProviderProps) {
    const prefersDark = useMediaPreference("(prefers-color-scheme: dark)", scheme === "system")
    const prefersIncreased = useMediaPreference("(prefers-contrast: more)", contrast === "system")

    const resolvedScheme = scheme === "system" ? (prefersDark ? "dark" : "light") : scheme
    const resolvedContrast = contrast === "system" ? (prefersIncreased ? "increased" : "standard") : contrast

    const value = useMemo(
        () => ({ scheme: resolvedScheme, contrast: resolvedContrast }),
        [resolvedScheme, resolvedContrast]
    )

    return (
        <ThemeContext.Provider value={value}>
            <div data-scheme={resolvedScheme} data-contrast={resolvedContrast} data-role={role} className={className}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}
