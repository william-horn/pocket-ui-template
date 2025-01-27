import defaultPropsBehavior from "./defaultPropsBehavior";
import Props from "../classes/Props";

/**
 * PropUpdater:
 *
 * A callback function type used for modifying or processing
 * the value of a component prop.
 */
type PropUpdater<Input, Result> = (value: Exclude<Input, undefined>) => Result;

type PropEvaluationOptions<NativeProps, CustomProps> = {
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
  scope?: { [key: string]: any };
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
const evaluateProps = <ElementProps, NativeProps, CustomProps>(
  props: ElementProps,
  options?: PropEvaluationOptions<NativeProps, CustomProps>
): Props<ElementProps> => {
  const updatedProps: Props<ElementProps> = new Props<ElementProps>(props);

  return updatedProps;
};

export default evaluateProps;
