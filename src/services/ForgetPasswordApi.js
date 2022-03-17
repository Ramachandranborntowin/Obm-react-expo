import updatedAccessToken from '../common_utilites/Apiconnector';
export const ForgetPasswordApi = (...props) => {
    const [email] = props
        //  return axios.get(`forgotuserpwd?email_id=${email}`)
        return updatedAccessToken('Get', `forgotuserpwd?email_id=${email}`)
}
export const validateOtpApi = (...props)=>{
    const [userId, otp] = props
    // return axios.get(`checkuserotp?user_id=${userId}&otp=${otp}`)
    return updatedAccessToken('Get', `checkuserotp?user_id=${userId}&otp=${otp}`)
}
export const newPasswordApi = (...props)=>{
    const [userId, newPassword] = props
    // return axios.get(`userpwdupdate?user_id=${userId}&password=${newPassword}`)
    return updatedAccessToken('Get', `userpwdupdate?user_id=${userId}&password=${newPassword}`)
}