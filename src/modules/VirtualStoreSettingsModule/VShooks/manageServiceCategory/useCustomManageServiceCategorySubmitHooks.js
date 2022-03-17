import { addCategory } from "../../../../services/VirtualStoreSettingsApi";
import React, {memo} from "react"
import useCustomCategorySubmitHooks from "../defaultCategory/useCustomCategorySubmitHooks"
const useCustomManageServiceCategorySubmitHooks = (values, portalId, externalId, merchantId)=>{
    return useCustomCategorySubmitHooks(values, portalId, externalId, merchantId, "Addcate" , 1)
}
export default useCustomManageServiceCategorySubmitHooks