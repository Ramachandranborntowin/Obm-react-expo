import updatedAccessToken from '../common_utilites/Apiconnector';
export const QrgeneratorApi = (...props)=>{
    const [data] = props
    return updatedAccessToken('Post','transaction',data, {
        headers: {
            'Content-Type': `multipart/form-data`
        }
    })
}
export const TransactionSuccessApi = (...props)=>{
    const [merchant_id, trans_id] = props
    return updatedAccessToken('Get', `transaction/verify?merchant_id=${merchant_id}&trans_id=${trans_id}`, '', '', true)
}