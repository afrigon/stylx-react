import { type ReactNode } from "react"
import { type ColorRoleName } from "./roles"

export interface RoleProps {
    role: ColorRoleName
    className?: string
    children: ReactNode
}

export function Role({ role, className, children }: RoleProps) {
    return (
        <div data-role={role} className={className} style={{ display: "contents" }}>
            {children}
        </div>
    )
}
