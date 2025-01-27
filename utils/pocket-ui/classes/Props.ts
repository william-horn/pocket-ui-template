/**
 * @author William J. Horn
 *
 * `Props` class will wrap around a provided object of component
 * properties, appending a useful API to manipulate those properties.
 */
import type { StringKeyObject } from "@/types/util";

/**
 * `Props` will accept an object of properties and the resultant instance
 * provides an API for interacting with and manipulating those properties.
 */
export default class Props<ElementProps extends StringKeyObject> {
  private _props: ElementProps;
  private _categories: {
    [key: string]: {
      [key in keyof ElementProps]?: any;
    };
  };

  constructor(props: ElementProps) {
    this._props = { ...props };
    this._categories = {};
  }

  /**
   *
   * @param exclude The array of indices to exclude from the returned
   * prop object
   *
   * @example
   * ```ts
   * new Props({a: "a", b: "b"}).without("a") // -> { b: "b" }
   * ```
   *
   * @returns A new prop object excluding the indices inside of `exclude`
   */
  without(...exclude: (keyof ElementProps)[]): StringKeyObject {
    const newProps: StringKeyObject = {};

    for (const propKey in this._props) {
      if (!exclude.includes(propKey)) {
        newProps[propKey] = this._props[propKey];
      }
    }

    return newProps;
  }

  set(propKey: keyof ElementProps, value: any): void {
    this._props[propKey] = value;
  }

  setCategory(
    categoryName: string,
    propKey: keyof ElementProps,
    propValue: any
  ): void {
    if (!this._categories[categoryName]) this._categories[categoryName] = {};
    this._categories[categoryName][propKey] = propValue;
  }

  getCategory(categoryName: string, propKey?: keyof ElementProps): any {
    if (propKey) return this._categories[categoryName][propKey];
    return new Props(this._categories[categoryName]);
  }

  /**
   *
   * @param propKey (optional) If specified, represents the key index of the
   * prop to return the value of.
   *
   * @returns The unaltered original props object if no `propKey` is
   * provided, or `props[propKey]` otherwise.
   */
  get(propKey?: keyof ElementProps): any {
    if (propKey) return this._props[propKey];
    return this._props;
  }
}
