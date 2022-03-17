import {Picker} from '@react-native-picker/picker';
import React, {Component, useState, useEffect, memo} from 'react';
import {
  View,
  Text,
} from 'react-native';
import colors from "../color"
import { StyledDropDownContainer } from '../customStylesComponents/customDropDown';
const CustomDropDown = (props)=>{
    const {onValueChange, value} = props
    return(
        <StyledDropDownContainer accessibilityElementsHidden={true} >
            <Picker
              selectedValue={value}
              style={{height: 50, marginVertical: -10, color: colors.black}}
              onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text
              style={{
                width: '100%',
                height: 60,
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}>
              {' '}
            </Text>
          </StyledDropDownContainer>
    )
}
export default memo(CustomDropDown)
