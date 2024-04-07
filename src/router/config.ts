import type {RouteRecordRaw} from "vue-router";

export const constantRoutes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录",
		},
	},
	{
		path: "/layout",
		name: "layout",
		component: () => import("@/layouts/index.vue"),
		redirect: "/home",
		children: [
			{
				path: "/home",
				name: "home",
				component: () => import("@/views/home/index.vue"),
				meta: {
					title: "首页",
					isHome: true
				},
			},
			{
				path: '/large-screen',
				name: "large-screen",
				component: () => import("@/views/large-screen/index.vue"),
				meta: {
					title: "大屏数据",
				}
			},
			{
				path: '/video',
				name: "video",
				component: () => import("@/views/video/index.vue"),
				meta: {
					title: "视频",
				}
			},
			{
				path: "/settings",
				name: "settings",
				component: () => import("@/views/settings/index.vue"),
				meta: {
					title: "设置",
				},
			},
		],
	},
];
