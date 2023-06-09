<template>
    <div>
        <div class="admin-title">
            主页文案
        </div>
        <div class="w80%" ma>
            <el-form ref="elForm" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入用户名" clearable :style="{ width: '100%' }">
                    </el-input>
                </el-form-item>
                <el-form-item label="座右铭" prop="motto">
                    <el-input v-model="formData.motto" type="textarea" placeholder="请输入座右铭" clearable
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item label="预览图" prop="avatar">
                    <el-upload class="avatar-uploader" :action="getBaseUrl() + '/upload'" accept=".png,.jpg,.jpeg" :headers="{
                        Authorization:
                            'Bearer ' + store.state.Token
                    }" :show-file-list="false" :on-success="handleBannerSuccess" :before-upload="beforeBannerUpload">
                        <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <div flex justify-center>
                    <el-button type="primary" @click="submitForm" round w50>修改</el-button>
                </div>
            </el-form>

        </div>
        <div class="admin-title">
            可供随机的背景
        </div>
        <div>
            <el-table :data="bgImg" style="width: 100%" center>
                <el-table-column prop="date" label="uuid"></el-table-column> //按顺序显示
                <el-table-column prop="name" label="图片"></el-table-column> //按顺序显示
                <el-table-column prop="address" label="上传时间"></el-table-column> //一个表格列应该包含
                <el-table-column prop="address" label="操作"></el-table-column> //一个表格列应该包含
            </el-table>
        </div>
        <div class="admin-title">
            可供随机的名言
        </div>
        <div>
            <el-table :data="bgImg" style="width: 100%" center>
                <el-table-column prop="date" label="uuid"></el-table-column> //按顺序显示
                <el-table-column prop="name" label="图片"></el-table-column> //按顺序显示
                <el-table-column prop="address" label="上传时间"></el-table-column> //一个表格列应该包含
                <el-table-column prop="address" label="操作"></el-table-column> //一个表格列应该包含
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBaseUrl } from '../../utils/env';
import { useStore } from 'vuex';
import { getBlogInfo, setBlogInfo, getAllBgPic, getallSaying } from '../../api/admin/home'
const store = useStore()
const bgImg = ref([])
const sayIng = ref([])
const formData = ref({
    name: '',
    motto: '',
    avatar: ''
})
const rules = ref(
    {
        name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }],
        motto: [{
            required: true,
            message: '请输入座右铭',
            trigger: 'blur'
        }],
        avatar: [{
            required: true,
            message: '请上传头像',
            trigger: 'blur'
        }]
    },
)

onMounted(() => {
    getInfo()
    getAllBgPics()
    getallSayings()
})


// 获取主页信息
const getInfo = () => {
    getBlogInfo().then(res => {
        formData.value = res.data
    })
}
// 获取所有可供随机的北京图片
const getAllBgPics = () => {
    getAllBgPic().then(res => {
        bgImg.value = res.data
    })
}
// 获取所有可供随机的名言
const selectTag = ref('')
const getallSayings = selectTag => {
    getallSaying().then(res => {
        sayIng.value = res.data
    })
}




// 上传图片有关函数
const handleBannerSuccess = (response, uploadFile) => {
    formData.value.avatar = response.data
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

// const elForm = ref('')

const submitForm = () => {
    elForm.validate(valid => {
        if (!valid) return
    })
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
