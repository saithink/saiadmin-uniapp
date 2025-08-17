<template>
    <view class="bg-white p-4">
        <view class="">
            <view class="font-bold-500 text-xl"> {{ article.title }} </view>
            <view class="flex justify-between items-center my-2">
                <view>
                    <uni-icons type="calendar" color="#9ca3af" size="16"></uni-icons>
                    <text class="text-xs text-gray-400">{{ article.create_time }}</text>
                </view>
                <view class="text-xs text-gray-400">阅读 {{ article.views }}</view>
            </view>
            <view>
                <rich-text :nodes="richTxtFilter(article.content)"></rich-text>
            </view>
        </view>

        <view style="height: 60rpx"></view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { articleDetailApi, viewArticleApi } from '@/api/common/cms.js'

const article = ref({
    title: '',
    create_time: '',
    views: 0,
    content: '',
})

const richTxtFilter = (content) => {
    if (!content) return ''
    let val
    val = content.replace(/\<p/gi, '<p class="rich-txt-p" ')
    val = val.replace(/\<img/gi, '<img class="rich-txt-img" ')
    return val
}

onLoad(async (options) => {
    let res = await articleDetailApi({ id: options.id })
    if (res.code == 200) {
        article.value = res.data
    }

    setTimeout(() => {
        viewArticleApi({ id: options.id })
    }, 1000)
})
</script>

<style lang="scss" scoped>
::v-deep .rich-txt-p {
    font-size: 17px;
    padding-bottom: 10px;
    line-height: 30px;
    text-align: justify;
    word-break: break-all;
    word-wrap: break-word;
}
::v-deep .rich-txt-img {
    width: 100%;
    display: block;
    margin-bottom: 20px;
}
</style>
