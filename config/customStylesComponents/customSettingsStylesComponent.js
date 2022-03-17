import styled from "styled-components";
import colors from "../color";
import fontSize from "../fontSize";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const StyledSettingsMerchantButton = styled.TouchableOpacity`
  background-color: ${colors.secondary};
  padding: 5px;
  height: 30px;
`;
export const StyledSettingsMerchantButtonText = styled.Text`
  color: ${colors.primary};
  font-size: ${fontSize.Beep_description};
`;
export const StyledSettingsSelectTagContainer = styled.View`
    padding: 13px;
    padding-left: 10px;
    background-color: ${colors.primary};
    border-radius: 7;
    box-shadow:  0px 1px 1.4px ${colors.grey};
    elevation: 3;
    flex-direction: row;
`;
export const StyledSettingsSelectTagContainerText = styled.Text`
  color: ${colors.dark_grey};
`;
export const StyledSettingsHeading = styled.Text`
color: ${colors.secondary};
font-weight: bold;
`;