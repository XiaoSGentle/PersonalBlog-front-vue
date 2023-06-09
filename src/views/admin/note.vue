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
                <el-form-item label="座右铭1" prop="content">
                    <el-input type="textarea" v-model="formData.content" placeholder="请输入座右铭1" clearable
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <div flex justify-center>
                    <el-button type="primary" @click="submitForm" round w50>修改</el-button>
                </div>
            </el-form>


        </div>

        <div class="admin-title">笔记列表</div>
        <el-table :data="myNoteList.data" style="width: 100%">
            <el-table-column prop="uuid" label="uuid"></el-table-column>
            <el-table-column prop="creatorUuid" label="创建者ID"></el-table-column>
            <el-table-column prop="classificationUuid" label="分类" width='100' sortable>
                <template #default="scope">
                    <el-tag>
                        {{ scope.row.classificationUuid }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="tags" label="标签" width="200">
                <template #default="scope">
                    <div h6>

                        <el-tag v-for="(tag, index) in scope.row.tags.split(',')" effect="dark" :type="tagsTypes[index]"
                            round ml1>
                            {{ tag }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="isShow" label="是否发布">
                <template #default="scope">
                    <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0" />
                </template>
            </el-table-column>
            <el-table-column prop="banner" label="缩略图">
                <template #default="scope">
                    <el-image style="width: 150px; height: 150px" :src="scope.row.banner" />
                </template>
            </el-table-column>
            <el-table-column prop="readNum" label="浏览次数" sortable width="100"></el-table-column>
            <el-table-column prop="starNum" label="星星个数" sortable width="100"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-link type="primary" @click="goEditNote(scope.row.uuid)"> 详情</el-link>
                    <el-link ml type="primary" @click="delNote(scope.row.uuid)"> 删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!-- 底部分页 -->
        <div flex justify-center p5>
            <el-pagination v-model:current-page="searchParm.pageNum" v-model:page-size="searchParm.pageSize"
                :page-sizes="[5, 10, 20, 50]" background layout="pager" :total="myNoteList.totalRows" @size-change="getNote"
                @current-change="getNote" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getBanner, updateBanner } from '../../api/admin/banner'
import { BannerEnums } from '../../enum/Enum'
import { getAllNote, getAllNoteClassify, delNoteByUuid } from '../../api/note' //获取所有笔记列表数据的函数, 可以返回Prom

// 筛选后的结果
const myNoteList = ref({
    totalRows: 0
})
import { getBaseUrl } from '../../utils/env';
import { useStore } from 'vuex';
const store = useStore()
const formData = ref({
    height: undefined,
    icon: undefined,
    title: undefined,
    backImg: null,
    content: undefined,
},)
// tags样式
const tagsTypes = ref(['success', 'danger', 'warning', 'info'])
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
            message: '请输入座右铭',
            trigger: 'blur'
        }],
    },
)

onMounted(async () => {
    getBanners()
    await getAllNoteClassify().then(res => {
        classify.value = res.data
    })
    getNote()
})

// 获取轮播图
const getBanners = () => {
    getBanner(BannerEnums.NOTE).then(res => {
        formData.value = res.data
    })
}
// 获取笔记
const classify = ref([])
const searchParm = ref({
    pageNum: 1,
    pageSize: 6,
})
const getNote = () => {
    getAllNote(searchParm.value).then(res => {
        myNoteList.value = res.data
        myNoteList.value.data.forEach(note => {
            classify.value.forEach(item => {
                if (item.uuid === note.classificationUuid) {
                    note.classificationUuid = item.classifyName
                }
            })
        })

    })
}

import { useRouter } from 'vue-router'
const router = useRouter()
const goEditNote = uuid => {
    router.push('/noteEdit/' + uuid)
}
// 删除文章
const delNote = async param => {
    await delNoteByUuid(param)
    getNote()
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
