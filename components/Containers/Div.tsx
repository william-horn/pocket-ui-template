import type { ContainerProps } from "@/types/componentProps";
import evaluateProps from "@/utils/pocket-ui/evaluateProps";
import { ComponentProps } from "react";

// Optional: Add more props unique to only this element
export interface CustomDivProps extends ContainerProps {
  // className?: number;
}

export type NativeDivProps = ComponentProps<"div">;
export type DivProps = NativeDivProps | CustomDivProps;

const Div = (props: DivProps) => {
  // const inside = "from inside component";

  const evaluatedProps: DivProps = evaluateProps<
    DivProps,
    NativeDivProps,
    CustomDivProps
  >(props, {
    nativeOverrides: {
      className: (value) => "",
    },
    customOverrides: {},
  });

  // console.log(processedProps);

  return <></>;
};

export default Div;
