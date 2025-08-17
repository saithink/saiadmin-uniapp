<template>
    <view class="account-container">
        <view class="bg-box">
            <image src="/static/images/login/bg_login.png" class="bg-img"></image>
            <image :src="siteStore.state.site_logo || '/static/logo.png'" class="bg-logo"></image>
            <view class="bg-title"> {{ siteStore.state.site_name }} </view>
        </view>
        <form :report-submit="true" @submit="formLogin">
            <view class="login-from">
                <view class="line-cell">
                    <uni-icons type="phone" size="20" color="#6d7a87"></uni-icons>
                    <input class="form-input" placeholder="请输入手机号码" v-model="form.mobile" />
                    <button
                        size="mini"
                        class="bg-blue-500 shadow-lg shadow-blue-500/50 text-white"
                        hover-class="opacity-75"
                        @click="sendCode">
                        发送
                    </button>
                </view>
                <view class="line-cell mt-4">
                    <uni-icons type="chat" size="20" color="#6d7a87"></uni-icons>
                    <input class="form-input" placeholder="请输入短信验证码" v-model="form.mobile_code" />
                </view>
                <view class="line-cell mt-4">
                    <uni-icons type="info" size="20" color="#6d7a87"></uni-icons>
                    <input class="form-input" placeholder="请输入验证码" v-model="form.code" />
                    <image
                        :src="captchaCode"
                        style="width: 240rpx; height: 72rpx; cursor: pointer"
                        @click="refreshCaptcha"></image>
                </view>
                <view class="mt-6">
                    <button
                        class="btn-primary bg-blue-500 shadow-lg shadow-blue-500/50"
                        hover-class="opacity-75"
                        :disabled="disabled"
                        form-type="submit">
                        登录
                    </button>
                </view>
                <view class="register mt-2 p-4"> 没有注册的手机号将会自动注册 </view>
            </view>
        </form>
    </view>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import saithink from '@/utils/saithink'
import { useSiteStore, useUserStore } from '@/stores'
import validate from '@/utils/validate.js'
import { phoneLoginApi, sendCodeApi, captchaApi } from '@/api/common/index.js'

const siteStore = useSiteStore()

const captchaCode = ref()
const disabled = ref(false)
const form = reactive({
    mobile: '',
    mobile_code: '',
    code: '',
    uuid: '',
    type: 'app',
})

/** 刷新验证码 */
function refreshCaptcha() {
    form.code = ''
    form.uuid = ''
    captchaApi().then((res) => {
        if (res.code === 200) {
            captchaCode.value = res.data.image
            form.uuid = res.data.uuid
        }
    })
}

/** 发送短信 */
function sendCode() {
    if (!validate.isPhone(form.mobile)) {
        saithink.toast('请输入正确的手机号！')
        return false
    }
    sendCodeApi({
        mobile: form.mobile,
    }).then((res) => {
        if (res.code === 200) {
            saithink.toast('发送成功')
        }
    })
}

function formLogin() {
    if (!validate.isPhone(form.mobile)) {
        saithink.toast('请输入正确的手机号！')
        return false
    }
    if (form.mobile_code == '') {
        saithink.toast('请输入短信验证码！')
        return false
    }
    if (form.code == '') {
        saithink.toast('请输入验证码！')
        return false
    }
    disabled.value = true
    phoneLoginApi(form)
        .then((resp) => {
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
        .finally(() => {
            disabled.value = false
            refreshCaptcha()
        })
}

onMounted(() => {
    refreshCaptcha()
})
</script>

<style>
page {
    background-color: #fff;
}

.bg-box {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding-top: 44rpx;
}

.bg-logo {
    height: 138rpx;
    width: 138rpx;
    display: block;
    margin: 10rpx auto 0 auto;
    border-radius: 50%;
    position: relative;
    z-index: 2;
}

.bg-title {
    height: 40rpx;
    font-size: 30rpx;
    color: #fff;
    margin: 36rpx auto 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
}

.bg-img {
    width: 100%;
    height: 346rpx;
    display: block;
    position: absolute;
    top: 0;
}

.login-from {
    width: 100%;
    padding: 128rpx 104rpx 0 104rpx;
    box-sizing: border-box;
}

.form-input {
    font-size: 32rpx;
    flex: 1;
    display: inline-block;
    padding-left: 32rpx;
    box-sizing: border-box;
    overflow: hidden;
}

.line-cell {
    padding: 27rpx 0;
    display: -webkit-flex;
    display: flex;
    -webkiit-align-items: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
}

.line-cell::after {
    content: '';
    position: absolute;
    border-bottom: 1rpx solid #e0e0e0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    bottom: 0;
    right: 0;
    left: 0;
}

.register {
    margin-top: 20rpx;
    text-align: center;
    justify-content: center;
    font-size: 24rpx;
    color: #333;
    display: flex;
}
</style>
