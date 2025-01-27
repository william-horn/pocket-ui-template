import { StringKeyObject } from "@/types/util";

/**
 * `Props` will accept an object of properties and the resultant instance
 * provides an API for interacting with and manipulating those properties.
 */
export default class Props<ElementProps> {
  private props: ElementProps;

  constructor(props: ElementProps) {
    this.props = props;
  }

  /**
   *
   * @param exclude The array of indices to exclude from the returned
   * prop object
   *
   * @returns A new prop object excluding the indices inside of `exclude`
   */
  without(...exclude: (keyof ElementProps)[]): StringKeyObject {
    const newProps: StringKeyObject = {};

    for (const propKey in this.props) {
      if (!exclude.includes(propKey)) {
        newProps[propKey] = this.props[propKey];
      }
    }

    return newProps;
  }
}
