import { useIsFocused, useFocusEffect } from "@react-navigation/core";
import React, {
  Component,
  useEffect,
  useState,
  useCallback,
  memo,
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
  Keyboard,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../color";
import fontSize from "../fontSize";
import {
  StyledTransactionListContainer,
  StyledTransactionListAlipayIcon,
  StyledTransactionListAlipayIconText,
  StyledTransactionAmountText,
} from "../customStylesComponents/customTransactionList";
import CustomBlueDotIcon from "../customIcon/customBlueDotIcon";
import { StyledSmallDollerIcon } from "../customStylesComponents/customDollerIcon";
import CustomArrowOutlineRight from "../customIcon/customArrowOutlineRight";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  Listcontainer: {
    padding: 14,
    borderBottomColor: colors.text_hint_default,
    borderBottomWidth: 1,
    flexDirection: "row",
    flex: 1,
  },
  textQrgenerated: {
    alignSelf: "center",
    marginLeft: 5,
  },
  amountandTimingContainer: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
});
const TransactionListCard = (params) => {
  const { status, status_obj, H_M, item, props, dateandTime, cardFrom } = {
    ...params,
  };
  let date = "";
  dateandTime.split(" ").map((val, i) => {
    if (i <= 2) {
      date =
        i == 0
          ? date.concat(val)
          : date.concat("-", val.length > 4 ? val.slice(0, 3) : val);
    }
  });
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(item.created_at);
        if (cardFrom && cardFrom == "ManagePayment") {
          props.navigation.navigate("PaymentDetails", {
            date: dateandTime,
          });
        } else {
          props.navigation.navigate("TransactionDetails", {
            date: dateandTime,
            transactionid: item.id,
          });
        }
      }}
    >
      {/* <Text>{i.item.created_at}</Text> */}
      <View style={styles.Listcontainer}>
        <View>
          <StyledTransactionListAlipayIcon
            source={require("../../assets/image/ali_pay.png")}
            style={[
              { alignSelf: "center" },
              cardFrom == "ManagePayment" && { margin: 5 },
            ]}
          ></StyledTransactionListAlipayIcon>
          {!(cardFrom == "ManagePayment") && (
            <StyledTransactionListAlipayIconText>
              {status}
            </StyledTransactionListAlipayIconText>
          )}
        </View>
        <CustomBlueDotIcon status={item.status} style={{ marginLeft: 8 }} />
        <View style={styles.textQrgenerated}>
          <Text
            style={
              item.status == 2
                ? { color: colors.green }
                : { color: colors.secondary }
            }
          >
            {" "}
            {status_obj && status_obj[item.status]}{" "}
          </Text>
          {cardFrom && cardFrom == "ManagePayment" && <Text>{date}</Text>}
        </View>
        <View style={styles.amountandTimingContainer}>
          <Text>
            <StyledSmallDollerIcon
              source={require("../../assets/icons/doller.png")}
            />
            <StyledTransactionAmountText fontSize={fontSize.Beep_subHeading}>
              {item.pay_amount}
            </StyledTransactionAmountText>
          </Text>
          <Text
            style={{ fontSize: fontSize.Beep_subHeading, alignSelf: "center" }}
          >
            {H_M}
          </Text>
        </View>
        <CustomArrowOutlineRight
          style={{ paddingLeft: 10, alignSelf: "center" }}
        />
      </View>
    </TouchableOpacity>
  );
};
export default memo(TransactionListCard);
