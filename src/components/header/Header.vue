<template>
    <div>
        <el-menu :ellipsis='false' mode="horizontal" router default-active='/welcome'>
            <div ml40></div>
            <el-menu-item>
                <div text-7 font-serif font-bold>Xiaos | 个人博客</div>

            </el-menu-item>
            <div p3>
                <el-input size="" placeholder="输入内容以搜索" :suffix-icon="Search" />
            </div>
            <div class="flex-grow"></div>
            <el-menu-item index="/welcome">
                <el-icon>
                    <House />
                </el-icon>
                <span>主页</span>
            </el-menu-item>
            <el-menu-item index="/pic">
                <el-icon>
                    <Picture />
                </el-icon>
                <span>图集</span>
            </el-menu-item>
            <el-menu-item index="/note">
                <el-icon>
                    <EditPen />
                </el-icon>
                <span>笔记</span>
            </el-menu-item>
            <el-menu-item index="/message">
                <el-icon>
                    <ChatLineRound />
                </el-icon>
                <span>留言</span>
            </el-menu-item>
            <el-menu-item index="/chatGpt">
                <el-icon>
                    <Service />
                </el-icon>
                <span>ChatGPT</span>
            </el-menu-item>
            <el-menu-item index="/aboutme">
                <el-icon>
                    <User />
                </el-icon>
                <span>关于</span>
            </el-menu-item>
            <el-menu-item index="">
                <div w2></div>
            </el-menu-item>
            <el-menu-item @click="drawerVisible = !drawerVisible">
                <el-avatar ml1 :size="40" :src="storeInfo.userInfo.avatar" />
                <span font-bold ml3>{{ storeInfo.isLogin ? '@' + storeInfo.userInfo.nickname + ' 欢迎回来~' : '登录' }}</span>
            </el-menu-item>
            <div mr20></div>
        </el-menu>
    </div>

    <el-drawer v-model="drawerVisible" title="🚀 Xiaos | Blog" :with-header="true" size="400">
        <PerInfo @changeTag="changeTag" v-if="showTagIndex === 1"></PerInfo>
        <RegisterFrom @changeTag="changeTag" v-if="showTagIndex === 2"></RegisterFrom>
        <LoginFrom @changeTag="changeTag" v-if="showTagIndex === 3"></LoginFrom>
    </el-drawer>
</template>


<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import LoginFrom from '../login/login.vue';
import PerInfo from '../login/perInfo.vue';
import RegisterFrom from '../login/register.vue';

const drawerVisible = ref(true)
const store = useStore()
// 定义显示的页面标记
const showTagIndex = ref(3)
const changeTag = (value) => {
    showTagIndex.value = value
}
// 改变抽屉是否显示
const changeDrawerVisible = () => {
    drawerVisible.value = !drawerVisible.value
}
// store中的信息
const storeInfo = ref({})
storeInfo.value = store.state

if (storeInfo.value.isLogin) {
    drawerVisible.value = false
    showTagIndex.value = 1
}

</script>
<style scoped></style>