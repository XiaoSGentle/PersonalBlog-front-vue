<template>
    <div>
        <!--top banner -->
        <TopBanner v-bind="childProps"></TopBanner>
        <!-- body -->
        <div w100vw flex justify-center>
            <div class="w70%">
                <el-divider border-style="dashed" />
                <!-- 留言框 -->
                <div flex justify-center>
                    <el-card class="w70%">
                        <div>
                            <div class="w-100%">
                                <div flex mb2 mt2>
                                    <el-input placeholder="昵称" v-model="addMesParam.name"></el-input>

                                    <el-input placeholder="输入QQ可自动获取头像哦🕯️" v-model="qqNumber">
                                        <template #append>
                                            <el-avatar :size="30" :src="addMesParam.avatar" />
                                        </template>
                                    </el-input>
                                </div>
                                <el-input :rows="10" type="textarea" v-model="addMesParam.content"
                                    placeholder="在这里写下您想对我说的话或者对本网站的建议..." />
                                <div mt2 flex justify-end>
                                    <el-button @click="addMes" size="small" round plain w-40>
                                        <el-icon :size="15">
                                            <Message />
                                        </el-icon>
                                        <span text-4>留言</span>
                                    </el-button>
                                </div>
                            </div>

                        </div>
                    </el-card>
                </div>

                <el-divider border-style="dashed" />
                <!--历史留言 -->
                <div mb10>
                    <div flex justify-center>
                        <el-card p5 class="w-70%">
                            <!-- 顶部总条数 -->
                            <div text-left text-black font-bold text-6>{{ mesList.totalRows }}条留言</div>
                            <!-- 留言主题 -->
                            <div mt10>
                                <div v-for="(item, index) in mesList.data" :key="index">
                                    <div flex>
                                        <!-- 头像 -->
                                        <div>
                                            <el-avatar :size="50" :src="item.avatar" />
                                        </div>
                                        <!-- 具体信息 -->
                                        <div class="w100%" ml5>
                                            <div h50px text-4>
                                                <!--名称 浏览器ip 操作系统  -->
                                                <div flex text-coolGray leading-6>
                                                    <p text-blue text-5>{{ item.name }}</p>
                                                    <p ml3>
                                                        <span>{{ item.browser }} </span>
                                                        <span ml1>{{ item.ip }}</span>
                                                    </p>
                                                    <p ml4>{{ item.system }}</p>
                                                </div>
                                                <div flex justify-between mt2>
                                                    <!-- 日期 -->
                                                    <div text-coolGray>{{ item.createTime }}</div>
                                                    <!-- 回复按钮 -->
                                                    <div>
                                                        <el-link type="danger">
                                                            回复
                                                        </el-link>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- content -->
                                            <div mt7>
                                                {{ item.content }}
                                            </div>
                                        </div>
                                    </div>
                                    <el-divider />
                                </div>
                            </div>
                            <!-- TODO: 英文???? -->
                            <!-- 分页控制 -->
                            <div flex justify-center>
                                <el-pagination v-model:current-page="pageParm.pageNum" v-model:page-size="pageParm.pageSize"
                                    :page-sizes="[5, 10, 20, 50]" background layout="prev, pager, next"
                                    :total="mesList.totalRows" @size-change="getMes" @current-change="getMes" />
                            </div>
                        </el-card>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { addMessage, getMessage } from '../api/message';
import TopBanner from '../components/topBanner/index.vue';
// banner的参数定义
const childProps = ref({
    height: 370,
    backImg: 'https:xiaos-1314769426.cos.ap-nanjing.myqcloud.com/msg-top-bg.png',
    icon: 'Promotion',
    title: '留言板',
    content: [
        '在这里您可以写下你想对我说的话,或者对本网站有什么好的建议。',
        '我会认真看完每条留言。期待与您的邂逅。',
    ]
})

// 获取留言部分
const mesList = ref({})
// 分页参数
const pageParm = ref({
    pageNum: 1,
    pageSize: 10
})
onMounted(() => {
    getMes()
})
const getMes = () => getMessage(pageParm.value).then(res => {
    mesList.value = res.data;
})

// 添加留言
const addMesParam = ref({
    name: '',
    content: '',
    isVisitor: 1,
    avatar: ''
})

// QQ获取头像部分
const qqNumber = ref('')
watch(qqNumber, (newValue, oldValue) => {
    addMesParam.value.avatar = 'http://q1.qlogo.cn/g?b=qq&nk=' + newValue + '&s=100'
})
// 添加留言方法
const addMes = () => {
    addMessage(addMesParam.value).then(res => {
        if (res.status === 200) {
            ElMessage.success("留言成功!感谢您的留言!😁")
            getMes()
        } else {
            ElMessage.error('留言失败!联系管理员😑')
        }
    })
}


</script>

<style scoped>
.message-top-bg {
    background-size: cover;
}

.message-top-bg-mask {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .4);

}
</style>