<script lang="ts" name="video" setup>
import {ref} from 'vue'

interface VideoState {
    url: string
}

const img = ref<string[]>([])
const selIndex = ref<number>(0)

const onchange = async (e: any) => {
    const file = e.target?.files[0]
    for (let i = 0; i < 10; i++) {
        const res: VideoState = await captureFrame(file, i)
        if (!res) return
        img.value.push(res?.url)
    }
}

const onChangeIndex = (index: number) => {
    selIndex.value = index
}

function captureFrame(videoFile: any, time = 0): Promise<VideoState> {
    if (!videoFile) return videoFile
    return new Promise((resolve) => {
        const vdo = document.createElement('video');
        vdo.currentTime = time;
        vdo.muted = true;
        vdo.autoplay = true;
        vdo.src = URL.createObjectURL(videoFile);
        // 当video开始播放创建canvas
        vdo.oncanplay = () => {
            const cvs = document.createElement('canvas');
            cvs.width = vdo.videoWidth;
            cvs.height = vdo.videoHeight;
            const ctx = cvs.getContext('2d');
            ctx?.drawImage(vdo, 0, 0, cvs.width, cvs.height);
            cvs.toBlob((blob) => {
                if (!blob) return
                const url = URL.createObjectURL(blob);
                const data: VideoState = {
                    url
                }
                resolve(data);
            });
        }
    })
}
</script>

<template>
    <div>
        <p>请先上传一个MP4格式的视频</p>
        <input id="ip" accept=".mp4" type="file" @change="onchange"/>
        <div v-show="img.length" class="mt-2 flex justify-center">
            <img :src="img[selIndex]" alt="" class="w-80 h-72"/>
        </div>
        <div class="flex items-center justify-center mt-2">
            <template v-for="(item, index) in img" key="item">
                <img :class="selIndex === index ? 'border border-red-600 border-4' : ''" :src="item" alt=""
                     class="w-20 h-20 mx-1"
                     @click="onChangeIndex(index)"/>
            </template>
        </div>
    </div>
</template>