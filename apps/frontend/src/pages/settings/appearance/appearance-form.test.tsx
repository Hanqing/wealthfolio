import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppearanceForm } from "./appearance-form";

const state = vi.hoisted(() => ({
  settings: null as null | { theme: string; font: string; menuBarVisible: boolean },
  updateSettings: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/settings-provider", () => ({ useSettingsContext: () => state }));
vi.mock("@/hooks/use-platform", () => ({ usePlatform: () => ({ isMobile: false }) }));
vi.mock("@/pages/layouts/navigation/navigation-mode-context", () => ({
  useNavigationMode: () => ({ mode: "sidebar", setMode: vi.fn() }),
}));
vi.mock("@/components/navigation-style-selector", () => ({
  NavigationStyleSelector: () => null,
}));
vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key: string) => key }) }));

describe("AppearanceForm saved preferences", () => {
  beforeEach(() => {
    state.settings = null;
    state.updateSettings.mockClear();
  });

  it("reflects settings that load after the form mounts without saving them again", async () => {
    const { rerender } = render(<AppearanceForm />);
    state.settings = { theme: "dark", font: "font-mono", menuBarVisible: false };
    rerender(<AppearanceForm />);
    await waitFor(() =>
      expect(
        screen.getByRole("radio", { name: "common:component.theme_dark_label" }),
      ).toBeChecked(),
    );
    expect(screen.getByRole("button", { name: /component.font_mono/ })).toHaveClass(
      "border-primary",
    );
    expect(screen.getByRole("switch")).not.toBeChecked();
    expect(state.updateSettings).not.toHaveBeenCalled();
  });

  it("saves a new theme selected after preferences load", async () => {
    state.settings = { theme: "dark", font: "font-sans", menuBarVisible: true };
    render(<AppearanceForm />);
    await userEvent.click(screen.getByText("common:component.theme_light_label"));
    expect(state.updateSettings).toHaveBeenCalledWith({ theme: "light" });
    expect(screen.getByRole("radio", { name: "common:component.theme_light_label" })).toBeChecked();
  });
});
