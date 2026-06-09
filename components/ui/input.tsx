import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 min-h-11 rounded-lg border border-input bg-background px-4 py-2 text-base leading-normal shadow-sm md:text-sm",
        "text-foreground placeholder:text-muted-foreground",
        "file:text-foreground file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "selection:bg-primary selection:text-primary-foreground",
        "motion-safe:transition-[color,box-shadow,border-color,background-color] motion-safe:duration-200 motion-reduce:transition-none",
        "hover:border-ring/40",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
        "read-only:cursor-default read-only:bg-muted/40 read-only:hover:border-input",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "dark:bg-input/30",
        className
      )}
      {...props}
    />
  )
}

export { Input }
