import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    Image
} from 'react-native';
import colors from '../color';
import {StyledViewPaymentRequestHeader, StyedTextPaymentRequestHeder} from '../customStylesComponents/customPaymentRequest'
import CustomDollerIcon from '../customIcon/customDollerIcon';
const PaymentDiaplayHeader = (props) => {
    const {number } = {...props}
    return (
        <StyledViewPaymentRequestHeader>
            <CustomDollerIcon source={require('../../assets/icons/doller.png')} />
            <StyedTextPaymentRequestHeder> {number.length > 0 ? number.join("") / 100 : '0.00'} </StyedTextPaymentRequestHeder>
        </StyledViewPaymentRequestHeader>
    )
}
export default PaymentDiaplayHeader