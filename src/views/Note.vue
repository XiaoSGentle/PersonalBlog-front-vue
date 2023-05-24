<template>
    <div>
        <!-- 顶部banner -->
        <TopBanner v-bind="childProps"></TopBanner>
        <div flex justify-center mt4>
            <div w60>
                <el-card>
                    <div text-7 flex>
                        <div mt1>
                            <el-icon>
                                <Flag />
                            </el-icon>
                        </div>
                        <span>全部分类</span>
                    </div>
                    <el-checkbox-group v-model="selectClassify">
                        <el-checkbox class="w100%" mt3 v-for="(item, index) in items" :label="item.label" size="large"
                            border />
                    </el-checkbox-group>
                </el-card>

            </div>
            <!-- Tags部分 -->
            <div>
                <!-- 三等分部分 -->
                <div flex justify-center>
                    <div w-300 flex flex-wrap justify-center>
                        <div class="w-100%" pl7 pr7>
                            <el-card>
                                <el-input size="large" :prefix-icon="Search" placeholder="搜索你想要的文章...">
                                    <template #append>
                                        <el-button w30>搜索</el-button>
                                    </template>
                                </el-input>

                            </el-card>
                        </div>
                        <el-card v-for="(item, index) in 9" :key="index" w90 m4 :body-style="{ padding: '0px' }">
                            <!-- 图片 -->
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                class="image w-100%" h70 />
                            <!-- 描述 -->
                            <div style="padding: 14px">
                                <span text-5 font-bold>Yummy hamburger</span>
                                <div class="bottom">
                                    <span>2021-09-01</span>
                                    <el-button text>
                                        <el-icon>
                                            <View />
                                        </el-icon>
                                        <span>102人浏览</span>
                                    </el-button>
                                </div>

                            </div>
                            <!-- 文章底部标签 -->
                            <div p2 style="">
                                <el-tag v-for="item in tags" :key="item.label" :type="item.type" class="mx-1" effect="dark"
                                    round>
                                    {{ item.label }}
                                </el-tag>
                            </div>

                        </el-card>
                    </div>
                </div>
                <!-- 底部分页 -->
                <div flex justify-center p5>
                    <el-pagination v-model:current-page="pageParm.pageNum" v-model:page-size="pageParm.pageSize"
                        :page-sizes="[5, 10, 20, 50]" background layout="prev, pager, next" :total="mesList.totalRows"
                        @size-change="getMes" @current-change="getMes" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TopBanner from '../components/topBanner/index.vue';
import { addMessage, getMessage } from '../api/message';
import { Search } from '@element-plus/icons-vue'
// banner的参数定义
const childProps = ref({
    height: 450,
    backImg: 'https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/note-banner-bg.jpg',
    icon: 'Notebook',
    title: '笔记',
    content: [
        '闲言碎语,日常牢骚,学习记录...',
        '既是过往,也是回忆',
    ]
})

// tags数据模拟1
const items = ref([
    { type: '', label: 'JavaScript', num: 19 },
    { type: 'success', label: 'Java', num: 10 },
    { type: 'info', label: 'SpringBoot', num: 9 },
    { type: 'danger', label: 'Unity', num: 7 },
    { type: 'warning', label: 'Vue', num: 21 },
    { type: '', label: 'JavaScript', num: 19 },
    { type: 'success', label: 'Java', num: 10 },
    { type: 'info', label: 'SpringBoot', num: 9 },
    { type: 'danger', label: 'Unity', num: 7 },
    { type: 'warning', label: 'Vue', num: 21 },
    { type: '', label: 'JavaScript', num: 19 },
    { type: 'success', label: 'Java', num: 10 },
    { type: 'info', label: 'SpringBoot', num: 9 },
    { type: 'danger', label: 'Unity', num: 7 },
    { type: 'warning', label: 'Vue', num: 21 },
    { type: '', label: 'JavaScript', num: 19 },
    { type: 'success', label: 'Java', num: 10 },
    { type: 'info', label: 'SpringBoot', num: 9 },
])

// TODO:模拟测试数据需要添加  tags数据模拟1
const tags = ref([
    { type: 'warning', label: '教程' },
    { type: 'warning', label: '心得' },
    { type: 'warning', label: 'DeBug' },
    { type: 'warning', label: 'Linux' },

])

const selectClassify = ref([])

// 111
const mesList = ref({})
// 111
const pageParm = ref({
    pageNum: 1,
    pageSize: 5
})
onMounted(() => {
    getMes()
})
const getMes = () => getMessage(pageParm.value).then(res => {
    mesList.value = res.data;
})
</script>


<style scoped>
.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>