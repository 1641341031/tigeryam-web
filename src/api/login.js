import service from '../utils/request.js'

export function login(username, password) {
    return service({
        url: '/sso/login',
        method: 'post',
        data: {
            username,
            password,
            code
        }
    })
}

export function fetchVerifyCode() {
    return service({
        url: '/verify-code',
        method: 'get',
        responseType: 'arraybuffer'
    })
}

export function getRegisterCode(mailAddress) {
    return service({
        url: '/sso/registerCode',
        params: {
            mailAddress
        }
    })
}

export function register(username, email, password, registerCode){
    return service({
        url: '/sso/register',
        method: 'post',
        data: {
            username,
            email,
            password,
            registerCode
        }
    })
}

export function getForgetCode(mailAddress){
    return service({
        url: '/sso/fgPwdVerifyCode',
        method: 'post',
        data: {
            mailAddress
        }
    })
}

export function updatePassword(newPassword, mailAddress, username, verifyCode){
    return service({
        url: '/sso/updateForgetPassword',
        method: 'post',
        data: {
            newPassword,
            mailAddress,
            username,
            verifyCode
        }
    })
}