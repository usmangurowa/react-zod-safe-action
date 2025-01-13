# React Safe Action (RSA)

A type-safe action handler for React applications with built-in form validation using Zod.

## Features

- 🛡️ Type-safe actions with TypeScript
- ✅ Built-in form validation using Zod
- 🎯 Simple and intuitive API
- 🔄 Handles loading and error states
- 💪 Zero dependencies (except peer dependencies)

## Installation

```bash
npm install rsa
# or
yarn add rsa
# or
pnpm add rsa
```

## Usage

### 1. Define your action

```typescript
import { ReactSafeAction } from "rsa";
import { z } from "zod";

// create a safe action and reuse anywhere
export const rsa = new ReactSafeAction();

// Define your input schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// Create a safe action
const loginAction = rsa.schema(loginSchema).action(async (data) => {
  // Your login logic here
  return { success: true };
});
```

### 2. Use the action in your component

```typescript
import { useAction } from "rsa";

function LoginForm() {
  const { execute, status, loading } = useAction(loginAction, {
    onSuccess: (data) => {
      console.log("Login successful", data);
    },
    onError: ({ error, input }) => {
      console.log("Login failed", error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    execute({
      email: "user@example.com",
      password: "password123"
    });
  };

  return <form onSubmit={handleSubmit}>{/* Your form elements */}</form>;
}
```

## API Reference

### `ReactSafeAction`

Creates a new safe action with optional schema validation.

```typescript
new ReactSafeAction().schema(zodSchema).action((data) => Promise<Result>);
```

### `useAction`

Hook to execute the safe action and manage its state.

```typescript
const {
  execute, // Function to execute the action
  status,  // 'idle' | 'executing' | 'error' | 'success'
  loading, // boolean
  reset    // Function to reset the state
} = useAction(action, {
  onSuccess?: (data: Result) => void,
  onError?: (error: {
    error: {
      validation: Record<string, string>,
      request: Record<string, string>
    },
    input: Input
  }) => void
});
```

## Error Handling

RSA provides structured error handling for both validation and request errors:

```typescript
{
  validation: { // Zod validation errors
    'field.path': 'error message'
  },
  request: {    // Other runtime errors
    'error_key': 'error message'
  }
}
```

## License

MIT
