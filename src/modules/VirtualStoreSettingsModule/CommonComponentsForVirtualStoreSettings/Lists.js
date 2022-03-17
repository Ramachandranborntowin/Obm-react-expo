import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
  memo,
} from "react";
import { View, FlatList } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import CustomSwitchBar from "../../../../config/customComponents/custom_SearchBar";
import colors from "../../../../config/color";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import { StyledHorizontalLineDark } from "../../../../config/customStylesComponents/customHorizontalLine";
import CustomStickeyAddButton from "../../../../config/customIcon/customStickeyAddButton";
import { StyledEditStoreDetailListImage } from "../../../../config/customStylesComponents/customVirtualStoreSettings";
import fontSize from "../../../../config/fontSize";
import { styles } from "../VirtualStoreSettingsStyles/ManageProductlandingStyles";
import Card from "../CommonComponentsForVirtualStoreSettings/Card";
import custom_Alert from "../../../../config/customComponents/custom_Alert";
import { deleteItems } from "../../../services/VirtualStoreSettingsApi";
import custom_Toast from "../../../../config/customComponents/custom_Toast";
import CustomFooterButton, {
  CustomFooterButtonWithoutBorderRadius,
} from "../../../../config/customComponents/custom_Footer_Button";
const List = (params) => {
  const {
    props,
    navigationNameEdit,
    navigationNameAdd,
    descriptionName,
    ApiData,
    upload_url,
    setCount,
    count,
    setRefreshing,
    refreshing,
    portal_Id,
    external_Id,
    merchant_Id,
    buttonTitleName,
  } = params;
  const [enableEditOrRemoveModel, setEditOrRemoveModel] = useState(false);
  const [deleteActionParams, setDeleteActionParams] = useState({});
  const editProduct = () => {
    props.navigation.navigate("Editproducts");
  };
  const onRefreshing = () => {
    console.log("onRefreshing");
    setRefreshing(true);
    setCount((previousCount) => previousCount + 1);
  };
  const deleteProduct = useCallback((id) => {
    console.log("id", id);
    let deleteActionParams = {};
    navigationNameAdd == "AddProductCategory"
      ? (deleteActionParams = {
          ...deleteActionParams,
          action: "category",
          edit_id: id,
        })
      : navigationNameAdd == "Addproducts"
      ? (deleteActionParams = {
          ...deleteActionParams,
          action: "product",
          edit_id: id,
        })
      : null;
    custom_Alert({
      status: "Remove",
      description: `Are sure you want to remove this ${descriptionName}?`,
      onPress: () => {
        let data = new FormData();
        data.append("portal_id", portal_Id);
        data.append("external_id", external_Id);
        data.append("merchant_id", merchant_Id);
        data.append("action", deleteActionParams.action);
        data.append("edit_id", id);
        deleteItems(data).then((res) => {
          if (res.data.success) {
            setCount((previousCount) => previousCount + 1);
          }
          custom_Toast({ message: res.data.msg });
        });
      },
    });
  }, []);
  const renderItem = (items) => {
    // onPress={()=>props.manageproduct.navigation.navigate('Editproducts')}
    return (
      <Card
        onPress={props.navigation.navigate}
        navigationName={navigationNameEdit}
        deleteProduct={deleteProduct}
        upload_url={upload_url}
        {...items}
      />
    );
  };
  return (
    <>
      <View
        style={{
          position: "relative",
          flex: 1,
          zIndex: -1,
          backgroundColor: colors.primary,
        }}
      >
        <View style={{ margin: 5 }}>
          {navigationNameEdit == "EditStaff" && <CustomSwitchBar />}
        </View>
        <FlatList
          data={ApiData}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefreshing}
          keyExtractor={(item) => item?.id || item?.catid}
        />
        {/* <CustomStickeyAddButton
          onPress={props.navigation.navigate}
          navigationName={navigationNameAdd}
        /> */}
        <CustomFooterButton
          onPress={() => props.navigation.navigate(navigationNameAdd)}
          title={buttonTitleName}
        />
      </View>
    </>
  );
};
const areEqual = (previousProps, nextProps) => {
  if (previousProps.ApiData.length !== nextProps.ApiData.length) {
    return false;
  } else {
    return true;
  }
};

export default memo(List, areEqual);
