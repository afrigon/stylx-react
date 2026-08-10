import { type HTMLAttributes } from "react"
import { Card, type CardProps } from "./Card"
import { Stack } from "./Stack"

export type SkeletonScale = "s" | "l"

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    scale?: SkeletonScale
    width?: number | string
}

export function Skeleton({ scale = "l", width, className, style, ...rest }: SkeletonProps) {
    const classes = ["stylx-skeleton", className].filter(Boolean).join(" ")

    return (
        <div
            className={classes}
            data-scale={scale}
            aria-hidden="true"
            style={{ width: typeof width === "number" ? `${width}px` : width, ...style }}
            {...rest}
        />
    )
}

export interface SkeletonParagraphProps extends HTMLAttributes<HTMLDivElement> {
    lines?: number
}

export function SkeletonParagraph({ lines = 3, ...rest }: SkeletonParagraphProps) {
    return (
        <Stack gap="s" {...rest}>
            <Skeleton scale="l" width="60%" />
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton key={index} scale="s" width={index === lines - 1 ? "80%" : "100%"} />
            ))}
        </Stack>
    )
}

export function SkeletonCard(props: CardProps) {
    return (
        <Card {...props}>
            <SkeletonParagraph />
        </Card>
    )
}
