
import useCustomCategoryValidationYupHooks, {useCustomCategoryEditValidationYupHooks, useCustomCategoryValidation} from "../defaultCategory/useCustomCategoryValidationYupHooks";
const useCustomManageProductCategoryValidationYupHooks = useCustomCategoryValidationYupHooks
export default useCustomManageProductCategoryValidationYupHooks;
export const useCustomManageProductCategoryEditValidationYupHooks = useCustomCategoryEditValidationYupHooks
export const useCustomManageCategoryValidation = (isimageEnabled = true)=>useCustomCategoryValidation(isimageEnabled)