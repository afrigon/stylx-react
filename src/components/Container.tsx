import { type HTMLAttributes, type ReactNode } from "react"
import { type SpacingToken } from "../scale"

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    maxWidth?: number | string
    padding?: SpacingToken
    children?: ReactNode
}

export function Container({ maxWidth = 1024, padding = "m", className, style, children, ...rest }: ContainerProps) {
    const classes = ["stylx-container", className].filter(Boolean).join(" ")

    return (
        <div
            className={classes}
            style={{
                width: "100%",
                maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
                marginInline: "auto",
                paddingInline: `var(--stylx-spacing-${padding})`,
                ...style
            }}
            {...rest}
        >
            {children}
        </div>
    )
}
