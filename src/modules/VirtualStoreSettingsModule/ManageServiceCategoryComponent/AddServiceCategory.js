import React, {useMemo} from "react";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import ProductForm from "../CommonComponentsForVirtualStoreSettings/ProductPage";
import { connect } from "react-redux";
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import useCustomManageServiceCategoryFieldArrayHooks from "../VShooks/manageServiceCategory/useCustomManageServiceCategoryFieldArrayHooks";
import useCustomManageServiceCategoryInitialValuesHooks from "../VShooks/manageServiceCategory/useCustomManageServiceCategoryInitialValuesHooks";
import useCustomManageServiceCategoryValidationYupHooks from "../VShooks/manageServiceCategory/useCustomManageServiceCategoryValidationYupHooks";
import useCustomManageServiceCategorySubmitHooks from "../VShooks/manageServiceCategory/useCustomManageServiceCategorySubmitHooks";
const AddServiceCategory = (props) => {
  let fieldArray = useMemo(
    () => useCustomManageServiceCategoryFieldArrayHooks(),
    []
  );
  let initialValues = useMemo(
    () => useCustomManageServiceCategoryInitialValuesHooks(),
    []
  );
  const {
    merchant_portals_id,
    merchant_portals_external_id,
    merchant_portals_merchant_id,
  } = useMerchantidExternalid(3, props.loginData);
  return (
    <ProductForm
      navigation={props.navigation}
      routingName={props.route.name}
      buttonName={"Add Service Category"}
      portalId={merchant_portals_id}
      merchantId={merchant_portals_merchant_id}
      externalId={merchant_portals_external_id}
      imageSet={"categoreyImage"}
      fieldArray={fieldArray}
      initialValues={initialValues}
      validationYup={useCustomManageServiceCategoryValidationYupHooks}
      onSubmit={useCustomManageServiceCategorySubmitHooks}
      action={"Add"}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedAddServiceCategory = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={AddServiceCategory}
      headerTitle={"Add Service Category"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedAddServiceCategory);
