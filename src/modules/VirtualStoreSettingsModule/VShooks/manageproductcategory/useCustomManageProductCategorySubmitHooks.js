import { addCategory } from "../../../../services/VirtualStoreSettingsApi";
import React, {memo} from "react"
import useCustomCategorySubmitHooks from "../defaultCategory/useCustomCategorySubmitHooks"
const useCustomManageProductCategorySubmitHooks = (values, portalId, externalId, merchantId)=>{
    return useCustomCategorySubmitHooks(values, portalId, externalId, merchantId, "Addcate" , 0)
}
export default useCustomManageProductCategorySubmitHooks

export const useCustomManageProductCategoryEditSubmitHooks = (values, portalId, externalId, merchantId, category_id, action)=>{
    return useCustomCategorySubmitHooks(values, portalId, externalId, merchantId, "EdiTcate" , 0, category_id, action)
}