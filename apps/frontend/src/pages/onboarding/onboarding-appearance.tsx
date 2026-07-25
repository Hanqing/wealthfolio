import { NavigationStyleSelector } from "@/components/navigation-style-selector";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { usePlatform } from "@/hooks/use-platform";
import { useSettingsContext } from "@/lib/settings-provider";
import { cn } from "@/lib/utils";
import {
  NAVIGATION_MODE_STORAGE_KEY,
  type NavigationMode,
} from "@/pages/layouts/navigation/navigation-mode-context";
import { Icons } from "@wealthfolio/ui";
import { Card, CardContent } from "@wealthfolio/ui/components/ui/card";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export interface OnboardingAppearanceHandle {
  submitForm: () => void;
}

interface OnboardingAppearanceProps {
  onNext: () => void;
  onValidityChange: (isValid: boolean) => void;
}

type PreviewTheme = "light" | "dark";

const previewPalettes: Record<
  PreviewTheme,
  {
    background: string;
    surface: string;
    line: string;
    muted: string;
    foreground: string;
    brand: string;
    positive: string;
  }
> = {
  light: {
    background: "#faf9fb",
    surface: "#f2f1f4",
    line: "rgba(38, 36, 42, 0.09)",
    muted: "rgba(38, 36, 42, 0.24)",
    foreground: "#26242a",
    brand: "#8b5fb3",
    positive: "#3f9c67",
  },
  dark: {
    background: "#211f26",
    surface: "#2b2931",
    line: "rgba(255, 255, 255, 0.09)",
    muted: "rgba(255, 255, 255, 0.24)",
    foreground: "#f3f1f6",
    brand: "#ab7ad4",
    positive: "#69c28b",
  },
};

function ThemePreviewCanvas({ theme, className }: { theme: PreviewTheme; className?: string }) {
  const palette = previewPalettes[theme];

  return (
    <div
      aria-hidden="true"
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ backgroundColor: palette.background }}
    >
      <div
        className="absolute inset-y-0 left-0 w-[23%] border-r"
        style={{ backgroundColor: palette.surface, borderColor: palette.line }}
      >
        <div
          className="absolute left-[22%] top-[12%] size-[18%] rounded-[28%]"
          style={{ backgroundColor: palette.brand }}
        />
        {[32, 44, 56, 68].map((top, index) => (
          <div
            key={top}
            className="absolute left-[22%] h-[4%] rounded-full"
            style={{
              top: `${top}%`,
              width: index === 0 ? "58%" : "46%",
              backgroundColor: index === 0 ? palette.line : palette.muted,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-[12%] left-[29%] right-[7%] top-[11%]">
        <div
          className="h-[8%] w-[30%] rounded-full"
          style={{ backgroundColor: palette.foreground }}
        />
        <div
          className="mt-[4%] h-[4%] w-[18%] rounded-full"
          style={{ backgroundColor: palette.positive }}
        />

        <svg className="mt-[5%] h-[36%] w-full" viewBox="0 0 100 36" preserveAspectRatio="none">
          <path
            d="M0,30 C14,27 21,25 32,23 C46,20 52,16 63,15 C75,14 84,10 100,6 L100,36 L0,36 Z"
            fill={palette.positive}
            fillOpacity="0.12"
          />
          <path
            d="M0,30 C14,27 21,25 32,23 C46,20 52,16 63,15 C75,14 84,10 100,6"
            fill="none"
            stroke={palette.positive}
            strokeWidth="1.4"
          />
        </svg>

        <div className="mt-[5%] grid grid-cols-2 gap-[5%]">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="h-7 rounded-[5px] border"
              style={{ backgroundColor: palette.surface, borderColor: palette.line }}
            >
              <div
                className="ml-[9%] mt-[12%] h-[10%] w-[52%] rounded-full"
                style={{ backgroundColor: palette.muted }}
              />
              <div
                className="ml-[9%] mt-[8%] h-[12%] w-[34%] rounded-full"
                style={{ backgroundColor: palette.foreground }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThemePreview({ theme }: { theme: PreviewTheme | "system" }) {
  if (theme !== "system") {
    return (
      <div className="aspect-[5/2] overflow-hidden rounded-t-lg">
        <ThemePreviewCanvas theme={theme} />
      </div>
    );
  }

  return (
    <div className="flex aspect-[5/2] overflow-hidden rounded-t-lg">
      <div className="w-1/2 overflow-hidden">
        <ThemePreviewCanvas theme="light" className="w-[200%]" />
      </div>
      <div className="w-1/2 overflow-hidden">
        <ThemePreviewCanvas theme="dark" className="w-[200%] -translate-x-1/2" />
      </div>
    </div>
  );
}

export const OnboardingAppearance = forwardRef<
  OnboardingAppearanceHandle,
  OnboardingAppearanceProps
>(({ onNext, onValidityChange }, ref) => {
  const { t } = useTranslation();
  const { settings, updateSettings } = useSettingsContext();
  const fonts = useMemo(
    () => [
      {
        value: "font-mono",
        label: t("onboarding:appearance.fonts.monoLabel"),
        description: t("onboarding:appearance.fonts.monoDescription"),
      },
      {
        value: "font-sans",
        label: t("onboarding:appearance.fonts.sansLabel"),
        description: t("onboarding:appearance.fonts.sansDescription"),
      },
      {
        value: "font-serif",
        label: t("onboarding:appearance.fonts.serifLabel"),
        description: t("onboarding:appearance.fonts.serifDescription"),
      },
    ],
    [t],
  );
  const [theme, setTheme] = useState<string>(settings?.theme ?? "system");
  const [font, setFont] = useState<string>(settings?.font ?? "font-sans");
  const { isMobile } = usePlatform();
  // Navigation style lives in localStorage (read by NavigationModeProvider on app
  // load); it only applies on large screens, so the picker is desktop-only.
  const [navMode, setNavMode] = usePersistentState<NavigationMode>(
    NAVIGATION_MODE_STORAGE_KEY,
    "sidebar",
  );

  useEffect(() => {
    // Always valid since we have defaults
    onValidityChange(true);
  }, [onValidityChange]);

  useImperativeHandle(ref, () => ({
    submitForm() {
      updateSettings({ theme, font })
        .then(() => onNext())
        .catch((error) => console.error("Failed to save appearance settings:", error));
    },
  }));

  // Apply theme/font preview when user selects them
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updateSettings({ theme: newTheme }).catch(console.error);
  };

  const handleFontChange = (newFont: string) => {
    setFont(newFont);
    updateSettings({ font: newFont }).catch(console.error);
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground">{t("onboarding:appearance.subtitle")}</p>
      </div>

      <Card className="border-none bg-transparent">
        <CardContent className="space-y-7 p-0 sm:p-4">
          {/* Theme Selection */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-muted rounded-lg p-2">
                <Icons.Palette className="text-muted-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-semibold">{t("onboarding:appearance.themeLabel")}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Light Theme */}
              <button
                type="button"
                data-testid="theme-light-button"
                onClick={() => handleThemeChange("light")}
                className={cn(
                  "group relative overflow-hidden rounded-xl border-2 transition-all duration-200",
                  theme === "light"
                    ? "border-primary ring-primary/20 ring-2"
                    : "border-border hover:border-primary/50",
                )}
              >
                <ThemePreview theme="light" />
                <div
                  className={cn(
                    "flex items-center justify-center gap-2 py-2.5 sm:py-3",
                    theme === "light" ? "bg-primary/10" : "bg-muted/50",
                  )}
                >
                  <Icons.Sun
                    className={cn(
                      "h-4 w-4",
                      theme === "light" ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span className="text-sm font-medium">
                    {t("onboarding:appearance.themeLight")}
                  </span>
                </div>
                {theme === "light" && (
                  <div className="bg-primary absolute right-2 top-2 rounded-full p-0.5">
                    <Icons.Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>

              {/* Dark Theme */}
              <button
                type="button"
                onClick={() => handleThemeChange("dark")}
                className={cn(
                  "group relative overflow-hidden rounded-xl border-2 transition-all duration-200",
                  theme === "dark"
                    ? "border-primary ring-primary/20 ring-2"
                    : "border-border hover:border-primary/50",
                )}
              >
                <ThemePreview theme="dark" />
                <div
                  className={cn(
                    "flex items-center justify-center gap-2 py-2.5 sm:py-3",
                    theme === "dark" ? "bg-primary/10" : "bg-muted/50",
                  )}
                >
                  <Icons.Moon
                    className={cn(
                      "h-4 w-4",
                      theme === "dark" ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span className="text-sm font-medium">
                    {t("onboarding:appearance.themeDark")}
                  </span>
                </div>
                {theme === "dark" && (
                  <div className="bg-primary absolute right-2 top-2 rounded-full p-0.5">
                    <Icons.Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>

              {/* System Theme */}
              <button
                type="button"
                onClick={() => handleThemeChange("system")}
                className={cn(
                  "group relative overflow-hidden rounded-xl border-2 transition-all duration-200",
                  theme === "system"
                    ? "border-primary ring-primary/20 ring-2"
                    : "border-border hover:border-primary/50",
                )}
              >
                <ThemePreview theme="system" />
                <div
                  className={cn(
                    "flex items-center justify-center gap-2 py-2.5 sm:py-3",
                    theme === "system" ? "bg-primary/10" : "bg-muted/50",
                  )}
                >
                  <Icons.Monitor
                    className={cn(
                      "h-4 w-4",
                      theme === "system" ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span className="text-sm font-medium">
                    {t("onboarding:appearance.themeSystem")}
                  </span>
                </div>
                {theme === "system" && (
                  <div className="bg-primary absolute right-2 top-2 rounded-full p-0.5">
                    <Icons.Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Style — desktop only (mobile always uses the mobile nav) */}
          {!isMobile && (
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-muted rounded-lg p-2">
                  <Icons.PanelLeft className="text-muted-foreground h-5 w-5" />
                </div>
                <span className="text-xl font-semibold">
                  {t("onboarding:appearance.navigationLabel")}
                </span>
              </div>

              <NavigationStyleSelector value={navMode} onChange={setNavMode} />
            </div>
          )}

          {/* Font Selection */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-muted rounded-lg p-2">
                <Icons.Type className="text-muted-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-semibold">{t("onboarding:appearance.fontLabel")}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {fonts.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => handleFontChange(f.value)}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-xl border-2 transition-all duration-200",
                    font === f.value
                      ? "border-primary ring-primary/20 ring-2"
                      : "border-border hover:border-primary/50",
                    f.value,
                  )}
                >
                  {/* Font preview area */}
                  <div className="bg-muted/30 flex flex-1 flex-col items-center justify-center px-3 py-3 text-center sm:px-4 sm:py-4">
                    <div className="w-full space-y-2">
                      {/* Font name as hero */}
                      <div className="text-xl font-medium tracking-tight sm:text-2xl">
                        {f.label}
                      </div>
                      {/* Sample text paragraph */}
                      <div className="text-muted-foreground text-[11px] leading-relaxed sm:text-xs">
                        {t("onboarding:appearance.fontSample")}
                      </div>
                      {/* Secondary: numbers sample */}
                      <div className="text-muted-foreground/60 whitespace-nowrap text-[10px] sm:text-xs">
                        12345 · $1,234
                      </div>
                    </div>
                  </div>
                  {/* Label area */}
                  <div
                    className={cn(
                      "w-full px-4 py-2.5 text-center sm:py-3",
                      font === f.value ? "bg-primary/10" : "bg-muted/50",
                    )}
                  >
                    <div className="text-muted-foreground text-xs">{f.description}</div>
                  </div>
                  {font === f.value && (
                    <div className="bg-primary absolute right-2 top-2 rounded-full p-0.5">
                      <Icons.Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

OnboardingAppearance.displayName = "OnboardingAppearance";
