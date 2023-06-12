<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-button @click="dialogVisible = !dialogVisible"> 打开弹窗</el-button>
    <el-dialog v-model="dialogVisible" width="800" p10>
        <el-form :rules="addPicParamRules">
            <el-form-item label="标题" prop="title">
                <el-input v-model="addPicParam.title" placeholder="请输入banner标题" clearable :style="{ width: '100%' }">
                </el-input>
            </el-form-item>
            <el-form-item label="描述" prop="des">
                <el-input v-model="addPicParam.des" placeholder="请输入描述" clearable :style="{ width: '100%' }"></el-input>
            </el-form-item>
            <el-form-item label="是否展示">
                <el-switch v-model="addPicParam.isShow"></el-switch>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="addPicParam.classify" placeholder="请选择分类" clearable :style="{ width: '100%' }">
                    <el-option v-for="(item, index) in classifyOptions" :key="index" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片" prop="backImg" required>
                <el-upload class="avatar-uploader" :action="getBaseUrl() + '/upload'" accept=".png,.jpg,.jpeg"
                    :headers="{ Authorization: 'Bearer ' + store.state.Token }" :show-file-list="false"
                    :on-success="handleBannerSuccess1" :before-upload="beforeBannerUpload1">
                    <img v-if="addPicParam.backImg" :src="addPicParam.backImg" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <div flex justify-center>
            <el-button type="primary" @click="" round w50>上传</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getBaseUrl } from '../../utils/env';
import { useStore } from 'vuex';
const store = useStore()
// 添加图片弹窗
const dialogVisible = ref(false)
const addPicParam = ref({
    title: '3123132',
    des: '',
    isShow: false,
    classify: '',
    backImg: '',
})


const addPicParamRules = ref(
    {
        title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
        }],
        des: [{
            required: true,
            message: '请输入描述',
            trigger: 'blur'
        }],
    },


)

const classifyOptions = ref(
    [
        {
            label: "美食",
            value: "pic_gourmet"
        },
        {
            label: "风景",
            value: "pic_view"
        },
        {
            label: "关于我",
            value: "pic_about_me"
        }
    ],
)
const handleBannerSuccess1 = (response, uploadFile) => {
    addPicParam.value.banner = response.data
}
const beforeBannerUpload1 = (rawFile) => {
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