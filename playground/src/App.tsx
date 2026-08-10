import { useState } from "react"
import {
    Badge,
    Button,
    Card,
    colorRoles,
    Container,
    Field,
    Role,
    Separator,
    Skeleton,
    SkeletonCard,
    SkeletonParagraph,
    Stack,
    Text,
    TextField,
    textVariants,
    ThemeProvider,
    type ButtonEmphasis,
    type ButtonScale,
    type ColorContrast,
    type SchemePreference
} from "stylx-react"
import "stylx-react/styles.css"

const EMPHASES: ButtonEmphasis[] = ["default", "emphasis", "muted"]
const SCALES: ButtonScale[] = ["xs", "s", "m", "l"]

const SPACING = ["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"]
const RADIUS = ["default", "double", "full"]

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

                <section style={{ marginTop: 32 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Typography</h2>
                    {textVariants.map(variant => (
                        <Text key={variant} as="p" variant={variant} style={{ marginBottom: 8 }}>
                            {variant}
                        </Text>
                    ))}
                </section>

                <section style={{ marginTop: 32 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Spacing</h2>
                    <div style={{ display: "flex", gap: 16, alignItems: "flex-end", marginBottom: 24 }}>
                        {SPACING.map(name => (
                            <div
                                key={name}
                                style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}
                            >
                                <div
                                    style={{
                                        width: `var(--stylx-spacing-${name})`,
                                        height: `var(--stylx-spacing-${name})`,
                                        background: "var(--stylx-role-emphasis)"
                                    }}
                                />
                                <span style={{ fontSize: 11, color: "var(--stylx-fg-muted)" }}>{name}</span>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Radius</h2>
                    <div style={{ display: "flex", gap: 16 }}>
                        {RADIUS.map(name => (
                            <div
                                key={name}
                                style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}
                            >
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: `var(--stylx-radius-${name})`,
                                        background: "var(--stylx-role-muted)",
                                        border: "1px solid var(--stylx-role-border-emphasis)"
                                    }}
                                />
                                <span style={{ fontSize: 11, color: "var(--stylx-fg-muted)" }}>{name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginTop: 32 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Buttons</h2>
                    {EMPHASES.map(emphasis => (
                        <div
                            key={emphasis}
                            style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}
                        >
                            <Text variant="body-small-bold">{emphasis}</Text>
                            {colorRoles.map(name => (
                                <Role key={name} role={name}>
                                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                                        <span style={{ width: 96, fontSize: 12, color: "var(--stylx-fg-muted)" }}>
                                            {name}
                                        </span>
                                        {SCALES.map(scale => (
                                            <Button key={scale} emphasis={emphasis} scale={scale}>
                                                Button
                                            </Button>
                                        ))}
                                        <Button emphasis={emphasis} loading>
                                            Loading
                                        </Button>
                                        <Button emphasis={emphasis} disabled>
                                            Disabled
                                        </Button>
                                        <Button emphasis={emphasis} format="capsule">
                                            Capsule
                                        </Button>
                                    </div>
                                </Role>
                            ))}
                        </div>
                    ))}
                </section>

                <section style={{ marginTop: 32, maxWidth: 320 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Fields</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Field label="Username" hint="Your public handle">
                            <TextField placeholder="xehos" />
                        </Field>
                        <Field label="Email" error="That email is already taken">
                            <TextField placeholder="you@example.com" invalid defaultValue="taken@example.com" />
                        </Field>
                        <Field label="Disabled">
                            <TextField placeholder="unavailable" disabled />
                        </Field>
                    </div>
                </section>

                <section style={{ marginTop: 32 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Layout</h2>
                    <Container maxWidth={640} style={{ paddingInline: 0 }}>
                        <Stack direction="row" gap="m" wrap>
                            <Card style={{ flex: 1, minWidth: 220 }}>
                                <Stack gap="s">
                                    <Text variant="heading3" as="h3">
                                        Card
                                    </Text>
                                    <Text variant="body">A surface with tokenized radius and shadow.</Text>
                                    <Separator />
                                    <Stack direction="row" gap="xs">
                                        <Button emphasis="emphasis" role="information" scale="s">
                                            Confirm
                                        </Button>
                                        <Button scale="s">Cancel</Button>
                                    </Stack>
                                </Stack>
                            </Card>
                            <Card style={{ flex: 1, minWidth: 220 }}>
                                <Stack direction="row" gap="m" align="center">
                                    <Text variant="body">Left</Text>
                                    <Separator direction="vertical" size="emphasis" />
                                    <Text variant="body">Right</Text>
                                </Stack>
                            </Card>
                        </Stack>
                    </Container>
                </section>

                <section style={{ marginTop: 32 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Badges</h2>
                    <Stack direction="row" gap="s" wrap>
                        {colorRoles.map(name => (
                            <Badge key={name} role={name}>
                                {name}
                            </Badge>
                        ))}
                    </Stack>
                </section>

                <section style={{ marginTop: 32, maxWidth: 480 }}>
                    <h2 style={{ fontSize: 16, marginBottom: 12 }}>Skeletons</h2>
                    <Stack gap="l">
                        <Skeleton width="40%" />
                        <SkeletonParagraph />
                        <SkeletonCard />
                    </Stack>
                </section>
            </div>
        </ThemeProvider>
    )
}

export { App }
