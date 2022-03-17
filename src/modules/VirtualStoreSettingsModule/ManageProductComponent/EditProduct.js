import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/core";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import ProductForm from "../CommonComponentsForVirtualStoreSettings/ProductPage";
import { connect } from "react-redux";
import {
  manageproductCategory,
  getProductDetails,
} from "../../../services/VirtualStoreSettingsApi";
import useCustomManageProductFieldArrayHooks from "../VShooks/manageproduct/useCustomManageProductFieldArrayHooks";
import useCustomManageProductInitialValuesHooks from "../VShooks/manageproduct/useCustomManageProductInitialValuesHooks";
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import { useCustomManageProductValidation } from "../VShooks/manageproduct/useCustomManageProductValidationYupHooks";
import { useCustommanageproductSubmitEditHooks } from "../VShooks/manageproduct/useCustomManageProductSubmitHooks";
const EditProducts = (props) => {
  console.log("hello", props.route.params?.navigationParam);
  const [dataList, setDataList] = useState(undefined);
  const [categoryData, setCategoryData] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const fieldArray = useCustomManageProductFieldArrayHooks();
  let initialValues = useCustomManageProductInitialValuesHooks();
  console.log("propsss", props);
  const {
    merchant_portals_id,
    merchant_portals_external_id,
    merchant_portals_merchant_id,
  } = useMerchantidExternalid(3, props.loginData);
  useFocusEffect(
    useCallback(() => {
      manageproductCategory(
        merchant_portals_merchant_id,
        merchant_portals_id,
        merchant_portals_external_id
      ).then((res) => {
        console.log("list of manage product", res);
        if (res.data.success) {
          let fieldArrayupdate = fieldArray.map((obj) => {
            if (obj.handleBlur == "category") {
              return {
                ...obj,
                dropdownData: res.data.data?.categories.map((object) => {
                  return {
                    ...object,
                    Beeppluslabel: object.cat_name,
                    Beepplusvalue: object.catid,
                  };
                }),
              };
            }
            return obj;
          });
          let fieldCategory = fieldArrayupdate.find(
            (obj) => obj.handleBlur === "category"
          ).dropdownData;
          let categorylabel = fieldCategory.find(
            (obj) =>
              obj.Beeppluslabel === props.route.params?.navigationParam.cat_name
          );
          console.log("field", categorylabel);
          console.log("field array upate", fieldArrayupdate);
          setCategoryData(categorylabel);
          setDataList(fieldArrayupdate);
        } else {
          setDataList([]);
        }
      });
      getProductDetails(
        merchant_portals_merchant_id,
        merchant_portals_id,
        merchant_portals_external_id,
        props.route.params?.navigationParam.product_id
      ).then((res) => {
        console.log("product details", res.data.data?.propricedet.opt_price);
        setProductDetails(res.data);
      });
    }, [])
  );
  return (
    <>
    {console.log('values datass', dataList, categoryData, 'product details', productDetails)}
      {Array.isArray(dataList) && Object.keys(categoryData).length !== 0 && Object.keys(productDetails).length !== 0 && (
        <ProductForm
          navigation={props.navigation}
          routingName={props.route.name}
          buttonName={"Edit product"}
          portalId={merchant_portals_id}
          merchantId={merchant_portals_merchant_id}
          externalId={merchant_portals_external_id}
          imageSet={"productImages"}
          fieldArray={dataList}
          initialValues={{
            ...initialValues,
            type: "onebrunei",
            name: props.route.params?.navigationParam.name,
            category: categoryData?.Beepplusvalue,
            price: productDetails.data.propricedet?.opt_price,
            thresholdLimit: productDetails.data.propricedet?.opt_stock,
            description: props.route.params?.navigationParam.description,
            productImages: {},
          }}
          id={props.route.params?.navigationParam.id}
          validationYup={useCustomManageProductValidation}
          onSubmit={useCustommanageproductSubmitEditHooks}
          image={
            `${props.route.params?.upload_url}${props.route.params?.navigationParam.image}` ||
            ""
          }
          action={"Edit"}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  console.log("mechant id", state.Login.data);
  return {
    loginData: state.Login.data,
  };
};
const ModefiedManageEditProducts = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={EditProducts}
      headerTitle={"Edit Products"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedManageEditProducts);
