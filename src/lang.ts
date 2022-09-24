import type { Themes } from './types'

export const getToggleThemeLabel = (theme?: Themes) =>
	`Toggle ${theme ? `${theme} ` : ''}theme`
