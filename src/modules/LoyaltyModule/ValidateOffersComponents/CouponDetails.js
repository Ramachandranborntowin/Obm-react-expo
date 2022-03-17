import React, {
  Component,
  useState,
  useEffect,
  useCallback,
  useRef,
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
  Linking,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import fontSize from "../../../../config/fontSize";
import colors from "../../../../config/color";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
const Devidor = (props) => {
  const { iconName, value } = { ...props };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderColor: colors.grey,
        borderBottomWidth: 1,
      }}
    >
      <IonIcon
        name={iconName}
        style={{
          color: colors.dark_grey,
          fontSize: fontSize.Beep_iconSize_2,
          paddingHorizontal: 5,
        }}
      />
      <Text>{value}</Text>
    </View>
  );
};
const CouponDetails = (props) => {
  const { displayMsg, couponDetailsData, status, params } = { ...props };
  console.log("displayMsg", displayMsg, couponDetailsData, status, params);
  // var res = props.displayMsg.split("<>");
  return (
    <>
      {status == 1 ? (
        <View style={{ padding: 20, flex: 1, backgroundColor: colors.primary }}>
          <Text style={{ fontSize: fontSize.Beep_subHeading }}>
            {displayMsg && displayMsg.split("</p>")[0].replace("<p>", "")}
          </Text>
          <View style={{ marginTop: 80 }}>
            {couponDetailsData &&
              couponDetailsData.map((data, index) => (
                <View>
                  <Text
                    style={{
                      fontSize: fontSize.Beep_Text2,
                      paddingVertical: 10,
                      borderColor: colors.grey,
                      borderBottomWidth: 1,
                    }}
                  >
                    {data.name}
                  </Text>
                  <Devidor iconName={"call"} value={`+673 ${data.mobile_1}`} />
                  <Devidor iconName={"mail"} value={data.email} />
                </View>
              ))}
          </View>
        </View>
      ) : (
        <View style={{ padding: 20, flex: 1 }}>
          <Text style={{ fontSize: fontSize.Beep_iconSize_2 }}>
            {displayMsg &&
              displayMsg
                .split("<p>")[0]
                .replace("<h3>", "")
                .replace("</h3>", "")}
          </Text>
          <Text
            style={{
              fontSize: fontSize.Beep_subHeading,
              marginTop: 20,
              marginRight: 60,
            }}
          >
            {displayMsg && displayMsg.split("<p>")[1].replace("</p>", "")}
          </Text>
        </View>
      )}
    </>
  );
};
// const ModefiedCouponDetails = (props)=>{
//   return(
//     <CommonHigherOrderHeaderComponent
//     pagename={CouponDetails}
//     headerTitle={""}
//     // headerLeftIconType={"menu"}
//     headerprops={props}
//     {...props}
//     />
//   )
//   }
export default CouponDetails