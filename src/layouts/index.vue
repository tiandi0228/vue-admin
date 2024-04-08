<template>
    <el-container class="h-screen">
        <side-menu :expand="isExpand" />
        <div class="w-full">
            <Header @expand="isExpand = $event" />
            <Tabs />
            <div class="p-4">
                <router-view v-slot="{ Component, route }">
                    <component :is="Component" :key="route.path" />
                </router-view>
            </div>
        </div>
    </el-container>
</template>

<script setup lang="ts" name="layout">
import { ref } from 'vue';

import SideMenu from './components/aside/index.vue'
import Header from './components/header/index.vue'
import Tabs from './components/tabs/index.vue'

const isExpand = ref(false)



</script>