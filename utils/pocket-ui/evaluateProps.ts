type PropUpdater<Return> = (value: any) => Return;

type PropEvaluationOptions<NativeProps, CustomProps> = {
  nativeOverrides: {
    [key in keyof NativeProps]: PropUpdater<NativeProps[key]>;
  };
  customOverrides: {
    [key in keyof CustomProps]: PropUpdater<undefined>;
  };
  scope?: { [key: string]: any };
};

const evaluateProps = <Props, NativeProps, CustomProps>(
  props: Props,
  options?: PropEvaluationOptions<NativeProps, CustomProps>
): Props => {
  return props;
};

export default evaluateProps;
