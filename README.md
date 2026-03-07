# @priyanshu1812/headless-kit

A production-ready headless React component library focused on accessibility, composability, and developer experience.

## Features

- 🧩 **Compound Component Pattern**: Highly composable API.
- ♿ **Accessible**: Follows W3C ARIA guidelines (focus management, keyboard support, ARIA attributes).
- 🎨 **Headless**: No enforced styling. Use Tailwind CSS, CSS-in-JS, or plain CSS.
- 🚀 **Performance**: Tree-shakable, small bundle size, ESM + CJS builds.
- 📘 **TypeScript**: First-class TypeScript support with full typings.

## Components Included

1.  **Dialog (Modal)**: Accessible popup with focus trapping and portal rendering.
2.  **Dropdown Menu**: Menu with keyboard navigation and typeahead support.
3.  **Tabs**: Tabbed interface with automatic/manual activation.
4.  **Accordion**: Expandable sections with single/multiple modes.

## Installation

```bash
npm install @priyanshu1812/headless-kit
```

## Usage Example (Tailwind CSS)

```tsx
import { Dialog } from "@priyanshu1812/headless-kit";

function App() {
  return (
    <Dialog>
      <Dialog.Trigger className="rounded bg-blue-500 px-4 py-2 text-white">
        Open Modal
      </Dialog.Trigger>
      <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <Dialog.Title className="text-xl font-bold">Hello World</Dialog.Title>
          <p className="mt-2 text-gray-600">This is a headless dialog.</p>
          <Dialog.Close className="mt-4 text-blue-500 underline">Close</Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
```

## Development and Testing

### Example Application

I have included a live example dashboard that uses all components in a real-world scenario (styled with Tailwind CSS).

To run the example app:
1.  Navigate to the example directory: `cd example`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

### Storybook

View component documentation and interact with variants:
```bash
npm run storybook
```

### Testing

Run Cypress component tests:
```bash
npx cypress run --component
```

### Building

Build the library for production (outputs to `dist/`):
```bash
npm run build
```

## Architecture

The library is built using:
- **React Context**: For state management across compound components.
- **Compound Component Pattern**: For maximum flexibility and clear structure.
- **Vite & vite-plugin-dts**: For fast builds and automatic declaration generation.

## Accessibility

Each component implements:
- **Keyboard Navigation**: Arrow keys, Enter, Space, Escape, Tab.
- **Focus Management**: Focus trapping and restoration.
- **ARIA Attributes**: Proper roles and states (aria-expanded, aria-controls, etc.).
