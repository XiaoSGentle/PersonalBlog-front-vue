<template>
    <div class="common-layout">
        <el-header bg-amber-3>
            <div flex justify-between>
                <div leading-15 font-mono>
                    <span text-9>Xiaos | Personal Blog</span>
                    <span ml3> the department of management</span>
                </div>
                <div leading-15>
                    <el-button @click="goBackHome" type="primary" round>返回个人博客</el-button>
                </div>

            </div>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '200px'" duration-400 ease-in-out>
                <el-menu h93vh router :collapse="isCollapse" default-active="/admin/statistical">
                    <!-- 侧边栏控制按钮 -->
                    <div @click="isCollapse = !isCollapse" duration-400 ease-in-out hover:bg-gray-2
                        :style="{ width: isCollapse ? ' 64px' : '200px' }">
                        <div p4 font-bold style="border-bottom: 1px solid rgb(121, 121, 121);" duration-400 ease-in-out>
                            <!-- 展开时 -->
                            <div flex leading-8 v-if="!isCollapse">
                                <el-icon size="30">
                                    <DArrowLeft />
                                </el-icon>
                                <div ml text-5>收起</div>
                            </div>
                            <!--收起时 -->
                            <div leading-4>
                                <el-icon size="30" v-if="isCollapse">
                                    <DArrowRight />
                                </el-icon>
                            </div>
                        </div>

                    </div>
                    <!-- 导航主体 -->
                    <el-menu-item index="/admin/statistical">
                        <el-icon>
                            <PieChart />
                        </el-icon>
                        <template #title>每日统计</template>
                    </el-menu-item>
                    <el-menu-item index="/admin/home">
                        <el-icon>
                            <House />
                        </el-icon>
                        <template #title>主页管理</template>
                    </el-menu-item>
                    <el-menu-item index="/admin/pic">
                        <el-icon>
                            <Picture />
                        </el-icon>
                        <template #title>图集管理</template>
                    </el-menu-item>
                    <el-menu-item index="/admin/note">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <template #title>笔记管理</template>
                    </el-menu-item>
                    <el-menu-item index="/admin/message">
                        <el-icon>
                            <ChatLineRound />
                        </el-icon>
                        <template #title>留言管理</template>
                    </el-menu-item>
                    <el-menu-item index="/admin/log">
                        <el-icon>
                            <Memo />
                        </el-icon>
                        <template #title>日志管理</template>
                    </el-menu-item>
                    <el-menu-item index="/admin/setting">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>系统设置</template>
                    </el-menu-item>
                    <div class="flex-grow"></div>
                </el-menu>
            </el-aside>
            <el-main>
                <div class="w90%" ma>
                    <router-view min-h90vh overflow-auto v-slot="{ Component }"
                        style="background-color: var(--el-color-white);">
                        <transition name="fade">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';



const isCollapse = ref(true)

const router = useRouter()

const goBackHome = () => { router.push('/') }

</script>


<style scoped>
.el-main {
    padding: 0;
    margin: 0;
}
</style>