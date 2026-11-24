import { HostLink } from "../../host";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { cn } from "../../cn";
import { ThemeScopeProvider } from "../../context/themeScope";
import {
  blockActionClasses,
  blockActionsClasses,
  blockAvatarClasses,
  sectionActionsSpacingClasses,
  sectionClasses,
  sectionContentClasses,
  sectionDescriptionClasses,
  sectionEyebrowClasses,
  sectionHeaderActionsSpacingClasses,
  sectionHeaderClasses,
  sectionHeaderPartClasses,
  sectionHeaderSpacingClasses,
  sectionRulerClasses,
  sectionTaglineClasses,
  sectionTitleClasses,
} from "./Section.classes";
import type {
  BlockActionsProps,
  BlockAvatarProps,
  SectionHeaderProps,
  SectionProps,
} from "./Section.types";

export const SectionHeader = ({
  eyebrow,
  title,
  tagline,
  description,
  actions,
  align = "start",
  layout = "stacked",
  className,
  ...props
}: SectionHeaderProps) => {
  if (!eyebrow && !title && !description && !actions?.length) return null;
  const top = (
    <>
      {eyebrow && (
        <span data-part="section-eyebrow" className={sectionEyebrowClasses}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 data-part="section-title" className={sectionTitleClasses}>
          {title}
          {tagline ? (
            <>
              {" "}
              <span
                data-part="section-tagline"
                className={sectionTaglineClasses}
              >
                {tagline}
              </span>
            </>
          ) : null}
        </h2>
      )}
    </>
  );
  const side =
    description || actions?.length ? (
      <>
        {description && (
          <p
            data-part="section-description"
            className={sectionDescriptionClasses}
          >
            {description}
          </p>
        )}
        <BlockActions
          actions={actions}
          align={layout === "split" ? "start" : align}
          size="base"
        />
      </>
    ) : null;
  return (
    <header
      data-part="section-header"
      className={cn(sectionHeaderClasses({ align, layout }), className)}
      {...props}
    >
      {layout === "split" ? (
        <>
          <div
            data-part="section-header-main"
            className={sectionHeaderPartClasses}
          >
            {top}
          </div>
          {side && (
            <div
              data-part="section-header-side"
              className={sectionHeaderPartClasses}
            >
              {side}
            </div>
          )}
        </>
      ) : (
        <>
          {top}
          {side}
        </>
      )}
    </header>
  );
};

export const Section = ({
  eyebrow,
  title,
  tagline,
  description,
  align = "start",
  headerLayout = "stacked",
  width = "base",
  muted = false,
  ruled = false,
  theme,
  actions,
  className,
  children,
  ...props
}: SectionProps) => {
  if (!eyebrow && !title && !description && !children) return null;
  const inside = (
    <>
      <SectionHeader
        actions={headerLayout === "split" ? actions : undefined}
        align={align}
        layout={headerLayout}
        className={children ? sectionHeaderSpacingClasses : undefined}
        description={description}
        eyebrow={eyebrow}
        title={title}
        tagline={tagline}
      />
      {children}
      {headerLayout === "split" ? null : (
        <BlockActions
          actions={actions}
          align={align}
          className={
            children
              ? sectionActionsSpacingClasses
              : eyebrow || title || description
                ? sectionHeaderActionsSpacingClasses
                : undefined
          }
        />
      )}
    </>
  );
  const band = (
    <section
      data-part="section"
      data-theme={theme}
      data-ruled={ruled ? "" : undefined}
      className={cn(sectionClasses({ muted, ruled }), className)}
      {...props}
    >
      <div
        data-part="section-content"
        data-width={width}
        className={sectionContentClasses({ width })}
      >
        {ruled ? (
          <div data-part="section-ruler" className={sectionRulerClasses}>
            {inside}
          </div>
        ) : (
          inside
        )}
      </div>
    </section>
  );
  return theme ? (
    <ThemeScopeProvider value={theme}>{band}</ThemeScopeProvider>
  ) : (
    band
  );
};

export const BlockActions = ({
  actions,
  align = "start",
  size = "lg",
  className,
}: BlockActionsProps) => {
  if (!actions?.length) return null;
  return (
    <div
      data-part="block-actions"
      className={cn(blockActionsClasses({ align }), className)}
    >
      {actions.map((action, i) => {
        const content = action.iconOnly ? (
          action.icon
        ) : (
          <>
            {action.icon}
            {action.label}
          </>
        );
        const appearance = action.appearance ?? (i === 0 ? "solid" : "outline");
        const shape = {
          "aria-label": action.iconOnly ? action.label : undefined,
          className: blockActionClasses({ borderRadius: action.borderRadius }),
        };
        if ("items" in action)
          return (
            <DropdownMenu key={`${action.label}-${i}`}>
              <DropdownMenuTrigger asChild>
                <Button
                  {...shape}
                  size={size}
                  appearance={appearance}
                  tone={action.tone}
                >
                  {content}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {action.items.map((item, at) =>
                  item.link ? (
                    <DropdownMenuItem key={`${item.label}-${at}`} asChild>
                      <HostLink href={item.link}>
                        {item.icon}
                        {item.label}
                      </HostLink>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      key={`${item.label}-${at}`}
                      onSelect={item.onSelect}
                    >
                      {item.icon}
                      {item.label}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        return (
          <Button
            key={`${action.link}-${i}`}
            {...shape}
            href={action.link}
            size={size}
            appearance={appearance}
            tone={action.tone}
          >
            {content}
          </Button>
        );
      })}
    </div>
  );
};

const initialsOf = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const BlockAvatar = ({
  name,
  src,
  size = "base",
  className,
}: BlockAvatarProps) => (
  <Avatar aria-hidden className={cn(blockAvatarClasses({ size }), className)}>
    {src && <AvatarImage alt="" src={src} />}
    <AvatarFallback>{initialsOf(name)}</AvatarFallback>
  </Avatar>
);
