import * as React from "react";
import { View, Text } from "react-native";
import colors from "../color";
import { StyledNorecordsFoundContainer, StyledNorecordsFoundText } from "../customStylesComponents/customNorecordsFound";

const NorecordFound = () => {
  return (
    <StyledNorecordsFoundContainer>
      <View style={{ alignSelf: "center" }}>
        <StyledNorecordsFoundText>No Records Found</StyledNorecordsFoundText>
      </View>
    </StyledNorecordsFoundContainer>
  );
};
export default NorecordFound;
