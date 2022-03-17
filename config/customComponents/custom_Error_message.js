import React from 'react';
import * as Animatable from 'react-native-animatable';
import {StyledErrorMessage} from '../customStylesComponents/customErrorMessageStyleComponent'
const CustomErrorComponent = props => {
  return (<Animatable.View animation="fadeInLeft" duration={500}>
                  <StyledErrorMessage>{props.errormessagename}</StyledErrorMessage>
                </Animatable.View>)
};
export default React.memo(CustomErrorComponent);
 