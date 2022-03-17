import styled from "styled-components";
import colors from "../color";
import fontSize from "../fontSize";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
import { Dimensions } from "react-native";

export const StyledViewPaymentRequestHeader = styled.View`
  background-color: ${colors.primary};
  border-radius: 7px;
  border-color: ${colors.Beepplus_border_color};
  border-width: 1px;
  padding: 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const StyedTextPaymentRequestHeder = styled.Text`
  text-align: center;
  font-size: ${fontSize.Beep_large_font}px;
  color: ${colors.black_dark_grey};
  margin-left: -10px;
`;
export const StyledTouchableOpacityKeypad = styled.TouchableOpacity`
  background-color: ${colors.primary};
`;
export const StyledTextKeypad = styled.Text`
  text-align: center;
  padding: 10px;
  border-width: 0.5;
  min-width: ${deviceWidth / 3.1}px;
  border-color: ${colors.Beepplus_border_color};
  font-size: ${fontSize.Beep_login_logo}px;
  color: ${colors.black};
  
  ${deviceHeight <= 640 && `padding: ${deviceHeight / 64}`}
`;
export const StyledViewPaymentRequestFooter = styled.View`
  background-color: ${colors.dark_grey};
  flex-direction: row;
  align-items: center;
  padding: 15px;
  ${(props) => `
  ${props.selectedNumber.length > 0 && `background-color: ${colors.secondary}`}
    `}
`;
export const StyledTextPaymentRequestFooter = styled.Text`
  font-size: ${fontSize.Beep_iconSize_2}px;
  color: ${colors.primary};
`;
export const StyledNumberPaymentRequestFooter = styled.Text`
  margin-left: auto;
  font-size: ${fontSize.Beep_textStyle}px;
  color: ${colors.primary};
`;
export const StyledSmallWhiteDollerIcon = styled.Image`
height: 20px; width: 20px;
`;
