import { type HTMLAttributes, type ReactNode } from "react"
import { type ColorRoleName } from "../theme/roles"

interface BadgeOwnProps {
    role?: ColorRoleName
    children?: ReactNode
}

export type BadgeProps = BadgeOwnProps & Omit<HTMLAttributes<HTMLSpanElement>, keyof BadgeOwnProps>

export function Badge({ role, className, children, ...rest }: BadgeProps) {
    const classes = ["stylx-badge", className].filter(Boolean).join(" ")

    return (
        <span className={classes} data-role={role} {...rest}>
            {children}
        </span>
    )
}
