<template>
    <VueDragResize  v-for="item in  info"
    :isActive="true"  v-on:dragging="resize" 
    :w="item.data.width"
    :h="item.data.heiht"
    :x="item.data.axis"
    :y="item.data.ayis"
    >
    <el-popover placement="top-start" title="Title" :width="200" trigger="hover">
        <template #reference>
            <div class="bt" :style="item.style" draggable="true">
                {{ item.axis }}
            </div>
        </template>
    </el-popover>

    </VueDragResize>


</template>
<script setup>
import { ref, reactive } from 'vue'
import VueDragResize from "vue-drag-resize/src/components/vue-drag-resize.vue";
const re = [
    {
        axis: 100,
        ayis: 100,
        width:100,
        heiht:100,
        back_image: "/image/1661928324865.png"
    },
    {
        axis: 90,
        ayis: 80,
        width:100,
        heiht:100,
        back_image: "/image/1661928324865.png"
    }
]

const info = reactive(re.map((it) => {
    return {
        data: it,
        style: {
            
            "background-image": `url(${it.back_image})`
        }
    }
}))

</script>
<style scoped>
.bt {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>