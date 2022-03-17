import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../color";
import fontSize from "../fontSize";
import IonIcon from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
  chevionIcon: {
    color: colors.black_dark_grey,
    fontSize: fontSize.Beep_iconSize_2,
  },
  iconSecondary: {color: colors.secondary,
  fontSize: fontSize.Beep_iconSize_4,fontWeight: "bold",}
});
const CustomAddIcon = (props) => {
  const {style} = props
  return <IonIcon name="add-circle-outline" style={{ color: colors.primary, fontSize: fontSize.Beep_iconSize_4, ...props }} />
};

export default CustomAddIcon;

export const CustomAddiconSecondary = ()=>{
  return <IonIcon name={"add-circle-outline"} style={styles.iconSecondary} />
}