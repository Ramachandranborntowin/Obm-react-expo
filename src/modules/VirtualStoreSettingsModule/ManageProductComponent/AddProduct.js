import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/core";
import { connect } from "react-redux";
import * as Yup from "yup";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import ProductForm from "../CommonComponentsForVirtualStoreSettings/ProductPage";
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import { manageproductCategory } from "../../../services/VirtualStoreSettingsApi";
import useCustomManageProductFieldArrayHooks from "../VShooks/manageproduct/useCustomManageProductFieldArrayHooks";
import useCustomManageProductInitialValuesHooks from "../VShooks/manageproduct/useCustomManageProductInitialValuesHooks";
import {useCustomManageProductValidation} from "../VShooks/manageproduct/useCustomManageProductValidationYupHooks";
import { useCustommanageproductSubmitAddHooks } from "../VShooks/manageproduct/useCustomManageProductSubmitHooks";
const Addproducts = (props) => {
  const [dataList, setDataList] = useState(undefined);
  const [initialValues, setInitialValues] = useState(useCustomManageProductInitialValuesHooks() || {})
  const fieldArray = useCustomManageProductFieldArrayHooks();
  const {
    merchant_portals_id,
    merchant_portals_external_id,
    merchant_portals_merchant_id,
  } = useMerchantidExternalid(3, props.loginData);
  // let initialValues = useCustomManageProductInitialValuesHooks();
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
          console.log("field array upate", fieldArrayupdate);
          setInitialValues({...initialValues, category: fieldArrayupdate[2].dropdownData[0].Beepplusvalue})
          setDataList(fieldArrayupdate);
        } else {
          setDataList([]);
        }
      });
    }, [])
  );
  return (
    <>
      {Array.isArray(dataList) && (
        <ProductForm
          navigation={props.navigation}
          routingName={props.route.name}
          buttonName={"Add product"}
          portalId={merchant_portals_id}
          merchantId={merchant_portals_merchant_id}
          externalId={merchant_portals_external_id}
          fieldArray={dataList}
          initialValues={initialValues}
          validationYup={useCustomManageProductValidation}
          onSubmit={useCustommanageproductSubmitAddHooks}
          imageSet={"productImages"}
          action={"Add"}
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
const ModefiedManageAddproducts = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={Addproducts}
      headerTitle={"Add Products"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedManageAddproducts);
