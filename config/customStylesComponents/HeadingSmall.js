import styled from "styled-components";
import colors from "../color";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const StyledHeadingSmall = styled.Text`
  color: ${colors.primary};
  font-weight: bold;
  padding: 20px;
  padding-top: 14px;
`;
export const StyledHeadingSmallContainer = styled.View`
background-color: ${colors.secondary};
flex-direction: row;
align-items: center;
justify-content: center;
`
