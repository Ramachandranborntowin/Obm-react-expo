import styled from "styled-components";
import colors from "../color";
import fontSize from "../fontSize";
export const StyledTouchableOpacityButtonContainer = styled.TouchableOpacity`
  border-radius: 7px;
  ${(props) => `
        background-color: ${props.Color};
        ${props.nestedbutton ? `padding: 2px ${props.Padding}px`:`padding: 12px ${props.Padding}px`}
    `}
`;
export const StyledTextButton = styled.Text`
  color: ${colors.primary};
  font-weight: bold;
  padding: 5px 0px;
  ${(props) => `
    font-size: ${props.textSize}px;
    `}
`;
