const validate = {
    /** 手机号 */
    isPhone(value) {
        return /^1[3-9]\d{9}$/.test(value)
    },
    /** 邮箱 */
    isEmail(value) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
    },
    /** 账号 */
    isAccount(value) {
        return /^[a-zA-Z0-9_]{4,16}$/.test(value)
    },
    /** 密码 */
    isPassword(value) {
        return /^[a-zA-Z0-9_]{6,16}$/.test(value)
    }
}

export default validate
