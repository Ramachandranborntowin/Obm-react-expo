import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../color';
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const CustomBackspaceIcon = (
    params
) => (
    <IonIcon name="backspace-outline" style={{ fontSize: deviceWidth<=380 ? 28 : 32}}></IonIcon>
);

export default CustomBackspaceIcon;