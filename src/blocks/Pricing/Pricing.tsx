"use client";

import { cn } from "../../cn";
import { Section, SectionHeader } from "../../components/Section";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Spinner } from "../../components/Spinner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";
import { useTranslate } from "../../host";
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import {
  pricingBesideClasses,
  pricingBesideIconClasses,
  pricingBesideItemClasses,
  pricingBesideLineClasses,
  pricingBesideListClasses,
  pricingBesideNameClasses,
  pricingBesideTextClasses,
  pricingClasses,
  pricingFeatureClasses,
  pricingFeatureIconClasses,
  pricingFeatureLabelClasses,
  pricingFeaturesClasses,
  pricingPlanCardClasses,
  pricingPlanClasses,
  pricingPlanContentClasses,
  pricingPlanDescriptionClasses,
  pricingPlanFooterClasses,
  pricingPlanHeaderClasses,
  pricingPlanTitleClasses,
  pricingPriceAmountClasses,
  pricingPriceClasses,
  pricingPriceUnitClasses,
  pricingTabsClasses,
  pricingTabsListClasses,
} from "./Pricing.classes";
import type {
  PricingFeature,
  PricingHeadingLevel,
  PricingPeriod,
  PricingPlan,
  PricingPlansProps,
  PricingProps,
} from "./Pricing.types";
import { pickCount } from "../../helpers/pickCount";

const lineOf = (feature: string | PricingFeature): PricingFeature =>
  typeof feature === "string" ? { label: feature } : feature;

const countOf = (plans: PricingPlan[]) =>
  plans.length > 4 ? "more" : pickCount([1, 2, 3, 4] as const, plans.length);

const Price = ({
  price,
  period,
}: {
  price: PricingPlan["price"];
  period: PricingPeriod;
}) => {
  const t = useTranslate();
  if (typeof price === "string")
    return (
      <p data-part="pricing-price">
        <span
          data-part="pricing-price-amount"
          className={pricingPriceAmountClasses}
        >
          {price}
        </span>
      </p>
    );
  const yearly = period === "yearly" ? price.yearly : undefined;
  return (
    <p data-part="pricing-price" className={pricingPriceClasses}>
      <span
        data-part="pricing-price-amount"
        className={pricingPriceAmountClasses}
      >
        {yearly || price.monthly}
      </span>
      <span data-part="pricing-price-unit" className={pricingPriceUnitClasses}>
        /{yearly ? t("year") : t("month")}
      </span>
    </p>
  );
};

const Plan = ({
  plan,
  period,
  level,
}: {
  plan: PricingPlan;
  period: PricingPeriod;
  level: PricingHeadingLevel;
}) => {
  const t = useTranslate();
  const Heading = level === 2 ? "h2" : "h3";
  const lines = plan.features?.map(lineOf) ?? [];
  const highlighted = Boolean(plan.highlighted);
  const action = plan.action;
  const content = action && (
    <>
      {action.loading ? <Spinner /> : action.icon}
      {action.label}
    </>
  );
  return (
    <li data-part="pricing-plan" className={pricingPlanClasses}>
      <Card className={pricingPlanCardClasses({ highlighted })}>
        <CardHeader className={pricingPlanHeaderClasses}>
          <CardTitle className={pricingPlanTitleClasses}>
            <Heading>{plan.name}</Heading>
          </CardTitle>
          {plan.badge && (
            <CardAction>
              <Badge tone={highlighted ? "accent" : "info"}>{plan.badge}</Badge>
            </CardAction>
          )}
          {plan.description && (
            <CardDescription className={pricingPlanDescriptionClasses}>
              {plan.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className={pricingPlanContentClasses}>
          <Price price={plan.price} period={period} />
          {lines.length > 0 && (
            <ul
              role="list"
              data-part="pricing-features"
              className={pricingFeaturesClasses}
            >
              {lines.map(({ label, included = true }, i) => (
                <li
                  key={`${label}-${i}`}
                  data-part="pricing-feature"
                  className={pricingFeatureClasses({ included })}
                >
                  {included ? (
                    <Icon
                      icon={Tick02Icon}
                      aria-hidden
                      className={pricingFeatureIconClasses({ included })}
                    />
                  ) : (
                    <Icon
                      icon={Cancel01Icon}
                      aria-hidden
                      className={pricingFeatureIconClasses({ included })}
                    />
                  )}
                  <span
                    data-part="pricing-feature-label"
                    className={pricingFeatureLabelClasses({ included })}
                  >
                    {label}
                  </span>
                  {!included && (
                    <span className="sr-only">({t("not included")})</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        {action && (
          <CardFooter className={pricingPlanFooterClasses}>
            {action.link && !action.disabled && !action.loading ? (
              <Button
                appearance={
                  action.appearance ?? (highlighted ? "solid" : "outline")
                }
                tone={action.tone}
                block
                size="lg"
                href={action.link}
                onClick={action.onClick}
              >
                {content}
              </Button>
            ) : (
              <Button
                appearance={
                  action.appearance ?? (highlighted ? "solid" : "outline")
                }
                tone={action.tone}
                aria-busy={action.loading || undefined}
                block
                disabled={action.disabled || action.loading}
                onClick={action.onClick}
                size="lg"
              >
                {content}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </li>
  );
};

export const PricingPlans = ({
  plans,
  period,
  defaultPeriod = "monthly",
  onPeriodChange,
  align = "center",
  headingLevel = 3,
  className,
}: PricingPlansProps) => {
  const t = useTranslate();
  if (!plans.length) return null;
  const switchable = plans.some(
    (plan) => typeof plan.price !== "string" && plan.price.yearly,
  );
  const grid = (shown: PricingPeriod) => (
    <ul
      role="list"
      data-part="pricing-plans"
      className={pricingClasses({ count: countOf(plans), align })}
    >
      {plans.map((plan, i) => (
        <Plan
          key={`${plan.name}-${i}`}
          plan={plan}
          period={shown}
          level={headingLevel}
        />
      ))}
    </ul>
  );
  if (!switchable) return <div className={className}>{grid("monthly")}</div>;
  return (
    <Tabs
      className={cn(pricingTabsClasses, className)}
      defaultValue={defaultPeriod}
      onValueChange={(next) => {
        if (next === "monthly" || next === "yearly") onPeriodChange?.(next);
      }}
      value={period}
    >
      <TabsList className={pricingTabsListClasses({ align })}>
        <TabsTrigger value="monthly">{t("Monthly")}</TabsTrigger>
        <TabsTrigger value="yearly">{t("Yearly")}</TabsTrigger>
      </TabsList>
      <TabsContent value="monthly">{grid("monthly")}</TabsContent>
      <TabsContent value="yearly">{grid("yearly")}</TabsContent>
    </Tabs>
  );
};

export const Pricing = ({
  plans,
  layout = "cards",
  period,
  defaultPeriod,
  onPeriodChange,
  id,
  eyebrow,
  title,
  description,
  align = "center",
  muted = false,
  className,
}: PricingProps) => {
  if (!plans?.length) return null;
  if (layout === "split") {
    const featured = plans.find((plan) => plan.highlighted) ?? plans[0];
    return (
      <Section
        id={id}
        data-part="pricing"
        data-layout={layout}
        muted={muted}
        className={className}
      >
        <div data-part="pricing-beside" className={pricingBesideClasses}>
          <div className={pricingBesideTextClasses}>
            <SectionHeader
              description={description}
              eyebrow={eyebrow}
              title={title}
            />
            <ul
              role="list"
              data-part="pricing-names"
              className={pricingBesideListClasses}
            >
              {plans.map((plan, i) => (
                <li
                  key={`${plan.name}-${i}`}
                  className={pricingBesideItemClasses}
                >
                  <span aria-hidden className={pricingBesideIconClasses}>
                    <Icon icon={Tick02Icon} />
                  </span>
                  <div>
                    <p className={pricingBesideNameClasses}>{plan.name}</p>
                    {plan.description ? (
                      <p className={pricingBesideLineClasses}>
                        {plan.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {featured ? (
            <PricingPlans
              align="start"
              defaultPeriod={defaultPeriod}
              headingLevel={title ? 3 : 2}
              onPeriodChange={onPeriodChange}
              period={period}
              plans={[featured]}
            />
          ) : null}
        </div>
      </Section>
    );
  }
  return (
    <Section
      id={id}
      data-part="pricing"
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      muted={muted}
      className={className}
    >
      <PricingPlans
        align={align}
        defaultPeriod={defaultPeriod}
        onPeriodChange={onPeriodChange}
        period={period}
        plans={plans}
        headingLevel={title ? 3 : 2}
      />
    </Section>
  );
};
