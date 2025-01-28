/**
 * @author William J. Horn
 */

import { StringKeyObject } from "@/types/util";

export default class ObjectQuery<ObjectType extends StringKeyObject> {
  private _object: ObjectType;

  constructor(object?: ObjectType) {
    this._object = object || ({} as ObjectType);
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
  without(...exclude: (keyof ObjectType)[]): StringKeyObject {
    const newProps: StringKeyObject = {};

    for (const propKey in this._object) {
      if (!exclude.includes(propKey)) {
        newProps[propKey] = this._object[propKey];
      }
    }

    return newProps;
  }

  set(key: keyof ObjectType, value: any): void {
    this._object[key] = value;
  }

  get(key: keyof ObjectType): any {
    return this._object[key];
  }

  all(): StringKeyObject {
    return this._object;
  }
}
