<template>
    <div flex>
        <el-menu default-active="admin">
            <el-menu-item @click="selectMenu" v-for="(item, index) in departs" :index="item.role" :key="index">
                <template #title>{{ item.name }}</template>
            </el-menu-item>
            <el-menu-item @click="addDepartDialogVis = !addDepartDialogVis">
                <el-icon>
                    <Plus />
                </el-icon>
                <template #title>
                    添加部门
                </template>
            </el-menu-item>
            <el-menu-item @click="resetAuthorityBtnClick">
                <el-icon>
                    <RefreshRight />
                </el-icon>
                <template #title>
                    重置部门权限
                </template>
            </el-menu-item>
        </el-menu>
        <div class="w100%" flex>
            <div class="w50%" p3>
                <div class="admin-title">权限列表</div>
                <div h80vh>
                    <el-table ref="RefRouter" height="82vh" :data="routers" style="width: 100%">
                        <el-table-column prop="v3" label="描述" sortable width="300" />
                        <el-table-column prop="v1" label="路由" sortable />
                        <el-table-column label="权限状态" width="200">
                            <template #default="scope">
                                <el-switch @click="switchChange(scope.row)" :disabled="selectDepart === 'admin'"
                                    v-model="scope.row.v4" />
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="w50%" style="border-left:2px solid rgb(65, 65, 65)" p3>
                <div flex justify-between>
                    <div class="admin-title">用户列表</div>
                    <div><el-button round mt4 w30 type="success" @click="openuserSelectDialog">添加</el-button></div>
                </div>
                <el-table height="82vh" :data="users" style="width: 100%" empty-text="该部门没有人员哦！">
                    <el-table-column prop="v0" label="用户id" sortable />
                    <el-table-column prop="v2" label="昵称" sortable />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button link type="danger" size="small" @click="delCasbinRules(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>


        <div>
            <el-dialog v-model="userSelectDialogVis" title="选择人员" width="50%">
                <el-table @select="handleUserSelectionChange" @select-all="handleUserSelectionChange" ref="selectUserForm"
                    :data="allUsers" style="width: 100%">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="uuid" label="用户id" sortable />
                    <el-table-column prop="nickname" label="昵称" sortable />
                    <el-table-column prop="createTime" label="创建时间" sortable />
                </el-table>
                <div flex justify-center>
                    <el-button round w50 mt @click="addUserBtnClick">
                        新增
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog v-model="addDepartDialogVis" title="添加部门" width="30%">
                <el-input placeholder="部门名称" v-model="addDepartParam.name"></el-input>
                <div mt></div>
                <el-input placeholder="部门权限标识" v-model="addDepartParam.role"></el-input>
                <div flex justify-center>
                    <el-button round w50 mt @click="addDepartBtnClick">
                        新增
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script setup>
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { addDepart, addRouterForDepart, resetAuthority, addUserForDepart, delCasbinRule, getAllDepart, getAllRouter, getAllUser, getRoutersByDepart, getUserByDepart } from '../../api/admin/rbac';
const departs = ref([])
const routers = ref([])
const users = ref([])
const selectDepart = ref('admin')

onMounted(async () => {
    await getAllDeparts()
    getAllRouters();

})
// 获取数据方法
const getAllDeparts = async () => {
    await getAllDepart().then(async res => {
        departs.value = res.data
        selectDepart.value = departs.value[0].role
        getUserByDeparts(selectDepart.value)
    })

}
const RefRouter = ref()

/**
 * 根据部门获取路由
 */
const getRoutersByDeparts = async departName => {
    const loadingInstance = ElLoading.service({ text: '加载中,请稍后...' })
    await getRoutersByDepart(departName).then(openRouters => {
        routers.value.forEach(allRouter => {
            allRouter.v4 = false
            for (let i = 0; i < openRouters.data.length; i++) {
                const openRouter = openRouters.data[i];
                if (allRouter.v1 === openRouter.v1) {
                    allRouter.v4 = true;
                    allRouter.id = openRouter.id;
                    break;
                } else {
                    allRouter.v4 = false;
                }
            }
        })

    })
    loadingInstance.close()
}
/**
 * 根据部门获取该部门用户
 */
const getUserByDeparts = departName => {
    getUserByDepart(departName).then(res => {
        users.value = res.data
    })
}
// 获取所有的路由
const getAllRouters = async () => {
    await getAllRouter().then(async res => {
        routers.value = res.data
        getRoutersByDeparts(selectDepart.value)
    })
}

// switchChange事件
const switchChange = async (param) => {
    const loadingInstance = ElLoading.service({ text: '加载中,请稍后...' })
    if (param.v4) {
        addRouterForDepart({ departName: selectDepart.value, routerName: param.v1 }).then(res => { })
        setTimeout(() => { getRoutersByDeparts(selectDepart.value) }, 500);
    } else {
        delCasbinRule(param.id).then(res => { })
    }

    loadingInstance.close()
}
// 部门切换事件
const selectMenu = param => {
    selectDepart.value = param.index
    getRoutersByDeparts(param.index)
    getUserByDeparts(param.index)
}
// 定义添加对话框数据
const userSelectDialogVis = ref(false);
const allUsers = ref([]);
// 打开选择用户对话框
const openuserSelectDialog = async () => {
    getAllUsers()
    userSelectDialogVis.value = !userSelectDialogVis.value
}
// 获取所有用户
const selectUserForm = ref()
const getAllUsers = () => {
    const loadingInstance = ElLoading.service({ text: '加载中,请稍后...' })
    getAllUser().then(res => {
        allUsers.value = res.data
        allUsers.value.forEach((allUser, index) => {
            users.value.forEach(selectUser => {
                if (allUser.uuid === selectUser.v0) {
                    allUsers.value.splice(index, index + 1)
                }
            });
        })
        loadingInstance.close()
    })

}
//  多选框选择添加用户事件
const selectUsers = ref([])
const handleUserSelectionChange = async param => {
    selectUsers.value = param
}
// 为某个部门添加人员
const addUserBtnClick = async () => {
    if (selectUsers.value.length === 0) {
        ElMessage.warning("您还未选择数据")
        return
    }
    const loadingInstance = ElLoading.service({ text: '加载中,请稍后...' })
    const req = {
        departName: selectDepart.value,
        users: selectUsers.value
    }
    await addUserForDepart(req).then(res => {
        userSelectDialogVis.value = !userSelectDialogVis.value
        getUserByDeparts(selectDepart.value)
    })
    loadingInstance.close()
}
// 
const delCasbinRules = uuid => {
    delCasbinRule(uuid).then(res => { getUserByDeparts(selectDepart.value) })
}

// 添加部门
const addDepartDialogVis = ref(false)
const addDepartParam = ref({
    uuid: '',
    name: '',
    role: ''

})
const addDepartBtnClick = () => {
    if (addDepartParam.value.name === '' || addDepartParam.value.role === '') {
        ElMessage.error('请确认是否有信息未填写！')
        return
    } else {
        addDepartParam.value.uuid = addDepartParam.value.role
    }
    addDepart(addDepartParam.value).then(res => {
        getAllDepart().then(res => {
            departs.value = res.data
            addDepartDialogVis.value = false
        })
    })

}
// 重置路由权限
const resetAuthorityBtnClick = async () => {
    ElMessageBox.alert('确认要重置所有部门的路由权限吗？  重置后您需要重新配置，重置后可以刷新所有的路由').then(async res => {
        const loadingInstance = ElLoading.service({ text: '重置中,请耐心等待...' })
        await resetAuthority().then(res => {
            loadingInstance.close();
        })
    }).finally(() => {

    })

}
</script>