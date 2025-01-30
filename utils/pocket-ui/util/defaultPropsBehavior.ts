import type { SmartOmit, StringKeyObject } from "@/types/util";
import type { PropEvaluationOptions } from "./evaluateProps";
import { twMerge } from "tailwind-merge";

const defaultPropsBehavior: PropEvaluationOptions = {
  nativeOverrides: {
    className: (ref) => {
      console.log("Default behavior activated");
      ref.value = twMerge(ref.defaultValue, ref.value);
      return ref;
    },
  },
  customOverrides: {},
};

export default defaultPropsBehavior;
