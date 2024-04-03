<template>
    <el-tabs v-model="activeName" type="card" closable @tab-click="handlePath" @tab-remove="removeTab">
        <el-tab-pane v-for="item in tabs" :key="item.path" :label="item.title" :name="item.path" />
    </el-tabs>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { TabsPaneContext } from 'element-plus';
import { ref, watch } from 'vue';

const router = useRouter();

const tabs = ref([
    {
        title: '首页',
        path: '/home'
    },
    {
        title: '设置',
        path: '/settings'
    },
])
const activeName = ref(router.currentRoute.value.path)

// 监听路由变化
watch(
    () => router.currentRoute.value.path,
    (path) => {
        activeName.value = path
    })

// 切换tab
const handlePath = ({ paneName }: TabsPaneContext) => {
    console.log(paneName)
    if (!paneName) return
    router.push(paneName.toString())
}

// 关闭tab
const removeTab = (targetName: string) => {
    if (targetName === '/home') return
    tabs.value = tabs.value.filter(item => item.path !== targetName)
    router.push(tabs.value[tabs.value.length - 1].path)
}
</script>