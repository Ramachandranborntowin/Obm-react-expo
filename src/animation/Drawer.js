import React, {
  Component,
  useEffect,
  useState,
  memo,
  useCallback,
  useMemo,
} from "react";
import { Dimensions, AppState } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import colors from "../../config/color";
import store from "../redux/store";
import { connect } from "react-redux";
import DrawerContent from "./drawerContent";
import { Post_Data } from "../redux/login/LoginTypes";
import SettingsLandingPage from "../modules/SettingsModule/SettingsComponent/SettingsLandingPage";
import TransactionFilter from "../modules/PaymentRequestModule/TransactionComponent/TransactionFilter";
import TransactionLists from "../modules/PaymentRequestModule/TransactionComponent/TransactionListLandingPage";
import PaymentRequestlandingpage from "../modules/PaymentRequestModule/PaymentRequestComponent/PaymentRequestlandingpage";
import CustomMenuIcon from "../../config/customIcon/customMenuIcon";
import CustomBackIcon from "../../config/customIcon/customBackIcon";
import SwitchMerchant from "../modules/SettingsModule/SwichMerchantComponent/SwitchMerchant";
import LoyaltyLandingPage from "../modules/LoyaltyModule/LoyaltyComponents/LoyaltyLandingPage";
import MarketPlaceOrderLandingpage from "../modules/MarketPlaceModule/MarketPlaceOrderComponent/MarketPlaceOrderLandingpage";
import MarketPlaceRefundLandingPage from "../modules/MarketPlaceModule/MarketPlaceRefundComponent/MarketPlaceRefundlandingpage";
import CustomModelPrimary from "./CustomModelPrimary";
import { userUpdateImageApi } from "../services/UserUpdateImageApi";
import { Button, Snackbar } from "react-native-paper";
import custom_Toast from "../../config/customComponents/custom_Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModefiedManagePaymentLandingPage from "../modules/DrawerPaymentRequestModule/ManagePaymentsComponent/ManagePaymentLandingpage";
import VirtualStoreSettingsLandingPage from "../modules/VirtualStoreSettingsModule/VirtualStoreSettingsComponent/VirtualStoreSettingsLandingPage";
import biometrics from "../../config/projectDependency/Biometrics";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const NavigatorNames = (navporps) => {
  const { name, componentName, title } = {
    ...navporps,
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={name}
        component={componentName}
        options={{
          title: title,
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.secondary,
          },
        }}
      />
    </Stack.Navigator>
  );
};
const drawerComponents = (props) => {
  // console.log('drawer components', props.loginData.data.data.merchant_portals[0].id)
  console.log("drawer Component", props);
  switch (props.route.name) {
    case "New sale": {
      return (
        <NavigatorNames
          name={"New Sale"}
          componentName={PaymentRequestlandingpage}
        />
      );
    }
    case "Loyalty": {
      return (
        <NavigatorNames name={"Loyalty"} componentName={LoyaltyLandingPage} />
      );
    }
    case "Transaction": {
      return (
        <NavigatorNames name={"Transaction"} componentName={TransactionLists} />
      );
    }
    case "SwitchMerchant": {
      return (
        <NavigatorNames
          name={"SwitchMerchant"}
          componentName={SwitchMerchant}
        />
      );
    }
    case "Orders": {
      return (
        <NavigatorNames
          name={"Orders"}
          componentName={MarketPlaceOrderLandingpage}
        />
      );
    }
    case "Refund": {
      return (
        <NavigatorNames
          name={"Refund"}
          componentName={MarketPlaceRefundLandingPage}
        />
      );
    }
    case "Settings": {
      return (
        <NavigatorNames name={"Settings"} componentName={SettingsLandingPage} />
      );
    }
    case "VirtualStoreSettings": {
      return (
        <NavigatorNames
          name={"VirtualStoreSettings"}
          componentName={VirtualStoreSettingsLandingPage}
        />
      );
    }
    case "PaymentRequest": {
      return (
        <NavigatorNames
          name={"PaymentRequest"}
          componentName={ModefiedManagePaymentLandingPage}
        />
      );
    }
  }
};
const CustomDrawerNavigation = memo((params) => {
  // enableAlipay = {!Number(props.loginData?.data.data.merchant.alipay_hide)}
  //       displayMarketPlace={displayMarketPlace}
  //       virtualStore={virtualStore}
  //       displayLoyalty={displayLoyalty}
  // console.log("calling navigatior");
  console.log("params.enableAlipay", params.enableAlipay);
  // const screenParams = params.enableAlipay
  //   ? [
  //       {
  //         name: "New sale",
  //         component: drawerComponents,
  //       },
  //       {
  //         name: "Transaction",
  //         component: drawerComponents,
  //       },
  //     ]
  //   : params.displayLoyalty
  //   ? [
  //       {
  //         name: "Loyalty",
  //         component: drawerComponents,
  //       },
  //     ]
  //   : params.displayMarketPlace
  //   ? [
  //       {
  //         name: "Orders",
  //         component: drawerComponents,
  //       },
  //       {
  //         name: "Refund",
  //         component: drawerComponents,
  //       },
  //     ]
  //   : params.virtualStore && [
  //       {
  //         name: "VirtualStoreSettings",
  //         component: drawerComponents,
  //       },
  //     ];
  // screenParams.push(
  //   {
  //     name: "SwitchMerchant",
  //     component: drawerComponents,
  //   },
  //   {
  //     name: "Settings",
  //     component: drawerComponents,
  //   },
  //   {
  //     name: "PaymentRequest",
  //     component: drawerComponents,
  //   }
  // );

  const screenParams = [
     {
      name: "New sale",
      component: drawerComponents,
    },
     {
      name: "Loyalty",
      component: drawerComponents,
    },
     {
      name: "Transaction",
      component: drawerComponents,
    },
    {
      name: "SwitchMerchant",
      component: drawerComponents,
    },
    {
      name: "Settings",
      component: drawerComponents,
    },
     {
      name: "Orders",
      component: drawerComponents,
    },
     {
      name: "Refund",
      component: drawerComponents,
    },
     {
      name: "VirtualStoreSettings",
      component: drawerComponents,
    },
    {
      name: "PaymentRequest",
      component: drawerComponents,
    },
  ];
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} {...params} />}
      drawerStyle={{
        backgroundColor: colors.secondary,
      }}
    >
      {screenParams.map((params) => {
        return <Drawer.Screen {...params} key={params.name} />;
      })}
    </Drawer.Navigator>
  );
});
const DrawerNav = (props) => {
  console.log("props props props", props);
  const [marketplace, setMarketplace] = useState(false);
  const [displayMarketPlace, setDisplayMarketPlace] = useState(false);
  const [virtualStore, setVirtualStore] = useState(false);
  const [displayLoyalty, setDisplayLoyalty] = useState(false);

  useEffect(() => {
    if (props.biometricsvalue?.value) {
      biometrics(props?.navigation);
    }
  }, [props.biometricsvalue]);
  const [enablePhotoModel, setEnablePhotoModel] = useState(false);
  // const [userImage, setUserImage] = useState(
  //   props.loginData.data.data.user.profile_img || null
  // );
  const toastmsg = (msg) => {
    custom_Toast({ message: msg });
  };
  const setImages = (image, imageModelVisible) => {
    if (image !== null) {
      var photo = {
        uri: image,
        type: "image/jpeg",
        name: "Userphoto.jpg",
      };
      let data = new FormData();
      data.append("user_id", props.loginData.data.data.user.id);
      data.append("profimg", photo);
      userUpdateImageApi(data).then(async (res) => {
        // setUserImage(res.data.data.profile_img);
        props.loginData.data.data.user.profile_img = res.data.data.profile_img;
        console.log("props.loginDate", props.loginData);
        store.dispatch({ type: Post_Data, payload: props.loginData.data });
        await AsyncStorage.setItem(
          "Login",
          JSON.stringify(props.loginData.data)
        );
        toastmsg(res.data.succ_msg);
      });
    }
    setEnablePhotoModel(imageModelVisible);
  };
  useEffect(() => {
    setDisplayMarketPlace(false);
    setDisplayLoyalty(false);
    setVirtualStore(false);
    if (
      props.loginData.data.data.merchant_portals &&
      props.loginData.data.data.merchant_portals.length > 0
    ) {
      props.loginData.data.data.merchant_portals.map((obj, index) => {
        if (obj.id == 2 || obj.id == 3) {
          console.log("hello");
          if (
            obj.external_id !== null &&
            obj.external_id !== undefined &&
            +obj.external_id >= 0
          ) {
            setDisplayMarketPlace(true);
            // displayMarketPlace = true
          }
        }
        if (obj.id == 3) {
          if (
            obj.external_id !== null &&
            obj.external_id !== undefined &&
            +obj.external_id >= 0
          ) {
            setVirtualStore(true);
          }
        }
        if (obj.id == 6) {
          if (
            obj.external_id !== null &&
            obj.external_id !== undefined &&
            +obj.external_id >= 0
          ) {
            setDisplayLoyalty(true);
          }
        }
      });
    }
  }, [props.loginData.data.data.merchant_portals]);
  return (
    <>
      <CustomDrawerNavigation
        setEnablePhotoModel={setEnablePhotoModel}
        userImage={props.loginData.data.data.user.profile_img}
        enableAlipay={!Number(props.loginData?.data.data.merchant.alipay_hide)}
        displayMarketPlace={displayMarketPlace}
        virtualStore={virtualStore}
        displayLoyalty={displayLoyalty}
      />
      {enablePhotoModel && <CustomModelPrimary setImages={setImages} />}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login,
    biometricsvalue: state.Biometrics,
  };
};

export default connect(mapStateToProps, null)(DrawerNav);
