import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "glass" | "transparent" | "plain"
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
    ({ className, variant = "glass", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl transition-colors",
                    variant === "glass" && "bg-white/5 ring-1 ring-white/10 backdrop-blur-sm p-6 md:p-8",
                    variant === "transparent" && "bg-transparent p-0",
                    className
                )}
                {...props}
            />
        )
    }
)
Section.displayName = "Section"

export { Section }
