import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import IonIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import { connect } from "react-redux";
import { userUpdateImageApi } from "../../src/services/UserUpdateImageApi";
import colors from "../../config/color";
import fontSize from "../../config/fontSize";
import CustomLogoutIcon from "../../config/customIcon/customLogoutIcon";
import { StyledProfileLogo } from "../../config/customStylesComponents/customProfileLogo";
import CustomModelPrimary from "./CustomModelPrimary";
import { set_Token, remove_Token } from "../redux/UserToken/UserTokenTypes";
import custom_Alert from "../../config/customComponents/custom_Alert";
const DrawerContent = (props) => {
  const [marketplace, setMarketplace] = useState(false);
  const [displayMarketPlace, setDisplayMarketPlace] = useState(false);
  const [virtualStore, setVirtualStore] = useState(false);
  const [displayLoyalty, setDisplayLoyalty] = useState(false);
  useEffect(() => {
    setDisplayMarketPlace(false);
    setDisplayLoyalty(false);
    setVirtualStore(false);
    if (
      props.loginData.data.merchant_portals &&
      props.loginData.data.merchant_portals.length > 0
    ) {
      props.loginData.data.merchant_portals.map((obj, index) => {
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
  }, [props.loginData.data.merchant_portals]);

  const logoutAlert = (navigation) => {
    custom_Alert({
      status: "Logout !",
      description: "Are sure you want to logout your account?",
      onPress: async () => {
        // await AsyncStorage.removeItem('userToken')
        console.log(navigation);
        store.dispatch({
          type: remove_Token,
          data: await AsyncStorage.removeItem("userToken"),
        });
      },
    });
  };
  const Item = (itemProps) => {
    const { label, navigation, iconname, navigationname } = { ...itemProps };

    return (
      <DrawerItem
        icon={() =>
          iconname === "logout" && (
            <CustomLogoutIcon
              styles={{ alignSelf: "center", marginRight: -20 }}
            />
          )
        }
        label={label}
        onPress={
          iconname === "logout"
            ? () => logoutAlert(navigation)
            : () => {
                navigation.navigate(navigationname);
              }
        }
        labelStyle={styles.labelStyle}
      />
    );
  };
  const Headings = ({ value }) => {
    return <Text style={styles.headings}>{value}</Text>;
  };
  const HeadingValues = [
    props.loginData.data.merchant.name,
    props.loginData.data.user.first_name,
    props.loginData.data.user.mobile_no,
  ];
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => props.setEnablePhotoModel(true)}>
            {console.log("userimage", props.userImage)}
            <StyledProfileLogo
              source={
                props.userImage
                  ? {
                      uri: `https://uat.beep.solutions/uploads/${props.userImage}`,
                    }
                  : require("../../assets/icons/Avathar.png")
              }
            />
          </TouchableOpacity>
          <View>
            {HeadingValues.map((val) => (
              <Headings value={val} key={val} />
            ))}
          </View>
        </View>
        <View>
          {!Number(props.loginData.data.merchant.alipay_hide) && (
            <>
              <Item
                label={"New sale"}
                navigation={props.navigation}
                navigationname={"New sale"}
              />
              <Item
                label={"Transaction"}
                navigation={props.navigation}
                navigationname={"Transaction"}
              />
            </>
          )}
          {displayLoyalty && (
            <Item
              label={"Loyalty"}
              navigation={props.navigation}
              navigationname={"Loyalty"}
            />
          )}
          <Item
            label={"Settings"}
            navigation={props.navigation}
            navigationname={"Settings"}
          />
          {displayMarketPlace && (
            <View style={{ position: "relative" }}>
              <DrawerItem
                label="Marketplace"
                onPress={() => {
                  setMarketplace(!marketplace);
                }}
                labelStyle={[styles.labelStyle, { marginLeft: -30 }]}
                icon={() => (
                  <IonIcon
                    name={
                      marketplace
                        ? "chevron-down-outline"
                        : "chevron-forward-outline"
                    }
                    style={[
                      styles.list,
                      { fontSize: 20, position: "absolute", right: 15 },
                    ]}
                  />
                )}
              />

              {marketplace && (
                <Item
                  label={"orders"}
                  navigation={props.navigation}
                  navigationname={"Orders"}
                />
              )}
              {marketplace &&
                props.loginData.data.merchant_portals.find(
                  (obj) => obj.portal_id == 3
                ) && (
                  <Item
                    label={"Refund"}
                    navigation={props.navigation}
                    navigationname={"Refund"}
                  />
                )}
            </View>
          )}
          {virtualStore && (
            <Item
              label={"Virtual Store Settings"}
              navigation={props.navigation}
              navigationname={"VirtualStoreSettings"}
            />
          )}
          <Item
            label={"Payment Request"}
            navigation={props.navigation}
            navigationname={"PaymentRequest"}
          />
        </View>
      </DrawerContentScrollView>
      <View>
        <Item
          label={"Logout"}
          iconname={"logout"}
          navigation={props.navigation}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  labelStyle: { color: colors.primary, fontSize: fontSize.Beep_subHeading },
  container: {
    padding: 10,
    alignItems: "center",
    paddingTop: 5,
  },
  headings: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontSize.Beep_Text_Small,
    padding: 5,
  },
  profileImgContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  list: {
    color: colors.primary,
    fontSize: fontSize.Beep_subHeading,
    fontWeight: "400",
  },
});
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
export default connect(mapStateToProps, null)(DrawerContent);
