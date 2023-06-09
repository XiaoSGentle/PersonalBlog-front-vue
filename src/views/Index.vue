<template>
    <div>
        <el-container>
            <!-- 头 -->
            <el-header>
                <Header></Header>
            </el-header>
            <!--主题 -->
            <div>
                <el-main min-h100vh>
                    <router-view v-slot="{ Component }" style="background-color: var(--el-color-white);">
                        <transition name="fade">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </el-main>
                <Footer></Footer>
            </div>
        </el-container>
    </div>
</template>

<script setup>
import Header from '../components/header/Header.vue'
import Footer from '../components/footer/Footer.vue';

</script>

<style>
.el-main {
    margin: 0;
    padding: 0;
}
</style>