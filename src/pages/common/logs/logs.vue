<template>
    <view>
        <z-paging ref="pagingRef" v-model="dataList" @query="queryList" :auto="false" :empty-view-center="false">
            <template #top>
                <view class="p-4">
                    <!-- 筛选标签 -->
                    <view class="flex space-x-2 mb-2 overflow-x-auto">
                        <text
                            :class="[activeTab == 1 ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200']"
                            class="px-3 py-1 rounded-full text-sm whitespace-nowrap"
                            @click="handleTabClick(1)"
                            >全部
                        </text>
                        <text
                            :class="[activeTab == 2 ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200']"
                            class="px-3 py-1 rounded-full text-sm whitespace-nowrap"
                            @click="handleTabClick(2)"
                            >成功
                        </text>
                        <text
                            :class="[activeTab == 3 ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200']"
                            class="px-3 py-1 rounded-full text-sm whitespace-nowrap"
                            @click="handleTabClick(3)"
                            >失败
                        </text>
                    </view>
                </view>
            </template>

            <!-- 积分列表 -->
            <view class="space-y-3 px-4">
                <!-- 记录项2 -->
                <view class="bg-white rounded-xl p-4 shadow-sm" v-for="item in dataList" :key="item.id">
                    <view class="flex justify-between items-start">
                        <view>
                            <view class="font-medium text-gray-800"
                                >{{ item.login_ip }}({{ item.login_location }})</view
                            >
                            <view class="text-xs text-gray-500 mt-1">{{ item.create_time }}</view>
                        </view>
                        <view class="text-right">
                            <view
                                :class="item.login_result == 1 ? 'text-green-500' : 'text-red-500'"
                                class="font-semibold">
                                {{ item.login_result == 1 ? '成功' : '失败' }}
                            </view>
                        </view>
                    </view>
                    <view class="flex items-center mt-2 text-xs text-gray-500"> {{ item.fail_reason }} </view>
                </view>
            </view>
            <template #bottom>
                <view style="height: 20px"></view>
            </template>
        </z-paging>
    </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { logsDetailApi } from '@/api/common/user.js'

const activeTab = ref(1)
const pagingRef = ref(null)
const dataList = ref([])

function handleTabClick(tab) {
    activeTab.value = tab
    pagingRef.value.reload()
}

async function queryList(pageNo, pageSize, reload = false) {
    let login_result = null
    if (activeTab.value == 2) {
        login_result = 1
    }
    if (activeTab.value == 3) {
        login_result = 0
    }
    const resp = await logsDetailApi({
        page: pageNo,
        limit: pageSize,
        login_result: login_result,
    })
    pagingRef.value.complete(resp.data.data)
}

onMounted(async () => {
    queryList(1, 10)
})
</script>

<style scoped></style>
