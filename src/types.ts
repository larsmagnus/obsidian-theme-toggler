import { PluginThemeTypes } from './PluginThemesEnum'

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

export type Themes = PluginThemeTypes | null

export interface ThemeToggleSettings {
	buttonSettings: ButtonBase
	leafSettings: LeafSettings[]
}

interface LeafSettings {
	id: string // leaf.id
	theme: Themes
}
