<template>
    <div class="w-full h-16 px-6 flex items-center justify-end">
        <div class="flex items-center">
            <div class="w-8 h-8 bg-white rounded-full mr-4 flex items-center justify-center cursor-pointer">
                <el-badge :value="12">
                    <div class="w-6 h-6 flex items-center justify-center">
                        <el-icon size="16">
                            <Bell/>
                        </el-icon>
                    </div>
                </el-badge>
            </div>
            <div class="h-8 flex items-center bg-white rounded-md px-2">
                <el-avatar :size="20" :src="avatar"/>
                <span class="ml-2">{{ username }}</span>
            </div>
            <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center ml-4 cursor-pointer">
                <el-icon size="16">
                    <SwitchButton/>
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {Bell, SwitchButton} from '@element-plus/icons-vue';
import {useUserStore} from '@/store/modules/user';

const userStore = useUserStore();
const avatar = computed(() => userStore.userInfo.avatar)
const username = computed(() => userStore.userInfo.username)

</script>