import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import colors from '../color';
import {StyledButtonLogin, StyledButtonTextlogin} from '../customStylesComponents/customLoginStyleComponent'
const CustomLoginButton = (props) => {
    const {name, action, isValid, dirty, isSubmitting} = {...props}
    return (
        <StyledButtonLogin
        // disabled={!(isValid && dirty) || isSubmitting}
            onPress={() => action()}
        >
            <StyledButtonTextlogin >{name}</StyledButtonTextlogin>
        </StyledButtonLogin>
    )
}
export default React.memo(CustomLoginButton);