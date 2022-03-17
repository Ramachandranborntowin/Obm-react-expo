import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../color";
import fontSize from "../fontSize";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const styles = StyleSheet.create({
  chevionIcon: {
    color: colors.black_dark_grey,
    fontSize: fontSize.Beep_iconSize_2,
  },
});
const CustomArrowOutlineRight = (props) => {
  const {style} = props
  return <FontAwesome5 name="chevron-right" style={[styles.chevionIcon, style]} />;
};

export default CustomArrowOutlineRight;
