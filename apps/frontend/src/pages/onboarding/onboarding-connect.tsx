import { ExternalLink } from "@/components/external-link";
import { Icons } from "@wealthfolio/ui/components/ui/icons";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const OnboardingConnect: React.FC = () => {
  const { t } = useTranslation();
  const features = useMemo(
    () => [
      {
        icon: Icons.CloudSync2,
        title: t("onboarding:connect.features.brokerageSync.title"),
        description: t("onboarding:connect.features.brokerageSync.description"),
      },
      {
        icon: Icons.Devices,
        title: t("onboarding:connect.features.deviceSync.title"),
        description: t("onboarding:connect.features.deviceSync.description"),
      },
      {
        icon: Icons.UserSwitch,
        title: t("onboarding:connect.features.householdView.title"),
        description: t("onboarding:connect.features.householdView.description"),
      },
    ],
    [t],
  );
  return (
    <div className="grid w-full max-w-4xl items-center gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
      {/* Header */}
      <div className="flex flex-col items-start">
        <div className="text-brand mb-4 inline-flex items-center gap-2 text-xs font-medium">
          <Icons.CloudSync2 aria-hidden="true" className="size-4" />
          {t("onboarding:connect.optional")}
        </div>
        <h2 className="mb-4 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {t("onboarding:connect.title")}
        </h2>
        <p className="text-muted-foreground text-pretty text-base leading-relaxed">
          {t("onboarding:connect.subtitle")}
        </p>
        <ExternalLink
          href="https://wealthfolio.app/connect/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-brand focus-visible:ring-brand mt-6 inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium underline-offset-4 outline-none transition-colors hover:underline focus-visible:ring-2"
        >
          {t("onboarding:connect.learnMore")}
          <Icons.ArrowUpRight aria-hidden="true" className="size-4" />
        </ExternalLink>
      </div>

      {/* Features */}
      <ol className="divide-border border-border divide-y border-y">
        {features.map((feature, index) => {
          return (
            <li key={feature.title} className="flex items-start gap-4 py-5 sm:py-6">
              <span
                aria-hidden="true"
                className="text-muted-foreground/70 pt-0.5 font-mono text-xs tabular-nums"
              >
                0{index + 1}
              </span>
              <div>
                <h3 className="mb-1.5 text-base font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <feature.icon
                aria-hidden="true"
                className="text-muted-foreground ml-auto mt-1 size-5 shrink-0"
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
};
