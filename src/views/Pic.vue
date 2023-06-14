<template>
    <div>
        <!-- 顶部banner -->
        <TopBanner v-bind="childProps" />
        <div class="w-90%" ma p5>
            <div pt pb>
                <div flex justify-center>
                    <div text-center>
                        <div><img :src="borderList[0]" alt=""></div>
                        <div text-10 font-bold>探寻味蕾的极致享受</div>
                        <div><img :src="borderList[1]" alt=""></div>
                        <p p3>在这个美食的世界里，我总是追寻着那些让味蕾陶醉的绝妙滋味。</p>
                        <p p3>今天的探险带我来到了一家隐匿于城市角落的小餐馆，那里蕴藏着令人心驰神往的美食宝藏。</p>
                    </div>
                </div>
                <div flex justify-center>
                    <div h450px flex overflow-hidden>
                        <img ml3 v-for="(item, index) in imgList2" :key="index" :src="item">
                    </div>
                </div>
            </div>
            <el-divider />
            <div mt mb>
                <div flex justify-center>
                    <div text-center>
                        <div><img :src="borderList[2]" alt=""></div>
                        <div ml7 text-10 font-bold>与自然融为一体的奇妙之旅</div>
                        <div ml16><img :src="borderList[3]" alt=""></div>
                        <p p3>每个人都有自己独特的故事，而我选择将我的故事记录在这。</p>
                        <p p3>这是一段属于我的旅程，一次关于内心自由的探寻之旅。</p>
                    </div>
                </div>
                <div flex justify-center>
                    <div h450px flex overflow-hidden>
                        <img h100 ml1 v-for="(item, index) in imgList1" :key="index" :src="item">
                    </div>
                </div>
            </div>
            <el-divider />
            <div>
                <div flex justify-center>
                    <div text-center>
                        <div><img :src="borderList[4]" alt=""></div>
                        <div text-10 font-bold>探寻内心的自由之旅</div>
                        <div><img :src="borderList[5]" alt=""></div>
                        <p p3>在这个与自然交融的奇妙之旅中，我感受到了大自然的力量和它对我内心的触动。</p>
                        <p p3>这里的风景让我心灵得到了洗涤，每一步都是对美的追寻。这片仙境带给我平静和愉悦，让我对生活充满了无限的热爱。</p>
                    </div>
                </div>
                <div flex justify-center>
                    <div h450px flex overflow-hidden>
                        <img ml3 v-for="(item, index) in imgList2" :key="index" :src="item">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import TopBanner from '../components/topBanner/index.vue'


// banner部分
const childProps = ref({})
import { getBanner } from '../api/admin/banner'
import { BannerEnums } from '../enum/Enum'
const getTopBanner = () => {
    getBanner(BannerEnums.PIC).then(res => {
        childProps.value = res.data
    })
}
onMounted(() => {
    getTopBanner()
})


const imgList1 = ref([
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/1.jpg',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/2.jpg',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/3.jpg',
])
const imgList2 = ref([
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/pic-1-1.jpg',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/pic-1-2.jpg',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/pic-1-3.jpg',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/pic-1-4.jpg',

])

const borderList = ref([
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16861216430645.png',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16861216926685.png',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16861217155090.png',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16861217324997.png',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16861224426733.png',
    'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16861224645976.png'

])
</script>


<style scoped></style>