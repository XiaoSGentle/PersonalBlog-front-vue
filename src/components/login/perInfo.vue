<template>
    <!-- 头像 -->
    <div flex justify-center>
        <el-avatar :size="100" src="https://q3.qlogo.cn/headimg_dl?dst_uin=1537212231&spec=100" />
    </div>
    <!-- 其他信息 -->
    <div font-bold text-7 text-center>Xiaos</div>
    <div mt2 flex justify-center>
        <el-tag type="warning">
            <el-icon>
                <Male />
            </el-icon>
        </el-tag>
        <el-tag ml2>
            金牛座
        </el-tag>
        <el-tag ml2 type="danger">
            2001-08-21
        </el-tag>
    </div>
    <div mt8 flex justify-center>
        <div flex flex-wrap w300px h300px>
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
            <div p6 border-1 border-solid border-blueGray-2 hover:bg-blueGray-1 ease-in-out duration-300>
                <IconExit></IconExit>
                <div text-center>退出登录</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconDocument from '../icons/login/IconDocument.vue';
import IconCollect from '../icons/login/iconCollect.vue';
import IconSetting from '../icons/login/IconSetting.vue';
import IconExit from '../icons/login/IconExit.vue'
</script>