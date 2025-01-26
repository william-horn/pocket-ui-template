import type { Ref, ReactNode, ReactElement, ComponentProps } from "react";

// These props are on EVERY component
export interface BaseProps {
  children?: Readonly<ReactNode>;
  test?: { [key: string]: any };
  ref?: Ref<HTMLElement>;
}

// These props are on ALL STYLABLE components ONLY
// export interface StyleProps extends BaseProps {
//   width?: string;
//   height?: string;
// }

// export type ContainerVariant =
//   | "div"
//   | "section"
//   | "header"
//   | "footer"
//   | "main"
//   | "article"
//   | "aside"
//   | "form"
//   | "nav"
//   | "ol"
//   | "ul"
//   | "table"
//   | "tr";

export interface ContainerProps extends BaseProps {
  containerSpecific?: string;
  // component?: ContainerVariant;
}

// export type TypographyVariant =
//   | "p"
//   | "h1"
//   | "h2"
//   | "h3"
//   | "h4"
//   | "h5"
//   | "h6"
//   | "b"
//   | "strong"
//   | "i"
//   | "em"
//   | "mark"
//   | "small"
//   | "del"
//   | "ins"
//   | "sub"
//   | "sup"
//   | "span"
//   | "li"
//   | "th"
//   | "td";

export interface TypographyProps extends BaseProps {
  typographySpecific?: string;
  // component?: TypographyVariant;
}

// ALL element name variants
// export type ElementVariant = ContainerVariant | TypographyVariant;

// Represents all generic props on an element
// export interface ElementProps {
//   [key: string]: any;
// }

// export type ElementConstructor = (props: ElementProps) => ReactElement;

// export type ElementConstructors = {
//   [key in ElementVariant]?: ElementConstructor;
// };
