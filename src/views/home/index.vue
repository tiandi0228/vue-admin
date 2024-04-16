<template>
    <el-row :gutter="16">
        <el-col :span="8">
            <div class="border p-4 rounded-md s-shadow bg-white">
                <el-statistic :value="98500">
                    <template #title>
                        <div class="pb-3 text-base text-gray-400">
                            总销量
                        </div>
                    </template>
                </el-statistic>
                <div class="flex items-center pt-3  text-sm">
                    <span>相比上月</span>
                    <span class="flex items-center text-green-600 pl-1">
                        24%
                        <el-icon>
                            <CaretTop/>
                        </el-icon>
                    </span>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="border p-4 rounded-md s-shadow bg-white">
                <el-statistic :value="693700">
                    <template #title>
                        <div class="pb-3 text-base text-gray-400">
                            活跃用户
                        </div>
                    </template>
                </el-statistic>
                <div class="flex items-center pt-3  text-sm">
                    <span>相比上月</span>
                    <span class="text-red-600">
                        12%
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="border p-4 rounded-md s-shadow bg-white">
                <el-statistic :value="72000">
                    <template #title>
                        <div class="pb-3 text-base text-gray-400">
                            总成交
                        </div>
                    </template>
                </el-statistic>
                <div class="flex items-center pt-3 text-sm">
                    <span>相比上月</span>
                    <span class="flex items-center text-green-600 pl-1">
                        16%
                        <el-icon>
                            <CaretTop/>
                        </el-icon>
                    </span>
                </div>
            </div>
        </el-col>
    </el-row>
    <div class="mt-4">
        <el-row :gutter="16">
            <el-col :span="16">
                <Trend/>
            </el-col>
            <el-col :span="8">
                <div>
                    <Access/>
                </div>
                <div class="mt-4">
                    <Intercept/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" name="home" setup>
import {CaretBottom, CaretTop,} from '@element-plus/icons-vue'
import Trend from './components/trend.vue'
import Access from './components/access.vue'
import Intercept from './components/intercept.vue'
</script>