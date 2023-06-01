<template>
    <el-container relative>
        <el-header>
            <Header></Header>
        </el-header>
        <el-main>
            <div style="position: relative;">
                <router-view v-slot="{ Component }">
                    <transition name="slide-fade">
                        <component class="child-view" :is="Component" />
                    </transition>
                </router-view>
            </div>
            <Footer></Footer>
        </el-main>
    </el-container>
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

.mainbg {
    background-color: azure;

}
</style>