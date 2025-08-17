<template>
    <view class="flex items-center justify-center h-48">
        <uni-icons type="spinner-cycle" color="#999" size="40" />
    </view>
</template>

<script setup>
// #ifdef H5
import * as dd from 'dingtalk-jsapi'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores'
import saithink from '@/utils/saithink'
import { dingtalkCropIdApi, dingtalkLoginApi } from '@/api/common/index.js'

onLoad(async () => {
    if (dd.env.platform != 'notInDingTalk') {
        const response = await dingtalkCropIdApi()
        if (response.code === 200) {
            dd.ready(function () {
                dd.runtime.permission.requestAuthCode({
                    corpId: response.data, // 企业id
                    onSuccess: (info) => {
                        const code = info.code
                        dingtalkLoginApi({ code: code }).then((resp) => {
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
                        })
                    },
                    onFail: (err) => {
                        saithink.toast(err.errMsg || err)
                    },
                })
            })
        }
    } else {
        saithink.toast('请在钉钉中打开应用')
    }
})
// #endif
</script>

<style></style>
