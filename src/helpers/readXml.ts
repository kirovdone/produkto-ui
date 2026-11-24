export interface XmlAttribute {
  namespace: string;
  name: string;
  value: string;
}

export interface XmlElement {
  namespace: string;
  name: string;
  attributes: XmlAttribute[];
  children: (XmlElement | string)[];
}

export const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
export const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
const UNBOUND_NAMESPACE = "urn:produkto:unbound";

const MAX_DEPTH = 256;
const MAX_ENTITIES = 64;
const MAX_EXPANSION = 1_000_000;

const NAME = /[A-Za-z_:À-�][-.0-9A-Za-z_:·À-�]*/y;
const SPACES = " \t\n";

const PREDEFINED: ReadonlyMap<string, string> = new Map([
  ["lt", "<"],
  ["gt", ">"],
  ["amp", "&"],
  ["quot", '"'],
  ["apos", "'"],
]);

type Scope = ReadonlyMap<string, string>;

const ROOT_SCOPE: Scope = new Map([
  ["xml", XML_NAMESPACE],
  ["xlink", XLINK_NAMESPACE],
]);

interface Open {
  element: XmlElement;
  qualified: string;
  scope: Scope;
}

interface Reader {
  text: string;
  at: number;
  entities: Map<string, string>;
  expanded: number;
  open: Open[];
  root: XmlElement | null;
  doctype: boolean;
}

const hasForbiddenCharacter = (text: string): boolean => {
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    if (code === 0xfffe || code === 0xffff) return true;
    if (code < 0x20 && code !== 0x9 && code !== 0xa && code !== 0xd) {
      return true;
    }
  }
  return false;
};

const isXmlCharacter = (code: number): boolean =>
  code === 0x9 ||
  code === 0xa ||
  code === 0xd ||
  (code >= 0x20 && code <= 0xd7ff) ||
  (code >= 0xe000 && code <= 0xfffd) ||
  (code >= 0x10000 && code <= 0x10ffff);

const skipSpaces = (reader: Reader): boolean => {
  const start = reader.at;
  while (
    reader.at < reader.text.length &&
    SPACES.includes(reader.text[reader.at])
  ) {
    reader.at += 1;
  }
  return reader.at > start;
};

const readName = (reader: Reader): string | null => {
  NAME.lastIndex = reader.at;
  const match = NAME.exec(reader.text);
  if (!match) return null;
  reader.at = NAME.lastIndex;
  return match[0];
};

const skipPast = (reader: Reader, opening: number, marker: string): boolean => {
  const end = reader.text.indexOf(marker, reader.at + opening);
  if (end === -1) return false;
  reader.at = end + marker.length;
  return true;
};

const readQuoted = (reader: Reader): string | null => {
  const quote = reader.text[reader.at];
  if (quote !== '"' && quote !== "'") return null;
  const end = reader.text.indexOf(quote, reader.at + 1);
  if (end === -1) return null;
  const value = reader.text.slice(reader.at + 1, end);
  reader.at = end + 1;
  return value;
};

const characterOf = (digits: string): string | null => {
  const code = /^x[0-9a-fA-F]{1,6}$/.test(digits)
    ? parseInt(digits.slice(1), 16)
    : /^[0-9]{1,7}$/.test(digits)
      ? parseInt(digits, 10)
      : NaN;
  return isXmlCharacter(code) ? String.fromCodePoint(code) : null;
};

const resolveReference = (reader: Reader, reference: string): string | null => {
  if (reference.startsWith("#")) return characterOf(reference.slice(1));
  const predefined = PREDEFINED.get(reference);
  if (predefined !== undefined) return predefined;
  const declared = reader.entities.get(reference);
  if (declared === undefined) return null;
  reader.expanded += declared.length;
  return reader.expanded > MAX_EXPANSION ? null : declared;
};

const decode = (reader: Reader, raw: string): string | null => {
  let decoded = "";
  let from = 0;
  for (
    let ampersand = raw.indexOf("&");
    ampersand !== -1;
    ampersand = raw.indexOf("&", from)
  ) {
    const semicolon = raw.indexOf(";", ampersand + 1);
    if (semicolon === -1) return null;
    const value = resolveReference(reader, raw.slice(ampersand + 1, semicolon));
    if (value === null) return null;
    decoded += raw.slice(from, ampersand) + value;
    from = semicolon + 1;
  }
  return decoded + raw.slice(from);
};

const readEntity = (reader: Reader): boolean => {
  reader.at += "<!ENTITY".length;
  if (!skipSpaces(reader)) return false;
  const name = readName(reader);
  if (!name || !skipSpaces(reader)) return false;
  const value = readQuoted(reader);
  if (value === null || /[&%<]/.test(value)) return false;
  if (reader.entities.size >= MAX_ENTITIES) return false;
  if (!reader.entities.has(name)) reader.entities.set(name, value);
  skipSpaces(reader);
  if (reader.text[reader.at] !== ">") return false;
  reader.at += 1;
  return true;
};

const skipDeclaration = (reader: Reader): boolean => {
  while (reader.at < reader.text.length) {
    const character = reader.text[reader.at];
    if (character === ">") {
      reader.at += 1;
      return true;
    }
    if (character !== '"' && character !== "'") reader.at += 1;
    else if (readQuoted(reader) === null) return false;
  }
  return false;
};

const readDeclaration = (reader: Reader): boolean => {
  const { text, at } = reader;
  if (text.startsWith("<!--", at)) return skipPast(reader, 4, "-->");
  if (text.startsWith("<?", at)) return skipPast(reader, 2, "?>");
  if (text.startsWith("<!ENTITY", at)) return readEntity(reader);
  if (text.startsWith("<!", at)) return skipDeclaration(reader);
  return false;
};

const readInternalSubset = (reader: Reader): boolean => {
  for (;;) {
    skipSpaces(reader);
    if (reader.at >= reader.text.length) return false;
    if (reader.text[reader.at] === "]") {
      reader.at += 1;
      return true;
    }
    if (!readDeclaration(reader)) return false;
  }
};

const readDoctype = (reader: Reader): boolean => {
  if (reader.doctype || reader.root) return false;
  reader.doctype = true;
  reader.at += "<!DOCTYPE".length;
  while (reader.at < reader.text.length) {
    const character = reader.text[reader.at];
    if (character === ">") {
      reader.at += 1;
      return true;
    }
    if (character === "[") {
      reader.at += 1;
      if (!readInternalSubset(reader)) return false;
    } else if (character === '"' || character === "'") {
      if (readQuoted(reader) === null) return false;
    } else {
      reader.at += 1;
    }
  }
  return false;
};

const appendText = (element: XmlElement, text: string): void => {
  const last = element.children.length - 1;
  const previous = element.children[last];
  if (typeof previous === "string") element.children[last] = previous + text;
  else element.children.push(text);
};

const readText = (reader: Reader, end: number): boolean => {
  const raw = reader.text.slice(reader.at, end);
  reader.at = end;
  const parent = reader.open.at(-1);
  if (!parent) return raw.trim() === "";
  const text = decode(reader, raw);
  if (text === null) return false;
  appendText(parent.element, text);
  return true;
};

const readCdata = (reader: Reader): boolean => {
  const parent = reader.open.at(-1);
  const start = reader.at + "<![CDATA[".length;
  const end = reader.text.indexOf("]]>", start);
  if (!parent || end === -1) return false;
  appendText(parent.element, reader.text.slice(start, end));
  reader.at = end + "]]>".length;
  return true;
};

const readEndTag = (reader: Reader): boolean => {
  reader.at += 2;
  const name = readName(reader);
  skipSpaces(reader);
  if (!name || reader.text[reader.at] !== ">") return false;
  reader.at += 1;
  return reader.open.pop()?.qualified === name;
};

const readAttributes = (
  reader: Reader,
): { pairs: [string, string][]; closed: boolean } | null => {
  const pairs: [string, string][] = [];
  const seen = new Set<string>();
  for (;;) {
    const spaced = skipSpaces(reader);
    if (reader.text.startsWith("/>", reader.at)) {
      reader.at += 2;
      return { pairs, closed: true };
    }
    if (reader.text[reader.at] === ">") {
      reader.at += 1;
      return { pairs, closed: false };
    }
    const name = spaced ? readName(reader) : null;
    if (!name || seen.has(name)) return null;
    skipSpaces(reader);
    if (reader.text[reader.at] !== "=") return null;
    reader.at += 1;
    skipSpaces(reader);
    const literal = readQuoted(reader);
    if (literal === null || literal.includes("<")) return null;
    const value = decode(reader, literal.replace(/[\t\n]/g, " "));
    if (value === null) return null;
    seen.add(name);
    pairs.push([name, value]);
  }
};

const isDeclaration = (name: string): boolean =>
  name === "xmlns" || name.startsWith("xmlns:");

const scopeOf = (parent: Scope, pairs: [string, string][]): Scope => {
  const declared = pairs.filter(([name]) => isDeclaration(name));
  if (!declared.length) return parent;
  const scope = new Map(parent);
  for (const [name, value] of declared) {
    scope.set(name === "xmlns" ? "" : name.slice("xmlns:".length), value);
  }
  return scope;
};

const resolve = (
  qualified: string,
  scope: Scope,
  isElement: boolean,
): { namespace: string; name: string } => {
  const colon = qualified.indexOf(":");
  if (colon === -1) {
    return {
      namespace: isElement ? (scope.get("") ?? "") : "",
      name: qualified,
    };
  }
  const prefix = qualified.slice(0, colon);
  return {
    namespace: (prefix && scope.get(prefix)) || UNBOUND_NAMESPACE,
    name: qualified.slice(colon + 1),
  };
};

const attributesOf = (
  pairs: [string, string][],
  scope: Scope,
): XmlAttribute[] | null => {
  const attributes = pairs
    .filter(([name]) => !isDeclaration(name))
    .map(([qualified, value]) => ({
      ...resolve(qualified, scope, false),
      value,
    }));
  const distinct = new Set(
    attributes.map(({ namespace, name }) => `${namespace} ${name}`),
  );
  return distinct.size === attributes.length ? attributes : null;
};

const readStartTag = (reader: Reader): boolean => {
  reader.at += 1;
  const qualified = readName(reader);
  const tag = qualified ? readAttributes(reader) : null;
  const parent = reader.open.at(-1);
  if (!qualified || !tag || (!parent && reader.root)) return false;
  if (reader.open.length >= MAX_DEPTH) return false;
  const scope = scopeOf(parent?.scope ?? ROOT_SCOPE, tag.pairs);
  const attributes = attributesOf(tag.pairs, scope);
  if (!attributes) return false;
  const element: XmlElement = {
    ...resolve(qualified, scope, true),
    attributes,
    children: [],
  };
  if (parent) parent.element.children.push(element);
  else reader.root = element;
  if (!tag.closed) reader.open.push({ element, qualified, scope });
  return true;
};

const readMarkup = (reader: Reader): boolean => {
  const { text, at } = reader;
  if (text.startsWith("<!--", at)) return skipPast(reader, 4, "-->");
  if (text.startsWith("<?", at)) return skipPast(reader, 2, "?>");
  if (text.startsWith("<![CDATA[", at)) return readCdata(reader);
  if (text.startsWith("<!DOCTYPE", at)) return readDoctype(reader);
  if (text.startsWith("</", at)) return readEndTag(reader);
  return readStartTag(reader);
};

export const readXml = (source: string): XmlElement | null => {
  const text = source.replace(/\r\n?/g, "\n");
  if (hasForbiddenCharacter(text)) return null;
  const reader: Reader = {
    text,
    at: 0,
    entities: new Map(),
    expanded: 0,
    open: [],
    root: null,
    doctype: false,
  };
  while (reader.at < text.length) {
    const next = text.indexOf("<", reader.at);
    const read =
      next === reader.at
        ? readMarkup(reader)
        : readText(reader, next === -1 ? text.length : next);
    if (!read) return null;
  }
  return reader.open.length === 0 ? reader.root : null;
};
