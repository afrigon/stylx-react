export const colorRoles = ["neutral", "information", "success", "warning", "critical", "magic"] as const

export type ColorRoleName = (typeof colorRoles)[number]
