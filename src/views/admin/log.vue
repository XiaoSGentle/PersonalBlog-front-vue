<template>
    <div>
        <div class="admin-title">日志列表</div>
        <el-table :data="messageList" style="width: 100%" center>
            <el-table-column prop="date" label="uuid"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="IP"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="浏览器"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="系统"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="路径"></el-table-column> //按顺序显示
            <el-table-column prop="address" label="访问时间"></el-table-column> //一个表格列应该包含
        </el-table>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const messageList = ref([])
</script>