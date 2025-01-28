/**
 * @author William J. Horn
 *
 * `Props` class will wrap around a provided object of component
 * properties, appending a useful API to manipulate those properties.
 */
import type { StringKeyObject } from "@/types/util";
import ObjectQuery from "./ObjectQuery";

/**
 * `Props` will accept an object of properties and the resultant instance
 * provides an API for interacting with and manipulating those properties.
 */
export default class Props<
  ElementProps extends StringKeyObject
> extends ObjectQuery<ElementProps> {
  public custom: ObjectQuery<ElementProps>;
  public native: ObjectQuery<ElementProps>;

  constructor(props: ElementProps) {
    super(props);
    this.custom = new ObjectQuery<ElementProps>();
    this.native = new ObjectQuery<ElementProps>();
  }
}
