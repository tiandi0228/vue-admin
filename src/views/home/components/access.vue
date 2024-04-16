<template>
    <div class="border rounded-md s-shadow bg-white p-4">
        <div class="text-base">访问情况</div>
        <div id="access-container" class="mt-4"></div>
    </div>
</template>

<script lang="ts" setup>

import {Chart} from '@antv/g2'

import {onMounted} from 'vue';

const data = [
    {month: 'Jan', value: 51},
    {month: 'Feb', value: 91},
    {month: 'Mar', value: 34},
    {month: 'Apr', value: 47},
    {month: 'May', value: 63},
    {month: 'June', value: 58},
    {month: 'July', value: 56},
    {month: 'Aug', value: 77},
    {month: 'Sep', value: 99},
    {month: 'Oct', value: 106},
    {month: 'Nov', value: 88},
    {month: 'Dec', value: 56},
];

onMounted(() => {
    const chart = new Chart({
        container: 'access-container',
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
            title: () => '访问情况',
            items: [{channel: 'x'}, {channel: 'y'}],
        });

    chart.render();
})


</script>