import React, {
    Component,
    memo,
    useState,
    useEffect,
    useMemo,
    useCallback,
  } from "react";
  import {
    View,
    Text,
  } from "react-native";
  import colors from "../../../../config/color";
  import CustomCheckmarkBig from "../../../../config/customIcon/customCheckmarkBig";
  import { styles } from "../PaymentRequestStyles/Orgeneratorstyles";

const QrSucessful = (props) => {
    console.log("1", props);
    const successDetials = [
      {
        key: "RECEIVED",
        value: props.received,
      },
      {
        key: "PROVIDER",
        value: props.provider,
      },
      {
        key: "DATE",
        value: props.date,
      },
    ];
    return (
      <>
        <View style={{ alignItems: "center" }}>
          <CustomCheckmarkBig />
          <Text style={styles.textPaymentSucessfull}>PAYMENT SUCCESSFUL</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        {successDetials.map((obj, index) => (
          <View style={{ flexDirection: "row", marginHorizontal: 25 }}>
            <Text style={{ fontSize: 16, color: colors.whiteoff, marginVertical: 15 }}>
              {obj.key}
            </Text>
            <View style={{ flex: 1 }}></View>
            <Text style={{ fontSize: 16, color: colors.whiteoff, marginVertical: 15 }}>
              {obj.key == "RECEIVED" && `$`}
              {obj.value}
            </Text>
          </View>
        ))}
      </>
    );
  };
  export default memo(QrSucessful)