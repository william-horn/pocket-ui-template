/**
 * @author William J. Horn
 *
 * `Props` class will wrap around a provided object of component
 * properties, appending a useful API to manipulate those properties.
 */
import type { StringKeyObject } from "@/types/util";
import ObjectQuery from "./ObjectQuery";
import { customProps } from "../types/customProps";

const filterProps = (props: StringKeyObject) => {
  const filtered = {} as {
    native: StringKeyObject;
    custom: StringKeyObject;
  };

  filtered.custom = {};
  filtered.native = {};

  for (const propKey in props) {
    if (customProps[propKey]) {
      filtered.custom[propKey] = props[propKey];
    } else {
      filtered.native[propKey] = props[propKey];
    }
  }

  return filtered;
};

/**
 * `Props` will accept an object of properties and the resultant instance
 * provides an API for interacting with and manipulating those properties.
 */
export default class Props<
  ElementProps extends StringKeyObject,
  NativeProps extends StringKeyObject,
  CustomProps extends StringKeyObject
> {
  public custom: ObjectQuery<CustomProps>;
  public native: ObjectQuery<NativeProps>;

  constructor(props: ElementProps = {} as ElementProps) {
    const filteredProps = filterProps(props);

    this.custom = new ObjectQuery<CustomProps>(
      filteredProps.custom as CustomProps
    );

    this.native = new ObjectQuery<NativeProps>(
      filteredProps.native as NativeProps
    );
  }
}
