import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback } from "react";
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
  ScrollViewComponent,
  Button,
  ToastAndroid,
} from "react-native";
import colors from "../../../../config/color";
import { CustomBlackHeader } from "../../../../config/customComponents/custom_Header";
import fontSize from "../../../../config/fontSize";
// import { OfferDetialsApi } from '../../Actions/api/LoyaltyApi';
const ManageOfferDetials = (props) => {
  console.log(props.route.params.item);
  // useFocusEffect(
  //     useCallback(()=>{
  //         OfferDetialsApi().then((res)=>{
  //             console.log(res)
  //         })
  //     }, [])
  // )
  // Duration
  const keys = {
    merchant_name: `Merchant`,
    title: `Offer Details`,
    start_on: `Start Date`,
    end_on: `End Date`,
    branch_names: `Branch`,
    coupon_count: `Coupon Details`,
    coupon_grabbed: `Coupon Grabbed`,
    used_coupon: `Coupon Used`,
  };
  return (
    <>
      <CustomBlackHeader Title={""} props={props} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          marginBottom: 10,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: fontSize.Beep_description,
            color: colors.orange_combo,
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          {props.route.params.item.status == 0
            ? `Pending`
            : props.route.params.item.status == 1
            ? `on going`
            : `Expired`}
        </Text>
        {Object.keys(props.route.params.item).map((key, index) => {
          if (
            key == "merchant_name" ||
            key == `title` ||
            key == `start_on` ||
            key == `end_on` ||
            key == `branch_names` ||
            key == `coupon_count` ||
            key == `coupon_grabbed` ||
            key == `used_coupon`
          ) {
            return (
              <View style={{ flexDirection: "row", margin: 7 }}>
                <Text
                  style={{ flex: 1, fontSize: fontSize.Beep_description }}
                >{`${keys[key]}:`}</Text>
                <Text style={{ flex: 1, fontSize: fontSize.Beep_description }}>
                  {key == `coupon_count`
                    ? `${props.route.params.item[key]}Coupon${
                        props.route.params.item[`code`]
                      }`
                    : props.route.params.item[key]}
                </Text>
              </View>
            );
          }
        })}
      </View>
    </>
  );
};
export default ManageOfferDetials;
