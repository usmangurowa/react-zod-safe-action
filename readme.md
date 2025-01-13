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
import { SafeAction } from "rsa";
import { z } from "zod";

// Define your input schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// Create a safe action
const loginAction = new SafeAction()
  .schema(loginSchema)
  .action(async (data) => {
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

### `SafeAction`

Creates a new safe action with optional schema validation.

```typescript
new SafeAction().schema(zodSchema).action((data) => Promise<Result>);
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

---

package.json:

```json
{
  "name": "rsa",
  "version": "1.0.0",
  "description": "Type-safe action handler for React applications with built-in Zod validation",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "clean": "rm -rf dist"
  },
  "keywords": [
    "react",
    "form",
    "validation",
    "zod",
    "typescript",
    "type-safe",
    "actions"
  ],
  "author": "",
  "license": "MIT",
  "peerDependencies": {
    "react": ">=16.8.0",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "tsup": "^7.0.0",
    "typescript": "^5.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/rsa.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/rsa/issues"
  },
  "homepage": "https://github.com/yourusername/rsa#readme"
}
```
