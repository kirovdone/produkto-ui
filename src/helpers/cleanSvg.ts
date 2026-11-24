import {
  readXml,
  XLINK_NAMESPACE,
  XML_NAMESPACE,
  type XmlAttribute,
  type XmlElement,
} from "./readXml";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const byLowerCase = (names: readonly string[]): ReadonlyMap<string, string> =>
  new Map(names.map((name) => [name.toLowerCase(), name]));

const ELEMENTS = byLowerCase([
  "svg",
  "g",
  "defs",
  "symbol",
  "use",
  "switch",
  "title",
  "desc",
  "a",
  "style",
  "path",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "text",
  "tspan",
  "textPath",
  "image",
  "linearGradient",
  "radialGradient",
  "stop",
  "pattern",
  "clipPath",
  "mask",
  "marker",
  "filter",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "animate",
  "animateMotion",
  "animateTransform",
  "set",
  "mpath",
]);

const PRESENTATION = [
  "alignment-baseline",
  "baseline-shift",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-rendering",
  "direction",
  "display",
  "dominant-baseline",
  "enable-background",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flood-color",
  "flood-opacity",
  "font",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-variant-caps",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variation-settings",
  "font-weight",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "image-rendering",
  "isolation",
  "kerning",
  "letter-spacing",
  "lighting-color",
  "line-height",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "mask",
  "mask-type",
  "mix-blend-mode",
  "opacity",
  "overflow",
  "paint-order",
  "shape-rendering",
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "text-align",
  "text-anchor",
  "text-decoration",
  "text-rendering",
  "text-transform",
  "transform-origin",
  "unicode-bidi",
  "vector-effect",
  "visibility",
  "white-space",
  "word-spacing",
  "writing-mode",
];

const ATTRIBUTES = byLowerCase([
  ...PRESENTATION,
  "id",
  "class",
  "style",
  "transform",
  "lang",
  "role",
  "aria-hidden",
  "aria-label",
  "systemLanguage",
  "width",
  "height",
  "x",
  "y",
  "x1",
  "y1",
  "x2",
  "y2",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "fx",
  "fy",
  "fr",
  "d",
  "points",
  "pathLength",
  "viewBox",
  "preserveAspectRatio",
  "version",
  "baseProfile",
  "gradientUnits",
  "gradientTransform",
  "spreadMethod",
  "offset",
  "patternUnits",
  "patternContentUnits",
  "patternTransform",
  "clipPathUnits",
  "maskUnits",
  "maskContentUnits",
  "markerWidth",
  "markerHeight",
  "markerUnits",
  "refX",
  "refY",
  "orient",
  "dx",
  "dy",
  "rotate",
  "textLength",
  "lengthAdjust",
  "startOffset",
  "method",
  "spacing",
  "side",
  "filterUnits",
  "primitiveUnits",
  "in",
  "in2",
  "result",
  "stdDeviation",
  "mode",
  "operator",
  "k1",
  "k2",
  "k3",
  "k4",
  "type",
  "values",
  "tableValues",
  "slope",
  "intercept",
  "amplitude",
  "exponent",
  "baseFrequency",
  "numOctaves",
  "seed",
  "stitchTiles",
  "scale",
  "xChannelSelector",
  "yChannelSelector",
  "borderRadius",
  "order",
  "kernelMatrix",
  "divisor",
  "bias",
  "targetX",
  "targetY",
  "edgeMode",
  "kernelUnitLength",
  "preserveAlpha",
  "surfaceScale",
  "diffuseConstant",
  "specularConstant",
  "specularExponent",
  "azimuth",
  "elevation",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "limitingConeAngle",
  "attributeName",
  "attributeType",
  "begin",
  "dur",
  "end",
  "min",
  "max",
  "restart",
  "repeatCount",
  "repeatDur",
  "calcMode",
  "keyTimes",
  "keySplines",
  "keyPoints",
  "from",
  "to",
  "by",
  "additive",
  "accumulate",
  "path",
]);

const STYLE_PROPERTIES: ReadonlySet<string> = new Set([
  ...PRESENTATION,
  "transform",
  "transform-box",
]);

const ANIMATABLE: ReadonlySet<string> = new Set([
  ...STYLE_PROPERTIES,
  ...[...ATTRIBUTES.keys()].filter(
    (name) => name !== "style" && name !== "class" && name !== "id",
  ),
]);

const QUOTED: ReadonlySet<string> = new Set(["font", "font-family"]);
const PROSE: ReadonlySet<string> = new Set(["aria-label"]);
const TEXT_HOLDERS: ReadonlySet<string> = new Set([
  "text",
  "tspan",
  "textPath",
  "title",
  "desc",
]);
const TEXT_ONLY: ReadonlySet<string> = new Set(["title", "desc"]);
const RETARGETING: ReadonlySet<string> = new Set([
  "animate",
  "animateTransform",
  "set",
]);
const LINKED_BY_FRAGMENT: ReadonlySet<string> = new Set([
  "use",
  "textPath",
  "mpath",
  "linearGradient",
  "radialGradient",
  "pattern",
  "filter",
]);
const LINKED_TO_IMAGE: ReadonlySet<string> = new Set(["image", "feImage"]);
const XML_ATTRIBUTES: ReadonlySet<string> = new Set(["space", "lang"]);

const FRAGMENT = /^#[^\s"'<>()\\]+$/;
const RASTER_DATA =
  /^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i;
const LOCAL_URLS = /url\(\s*(["']?)#[^\s"'()\\]+\1\s*\)/gi;
const ANY_URL = /url\(/i;
const SCRIPT_URL = /(?:java|vb)script:/i;
const QUOTES = /["']/;
const UNSAFE_DECLARATIONS = /[\\<>{}@]/;
const UNSAFE_SHEET = /\\/;
const COMPOUND = /^(?:\*|[a-z][\w-]*)?(?:[.#][a-z_-][\w-]*)*$/i;
const CLASS_IN_SELECTOR = /\.([a-z_-][\w-]*)/gi;
const EARLIER_SCOPE = /^svg\.icon-[0-9a-f]{10}$/;

interface Context {
  scope: string;
  styled: boolean;
  linked: boolean;
}

type Pair = [string, string];

const escapeText = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeAttribute = (value: string): string =>
  escapeText(value)
    .replace(/"/g, "&quot;")
    .replace(/\t/g, "&#9;")
    .replace(/\n/g, "&#10;")
    .replace(/\r/g, "&#13;");

const quotesBalanced = (value: string): boolean =>
  value.split('"').length % 2 === 1 && value.split("'").length % 2 === 1;

const valueAllowed = (name: string, value: string): boolean => {
  if (value.includes("\\") || SCRIPT_URL.test(value.replace(/\s+/g, ""))) {
    return false;
  }
  const rest = value.replace(LOCAL_URLS, "");
  if (ANY_URL.test(rest)) return false;
  if (PROSE.has(name)) return true;
  return QUOTED.has(name) ? quotesBalanced(rest) : !QUOTES.test(rest);
};

const withoutComments = (css: string): string | null => {
  let kept = "";
  let from = 0;
  for (
    let open = css.indexOf("/*");
    open !== -1;
    open = css.indexOf("/*", from)
  ) {
    const close = css.indexOf("*/", open + 2);
    if (close === -1) return null;
    kept += `${css.slice(from, open)} `;
    from = close + 2;
  }
  return kept + css.slice(from);
};

const cleanDeclaration = (declaration: string): string => {
  const colon = declaration.indexOf(":");
  if (colon <= 0) return "";
  const property = declaration.slice(0, colon).trim().toLowerCase();
  const value = declaration.slice(colon + 1).trim();
  return value &&
    STYLE_PROPERTIES.has(property) &&
    valueAllowed(property, value)
    ? `${property}:${value}`
    : "";
};

const cleanDeclarations = (block: string): string => {
  const css = withoutComments(block);
  if (css === null || UNSAFE_DECLARATIONS.test(css)) return "";
  return css.split(";").map(cleanDeclaration).filter(Boolean).join(";");
};

const scopedClasses = (classes: string, scope: string): string =>
  classes
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => `${scope}-${name}`)
    .join(" ");

const scopedSelector = (selector: string, scope: string): string => {
  const written = selector.trim().split(/\s+/);
  const compounds = EARLIER_SCOPE.test(written[0] ?? "")
    ? written.slice(1)
    : written;
  if (
    !compounds.length ||
    !compounds.every((compound) => compound && COMPOUND.test(compound))
  ) {
    return "";
  }
  return [
    `svg.${scope}`,
    ...compounds.map((compound) =>
      compound.replace(CLASS_IN_SELECTOR, `.${scope}-$1`),
    ),
  ].join(" ");
};

const rulesOf = (css: string): Pair[] => {
  const rules: Pair[] = [];
  let depth = 0;
  let start = 0;
  let prelude = "";
  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    if (character === "{") {
      if (depth === 0) {
        prelude = css.slice(start, index);
        start = index + 1;
      }
      depth += 1;
    } else if (character === "}" && depth > 0) {
      depth -= 1;
      if (depth === 0) {
        rules.push([prelude, css.slice(start, index)]);
        start = index + 1;
      }
    } else if (depth === 0 && (character === ";" || character === "}")) {
      start = index + 1;
    }
  }
  return rules;
};

const cleanStyleSheet = (sheet: string, scope: string): string => {
  const css = withoutComments(sheet);
  if (css === null || UNSAFE_SHEET.test(css)) return "";
  return rulesOf(css)
    .map(([prelude, body]) => {
      const selectors = prelude
        .split(",")
        .map((selector) => scopedSelector(selector, scope))
        .filter(Boolean);
      const declarations = cleanDeclarations(body);
      return selectors.length && declarations
        ? `${selectors.join(",")}{${declarations}}`
        : "";
    })
    .join("");
};

const linkAllowed = (tag: string, link: string): boolean => {
  const target = link.trim();
  if (LINKED_BY_FRAGMENT.has(tag)) return FRAGMENT.test(target);
  if (LINKED_TO_IMAGE.has(tag)) {
    return FRAGMENT.test(target) || RASTER_DATA.test(target);
  }
  return false;
};

const isSvgElement = (element: XmlElement): boolean =>
  element.namespace === SVG_NAMESPACE || element.namespace === "";

const retargetsSafely = (element: XmlElement): boolean => {
  const target = element.attributes.find(
    ({ namespace, name }) =>
      namespace === "" && name.toLowerCase() === "attributename",
  );
  return !target || ANIMATABLE.has(target.value.trim().toLowerCase());
};

const writeAttribute = (
  tag: string,
  attribute: XmlAttribute,
  context: Context,
): Pair | null => {
  const lower = attribute.name.toLowerCase();
  if (attribute.namespace === XLINK_NAMESPACE) {
    if (lower !== "href" || !linkAllowed(tag, attribute.value)) return null;
    context.linked = true;
    return ["xlink:href", attribute.value.trim()];
  }
  if (attribute.namespace === XML_NAMESPACE) {
    return XML_ATTRIBUTES.has(lower) && valueAllowed(lower, attribute.value)
      ? [`xml:${lower}`, attribute.value]
      : null;
  }
  if (attribute.namespace !== "") return null;
  if (lower === "href") {
    return linkAllowed(tag, attribute.value)
      ? ["href", attribute.value.trim()]
      : null;
  }
  const name = ATTRIBUTES.get(lower);
  if (!name) return null;
  if (name === "style") {
    const style = cleanDeclarations(attribute.value);
    return style ? [name, style] : null;
  }
  const value =
    name === "class"
      ? scopedClasses(attribute.value, context.scope)
      : attribute.value;
  return value && valueAllowed(name, value) ? [name, value] : null;
};

const writeAttributes = (
  tag: string,
  element: XmlElement,
  context: Context,
): Pair[] => {
  const written = new Map<string, string>();
  for (const attribute of element.attributes) {
    const pair = writeAttribute(tag, attribute, context);
    if (pair && !written.has(pair[0])) written.set(pair[0], pair[1]);
  }
  return [...written];
};

const openTag = (tag: string, pairs: Pair[]): string =>
  [
    tag,
    ...pairs.map(([name, value]) => `${name}="${escapeAttribute(value)}"`),
  ].join(" ");

const writeStyle = (element: XmlElement, context: Context): string => {
  const sheet = element.children
    .filter((child): child is string => typeof child === "string")
    .join("");
  const css = cleanStyleSheet(sheet, context.scope);
  if (!css) return "";
  context.styled = true;
  return `<style>${escapeText(css)}</style>`;
};

const writeChildren = (
  element: XmlElement,
  holder: string,
  context: Context,
): string =>
  element.children
    .map((child) => {
      if (typeof child === "string") {
        return TEXT_HOLDERS.has(holder) ? escapeText(child) : "";
      }
      return TEXT_ONLY.has(holder) ? "" : writeElement(child, holder, context);
    })
    .join("");

const writeElement = (
  element: XmlElement,
  parent: string,
  context: Context,
): string => {
  const tag = isSvgElement(element)
    ? ELEMENTS.get(element.name.toLowerCase())
    : undefined;
  if (!tag || (RETARGETING.has(tag) && !retargetsSafely(element))) return "";
  if (tag === "a") return writeChildren(element, parent, context);
  if (tag === "style") return writeStyle(element, context);
  const open = openTag(tag, writeAttributes(tag, element, context));
  const children = writeChildren(element, tag, context);
  return children ? `<${open}>${children}</${tag}>` : `<${open}/>`;
};

const writeRoot = (root: XmlElement, context: Context): string => {
  const children = writeChildren(root, "svg", context);
  const pairs = writeAttributes("svg", root, context);
  const classes = [
    context.styled ? context.scope : "",
    ...pairs.filter(([name]) => name === "class").map(([, value]) => value),
  ]
    .filter(Boolean)
    .join(" ");
  const namespaces: Pair[] = context.linked
    ? [
        ["xmlns", SVG_NAMESPACE],
        ["xmlns:xlink", XLINK_NAMESPACE],
      ]
    : [["xmlns", SVG_NAMESPACE]];
  const scoped: Pair[] = classes ? [["class", classes]] : [];
  const open = openTag("svg", [
    ...namespaces,
    ...scoped,
    ...pairs.filter(([name]) => name !== "class"),
  ]);
  return children ? `<${open}>${children}</svg>` : `<${open}/>`;
};

const FNV_PRIME = 0x01000193;
const SEEDS = [0x811c9dc5, 0x050c5d1f] as const;

const hashOf = (text: string, seed: number): string => {
  let hash = seed;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, FNV_PRIME);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

export const cleanSvg = (text: string): string | null => {
  const root = readXml(text);
  if (!root || !isSvgElement(root) || root.name.toLowerCase() !== "svg") {
    return null;
  }
  const hash = SEEDS.map((seed) => hashOf(text, seed)).join("");
  const context: Context = {
    scope: `icon-${hash.slice(0, 10)}`,
    styled: false,
    linked: false,
  };
  return writeRoot(root, context);
};
