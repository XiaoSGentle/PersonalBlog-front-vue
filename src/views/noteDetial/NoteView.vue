<template>
    <div mt flex justify-center>
        <div w70 bg-gray-1 p3 rounded overflow-auto h84vh>
            <div flex justify-between>
                <span text-6 font-bold rounded>目录</span>
                <span text-3 mt3 cursor-pointer text-lightBlue @click="goEditNote">
                    <el-icon>
                        <Edit />
                    </el-icon>
                    编辑此页面
                </span>

            </div>
            <el-divider />
            <div hover:text-emerald-300 hover:bg-bluegray-200 ease-linear p1 rounded v-for="anchor in menus"
                :style="{ padding: `8px 0 8px ${anchor.indent * 20 + 5}px`, fontSize: `${(17 - (anchor.indent))}px`, cursor: `pointer`, fontWeight: `${anchor.indent === 0 ? 600 : 400}` }"
                @click="handleAnchorClick(anchor)">
                <a style="cursor: pointer">{{ anchor.title }}</a>
            </div>
        </div>
        <div ml w300>
            <v-md-editor ref="preview" v-model="noteContent.content" v-bind="toolbar"
                @copy-code-success="handleCopyCodeSuccess">
            </v-md-editor>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
<<<<<<< HEAD
import { onMounted, ref, onBeforeUpdate, onUpdated } from 'vue';
=======
import { onMounted, ref } from 'vue';
>>>>>>> 7529f2f76ab2f274105abe927541497aa894a277
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getNotesByUuid } from '../../api/note';
//vuex
const store = useStore()
const route = useRoute()
const router = useRouter()

// vuepress编辑框
const toolbar = ref({
    mode: 'preview',
    height: '84vh',

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

const goEditNote = () => {
    router.push('/noteEdit/' + route.params.uuid)
}


onMounted(async () => {
    await getNotesByUuid({ uuid: route.params.uuid }).then(res => {
        noteContent.value.uuid = res.data.uuid
        noteContent.value.classificationUuid = res.data.classificationUuid
        noteContent.value.title = res.data.title;
        noteContent.value.content = res.data.content
        noteContent.value.banner = res.data.banner;
        noteContent.value.tags = res.data.tags;
        store.commit('setNoteContent', noteContent.value)
        noteContent.value = store.state.noteContent
        setTimeout(() => { getMenus() }, 500)
    })

})



watch(noteContent, (newValue, oldValue) => {
    \
}
    , { deep: true }
)

// 获取侧边导航数据
const menus = ref([])
const preview = ref(null)
const getMenus = () => {
    const anchors = preview.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
    const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
    if (!titles.length) {
        menus.value = [];
        return;
    }
    const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
    menus.value = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
    }));
}

<<<<<<< HEAD
=======

>>>>>>> 7529f2f76ab2f274105abe927541497aa894a277

const handleAnchorClick = (anchor) => {
    const { lineIndex } = anchor;
    const heading = preview.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
    if (heading) {
        heading.scrollIntoView({
            behavior: "smooth",
            block: 'start'
        })
    }
}

// 代码复制执行函数
const handleCopyCodeSuccess = () => {
    ElMessage.success("复制成功")
}


</script>

