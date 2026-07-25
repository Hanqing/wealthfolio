import * as React from "react";

import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-brand/25 selection:text-foreground bg-foreground/[0.035] h-input-height shadow-minimal-flat w-full min-w-0 rounded-lg border border-transparent px-3 py-1 text-base outline-none transition-[background-color,border-color,box-shadow] duration-150 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:bg-foreground/[0.05] focus-visible:border-ring/35 focus-visible:bg-background focus-visible:ring-ring/30 focus-visible:ring-2",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

Input.displayName = "Input";
export { Input };
