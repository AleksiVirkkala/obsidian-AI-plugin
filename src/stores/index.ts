import { writable } from 'svelte/store';

import type AIPlugin from 'main';

export const plugin = writable<AIPlugin>();
