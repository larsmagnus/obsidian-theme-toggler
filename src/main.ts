import { Plugin, WorkspaceLeaf } from 'obsidian'
import {
	getIconSize,
	getButtonIcon,
	removeAllViewActionsButtons,
} from './utils'
import {
	PLUGIN_ID,
	PLUGIN_CLASS_NAME,
	PLUGIN_MODES,
	DEFAULT_SETTINGS,
} from './constants'
import { getToggleThemeLabel } from './lang'

import type { ThemeToggleSettings, Themes, ButtonBase } from './types'

export default class ThemeToggler extends Plugin {
	settings!: ThemeToggleSettings

	/**
	 * Adds the button to the panel and sets up the click event
	 * @param viewActions
	 * @param button
	 */
	addButtonToViewActions(viewActions: Element, button: ButtonBase) {
		const { id, icon, name } = button
		const iconSize = getIconSize()
		const classNames = ['view-action', 'clickable-icon', PLUGIN_CLASS_NAME]
		const buttonIcon = getButtonIcon(name, id, icon, iconSize, classNames)
		const pluginId = this.manifest.id

		viewActions.prepend(buttonIcon)

		/**
		 * Ensure the pane is activated when clicked,
		 * to not execute commands on the previously active pane.
		 */
		this.registerDomEvent(buttonIcon, 'mousedown', (evt) => {
			if (evt.button === 0) {
				setTimeout(() => {
					this.app.commands.executeCommandById(`${pluginId}:${id}`)
				}, 5) // use a timeout of 5 for slow devices
			}
		})
	}

	addButtonToLeaf(leaf: WorkspaceLeaf, button: ButtonBase) {
		const activeLeaf = leaf?.view.containerEl
		const viewActions = activeLeaf?.getElementsByClassName('view-actions')[0]

		// Panes without viewActions are skipped
		if (!viewActions) return

		// Remove any existing element
		viewActions
			.getElementsByClassName(`view-action page-header-button ${button.id}`)[0]
			?.detach()

		this.addButtonToViewActions(viewActions, button)
	}

	addButtonToAllLeaves() {
		app.workspace.iterateAllLeaves((leaf) =>
			this.addButtonToLeaf(leaf, this.settings.buttonSettings)
		)
		app.workspace.onLayoutChange()
	}

	setThemeForLeaf(leaf: any, theme: Themes) {
		const previousTheme = theme === 'light' ? 'dark' : 'light'

		leaf.classList.remove(`theme-${previousTheme}`)
		leaf.classList.add(`theme-${theme}`)
	}

	// Apply saved/persisted theme to all leaves
	setThemeForAllLeaves() {
		if (this.settings.leafSettings.length > 0) {
			this.settings.leafSettings.forEach(({ id, theme }) => {
				const leaf = this.app.workspace.getLeafById(id)?.view.containerEl

				this.setThemeForLeaf(leaf, theme)
			})
		}
	}

	updateSavedLeaf(leaf: any, theme: Themes) {
		const savedLeaf = this.settings.leafSettings.find((x) => x.id === leaf.id)
		const newLeaf = { id: leaf.id, theme }

		if (!savedLeaf) {
			this.settings.leafSettings.push(newLeaf)
		} else {
			this.settings.leafSettings = [
				...this.settings.leafSettings.filter((x) => x.id !== leaf.id),
				newLeaf,
			]
		}
	}

	getThemeFromNode(el: HTMLElement) {
		const nodeClassNames = Array.from(el.classList)
		const themeClassName = nodeClassNames.filter((className) =>
			className.includes('theme')
		)[0]
		const currentTheme = themeClassName.includes('dark') ? 'dark' : 'light'

		return currentTheme
	}

	toggleTheme(theme?: Themes) {
		const leaf = this.app.workspace.getMostRecentLeaf() as any
		const activeLeaf = leaf?.view.containerEl
		const leafTheme = this.getThemeFromNode(activeLeaf)
		const inactiveTheme = leafTheme === 'light' ? 'dark' : 'light'
		const nextTheme = theme || inactiveTheme

		this.setThemeForLeaf(activeLeaf, nextTheme)
		this.updateSavedLeaf(leaf, nextTheme)
		this.saveSettings()
	}

	async onload() {
		console.log(`${this.manifest.name} Plugin loaded.`)

		PLUGIN_MODES.forEach((mode: Themes) => {
			this.addCommand({
				id: `${PLUGIN_ID}${mode ? `-${mode}` : ''}`,
				name: getToggleThemeLabel(mode),
				callback: () => this.toggleTheme(mode),
			})
		})

		await this.loadSettings()

		this.app.workspace.onLayoutReady(() => {
			this.addButtonToAllLeaves()
			this.setThemeForAllLeaves()
		})
	}

	async onunload() {
		console.log(`${this.manifest.name} Plugin unloaded.`)

		removeAllViewActionsButtons()
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())

		// Default theme for the entire application
		if (!this.settings.appTheme) {
			this.settings.appTheme = this.getThemeFromNode(document.body)
		}
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}
}
