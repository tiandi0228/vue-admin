<template>
    <div class="bg-white s-shadow p-4 rounded-sm">
        <div id="container"></div>
    </div>
</template>

<script lang="ts" name="large-screen" setup>
import {onMounted} from "vue";

import {useWindowSize} from '@/hooks'
import {Chart} from "@antv/g2";

const {width, sideWidth} = useWindowSize()

let chart: Chart = null as any

const data = [
    {letter: "A", frequency: 0.08167},
    {letter: "B", frequency: 0.01492},
    {letter: "C", frequency: 0.02782},
    {letter: "D", frequency: 0.04253},
    {letter: "E", frequency: 0.12702},
    {letter: "F", frequency: 0.02288},
    {letter: "G", frequency: 0.02015},
    {letter: "H", frequency: 0.06094},
    {letter: "I", frequency: 0.06966},
    {letter: "J", frequency: 0.00153},
    {letter: "K", frequency: 0.00772},
    {letter: "L", frequency: 0.04025},
    {letter: "M", frequency: 0.02406},
    {letter: "N", frequency: 0.06749},
    {letter: "O", frequency: 0.07507},
    {letter: "P", frequency: 0.01929},
    {letter: "Q", frequency: 0.00095},
    {letter: "R", frequency: 0.05987},
    {letter: "S", frequency: 0.06327},
    {letter: "T", frequency: 0.09056},
    {letter: "U", frequency: 0.02758},
    {letter: "V", frequency: 0.00978},
    {letter: "W", frequency: 0.0236},
    {letter: "X", frequency: 0.0015},
    {letter: "Y", frequency: 0.01974},
    {letter: "Z", frequency: 0.00074},
]

window.addEventListener('resize', () => {
    setTimeout(() => {
        getChart();
    }, 100)
})

onMounted(() => {
    getChart(true);
})

const getChart = (init: boolean = false) => {
    chart = new Chart({
        container: 'container',
        autoFit: true,
        width: init ? 0 : width.value - (sideWidth.value + 90),
    });

    chart
        .interval()
        .style('fill', '#0fc6c2')
        .data(data)
        .encode('x', 'letter')
        .encode('y', 'frequency')
        .axis('y', {
            title: false,
        })
        .axis('x', {
            title: false,
        });

    chart.render();
}
</script>

