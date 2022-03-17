import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
  SectionList,
  Linking,
} from "react-native";
import colors from "../../../../config/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
// import Clipboard from '@react-native-community/clipboard';
// import {useClipboard} from '@react-native-community/clipboard';
//   import CustomProfileLogo from './Custom-components/custom_Profile_Logo';
import { useFocusEffect } from "@react-navigation/core";
import ListOfLandingPage from "./ListOfLandingPage";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import { StyledProfileLogo } from "../../../../config/customStylesComponents/customProfileLogo";
import { styles } from "../VirtualStoreSettingsStyles/LandingPageStyles";
import { connect } from "react-redux";
import { getStoreDetails } from "../../../services/VirtualStoreSettingsApi";
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
const VirtualStoreSettingsLandingPage = (props) => {
  const [afterStoreUpdated, setAfterStoreUpdated] = useState(0)
  console.log("props.logindata", props.loginData);
  const [storeDetails, setStoreDetails] = useState({});
  const {
    merchant_portals_id,
    merchant_portals_external_id,
    merchant_portals_merchant_id,
  } = useMerchantidExternalid(3, props.loginData);
  useEffect(() => {
    getStoreDetails(
      merchant_portals_merchant_id,
      merchant_portals_id,
      merchant_portals_external_id
    ).then((res) => {
      if (res.data.success) {
        setStoreDetails({
          ...storeDetails,
          allDetails: res.data,
          logo: res.data.data.admindet.logo,
          upload_url: res.data.upload_url,
          base_url: res.data.base_url,
          name: res.data.data.admindet.admin_name,
          slug: res.data.data.admindet.admin_slug
        });
        console.log(res);
      }
    });
  }, [afterStoreUpdated]);
  // useFocusEffect(
  //   useCallback(() => {
  //     getStoreDetails(merchant_portals_merchant_id, merchant_portals_id, merchant_portals_external_id).then((res)=>{
  //           if(res.data.success){
  //             console.log(res)
  //           }
  //         })
  //   }, [])
  // );
  const managelist = [
    {
      name: "Edit Store Details",
      navigation: "EditStoreDetails",
    },
    {
      name: "Manage Products",
      navigation: "Manageproduct",
    },
    {
      name: "Manage Staffs",
      navigation: "ManageStaff",
    },
    {
      name: "Manage Services",
      navigation: "ManageService",
    },
    {
      name: "Service Fees",
      navigation: "ServiceFees",
    },
    {
      name: "Product Category",
      navigation: "ManageProductCategory",
    },
    {
      name: "Service Category",
      navigation: "ManageServiceCategory",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.logoAligmant}>
        {/* <StyledProfileLogo
          source={require("../../../../assets/icons/Avathar.png")}
        /> */}
        <StyledProfileLogo
          source={
            storeDetails?.logo &&
            storeDetails?.logo != null
              ? {
                  uri: `${storeDetails?.upload_url}${storeDetails?.logo}`,
                }
              : require("../../../../assets/icons/Avathar.png")
          }
        />
        <Text style={styles.username}>
          {storeDetails?.name}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              `${storeDetails?.base_url}/merchant/${storeDetails?.slug}`
            );
          }}
        >
          <Text style={styles.link}>
            {`${storeDetails?.base_url}/merchant/${storeDetails?.slug}`}
          </Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.username}>Manage:</Text>
          {managelist.map((value) => (
            <ListOfLandingPage
              navigationName={value.navigation}
              name={value.name}
              navigation={props.navigation}
              allStoreDetails={value.navigation == "EditStoreDetails" ? storeDetails?.allDetails : null}
              afterStoreUpdated={value.navigation == "EditStoreDetails" ?  afterStoreUpdated : null}
              setAfterStoreUpdated={value.navigation == "EditStoreDetails" ? setAfterStoreUpdated : null}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  console.log("stateTransaction", state);
  return {
    loginData: state.Login.data,
    refreshToken: state.Token,
  };
};

const ModefiedVirtualStoreSettingsLandingPage = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={VirtualStoreSettingsLandingPage}
      headerTitle={"Virtual Store"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};

export default connect(
  mapStateToProps,
  null
)(ModefiedVirtualStoreSettingsLandingPage);
