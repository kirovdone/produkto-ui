"use client";

import {
  type BlockAction,
  BlockActions,
  type BlockMenuAction,
} from "../../components/Section";
import { Button } from "../../components/Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/NavigationMenu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/Drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/Tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/Collapsible";
import { Link as MenuLink } from "@radix-ui/react-navigation-menu";
import { cn } from "../../cn";
import { ScrollArea } from "../../components/ScrollArea";
import { ThemeScopeProvider } from "../../context/themeScope";
import { HostLink, useTranslate } from "../../host";
import {
  ArrowRight01Icon,
  ArrowRight02Icon,
  Cancel01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "../../components/Icon";
import { Label } from "../../components/Label";
import { useEffect, useRef, useState } from "react";
import {
  navbarActionsClasses,
  navbarBarClasses,
  navbarBrandClasses,
  navbarClasses,
  navbarCentreClasses,
  navbarEndClasses,
  navbarSentinelClasses,
  navbarSplitAfterClasses,
  navbarSplitListClasses,
  navbarGroupClasses,
  navbarGroupedPanelClasses,
  navbarGroupLabelClasses,
  navbarGroupsClasses,
  navbarLinkDescriptionClasses,
  navbarLinkIconClasses,
  navbarLinkLabelClasses,
  navbarLinkWordsClasses,
  navbarLinkTextClasses,
  navbarListClasses,
  navbarMenuClasses,
  navbarPanelClasses,
  navbarPanelFooterClasses,
  navbarPanelInnerClasses,
  navbarStackClasses,
  navbarStackedPanelClasses,
  navbarPanelLinkClasses,
  navbarPanelScrollClasses,
  navbarDrawerActionsClasses,
  navbarDrawerBodyClasses,
  navbarDrawerClasses,
  navbarDrawerFoldBodyClasses,
  navbarDrawerFoldClasses,
  navbarDrawerFoldIconClasses,
  navbarDrawerGroupClasses,
  navbarDrawerHeaderClasses,
  navbarDrawerLabelClasses,
  navbarDrawerLinkClasses,
  navbarDrawerLinksClasses,
  navbarDrawerNavClasses,
  navbarDrawerTitleClasses,
  navbarDrawerTriggerClasses,
  navbarSocialClasses,
  navbarStartClasses,
} from "./Navbar.classes";
import type {
  NavbarGroupCount,
  NavbarGroupedMenu,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
  NavbarProps,
  NavbarRows,
} from "./Navbar.types";
import { pickCount } from "../../helpers/pickCount";

const WIDE = "(min-width: 48rem)";

const withAppearances = (
  actions: (BlockAction | BlockMenuAction)[],
): (BlockAction | BlockMenuAction)[] =>
  actions.map((action, i) => ({
    ...action,
    appearance:
      action.appearance ?? (i === actions.length - 1 ? "solid" : "outline"),
  }));

const sectionsOf = (
  items: NavbarItem[],
): (NavbarMenu | NavbarGroupedMenu | NavbarLink[])[] =>
  items.map((item) => ("links" in item || "groups" in item ? item : [item]));

const countOf = (menu: NavbarGroupedMenu) =>
  pickCount<NavbarGroupCount>([1, 2, 3, 4, 5], menu.groups.length);

const DrawerLink = ({
  link,
  onClick,
}: {
  link: NavbarLink;
  onClick: () => void;
}) => (
  <Button
    aria-current={link.active ? "page" : undefined}
    onClick={onClick}
    appearance={link.active ? "soft" : "transparent"}
    className={navbarDrawerLinkClasses}
    href={link.link}
  >
    {link.icon && (
      <span
        aria-hidden
        data-part="navbar-drawer-link-icon"
        className={navbarLinkIconClasses}
      >
        {link.icon}
      </span>
    )}
    <span
      data-part="navbar-drawer-link-label"
      className={navbarLinkLabelClasses}
    >
      {link.label}
    </span>
  </Button>
);

const DrawerLinks = ({
  links,
  onClick,
}: {
  links: NavbarLink[];
  onClick: () => void;
}) => (
  <ul data-part="navbar-drawer-links" className={navbarDrawerLinksClasses}>
    {links.map((link, at) => (
      <li key={at}>
        <DrawerLink link={link} onClick={onClick} />
      </li>
    ))}
  </ul>
);

const DrawerFold = ({
  menu,
  onClick,
}: {
  menu: NavbarMenu | NavbarGroupedMenu;
  onClick: () => void;
}) => (
  <Collapsible
    appearance="transparent"
    data-part="navbar-drawer-fold"
    className={navbarDrawerGroupClasses}
  >
    <CollapsibleTrigger asChild>
      <Button appearance="transparent" className={navbarDrawerFoldClasses}>
        {menu.label}
        <Icon
          icon={ArrowRight01Icon}
          data-part="navbar-drawer-fold-icon"
          className={navbarDrawerFoldIconClasses}
        />
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent className={navbarDrawerFoldBodyClasses}>
      {"groups" in menu ? (
        <>
          {menu.groups.map((group) => (
            <div
              key={group.label}
              data-part="navbar-drawer-group"
              className={navbarDrawerGroupClasses}
            >
              <Label asChild className={navbarDrawerLabelClasses}>
                <h3>{group.label}</h3>
              </Label>
              <DrawerLinks links={group.links} onClick={onClick} />
            </div>
          ))}
          {menu.footer && (
            <DrawerLinks links={[menu.footer]} onClick={onClick} />
          )}
        </>
      ) : (
        <DrawerLinks links={menu.links} onClick={onClick} />
      )}
    </CollapsibleContent>
  </Collapsible>
);

const PanelLinkName = ({ link }: { link: NavbarLink }) => (
  <>
    {link.icon && (
      <span
        aria-hidden
        data-part="navbar-link-icon"
        className={navbarLinkIconClasses}
      >
        {link.icon}
      </span>
    )}
    <span data-part="navbar-link-label" className={navbarLinkLabelClasses}>
      {link.label}
    </span>
  </>
);

const PanelLink = ({ link }: { link: NavbarLink }) => (
  <MenuLink active={link.active} asChild>
    <Button
      appearance="transparent"
      align="start"
      wrap={Boolean(link.description)}
      data-described={link.description ? "" : undefined}
      className={navbarPanelLinkClasses}
      href={link.link}
    >
      {link.description ? (
        <span data-part="navbar-link-text" className={navbarLinkTextClasses}>
          {link.icon && (
            <span
              aria-hidden
              data-part="navbar-link-icon"
              className={navbarLinkIconClasses}
            >
              {link.icon}
            </span>
          )}
          <span
            data-part="navbar-link-words"
            className={navbarLinkWordsClasses}
          >
            <span
              data-part="navbar-link-label"
              className={navbarLinkLabelClasses}
            >
              {link.label}
            </span>
            <span
              data-part="navbar-link-description"
              className={navbarLinkDescriptionClasses}
            >
              {link.description}
            </span>
          </span>
        </span>
      ) : (
        <PanelLinkName link={link} />
      )}
    </Button>
  </MenuLink>
);

const GroupedPanel = ({ menu }: { menu: NavbarGroupedMenu }) => (
  <>
    <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
    <NavigationMenuContent
      className={navbarGroupedPanelClasses({ count: countOf(menu) })}
    >
      <ScrollArea className={navbarPanelScrollClasses}>
        <div className={navbarGroupsClasses({ count: countOf(menu) })}>
          {menu.groups.map((group) => (
            <div
              key={group.label}
              data-part="navbar-group"
              className={navbarGroupClasses}
            >
              <Label asChild className={navbarGroupLabelClasses}>
                <p>{group.label}</p>
              </Label>
              {group.links.map((link, i) => (
                <PanelLink key={`${link.link}-${i}`} link={link} />
              ))}
            </div>
          ))}
        </div>
        {menu.footer && (
          <div
            data-part="navbar-panel-footer"
            className={navbarPanelFooterClasses}
          >
            <MenuLink active={menu.footer.active} asChild>
              <Button appearance="transparent" href={menu.footer.link}>
                {menu.footer.label}
                <Icon icon={ArrowRight02Icon} data-icon="inline-end" />
              </Button>
            </MenuLink>
          </div>
        )}
      </ScrollArea>
    </NavigationMenuContent>
  </>
);

const rowsOf = ({ links, rows }: NavbarMenu) =>
  rows &&
  pickCount<NavbarRows>(
    [2, 3, 4, 5, 6],
    Math.ceil(links.length / Math.ceil(links.length / rows)),
  );

const LinksPanel = ({ menu }: { menu: NavbarMenu }) => {
  const rows = rowsOf(menu);
  const links = menu.links.map((link, i) => (
    <PanelLink key={`${link.link}-${i}`} link={link} />
  ));
  return (
    <>
      <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
      <NavigationMenuContent
        className={
          rows
            ? navbarStackedPanelClasses
            : navbarPanelClasses({ columns: menu.columns })
        }
      >
        <ScrollArea className={navbarPanelScrollClasses}>
          <div
            data-rows={rows}
            className={
              rows
                ? navbarStackClasses({ rows })
                : navbarPanelInnerClasses({ columns: menu.columns })
            }
          >
            {links}
          </div>
        </ScrollArea>
      </NavigationMenuContent>
    </>
  );
};

const BarLink = ({ item }: { item: NavbarItem }) =>
  "groups" in item ? (
    <GroupedPanel menu={item} />
  ) : "links" in item ? (
    <LinksPanel menu={item} />
  ) : (
    <NavigationMenuLink active={item.active} asChild>
      <HostLink href={item.link}>{item.label}</HostLink>
    </NavigationMenuLink>
  );

export const Navbar = ({
  id,
  brand,
  brandLink = "#",
  items,
  actions,
  social,
  align = "start",
  layout = "row",
  width = "base",
  sticky = false,
  floating = false,
  over = false,
  muted = false,
  bordered = false,
  theme,
  className,
  children,
}: NavbarProps) => {
  const t = useTranslate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const top = useRef<HTMLSpanElement>(null);

  const watched = over || sticky;

  useEffect(() => {
    const mark = top.current;
    if (!watched || !mark) return;
    const watch = new IntersectionObserver(([entry]) =>
      setScrolled(entry ? !entry.isIntersecting : false),
    );
    watch.observe(mark);
    return () => watch.disconnect();
  }, [watched]);

  useEffect(() => {
    if (!open) return;
    const wide = window.matchMedia(WIDE);
    const shut = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", shut);
    return () => wide.removeEventListener("change", shut);
  }, [open]);

  const links = items?.length ? items : undefined;
  const calls = actions?.length ? withAppearances(actions) : undefined;
  const icons = social?.length ? social : undefined;
  if (!brand && !links && !calls && !icons && !children) return null;
  const close = () => setOpen(false);
  const home = (onClick?: () => void) => (
    <HostLink
      data-part="navbar-brand"
      className={navbarBrandClasses}
      href={brandLink}
      onClick={onClick}
    >
      {brand}
    </HostLink>
  );

  const split = layout === "split";
  const arrangement = split ? "split" : align;
  const half = links ? Math.ceil(links.length / 2) : 0;

  return (
    <ThemeScopeProvider value={theme}>
      {watched ? (
        <span
          ref={top}
          aria-hidden
          data-part="navbar-top"
          className={navbarSentinelClasses}
        />
      ) : null}
      <header
        id={id}
        data-part="navbar"
        data-theme={theme}
        data-scrolled={watched && scrolled ? "" : undefined}
        className={cn(
          navbarClasses({ muted, sticky, bordered, floating, over }),
          className,
        )}
      >
        <div
          data-part="navbar-bar"
          data-width={width}
          className={navbarBarClasses({ width, floating })}
        >
          {split ? (
            brand ? (
              <div data-part="navbar-centre" className={navbarCentreClasses}>
                {home()}
              </div>
            ) : null
          ) : brand || align === "center" ? (
            <div
              data-part="navbar-start"
              className={navbarStartClasses({ align: arrangement })}
            >
              {brand ? home() : null}
            </div>
          ) : null}
          {links && (
            <NavigationMenu
              className={navbarMenuClasses({ align: arrangement })}
            >
              <NavigationMenuList
                className={cn(
                  navbarListClasses,
                  split && navbarSplitListClasses,
                )}
              >
                {links.map((item, i) => (
                  <NavigationMenuItem
                    key={`${item.label}-${i}`}
                    className={
                      split && i === half && i > 0
                        ? navbarSplitAfterClasses
                        : undefined
                    }
                  >
                    <BarLink item={item} />
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}
          <div
            data-part="navbar-end"
            className={navbarEndClasses({ align: arrangement })}
          >
            {children}
            {icons && (
              <ul data-part="navbar-social" className={navbarSocialClasses}>
                {icons.map((item) => (
                  <li key={`${item.label}-${item.link}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          aria-label={item.label}
                          muted
                          size="sm"
                          appearance="transparent"
                          href={item.link}
                        >
                          {item.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{item.label}</TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            )}
            {calls && (
              <BlockActions
                actions={calls}
                className={navbarActionsClasses({ folds: Boolean(links) })}
                size="sm"
              />
            )}
            {links && (
              <Drawer onOpenChange={setOpen} open={open}>
                <DrawerTrigger asChild>
                  <Button
                    aria-label={t("Open menu")}
                    className={navbarDrawerTriggerClasses}
                    size="sm"
                    appearance="transparent"
                  >
                    <Icon icon={Menu01Icon} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent
                  aria-describedby={undefined}
                  className={navbarDrawerClasses}
                  showCloseButton={false}
                  scrollable={false}
                >
                  <DrawerHeader className={navbarDrawerHeaderClasses}>
                    <DrawerTitle className={navbarDrawerTitleClasses}>
                      {brand ? home(close) : t("Menu")}
                    </DrawerTitle>
                    <DrawerClose asChild>
                      <Button
                        appearance="transparent"
                        size="sm"
                        aria-label={t("Close")}
                      >
                        <Icon icon={Cancel01Icon} />
                      </Button>
                    </DrawerClose>
                  </DrawerHeader>
                  <ScrollArea className={navbarDrawerBodyClasses}>
                    {links && (
                      <nav
                        data-part="navbar-drawer-nav"
                        className={navbarDrawerNavClasses}
                      >
                        {sectionsOf(links).map((section, index) =>
                          Array.isArray(section) ? (
                            <DrawerLinks
                              key={index}
                              links={section}
                              onClick={close}
                            />
                          ) : (
                            <DrawerFold
                              key={index}
                              menu={section}
                              onClick={close}
                            />
                          ),
                        )}
                      </nav>
                    )}
                  </ScrollArea>
                  {calls && (
                    <BlockActions
                      actions={calls}
                      className={navbarDrawerActionsClasses}
                      size="sm"
                    />
                  )}
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>
      </header>
    </ThemeScopeProvider>
  );
};
