import type { ThemeToggleSettings } from './types'
import { getToggleThemeLabel } from './lang'

export const PLUGIN_ID = 'theme-toggle'
export const PLUGIN_CLASS_NAME = `${PLUGIN_ID}-button`
export const PLUGIN_MODES = [null, 'light', 'dark']

export const DEFAULT_SETTINGS: ThemeToggleSettings = {
	buttonSettings: {
		id: PLUGIN_ID,
		icon: 'any-key',
		name: getToggleThemeLabel(),
	},
	leafSettings: [],
	appTheme: null,
}
