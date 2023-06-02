<template>
    <div class="w80%" ma>
        <div>
            <!-- 顶部编辑 -->
            <el-card mt>
                <div flex justify-between>
                    <div flex>
                        <div mt5px text-8 font-bold>
                            <el-icon>
                                <EditPen />
                            </el-icon>
                        </div>
                        <div ml3 w100>
                            <el-input v-model="noteContent.title" size="large" placeholder="再此输入文章的标题..." />
                        </div>
                        <el-link ml3 mt3 :underline="false" :icon="Setting" type="primary"
                            @click="moreSettingVisible = !moreSettingVisible">
                            更多
                        </el-link>
                    </div>
                    <div>
                        <el-button size="large" type="danger" :icon="Delete" round>删除</el-button>
                        <el-button size="large" type="primary" :icon="Promotion" round>发表</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div mt>
            <v-md-editor h100vh v-model="noteContent.content" v-bind="toolbar" @copy-code-success="handleCopyCodeSuccess"
                @save="handleSave" @upload-image="uploadImg">
            </v-md-editor>
        </div>
        <!-- 文章标签 -->
        <el-dialog v-model="moreSettingVisible" title="文章设置">

            <el-form label-position="top">
                <el-form-item label="标题">
                    <el-input v-model="noteContent.title" size="large" placeholder="再此输入文章的标题..." />
                </el-form-item>
                <el-form-item label="标签">
                    <el-select class="w100%" size="large" v-model="noteContent.tags" multiple filterable allow-create
                        default-first-option :reserve-keyword="false" placeholder="选择你的文章标签">
                        <el-option v-for="item in tags" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="分类">
                    <el-cascader class="w100%" v-model="noteContent.classificationUuid" @change="classifiyChange"
                        :options="classify" :props="{ value: 'uuid', label: 'classifyName' }" value="uuid"
                        label="classifyName" placeholder="选择文章分类" clearable />
                </el-form-item>
                <el-form-item label="预览图">
                    <el-upload class="avatar-uploader" :action="getBaseUrl() + '/upload'" accept=".png,.jpg,.jpeg" :headers="{
                        Authorization:
                            'Bearer ' + store.state.Token
                    }" :show-file-list="false" :on-success="handleBannerSuccess" :before-upload="beforeBannerUpload">
                        <img v-if="noteContent.banner" :src="noteContent.banner" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { Delete, Promotion, Setting } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { upload } from '../../api/file';
import { getBaseUrl } from '../../utils/env';
import { useStore } from 'vuex';
import { updataNote, getNotesByUuid } from '../../api/note'
import { useRoute } from 'vue-router';
import { getAllNoteClassify } from '../../api/note';
import { ElLoading } from 'element-plus'

//vuex


const store = useStore()
const route = useRoute()

// vuepress编辑框
const toolbar = ref({
    // mode: 'preview',
    includeLevel: [1, 2, 3, 4, 5, 6],
    defaultShowToc: true,
    // tocNavPositionRight: true,
    placeholder: '开始愉快的写文章吧！',
    height: '75vh',
    disabledMenus: []

})
// 定义保存参数
const noteContent = ref({
    uuid: '',
    classificationUuid: '',
    title: '',
    content: '',
    banner: '',
    tags: ''
})


// 获取store中保存的代码
// 


// 监听文章内容
watch(noteContent, (newValue, oldValue) => {
    store.commit('setNoteContent', noteContent.value)
}, { deep: true })



onMounted(

    async () => {
        const loadService = ElLoading.service({
            text: '正在加载,请稍后...'
        })
        await getNotesByUuid(route.params.uuid).then(res => {
            noteContent.value.uuid = res.data.uuid
            noteContent.value.classificationUuid = res.data.classificationUuid
            noteContent.value.title = res.data.title;
            if (res.data.content === null) {
                noteContent.value.content = '尽情发挥吧😁😁😁'
            }
            else {
                noteContent.value.content = res.data.content
            }
            noteContent.value.banner = res.data.banner;
            noteContent.value.tags = res.data.tags.split(',');
            store.commit('setNoteContent', noteContent.value)
            noteContent.value = store.state.noteContent
        })
        await getAllNoteClassify().then(res => {
            classify.value = res.data
        })
        loadService.close()
    })



// 代码复制执行函数
const handleCopyCodeSuccess = () => {
    ElMessage.success("复制成功")
}

// 代码保存
const handleSave = (text, html) => {
    updataNote(noteContent.value).then(res => {
        if (res.status === 200) {
            ElMessage.success("保存成功")
        }
    })
}

// 分类改变事件
const classifiyChange = (value) => {
    noteContent.value.classificationUuid = value[0]
}

// 定义文章分类
const classify = ref([])
//定义文章标签
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





//粘贴图片
const uploadImg = (event, insertImage, files) => {
    upload(files).then(res => {
        insertImage({
            url: res.data
        })
    })
}



// moreSetting
const moreSettingVisible = ref(false)
const handleBannerSuccess = (response, uploadFile) => {
    noteContent.value.banner = response.data
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