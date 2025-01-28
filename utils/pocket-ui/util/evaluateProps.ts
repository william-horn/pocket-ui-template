/**
 * @author William J. Horn
 *
 * `evaluateProps()` should accept some object of component props and
 * evaluate them against a custom callback list of property modifiers,
 * or against some default list. This allows custom components to
 * interpret custom props in a more uniform and reusable way.
 */
import Props from "../classes/Props";
import type { StringKeyObject } from "@/types/util";

/**
 * PropUpdater:
 *
 * A callback function type used for modifying or processing
 * the value of a component prop.
 */
export type PropUpdater<ValueType = any> = (
  ref: PropRef<ValueType>
) => PropRef<ValueType>;

type PropUpdaters<ElementProps> = {
  [K in keyof ElementProps]: PropUpdater<ElementProps[K]>;
};

/**
 * In cases where NativeProps and CustomProps are not
 * known, a default generic object type is assigned
 * to them.
 */
export type PropEvaluationOptions<
  NativeProps extends StringKeyObject = StringKeyObject,
  CustomProps extends StringKeyObject = StringKeyObject
> = {
  /**
   * PropUpdater functions for native props will be passed a
   * `value` of the type corresponding to the component's native
   * prop type, and is expected to return a value of the same type.
   *
   * Thus, why we pass `NativeProps[key]` as the `Input` and expected
   * `Result` type to `PropUpdater`
   */
  // nativeOverrides?: {
  //   [key in keyof NativeProps]: PropUpdater<NativeProps[key]>;
  // };
  nativeOverrides?: PropUpdaters<NativeProps>;

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
  // customOverrides?: {
  //   [key in keyof CustomProps]: PropUpdater<CustomProps[key]>;
  // };
  customOverrides?: PropUpdaters<CustomProps>;

  /**
   * Scope is an object that can store any set of variables that can
   * be accessed inside of the PropUpdater callback function's second
   * argument.
   */
  scope?: StringKeyObject;

  nativeDefaults?: {
    [key in keyof NativeProps]: NativeProps[key];
  };
};

class PropRef<ValueType> {
  public value;
  public scope: StringKeyObject;

  constructor(value: ValueType, scope?: StringKeyObject) {
    this.value = value;
    this.scope = scope || {};
  }

  stopPropagating() {
    return false;
  }
}

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
  NativeProps extends StringKeyObject,
  CustomProps extends StringKeyObject
>(
  props: ElementProps,
  options: PropEvaluationOptions<NativeProps, CustomProps> = {}
): Props<ElementProps> => {
  /**
   * TODO:
   *
   * Make `Props` class distinguish between Custom and Native props
   * so that they can be intellisensed
   */
  const updatedProps: Props<ElementProps> = new Props<ElementProps>(props);
  const propScope: StringKeyObject = options.scope || {};

  /**
   * Fire prop override callbacks for all props that have
   * been defined through the component's construction
   */
  for (const propKey in props) {
    const propValue = props[propKey];

    if (options.customOverrides && options.customOverrides[propKey]) {
      /**
       * ISSUE:
       *
       * `propValue` is of type: `ElementProps[Extract<keyof ElementProps, string>]`
       * but we must pass a type `CustomProps[Extract<keyof ElementProps, string>]`
       * to `PropRef` in this code block. This is probably a sign of poor abstraction
       * or type architecture, as it can most likely be simplified. For now, I am
       * bypassing the issue by casting `propType` to `unknown` and then again
       * to `CustomProps[Extract<keyof ElementProps, string>]` so the types don't
       * encounter a merge conflict.
       *
       * Use this to find the value that the prop updater functions
       * are expecting:
       *
       * ```
       * const f = options.customOverrides[propKey]
       * f()
       * ```
       */
      options.customOverrides[propKey](
        new PropRef<CustomProps[Extract<keyof ElementProps, string>]>(
          propValue as unknown as CustomProps[Extract<
            keyof ElementProps,
            string
          >],
          propScope
        )
      );
      updatedProps.custom.set(propKey, propValue);
    } else if (options.nativeOverrides && options.nativeOverrides[propKey]) {
      updatedProps.native.set(
        propKey,
        options.nativeOverrides[propKey](
          new PropRef<NativeProps[Extract<keyof ElementProps, string>]>(
            propValue as unknown as NativeProps[Extract<
              keyof ElementProps,
              string
            >],
            propScope
          )
        )
      );
    }

    updatedProps.native.set(propKey, propValue);
  }

  /**
   * Check all default props that have not been defined during
   * component's construction and evaluate their default values.
   */
  if (options.nativeDefaults) {
    for (const defaultPropKey in options.nativeDefaults) {
      if (updatedProps.get(defaultPropKey) === undefined) {
        if (
          options.nativeOverrides &&
          options.nativeOverrides[defaultPropKey]
        ) {
          updatedProps.native.set(
            defaultPropKey,
            options.nativeOverrides[defaultPropKey](
              options.nativeDefaults[defaultPropKey],
              propScope
            )
          );
        } else {
          updatedProps.native.set(
            defaultPropKey,
            options.nativeDefaults[defaultPropKey]
          );
        }
      }
    }
  }

  return updatedProps;
};

export default evaluateProps;
