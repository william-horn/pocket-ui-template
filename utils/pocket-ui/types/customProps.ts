/**
 * CUSTOM PROPERTY DEFINITIONS:
 *
 * Here is where all custom component props are defined
 * and their default behavior functions are declared.
 */
export type CustomProp = keyof CustomProps;
export type CustomProps = {
  className?: any;
  width?: any;
  height?: any;
};

// Object declaration
export const customProps: CustomProps = {
  className: true,
  width: true,
  height: true,
};
