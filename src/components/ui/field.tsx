"use client"

import { cva, type VariantProps } from "class-variance-authority"
import {
    FieldError as AriaFieldError,
    FieldErrorProps as AriaFieldErrorProps,
    Group as AriaGroup,
    GroupProps as AriaGroupProps,
    Label as AriaLabel,
    LabelProps as AriaLabelProps,
    Text as AriaText,
    TextProps as AriaTextProps,
    composeRenderProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const labelVariants = cva([
    "text-sm font-medium leading-none text-white",
    /* Disabled */
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
    /* Invalid */
    "group-data-[invalid]:text-red-500",
])

const Label = ({ className, ...props }: AriaLabelProps) => (
    <AriaLabel className={cn(labelVariants(), className)} {...props} />
)

function FormDescription({ className, ...props }: AriaTextProps) {
    return (
        <AriaText
            className={cn("text-sm text-white/60", className)}
            {...props}
            slot="description"
        />
    )
}

function FieldError({ className, ...props }: AriaFieldErrorProps) {
    return (
        <AriaFieldError
            className={cn("text-sm font-medium text-red-500", className)}
            {...props}
        />
    )
}

const fieldGroupVariants = cva("", {
    variants: {
        variant: {
            default: [
                "relative flex h-12 w-full items-center overflow-hidden rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white ring-offset-background",
                /* Focus Within */
                "data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-accent data-[focus-within]:ring-offset-2",
                /* Disabled */
                "data-[disabled]:opacity-50",
            ],
            ghost: "",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

interface GroupProps
    extends AriaGroupProps,
    VariantProps<typeof fieldGroupVariants> { }

function FieldGroup({ className, variant, ...props }: GroupProps) {
    return (
        <AriaGroup
            className={composeRenderProps(className, (className) =>
                cn(fieldGroupVariants({ variant }), className)
            )}
            {...props}
        />
    )
}

export {
    Label,
    labelVariants,
    FieldGroup,
    fieldGroupVariants,
    FieldError,
    FormDescription,
}
