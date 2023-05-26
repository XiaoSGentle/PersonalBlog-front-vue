<template>
    <div ease-in-out>
        <div>
            <div
                :style="{ backgroundImage: 'url(' + backImg + ')', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', height: height + 'px' }">
                <div w100vw class="message-top-bg-mask" relative>
                    <div absolute class="top-50% left-50% translate-x--50% translate-y--50%">
                        <div font-bold text-white text-9 text-center flex justify-center>
                            <div mt2>
                                <el-icon>
                                    <component :is="icon"></component>
                                </el-icon>
                            </div>
                            <span> {{ title }}</span>
                        </div>
                        <div font-bold text-white text-4 text-center mt4 v-for="( item, index ) in  content " :key="index">
                            {{ item }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue'
// 声明组件的参数
const props = defineProps({
    height: {

        type: Number,
        default: 400,
    },
    backImg: {
        type: String,
        default: 'https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/top-bg.png'
    },
    icon: {
        type: String,
        default: 'Search'
    },
    title: {
        type: String,
        default: '标题',
    },
    content: {
        type: Array,
        default: [
            '第一行文字',
            '第二行文字'
        ]
    }
})
// 解构出参数
const { height, backImg, icon, title, content } = toRefs(props)


</script>

<style scoped> .message-top-bg {
     background-size: 100% 100%;
     background-repeat: no-repeat;
 }

 .message-top-bg-mask {
     height: 100%;
     width: 100%;
     background: rgba(0, 0, 0, .4);

 }
</style>    