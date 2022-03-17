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
import colors from "../color";
import fontSize from "../fontSize";
const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.Beepplus_light_grey,
    padding: 10,
  },
  footerIcon: {
    alignSelf: "center",
    fontSize: fontSize.Beep_iconSize_2,
    color: colors.secondary,
    padding: 5,
  },
});
const BottomNavigation = (props) => {
  const { displayMarketPlace, displayLoyalty, displayreceivedpayments } = {
    ...props,
  };
  return (
    <View style={styles.footer}>
      {displayMarketPlace && (
        <TouchableOpacity>
          {/* <FontAwesome5 name='crown' style={styles.footerIcon} /> */}
          <Image
            source={require("../../assets/icons/bottom1.png")}
            style={{
              height: 25,
              width: 35,
              alignSelf: "center",
              marginVertical: 5,
            }}
          ></Image>
          <Text style={{ fontSize: fontSize.Beep_description }}>Marketplace</Text>
        </TouchableOpacity>
      )}
      {displayreceivedpayments && (
        <TouchableOpacity>
          {/* <FontAwesome5 name='upload' style={styles.footerIcon} /> */}
          <Image
            source={require("../../assets/icons/bottom2.png")}
            style={{ height: 35, width: 35, alignSelf: "center" }}
          ></Image>
          <Text style={{ fontSize: fontSize.Beep_description }}>Received Payments</Text>
        </TouchableOpacity>
      )}
      {displayLoyalty && (
        <TouchableOpacity>
          {/* <FontAwesome5 name='crown' style={styles.footerIcon} /> */}
          <Image
            source={require("../../assets/icons/bottom1.png")}
            style={{
              height: 25,
              width: 35,
              alignSelf: "center",
              marginVertical: 5,
            }}
          ></Image>
          <Text style={{ fontSize: fontSize.Beep_description }}>Loyalty</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default BottomNavigation;
