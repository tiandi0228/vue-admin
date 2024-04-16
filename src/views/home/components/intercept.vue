<template>
    <div class="border rounded-md s-shadow bg-white p-4">
        <div class="text-base">拦截情况</div>
        <div id="intercept-container" class="mt-4"></div>
    </div>
</template>

<script lang="ts" setup>

import {Chart} from '@antv/g2'

import {onMounted} from 'vue';

const data = [
    {month: 'Jan', value: 151},
    {month: 'Feb', value: 291},
    {month: 'Mar', value: 134},
    {month: 'Apr', value: 347},
    {month: 'May', value: 263},
    {month: 'June', value: 158},
    {month: 'July', value: 356},
    {month: 'Aug', value: 277},
    {month: 'Sep', value: 199},
    {month: 'Oct', value: 106},
    {month: 'Nov', value: 288},
    {month: 'Dec', value: 256},
];

onMounted(() => {
    const chart = new Chart({
        container: 'intercept-container',
        autoFit: true,
        height: 194,
    });

    chart.data(data);

    chart
        .line()
        .encode('x', 'month')
        .encode('y', 'value')
        .encode('key', 'month')
        .axis('y', {
            title: false,
            label: false,
            tick: false
        })
        .axis('x', {
            title: false,
            label: false,
            tick: false
        })
        .encode('shape', 'smooth')
        .animate('enter', {type: 'fadeIn'})
        .style({'stroke': '#0fc6c2', 'lineWidth': 5})
        .tooltip({
            title: () => '拦截情况',
            items: [{channel: 'x'}, {channel: 'y'}],
        });

    chart.render();
})


</script>