<template>
    <div>
        <div class="admin-title">日志列表</div>
        <el-table :data="logList.data" style="width: 100%" border>
            <el-table-column prop="uuid" label="uuid" width="140"> </el-table-column> //按顺序显示
            <el-table-column prop="ip" label="IP" sortable width="140"></el-table-column> //按顺序显示
            <el-table-column prop="browser" label="浏览器" width="140"></el-table-column> //按顺序显示
            <el-table-column prop="userId" label="用户ID" width="140"></el-table-column> //按顺序显示
            <el-table-column prop="system" label="系统" width="120"></el-table-column> //按顺序显示
            <el-table-column prop="port" label="路径" sortable></el-table-column> //按顺序显示
            <el-table-column prop="creatTime" label="访问时间" sortable width="160"></el-table-column> //一个表格列应该包含
            <el-table-column prop="method" label="访问方法" sortable width="130">
                <template #default="scope">
                    <el-tag :type='tagType(scope.row.method)'>{{ scope.row.method }}</el-tag>
                </template>
            </el-table-column> //一个表格列应该包含
            <el-table-column prop="data" label="请求数据"></el-table-column> //一个表格列应该包含
        </el-table>
        <div flex justify-center mt mb>
            <el-pagination v-model:current-page="pageParam.pageNum" v-model:page-size="pageParam.pageSize"
                :page-sizes="[5, 10, 20, 50]" background layout="pager" :total="logList.totalRows" @size-change="getLogs"
                @current-change="getLogs" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLog } from '../../api/admin/log'

const logList = ref({})

const pageParam = ref({
    pageNum: 1,
    pageSize: 10
})

onMounted(() => {

    getLogs()
})


const tagType = method => {
    const tagTypes = (['success', 'info', 'warning', 'danger'])
    switch (method) {
        case 'GET':
            return tagTypes[0]
            break;
        case 'PUT':
            return tagTypes[1]
            break;
        case 'DELETE':
            return tagTypes[3]
            break;
        case 'POST':
            return tagTypes[2]
            break;
        default:
            return
    }
}

const getLogs = () => {
    console.log(pageParam.value);
    getLog(pageParam.value).then(res => {

        logList.value = res.data
    })
}
</script>