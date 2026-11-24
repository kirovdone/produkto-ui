import { Children, isValidElement, type ReactNode } from "react";

const writesWords = (type: unknown): boolean =>
  typeof type === "function" && Object.hasOwn(type, "writesWords");

export const wordsIn = (children: ReactNode): boolean =>
  Children.toArray(children).some((child) =>
    typeof child === "string" || typeof child === "number"
      ? String(child).trim().length > 0
      : isValidElement<{ children?: ReactNode }>(child) &&
        (writesWords(child.type) || wordsIn(child.props.children)),
  );
