<template>
    <div>
        <el-menu :ellipsis='false' mode="horizontal" router default-active='/welcome'>
            <div ml40></div>
            <el-menu-item>
                <div text-7 text-gray font-bold>Xiaos | 个人博客</div>
            </el-menu-item>
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
            <div p3>
                <el-input size="large" placeholder="输入内容以搜索" :suffix-icon="Search" />
            </div>

            <div mr40></div>
        </el-menu>
    </div>
</template>


<script setup>
import { Search } from '@element-plus/icons-vue'
</script>
<style scoped></style>