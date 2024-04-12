<template>
    <div class="h-screen flex">
        <side-menu/>
        <div class="flex-1">
            <Header/>
            <Tabs/>
            <div class="px-6 pb-4">
                <router-view v-slot="{ Component, route }">
                    <component :is="Component" :key="route.path"/>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" name="layout" setup>

import SideMenu from './components/aside/index.vue'
import Header from './components/header/index.vue'
import Tabs from './components/tabs/index.vue'
</script>