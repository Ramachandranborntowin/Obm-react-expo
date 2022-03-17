import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../color";
import IonIcon from "react-native-vector-icons/Ionicons";
import fontSize from "../fontSize";
const CustomCalanderIcon = (props) => {
  const {color} = props
  return (
    <IonIcon
      name="calendar-sharp"
      style={[{ fontSize: fontSize.Beep_iconSize_2, color: color }, props.style]}
    />
  );
};

export default CustomCalanderIcon;
