import styled from "styled-components";
import colors from "../color";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const StyledTransactionListAlipayIcon = styled.Image`
height: ${deviceHeight / 26}; width: ${deviceWidth / 14.2};
`;
export const StyledTransactionListAlipayIconText = styled.Text`
font-weight: bold;
`
export const StyledTransactionAmountText = styled.Text`
font-weight: bold;
${(props) => `
        font-size:${props.fontSize}px;
    `}
`;