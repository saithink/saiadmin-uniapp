import { defineStore } from 'pinia'
import { reactive } from 'vue'

let defaultConfig = {
    site_name: 'saiadmin移动端',
    site_logo: '',
    site_desc: '',
    site_record_number: '',
    site_copyright: '',
    site_config: ''
}

const useSiteStore = defineStore(
    'site',
    () => {
        /**
         * 站点信息
         */
        const state = reactive({ ...defaultConfig })

        /**
         * 设置站点信息
         * @param {*} data
         */
        function setSiteInfo(data) {
            Object.assign(state, data)
        }

        return {
            state,
            setSiteInfo
        }
    },
    {
        /**
         * 站点信息持久化
         */
        persist: {
            key: 'storeSite',
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

export default useSiteStore
