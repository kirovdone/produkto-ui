# Produkto UI

A React and Tailwind CSS design system: 54 components that share one vocabulary, one
stylesheet and one set of theme tokens.

**Documentation and live previews: [ui.produkto.io](https://ui.produkto.io)**

## Install

```sh
npm install @produkto/ui
```

Produkto UI brings the libraries it uses with it, so your project needs only React 19 and
Tailwind CSS 4. It runs in any React framework: Next.js, Vite, Remix, React Router, Astro
and the rest.

Add the stylesheet after Tailwind and let Tailwind scan the package:

```css
@import "tailwindcss";
@import "@produkto/ui/styles.css";
@source "../node_modules/@produkto/ui/dist";
```

## Use

```tsx
import { Button } from "@produkto/ui/Button";
import { Input } from "@produkto/ui/Input";
import { Label } from "@produkto/ui/Label";

export const SignUp = () => (
  <form>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
    <Button type="submit">Sign up</Button>
  </form>
);
```

Every part takes the same props for the same things:

- `appearance`: `solid`, `soft`, `outline` or `transparent`
- `tone`: `neutral`, `accent`, `destructive`, `success`, `warning` or `info`
- `size`: `xs`, `sm`, `base`, `lg` or `xl`, where the part has them
- `borderRadius`: the corners

## What's inside

Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Carousel, Chart,
Checkbox, Collapsible, ColorPicker, Combobox, ContextMenu, DatePicker, Dialog, Drawer,
DropdownMenu, Dropzone, Form, Icon, Image, Input, Label, Link, Marquee, NavigationMenu,
NotFound, Pagination, Popover, Progress, RadioGroup, Rating, Resizable, Reveal, ScrollArea,
Section, Select, Separator, Sidebar, Skeleton, Spinner, SvgImage, Switch, Table, Tabs, Text,
Textarea, Toast, Toggle, ToggleGroup, Toolbar, Tooltip and Video.

## Settings

Wrap your app once in `UiHostProvider` to pass in what your app decides, all of it optional:
`Link` (your router's link, used for every link the kit draws; plain anchors without it),
`theme` (`light` or `dark`), `translate` (the kit's words in your language), `notify` (short
messages) and a files picker for `Dropzone`.

```tsx
import { UiHostProvider } from "@produkto/ui/host";
import NextLink from "next/link";

<UiHostProvider host={{ Link: NextLink }}>{children}</UiHostProvider>;
```

## Theming

Colours are CSS variables for light and dark: `--background`, `--foreground`, `--card`,
`--popover`, `--primary`, `--primary-foreground`, `--destructive`, `--success`, `--warning`,
`--info` and `--tint`, the colour the greys are mixed from. Text follows seven roles
(heading, display, body, label, description, caption and code) set by `--heading-font`,
`--body-font`, `--code-font`, `--font-display` and `--type-scale`. Redefine any of them to
make the kit yours.

## Versions

Until 1.0 a minor version may include breaking changes. Early releases use the `alpha` tag.

## Licence

MIT. See [LICENSE](LICENSE).
