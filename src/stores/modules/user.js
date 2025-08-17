import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userInfoApi } from '@/api/common/user.js'

const useUserStore = defineStore(
    'user',
    () => {
        /** 用户token */
        const token = ref(null)
        /** 用户信息 */
        const userInfo = ref(null)

        /**
         * 更新用户信息
         */
        async function refreshUserInfo() {
            const resp = await userInfoApi()
            if (resp.code === 200) {
                setUserInfo(resp.data)
            }
        }

        /**
         * 设置用户信息
         * @param {*} data
         */
        function setUserInfo(data) {
            userInfo.value = data
        }

        /**
         * 检查用户是否登录
         */
        function hasLogin() {
            if (token.value) {
                return true
            }
            return false
        }

        /**
         * 设置用户token
         * @param {*} data
         */
        function setToken(data) {
            token.value = data
        }

        /**
         * 获取用户token
         */
        function getToken() {
            return token.value
        }

        /**
         * 清除用户信息
         */
        function clearUserInfo() {
            userInfo.value = null
        }

        /**
         * 清除用户token
         */
        function clearToken() {
            token.value = null
        }

        /**
         * 退出登录
         */
        function logOut() {
            clearUserInfo()
            clearToken()
        }

        return {
            token,
            userInfo,
            refreshUserInfo,
            setUserInfo,
            hasLogin,
            setToken,
            getToken,
            clearToken,
            clearUserInfo,
            logOut
        }
    },
    {
        /**
         * 用户信息持久化
         */
        persist: {
            key: 'storeUser',
            storage: {
                getItem(key) {
                    return uni.getStorageSync(key)
                },
                setItem(key, value) {
                    uni.setStorageSync(key, value)
                }
            }
        }
    }
)

export default useUserStore
