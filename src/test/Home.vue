<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { get_user } from '../api/admin';
import { watch } from 'vue';
import { watchEffect } from 'vue';
import IconCommunity from '../components/icons/IconCommunity.vue'
const userInfo = reactive({
    x: 0,
    y: 0
});
const getUser = () => {
    get_user().then(res => {

    })}

let message = ref('hello');
const result = computed(() => {
    return message.value.split('').reverse().join()
})


const updateArr = () => {

}

const handler = (e) => {
    userInfo.x = e.pageX;
    userInfo.y = e.pageY;
}
onMounted(() => {
    window.addEventListener('mousemove', handler)
})

// 全选

const select = ref([
    {
        done: false,
        msg: '唱'
    },
    {
        done: false,
        msg: '跳'
    },
    {
        done: false,
        msg: 'rap'
    },
    {
        done: false,
        msg: '篮球'
    },

])

const selectAll = computed({
    get() {
        console.log('set');
        return select.value.every(item => item.done)
    },
    set(value) {
        if (value) {
            select.value.forEach(item => item.done = true)
        } else {
            select.value.forEach(item => item.done = false)
        }

    }
})

// watch
const count = ref(0);
const his = ref([])
const updateNum = () => {
    count.value++;
    his.value.push(count.value)
}
watch(count, (newValue, oldValue) => {
    console.log(newValue, oldValue);
}, {
    // 页面创建立即执行
    immediate: true
})
// watchEfface
watchEffect(() => {
    localStorage.setItem('searchHistorty', his.value)
})


</script>


<template>
    <IconCommunity></IconCommunity>
    <div>
        {{ userInfo }}
    </div>
    <div>
        msg翻转后{{ result }}
    </div>
    <div style="margin-left: 9rem;">
        <input type="checkbox" v-model="selectAll" name="" id="">蔡徐坤
        <div>
            <li v-for="(item, index ) in select" :key="index"><input v-model="item.done" type="checkbox">{{ item.msg }}</li>
        </div>
    </div>
    <br />

    <div>
        {{ count }}
    </div>
    <button @click="updateNum">增加</button>
</template>

<style scoped></style>