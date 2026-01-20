# Stafplicatie UI - GitHub Copilot Instructions

## Project Overview

Stafplicatie UI is a Vue 3 web application for managing staff, volunteers, and camp year administration for Haag Uit. The application handles registrations, user management, and camp year planning with Auth0 authentication.

## Technology Stack

- **Frontend Framework**: Vue 3 with TypeScript
- **Build Tool**: Vite 7
- **State Management**: Pinia
- **Router**: Vue Router
- **Authentication**: Auth0 (@auth0/auth0-vue)
- **CSS Framework**: Tailwind CSS 4 + DaisyUI 5
- **Icons**: Lucide Vue Next
- **Internationalization**: Vue I18n
- **API Client**: OpenAPI TypeScript (@hey-api/openapi-ts)
- **Testing**: 
  - Vitest 4 for unit tests
  - Playwright for E2E tests
  - @vue/test-utils for component testing
  - jsdom for DOM simulation
- **Linting**: ESLint 9 + Oxlint
- **Type Checking**: TypeScript 5.9 with vue-tsc

## Project Structure

- `/src` - Main source code
  - `/components` - Vue components organized by feature
  - `/views` - Page-level components
  - `/stores` - Pinia stores for state management
  - `/router` - Vue Router configuration
  - `/utils` - Utility functions
  - `/client` - Generated API client from OpenAPI
  - `/haag-auth-api` - Auth API client (generated)
  - `/relations-api` - Relations/HUP API client (generated)
  - `/volunteers-api` - Volunteers API client (generated)
  - `/campyear-api` - Camp year API client (generated)
  - `/i18n` - Internationalization files
  - `/assets` - Static assets
- `/e2e` - End-to-end tests with Playwright
- `/public` - Public static files

## Coding Standards

### Vue Component Style

- **Use Composition API with `<script setup lang="ts">`** - All components use the Composition API with TypeScript
- **Use named imports** - Import Vue functions and components using named imports
- **Organize imports** - Group imports logically: Vue core, external libraries, internal modules
- **Use TypeScript** - All scripts should be TypeScript with proper type annotations
- **Props definition** - Use `defineProps<{ }>()` with TypeScript interface for type safety
- **Computed properties** - Use `computed()` for derived state
- **Lifecycle hooks** - Use Composition API lifecycle hooks (`onMounted`, `onUnmounted`, etc.)

### Component Structure Pattern

```vue
<template>
  <!-- Template content -->
</template>

<script setup lang="ts">
// 1. Imports (Vue core, libraries, local components, types)
// 2. Props definition
// 3. Reactive state with ref/reactive
// 4. Computed properties
// 5. Methods/functions
// 6. Lifecycle hooks
</script>

<style scoped>
/* Component styles */
</style>
```

### TypeScript Guidelines

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper type imports with `type` keyword: `import type { ... }`
- Avoid `any` - use proper typing or `unknown` when necessary
- Use path aliases: `@/*` maps to `./src/*`

### Naming Conventions

- **Components**: PascalCase (e.g., `PersonCard.vue`, `CampyearCard.vue`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Variables/Functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE for true constants
- **Props**: camelCase in script, kebab-case in templates
- **Events**: kebab-case

### State Management

- Use Pinia stores for shared state
- Keep component-local state with `ref()` or `reactive()`
- Use `computed()` for derived state rather than duplicating data

### Styling

- Use Tailwind CSS utility classes
- Use DaisyUI components for consistent UI
- Prefer `scoped` styles when custom CSS is needed
- Use `@apply` directive for reusable Tailwind combinations

### API Integration

- API clients are auto-generated from OpenAPI specs
- Use the generated SDK methods for API calls
- Handle errors appropriately with error states
- Show loading states during API calls using `loading` ref

### Error Handling

- Always handle API errors gracefully
- Show user-friendly error messages
- Log errors to console for debugging
- Don't crash the app on API failures

## Testing Guidelines

### Unit Tests (Vitest)

- Tests are located in `src/components/__tests__/`
- Use descriptive test names with `describe` and `it` blocks
- Mock API calls using `vi.mock()`
- Use `@vue/test-utils` for component testing
- Clean up mocks with `vi.clearAllMocks()` in `beforeEach`
- Test both success and error states
- Test loading states where applicable
- Use `mount()` for component testing
- Wait for async operations with `await wrapper.vm.$nextTick()`

### E2E Tests (Playwright)

- E2E tests are in the `/e2e` directory
- Run E2E tests with `npm run test:e2e`
- Build project first with `npm run build` before E2E tests

### Test Patterns

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Component from "../Component.vue";

vi.mock("../../../api", () => ({
  apiMethod: vi.fn(),
}));

describe("Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders properly", async () => {
    const wrapper = mount(Component);
    expect(wrapper.exists()).toBe(true);
  });
});
```

## Build and Development Commands

### Development

```bash
npm install          # Install dependencies
npm run dev          # Start development server
```

### Building

```bash
npm run build        # Type-check and build for production
npm run build-only   # Build without type checking
npm run type-check   # Run TypeScript type checking
npm run preview      # Preview production build
```

### Testing

```bash
npm run test:unit    # Run unit tests with Vitest
npm run test:e2e     # Run E2E tests with Playwright
```

### Code Quality

```bash
npm run lint         # Run all linters (oxlint + eslint)
npm run lint:oxlint  # Run oxlint
npm run lint:eslint  # Run ESLint
npm run format       # Format code with Prettier
```

### API Client Generation

```bash
npm run swagger:update      # Update all API clients from Swagger
npm run stfpl-swagger       # Update main API client
npm run ha-swagger          # Update Haag Auth API client
npm run hup-swagger         # Update relations API client
npm run volunteers-swagger  # Update volunteers API client
npm run campyear-swagger    # Update campyear API client
```

## Architectural Patterns

### Component Organization

- **Feature-based folders** - Components are organized by feature/domain (person, campyear, dashboard, etc.)
- **Shared components** - Common UI components in `/components/layout`
- **Page components** - Top-level view components in `/views`

### API Client Pattern

- Multiple API clients configured with Auth0 bearer tokens
- Clients initialized in `App.vue` after authentication
- Base URLs configured via environment variables
- Centralized error handling

### Authentication Flow

- Auth0 integration with `useAuth0()` composable
- Access tokens retrieved with `getAccessTokenSilently()`
- Tokens set on all API clients via `setConfig()`
- Loading states managed until auth and client setup complete

### State Management Pattern

- Use Pinia stores for cross-component state (e.g., `eventstream`, `toastr`)
- Keep UI state local to components when possible
- Use composables for reusable logic

## Generated Code

The following directories contain auto-generated code from OpenAPI specs and **should not be manually edited**:

- `/src/client`
- `/src/haag-auth-api`
- `/src/relations-api`
- `/src/volunteers-api`
- `/src/campyear-api`

These are ignored by ESLint (see `eslint.config.ts`).

## Environment Configuration

- `.env.example` - Example environment variables
- `.env.staging` - Staging environment configuration
- `.env.production` - Production environment configuration
- Required environment variables for API URLs:
  - `VITE_API_URL`
  - `VITE_HAAG_AUTH_API_URL`
  - `VITE_HUP_API_URL`
  - `VITE_VOLUNTEERS_API_URL`
  - `VITE_CAMPYEAR_API_URL`
  - `VITE_HUBJE_API_URL`

## Security Considerations

- Never commit secrets or API keys to the repository
- Use environment variables for sensitive configuration
- Auth0 handles authentication and token management
- Bearer tokens are automatically added to API requests
- Input validation and sanitization should be handled on both client and server

## Code Review Expectations

- Code should pass all linters (oxlint + ESLint)
- TypeScript should have no type errors
- New features should include unit tests
- Components should handle loading and error states
- Follow existing patterns and conventions
- Keep changes focused and atomic
