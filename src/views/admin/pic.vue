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
                    <el-upload class="avatar-uploader" :action="getBaseUrl() + '/upload'" accept=".png,.jpg,.jpeg"
                        :headers="{ Authorization: 'Bearer ' + store.state.Token }" :show-file-list="false"
                        :on-success="handleBannerSuccess" :before-upload="beforeBannerUpload">
                        <img v-if="formData.backImg" :src="formData.backImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="内容" prop="motto1">
                    <el-input type="textarea" v-model="formData.content" placeholder="请输入座右铭" clearable
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <div flex justify-center>
                    <el-button type="primary" @click="submitForm" round w50>修改</el-button>
                </div>
            </el-form>
        </div>
        <div mt10 flex justify-end>
            <el-button w30 round type="primary" @click="dialogVisible = true">上传</el-button>
        </div>
        <div class="admin-title">美食图片列表</div>
        <el-table :data="fineFoodList" style="width: 100%" center>
            <el-table-column prop="uuid" label="uuid" width="160"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="des" label="描述"></el-table-column>
            <el-table-column prop="classify" label="分类" width="150">
                <el-tag>美食</el-tag>
            </el-table-column>
            <el-table-column prop="isShow" label="是否展示" width="150">
                <template #default="scope">
                    <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0" />
                </template>
            </el-table-column>
            <el-table-column label="图片预览">
                <template #default="scope">
                    <el-image style="width: 150px; height: 150px" :src="scope.row.url" />
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-link type="primary"> 修改</el-link>
                    <el-link ml type="primary" @click="delPicByUuid(scope.row.uuid)"> 删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <div class="admin-title">风景图片列表</div>
        <el-table :data="sceneryList" style="width: 100%" center>
            <el-table-column prop="uuid" label="uuid" width="160"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="des" label="描述"></el-table-column>
            <el-table-column prop="classify" label="分类" width="150">
                <el-tag type="success">风景</el-tag>
            </el-table-column>
            <el-table-column prop="isShow" label="是否展示" width="150">
                <template #default="scope">
                    <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0" />
                </template>
            </el-table-column>
            <el-table-column label="图片预览">
                <template #default="scope">
                    <el-image style="width: 150px; height: 150px" :src="scope.row.url" />
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-link type="primary"> 修改</el-link>
                    <el-link ml type="primary" @click="delPicByUuid(scope.row.uuid)"> 删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <div class="admin-title">关于我图片列表</div>
        <el-table :data="aboutMeList" style="width: 100%" center>
            <el-table-column prop="uuid" label="uuid" width="160"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="des" label="描述"></el-table-column>
            <el-table-column prop="classify" label="分类" width="150">
                <el-tag type="danger">关于我</el-tag>
            </el-table-column>
            <el-table-column prop="isShow" label="是否展示" width="150">
                <template #default="scope">
                    <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0" />
                </template>
            </el-table-column>
            <el-table-column label="图片预览">
                <template #default="scope">
                    <el-image style="width: 150px; height: 150px" :src="scope.row.url" />
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-link type="primary"> 修改</el-link>
                    <el-link ml type="primary" @click="delPicByUuid(scope.row.uuid)"> 删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" width="800" p10>
            <el-form ref="addForm" :model="addForm" :rules="addFormRules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title" placeholder="请输入banner标题" clearable :style="{ width: '100%' }">
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="des">
                    <el-input v-model="addForm.des" placeholder="请输入描述" clearable :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item label="是否展示" prop="isShow" required>
                    <el-switch v-model="addForm.isShow"></el-switch>
                </el-form-item>
                <el-form-item label="分类" prop="classify">
                    <el-select v-model="addForm.classify" placeholder="请选择分类" clearable :style="{ width: '100%' }">
                        <el-option v-for="(item, index) in classifyOptions" :key="index" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" prop="backImg" required>
                    <el-upload class="avatar-uploader" :action="getBaseUrl() + '/upload'" accept=".png,.jpg,.jpeg"
                        :headers="{ Authorization: 'Bearer ' + store.state.Token }" :show-file-list="false"
                        :on-success="handleBannerSuccess1" :before-upload="beforeBannerUpload1">
                        <img v-if="addForm.backImg" :src="addForm.backImg" class="avatar" />
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
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { getBanner, updateBanner } from '../../api/admin/banner'
import { BannerEnums, PicEnums } from '../../enum/Enum'
import { getPic, delPic } from '../../api/admin/pic'

const fineFoodList = ref([])
const sceneryList = ref([])
const aboutMeList = ref([])



import { getBaseUrl } from '../../utils/env';
import { useStore } from 'vuex';



const store = useStore()
const formData = ref({
    height: 370,
    icon: '',
    title: '',
    backImg: '',
    content: ''
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
        content: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
        }],
    },
)

onMounted(() => {
    getBanners()
    getFineFoodList()
    getSceneryList()
    getAboutMeList()
})



// 获取轮播图
const getBanners = () => {
    getBanner(BannerEnums.PIC).then(res => {
        formData.value = res.data
    })
}
// 获取美食图集列表
const getFineFoodList = () => {
    getPic(PicEnums.GOURMENT).then(
        res => {
            fineFoodList.value = res.data
        }
    )
}
// 获取风景图集列表
const getSceneryList = () => {
    getPic(PicEnums.VIEW).then(
        res => {
            sceneryList.value = res.data
        }
    )
}
// 获取美食图集列表
const getAboutMeList = () => {
    getPic(PicEnums.ABOUT_ME).then(
        res => {
            aboutMeList.value = res.data
        }
    )
}

const delPicByUuid = uuid => {
    delPic(uuid).then(res => {
        getFineFoodList()
        getSceneryList()
        getAboutMeList()
    })
}


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




// 添加图片弹窗
const dialogVisible = ref(false)
const addForm = ref({
    title: '',
    des: '',
    isShow: false,
    classify: '',
    backImg: '',
})


const addFormRules = ref(
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
        classify: [{
            required: true,
            message: '请选择分类',
            trigger: 'change'
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
    addForm.value.banner = response.data
}
const beforeBannerUpload1 = (rawFile) => {
    if (rawFile.type !== 'image/*') {
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