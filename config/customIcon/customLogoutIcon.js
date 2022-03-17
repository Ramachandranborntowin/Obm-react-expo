import React from "react";
import { Text, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import colors from "../color";
const CustomLogoutIcon = (params) => (
  <IonIcon
    name="log-out-outline"
    style={[
      { color: colors.primary, fontWeight: "400" ,fontSize: 20}
    ]}
  />
);

export default CustomLogoutIcon;
