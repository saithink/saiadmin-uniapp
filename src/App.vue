<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { siteInfoApi } from '@/api/common'
import { useSiteStore, useUserStore } from '@/stores'

onLaunch(async () => {
    const siteStore = useSiteStore()
    const userStore = useUserStore()
    const resp = await siteInfoApi()
    if (resp.code === 200) {
        siteStore.setSiteInfo(resp.data)
        userStore.refreshUserInfo()
    }
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@import './static/css/saithink.scss';
</style>
