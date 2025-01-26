import type { ContainerProps } from "@/types/componentProps";
import evaluateProps from "@/utils/pocket-ui/evaluateProps";
import { ComponentProps } from "react";
import { SmartOmit } from "@/types/util";

// Optional: Add more props unique to only this element
export type CustomDivProps =
  | {
      // className?: number;
      newCustomProp?: string;
      containerSpecific?: number | boolean;
      width?: boolean;
      id?: boolean | NativeDivProps["id"];
    } & SmartOmit<ContainerProps, "containerSpecific">;

export type NativeDivProps = ComponentProps<"div">;
export type DivProps = CustomDivProps & SmartOmit<NativeDivProps, "id">;

const Div = (props: DivProps) => {
  const evaluatedProps: DivProps = evaluateProps<
    DivProps,
    NativeDivProps,
    CustomDivProps
  >(props, {
    nativeOverrides: {
      id: () => "",
    },
    customOverrides: {
      newCustomProp: () => {
        console.log("Custom prop activated");
      },
      width: () => {
        console.log("Width activated");
      },
      id: () => {
        console.log("Id activated");
      },
    },
  });

  return <div></div>;
};

export default Div;
