import { Appbar } from "react-native-paper";
import React from "react";
import colors from "../../config/color";
import { Dimensions, Platform } from "react-native";
import store from "../redux/store";
import { TouchableOpacity } from "react-native-gesture-handler";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const Header = (WrapedComp) => {
  return (params) => {
    const {
      headerTitle,
      headerLeftIconType,
      headerprops,
      headeronPress,
      headerSecondary,
      headerChoosePortal,
      ...props
    } = params;
    console.log("headerChoosePortal", headerChoosePortal);
    return (
      <>
        {headerSecondary ? (
          <Appbar.Header
            style={[
              {
                backgroundColor: colors.primary,
              },
              Platform.OS === "android" && {
                height: deviceHeight / 50,
                justifyContent: "center",
                paddingBottom: 25,
              },
            ]}
          >
            {headerLeftIconType && headerLeftIconType == "menu" ? (
              <Appbar.Action
                icon="menu"
                onPress={() => props.navigation.openDrawer()}
              />
            ) : (
              <Appbar.BackAction
                style={{ color: colors.black }}
                onPress={() => props.navigation.goBack(null)}
              />
            )}
            <Appbar.Content
              title={headerTitle}
              titleStyle={{ color: colors.black }}
            />
          </Appbar.Header>
        ) : (
          <Appbar.Header
            style={[
              {
                backgroundColor: colors.secondary,
              },
              Platform.OS === "android" && {
                height: deviceHeight / 50,
                justifyContent: "center",
                paddingBottom: 25,
              },
            ]}
          >
            {headerLeftIconType == "menu" ? (
              <Appbar.Action
                icon="menu"
                onPress={() => headerprops.navigation.openDrawer()}
              />
            ) : (
              <Appbar.BackAction
                onPress={() => headerprops.navigation.goBack(null)}
              />
            )}
            <Appbar.Content title={headerTitle} />
            {console.log('headertitle', headerTitle == "Transaction")}
            {(headerTitle == "Transaction" || headerTitle == "Manage Payments") && (
              <Appbar.Action onPress={headeronPress} icon={'filter'} style={{marginLeft: "auto", fontSize: 15}}>
              </Appbar.Action>
              
            )}
            {headerTitle == "Marketplace" &&
              store.getState().Login.data.data.merchant_portals.length == 2 &&
              store
                .getState()
                .Login.data.data.merchant_portals.find(
                  (element) => element.id == 2
                ) &&
              store
                .getState()
                .Login.data.data.merchant_portals.find(
                  (element) => element.id == 3
                ) && (
                <>
                  <Appbar.Content
                    title={headerChoosePortal}
                    titleStyle={{ marginLeft: "auto", fontSize: 15 }}
                    onPress={headeronPress}
                  />
                  <Appbar.Action icon="menu-down" color={colors.primary} />
                </>
              )}
            {/* <Appbar.Action icon="magnify"  />
      <Appbar.Action icon="dots-vertical"  /> */}
          </Appbar.Header>
        )}

        <WrapedComp {...props} />
      </>
    );
  };
};
export default Header;
