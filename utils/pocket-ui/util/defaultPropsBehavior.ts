import type { SmartOmit, StringKeyObject } from "@/types/util";
import type { PropEvaluationOptions } from "./evaluateProps";
import { twMerge } from "tailwind-merge";

const defaultPropsBehavior: PropEvaluationOptions = {
  nativeOverrides: {
    className: (value, scope) => {
      return twMerge(scope!.baseClass, value);
    },
  },
  customOverrides: {},
};

export default defaultPropsBehavior;
