import {MenuState} from "@/store/interface";
import {RouteRecordRaw} from "vue-router";

// 合并成一个新的tabs
export function getAllTabs(tabs: MenuState[], homeTab: MenuState) {
	if (!homeTab.id) return [];
	const filterTabs = tabs.filter(item => item.id !== homeTab.id)
	return [homeTab, ...filterTabs]
}

// 查找首页
export function findHomepage(arr: RouteRecordRaw[]): MenuState | undefined {
	for (const item of arr) {
		if (item.meta?.isHome) return {
			id: item.path,
			path: item.path,
			title: item.meta.title as string,
		};
		const tab: MenuState | undefined = findHomepage(item.children ?? [])
		if (tab) return tab
	}
}