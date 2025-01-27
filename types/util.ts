/**
 * @author William J. Horn
 *
 * Arbitrary utility types for quality of life
 */

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
