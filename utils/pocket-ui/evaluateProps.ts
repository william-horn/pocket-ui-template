type PropUpdater<NativeProps> = (value: any) => any;

interface PropEvaluationOptions<NativeProps, CustomProps> {
  nativeOverrides: { [key in keyof NativeProps]: PropUpdater<NativeProps> };
  customOverrides: { [key in keyof CustomProps]: PropUpdater<NativeProps> };
}

interface PropScope {
  [key: string]: any;
}

const evaluateProps = <Props, NativeProps, CustomProps>(
  props: Props,
  options?: PropEvaluationOptions<NativeProps, CustomProps>,
  scope?: PropScope
): Props => {
  return props;
};

export default evaluateProps;
