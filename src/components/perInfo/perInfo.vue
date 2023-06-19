<template>
    <!-- 头像 -->
    <div flex justify-center>
        <el-avatar :size="100" :src="userInfo.avatar" />
    </div>
    <!-- 其他信息 -->
    <div font-bold text-7 text-center>{{ userInfo.nickname }} </div>
    <div mt2 flex justify-center>
        <el-tag type="warning">

            <el-icon v-if="userInfo.sex === 1">
                <Male />
            </el-icon>
            <el-icon v-if="userInfo.sex === 0">
                <Female />
            </el-icon>
        </el-tag>
        <el-tag ml2>
            {{ userInfo.constellation }}
        </el-tag>
        <el-tag ml2 type="danger">
            {{ userInfo.birthday }}
        </el-tag>
    </div>
    <div mt8 flex justify-center>
        <div flex flex-wrap w300px h300px>
            <div @click="createNoteDialogVisble = true" p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1
                ease-in-out duration-300>
                <IconWrite></IconWrite>
                <div text-center>撰写文章</div>
            </div>
            <div @click="goMyNote" p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out duration-300>
                <IconDocument></IconDocument>
                <div text-center>我的文章</div>
            </div>
            <div v-if="showBack" @click="goAdmin" p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out
                duration-300>
                <IconSetting></IconSetting>
                <div text-center>后台管理</div>
            </div>
            <div @click="loginOut" p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out duration-300>
                <IconExit></IconExit>
                <div text-center>退出登录</div>
            </div>
        </div>
    </div>

    <!-- 文章标签 -->
    <el-dialog v-model="createNoteDialogVisble" :show-close='false' :close-on-press-escape="false"
        :close-on-click-modal="false" width="33rem">
        <div w120>
            <div text-7 text-center pb4>📋新建文章</div>
            <el-form label-position="top">
                <el-form-item label="标题">
                    <el-input v-model="noteContent.title" size="large" placeholder="再此输入文章的标题..." />
                </el-form-item>
                <el-form-item label="标签">
                    <el-select class="w100%" size="large" v-model="noteContent.tags" multiple filterable allow-create
                        default-first-option :reserve-keyword="false" placeholder="选择你的文章标签">
                        <el-option v-for=" item  in  tags " :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="分类">
                    <el-cascader class="w100%" v-model="noteContent.classificationUuid" @change="classifiyChange"
                        :options="classify" :props="{ value: 'uuid', label: 'classifyName' }" value="uuid"
                        label="classifyName" placeholder="选择文章分类" clearable />
                </el-form-item>
                <el-form-item label="预览图">
                    <el-upload class="avatar-uploader" :action="getBaseUrl() + '/upload'" :headers="{
                        Authorization:
                            'Bearer ' + store.state.Token
                    }" accept=".png,.jpg,.jpeg" :show-file-list="false" :on-success="handleBannerSuccess"
                        :before-upload="beforeBannerUpload">
                        <img v-if="noteContent.banner" :src="noteContent.banner" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <div flex justify-center>
                    <el-button w50 type="" round @click="createNoteDialogVisble = false">取消</el-button>
                    <el-button w50 type="primary" round @click="goWriteArticle" :loading="btnLoading">创建</el-button>
                </div>
            </el-form>
        </div>
    </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { defineEmits, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { addNote, getAllNoteClassify } from '../../api/note';
import { getAuthority } from '../../api/user';
import { getBaseUrl } from '../../utils/env';
import IconDocument from '../icons/login/IconDocument.vue';
import IconExit from '../icons/login/IconExit.vue';
import IconSetting from '../icons/login/IconSetting.vue';
import IconWrite from '../icons/login/IconWrite.vue';
import IconCollect from '../icons/login/iconCollect.vue';


// store中的信息
const store = useStore()
const router = useRouter()
const emit = defineEmits()
const userInfo = ref({
    createTime: '',
    updateTime: '',
    uuid: '',
    username: '',
    password: '',
    nickname: '',
    avatar: '',
    sex: 1,
    constellation: '',
    birthday: '',
})
userInfo.value = store.state.userInfo

const showBack = ref(false)

onMounted(async () => {
    await getAuthority().then(res => {
        showBack.value = res.data.toString().includes('admin')
    })
})

// 跳转登录
const loginOut = () => {
    store.commit('loginOut')
    ElMessage.warning('退出登录成功！')
    router.push('/login')
}

// 按钮加载事件
const btnLoading = ref(false)

// 创建并跳转对话框
const goWriteArticle = () => {
    btnLoading.value = true
    addNote(noteContent.value).then(res => {
        router.push('/noteEdit/' + res.data.uuid)
        btnLoading.value = false
        createNoteDialogVisble.value = false
        emit('changeDrawerVisible')
    })
}

// 创建并跳转对话框
const goMyNote = () => {
    router.push('/Mynote');
    emit('changeDrawerVisible')
}
// 创建并跳转对话框
const goAdmin = () => {
    router.push('/admin/statistical');
    // router.push('/admin/home');
    emit('changeDrawerVisible')
}

// 定义保存参数
const noteContent = ref({
    classificationUuid: '',
    title: '',
    banner: '',
    tags: ''
})
// 创建笔记对话框显示
const createNoteDialogVisble = ref(false)
// 上传笔记成功回调
const handleBannerSuccess = (response, uploadFile) => {
    noteContent.value.banner = response.data
}
// 上传前图片检测
const beforeBannerUpload = (rawFile) => {
    if (!rawFile.type.match(/image\/.*/)) {
        ElMessage.error('上传的文件类型必须为图片')
        return false
    } else if (rawFile.size / 1024 / 1024 > 10) {
        ElMessage.error('上传的图片大小不能超过10M')
        return false
    }
    return true
}

// 文章分类和文章标签
const classify = ref([])
const tags = [
    {
        value: '服务器',
        label: '服务器',
    },
    {
        value: '日常',
        label: '日常',
    },
    {
        value: '吐槽',
        label: '吐槽',
    },
]
getAllNoteClassify().then(res => {
    classify.value = res.data
})



// 分类改变事件
const classifiyChange = (value) => {
    noteContent.value.classificationUuid = value[0]
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