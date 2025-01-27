import type { ContainerProps } from "@/types/componentProps";
import evaluateProps from "@/utils/pocket-ui/evaluateProps";
import { ComponentProps } from "react";
import { SmartOmit } from "@/types/util";

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
export type NativeDivProps = ComponentProps<"div">;

/**
 * `<...>Props` represents _all_ prop types of this component.
 * It is the intersection of `Custom<...>Props` and `Native<...>Props`
 * with the exception of omitting any overwritten fields defined
 * in `Custom<...>Props`
 */
export type DivProps = CustomDivProps & SmartOmit<NativeDivProps, "id">;

const Div = (props: DivProps) => {
  const evaluatedProps: DivProps = evaluateProps<
    DivProps,
    NativeDivProps,
    CustomDivProps
  >(props, {
    nativeOverrides: {
      id: (value) => {
        value = "";
        return "";
      },
    },
    customOverrides: {
      // All of these types should be inferred correctly
      newCustomProp: (value) => {
        console.log("Custom prop activated");
      },
      width: (value) => {
        console.log("Width activated");
      },
      id: (value) => {
        console.log("Id activated");
      },
    },
  });

  return <div></div>;
};

export default Div;
