"use client"

import * as React from "react"
import { getLocalTimeZone, today } from "@internationalized/date"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
    Button as AriaButton,
    Calendar as AriaCalendar,
    CalendarCell as AriaCalendarCell,
    CalendarCellProps as AriaCalendarCellProps,
    CalendarGrid as AriaCalendarGrid,
    CalendarGridBody as AriaCalendarGridBody,
    CalendarGridBodyProps as AriaCalendarGridBodyProps,
    CalendarGridHeader as AriaCalendarGridHeader,
    CalendarGridHeaderProps as AriaCalendarGridHeaderProps,
    CalendarGridProps as AriaCalendarGridProps,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    CalendarHeaderCellProps as AriaCalendarHeaderCellProps,
    CalendarProps as AriaCalendarProps,
    DateValue as AriaDateValue,
    Heading as AriaHeading,
    RangeCalendar as AriaRangeCalendar,
    RangeCalendarProps as AriaRangeCalendarProps,
    RangeCalendarStateContext as AriaRangeCalendarStateContext,
    composeRenderProps,
    Text,
    useLocale,
} from "react-aria-components"

import { cn } from "@/lib/utils"
// Use existing button variants 
import { buttonVariants } from "@/components/ui/button"

const Calendar = AriaCalendar

const RangeCalendar = AriaRangeCalendar

const CalendarHeading = (props: React.HTMLAttributes<HTMLElement>) => {
    let { direction } = useLocale()

    return (
        <header className="flex w-full items-center gap-1 px-1 pb-4" {...props}>
            <AriaButton
                slot="previous"
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "size-7 bg-transparent p-0 opacity-50 border-white/20 text-white hover:bg-white/10 hover:text-white",
                    /* Hover */
                    "data-[hovered]:opacity-100"
                )}
            >
                {direction === "rtl" ? (
                    <ChevronRight aria-hidden className="size-4" />
                ) : (
                    <ChevronLeft aria-hidden className="size-4" />
                )}
            </AriaButton>
            <AriaHeading className="grow text-center text-sm font-medium text-white" />
            <AriaButton
                slot="next"
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "size-7 bg-transparent p-0 opacity-50 border-white/20 text-white hover:bg-white/10 hover:text-white",
                    /* Hover */
                    "data-[hovered]:opacity-100"
                )}
            >
                {direction === "rtl" ? (
                    <ChevronLeft aria-hidden className="size-4" />
                ) : (
                    <ChevronRight aria-hidden className="size-4" />
                )}
            </AriaButton>
        </header>
    )
}

const CalendarGrid = ({ className, ...props }: AriaCalendarGridProps) => (
    <AriaCalendarGrid
        className={cn(
            " border-separate border-spacing-x-0 border-spacing-y-1 ",
            className
        )}
        {...props}
    />
)

const CalendarGridHeader = ({ ...props }: AriaCalendarGridHeaderProps) => (
    <AriaCalendarGridHeader {...props} />
)

const CalendarHeaderCell = ({
    className,
    ...props
}: AriaCalendarHeaderCellProps) => (
    <AriaCalendarHeaderCell
        className={cn(
            "w-9 rounded-md text-[0.8rem] font-normal text-white/50",
            className
        )}
        {...props}
    />
)

const CalendarGridBody = ({
    className,
    ...props
}: AriaCalendarGridBodyProps) => (
    <AriaCalendarGridBody className={cn("[&>tr>td]:p-0", className)} {...props} />
)

const CalendarCell = ({ className, ...props }: AriaCalendarCellProps) => {
    const isRange = Boolean(React.useContext(AriaRangeCalendarStateContext))
    return (
        <AriaCalendarCell
            className={composeRenderProps(className, (className, renderProps) =>
                cn(
                    buttonVariants({ variant: "ghost" }),
                    "relative flex size-9 items-center justify-center p-0 text-sm font-normal text-white hover:text-white",
                    /* Disabled */
                    renderProps.isDisabled && "text-white/20 opacity-30",
                    /* Selected */
                    renderProps.isSelected &&
                    "bg-yellow-500 text-black data-[focused]:bg-yellow-500 data-[focused]:text-black shadow-sm shadow-yellow-500/50",
                    /* Hover */
                    renderProps.isHovered &&
                    renderProps.isSelected &&
                    (renderProps.isSelectionStart ||
                        renderProps.isSelectionEnd ||
                        !isRange) &&
                    "data-[hovered]:bg-yellow-600 data-[hovered]:text-black",
                    /* Selection Start/End */
                    renderProps.isSelected &&
                    isRange &&
                    !renderProps.isSelectionStart &&
                    !renderProps.isSelectionEnd &&
                    "rounded-none bg-yellow-500/30 text-white", // Middle range: lighter/transparent yellow
                    /* Outside Month */
                    renderProps.isOutsideMonth &&
                    "text-white/20 opacity-50 data-[selected]:bg-accent/10 data-[selected]:text-white/50 data-[selected]:opacity-30",
                    /* Current Date */
                    renderProps.date.compare(today(getLocalTimeZone())) === 0 &&
                    !renderProps.isSelected &&
                    "bg-white/10 text-white underline decoration-accent decoration-2",
                    /* Unavailable Date */
                    renderProps.isUnavailable && "cursor-not-allowed text-red-400 line-through opacity-70",
                    renderProps.isInvalid &&
                    "bg-red-500/20 text-red-500",
                    className
                )
            )}
            {...props}
        />
    )
}

interface JollyCalendarProps<T extends AriaDateValue>
    extends AriaCalendarProps<T> {
    errorMessage?: string
}

function JollyCalendar<T extends AriaDateValue>({
    errorMessage,
    className,
    ...props
}: JollyCalendarProps<T>) {
    return (
        <Calendar
            className={composeRenderProps(className, (className) =>
                cn("w-fit", className)
            )}
            {...props}
        >
            <CalendarHeading />
            <CalendarGrid>
                <CalendarGridHeader>
                    {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                </CalendarGridHeader>
                <CalendarGridBody>
                    {(date) => <CalendarCell date={date} />}
                </CalendarGridBody>
            </CalendarGrid>
            {errorMessage && (
                <Text className="text-sm text-red-500" slot="errorMessage">
                    {errorMessage}
                </Text>
            )}
        </Calendar>
    )
}

interface JollyRangeCalendarProps<T extends AriaDateValue>
    extends AriaRangeCalendarProps<T> {
    errorMessage?: string
}

function JollyRangeCalendar<T extends AriaDateValue>({
    errorMessage,
    className,
    ...props
}: JollyRangeCalendarProps<T>) {
    return (
        <RangeCalendar
            className={composeRenderProps(className, (className) =>
                cn("w-fit", className)
            )}
            {...props}
        >
            <CalendarHeading />
            <CalendarGrid>
                <CalendarGridHeader>
                    {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                </CalendarGridHeader>
                <CalendarGridBody>
                    {(date) => <CalendarCell date={date} />}
                </CalendarGridBody>
            </CalendarGrid>
            {errorMessage && (
                <Text slot="errorMessage" className="text-sm text-red-500">
                    {errorMessage}
                </Text>
            )}
        </RangeCalendar>
    )
}

export {
    Calendar,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHeader,
    CalendarHeaderCell,
    CalendarHeading,
    RangeCalendar,
    JollyCalendar,
    JollyRangeCalendar,
}
export type { JollyCalendarProps, JollyRangeCalendarProps }
