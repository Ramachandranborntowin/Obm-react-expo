import React from "react";
import { Text, View,StyleSheet } from "react-native";
import colors from "../color";
import IonIcon from 'react-native-vector-icons/Ionicons';
import fontSize from "../fontSize";
const styles = StyleSheet.create({
  iconCircle: {
    alignSelf: "center",
    fontSize: fontSize.Beep_iconSize_1,
  },
});
const CustomBlueDotIcon = (props) => {
  const { status } = props;
  return (
    <IonIcon
      name="ellipse"
      style={[
        styles.iconCircle,
        status == 2
          ? { color: colors.success }
          : { color: colors.secondary },
      ]}
    />
  );
};

export default CustomBlueDotIcon;

export const CustomBlueDotIconSecondary = ()=>{
  return(
      <IonIcon
  name={ "ellipse"}
  style={{fontSize: fontSize.Beep_iconSize_2, color: colors.secondary}}
/>
  )
}
export const CustomBlueDotIconSecondaryOutline = ()=>{
  return(
      <IonIcon
  name={ "ellipse-outline"}
  style={{fontSize: fontSize.Beep_iconSize_2, color: colors.grey}}
/>
  )
}
