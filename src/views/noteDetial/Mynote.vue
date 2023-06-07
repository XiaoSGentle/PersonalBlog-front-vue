<template>
    <div p10 class="w70%" bg-gray-1 ma>
        <div text-8>✍️我撰写的</div>
        <el-divider />
        <div>
            <div v-for="item in myNoteList" mt3 rounded flex justify-between h15 p5 bg-blue-1>
                <div w100 @click="goNoteDetial(item.uuid)">{{ item.title }}</div>
                <div @click="goNoteDetial(item.uuid)"> <el-tag type="">{{ item.classificationUuid }}</el-tag> </div>
                <div @click="goNoteDetial(item.uuid)">{{ item.createTime }}</div>
                <div mt--1>
                    <el-button @click="delNote(item.uuid)" type="danger">删除</el-button>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getAllNoteClassify, getNotesByUser, delNoteByUuid } from '../../api/note';
import { useRouter } from 'vue-router'
const router = useRouter(); // 引入路由对象，可以在页面加载时实时获取到当前路由对
const myNoteList = ref([])
// 文章分类和文章标签
const classify = ref([])
onMounted(async () => {

    await getAllNoteClassify().then(res => {
        classify.value = res.data
    })
    getNote()

})
const getNote = () => {
    getNotesByUser().then(res => {
        myNoteList.value = res.data
        myNoteList.value.forEach(note => {
            classify.value.forEach(item => {
                if (item.uuid === note.classificationUuid) {
                    note.classificationUuid = item.classifyName
                }
            })
        })

    })
}

// 去文章编辑页面
const goNoteDetial = param => {
    router.push('/noteEdit/' + param)
}
// 删除文章
const delNote = async param => {
    await delNoteByUuid(param)
    getNote()
}
</script> 