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
                        <img v-if="formData.banner" :src="formData.banner" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="座右铭1" prop="motto1">
                    <el-input v-model="formData.motto1" placeholder="请输入座右铭1" clearable
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item label="座右铭2" prop="motto2">
                    <el-input v-model="formData.motto2" placeholder="请输入座右铭2" clearable
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <div flex justify-center>
                    <el-button type="primary" @click="submitForm" round w50>提交</el-button>
                    <el-button @click="resetForm" round w50>重置</el-button>
                </div>
            </el-form>


        </div>

        <div class="admin-title">笔记列表</div>
        <el-table :data="notesList" style="width: 100%">
            <el-table-column prop="date" label="uuid"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="预览图"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="标题"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="分类"></el-table-column> //按顺序显示
            <el-table-column prop="name" label="标签"></el-table-column> //按顺序显示
            <el-table-column prop="address" label="阅读量"></el-table-column> //一个表格列应该包含
            <el-table-column prop="address" label="收藏量"></el-table-column> //一个表格列应该包含
            <el-table-column prop="address" label="创建时间"></el-table-column> //一个表格列应该包含
            <el-table-column prop="address" label="操作"></el-table-column> //一个表格列应该包含
        </el-table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const notesList = ref([])



import { getBaseUrl } from '../../utils/env';
import { useStore } from 'vuex';
const store = useStore()
const formData = ref({
    height: undefined,
    icon: undefined,
    title: undefined,
    backImg: null,
    motto1: undefined,
    motto2: undefined,
},)

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
        motto1: [{
            required: true,
            message: '请输入座右铭1',
            trigger: 'blur'
        }],
        motto2: [{
            required: true,
            message: '请输入座右铭2',
            trigger: 'blur'
        }],
    },
)
const handleBannerSuccess = (response, uploadFile) => {
    formData.value.banner = response.data
}
const beforeBannerUpload = (rawFile) => {
    if (rawFile.type !== 'image/*') {
        ElMessage.error('上传的文件类型必须为图片')
        return false
    } else if (rawFile.size / 1024 / 1024 > 10) {
        ElMessage.error('上传的图片大小不能超过10M')
        return false
    }
    return true
}

</script>


<style scoped>
.avatar-uploader .avatar {
    width: 178px;
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
