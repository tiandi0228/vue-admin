<template>
    <div
        class="aside-bg w-60 h-full px-4 select-none"
    >
        <div class="flex items-center p-4">
            <el-image
                class="w-16 h-8"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            />
            <span class="pl-4">管理系统</span>
        </div>
        <el-menu
            :default-active="active"
            :router="true"
            active-text-color="#fff"
            class="h-full"
            @select="handleSelect"
        >
            <template v-for="item in menus" :key="item.path">
                <template v-if="item.children">
                    <el-sub-menu :index="item.path">
                        <template #title>
                            <el-icon size="20">
                                <component :is="item.icon"/>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item
                            v-for="child in item.children"
                            :key="child.path"
                            :index="child.path"
                        >
                            <span :class="child.path === active ? 'dot-active' : ''"
                                  class="w-1.5 h-1.5 rounded-full mr-2 bg-black"/>
                            <template #title>{{ child.title }}</template>
                        </el-menu-item>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path">
                        <el-icon size="20">
                            <component :is="item.icon"/>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import {HomeFilled, PieChart, ScaleToOriginal, Setting, User, VideoCameraFilled} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {MenuState} from "@/store/interface";
import {onMounted, ref, shallowRef, watch} from "vue";

const router = useRouter();
const menus = shallowRef<MenuState[]>([
        {
            title: "首页",
            path: "/home",
            icon: HomeFilled,
        },
        {
            title: "大屏数据",
            path: "/large-screen",
            icon: PieChart,
        },
        {
            title: "视频",
            path: "/video",
            icon: VideoCameraFilled,
        },
        {
            title: "表格",
            path: "/table",
            icon: ScaleToOriginal,
        },
        {
            title: "权限管理",
            path: "/permission",
            icon: User,
            children: [
                {
                    title: "用户管理",
                    path: "/permission/user-management"
                }
            ]
        },
        {
            title: "设置",
            path: "/settings",
            icon: Setting
        },
    ])
;
const active = ref('/home')

// 监听路由变化
watch(
    () => router.currentRoute.value.path,
    (path) => {
        active.value = path;
    }
);

onMounted(() => {
    active.value = router.currentRoute.value.path;
})

const handleSelect = (key: string) => {
    router.push(key);
};
</script>
