# Nissan Example - SvelteKit Project

A modern web application built with [SvelteKit](https://kit.svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/), showcasing a responsive and performant web experience powered by [`sv`](https://github.com/sveltejs/cli).

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

```sh
# Install dependencies
npm install
```

### Development

Start a local development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

The application will be available at `http://localhost:5173` by default.

## 🏗️ Project Structure

```
src/
├── routes/          # Page routes and API endpoints
├── components/      # Reusable Svelte components
├── lib/            # Utility functions and helpers
└── app.html        # Root HTML template
static/
├── assets/         # Images and static assets
└── banners/        # Banner assets
```

## 🛠️ Development Tools

- **Check Types**: Validate TypeScript and Svelte components
  ```sh
  npm run check
  ```

- **Watch Mode**: Continuous type checking while developing
  ```sh
  npm run check:watch
  ```

## 📦 Building for Production

Create an optimized production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## 🌐 Deployment

To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment. The project uses `@sveltejs/adapter-auto` which automatically selects the best adapter based on your deployment platform.

## 📚 Tech Stack

- **Frontend Framework**: [SvelteKit 2.50.2](https://kit.svelte.dev/)
- **Styling**: [Tailwind CSS 4.1.18](https://tailwindcss.com/)
- **Language**: [TypeScript 5.9.3](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 7.3.1](https://vitejs.dev/)
- **Component Framework**: [Svelte 5.54.0](https://svelte.dev/)

## 🔧 Configuration

This project was created with the following configuration:

```sh
npx sv@0.13.0 create --template minimal --types ts --add tailwindcss="plugins:none" --install npm project-sv
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run check` | Type check all files |
| `npm run check:watch` | Type check with watch mode |

## 🤝 Contributing

When making changes:

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run check` to ensure type safety
4. Commit and push your changes
5. Create a pull request

## 📄 License

This project is private. For more information, contact the project maintainers.

## 🔗 Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
