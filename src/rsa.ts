import { z } from "zod";

class ReactSafeAction<S extends z.ZodType = z.ZodType> {
  private _schema: S | null = null;

  schema<S2 extends z.ZodType>(schema: S2) {
    return new ReactSafeAction<S2>(schema);
  }

  constructor(schema?: S) {
    if (schema) {
      this._schema = schema;
    }
  }

  action<T extends (data: S extends z.ZodType ? z.infer<S> : any) => any>(
    fn: T
  ) {
    if (this._schema) {
      return ((data: z.infer<S>) => {
        // Validate input against schema before calling the function
        const validationResult = this._schema?.safeParse(data);

        if (!validationResult?.success) {
          throw validationResult?.error;
        }

        return fn(data);
      }) as T;
    }

    return fn;
  }
}

export default ReactSafeAction;
