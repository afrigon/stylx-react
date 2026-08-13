import { type InputHTMLAttributes, type ReactNode } from "react"

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    invalid?: boolean
}

export function TextField({ invalid, className, ...rest }: TextFieldProps) {
    const classes = ["stylx-textfield", className].filter(Boolean).join(" ")

    return (
        <input className={classes} data-invalid={invalid || undefined} aria-invalid={invalid || undefined} {...rest} />
    )
}

export interface FieldProps {
    label?: ReactNode
    hint?: ReactNode
    error?: ReactNode
    className?: string
    children: ReactNode
}

export function Field({ label, hint, error, className, children }: FieldProps) {
    const classes = ["stylx-field", className].filter(Boolean).join(" ")

    return (
        <div className={classes} data-role={error ? "critical" : undefined}>
            <label className="stylx-field-label">
                {label}
                {children}
            </label>
            {error ? (
                <span className="stylx-field-message" data-error="true">
                    {error}
                </span>
            ) : hint ? (
                <span className="stylx-field-message">{hint}</span>
            ) : null}
        </div>
    )
}
