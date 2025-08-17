<template>
    <view>
        <!-- Banner 轮播 -->
        <view class="relative overflow-hidden h-48 bg-gray-200 animate-fadeIn">
            <view
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 opacity-90">
                <view class="text-center px-4">
                    <view class="text-2xl font-bold text-white mb-2">探索精彩世界</view>
                    <view class="text-white opacity-90">发现最新资讯与活动</view>
                    <button
                        class="mt-3 px-4 py-2 bg-white text-blue-600 rounded-full text-sm font-medium shadow-md hover:bg-gray-100 transition duration-300">
                        立即了解
                    </button>
                </view>
            </view>
        </view>

        <!-- 快捷入口 -->
        <view class="container mx-auto px-4 py-4 -mt-6 z-10 relative">
            <view class="bg-white rounded-xl shadow-md p-4 grid grid-cols-4 gap-4">
                <view class="flex flex-col items-center justify-center">
                    <view class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <uni-icons type="calendar" color="#3b82f6" size="24"></uni-icons>
                    </view>
                    <text class="text-xs text-gray-600">新闻</text>
                </view>
                <view class="flex flex-col items-center justify-center">
                    <view class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <uni-icons type="chat" color="#22c55e" size="24"></uni-icons>
                    </view>
                    <text class="text-xs text-gray-600">活动</text>
                </view>
                <view class="flex flex-col items-center justify-center">
                    <view class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                        <uni-icons type="videocam" color="#f97316" size="24"></uni-icons>
                    </view>
                    <text class="text-xs text-gray-600">视频</text>
                </view>
                <view class="flex flex-col items-center justify-center">
                    <view class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        <uni-icons type="pyq" color="#a855f7" size="24"></uni-icons>
                    </view>
                    <text class="text-xs text-gray-600">社区</text>
                </view>
            </view>
        </view>

        <!-- 新闻标题 -->
        <view class="container mx-auto px-4 py-4 flex justify-between items-center">
            <view class="text-lg font-bold text-gray-800">最新资讯</view>
            <view class="text-sm text-blue-500 flex items-center" @click="saithink.switch('/pages/tabbar/news/news')">
                更多 <uni-icons type="arrow-right" color="#3b82f6" size="24"></uni-icons>
            </view>
        </view>

        <!-- 新闻列表 -->
        <!-- 新闻列表 -->
        <view class="container mx-auto px-4 space-y-4">
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

        <!-- 专题板块 -->
        <view class="container mx-auto px-4 py-6">
            <view class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
                <view class="font-bold text-lg mb-2">特别专题</view>
                <view class="text-sm opacity-90 mb-4">探索宇宙奥秘：人类太空探索全记录</view>
                <button
                    class="px-4 py-2 bg-white text-purple-600 rounded-full text-sm font-medium shadow-md hover:bg-gray-100 transition duration-300">
                    查看详情
                </button>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import saithink from '@/utils/saithink.js'
import { articleListApi } from '@/api/common/cms.js'
const dataList = ref([])

onMounted(async () => {
    let res = await articleListApi({ limit: 5 })
    if (res.code == 200) {
        dataList.value = res.data.data
    }
})
</script>

<style lang="scss" scoped></style>
