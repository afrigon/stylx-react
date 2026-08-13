import { type HTMLAttributes } from "react"

export type SeparatorDirection = "horizontal" | "vertical"
export type SeparatorSize = "default" | "emphasis" | "large"

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    direction?: SeparatorDirection
    size?: SeparatorSize
}

export function Separator({ direction = "horizontal", size = "default", className, ...rest }: SeparatorProps) {
    const classes = ["stylx-separator", className].filter(Boolean).join(" ")

    return (
        <div
            role="separator"
            aria-orientation={direction}
            className={classes}
            data-direction={direction}
            data-size={size}
            {...rest}
        />
    )
}
