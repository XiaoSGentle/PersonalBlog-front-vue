<template>
    <!--  背景 -->
    <div class="main-box" style="background-image: url('https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/bg.jpg');"
        relative>
        <div absolute class="left-50% top-50% translate-x--50% translate-y--50% " h90 w180>
            <div flex justify-center>
                <el-avatar :size="100"
                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9680744091%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669972191&t=c7190a3e0f6ba96cf7ceb5c4ca9435e4" />
            </div>
            <div text-white text-center text-11>Xiaos</div>
            <div text-white text-center text-5 mt3>勤于实践 勇于创新</div>
            <div text-white text-center text-5 mt3>忠于事业 信于社会</div>
            <div flex justify-center mt3>·
                <el-button size="large" round plain w-50>
                    <el-icon :size="20">
                        <Bottom />
                    </el-icon>
                    <span text-4>开始阅读</span>

                </el-button>
            </div>
        </div>
    </div>
    <!-- 正文主体 -->
    <div flex justify-center mt10>
        <div>
            <div class="text-box" h90 w180 bg-gray>
                <div text-white text-8> 学而不思则罔，思而不学则殆 </div>
                <div text-white text-right text-6>————孔子</div>
                <div text-white class="detial" mt3>
                    <div>
                        <p> 这句话为孔子所提倡的一种读书及学习方法。指的是一味读书而不思考，就会因为不能深刻理解书本的意义而不能合理有效利用书本的知识，甚至会陷入迷茫。而如果一味空想而不去进行实实在在地学习和钻研，则终究是沙上建塔，一无所得。告诫我们只有把学习和思考结合起来，才能学到切实有用的知识，否则就会收效甚微。
                        </p>
                    </div>
                </div>
            </div>
            <!-- 自已 -->
            <div class="text-box-bottom" h90 w180 bg-white mt10>
                <div text-gray text-8 text-center leading-10>
                    <el-icon style="vertical-align: middle" :size="34">
                        <Sunny />
                    </el-icon>
                    <span>自己·理想</span>
                </div>
            </div>
        </div>
    </div>
    <!-- 文章推荐 -->
    <div mt10>
        <!-- 标题部分 -->
        <div text-center text-10 font-bold class="">
            <el-icon>
                <Reading />
            </el-icon>
            <div>文章推荐</div>
        </div>
        <!-- 二等分部分 -->
        <div flex justify-center>
            <el-card mt5>
                <div class="w-300 " flex flex-wrap justify-center>
                    <el-card v-for="(item, index) in 6" :key="index" h80 w130 m4 bg-warmgray></el-card>
                </div>
            </el-card>
        </div>
        <!-- 三等分部分 -->
        <div flex justify-center>、
            <div class="w-300 " flex flex-wrap justify-center>
                <el-card v-for="(item, index) in 9" :key="index" h80 w90 m4 bg-warmgray></el-card>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {

})


</script>

<style scoped>
.main-box {
    height: 100vh;
    width: 100vw;
    /* background: url('http:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/bg.jpg'); */
    background-size: cover;
}

.text-box {
    border: 1px solid white;
    border-radius: 1rem;
    padding: 3rem;
}

.text-box-bottom {
    border: 2px solid #9ca3af;
    border-radius: 1rem;
    padding: 3rem;
}

.detial {
    border: 1px solid white;
    border-radius: 1rem;
    padding: 1rem;
}
</style>