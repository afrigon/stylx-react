import { type HTMLAttributes, type ReactNode } from "react"
import { type SpacingToken } from "../scale"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: SpacingToken
    children?: ReactNode
}

export function Card({ padding = "l", className, style, children, ...rest }: CardProps) {
    const classes = ["stylx-card", className].filter(Boolean).join(" ")

    return (
        <div className={classes} style={{ padding: `var(--stylx-spacing-${padding})`, ...style }} {...rest}>
            {children}
        </div>
    )
}
