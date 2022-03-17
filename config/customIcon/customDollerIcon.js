import React from 'react';
import { Text, View } from 'react-native';
import colors from '../color';
import {StyledDollerIcon} from '../customStylesComponents/customDollerIcon'
import {
    Image
} from 'react-native';
const CustomDollerIcon = (
    params
) => (
    <StyledDollerIcon source={require('../../assets/icons/doller.png')} />
);

export default CustomDollerIcon;