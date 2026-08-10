import { useState } from "react"
import { colorRoles, Role, ThemeProvider, type ColorContrast, type SchemePreference } from "stylx-react"
import "stylx-react/styles.css"

const HUES = ["lime", "red", "orange", "yellow", "green", "teal", "blue", "purple", "pink", "gray"]
const TINTS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const SEMANTIC = [
    { label: "surface", token: "bg", tokens: ["default", "emphasis", "muted", "disabled", "inverse"] },
    { label: "content", token: "fg", tokens: ["default", "muted", "on-emphasis", "disabled", "link"] },
    { label: "border", token: "border", tokens: ["default", "emphasis", "muted", "disabled"] }
]

const ROLE_TOKENS = ["emphasis", "muted", "foreground", "border-emphasis", "border-muted"]

function Swatch({ color, label }: { color: string; label: string }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", width: 76 }}>
            <div
                style={{
                    width: 64,
                    height: 40,
                    borderRadius: 6,
                    background: color,
                    border: "1px solid var(--stylx-border-default)"
                }}
            />
            <span style={{ fontSize: 11, color: "var(--stylx-fg-muted)", textAlign: "center" }}>{label}</span>
        </div>
    )
}

function App() {
    const [scheme, setScheme] = useState<SchemePreference>("system")
    const [contrast, setContrast] = useState<ColorContrast>("standard")

    return (
        <ThemeProvider scheme={scheme} contrast={contrast}>
            <div
                style={{
                    minHeight: "100vh",
                    padding: 32,
                    background: "var(--stylx-bg-default)",
                    color: "var(--stylx-fg-default)",
                    fontFamily: "system-ui, sans-serif"
                }}
            >
                <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>stylx-react color reference</h1>

                <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
                    {(["light", "dark", "system"] as const).map(option => (
                        <button key={option} onClick={() => setScheme(option)} data-active={scheme === option}>
                            {option}
                        </button>
                    ))}
                    {(["standard", "increased"] as const).map(option => (
                        <button key={option} onClick={() => setContrast(option)} data-active={contrast === option}>
                            {option}
                        </button>
                    ))}
                </div>

                <section style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Palette</h2>
                    {HUES.map(hue => (
                        <div key={hue} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                            {TINTS.map(tint => (
                                <Swatch key={tint} color={`var(--stylx-${hue}-${tint})`} label={`${hue} ${tint}`} />
                            ))}
                        </div>
                    ))}
                </section>

                <section style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Semantic tokens</h2>
                    {SEMANTIC.map(group => (
                        <div key={group.token} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                            {group.tokens.map(token => (
                                <Swatch
                                    key={token}
                                    color={`var(--stylx-${group.token}-${token})`}
                                    label={`${group.label} ${token}`}
                                />
                            ))}
                        </div>
                    ))}
                </section>

                <section>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Roles</h2>
                    {colorRoles.map(name => (
                        <Role key={name} role={name}>
                            <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                                <span style={{ width: 96, fontSize: 12 }}>{name}</span>
                                {ROLE_TOKENS.map(token => (
                                    <Swatch key={token} color={`var(--stylx-role-${token})`} label={token} />
                                ))}
                            </div>
                        </Role>
                    ))}
                </section>
            </div>
        </ThemeProvider>
    )
}

export { App }
