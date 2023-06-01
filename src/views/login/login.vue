<template>
    <div flex justify-center>
        <div w100 h100>
            <div text-center font-bold text-8 leading-40 font-sans> Login(请直接登录)</div>

            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-position="left">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable :prefix-icon='User'
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item prop="password" mt8>
                    <el-input v-model="loginForm.password" placeholder="请输入密码" clearable :prefix-icon='Lock' show-password
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button mt5 color="#626aef" round :style="{ width: '100%' }"
                        @click="submitForm(loginFormRef)">登录</el-button>
                </el-form-item>
                <div text-center> <el-link type="primary" @click="goRegister">立即注册</el-link></div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { Lock, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Login } from '../../api/user';
const store = useStore()
const router = useRouter()

// 表单以及规则的定义
const loginForm = ref({
    username: "admin",
    password: "admin",
})
const loginFormRules = ref({
    username: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
    }],
    password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }],
})

// 跳转注册
const goRegister = () => {
    router.push('/register')
}

// 表单提交事件
const loginFormRef = ref()
const submitForm = (loginFormRef) => {
    loginFormRef.validate(valid => {
        if (!valid) return
        Login(loginForm.value).then(res => {
            if (res.status === 200) {
                store.commit('setUserInfo', res.data.userInfo)
                store.commit('setToken', res.data.token)
                ElMessage.success('登录成功,欢迎回来@' + res.data.userInfo.nickname)
                router.push('/welcome')
            } else {
                ElMessage.error('登录失败')
            }
        })
    })
}


</script>