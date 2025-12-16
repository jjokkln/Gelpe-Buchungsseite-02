"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import {
    Button as AriaButton,
    ButtonProps as AriaButtonProps,
    ListBox as AriaListBox,
    ListBoxItem as AriaListBoxItem,
    ListBoxItemProps as AriaListBoxItemProps,
    ListBoxProps as AriaListBoxProps,
    Popover as AriaPopover,
    PopoverProps as AriaPopoverProps,
    Select as AriaSelect,
    SelectProps as AriaSelectProps,
    SelectValue as AriaSelectValue,
    SelectValueProps as AriaSelectValueProps,
    composeRenderProps,
    Text,
} from "react-aria-components"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Select = <T extends object>(
    { className, ...props }: AriaSelectProps<T>
) => (
    <AriaSelect
        className={composeRenderProps(className, (className) =>
            cn("group flex flex-col gap-2", className)
        )}
        {...props}
    />
)

const SelectTrigger = ({ className, ...props }: AriaButtonProps) => (
    <AriaButton
        className={composeRenderProps(className, (className) =>
            cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )
        )}
        {...props}
    />
)

const SelectValue = <T extends object>(
    { className, ...props }: AriaSelectValueProps<T>
) => (
    <AriaSelectValue
        className={composeRenderProps(className, (className) =>
            cn("line-clamp-1 flex-1 text-left", className)
        )}
        {...props}
    />
)

const SelectContent = ({ className, ...props }: AriaPopoverProps) => (
    <AriaPopover
        className={composeRenderProps(className, (className) =>
            cn(
                "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-white/10 bg-primary-950/95 text-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )
        )}
        offset={4}
        {...props}
    />
)

const SelectListBox = <T extends object>(
    { className, ...props }: AriaListBoxProps<T>
) => (
    <AriaListBox
        className={composeRenderProps(className, (className) =>
            cn("p-1", className)
        )}
        {...props}
    />
)

const SelectItem = ({ className, children, ...props }: AriaListBoxItemProps) => (
    <AriaListBoxItem
        className={composeRenderProps(className, (className) =>
            cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )
        )}
        {...props}
    >
        {composeRenderProps(children, (children, { isSelected }) => (
            <>
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {isSelected && <Check className="h-4 w-4" />}
                </span>
                <Text slot="label">{children}</Text>
            </>
        ))}
    </AriaListBoxItem>
)

export {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectListBox,
    SelectItem,
}
