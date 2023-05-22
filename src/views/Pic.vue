<template>
    <div>
        <!-- 顶部banner -->
        <TopBanner title='图集' icon='Camera' back-img='https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/top-bg.png'
            :height="400" :content="['这里承载了我的所有回忆,记录着我的点点滴滴.', '珍惜当下、热爱、感悟...']">
        </TopBanner>

        <!-- 主体 -->
        <div flex justify-center>

            <div w-75vw>
                <div mt50 flex justify-center>
                    <div h400px w100>
                        <div text-gray text-8 font-bold text-center>平江路</div>
                        <div>

                        </div>
                    </div>
                    <div ml2rem h450px flex overflow-hidden class="model1">
                        <img v-for="(item, index) in imgList2" :key="index" :src="item" alt="" class="m1-img1">
                    </div>
                </div>

                <div mt50 flex justify-center>
                    <div class="model2">
                        <img v-for="(item, index) in imgList1" :key="index" :src="item" alt="" class="m1-img1">
                    </div>
                    <div h400px w100 ml10>
                        <div text-gray text-8 font-bold text-center>平江路</div>
                        <div>
                            <p mt5 indent-8 tracking-wide leading-7 text-5 font-bold text-dark>我沿着平江路漫步，感受到了这个古老街区的独特魅力
                                。走在这条狭窄而曲折的街道上，我仿佛穿越到了几百年前的苏州城。沿途有许多保存完好的明清建筑，
                                这些古老的建筑物透露着历史的沉淀和文化的底蕴，让我感到无比震撼。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import TopBanner from '../components/topBanner/index.vue'
const imgList1 = ref([
    'https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/1.jpg',
    'https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/2.jpg',
    'https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/3.jpg',
])
const imgList2 = ref([
    'http://hbimg.huaban.com/6217561037505aa7e1081f0c7bf724a873d52543221426-XALAwm',
    'http://hbimg.huaban.com/119bfe5d3a057f1ee8187162159166e8ae81933512ef37-neYyED',
    'http://hbimg.huaban.com/e093b02a947209339962ad04244b581c291181d423458-GlBzh1',
    'http://hbimg.huaban.com/f81e779c082841c04b6e44a1a06dceda5a18f772c4d20-tG8U1M'
])
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


 .model1 img {
     margin-left: -2rem;
     height: 450px;
     clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
 }

 .model2 img {
     /* margin-left: -2rem; */
     height: 250px;
     width: 250px;
     clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
 }
</style>