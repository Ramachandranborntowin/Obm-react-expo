import React, {useMemo} from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import ProductForm from '../CommonComponentsForVirtualStoreSettings/ProductPage';
import { connect } from "react-redux";
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import useCustomManageProductCategoryFieldArrayHooks from "../VShooks/manageproductcategory/useCustomManageProductCategoryFieldArrayHooks";
import useCustomManageproductCategoryInitialValuesHooks from "../VShooks/manageproductcategory/useCustomManageProductCategoryInitialValuesHooks";
import {useCustomManageProductCategoryEditSubmitHooks} from "../VShooks/manageproductcategory/useCustomManageProductCategorySubmitHooks";
import {useCustomManageCategoryValidation} from "../VShooks/manageproductcategory/useCustomManageProductCategoryValidationYupHooks";
const EditProductCategory = (props) => {
  console.log('propssss0', props.route.params?.navigationParam)
  console.log('propssss0', props.route.params?.upload_url)
  let fieldArray = useCustomManageProductCategoryFieldArrayHooks()
  let initialValues = useCustomManageproductCategoryInitialValuesHooks()
  const {
    merchant_portals_id,
    merchant_portals_external_id,
    merchant_portals_merchant_id,
  } = useMerchantidExternalid(3, props.loginData);
  return (
      <ProductForm 
      routingName = {props.route.name} 
      navigation={props.navigation}
      buttonName={'Edit Product Category'} 
      portalId={merchant_portals_id}
      merchantId={merchant_portals_merchant_id}
      externalId={merchant_portals_external_id}
      imageSet={"categoreyImage"}
      fieldArray={fieldArray}
      initialValues={{...initialValues,
         categoryname: props.route.params?.navigationParam.cat_name,
         categoryDescription: props.route.params?.navigationParam.cat_desc,
         categoreyImage: {}
        }}
        id = {props.route.params?.navigationParam.catid}
      validationYup={useCustomManageCategoryValidation}
      onSubmit={useCustomManageProductCategoryEditSubmitHooks} 
      image={`${props.route.params?.upload_url}${props.route.params?.navigationParam.cat_image}` || "" }
      action={"Edit"} />
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedEditProductCategory = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={EditProductCategory}
        headerTitle={"Edit Product Category"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default connect(mapStateToProps, null)(ModefiedEditProductCategory);
