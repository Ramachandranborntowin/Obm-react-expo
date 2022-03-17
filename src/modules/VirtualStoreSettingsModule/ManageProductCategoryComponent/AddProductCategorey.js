import React, {useMemo} from "react";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import ProductForm from "../CommonComponentsForVirtualStoreSettings/ProductPage";
import { connect } from "react-redux";
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import useCustomManageProductCategoryFieldArrayHooks from "../VShooks/manageproductcategory/useCustomManageProductCategoryFieldArrayHooks";
import useCustomManageproductCategoryInitialValuesHooks from "../VShooks/manageproductcategory/useCustomManageProductCategoryInitialValuesHooks";
import useCustomManageProductCategorySubmitHooks from "../VShooks/manageproductcategory/useCustomManageProductCategorySubmitHooks";
import {useCustomManageCategoryValidation} from "../VShooks/manageproductcategory/useCustomManageProductCategoryValidationYupHooks";
const AddProductCategory = (props) => {
  let fieldArray = useMemo(()=>useCustomManageProductCategoryFieldArrayHooks(), [])
  let initialValues = useMemo(()=>useCustomManageproductCategoryInitialValuesHooks(), [])
  const {
    merchant_portals_id,
    merchant_portals_external_id,
    merchant_portals_merchant_id,
  } = useMerchantidExternalid(3, props.loginData);
  return (
    <ProductForm
      navigation={props.navigation}
      buttonName={"Add Product Category"}
      routingName={props.route.name}
      portalId={merchant_portals_id}
      merchantId={merchant_portals_merchant_id}
      externalId={merchant_portals_external_id}
      imageSet={"categoreyImage"}
      fieldArray={fieldArray}
      initialValues={initialValues}
      validationYup={useCustomManageCategoryValidation}
      onSubmit={useCustomManageProductCategorySubmitHooks}
      action={"Add"}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedAddProductCategory = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={AddProductCategory}
      headerTitle={"Add Product Category"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedAddProductCategory);
