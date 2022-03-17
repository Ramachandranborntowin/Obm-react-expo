import React from 'react';
import { Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../color';
const CustomEyeIcon = (
    params
) => (
    <IonIcon name={params.name ? "eye-off" : "eye"} style={{ fontSize: 25, color: colors.secondary, }}></IonIcon>
);

export default CustomEyeIcon;
