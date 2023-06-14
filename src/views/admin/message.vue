<template>
    <div>
        <div class="admin-title">banner参数</div>
        <div class="w-90%">
            <el-form ref="elForm" :model="formData" :rules="rules" size="large" label-width="100px">
                <el-form-item label="高度" prop="height">
                    <el-input v-model="formData.height" placeholder="请输入banner高度" clearable :style="{ width: '100%' }">
                    </el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="formData.icon" placeholder="请输入图标" clearable :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formData.title" placeholder="请输入标题" clearable :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item label="预览图">
                    <el-upload class="avatar-uploader" :action="getBaseUrl() + '/upload'" accept=".png,.jpg,.jpeg" :headers="{
                        Authorization:
                            'Bearer ' + store.state.Token
                    }" :show-file-list="false" :on-success="handleBannerSuccess" :before-upload="beforeBannerUpload">
                        <img v-if="formData.backImg" :src="formData.backImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="formData.content" type="textarea" placeholder="请输入座右铭2" clearable
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <div flex justify-center>
                    <el-button type="primary" @click="submitForm" round w50>修改</el-button>
                </div>
            </el-form>
        </div>

        <div class="admin-title">留言列表</div>
        <el-table :data="mesList.data" style="width: 100%" border>
            <el-table-column prop="uuid" label="uuid"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="姓名" width="150"></el-table-column> //按顺序显示
            <el-table-column prop="avatar" label="头像" width="80">
                <template #default="scope">
                    <el-avatar :src="scope.row.avatar"></el-avatar>
                </template>
            </el-table-column> //按顺序显示
            <el-table-column prop="content" label="内容"></el-table-column> //按顺序显示
            <el-table-column prop="ip" label="IP地址" width="150"></el-table-column> //按顺序显示
            <el-table-column prop="browser" label="浏览器类型" width="150"></el-table-column> //按顺序显示
            <el-table-column prop="createTime" label="留言时间"></el-table-column> //一个表格列应该包含
            <el-table-column label="操作">
                <template #default="scope">
                    <el-link ml type="primary" @click="deldeteMessage(scope.row.uuid)"> 删除</el-link>
                </template>

            </el-table-column> //一个表格列应该包含
        </el-table>
        <div flex justify-center mt mb>
            <el-pagination v-model:current-page="pageParam.pageNum" v-model:page-size="pageParam.pageSize"
                :page-sizes="[5, 10, 20, 50]" background layout="pager" :total="mesList.totalRows" @size-change="getMes"
                @current-change="getMes" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBanner, updateBanner } from '../../api/admin/banner'
import { getBaseUrl } from '../../utils/env';
import { useStore } from 'vuex';
import { BannerEnums } from '../../enum/Enum'
import { getMessage } from '../../api/message';
import { delMessage } from '../../api/admin/message';
const mesList = ref({
    totalRows: 0
})
const store = useStore()
const formData = ref({
    uuid: '',
    height: undefined,
    icon: undefined,
    title: undefined,
    backImg: null,
    content: undefined,
},)

onMounted(() => {
    getBanners()
    getMes()
})


// 获取轮播图
const getBanners = () => {
    getBanner(BannerEnums.MESSAGE).then(res => {
        formData.value = res.data
    })
}



// 分页参数
const pageParam = ref({
    pageNum: 1,
    pageSize: 10
})
const getMes = () => getMessage(pageParam.value).then(res => {
    mesList.value = res.data;
})
const rules = ref(
    {
        height: [{
            required: true,
            message: '请输入banner高度',
            trigger: 'blur'
        }],
        icon: [{
            required: true,
            message: '请输入图标',
            trigger: 'blur'
        }],
        title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
        }],
        content: [{
            required: true,
            message: '请输入该行内容',
            trigger: 'blur'
        }],
    },
)


const deldeteMessage = (uuid) => {
    delMessage(uuid).then(
        res => {
            getMes()
        }
    )
}

const handleBannerSuccess = (response, uploadFile) => {
    formData.value.backImg = response.data
}
const beforeBannerUpload = (rawFile) => {
    if (!/^image\//.test(rawFile.type)) {
        ElMessage.error('上传的文件类型必须为图片')
        return false
    } else if (rawFile.size / 1024 / 1024 > 10) {
        ElMessage.error('上传的图片大小不能超过10M')
        return false
    }
    return true
}

const updateBanners = () => {
    updateBanner(formData.value).then(res => { })
}
const submitForm = () => {
    updateBanners()
}

</script>

<style scoped>
.avatar-uploader .avatar {
    width: 578px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>