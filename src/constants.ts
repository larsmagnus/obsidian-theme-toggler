import type { ThemeToggleSettings } from './types'
import { getToggleThemeLabel } from './lang'
import { PluginThemesEnum } from './PluginThemesEnum'

export const PLUGIN_ID = 'theme-toggle'
export const PLUGIN_CLASS_NAME = `${PLUGIN_ID}-button`

/**
 * All the available color themes
 */
export const PLUGIN_MODES = [
	null,
	PluginThemesEnum.Light,
	PluginThemesEnum.Dark,
]

/**
 * Base settings for the button that's added to the panel
 */
export const BUTTON_SETTINGS = {
	id: PLUGIN_ID,
	icon: 'any-key',
	name: getToggleThemeLabel(),
}

/**
 * All persisted settings
 */
export const DEFAULT_SETTINGS: ThemeToggleSettings = {
	leafSettings: [],
}
