/**
 * @author William J. Horn
 *
 * A wrapper component for the `div` DOM element. Includes all
 * custom props provided by pocket-ui and props are strictly
 * type checked
 */

import type { ContainerProps } from "@/utils/pocket-ui/types/componentProps";
import evaluateProps from "@/utils/pocket-ui/util/evaluateProps";
import type { SmartOmit, NativePropsOf, StringKeyObject } from "@/types/util";
import Props from "@/utils/pocket-ui/classes/Props";

/**
 * `Custom<...>Props` is an optional extension of custom component
 * props defined elsewhere, in this case "componentProps.ts"
 */
export type CustomDivProps =
  | {
      // className?: number;
      newCustomProp?: string;
      containerSpecific?: number | boolean;
      width?: boolean;
      id?: boolean | NativeDivProps["id"];
    } & SmartOmit<ContainerProps, "containerSpecific">;

/**
 * `Native<...>Props` will retrieve the native property types
 * for the element `<...>`.
 */
export type NativeDivProps = NativePropsOf<"div">;

/**
 * `<...>Props` represents _all_ prop types of this component.
 * It is the intersection of `Custom<...>Props` and `Native<...>Props`
 * with the exception of omitting any overwritten fields defined
 * in `Custom<...>Props`
 */
export type DivProps = CustomDivProps & SmartOmit<NativeDivProps, "id">;

/**
 * Default className config of component
 */
const className = "w-[50px] h-[50px] bg-red-500";

const Div = (props: DivProps) => {
  const finalProps: Props<DivProps> = evaluateProps<
    DivProps,
    NativeDivProps,
    CustomDivProps
  >(props, {
    nativeOverrides: {
      id: (ref) => {
        return ref;
      },
      className: (ref) => {
        return ref;
      },
    },
    customOverrides: {
      newCustomProp: (ref) => {
        return ref;
      },
      // id: (value) => {
      //   console.log("CUSTOM OVERRIDE ID: ", value);
      // },
    },
    nativeDefaults: {
      className,
      id: "some default",
    },
  });

  return (
    <div {...finalProps.native.without("children")}>
      {finalProps.native.get("children")}
    </div>
  );
};

export default Div;
