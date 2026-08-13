import { type CSSProperties, type HTMLAttributes, type ReactNode } from "react"
import { type SpacingToken } from "../scale"

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column"
    gap?: SpacingToken
    align?: CSSProperties["alignItems"]
    justify?: CSSProperties["justifyContent"]
    wrap?: boolean
    children?: ReactNode
}

export function Stack({
    direction = "column",
    gap,
    align,
    justify,
    wrap = false,
    className,
    style,
    children,
    ...rest
}: StackProps) {
    const classes = ["stylx-stack", className].filter(Boolean).join(" ")

    return (
        <div
            className={classes}
            style={{
                display: "flex",
                flexDirection: direction,
                gap: gap ? `var(--stylx-spacing-${gap})` : undefined,
                alignItems: align,
                justifyContent: justify,
                flexWrap: wrap ? "wrap" : undefined,
                ...style
            }}
            {...rest}
        >
            {children}
        </div>
    )
}
