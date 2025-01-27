/**
 * `Props` will accept an object of properties and the resultant instance
 * provides an API for interacting with and manipulating those properties.
 */
export default class Props<ElementProps> {
  private props: ElementProps;

  constructor(props: ElementProps) {
    this.props = props;
  }

  get() {
    return this.props;
  }
}
