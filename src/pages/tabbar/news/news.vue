<template>
    <view>
        <z-paging ref="pagingRef" v-model="dataList" @query="queryList" :auto="false" :empty-view-center="false">
            <template #top>
                <!-- Banner 轮播 -->
                <view>
                    <swiper class="h-48" circular :indicator-dots="true" :autoplay="true">
                        <swiper-item v-for="(item, index) in bannerData" :key="index">
                            <image :src="item.image" style="width: 100%" mode="widthFix"></image>
                        </swiper-item>
                    </swiper>
                </view>

                <!-- 分类切换 -->
                <view class="bg-white p-2">
                    <view class="flex border-b border-gray-200">
                        <view
                            v-for="(tab, index) in categoryData"
                            :key="index"
                            class="px-4 py-2 cursor-pointer"
                            :class="{
                                'text-blue-500 border-b-2 border-blue-500 font-medium': activeTab === tab.id,
                                'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300': activeTab !== tab.id,
                            }"
                            @click="handleTabClick(tab)">
                            {{ tab.category_name }}
                        </view>
                    </view>
                </view>
            </template>

            <!-- 新闻列表 -->
            <view class="container mx-auto p-2 space-y-2">
                <view
                    v-for="(item, index) in dataList"
                    :key="index"
                    class="bg-white rounded-xl shadow-sm overflow-hidden"
                    @click="saithink.href('/pages/common/article/article?id=' + item.id)">
                    <view class="flex p-2" v-if="item.image">
                        <view>
                            <image :src="item.image" class="w-32 h-24 rounded-xl" />
                        </view>
                        <view class="ml-2">
                            <view class="font-bold text-gray-800 leading-tight mb-2">
                                {{ item.title }}
                            </view>
                            <view class="text-gray-500 text-xs mb-2 line-clamp-2">
                                {{ item.describe }}
                            </view>
                            <view class="flex justify-end text-xs text-gray-400"> {{ item.create_time }} </view>
                        </view>
                    </view>
                    <view class="p-4" v-else>
                        <view>
                            <view class="font-bold text-gray-800 leading-tight mb-2">
                                {{ item.title }}
                            </view>
                            <view class="text-gray-500 text-xs mb-2 line-clamp-2">
                                {{ item.describe }}
                            </view>
                            <view class="flex justify-end text-xs text-gray-400"> {{ item.create_time }} </view>
                        </view>
                    </view>
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
import saithink from '@/utils/saithink'
import { bannerApi, categoryApi, articleListApi } from '@/api/common/cms.js'

const activeTab = ref('')
const categoryData = ref([])
const pagingRef = ref(null)
const bannerData = ref([])
const dataList = ref([])

function handleTabClick(tab) {
    activeTab.value = tab.id
    pagingRef.value.reload()
}

async function queryList(pageNo, pageSize, reload = false) {
    const resp = await articleListApi({
        page: pageNo,
        limit: pageSize,
        category_id: activeTab.value,
    })
    pagingRef.value.complete(resp.data.data)
}

onMounted(async () => {
    let res = await categoryApi()
    if (res.code == 200) {
        categoryData.value = [{ id: '', category_name: '全部' }, ...res.data]
    }
    res = await bannerApi()
    if (res.code == 200) {
        bannerData.value = res.data
    }
    queryList(1, 10)
})
</script>

<style lang="scss" scoped></style>
