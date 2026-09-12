import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { ThemeSelector } from "./theme-selector";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key.split("_").slice(-2, -1)[0] }),
}));

function ThemeForm({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const form = useForm({ defaultValues: { theme: value } });
  return (
    <FormProvider {...form}>
      <ThemeSelector value={value} onChange={onChange} />
    </FormProvider>
  );
}

describe("ThemeSelector", () => {
  it("follows changes to the saved theme after mounting", () => {
    const onChange = vi.fn();
    const { rerender } = render(<ThemeForm value="light" onChange={onChange} />);
    expect(screen.getByRole("radio", { name: "light" })).toBeChecked();
    rerender(<ThemeForm value="dark" onChange={onChange} />);
    expect(screen.getByRole("radio", { name: "dark" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "light" })).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("lets users select a theme through its visible label", async () => {
    const onChange = vi.fn();
    render(<ThemeForm value="light" onChange={onChange} />);
    await userEvent.click(screen.getByText("system"));
    expect(onChange).toHaveBeenCalledWith("system");
  });
});
