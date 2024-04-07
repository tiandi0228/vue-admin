import {defineStore} from "pinia";
import {RouteLocationNormalizedLoaded, Router, useRouter} from "vue-router";
import {MenuState} from "@/store/interface";
import {computed, ref} from "vue";
import {constantRoutes} from '@/router/config'
import {findHomepage, getAllTabs} from "@/store/modules/common.ts";

export const useTabsStore = defineStore("tabs", () => {

	const router: Router = useRouter()

	const tabs = ref<MenuState[]>([]);
	const activeId = ref<string>("");
	const homeTab = ref<MenuState>({
		id: '',
		path: '',
		title: '',
	});

	const all = computed(() => getAllTabs(tabs.value, homeTab.value));

	// 初始默认首页tab
	function initHomeTab() {
		homeTab.value = findHomepage(constantRoutes) as MenuState
	}

	// 添加tab
	function addTab(route: RouteLocationNormalizedLoaded): void {
		const {path, meta, query} = route;

		let id = path;

		const queryKeys = Object.keys(query);
		const qs = queryKeys.map((key) => `${key}=${query[key]}`).join("&");

		id = qs ? `${path}?${qs}` : path;

		const tab: MenuState = {
			id: id,
			path,
			title: meta.title as string,
		};

		if (!tabs.value.some((t) => t.id === id)) {
			tabs.value.push(tab);
		}

		if (tab.id) {
			activeId.value = tab.id;
		}
	}

	// 移除tab
	async function removeTab(id: string): Promise<void> {
		const isCurrentTabId = id === activeId.value;
		if (!isCurrentTabId) return;
		if (homeTab.value?.id === id) return;
		tabs.value = tabs.value.filter(item => item.id !== id);
		await router.push(tabs.value[tabs.value.length - 1].path);
	}

	// 存储在localStorage
	function setCacheTabs() {
		localStorage.setItem('tabs', JSON.stringify(tabs.value));
	}

	//
	function getCacheTabs() {
		const storageTabs = localStorage.getItem('tabs') as string
		tabs.value = JSON.parse(storageTabs);
	}

	return {
		tabs: all,
		initHomeTab,
		addTab,
		removeTab,
		setCacheTabs,
		getCacheTabs,
	};
});
