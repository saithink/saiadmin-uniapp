import saithink from '@/utils/saithink'

/** 分类列表 */
export function categoryApi(params = {}) {
    return saithink.request('/app/saiuser/cms/category', 'get', params)
}

/** 轮播列表 */
export function bannerApi(params = {}) {
    return saithink.request('/app/saiuser/cms/banner', 'get', params)
}

/** 文章列表 */
export function articleListApi(params = {}) {
    return saithink.request('/app/saiuser/cms/articleList', 'get', params)
}

/** 文章详情 */
export function articleDetailApi(params = {}) {
    return saithink.request('/app/saiuser/cms/articleDetail', 'get', params)
}

/** 文章阅读 */
export function viewArticleApi(params = {}) {
    return saithink.request('/app/saiuser/cms/viewArticle', 'post', params)
}
