import React from 'react';
import { FAB } from 'react-native-paper';
import colors from "../color"
const CustomStickeyAddButton = (props)=>{
  const {onPress, navigationName} = props
    return(
        <FAB
    style={{ position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 0,
    backgroundColor: colors.secondary}}
    color={colors.primary}
    icon="plus"
    onPress={() => onPress(navigationName)}
  />
    )
}
export default CustomStickeyAddButton