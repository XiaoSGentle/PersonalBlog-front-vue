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
                    <el-radio-group @change="radioGroupChange" v-model="selectRadioGroup">
                        <el-radio class="w-50" mt3 v-for="(item, index) in noteClassiftys" :label="item.classifyName"
                            size="large" border />
                    </el-radio-group>
                </el-card>
            </div>
            <!-- Tags部分 -->
            <div>
                <!-- 三等分部分 -->
                <div min-h160 flex justify-center>
                    <div w-300 flex flex-wrap justify-center>
                        <div class="w-100%" pl7 pr7>
                            <el-card>
                                <el-input size="large" v-model="searchParm.keyword" placeholder="搜索你想要的文章...">
                                </el-input>
                            </el-card>
                        </div>

                        <el-card v-for="(item, index) in noteList.data" :key="index" w90 m4
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
                                    <el-tag v-for="(tag, index) in item.tags.split(',')" effect="dark"
                                        :type="tagsTypes[index]" round ml1>
                                        {{ tag }}
                                    </el-tag>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
                <!-- 底部分页 -->
                <div flex justify-center p5>
                    <el-pagination v-model:current-page="searchParm.pageNum" v-model:page-size="searchParm.pageSize"
                        :page-sizes="[5, 10, 20, 50]" background layout="pager" :total="noteList.totalRows"
                        @size-change="getNote" @current-change="getNote" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getAllNote, getAllNoteClassify } from '../api/note';
import TopBanner from '../components/topBanner/index.vue';


const router = useRouter()
// banner的参数定义
const childProps = ref({
    height: 370,
    backImg: 'https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/note-banner-bg.jpg',
    icon: 'Notebook',
    title: '笔记',
    content: [
        '闲言碎语,日常牢骚,学习记录...',
        '既是过往,也是回忆',
    ]
})

// 笔记分类
const noteClassiftys = ref([
    {
        uuid: '',
        classifyName: '',
        num: 0
    }
])

// tags样式
const tagsTypes = ref(['success', 'danger', 'warning', 'info'])

const goNoteDetial = param => {
    router.push('/noteView/' + param)
}
x
// 查询的条件
const searchParm = ref({
    pageNum: 1,
    pageSize: 6,
    keyword: '',
    classfiyUuids: '',
})
onMounted(() => {
    getNote()
    getAllNoteClassify().then(res => {
        noteClassiftys.value = res.data
    })
})

// 笔记分类选择事件
const radioGroupChange = value => {
    noteClassiftys.value.forEach(noteClassiftys => {
        if (value === noteClassiftys.classifyName) {
            searchParm.value.classfiyUuids = noteClassiftys.uuid
        }
    });
}
// 前端显示定义
const selectRadioGroup = ref();

// 获取笔记
const getNote = () => {
    getAllNote(searchParm.value).then(res => {
        noteList.value = res.data;
    })
}

watch(searchParm, () => getNote(), { deep: true })

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