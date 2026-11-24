"use client";

import { Section } from "../../components/Section";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table";
import { useTranslate } from "../../host";
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import {
  compareCardClasses,
  compareCardGroupClasses,
  compareCardGroupTitleClasses,
  compareCardHeaderClasses,
  compareCardNameClasses,
  compareCardRowClasses,
  compareCardRowsClasses,
  compareCardValueClasses,
  compareCardsClasses,
  comparePriceClasses,
  compareCellClasses,
  compareFeatureClasses,
  compareFeatureDetailClasses,
  compareFeaturesColumnClasses,
  compareFrameClasses,
  compareGroupClasses,
  compareHeadClasses,
  compareHeadContentClasses,
  compareMarkClasses,
  compareNameClasses,
  compareTableClasses,
  compareTextClasses,
} from "./Compare.classes";
import type {
  CompareColumn,
  CompareProps,
  CompareRow,
  CompareTableProps,
  CompareValue,
} from "./Compare.types";
import { cssVariables } from "../../helpers/cssVariables";

const Value = ({ value }: { value?: CompareValue }) => {
  const t = useTranslate();
  if (value === undefined || value === "") return null;
  if (typeof value === "string")
    return (
      <span data-part="compare-value" className={compareTextClasses}>
        {value}
      </span>
    );
  return (
    <span
      data-part="compare-value"
      data-included={value}
      className={compareMarkClasses({ included: value })}
    >
      {value ? <Icon icon={Tick02Icon} /> : <Icon icon={Cancel01Icon} />}
      <span className="sr-only">
        {value ? t("included") : t("not included")}
      </span>
    </span>
  );
};

const Cta = ({ column }: { column: CompareColumn }) => {
  const { cta } = column;
  if (!cta) return null;
  return (
    <Button
      appearance={cta.appearance ?? (column.highlighted ? "solid" : "outline")}
      block
      size="sm"
      href={cta.link}
    >
      {cta.icon}
      {cta.label}
    </Button>
  );
};

const Mark = ({ column }: { column: CompareColumn }) =>
  column.badge ? (
    <Badge tone={column.highlighted ? "accent" : "info"}>{column.badge}</Badge>
  ) : null;

export const CompareTable = ({
  columns,
  rows,
  groups,
  layout = "cards",
  featuresLabel,
  caption,
  className,
}: CompareTableProps) => {
  const sections: { title?: string; rows: CompareRow[] }[] = [
    ...(rows?.length ? [{ rows }] : []),
    ...(groups ?? []).filter((group) => group.rows.length),
  ];
  if (!columns?.length || !sections.length) return null;

  const table = (
    <Table
      data-part="compare-table"
      borderRadius="lg"
      className={compareTableClasses({ layout })}
      style={cssVariables({
        "--compare-width": `${9 + columns.length * 6}rem`,
      })}
    >
      {caption && <TableCaption className="sr-only">{caption}</TableCaption>}
      <colgroup>
        <col className={compareFeaturesColumnClasses} />
        {columns.map((column, c) => (
          <col key={`${column.name}-${c}`} />
        ))}
      </colgroup>
      <TableHeader>
        <TableRow>
          {featuresLabel ? (
            <TableHead scope="col">{featuresLabel}</TableHead>
          ) : (
            <TableCell />
          )}
          {columns.map((column, c) => (
            <TableHead
              key={`${column.name}-${c}`}
              abbr={column.name}
              scope="col"
              data-part="compare-column"
              data-highlighted={column.highlighted || undefined}
              className={compareHeadClasses}
            >
              <div className={compareHeadContentClasses}>
                <span className={compareNameClasses}>
                  {column.name}
                  <Mark column={column} />
                </span>
                {column.price && (
                  <span
                    data-part="compare-price"
                    className={comparePriceClasses}
                  >
                    {column.price}
                  </span>
                )}
                <Cta column={column} />
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {sections.map((section, s) => (
        <TableBody key={`${section.title ?? "rows"}-${s}`}>
          {section.title && (
            <TableRow>
              <TableHead
                colSpan={columns.length + 1}
                scope="colgroup"
                data-part="compare-group"
                className={compareGroupClasses}
              >
                {section.title}
              </TableHead>
            </TableRow>
          )}
          {section.rows.map((row, r) => (
            <TableRow key={`${row.feature}-${r}`}>
              <TableHead scope="row" className={compareFeatureClasses}>
                {row.feature}
                {row.detail && (
                  <span className={compareFeatureDetailClasses}>
                    {row.detail}
                  </span>
                )}
              </TableHead>
              {columns.map((column, c) => (
                <TableCell
                  key={`${column.name}-${c}`}
                  data-highlighted={column.highlighted || undefined}
                  className={compareCellClasses}
                >
                  <Value value={row.values[c]} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ))}
    </Table>
  );
  return (
    <div className={className}>
      {layout !== "options" && (
        <div
          data-part="compare-frame"
          className={compareFrameClasses({ layout })}
        >
          {table}
        </div>
      )}
      {layout !== "scroll" && (
        <ul
          role="list"
          data-part="compare-cards"
          className={compareCardsClasses({ layout })}
        >
          {columns.map((column, c) => (
            <li key={`${column.name}-${c}`}>
              <Card
                data-highlighted={column.highlighted || undefined}
                className={compareCardClasses({
                  highlighted: Boolean(column.highlighted),
                })}
              >
                <div className={compareCardHeaderClasses}>
                  <h3 className={compareCardNameClasses}>{column.name}</h3>
                  <Mark column={column} />
                </div>
                {column.price && (
                  <p data-part="compare-price" className={comparePriceClasses}>
                    {column.price}
                  </p>
                )}
                <Cta column={column} />
                {sections.map((section, s) => (
                  <div
                    key={`${section.title ?? "rows"}-${s}`}
                    className={compareCardGroupClasses}
                  >
                    {section.title && (
                      <p className={compareCardGroupTitleClasses}>
                        {section.title}
                      </p>
                    )}
                    <ul role="list" className={compareCardRowsClasses}>
                      {section.rows.map((row, r) => (
                        <li
                          key={`${row.feature}-${r}`}
                          className={compareCardRowClasses}
                        >
                          <span>
                            {row.feature}
                            {row.detail && (
                              <span className={compareFeatureDetailClasses}>
                                {row.detail}
                              </span>
                            )}
                          </span>
                          <span className={compareCardValueClasses}>
                            <Value value={row.values[c]} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Compare = ({
  columns,
  rows,
  groups,
  layout = "cards",
  featuresLabel,
  caption,
  id,
  eyebrow,
  title,
  description,
  align = "start",
  width = "base",
  muted = false,
  className,
}: CompareProps) => {
  if (
    !columns?.length ||
    !(rows?.length || groups?.some((group) => group.rows.length))
  )
    return null;
  return (
    <Section
      id={id}
      data-part="compare"
      data-layout={layout}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      width={width}
      muted={muted}
      className={className}
    >
      <CompareTable
        columns={columns}
        rows={rows}
        groups={groups}
        layout={layout}
        featuresLabel={featuresLabel}
        caption={caption ?? (typeof title === "string" ? title : undefined)}
      />
    </Section>
  );
};
