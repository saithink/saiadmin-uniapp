import saithink from '@/utils/saithink'

/** 基本信息 */
export function userInfoApi() {
    return saithink.request('/app/saiuser/user/userInfo', 'get', {}, false, true)
}

/** 修改资料 */
export function updateProfileApi(params = {}) {
    return saithink.request('/app/saiuser/user/updateProfile', 'post', params)
}

/** 日志详情 */
export function logsDetailApi(params = {}) {
    return saithink.request('/app/saiuser/user/logsDetail', 'get', params)
}
