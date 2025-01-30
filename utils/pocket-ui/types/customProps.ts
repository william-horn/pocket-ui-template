import type { StringKeyObject } from "@/types/util";

/**
 * CUSTOM PROPERTY DEFINITIONS:
 *
 * Here is where all custom component props are defined
 * and their default behavior functions are declared.
 */
export type CustomProp = keyof CustomProps;
export type CustomProps = Readonly<
  {
    className?: unknown;
    width?: unknown;
    height?: unknown;
  } & StringKeyObject
>;

// Object declaration
export const customProps: CustomProps = {
  className: true,
  width: true,
  height: true,
};
