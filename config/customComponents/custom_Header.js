import { Appbar } from "react-native-paper";
import React from "react";
import colors from "../color";
import { Dimensions, Platform } from "react-native";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const CustomHeader = (params) => {
  const { Title, LeftIconType, props, onPress } = params;
  return (
    <Appbar.Header
      style={[{
        backgroundColor: colors.secondary,
      }, Platform.OS === 'android' && {height: deviceHeight / 50,
      justifyContent: "center",
      paddingBottom: 25}]}
    >
      {LeftIconType == "menu" ? (
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigation.openDrawer()}
        />
      ) : (
        <Appbar.BackAction onPress={()=>props.navigation.goBack(null)} />
      )}
      <Appbar.Content title={Title} />
      {Title == "Transaction" && (
        <Appbar.Content
          title={"Filter"}
          titleStyle={{ marginLeft: "auto", fontSize: 15 }}
          onPress={onPress}
        />
      )}
      {/* <Appbar.Action icon="magnify"  />
      <Appbar.Action icon="dots-vertical"  /> */}
    </Appbar.Header>
  );
};
export default CustomHeader;
// options={{
  //   headerTintColor: colors.black,
  //   headerTitleStyle: {
  //     fontSize: 17,
  //   },
  //   headerStyle: {
  //     backgroundColor: colors.primary,
  //     shadowColor: "transparent",
  //     headerTintColor: colors.black,
  //   },
  // }}
export const CustomBlackHeader = (params)=>{
  const { Title, LeftIconType, props, onPress } = params;
  return(
    <Appbar.Header
      style={[{
        backgroundColor: colors.primary,
      }, Platform.OS === 'android' && {height: deviceHeight / 50,
      justifyContent: "center",
      paddingBottom: 25}]}
    >
      {LeftIconType == "menu" ? (
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigation.openDrawer()}
        />
      ) : (
        <Appbar.BackAction style={{color: colors.black}} onPress={()=>props.navigation.goBack(null)}/>
      )}
      <Appbar.Content title={Title} titleStyle={{color: colors.black}}/>
    </Appbar.Header>
  )
}
