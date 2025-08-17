<template>
    <view>
        <view class="top-container">
            <image class="bg-img" src="/static/images/login/mine_bg.png"></image>
            <view v-if="userStore.userInfo" @tap="logout" class="logout">
                <image class="w-4 h-4" src="/static/images/login/icon_out.png"></image>
                <text class="text-white ml-2">退出</text>
            </view>
            <view v-else @tap="clear" class="logout">
                <image class="w-4 h-4" src="/static/images/login/icon_clear.png"></image>
                <text class="text-white ml-2">清理缓存</text>
            </view>
            <view class="relative flex flex-col justify-center items-center">
                <image
                    class="w-16 h-16 rounded-full"
                    :src="userStore.userInfo?.avatar || '/static/images/login/mine_avatar.png'"></image>
                <view class="mt-4 text-white">
                    <text v-if="userStore.userInfo">昵称：{{ userStore.userInfo.nickname }}</text>
                    <text v-else @click="saithink.authHref('/pages/common/profile/profile')">点击登录</text>
                </view>
            </view>
        </view>

        <view class="p-2 mt-1">
            <block v-for="(item, index) in list" :key="index">
                <!--  #ifdef  MP-WEIXIN -->
                <button v-if="item.value == 4" class="btn-normal" open-type="contact">
                    <view class="bg-white rounded-lg mb-2 p-2">
                        <view class="flex items-center gap-4 p-2">
                            <image class="w-6 h-6" :src="item.icon"></image>
                            <view class="flex-1 fs-15">{{ item.lable }}</view>
                            <uni-icons type="right" size="20"></uni-icons>
                        </view>
                    </view>
                </button>
                <!--  #endif -->
                <!--  #ifndef  MP-WEIXIN -->
                <button v-if="item.value == 4" class="btn-normal" @click="saithink.makePhone(siteStore.state.contact)">
                    <view class="bg-white rounded-lg mb-2 p-2">
                        <view class="flex items-center gap-4 p-2">
                            <image class="w-6 h-6" :src="item.icon"></image>
                            <view class="flex-1 fs-15">{{ item.lable }}</view>
                            <uni-icons type="right" size="20"></uni-icons>
                        </view>
                    </view>
                </button>
                <!--  #endif -->
                <view v-else @click="onClick(item)" class="bg-white rounded-lg mb-2 p-2">
                    <view class="flex items-center gap-4 p-2">
                        <image class="w-6 h-6" :src="item.icon"></image>
                        <view class="flex-1 fs-15">{{ item.lable }}</view>
                        <uni-icons type="right" size="20"></uni-icons>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore, useSiteStore } from '@/stores/index.js'
import saithink from '@/utils/saithink'

const userStore = useUserStore()
const siteStore = useSiteStore()

const list = reactive([
    {
        lable: '账号设置',
        value: 2,
        auth: true,
        icon: '/static/images/my/zhsz.png',
        path: '/pages/common/profile/profile',
    },
    { lable: '日志中心', value: 3, auth: true, icon: '/static/images/my/rzzx.png', path: '/pages/common/logs/logs' },
    { lable: '联系客服', value: 4, icon: '/static/images/my/lxkf.png', path: '' },
    {
        lable: '使用协议',
        value: 5,
        icon: '/static/images/my/syxy.png',
        path: '/pages/common/agreement/agreement?type=4',
    },
    {
        lable: '隐私协议',
        value: 6,
        icon: '/static/images/my/ysxy.png',
        path: '/pages/common/agreement/agreement?type=2',
    },
])

/**
 * 退出登录
 */
function logout() {
    saithink.modal('提示', '确定要退出系统吗？', true, (res) => {
        if (res) {
            userStore.logOut()
            saithink.toast('退出成功')
        }
    })
}

/**
 * 清理缓存
 */
function clear() {
    saithink.modal('提示', '确定要清理缓存吗？', true, (res) => {
        if (res) {
            userStore.logOut()
            saithink.toast('清理成功')
        }
    })
}

/**
 * 点击事件
 */
function onClick(item) {
    if (item.path) {
        if (item.auth) {
            saithink.authHref(item.path)
        } else {
            saithink.href(item.path)
        }
    }
}
</script>

<style lang="scss" scoped>
.top-container {
    height: 320rpx;
    position: relative;
    display: flex;
    flex-direction: column;
}

.bg-img {
    position: absolute;
    width: 100%;
    height: 320rpx;
}

.logout {
    width: 240rpx;
    height: 36rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 24rpx 0 0 24rpx;
    position: relative;
    z-index: 2;
}

.btn-normal {
    display: block;
    margin: 0;
    padding: 0;
    line-height: normal;
    background: none;
    border-radius: 0;
    box-shadow: none;
    border: none;
    font-size: unset;
    text-align: unset;
    overflow: visible;
    color: inherit;
}

.btn-normal:after {
    border: none;
}

.btn-normal.button-hover {
    color: inherit;
}

button:after {
    content: none;
    border: none;
}
</style>
