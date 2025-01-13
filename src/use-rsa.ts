import { ZodError } from "zod";
import { ActionPropsCallback } from "./types";
import React from "react";

export const useAction = <
  T extends (...args: any[]) => Promise<any>,
  Input extends Parameters<T>[0],
  Output extends Awaited<ReturnType<T>>
>(
  action: T,
  callback?: ActionPropsCallback<Input, Output>
) => {
  const [status, setStatus] = React.useState<
    "idle" | "executing" | "error" | "success"
  >("idle");

  const reset = React.useCallback(() => {
    setStatus("idle");
  }, []);

  const execute = React.useCallback(
    async (payload: Parameters<T>[0]) => {
      try {
        setStatus("executing");
        const res = await action(payload);
        callback?.onSuccess?.(res);
        setStatus("success");
      } catch (error) {
        const errors = { request: {}, validation: {} };
        if (error instanceof ZodError && "issues" in error) {
          error.issues.map((issue) => {
            errors.validation[issue.path.join(".")] = issue.message;
          });
        } else {
          errors.request = error?.message
            ? { message: error.message, ...error }
            : error;
        }
        callback?.onError?.({
          error: errors,
          input: payload
        });
        setStatus("error");
      }
    },
    [action, callback]
  );

  return { execute, status, loading: status === "executing", reset };
};
