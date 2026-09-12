import { FormControl, FormItem, FormLabel } from "@wealthfolio/ui/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@wealthfolio/ui/components/ui/radio-group";
import { Icons } from "@wealthfolio/ui/components/ui/icons";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ThemePreview } from "./theme-preview";

interface ThemeSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ThemeSelector({ value, onChange, className }: ThemeSelectorProps) {
  const { t } = useTranslation();
  const options = [
    { value: "light", label: t("common:component.theme_light_label"), icon: Icons.Sun },
    { value: "dark", label: t("common:component.theme_dark_label"), icon: Icons.Moon },
    { value: "system", label: t("common:component.theme_system_label"), icon: Icons.Monitor },
  ] as const;

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className={cn("grid grid-cols-3 gap-3", className)}
    >
      {options.map((option) => (
        <FormItem key={option.value}>
          <FormLabel className="group block cursor-pointer">
            <FormControl>
              <RadioGroupItem value={option.value} className="sr-only" />
            </FormControl>
            <div className="border-border bg-card group-has-[[data-state=checked]]:border-brand group-has-[:focus-visible]:ring-brand/40 group-hover:shadow-minimal overflow-hidden rounded-xl border transition-[border-color,box-shadow] group-has-[:focus-visible]:ring-4">
              <ThemePreview theme={option.value} />
              <span className="border-border flex min-h-11 items-center justify-center gap-2 border-t px-1 text-xs font-medium sm:text-sm">
                <option.icon aria-hidden="true" className="size-4 shrink-0" />
                {option.label}
                {value === option.value && (
                  <Icons.Check aria-hidden="true" className="text-brand size-3 shrink-0" />
                )}
              </span>
            </div>
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  );
}
