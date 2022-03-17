import styled from "styled-components";
import colors from "../color";
import fontSize from "../fontSize";

export const PageLogo = styled.Image`
  ${(props) => `
        height:${props.height}px;
        width: ${props.width}px;
    `}
`;
export const StyledTextInputLogin = styled.TextInput`
  min-height: 45px;
  font-size: ${fontSize.Beep_subHeading}px;
  padding-left: 5px;
  padding-left: 15px;
`;
export const StyledViewLogin = styled.View`
margin-left: 5px;
margin-right: 5px;
background-color: ${colors.primary};
border-radius: 7px;
box-shadow:  0px 1px 1.4px ${colors.grey};
margin-top: 1px;
elevation: 3;
        `;

export const StyledIconLogin = styled.TouchableOpacity`
  margin-left: auto;
  font-size: ${fontSize.Beep_login_logo}px;
  margin-right: 10px;
  position: absolute;
  top: 10px;
  right: 0px;
`;

export const StyledButtonLogin = styled.TouchableOpacity`
  min-height: 60px;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  border-width: 2px;
  border-color: ${colors.secondary};
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  background-color: ${colors.secondary};
  opacity: 1;
`;

export const StyledButtonTextlogin = styled.Text`
  font-size: ${fontSize.Beep_primaryButtonText};
  color: ${colors.primary};
  font-weight: bold;
`;
export const StyledForgetPasswordText = styled.Text`
  color: ${colors.whiteoff};
`;
