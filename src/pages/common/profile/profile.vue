<template>
    <view>
        <div class="p-4">
            <!-- 头像上传 -->
            <div class="flex flex-col items-center mb-8">
                <div class="relative mb-3" @click="uploadAvatar">
                    <img
                        :src="formData.avatar || '/static/images/login/mine_avatar.png'"
                        class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                    <view class="absolute bottom-0 right-0 bg-blue-500 text-white px-1 rounded-full shadow-md">
                        <uni-icons type="camera" size="24" color="#fff"></uni-icons>
                    </view>
                </div>
                <span class="text-blue-500 text-sm font-medium">点击更换头像</span>
            </div>

            <!-- 表单区域 -->
            <div class="space-y-5">
                <!-- 昵称 -->
                <div class="bg-white rounded-xl p-4 shadow-sm">
                    <label class="block text-xs text-gray-500 mb-1">昵称</label>
                    <input
                        v-model="formData.nickname"
                        placeholder="请输入昵称"
                        class="w-full border-0 p-0 text-gray-800 font-medium focus:ring-0 focus:outline-none" />
                </div>
            </div>
        </div>

        <!-- 保存按钮 -->
        <view class="p-4">
            <button
                class="btn-primary bg-blue-500 shadow-lg shadow-blue-500/50"
                hover-class="opacity-75"
                @click="saveProfile"
                form-type="submit">
                保存
            </button>
        </view>
    </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import saithink from '@/utils/saithink'
import { useUserStore } from '@/stores/index.js'
import { updateProfileApi } from '@/api/common/user.js'

const userStore = useUserStore()

const formData = reactive({
    nickname: userStore.userInfo.nickname,
    avatar: userStore.userInfo.avatar,
})

/**
 * 修改资料
 */
async function saveProfile() {
    updateProfileApi({
        nickname: formData.nickname,
        avatar: formData.avatar,
    }).then((res) => {
        if (res.code === 200) {
            userStore.refreshUserInfo()
            saithink.toast('保存成功')
        }
    })
}

/**
 * 上传头像
 */
function uploadAvatar() {
    uni.chooseImage({
        count: 1,
        success: async (res) => {
			let avatar = await saithink.uploadFile('image', res.tempFilePaths[0])
			formData.avatar = avatar
        },
    })
}
</script>
