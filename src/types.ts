export interface ActionPropsCallback<Input extends object, Output> {
  onSuccess?: (data: Output) => void;
  onError?: (response: {
    error: { request: any; validation: any };
    input: Input;
  }) => void;
}
