import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/core";
import { connect } from "react-redux";
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import NorecordFound from "../../../../config/customComponents/custom_NoRecord_Found";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import Lists from "../CommonComponentsForVirtualStoreSettings/Lists";
import { manageserviceCategory } from "../../../services/VirtualStoreSettingsApi";
const ManageServiceCategoryLandingPage = (props) => {
  const [dataList, setDataList] = useState([]);
  const [uploadurl, setUploadUrl] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const {
        merchant_portals_id,
        merchant_portals_external_id,
        merchant_portals_merchant_id,
      } = useMerchantidExternalid(3, props.loginData);
      manageserviceCategory(
        merchant_portals_merchant_id,
        merchant_portals_id,
        merchant_portals_external_id
      ).then((res) => {
        console.log("list of manage category", res);
        if (res.data.success) {
          console.log(res.data.upload_url)
          setUploadUrl(res.data.upload_url);
          setDataList(res.data.data.categories);
          setRefreshing(false);
        } else {
          setDataList([]);
          setRefreshing(false);
        }
      });
    }, [count])
  );

  return (
    <>{(dataList.length >0) ?
    <Lists
      props={props}
      navigationNameEdit={"EditServiceCategory"}
      navigationNameAdd={"AddServiceCategory"}
      descriptionName={"service category"}
      ApiData={dataList}
      upload_url={uploadurl}
      setRefreshing={setRefreshing}
      refreshing={refreshing}
      setCount={setCount}
      count={count}
    /> : <NorecordFound /> }
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedManageServiceCategoryLandingPage = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={ManageServiceCategoryLandingPage}
      headerTitle={"Manage Service Category"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null) (ModefiedManageServiceCategoryLandingPage);
