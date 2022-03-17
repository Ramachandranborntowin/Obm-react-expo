import styled from "styled-components";
import colors from "../color";
import fontSize from "../fontSize";
import {Platform,} from 'react-native';

export const StyledLoyaltyDateTouchableOpacity = styled.TouchableOpacity`
  background-color: ${colors.gray_c};
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border-radius: 7px;
`;
export const StyledLoyaltyDateText = styled.Text`
  color: ${colors.BeepplusTextColor};
  min-width: 125px;
  font-size: 12;
  text-align: center;
`;
export const StyledLoyaltyDateImage = styled.Image`
  max-height: 50px;
  max-width: 50px;
`;
export const StyledLoyaltyHeaderIconButton = styled.Image`
  height: 110px;
  width: 110px;
`;
export const StyledLoyaltyTextArea = styled.TextInput`
min-height: 100px;
    border-width: 1px;
    border-color: ${colors.black};
    border-radius: 7px;
    margin-top: 5px;
    text-align-vertical: top;
    padding: 10px
`;
export const StyledLoyaltyTextField = styled.TextInput`
    font-size: ${fontSize.Beep_subHeading};
    color: ${colors.black};
    ${(props) => `
    border-bottom-width: ${props.borderBottomWidth}px;
    `}
    border-bottom-color: ${colors.Beepplus_background_color};
    margin: 0px;
    padding: 0px;
`
export const StyledHeaderTextFieldView = styled.View`
      background-color: ${colors.secondary}; 
      flex-direction: row; 
      align-items: center; 
      justify-content: center; 
      padding: 25px; 
      padding-bottom: 5px;
`
export const StyledGreenText = styled.Text`
  color: ${colors.green};
  font-size: ${fontSize.Beep_subHeading};
  font-weight: bold;
`
