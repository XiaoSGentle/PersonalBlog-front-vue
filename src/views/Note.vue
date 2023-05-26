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
                        <el-checkbox class="w100%" mt3 v-for="(item, index) in noteClassifty" :label="item.classifyName"
                            :value="item.uuid" size="large" border />
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

                        <el-card @click="alert('fuck')" v-for="(item, index) in noteList.data" :key="index" w90 m4
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
                                    <el-tag v-for="item in tags" :key="item.label" :type="item.type" class="mx-1"
                                        effect="dark" round>
                                        {{ item.label }}
                                    </el-tag>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
                <!-- 底部分页 -->
                <div flex justify-center p5>
                    <el-pagination v-model:current-page="pageParm.pageNum" v-model:page-size="pageParm.pageSize"
                        :page-sizes="[5, 10, 20, 50]" background layout="prev, pager, next" :total="noteList.totalRows"
                        @size-change="getNote" @current-change="getNote" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAllNote, getAllNoteClassify } from '../api/note';
import TopBanner from '../components/topBanner/index.vue';


const router = useRouter()
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
const noteClassifty = ref([

])

// TODO:模拟测试数据需要添加  tags数据模拟1
const tags = ref([
    { type: 'warning', label: '教程' },
    { type: 'warning', label: '心得' },
    { type: 'warning', label: 'DeBug' },
    { type: 'warning', label: 'Linux' },

])

const goNoteDetial = param => {
    router.push('/noteView/' + param)
}


const selectClassify = ref([])
// 111
const noteList = ref({})
// 111
const pageParm = ref({
    pageNum: 1,
    pageSize: 9
})
onMounted(() => {
    getNote()
    getAllNoteClassify().then(res => {
        noteClassifty.value = res.data
    })
})
const getNote = () => getAllNote(pageParm.value).then(res => {
    noteList.value = res.data;
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