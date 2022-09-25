import type { Themes } from './types'

export const COMMAND_DESC = 'in the active pane'

/**
 * Toggle or activate theme labels
 * - Toggle theme
 * - Activate dark mode
 * - Activate light mode
 */
export const getToggleThemeLabel = (theme?: Themes) =>
	`${theme ? `Activate ${theme} mode` : 'Toggle theme'}`
