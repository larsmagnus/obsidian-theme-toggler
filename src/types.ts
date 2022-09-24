declare module 'obsidian' {
	interface App {
		commands: {
			executeCommandById: any
		}
	}

	interface Workspace {
		onLayoutChange(): void
	}
}

export interface ButtonBase {
	id: string
	icon: string
	name: string
}

export type Themes = 'light' | 'dark' | null

export interface ThemeToggleSettings {
	buttonSettings: ButtonBase
	leafSettings: LeafSettings[]
	appTheme: Themes
}

interface LeafSettings {
	id: string // leaf.id
	theme: Themes
}
