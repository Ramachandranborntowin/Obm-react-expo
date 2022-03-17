import React from 'react';
import { Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../color';
const CustomMenuIcon = (
    props
) => {
    console.log('props',props)
    return(
    <IonIcon
    name={'menu'}
    style={{paddingLeft: 20}}
    size={30}
    color={colors.primary}
    onPress={() => props.navigation.openDrawer()}
  />)
}

export default CustomMenuIcon;

