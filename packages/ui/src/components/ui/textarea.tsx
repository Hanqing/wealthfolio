import * as React from "react";

import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "placeholder:text-muted-foreground bg-foreground/[0.035] shadow-minimal-flat hover:bg-foreground/[0.05] focus-visible:border-ring/35 focus-visible:bg-background focus-visible:ring-ring/30 flex min-h-[80px] w-full rounded-lg border border-transparent px-3 py-2 text-base outline-none transition-[background-color,border-color,box-shadow] duration-150 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
