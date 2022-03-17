import updatedAccessToken from '../common_utilites/Apiconnector';
export const LoginApi = (...props) =>{
    const [username, password] = props
    return updatedAccessToken('Get', `user/login?username=${username}&password=${password}`)
}
export const commonData = ()=>{
    return updatedAccessToken('Get', `commondata`)
}