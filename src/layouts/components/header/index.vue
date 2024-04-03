<template>
    <div class="w-full h-12 px-4 bg-white border-b shadow-sm flex items-center justify-between">
        <div>
            <el-icon size="30" color="#666" @click="onExpand">
                <template v-if="!isExpand">
                    <Fold />
                </template>
                <template v-else>
                    <Expand />
                </template>
            </el-icon>
        </div>
        <div class="flex items-center">
            <el-avatar :size="30" :src="avatar" />
            <span class="ml-2">{{ username }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import { ref, computed } from 'vue';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const avatar = computed(() => userStore.userInfo.avatar)
const username = computed(() => userStore.userInfo.username)

const emit = defineEmits(['expand'])

const isExpand = ref(false)

const onExpand = () => {
    isExpand.value = !isExpand.value
    emit('expand', isExpand.value)
}
</script>