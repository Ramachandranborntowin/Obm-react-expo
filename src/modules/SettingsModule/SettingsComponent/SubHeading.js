import React from "react";
import {
    View,
  } from "react-native";
import { StyledSettingsHeading } from "../../../../config/customStylesComponents/customSettingsStylesComponent";
const SubHeading = (props) => {
    const { title } = props;
    return (
      <View style={{ marginTop: 35 }}>
        <StyledSettingsHeading>{title}</StyledSettingsHeading>
      </View>
    );
  };
  export default SubHeading