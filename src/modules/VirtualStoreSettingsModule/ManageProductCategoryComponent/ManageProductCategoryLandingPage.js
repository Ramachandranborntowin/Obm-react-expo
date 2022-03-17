import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/core";
import { connect } from "react-redux";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import Lists from "../CommonComponentsForVirtualStoreSettings/Lists";
import { manageproductCategory } from "../../../services/VirtualStoreSettingsApi";
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import NorecordFound from "../../../../config/customComponents/custom_NoRecord_Found"
const ManageProductCategoryLandingPage = (props) => {
  const [dataList, setDataList] = useState([]);
  const [uploadurl, setUploadUrl] = useState("");
  const [refreshing, setRefreshing] = useState(false)
  const [count, setCount] = useState(0)
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
        console.log("list of manage category", res);
        if (res.data.success) {
          setUploadUrl(res.data.upload_url);
          setDataList(res.data.data.categories);
          setRefreshing(false)
        } else {
          setDataList([]);
          setRefreshing(false)
        }
      });
    }, [count])
  );
  return (
    <>{(dataList.length > 0) ?
    <Lists
      props={props}
      navigationNameEdit={"EditProductCategory"}
      navigationNameAdd={"AddProductCategory"}
      descriptionName={"product category"}
      ApiData={dataList}
      upload_url={uploadurl}
      setRefreshing={setRefreshing}
      refreshing={refreshing}
      setCount={setCount}
      count={count}
      portal_Id={merchant_portals_id}
      external_Id={merchant_portals_external_id}
      merchant_Id={merchant_portals_merchant_id}
      buttonTitleName={'Add Product Category'}
    /> : <NorecordFound />}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedManageProductCategoryLandingPage = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={ManageProductCategoryLandingPage}
      headerTitle={"Manage Product Category"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(
  mapStateToProps,
  null
)(ModefiedManageProductCategoryLandingPage);
