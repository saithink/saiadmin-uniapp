import saithink from '@/utils/saithink'

/** 站点信息 */
export function siteInfoApi() {
    return saithink.request('/app/saiuser/index/siteInfo', 'get')
}

/** 字典信息 */
export function dictDataApi(params = {}) {
    return saithink.request('/app/saiuser/index/dictData', 'get', params)
}

/** 协议 */
export function protocol(type) {
    return saithink.request('/app/saiuser/index/protocol?type=' + type, 'get')
}

/** 验证码 */
export function captchaApi(params = {}) {
    return saithink.request('/app/saiuser/index/captcha', 'get', params)
}

/** 注册账户-发送邮件 */
export function sendEmailApi(params = {}) {
    return saithink.request('/app/saiuser/index/sendEmail', 'post', params)
}

/** 找回密码-发送邮件 */
export function sendForgotEmailApi(params = {}) {
    return saithink.request('/app/saiuser/index/sendForgotEmail', 'post', params)
}

/** 登录 */
export function loginApi(params = {}) {
    return saithink.request('/app/saiuser/index/accountLogin', 'post', params)
}

/** 注册 */
export function registerApi(params = {}) {
    return saithink.request('/app/saiuser/index/accountRegister', 'post', params)
}

/** 密码重置 */
export function emailResetApi(params = {}) {
    return saithink.request('/app/saiuser/index/emailReset', 'post', params)
}

/** 发送短信验证码 */
export function sendCodeApi(params = {}) {
    return saithink.request('/app/saiuser/index/sendCode', 'post', params)
}

/** 手机号登录 */
export function phoneLoginApi(params = {}) {
    return saithink.request('/app/saiuser/index/phoneLogin', 'post', params)
}

/** 小程序登录 */
export function mnpLoginApi(params = {}) {
    return saithink.request('/app/saiuser/index/mnpLogin', 'post', params)
}

/** 微信公众号-构造OAuth 链接 */
export function wechatOauthApi(params = {}) {
    return saithink.request('/app/saiuser/index/wechatOauth', 'post', params)
}

/** 微信公众号-登录 */
export function wechatLoginApi(params = {}) {
    return saithink.request('/app/saiuser/index/wechatLogin', 'post', params)
}

/** 企业微信-构造OAuth 链接 */
export function workOauthApi(params = {}) {
    return saithink.request('/app/saiuser/index/workOauth', 'post', params)
}

/** 企业微信-登录 */
export function workLoginApi(params = {}) {
    return saithink.request('/app/saiuser/index/workLogin', 'post', params)
}

/** 钉钉-获取CorpId */
export function dingtalkCropIdApi(params = {}) {
    return saithink.request('/app/saiuser/index/dingtalkCropId', 'post', params)
}

/** 钉钉-登录 */
export function dingtalkLoginApi(params = {}) {
    return saithink.request('/app/saiuser/index/dingtalkLogin', 'post', params)
}
