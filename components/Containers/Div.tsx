import type { ContainerProps } from "@/types/componentProps";
import evaluateProps from "@/utils/pocket-ui/evaluateProps";
import { ComponentProps } from "react";

// Optional: Add more props unique to only this element
export type CustomDivProps = {
  // className?: number;
  newCustomProp?: string;
  width?: boolean;
  // id?: boolean;
} & ContainerProps;

export type NativeDivProps = ComponentProps<"div">;
export type DivProps = NativeDivProps & CustomDivProps;

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
      newCustomProp: () => "a new custom property",
      width: () => true,
    },
  });

  return <div></div>;
};

export default Div;
