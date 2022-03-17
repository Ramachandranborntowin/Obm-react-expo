import React from "react";
import { Text, View } from "react-native";
import { Modal, Checkbox } from "react-native-paper";
import colors from "../color";

const CustomCheckbox = (params) => (
  <Checkbox
    uncheckedColor={colors.green}
    color={colors.green}
   {...params}
  />
);

export default CustomCheckbox;

export const CustomCheckboxSecondary = (params) =>(
  <Checkbox 
  color={colors.secondary}
  {...params}
  />
)
