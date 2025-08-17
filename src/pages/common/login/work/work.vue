<template>
    <view class="flex items-center justify-center h-48">
        <uni-icons type="spinner-cycle" color="#999" size="40" />
    </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores'
import saithink from '@/utils/saithink'
import { workOauthApi, workLoginApi } from '@/api/common/index.js'

/** 获取企业微信code */
function getWorkCode(options) {
    let obj = location.search.match(new RegExp('[\?\&]code=([^\&]+)', 'i'))
    if (obj && obj[1]) {
        return obj[1]
    } else {
        if (options && options.code) {
            return options.code
        }
        return false
    }
}

/** 企业微信Oauth */
async function workOauth() {
    const resp = await workOauthApi({ url: encodeURIComponent(window.location.href) })
    if (resp.code === 200) {
        window.location.href = resp.data
    }
}

/** 企业微信登录 */
async function onWorkLogin(options) {
    const code = getWorkCode(options)
    if (code == false) {
        await workOauth()
        return false
    }
    const resp = await workLoginApi({ code: code })
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

onLoad((options) => {
    onWorkLogin(options)
})
</script>

<style></style>
