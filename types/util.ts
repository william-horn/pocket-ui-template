/**
 * @author William J. Horn
 *
 * Arbitrary utility types for quality of life
 */
import type { JSX, AllHTMLAttributes } from "react";

/**
 * Use native `Omit<T, U>` but add intellisense for
 * fields of `T` you are omitting
 */
export type SmartOmit<T, U extends keyof T> = Omit<T, U>;

/**
 * An arbitrary object with string keys, mostly used for
 * testing or temporary solutions/placeholders
 */
export type StringKeyObject = { [key: string]: any };

/**
 * Return an object type representing all native HTML
 * attributes/props of a specified DOM element
 */
export type NativePropsOf<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T];

export type AllNativeProps = {
  [K in keyof AllHTMLAttributes<undefined>]?: AllHTMLAttributes<undefined>[K];
};
