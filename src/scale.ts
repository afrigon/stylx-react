export const spacingTokens = [
    "xxxxs",
    "xxxs",
    "xxs",
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "xxxl",
    "xxxxl",
    "xxxxxl",
    "xxxxxxl",
    "xxxxxxxl"
] as const

export type SpacingToken = (typeof spacingTokens)[number]

export const radiusTokens = ["default", "double", "full"] as const

export type RadiusToken = (typeof radiusTokens)[number]
