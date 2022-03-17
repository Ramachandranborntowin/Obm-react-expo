import updatedAccessToken from '../common_utilites/Apiconnector';
export const LoyaltyListApi = (...props) =>{
    const [portalId, merchantId, externalId, fromdate, todate] = props
    return updatedAccessToken('Get', `portal/orders?portal_id=${portalId}&merchant_id=${merchantId}&external_id=${externalId}&fromdate=${fromdate}&todate=${todate}`)
}
// portal/orders?portal_id=6&merchant_id=115&external_id=20&fromdate=01-01-2021&todate=01-06-2021
// portal_id=6&merchant_id=115&external_id=20
export const AddOfferApi = (...props)=>{
    const[data] = props
    console.log('ddd', data);
    return updatedAccessToken('Post', `brp/offer-post`, data, {
        headers: {
            'Content-Type': `multipart/form-data`
        }
    })
}
export const MerchantBranchApi = (...props)=>{
    const [portalId, merchantId, externalId] = props
    return updatedAccessToken(`Get`, `brp/merchant-branch?portal_id=${portalId}&merchant_id=${merchantId}&external_id=${externalId}`)
}
export const ManageOfferApi = (...props)=>{
    const [portalId, merchantId, externalId, status] = props
    return updatedAccessToken('Get', `brp/manageoffers?portal_id=${portalId}&merchant_id=${merchantId}&external_id=${externalId}&status=${status}`)
}
// export const OfferDetialsApi = (...props) =>{
//     const [portalId, merchantId, externalId, offerId] = props
//     return updatedAccessToken('Get', `brp/offerdetails?portal_id=6&merchant_id=115&external_id=21&offer_id=305`)
// }
export const GetPointsApi = (...props)=>{
    const [portalId, merchantId, externalId, number] = props
    return updatedAccessToken('Get', `brp/getpoints?portal_id=${portalId}&merchant_id=${merchantId}&external_id=${externalId}&amount=${number}`)
}
export const IssuePointApi = (...props)=>{
    const [portalId, merchantId, externalId] = props
    return updatedAccessToken('Get', `brp/merchant?portal_id=${portalId}&merchant_id=${merchantId}&external_id=${externalId}`)
}
export const CommonDataApi = (...props)=>{
    const [portalId, merchantId, externalId] = props
    return updatedAccessToken('Get', `brp/merchant/commondata?portal_id=${portalId}&merchant_id=${merchantId}&external_id=${externalId}`)
}
export const MerchantIssuePoints = (...props)=>{
    const [portalId, merchantId, externalId, memberId, couponCode, xspoint, amount] = props
    return updatedAccessToken('Get', `brp/merchantissuepoint?portal_id=${portalId}&merchant_id=${merchantId}&external_id=${externalId}&mem_id=${memberId}&coupon_code=${couponCode}&xspoint=${xspoint}&amount=${amount}`)
}
export const CouponValidApi = (...props)=>{
    const [portalId, merchantId, externalId, couponCode] = props
    return updatedAccessToken('Get', `brp/couponvalid?portal_id=${portalId}&merchant_id=${merchantId}&external_id=${externalId}&coupon_code=${couponCode}`)
}
// /api/brp/merchantissuepoint
// `brp/getpoints?portal_id=6&merchant_id=115&external_id=21&amount=5`