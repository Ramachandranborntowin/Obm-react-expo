import { addCategory } from "../../../../services/VirtualStoreSettingsApi";
import React, {memo} from "react"
const useCustomCategorySubmitHooks = (values, portalId, externalId, merchantId, actionType, cat_type, category_id, action)=>{
    console.log('val',values, category_id, action)
    let data = new FormData();
    data.append("portal_id", portalId);
    data.append("external_id", externalId);
    data.append("merchant_id", merchantId);
    data.append("proname", values.categoryname);
    data.append("prodesc", values.categoryDescription);
    data.append("action", actionType);
    data.append("cat_type", cat_type);
    if(Object.keys(values.categoreyImage).length !== 0){
    data.append("idProfile", { ...values.categoreyImage, type: "image/jpeg" });
    }
    if(action == "Edit"){
    data.append("edit_id", category_id);
    }
    return addCategory(data)
}
export default useCustomCategorySubmitHooks