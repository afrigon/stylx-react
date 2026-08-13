import { type ButtonHTMLAttributes, type ReactNode } from "react"
import { type ColorRoleName } from "../theme/roles"

export type ButtonEmphasis = "default" | "emphasis" | "muted"
export type ButtonScale = "xs" | "s" | "m" | "l"
export type ButtonFormat = "regular" | "circle" | "square" | "capsule"

interface ButtonOwnProps {
    emphasis?: ButtonEmphasis
    scale?: ButtonScale
    format?: ButtonFormat
    role?: ColorRoleName
    loading?: boolean
    children?: ReactNode
}

export type ButtonProps = ButtonOwnProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps>

export function Button({
    emphasis = "default",
    scale = "m",
    format = "regular",
    role,
    loading = false,
    type = "button",
    disabled,
    className,
    children,
    ...rest
}: ButtonProps) {
    const classes = ["stylx-button", className].filter(Boolean).join(" ")

    return (
        <button
            type={type}
            className={classes}
            data-emphasis={emphasis}
            data-scale={scale}
            data-format={format}
            data-role={role}
            data-loading={loading || undefined}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            {...rest}
        >
            <span className="stylx-button-label">{children}</span>
            {loading ? <span className="stylx-button-spinner" aria-hidden="true" /> : null}
        </button>
    )
}
