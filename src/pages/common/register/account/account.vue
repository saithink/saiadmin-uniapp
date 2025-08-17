<template>
    <view class="account-container">
        <view class="bg-box">
            <image src="/static/images/login/bg_login.png" class="bg-img"></image>
            <image :src="siteStore.state.site_logo || '/static/logo.png'" class="bg-logo"></image>
            <view class="bg-title"> {{ siteStore.state.site_name }} </view>
        </view>
        <form :report-submit="true" @submit="formRegister">
            <view class="login-from">
                <view class="line-cell">
                    <uni-icons type="email" size="20" color="#6d7a87"></uni-icons>
                    <input class="form-input" placeholder="请输入邮箱地址" v-model="form.email" />
                    <button
                        size="mini"
                        class="bg-blue-500 shadow-lg shadow-blue-500/50 text-white"
                        hover-class="opacity-75"
                        @click="sendEmail">
                        发送
                    </button>
                </view>
                <view class="line-cell mt-2">
                    <uni-icons type="paperplane" size="20" color="#6d7a87"></uni-icons>
                    <input class="form-input" placeholder="请输入邮箱验证码" v-model="form.email_code" />
                </view>
                <view class="line-cell mt-2">
                    <uni-icons type="person" size="20" color="#6d7a87"></uni-icons>
                    <input class="form-input" placeholder="请输入账号,大于4个字符" v-model="form.username" />
                </view>
                <view class="line-cell mt-2">
                    <uni-icons type="locked" size="20" color="#6d7a87"></uni-icons>
                    <input
                        class="form-input"
                        type="password"
                        placeholder="请输入密码,大于6个字符"
                        v-model="form.password" />
                </view>
                <view class="line-cell mt-2">
                    <uni-icons type="locked" size="20" color="#6d7a87"></uni-icons>
                    <input
                        class="form-input"
                        type="password"
                        placeholder="请输入确认密码"
                        v-model="form.password_verify" />
                </view>
                <view class="line-cell mt-2">
                    <uni-icons type="info" size="20" color="#6d7a87"></uni-icons>
                    <input class="form-input" placeholder="请输入验证码" v-model="form.code" />
                    <image
                        :src="captchaCode"
                        style="width: 240rpx; height: 72rpx; cursor: pointer"
                        @click="refreshCaptcha"></image>
                </view>
                <view class="mt-4">
                    <button
                        class="btn-primary bg-blue-500 shadow-lg shadow-blue-500/50"
                        hover-class="opacity-75"
                        :disabled="disabled"
                        form-type="submit">
                        注册
                    </button>
                </view>
                <view class="flex justify-center text-gray-700 mt-2 p-4">
                    已有账号？点击
                    <view class="ml-2" @click.stop>
                        <navigator class="text-red-500" url="/pages/common/login/account/account"> 登录 </navigator>
                    </view>
                </view>
            </view>
        </form>
    </view>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import saithink from '@/utils/saithink'
import { useSiteStore } from '@/stores'

import validate from '@/utils/validate.js'
import { registerApi, sendEmailApi, captchaApi } from '@/api/common/index.js'

const siteStore = useSiteStore()

const captchaCode = ref()
const disabled = ref(false)
const form = reactive({
    email: '',
    email_code: '',
    username: '',
    password: '',
    password_verify: '',
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

/** 发送邮件 */
function sendEmail() {
    if (!validate.isEmail(form.email)) {
        saithink.toast('请输入正确的邮箱！')
        return false
    }
    sendEmailApi({
        email: form.email,
    }).then((res) => {
        if (res.code === 200) {
            saithink.toast('发送成功')
        }
    })
}

/** 注册账号 */
function formRegister() {
    if (!validate.isEmail(form.email)) {
        saithink.toast('请输入正确的邮箱！')
        return false
    }
    if (form.email_code == '') {
        saithink.toast('请输入邮箱验证码！')
        return false
    }
    if (!validate.isAccount(form.username)) {
        saithink.toast('请输入正确的账号！')
        return false
    }
    if (!validate.isPassword(form.password)) {
        saithink.toast('请输入正确的密码！')
        return false
    }
    if (form.password_verify != form.password) {
        saithink.toast('两次密码不一致！')
        return false
    }
    if (form.code == '') {
        saithink.toast('请输入验证码！')
        return false
    }
    disabled.value = true
    registerApi(form)
        .then((resp) => {
            if (resp.code === 200) {
                saithink.toast('注册成功', 2000)
                setTimeout(() => {
                    uni.reLaunch({
                        url: '/pages/common/login/account/account',
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
    padding: 128rpx 80rpx 0 80rpx;
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
