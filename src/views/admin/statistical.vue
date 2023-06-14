<template>
    <div>
        <!-- 系统信息 -->
        <el-card mt>
            <div class="admin-title">服务器信息</div>
            <!-- CPU运行信息 -->
            <div mt10 flex>

                <el-progress :stroke-width="14" type="dashboard" :percentage="kanBanInfo.sysInfo.cpuUsage" :color="colors"
                    :width="180">
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <div class="percentage-label" font-bold>CPU</div>
                    </template>
                </el-progress>
                <el-progress :stroke-width="14" ml10 type="dashboard" :percentage="kanBanInfo.sysInfo.ramUsage"
                    :color="colors" :width="180">
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <div class="percentage-label" font-bold>RAM</div>
                    </template>
                </el-progress>
                <div style="border-left:2px lightslategray solid " ml p5 text-5 font-bold class="w100%">
                    <div flex mt>
                        <span w40>CPU</span>
                        <span truncate w90>{{ kanBanInfo.sysInfo.cpuInfo }}</span>
                    </div>
                    <div flex mt>
                        <span w40>运行系统</span>
                        <span>{{ kanBanInfo.sysInfo.platform }}</span>
                    </div>

                    <div flex mt>
                        <span w40>Node版本</span>
                        <span>{{ kanBanInfo.sysInfo.node }}</span>
                    </div>
                </div>

                <div p5 text-5 font-bold class="w100%">
                    <div flex mt>
                        <span w40>总内存</span>
                        <span>{{ kanBanInfo.sysInfo.systemTotalMemory }}</span>
                    </div>
                    <div flex mt>
                        <span w40>内存总占用</span>
                        <span>{{ kanBanInfo.sysInfo.memoryTotalOccupy }}</span>
                    </div>

                    <div flex mt>
                        <span w40>堆总占用</span>
                        <span>{{ kanBanInfo.sysInfo.heapTotalOccupy }}</span>
                    </div>
                </div>
            </div>
        </el-card>
        <!--  -->
        <el-card mt>
            <div class="admin-title">网站统计</div>
            <div flex>
                <el-card ml>
                    <div h50 w50>
                        <div class="info-title">今日流量</div>
                        <div text-center>
                            <sapn text-17>{{ kanBanInfo.webInfo.flow_rate_count }}</sapn>
                            <span>次</span>
                        </div>
                    </div>
                </el-card>
                <el-card ml>
                    <div h50 w50>
                        <div class="info-title">新增留言</div>
                        <div text-center>
                            <sapn text-17>{{ kanBanInfo.webInfo.message_count }}</sapn>
                            <span>条</span>
                        </div>
                    </div>
                </el-card>
                <el-card ml>
                    <div h50 w50>
                        <div class="info-title">新增用户</div>
                        <div text-center>
                            <sapn text-17>{{ kanBanInfo.webInfo.sing_in_count }}</sapn>
                            <span>位</span>
                        </div>
                    </div>
                </el-card>
                <el-card ml>
                    <div h50 w50>
                        <div class="info-title">待审核笔记</div>
                        <div text-center>
                            <sapn text-17>{{ kanBanInfo.webInfo.article_count }}</sapn>
                            <span>篇</span>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-card>
    </div>
</template>


<script setup>
import { getSysInfo } from '../../api/admin/statistical'
import { ref, onMounted } from 'vue'

const kanBanInfo = ref({
    sysInfo: {},
    webInfo: {
        flow_rate_count: 0
    }
})

const colors = [
    { color: '#ff4c4c', percentage: 100 },
    { color: '#ff4c4c', percentage: 80 },
    { color: '#ffab3a', percentage: 60 },
    { color: '#1989fa', percentage: 40 },
    { color: '#6f7ad3', percentage: 20 },
]

onMounted(() => {
    getSys()
    // setInterval(() => { getSys() }, 5000)
})

const getSys = async () => {
    await getSysInfo().then(res => {
        kanBanInfo.value = res.data
    })
}
</script>

<style scoped>
.info-title {
    font-size: 18px;
    margin: 0rem 0rem 3rem 0rem;
    padding-left: 1rem;
    font-weight: bold;
    border-left: 4px solid rgb(107, 107, 107);
    line-height: 25px;
    border-radius: 4px;
}
</style>