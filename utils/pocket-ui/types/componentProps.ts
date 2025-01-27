import type { Ref, ReactNode, ReactElement, ComponentProps } from "react";
import { SmartOmit } from "../../../types/util";

// These props are on EVERY component
export type BaseProps = {
  children?: Readonly<ReactNode>;
  test?: string;
  ref?: Ref<HTMLElement>;
};

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

export type ContainerProps = {
  containerSpecific?: string;
  test?: boolean;
} & SmartOmit<BaseProps, "test">;

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

export type TypographyProps = {
  typographySpecific?: string;
} & BaseProps;

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
