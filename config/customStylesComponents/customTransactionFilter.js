import styled from "styled-components";
import colors from "../color";
import fontSize from "../fontSize";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const StyledTransactionFilterHeader = styled.Text`
  color: ${colors.primary};
  font-weight: 600;
`;
export const StyledTransactionFilterContainerHeader = styled.View`
  background-color: ${colors.black_dark_grey};
`;
export const StyledTransactionFilterContainerHeaderText = styled.Text`
  color: ${colors.primary};
`;
export const StyledTransactionFilterDoneButton = styled.Text`
  text-align: center;
  color: ${colors.secondary};
  font-weight: bold;
`;
export const StyledTransactionFilterDateContainer = styled.TouchableOpacity`
flex-direction: row;
border-color: ${colors.border_color};
border-width: 1px;
border-radius: 5px;
padding: 5px;
`;
export const StyledTransactionFilterDateText = styled.Text`
color: ${colors.grey};
fontSize: ${fontSize.Beep_DateText_label}px; 
alignSelf: center;
`