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
    <div class="border rounded-md s-shadow mt-4 bg-white">
        <div class="p-4 text-base">趋势</div>
        <div id="container" class="w-full mt-4"></div>
    </div>
</template>

<script lang="ts" name="home" setup>
import {CaretBottom, CaretTop,} from '@element-plus/icons-vue'
import {Chart} from '@antv/g2'
import {onMounted} from 'vue';

const data = [
    {year: '1991', value: 3},
    {year: '1992', value: 4},
    {year: '1993', value: 3.5},
    {year: '1994', value: 5},
    {year: '1995', value: 4.9},
    {year: '1996', value: 6},
    {year: '1997', value: 7},
    {year: '1998', value: 9},
    {year: '1999', value: 13},
];

onMounted(() => {
    getChart(true);
});

const getChart = (init: boolean = false) => {
    const chart = new Chart({
        container: 'container',
        autoFit: true
    });

    chart
        .data(data)
        .style('fill', '#0fc6c2')
        .encode('x', 'year')
        .encode('y', 'value')
        .axis('y', {
            title: false,
        })
        .axis('x', {
            title: false,
        })
        .scale('x', {
            range: [0, 1],
        })
        .scale('y', {
            domainMin: 0,
            nice: true,
        });

    chart
        .line()
        .style('stroke', '#0fc6c2')
        .label({
            text: 'value',
            style: {
                dx: -10,
                dy: -12,
            },
        });

    chart.point().style('fill', 'white').tooltip(false);

    chart.render();
}

</script>