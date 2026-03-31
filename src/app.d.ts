// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	const process: {
		cwd(): string;
	};
}

declare module 'node:fs' {
	export function statSync(path: string): {
		mtime: Date;
	};
}

declare module 'node:path' {
	export function join(...paths: string[]): string;
}

export {};
