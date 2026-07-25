import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-[background-color,color,border-color,box-shadow,opacity] duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:ring-ring/40 focus-visible:ring-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/25",
        outline:
          "border border-foreground/10 bg-background shadow-minimal-flat hover:bg-foreground/[0.03]",
        secondary: "bg-foreground/[0.05] text-foreground hover:bg-foreground/[0.09]",
        ghost: "text-foreground hover:bg-foreground/[0.04]",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 md:h-9 has-[>svg]:px-3",
        xs: "h-8 gap-1 px-2.5 md:h-7 has-[>svg]:px-2",
        sm: "h-9 gap-1.5 px-3.5 md:h-8 has-[>svg]:px-3",
        lg: "h-11 px-6 md:h-10 has-[>svg]:px-5",
        icon: "size-10 md:size-9",

        "icon-xs": "size-8 md:size-7",
        "icon-sm": "size-9 md:size-8",
        "icon-lg": "size-11 md:size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
