import { ItemView, WorkspaceLeaf } from 'obsidian';

import type AIPlugin from 'main';

import Root from './Root.svelte';
import { plugin } from './stores';

export const VIEW_TYPE_AI_CHAT = 'ai-chat-view';

export class AIChatView extends ItemView {
	component!: Root;

	constructor(leaf: WorkspaceLeaf, public plugin: AIPlugin) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_AI_CHAT;
	}

	getDisplayText(): string {
		return 'AI Chat View';
	}

	async onOpen() {
		plugin.set(this.plugin);

		this.component = new Root({
			target: this.contentEl
		});
	}

	async onClose() {
		console.log('Closing AI Chat View');
		this.component.$destroy();
	}
}
