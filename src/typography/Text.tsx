import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react"

export const textVariants = [
    "heading1",
    "heading2",
    "heading3",
    "subtitle",
    "body",
    "body-bold",
    "body-small",
    "body-small-bold",
    "code",
    "code-small",
    "overline",
    "disclaimer"
] as const

export type TextVariant = (typeof textVariants)[number]

interface TextOwnProps {
    variant?: TextVariant
    as?: ElementType
    className?: string
    children?: ReactNode
}

export type TextProps = TextOwnProps & Omit<ComponentPropsWithoutRef<"span">, keyof TextOwnProps>

export function Text({ variant = "body", as: Component = "span", className, children, ...rest }: TextProps) {
    const classes = ["stylx-text", `stylx-text-${variant}`, className].filter(Boolean).join(" ")

    return (
        <Component className={classes} {...rest}>
            {children}
        </Component>
    )
}
