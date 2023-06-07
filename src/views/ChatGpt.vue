<template>
    <div>
        <div>
            <div mt class="h84vh">
                <!-- 留言框 -->
                <div flex justify-center>

                    <div class="w70%" :body-style="{ padding: '0px' }">
                        <div h70vh overflow-auto>
                            <div mt2 v-for="item in queList">
                                <!-- 用户的回答 -->
                                <div bg-gray-1>
                                    <div ml50 mr50 v-if="item.role === 'user'" flex>
                                        <div mt35px ml5> <el-avatar
                                                src="https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16861250659366.jpg"></el-avatar>
                                        </div>
                                        <div ml12 pt10 pb10 leading-8>{{ item.message }}</div>
                                    </div>
                                </div>
                                <!--机器人回答 -->
                                <div ml50 mr50>
                                    <div v-if="item.role === 'rebot'">
                                        <div flex>
                                            <div mt25px ml5>
                                                <ChatGpt></ChatGpt>
                                            </div>
                                            <div w90vw>
                                                <v-md-editor v-bind="toolbar" v-model="item.message"> </v-md-editor>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="w-100%">
                                <el-divider></el-divider>
                                <div ml50 mr50>
                                    <el-input size="large" v-model="reqParam.prompt" placeholder="请输入您的问题..."
                                        @keyup.enter="getAns" :suffix-icon="Promotion" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Search, Promotion } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { askQue } from '../api/ChatGpt';
import ChatGpt from '../components/icons/ChatGpt.vue';
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

const queList = ref([
    { role: 'rebot', message: `请问有什么需要我帮您的？` },
    { role: 'user', message: `你是谁?` },
    { role: 'rebot', message: `我是ChatGpt3.5,是一个大语言模型` }
])

const getAns = async () => {

    queList.value.push({ role: 'user', message: reqParam.value.prompt })
    queList.value.push({ role: 'rebot', message: ' 暂时还需要完善,请耐心等待哦！ ' })


    askQue(reqParam.value).then(res => {
        const responseText = new TextDecoder().decode(res.data);
        // TODO:
        console.log(responseText);
    })

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