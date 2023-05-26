<template>
    <div>

        <!-- body -->
        <div w100vw flex justify-center>
            <div mt class="w600 h84vh">
                <!-- 留言框 -->
                <div flex justify-center>

                    <el-card class="w70%">
                        <div h70vh overflow-auto>
                            <div mt2 v-for="item in queList">
                                <div :style="{ marginTop: `2rem` }" v-if="item.role === 'user'" text-right>
                                    <span bg-blue text-white text-5 p2 rounded>{{ item.message }}</span>
                                </div>
                                <div v-if="item.role === 'rebot'">
                                    <div text-5 p2 rounded>
                                        <div class="w70%">
                                            <v-md-editor v-bind="toolbar" v-model="item.message"> </v-md-editor>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="w-100%">
                                <div></div>
                                <div mt2 flex justify-end>
                                    <el-input v-model="reqParam.prompt" class="w-50 m-2" placeholder="请输入您的问题..."
                                        @keyup.enter="getAns" :suffix-icon="Search" />
                                </div>
                            </div>

                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
// import { askQue } from '../api/ChatGpt';
const toolbar = ref({
    mode: 'preview',
})
const reqParam = ref({
    prompt: '',
    options: {
        parentMessageId: 'chatcmpl-7KGQ60AvcOsDQsN9x69ceZS9ayA1m'
    },
    systemMessage: `You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully.Respond using markdown.`,
    temperature: 2.0,
    top_p: 1
})

const queList = ref([{ role: 'rebot', message: `# 😁😁😁你好 \n :::tip    \n 请问有什么需要我帮您的？ \n:::` }])

const getAns = async () => {

    queList.value.push({ role: 'user', message: reqParam.value.prompt })
    queList.value.push({ role: 'rebot', message: '# 😑😑😑抱歉 \n :::danger    \n 暂时还需要完善,请耐心等待哦！ \n:::' })


    // askQue(reqParam.value).then(res => {
    //     const responseText = new TextDecoder().decode(res.data);
    //     // TODO:
    //     console.log(responseText);
    // })

    reqParam.value.prompt = ''

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