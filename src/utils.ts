import { Platform, setIcon } from 'obsidian'
import { PLUGIN_CLASS_NAME } from './constants'

function getTooltip(name: string) {
	if (name.includes(':')) {
		return name.split(':')[1].trim()
	} else {
		return name
	}
}

export function getIconSize() {
	const iconSize = Platform.isDesktop ? 18 : 24

	return iconSize
}

export function removeElements(element: HTMLCollectionOf<Element>): void {
	for (let i = element.length; i >= 0; i--) {
		if (element[i]) {
			element[i].remove()
		}
	}
}

export function removeAllViewActionsButtons() {
	const activeLeaves: HTMLElement[] = []

	app.workspace.iterateAllLeaves((leaf) => {
		activeLeaves.push(leaf.view.containerEl)
	})

	for (let i = 0; i < activeLeaves.length; i++) {
		const leaf = activeLeaves[i]
		const element = leaf.getElementsByClassName(PLUGIN_CLASS_NAME)

		if (element.length > 0) {
			removeElements(element)
		}
	}
}

export function getButtonIcon(
	name: string,
	id: string,
	icon: string,
	iconSize: number,
	classNames: string[],
	tag: 'a' | 'div' = 'a'
) {
	const tooltip = getTooltip(name)
	const buttonClasses = classNames.concat([id])

	const buttonIcon = createEl(tag, {
		cls: buttonClasses,
		attr: { 'aria-label-position': 'bottom', 'aria-label': tooltip },
	})

	setIcon(buttonIcon, icon, iconSize)

	return buttonIcon
}
