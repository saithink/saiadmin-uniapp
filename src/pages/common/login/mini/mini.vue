<template>
    <view class="account-container">
        <view class="bg-box">
            <image :src="siteStore.state.site_logo || '/static/logo.png'" mode="widthFix" style="width: 240rpx"></image>
            <view class="mt-2 text-gray-700"> {{ siteStore.state.site_name }}</view>
        </view>
        <view class="mt-8 p-4">
            <button
                class="btn-primary bg-blue-500 shadow-lg shadow-blue-500/50"
                hover-class="opacity-75"
                @click="onMnpLogin">
                <uni-icons type="weixin" size="20" color="#ffffff"></uni-icons>
                <text class="ml-2">微信一键登录</text>
            </button>
        </view>

        <view class="flex justify-center text-gray-700 mt-2 p-4">
            <label> <checkbox color="#3b82f6" value="agree" @click="handleChange('agree')" />已阅读并同意 </label>
            <text class="text-red-500" @click="saithink.href('/pages/common/agreement/agreement?type=1')">
                《用户协议》
            </text>
            <text>和</text>
            <text class="text-red-500" @click="saithink.href('/pages/common/agreement/agreement?type=2')">
                《隐私协议》
            </text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import saithink from '@/utils/saithink'
import { useSiteStore, useUserStore } from '@/stores'
import { mnpLoginApi } from '@/api/common/index.js'

const siteStore = useSiteStore()

const isCheck = ref(false)

function handleChange(val) {
    if (isCheck.value) {
        isCheck.value = false
    } else {
        isCheck.value = true
    }
}

// 微信一键登录
async function onMnpLogin() {
    if (!isCheck.value) {
        saithink.toast('请先阅读并同意用户协议和隐私协议')
        return false
    }
    const wxInfo = await wx.login()
    const resp = await mnpLoginApi({ code: wxInfo.code })
    if (resp.code === 200) {
        const userStore = useUserStore()
        userStore.setToken(resp.data)
        userStore.refreshUserInfo()
        saithink.toast('登录成功', 2000)
        setTimeout(() => {
            uni.reLaunch({
                url: '/pages/tabbar/index/index',
            })
        }, 500)
    }
}
</script>

<style>
.bg-box {
    padding-top: 44rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
