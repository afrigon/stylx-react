import { writeFileSync } from "node:fs"
import { fileURLToPath, URL } from "node:url"

const HUES = ["lime", "red", "orange", "yellow", "green", "teal", "blue", "purple", "pink", "gray"]

const PALETTE = {
    lime: ["EFFFD6", "D3F1A7", "B3DF72", "94C748", "82B536", "6A9A23", "5B7F24", "4C6B1F", "37471F", "28311B"],
    red: ["FFECEB", "FFD5D2", "FD9891", "F87168", "F15B50", "E2483D", "C9372C", "AE2E24", "5D1F1A", "42221F"],
    orange: ["FFF3EB", "FEDEC8", "FEC195", "FEA362", "F38A3F", "E56910", "C25100", "A54800", "702E00", "38291E"],
    yellow: ["FFF7D6", "F8E6A0", "F5CD47", "E2B203", "CF9F02", "B38600", "946F00", "7F5F01", "533F04", "332E1B"],
    green: ["DCFFF1", "BAF3DB", "7EE2B8", "4BCE97", "2ABB7F", "22A06B", "1F845A", "216E4E", "164B35", "1C3329"],
    teal: ["E7F9FF", "C6EDFB", "9DD9EE", "6CC3E0", "42B2D7", "2898BD", "227D9B", "206A83", "164555", "1E3137"],
    blue: ["E9F2FF", "CCE0FF", "85B8FF", "579DFF", "388BFF", "1D7AFC", "0C66E4", "0055CC", "09326C", "1C2B41"],
    purple: ["F3F0FF", "DFD8FD", "B8ACF6", "9F8FEF", "8F7EE7", "8270DB", "6E5DC6", "5E4DB2", "352C63", "2B273F"],
    pink: ["FFECF8", "FDD0EC", "F797D2", "E774BB", "DA62AC", "CD519D", "AE4787", "943D73", "50253F", "3D2232"],
    gray: ["FFFFFF", "F8F8F8", "E6E6E6", "D5D5D5", "B1B1B1", "909090", "6D6D6D", "464646", "222222", "000000"]
}

const inverse = i => 9 - i
const lighter = i => Math.min(i + 1, 9)
const darker = i => Math.max(i - 1, 0)

const tintName = i => (i + 1) * 100

const id = (hue, i) => ({ hue, i })
const TRANSPARENT = "transparent"

function themed(light, dark) {
    const darkId = dark ?? id(light.hue, inverse(light.i))

    return {
        light,
        dark: darkId,
        lightIncreased: id(light.hue, darker(light.i)),
        darkIncreased: id(darkId.hue, lighter(darkId.i))
    }
}

const paletteVar = ({ hue, i }) => `var(--stylx-${hue}-${tintName(i)})`

const VARIANTS = [
    { key: "light", selector: ":root" },
    { key: "dark", selector: '[data-scheme="dark"]' },
    { key: "lightIncreased", selector: '[data-contrast="increased"]' },
    { key: "darkIncreased", selector: '[data-scheme="dark"][data-contrast="increased"]' }
]

const g = i => id("gray", i)

const SEMANTIC = {
    bg: {
        default: themed(g(0), g(7)),
        emphasis: themed(g(2)),
        muted: themed(g(1)),
        disabled: themed(g(3)),
        transparent: TRANSPARENT,
        inverse: themed(g(7))
    },
    fg: {
        "default": themed(g(8)),
        "muted": themed(g(6)),
        "on-emphasis": themed(g(1)),
        "disabled": themed(g(4)),
        "link": themed(id("blue", 3))
    },
    border: {
        default: themed(g(2)),
        emphasis: themed(g(3)),
        muted: themed(g(1)),
        disabled: themed(g(3)),
        transparent: TRANSPARENT
    }
}

const ROLE_NAMES = ["neutral", "information", "success", "warning", "critical", "magic"]

const role = (emphasis, muted, borderEmphasis, borderMuted) => ({
    "emphasis": themed(emphasis),
    "muted": themed(muted),
    "foreground": themed(emphasis),
    "border-emphasis": themed(borderEmphasis),
    "border-muted": themed(borderMuted)
})

const ROLES = {
    neutral: role(g(5), g(2), g(6), g(3)),
    information: role(id("blue", 5), id("blue", 0), id("blue", 6), id("blue", 1)),
    success: role(id("green", 5), id("green", 0), id("green", 6), id("green", 1)),
    warning: role(id("yellow", 4), id("yellow", 0), id("yellow", 5), id("yellow", 1)),
    critical: role(id("red", 5), id("red", 0), id("red", 6), id("red", 1)),
    magic: role(id("purple", 5), id("purple", 0), id("purple", 6), id("purple", 1))
}

function resolve(value, variantKey) {
    if (value === TRANSPARENT) {
        return TRANSPARENT
    }

    return paletteVar(value[variantKey])
}

function paletteBlock() {
    const lines = HUES.flatMap(hue => PALETTE[hue].map((hex, i) => `    --stylx-${hue}-${tintName(i)}: #${hex};`))

    return `:root {\n${lines.join("\n")}\n}`
}

function themeBlock(variant) {
    const lines = []

    for (const [group, tokens] of Object.entries(SEMANTIC)) {
        for (const [token, value] of Object.entries(tokens)) {
            lines.push(`    --stylx-${group}-${token}: ${resolve(value, variant.key)};`)
        }
    }

    for (const roleName of ROLE_NAMES) {
        for (const [token, value] of Object.entries(ROLES[roleName])) {
            lines.push(`    --stylx-role-${roleName}-${token}: ${resolve(value, variant.key)};`)
        }
    }

    return `${variant.selector} {\n${lines.join("\n")}\n}`
}

const ROLE_TOKENS = ["emphasis", "muted", "foreground", "border-emphasis", "border-muted"]

function activeRoleBlock(selector, roleName) {
    const lines = ROLE_TOKENS.map(token => `    --stylx-role-${token}: var(--stylx-role-${roleName}-${token});`)

    return `${selector} {\n${lines.join("\n")}\n}`
}

function roleSelectionBlocks() {
    const blocks = [activeRoleBlock(":root", "neutral")]

    for (const roleName of ROLE_NAMES) {
        blocks.push(activeRoleBlock(`[data-role="${roleName}"]`, roleName))
    }

    return blocks.join("\n\n")
}

function tokensCss() {
    const blocks = [paletteBlock(), ...VARIANTS.map(themeBlock), roleSelectionBlocks()]

    return `${blocks.join("\n\n")}\n`
}

function themeMapping() {
    const lines = []

    for (const hue of HUES) {
        for (let i = 0; i < 10; i++) {
            lines.push(`    --color-stylx-${hue}-${tintName(i)}: var(--stylx-${hue}-${tintName(i)});`)
        }
    }

    for (const token of Object.keys(SEMANTIC.bg)) {
        lines.push(`    --color-surface-${token}: var(--stylx-bg-${token});`)
    }

    for (const token of Object.keys(SEMANTIC.fg)) {
        lines.push(`    --color-content-${token}: var(--stylx-fg-${token});`)
    }

    for (const token of Object.keys(SEMANTIC.border)) {
        lines.push(`    --color-line-${token}: var(--stylx-border-${token});`)
    }

    for (const token of ROLE_TOKENS) {
        lines.push(`    --color-role-${token}: var(--stylx-role-${token});`)
    }

    return `@theme inline {\n${lines.join("\n")}\n}`
}

function presetCss() {
    return `${themeMapping()}\n`
}

const out = path => fileURLToPath(new URL(path, import.meta.url))

writeFileSync(out("../src/tokens.css"), tokensCss())
writeFileSync(out("../src/preset.css"), presetCss())

process.stdout.write("generated src/tokens.css and src/preset.css\n")
