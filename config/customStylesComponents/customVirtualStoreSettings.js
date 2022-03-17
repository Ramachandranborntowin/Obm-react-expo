import styled from "styled-components";
import colors from "../color";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const StyledEditStoreDetailsIcon = styled.Image`
height: 40px;
 width: 40px;
`;
export const StyledEditStoreDateTimeContainer = styled.TouchableOpacity`
${console.log('deviceWidth', deviceWidth)}
border-width: 1px;
      border-color: ${colors.grey};
      padding-vertical: 10px;
      padding-horizontal: ${deviceWidth<=380 ? `5px` : `10px`};
      border-radius: 7px;
      margin-left: 2px
`
export const StyledEditStoreDetailListImage = styled.Image`
height: 70px;
width: 70px;
`
export const StyledEditStoreDetailImageBlur = styled.Image`
height: 40px;
width: 50px;
opacity: 0.2px;
`