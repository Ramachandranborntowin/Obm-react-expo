import styled from "styled-components";
import colors from "../color";
import { Dimensions } from "react-native";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const StyledDrawerpaymentDate = styled.TouchableOpacity`
border: 1px solid ${colors.grey};
border-radius: 5px;
height: 45px;
justify-content: center;
flex-direction: row;
padding: 10px;
`;
export const StyledTextFieldWithPrefix = styled.Text`
border: 1px solid ${colors.grey};
flex-grow: 1px;
height: 45px;
text-align: center;
background-color: ${colors.Beepplus_light_grey};
border-radius: 5px;
margin-top: 10px;
`;
export const StyledViewForLink = styled.View`
border: 1px solid ${colors.grey};
border-radius: 5px;
padding-left: 10px;
height: 45px;
background-color: ${colors.gray_c};
flex-direction: row;
align-items: center;
              `
// border-radius: 50px 0px 0px 50px;
