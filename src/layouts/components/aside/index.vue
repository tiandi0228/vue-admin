<template>
    <div class="h-full bg-[#545c64] shadow-lg" :style="{ width: !expand ? '300px' : '60px' }">
        <div class="flex items-center p-4">
            <el-image class="w-16 h-8" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
            <span v-if="!expand" class="pl-4 text-xl text-white">管理系统</span>
        </div>
        <el-menu default-active="1" class="h-full" :collapse="expand" active-text-color="#ffd04b" text-color="#fff"
            @select="handleSelect">
            <el-menu-item index="/home">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <template #title>
                    首页
                </template>
            </el-menu-item>
            <el-menu-item index="/large-screen">
                <el-icon>
                    <PieChart />
                </el-icon>
                <template #title>
                    数据大屏
                </template>
            </el-menu-item>
            <el-menu-item index="/settings">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>设置</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { HomeFilled, PieChart, Setting } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
defineProps({
    expand: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()

const handleSelect = (key: string) => {
    router.push(key)
}
</script>