<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-main>
            <div relative class="mainbg">
                <router-view></router-view>
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