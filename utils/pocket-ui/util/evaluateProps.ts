/**
 * @author William J. Horn
 *
 * `evaluateProps()` should accept some object of component props and
 * evaluate them against a custom callback list of property modifiers,
 * or against some default list. This allows custom components to
 * interpret custom props in a more uniform and reusable way.
 */

import defaultPropsBehavior from "./defaultPropsBehavior";
import Props from "../classes/Props";
import { StringKeyObject } from "@/types/util";

/**
 * PropUpdater:
 *
 * A callback function type used for modifying or processing
 * the value of a component prop.
 */
export type PropUpdater<Input = any, Result = any> = (
  value: Exclude<Input, undefined>,
  scope?: StringKeyObject
) => Result;

export type PropEvaluationOptions<NativeProps, CustomProps> = {
  /**
   * PropUpdater functions for native props will be passed a
   * `value` of the type corresponding to the component's native
   * prop type, and is expected to return a value of the same type.
   *
   * Thus, why we pass `NativeProps[key]` as the `Input` and expected
   * `Result` type to `PropUpdater`
   */
  nativeOverrides?: {
    [key in keyof NativeProps]: PropUpdater<NativeProps[key], NativeProps[key]>;
  };

  /**
   * For custom types, no value is expected to be returned from
   * the callback because it will not be kept in the returned
   * prop pool to be passed on to the DOM element.
   *
   * Custom props are processed in their callbacks and then discarded
   * from the returned prop object. The `Input` value type is known,
   * hence why we pass `CustomProps[key]` as the input type. However,
   * since no return type is expected, we pass `undefined` for `Result`
   */
  customOverrides?: {
    [key in keyof CustomProps]: PropUpdater<CustomProps[key], undefined>;
  };

  /**
   * Scope is an object that can store any set of variables that can
   * be accessed inside of the PropUpdater callback function's second
   * argument.
   */
  scope?: StringKeyObject;
};

/**
 *
 * @param props The property object to evaluate. This should be some set
 * of valid properties that belong to a component. For example:
 * `{id = "#some id"}`
 *
 * @param options An optional object containing extra functionality
 * describing how the props should be evaluated. Dedicated functionality
 * is given for native props as (described by `nativeOverrides`) well
 * as custom props (describeds by `customOverrides`).
 *
 * Both `nativeOverrides` and `customOverrides` are objects of the following
 * structure:
 *
 * ```ts
 * { nativeProp: (value: T, scope) => ...: T }
 * ```
 * @returns An instance of the `Props` class which wraps around the
 * original props object
 */
const evaluateProps = <
  ElementProps extends StringKeyObject,
  NativeProps,
  CustomProps
>(
  props: ElementProps,
  options: PropEvaluationOptions<NativeProps, CustomProps> = {}
): Props<ElementProps> => {
  const updatedProps: Props<ElementProps> = new Props<ElementProps>(props);
  const propScope: StringKeyObject = options.scope || {};

  for (const propKey in props) {
    const propValue = props[propKey];

    const customPropKey: keyof CustomProps =
      propKey as string as keyof CustomProps;

    if (options.customOverrides && options.customOverrides[customPropKey]) {
      options.customOverrides[customPropKey](propValue, propScope);
      updatedProps.setCategory("custom", propKey, propValue);
      continue;
    }

    const nativePropKey: keyof NativeProps =
      propKey as string as keyof NativeProps;

    if (options.nativeOverrides && options.nativeOverrides[nativePropKey]) {
      updatedProps.set(
        propKey,
        options.nativeOverrides[nativePropKey](propValue, propScope)
      );
    }
  }

  return updatedProps;
};

export default evaluateProps;
