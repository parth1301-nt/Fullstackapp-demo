"use client";

import {
  type EmojiPickerListCategoryHeaderProps,
  type EmojiPickerListEmojiProps,
  type EmojiPickerListRowProps,
  EmojiPicker as EmojiPickerPrimitive,
} from "frimousse";
import { LoaderIcon, SearchIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function EmojiPicker({
  className,
  ...props
}: React.ComponentProps<typeof EmojiPickerPrimitive.Root>) {
  return (
    <EmojiPickerPrimitive.Root
      className={cn(
        "isolate flex h-full w-fit flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
        className
      )}
      data-slot="emoji-picker"
      {...props}
    />
  );
}

function EmojiPickerSearch({
  className,
  ...props
}: React.ComponentProps<typeof EmojiPickerPrimitive.Search>) {
  return (
    <div
      className={cn(
        "flex h-11 min-h-11 items-center gap-2 border-b border-border px-4",
        className
      )}
      data-slot="emoji-picker-search-wrapper"
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <EmojiPickerPrimitive.Search
        className={cn(
          "flex h-full w-full rounded-md bg-transparent py-2 text-sm leading-normal outline-none",
          "placeholder:text-muted-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        data-slot="emoji-picker-search"
        placeholder="Search emoji…"
        {...props}
      />
    </div>
  );
}

function EmojiPickerRow({ children, ...props }: EmojiPickerListRowProps) {
  return (
    <div {...props} className="scroll-my-1 px-2" data-slot="emoji-picker-row">
      {children}
    </div>
  );
}

function EmojiPickerEmoji({
  emoji,
  className,
  ...props
}: EmojiPickerListEmojiProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "flex size-11 min-h-11 min-w-11 items-center justify-center rounded-md text-xl",
        "motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none",
        "motion-safe:active:scale-95 motion-reduce:active:scale-100",
        "data-[active]:bg-accent data-[active]:text-accent-foreground",
        className
      )}
      data-slot="emoji-picker-emoji"
      aria-label={emoji.label}
    >
      {emoji.emoji}
    </button>
  );
}

function EmojiPickerCategoryHeader({
  category,
  ...props
}: EmojiPickerListCategoryHeaderProps) {
  return (
    <div
      {...props}
      className="bg-popover px-4 pb-2 pt-4 text-xs font-medium leading-normal text-muted-foreground"
      data-slot="emoji-picker-category-header"
    >
      {category.label}
    </div>
  );
}

function EmojiPickerContent({
  className,
  ...props
}: React.ComponentProps<typeof EmojiPickerPrimitive.Viewport>) {
  return (
    <EmojiPickerPrimitive.Viewport
      className={cn("relative flex-1 outline-none", className)}
      data-slot="emoji-picker-viewport"
      {...props}
    >
      <EmojiPickerPrimitive.Loading
        className="absolute inset-0 flex items-center justify-center text-muted-foreground"
        data-slot="emoji-picker-loading"
      >
        <LoaderIcon className="size-4 motion-safe:animate-spin motion-reduce:animate-none" />
      </EmojiPickerPrimitive.Loading>
      <EmojiPickerPrimitive.Empty
        className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm leading-relaxed text-muted-foreground"
        data-slot="emoji-picker-empty"
      >
        No emoji found.
      </EmojiPickerPrimitive.Empty>
      <EmojiPickerPrimitive.List
        className="select-none pb-2"
        components={{
          Row: EmojiPickerRow,
          Emoji: EmojiPickerEmoji,
          CategoryHeader: EmojiPickerCategoryHeader,
        }}
        data-slot="emoji-picker-list"
      />
    </EmojiPickerPrimitive.Viewport>
  );
}

function EmojiPickerFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 max-w-(--frimousse-viewport-width) items-center gap-2 border-t border-border p-2",
        className
      )}
      data-slot="emoji-picker-footer"
      {...props}
    >
      <EmojiPickerPrimitive.ActiveEmoji>
        {({ emoji }) =>
          emoji ? (
            <>
              <div
                className="flex size-11 flex-none items-center justify-center rounded-md bg-muted text-lg"
                aria-hidden
              >
                {emoji.emoji}
              </div>
              <span className="truncate text-xs leading-normal text-secondary-foreground">
                {emoji.label}
              </span>
            </>
          ) : (
            <span className="ml-2 flex h-11 items-center truncate text-xs leading-normal text-muted-foreground">
              Select an emoji…
            </span>
          )
        }
      </EmojiPickerPrimitive.ActiveEmoji>
    </div>
  );
}

export {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
};
