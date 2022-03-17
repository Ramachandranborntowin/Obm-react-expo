import styled from "styled-components";
import colors from "../color";
import fontSize from "../fontSize";

export const StyledTextInput = styled.TextInput`
  min-height: 55px;
  font-size: ${fontSize.Beep_subHeading}px;
  padding-left: 5px;
  color: ${colors.black};
  border-radius: 7px;
  border-color: ${colors.black};
  border-width: 1px;
  padding-left: 15px;
  background-color: ${colors.gray_c};
`;
export const StyledFooterButton = styled.TouchableOpacity`
  min-height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: ${colors.secondary};
`;
export const StyledFooterButtonText = styled.Text`
  font-size: ${fontSize.Beep_primaryButtonText}px;
  color: ${colors.primary};
  font-weight: bold;
`;
export const StyledTextForgetPasswordHeading = styled.Text`
  font-size: ${fontSize.Beep_subHeading}px;
`;
export const StyledForgetPasswordDescription = styled.Text`
  color: ${colors.black_dark_grey};
  font-size: ${fontSize.Beep_description}px;
`;
export const StyledFooterPasswordContainer = styled.TouchableOpacity`
  shadowColor: ${colors.black};
  shadowOffset: {
      width: 0,
      height: 1,
  };
  shadowOpacity: 0.20;
  shadowRadius: 1.41;

  elevation: 2;
  background-color: ${colors.secondary};
  ${(props) => `
  ${props.paddingSize ? `padding: ${props.paddingSize}px;` : `padding: 15px;` }
    `}
`;
export const StyledFooterPasswordText = styled.Text`
  color: ${colors.primary};
  font-weight: bold;
  text-align: center;
`;
