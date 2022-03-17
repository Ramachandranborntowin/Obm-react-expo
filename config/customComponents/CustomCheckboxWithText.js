import React, { memo } from "react";
import { CustomCheckboxSecondary } from "./custom_Checkbox";
import {
    View,
    Text,
  } from "react-native";
import fontSize from "../fontSize";
const CustomCheckboxWithText = (props) => {
    const {name} = props
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CustomCheckboxSecondary status={"checked"} />
      <Text style={{ fontSize: fontSize.Beep_subHeading }}>
        {name}
      </Text>
    </View>
  );
};
export default memo(CustomCheckboxWithText);
