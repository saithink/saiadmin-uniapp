<template>
    <view class="p-2">
        <view class="flex flex-col items-center bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg p-4">
            <view class="my-8 text-white text-2xl font-bold"> 多平台登录中心</view>
        </view>

        <view class="grid grid-cols-2 gap-4 mt-4">
            <view class="bg-red-500 shadow-lg shadow-red-500/50 rounded-lg text-center text-white p-4">
                <view @click="saithink.href('/pages/common/login/account/account')"> 账号登录 </view>
            </view>
            <view class="bg-purple-500 shadow-lg shadow-purple-500/50 rounded-lg text-center text-white p-4">
                <view @click="saithink.href('/pages/common/login/phone/phone')"> 手机登录 </view>
            </view>
            <view class="bg-green-500 shadow-lg shadow-green-500/50 rounded-lg text-center text-white p-4">
                <view @click="saithink.href('/pages/common/login/mini/mini')"> 小程序登录 </view>
            </view>
            <view class="bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-lg text-center text-white p-4">
                <view @click="saithink.href('/pages/common/login/wechat/wechat')"> 公众号登录 </view>
            </view>
            <view class="bg-orange-500 shadow-lg shadow-orange-500/50 rounded-lg text-center text-white p-4">
                <view @click="saithink.href('/pages/common/login/work/work')"> 企业微信登录 </view>
            </view>
            <view class="bg-yellow-500 shadow-lg shadow-yellow-500/50 rounded-lg text-center text-white p-4">
                <view @click="saithink.href('/pages/common/login/dingtalk/dingtalk')"> 钉钉登录 </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import saithink from '@/utils/saithink'
</script>
