import React from 'react';
import { Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../color';
const CustomQrSanner = (
    props
) => {
    const {textAlign} = {...props}
    return(
        <IonIcon
        name="scan"
        style={{ textAlign: textAlign, fontSize: 30 }}
      />)
}

export default CustomQrSanner;