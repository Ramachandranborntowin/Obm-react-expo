import React from "react";
import { Text, View } from "react-native";
import colors from "../color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const CustomArrowUp = (props) => {
  const { textAlign } = props;
  return (
    <FontAwesome5
      name={"caret-up"}
      style={{ textAlign: textAlign }}
      size={28}
      color={colors.dark_grey}
    />
  );
};

export default CustomArrowUp;
