<template>
    <div>
        <el-menu :ellipsis='false' mode="horizontal" router default-active='/welcome'>
            <div ml40></div>
            <el-menu-item>
                <div text-7 text-gray font-bold>Xiaos | 个人博客</div>

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
                <el-avatar ml1 :size="40" :src="circleUrl" />
                <span ml3>登录</span>
            </el-menu-item>
            <div mr20></div>
        </el-menu>
    </div>

    <el-drawer v-model="drawerVisible" :with-header="true" size="400">
        <PerInfo></PerInfo>
    </el-drawer>
</template>


<script setup>
import { Search } from '@element-plus/icons-vue'
import PerInfo from '../login/perInfo.vue'
import RegisterFrom from '../login/register.vue'
import { ref } from 'vue';
const drawerVisible = ref(true)
</script>
<style scoped></style>