<template>
    <view class="agreement tn-safe-area-inset-bottom">
        <view class="p-4">
            <view v-html="info.content"></view>
        </view>

        <view style="height: 100px"></view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { protocol } from '@/api/common/index.js'

const info = ref({
    title: '',
    content: '',
})

onLoad((option) => {
    if (option && option.type) {
        protocol(option.type).then((resp) => {
            if (resp.code == 200) {
                info.value = resp.data
            }
        })
    }
})
</script>
