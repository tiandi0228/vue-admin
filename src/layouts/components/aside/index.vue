<template>
    <div
        :style="{ width: !expand ? '300px' : '60px' }"
        class="h-full bg-[#545c64] shadow-lg"
    >
        <div class="flex items-center p-4">
            <el-image
                class="w-16 h-8"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            />
            <span v-if="!expand" class="pl-4 text-xl text-white">管理系统</span>
        </div>
        <el-menu
            :collapse="expand"
            active-text-color="#ffd04b"
            class="h-full"
            default-active="1"
            text-color="#fff"
            @select="handleSelect"
        >
            <el-menu-item v-for="item in menus" :key="item.path" :index="item.path">
                <el-icon>
                    <component :is="item.icon"/>
                </el-icon>
                <template #title> {{ item.title }}</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import {HomeFilled, PieChart, Setting} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {MenuState} from "@/store/interface";
import {shallowRef} from "vue";

defineProps({
    expand: {
        type: Boolean,
        default: false,
    },
});

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
        title: "设置",
        path: "/settings",
        icon: Setting,
    },
]);

const handleSelect = (key: string) => {
    router.push(key);
};
</script>
