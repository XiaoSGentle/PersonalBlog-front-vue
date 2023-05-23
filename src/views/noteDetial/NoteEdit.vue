<template>
    <v-md-editor v-model="text" v-bind="toolbar" height="400px" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
const text = ref('');
text.value = "```js```"
// 代码复制执行函数

const handleCopyCodeSuccess = () => {
    ElMessage.success("复制成功")
}

const toolbar = ref({
    // mode: 'preview',
    includeLevel: [1, 2, 3, 4, 5, 6],
    defaultShowToc: true,
})
</script>