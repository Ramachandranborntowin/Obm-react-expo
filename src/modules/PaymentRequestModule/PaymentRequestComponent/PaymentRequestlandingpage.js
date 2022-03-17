import { useIsFocused, useFocusEffect } from "@react-navigation/core";
import React, { Component, useEffect, useState, useCallback } from "react";
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
import PaymentDiaplayHeader from "../../../../config/customComponents/custom_Payment_Display_Header";
import Keypad from "../../../../config/customComponents/custom_Keypad";
import PaymentFooterButton from "../../../../config/customComponents/custom_Payment_Footer_Button";
import { styles } from "../PaymentRequestStyles/styles";
import Header from "../../../common_utilites/Header";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
const platform = Platform.select({
  ios: "ios",
  android: "android",
});
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

const PaymentRequestlandingpage = (props) => {
  console.log('payment request')
  const [selectedNumber, setSelectedNumber] = useState([]);
  const [groupNumber, setGroupNumber] = useState();
  const [addnum, setAddnum] = useState(0);
  useFocusEffect(
    useCallback(() => {
      setSelectedNumber([]);
    }, [])
  );
  const charge = () => {
    if (selectedNumber.length > 0) {
      props.navigation.navigate("QrGenerator", selectedNumber.join("") / 100);
    }
  };
  return (
      <View style={styles.container}>
        <PaymentDiaplayHeader number={selectedNumber} />
        <View style={{ flex: 1 }}></View>
        <View>
          <Keypad onPress={setSelectedNumber} selectedNumber={selectedNumber} />
          <PaymentFooterButton
            onPress={charge}
            name="CHARGE"
            selectedNumber={selectedNumber}
          />
        </View>
      </View>
  );
};

const ModefiedPaymentRequestlandingPage = (props)=>{
return(
  <CommonHigherOrderHeaderComponent
  pagename={PaymentRequestlandingpage}
  headerTitle={"Payment Request"}
  headerLeftIconType={"menu"}
  headerprops={props}
  {...props}
  />
)
}
export default ModefiedPaymentRequestlandingPage
