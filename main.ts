import { Plugin } from 'obsidian';
import { AIChatView, VIEW_TYPE_AI_CHAT } from 'src/AIChatView';
import { type AIPluginSettings, DEFAULT_SETTINGS, AIPluginSettingTab } from 'src/AIPluginSettings';

export default class AIPlugin extends Plugin {
	settings!: AIPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(VIEW_TYPE_AI_CHAT, leaf => new AIChatView(leaf, this));

		this.addRibbonIcon('lines-of-text', 'AI Chat', () => {
			this.activateView();
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AIPluginSettingTab(this.app, this));
	}

	async activateView() {
		const { workspace } = this.app;
		const leaf = workspace.getLeaf(true);
		await leaf.setViewState({
			type: VIEW_TYPE_AI_CHAT,
			active: true
		});
		workspace.revealLeaf(leaf); // Maybe unnecessary
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
