<template>
    <div class="p-4 border rounded-md s-shadow bg-white">
        <div class="text-base">趋势</div>
        <div id="container" class="w-full mt-4"></div>
    </div>
</template>

<script lang="ts" setup>
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
    getChart();
});

const getChart = () => {
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

    chart.point().style('fill', '#0fc6c2').encode('color', '#0fc6c2').style('lineWidth', 2).tooltip(false);

    chart.render();
}
</script>
