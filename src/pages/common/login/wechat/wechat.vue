<template>
    <view class="flex items-center justify-center h-48">
        <uni-icons type="spinner-cycle" color="#999" size="40" />
    </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores'
import saithink from '@/utils/saithink'
import { wechatOauthApi, wechatLoginApi } from '@/api/common/index.js'

/** 获取微信登录code */
function getWechatCode(options) {
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

/** 微信公众号Oauth */
async function wechatOauth() {
    const resp = await wechatOauthApi({ url: encodeURIComponent(window.location.href) })
    if (resp.code === 200) {
        window.location.href = resp.data
    }
}

/** 微信公众号登录 */
async function onMnpLogin(options) {
    const code = getWechatCode(options)
    if (code == false) {
        wechatOauth()
        return false
    }
    const resp = await wechatLoginApi({ code: code })
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
    onMnpLogin(options)
})
</script>

<style></style>
