import styled from "styled-components";
import colors from "../color";
import fontSize from "../fontSize";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const StyledSwitchMerchantContaiiner = styled.View`
 padding: 8px; 
 flex-direction: row;
 ${(props) => `
 background-color:${props.backgroundColor};
    `}
`
