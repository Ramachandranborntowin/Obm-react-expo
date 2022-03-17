import React from "react";
import { Text, View, Switch } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../color";
const CustomSwitchButton = () => {
  return (
    <Switch
      trackColor={{ false: colors.dark_grey, true: colors.switch_button_color }}
      thumbColor={true ? colors.switch_button_color : colors.date_bg}
      ios_backgroundColor={Colors.sub_heading_text_color}
      // onValueChange={toggleSwitch}
      value={true}
      style={{ marginLeft: "auto" }}
    />
  );
};
export default CustomSwitchButton
