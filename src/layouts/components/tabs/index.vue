<template>
    <el-tabs
        v-model="activeName"
        closable
        type="card"
        @tab-click="handlePath"
        @tab-remove="removeTab"
    >
        <el-tab-pane
            v-for="item in tabsStore.tabs"
            :key="item.id"
            :label="item.title"
            :name="item.path"
        />
    </el-tabs>
</template>

<script lang="ts" setup>
import {RouteLocationNormalizedLoaded, useRouter} from "vue-router";
import {TabsPaneContext} from "element-plus";
import {onMounted, ref, watch} from "vue";
import {useTabsStore} from "@/store/modules/tab";

const router = useRouter();
const tabsStore = useTabsStore();

const activeName = ref(router.currentRoute.value.path);

function init() {
    tabsStore.getCacheTabs()
}

init();

// 监听路由变化
watch(
    () => router.currentRoute.value.path,
    (path) => {
        tabsStore.addTab(
            router.currentRoute.value as unknown as RouteLocationNormalizedLoaded
        );
        activeName.value = path;
    }
);

onMounted(() => {
    // 刷新页面弹窗
    window.addEventListener('beforeunload', (evt) => {
        // evt.preventDefault();
        tabsStore.setCacheTabs();
    });
    tabsStore.initHomeTab()
})

// 切换tab
const handlePath = ({paneName}: TabsPaneContext) => {
    if (!paneName) return;
    router.push(paneName.toString());
};

// 关闭tab
const removeTab = (id: string) => {
    tabsStore.removeTab(id);
};
</script>
