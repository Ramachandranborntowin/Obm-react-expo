import React from 'react';
import { Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../color';
const CustomBackIcon = (
    props
) => {
    const {navigation, names} = props
    return(
        <IonIcon
        name={'arrow-back-outline'}
        style={{paddingLeft: 20}}
        size={30}
        color={colors.primary}
        onPress={() =>
            names === 'SwitchMerchant'
            ? navigation.navigate('New sale')
            : navigation.goBack(null)
        }
      />)
}

export default CustomBackIcon;

