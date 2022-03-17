import React, { Component, useEffect, useMemo, useState } from "react";
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
  Switch,
  ToastAndroid,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import UploadImage from "./settings/UploadImage";
import UploadImagePage from "../UploadImageComponent/UploadImagePage";
import { useIsFocused, useFocusEffect } from "@react-navigation/core";
import colors from "../../../../config/color";
import { connect } from "react-redux";
import { merchantUpdateImageApi } from "../../../services/MerchantUpdateImageApi";
import store from "../../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
// import TouchID from "react-native-touch-id";
import * as LocalAuthentication from "expo-local-authentication";
import SwitchMerchantButton from "../../../../config/customComponents/custom_Switchmerchant_Button";
import Selecttag from "../../../../config/customComponents/custom_Selecttag";
import {
  StyledHeadingSmall,
  StyledHeadingSmallContainer,
} from "../../../../config/customStylesComponents/HeadingSmall";
import CustomHeadingSmall from "../../../../config/customComponents/custom_Heading_Small";
import { StyledProfileLogo } from "../../../../config/customStylesComponents/customProfileLogo";
import SubHeading from "./SubHeading";
import { styles } from "../SettingsStyles/Styles";
import Constants from "expo-constants";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import custom_Toast from "../../../../config/customComponents/custom_Toast";
import { Post_Data } from "../../../redux/login/LoginTypes";
import { Button } from "react-native-paper";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

const SettingsLandingPage = (props) => {
  console.log("common data", props);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [enabledfingerprint, setEnabledFingerPrint] = useState();
  const [enablePhotoModel, setEnablephotoModel] = useState(false);
  // const [companyImages, setCompanyImages] = useState(
  //   props.loginData.data.data.merchant.profile_img || null
  // );
  const [count, setCount] = useState(0);
  const [defaultSettings, setDefaultSettings] = useState(true);
  const [EnablePaymentMethods, setEnablePaymentMethods] = useState(false);
  const [EnableMarketPlace, setEnableMarketPlace] = useState(false);
  const [displayTouchid, setDisplayTouchId] = useState(true);
  const [connectionType, setConnectionType] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  useEffect(() => {
    NetInfo.addEventListener((state) => {
      console.log("Is connected?", state.isConnected, state.type);
      setConnectionType(state.type);
    });
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      console.log(
        "touch id",
        JSON.parse(await AsyncStorage.getItem("TouchId"))
      );
      setEnabledFingerPrint(JSON.parse(await AsyncStorage.getItem("TouchId")));
    })();
  }, []);
  const CompanyDetialsList = [
    {
      name: "UPLOAD PROFILE PHOTO",
    },
    // {
    //   name: "PAYMENT METHODS",
    // },
    // {
    //   name: "MARKETPLACE",
    // },
  ];
  const ApplicationInfodata = [
    {
      key: "Version",
      value: props.commonData.data
        ? props.commonData.data?.data.app_version
        : "Null",
    },
    { key: "Device id", value: Constants.deviceId },
    { key: "Network Status", value: connectionType },
  ];
  const toastmsg = (msg) => {
    custom_Toast({ message: msg });
  };
  const setImages = (image, imageModelVisible) => {
    console.log(image);
    if (image !== null) {
      let photo = {
        uri: image,
        type: "image/jpeg",
        name: "photo.jpg",
      };
      let data = new FormData();
      data.append("merchant_id", props.loginData.data.data.merchant.id);
      data.append("profimg", photo);
      merchantUpdateImageApi(data).then(async (res) => {
        if (res.data.success) {
          // setCompanyImages(res.data.data.profile_img);
          // setCount(count+1)
          props.loginData.data.data.merchant.profile_img = res.data.data.profile_img;
          store.dispatch({ type: Post_Data, payload: props.loginData.data });
          await AsyncStorage.setItem(
            "Login",
            JSON.stringify(props.loginData.data)
          );
          console.log("responseeeeeee", res.data.data.profile_img, props);
          toastmsg(res.data.succ_msg);
        } else {
          toastmsg(res.data.err_msg);
        }
      });
    }
    setEnablephotoModel(imageModelVisible);
  };
  const clickCompanyDetialList = (name) => {
    if (name === "UPLOAD PROFILE PHOTO") {
      setEnablephotoModel(true);
    } else if (name === "PAYMENT METHODS") {
      props.navigation.navigate("PaymentMethods");
    } else {
      props.navigation.navigate("MarketPlace");
    }
  };
  //   TouchID.isSupported().catch((error) => {
  //     // Failure code
  //     setDisplayTouchId(false);
  //   });
  return (
    <View style={[{ flex: 1, backgroundColor: colors.primary }]}>
      {enablePhotoModel && <UploadImagePage setImages={setImages} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ zIndex: -1 }}
      >
        <View style={styles.container}>
          <SubHeading title={"Company Details"} />
          <View style={styles.companydetialsContainer}>
            {console.log("company image", `https://uat.beep.solutions/uploads/${props.loginData.data.data.merchant.profile_img}`)}
            {console.log("count", count)}
            <StyledProfileLogo
              source={
                props.loginData.data.data.merchant.profile_img && props.loginData.data.data.merchant.profile_img.toLowerCase() != null
                  ? {
                      uri: `https://uat.beep.solutions/uploads/${props.loginData.data.data.merchant.profile_img}`,
                    }
                  : require("../../../../assets/icons/Avathar.png")
              }
            />
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 15 }} numberOfLines={1}>
                {props.loginData.data.data.merchant.name}
              </Text>
              <Text style={{ marginLeft: 15, marginTop: 10 }} numberOfLines={1}>
                {props.loginData.data.data.merchant.email_id}
              </Text>
            </View>
            <SwitchMerchantButton name={"Switch Merchant"} props={props} />
          </View>
          <View style={{ marginTop: 20, flex: 1 }}>
            <Text>{props.loginData.data.data.merchant.country}</Text>
            {CompanyDetialsList.map((obj, index) => (
              <Selecttag onPress={clickCompanyDetialList} obj={obj} />
            ))}
          </View>
          <SubHeading title={"User Details"} />
          <View style={styles.userdetialsContainer}>
            {console.log(
              "user",
              `https://uat.beep.solutions/uploads/${props.loginData.data.data.user.profile_img}`
            )}
            <StyledProfileLogo
              source={
                props.loginData.data.data.user?.profile_img &&
                props.loginData.data.data.user?.profile_img != null
                  ? {
                      uri: `https://uat.beep.solutions/uploads/${props.loginData.data.data.user.profile_img}`,
                    }
                  : require("../../../../assets/icons/Avathar.png")
              }
            />
            <View style={styles.userData}>
              <Text style={{ paddingBottom: 10 }}>
                {props.loginData.data.data.user?.first_name}
              </Text>
              <Text>{props.loginData.data.data.user?.mobile_no}</Text>
            </View>
          </View>
          <Selecttag
            props={props}
            name={"CHANGE PASSWORD"}
            routename={"ChangePassword"}
          />
          {isBiometricSupported && (
            <View style={styles.touchIdContainer}>
              <Text style={{ color: colors.switch_buttonOff }}>Touch ID</Text>
              <Switch
                trackColor={{
                  false: colors.switch_buttonOff,
                  true: colors.switch_button_color,
                }}
                thumbColor={
                  enabledfingerprint
                    ? colors.switch_button_color
                    : colors.switch_buttoncolor
                }
                ios_backgroundColor={colors.sub_heading_text_color}
                onValueChange={async () => {
                  await AsyncStorage.setItem(
                    "TouchId",
                    JSON.stringify(!enabledfingerprint)
                  );
                  setEnabledFingerPrint(
                    JSON.parse(await AsyncStorage.getItem("TouchId"))
                  );
                }}
                value={enabledfingerprint}
                style={{ marginLeft: "auto" }}
              />
            </View>
          )}
          <SubHeading title={"Application Info"} />
          {ApplicationInfodata.map((item, index) => (
            <TouchableHighlight>
              <View style={styles.applicationInfoList}>
                <Text style={{ flex: 0.6 }}>{item.key}</Text>
                <Text style={{ flex: 0.6 }}>{item.value}</Text>
              </View>
            </TouchableHighlight>
          ))}

          <View style={{ marginBottom: 5 }}>
            <Selecttag
              props={props}
              name={"TERMS OF USE"}
              routename={"TermsOfUse"}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  console.log("stateTransaction", state);
  return {
    loginData: state.Login,
    refreshToken: state.Token,
    commonData: state.CommonData,
  };
};
const ModefiedSettingslandingPage = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={SettingsLandingPage}
      headerTitle={"Settings"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedSettingslandingPage);
