"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm font-medium leading-normal text-foreground select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "[&>[data-slot=label-hint]]:font-normal [&>[data-slot=label-hint]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function LabelHint({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="label-hint"
      className={cn("text-xs", className)}
      {...props}
    />
  )
}

export { Label, LabelHint }
