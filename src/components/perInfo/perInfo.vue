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
            <div @click="goWriteArticle" p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out
                duration-300>
                <IconWrite></IconWrite>
                <div text-center>撰写文章</div>
            </div>
            <div p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out duration-300>
                <IconDocument></IconDocument>
                <div text-center>我的文章</div>
            </div>
            <div p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out duration-300>
                <IconCollect></IconCollect>
                <div text-center>我的收藏</div>
            </div>
            <div p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out duration-300>
                <IconSetting></IconSetting>
                <div text-center>设置</div>
            </div>
            <div @click="loginOut" p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out duration-300>
                <IconExit></IconExit>
                <div text-center>退出登录</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { addNote } from '../../api/note';
import IconDocument from '../icons/login/IconDocument.vue';
import IconExit from '../icons/login/IconExit.vue';
import IconSetting from '../icons/login/IconSetting.vue';
import IconWrite from '../icons/login/IconWrite.vue';
import IconCollect from '../icons/login/iconCollect.vue';


// store中的信息
const store = useStore()
const router = useRouter()
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

// 跳转登录
const emit = defineEmits(['changeTag']);
const loginOut = () => {
    store.commit('loginOut')
    ElMessage.warning('退出登录成功！')
    router.push('/login')
}

const goWriteArticle = () => {
    addNote({ createUuid: userInfo.value.uuid }).then(res => {
        router.push('/noteEdit/' + res.data.uuid)
    })
}

</script>