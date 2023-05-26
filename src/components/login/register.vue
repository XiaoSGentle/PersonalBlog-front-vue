<template>
    <div flex justify-center>
        <div w100 h100>
            <div text-center font-bold text-8 leading-40 font-sans>Register</div>

            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-position="left">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable :prefix-icon='User'
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item prop="password" mt8>
                    <el-input v-model="loginForm.password" placeholder="请输入密码" clearable :prefix-icon='Lock' show-password
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item prop="repassword" mt8>
                    <el-input v-model="loginForm.repassword" placeholder="确认密码" clearable :prefix-icon='Lock' show-password
                        :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button mt5 color="#626aef" round :style="{ width: '100%' }"
                        @click="submitForm(loginFormRef)">注册</el-button>
                </el-form-item>
                <div text-center> <el-link type="primary" @click="goLogin">返回登录</el-link></div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { Lock, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';



// 注册标签数据
const loginForm = ref({
    username: "admin",
    password: "admin",
    repassword: "admin",
})
// 定义两次密码是否一致的规则
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
        // password 是表单上绑定的字段
    } else if (value !== loginForm.value.password) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}
// 表单验证规则
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
    repassword: [
        { required: true, validator: validatePass2, trigger: 'blur' }
    ]
})

// 校验提交表单
const loginFormRef = ref()
const submitForm = (loginFormRef) => {
    loginFormRef.validate(valid => {
        if (!valid) return
        ElMessage.error("注册功能暂未开放哦")
    })
}


// 跳转登录
const emit = defineEmits(['changeTag']);
const goLogin = () => {
    emit('changeTag', 3)
}



</script>