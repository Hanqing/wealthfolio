import { cn } from "@/lib/utils";

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

export function ThemePreview({ theme }: { theme: PreviewTheme | "system" }) {
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
