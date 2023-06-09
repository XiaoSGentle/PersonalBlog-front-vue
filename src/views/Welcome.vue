<template>
    <div>
        <!--  背景 -->
        <div class="main-box" :style="{ backgroundImage: 'url(' + homeIndex.banner.bgImg + ')' }" relative>
            <div absolute class="left-50% top-50% translate-x--50% translate-y--50% " h90 w180>
                <div flex justify-center>
                    <el-avatar :size="100" :src="homeIndex.banner.avatar" />
                </div>
                <div text-white text-center text-11>{{ homeIndex.banner.name }}</div>
                <div text-white text-center text-5 mt3> <span v-html="homeIndex.banner.motto"></span> </div>
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
                    <div text-white text-8> {{ homeIndex.proverb1.content }}</div>
                    <div text-white text-right text-6>————{{ homeIndex.proverb1.author }}</div>
                    <div text-white class="detial" mt3>
                        <div>
                            <p> {{ homeIndex.proverb1.des }}
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
                        <p>{{ homeIndex.proverb2.content }}</p>
                        <p>{{ homeIndex.proverb2.desc }}</p>

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
                        <el-card v-for="(    item, index    ) in      homeIndex.note1    " :key="index" h70 w130 m4
                            bg-warmgray :body-style="{ padding: '0px' }">
                            <div flex bg-gray-3 @click="goNoteDetial(item.uuid)">
                                <div>
                                    <img class="h60 w85" :src="item.banner" alt="">
                                </div>

                                <div p1>
                                    <div h6 overflow-hidden text-clip mt45>
                                        <el-tag v-for="(    tag, index    ) in     item.tags.split(',')    " effect="dark"
                                            :type="tagsTypes[index]" round ml1>
                                            {{ tag }}
                                        </el-tag>
                                    </div>
                                    <div text-3 mt3>{{ item.updateTime }}</div>
                                </div>
                            </div>
                            <div flex justify-between m1>
                                <div text-5 font-bold>{{ item.title }}</div>
                                <div mt--1>
                                    <el-button text>
                                        <el-icon>
                                            <View />
                                        </el-icon>
                                        <span>{{ item.readNum }}人浏览</span>
                                    </el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-card>
            </div>
            <!-- 三等分部分 -->
            <div flex justify-center>
                <div class="w-300 " flex flex-wrap justify-center>
                    <el-card v-for="(    item, index    ) in     homeIndex.note2    " :key="index" h110 w90 m4 bg-warmgray
                        :body-style="{ padding: '0px' }">
                        <div @click="goNoteDetial(item.uuid)">
                            <!-- 图片 -->
                            <img :src="item.banner" class="image w-100%" h70 />
                            <!-- 描述 -->
                            <div style="padding: 14px">
                                <span text-5 font-bold>{{ item.title }}</span>
                                <div class="bottom">
                                    <span>{{ item.createTime }}</span>
                                    <el-button text>
                                        <el-icon>
                                            <View />
                                        </el-icon>
                                        <span>{{ item.readNum }}人浏览</span>
                                    </el-button>
                                </div>
                            </div>
                            <!-- 文章底部标签 -->
                            <div p2 style="">
                                <el-tag v-for="(    tag, index    ) in     item.tags.split(',')    " effect="dark"
                                    :type="tagsTypes[index]" round ml1>
                                    {{ tag }}
                                </el-tag>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getHome } from '../api/home';
import { useRouter } from 'vue-router';

const router = useRouter()

const homeIndex = ref({
    banner: {},
    proverb1: {},
    proverb2: {},
    note1: [],
    note2: [],
})
// tags样式
const tagsTypes = ref(['success', 'danger', 'warning', 'info'])
onMounted(() => {
    getHome().then(res => {
        homeIndex.value = res.data
    })
})

const goNoteDetial = param => {
    router.push('/noteView/' + param)
}

</script>

<style scoped>
.main-box {
    height: 100vh;
    width: 100vw;
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