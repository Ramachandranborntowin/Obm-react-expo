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
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import { manageproductList } from "../../../services/VirtualStoreSettingsApi";
import NorecordFound from "../../../../config/customComponents/custom_NoRecord_Found"
const ManageProductLandingPage = (props) => {
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
      count != 0 && setRefreshing(true)
      manageproductList(
        merchant_portals_merchant_id,
        merchant_portals_id,
        merchant_portals_external_id,
        count == 0 ? false : true
      ).then((res) => {
        console.log("list of manage product", res);
        if (res.data.success) {
          setUploadUrl(res.data.upload_url);
          setDataList(res.data.data);
          setRefreshing(false)
        } else {
          setDataList([]);
          setRefreshing(false)
        }
      });
    }, [count])
  );

  return (
    <>
    {dataList.length > 0 ? <Lists
      props={props}
      navigationNameEdit={"Editproducts"}
      navigationNameAdd={"Addproducts"}
      descriptionName={"product"}
      ApiData={dataList}
      upload_url={uploadurl}
      setRefreshing={setRefreshing}
      refreshing={refreshing}
      setCount={setCount}
      count={count}
      portal_Id={merchant_portals_id}
      external_Id={merchant_portals_external_id}
      merchant_Id={merchant_portals_merchant_id}
      buttonTitleName={'Add Product'}
    /> : <NorecordFound />}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedManageProductLandingPage = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={ManageProductLandingPage}
      headerTitle={"Manage Products"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedManageProductLandingPage);
