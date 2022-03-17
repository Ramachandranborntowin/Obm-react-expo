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
import colors from "../color";
import {
  StyledViewPaymentRequestFooter,
  StyledTextPaymentRequestFooter,
  StyledNumberPaymentRequestFooter,
} from "../customStylesComponents/customPaymentRequest";
import CustomDollerWhiteSmallIcon from "../customIcon/customDollerWhiteSmallIcon";
const styles = StyleSheet.create({
  footer_text: {
    fontSize: 20,
    color: colors.primary,
  },
  footer_number: {
    marginLeft: "auto",
    fontSize: 20,
    color: colors.primary,
  },
});
const PaymentFooterButton = (props) => {
  const { onPress, name, selectedNumber } = { ...props };
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledViewPaymentRequestFooter
        style={[{ marginTop: 20 }]}
        selectedNumber={selectedNumber}
      >
        <StyledTextPaymentRequestFooter>{name}</StyledTextPaymentRequestFooter>
        <StyledNumberPaymentRequestFooter>
          <CustomDollerWhiteSmallIcon />
          {selectedNumber.length > 0 ? selectedNumber.join("") / 100 : "0.00"}
        </StyledNumberPaymentRequestFooter>
      </StyledViewPaymentRequestFooter>
    </TouchableOpacity>
  );
};
export default PaymentFooterButton;
