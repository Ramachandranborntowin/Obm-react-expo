import React, {Component, useState, useEffect, memo, useCallback} from 'react';
import { Searchbar } from 'react-native-paper';
import colors from "../color"
import { Ionicons } from '@expo/vector-icons'; 
const CustomSwitchBar = (props)=>{
    const {onChangeText, value} = props
    return (
        <Searchbar
      placeholder="Search"
      onChangeText={onChangeText}
      value={value}
      style={{height: 40, marginTop: 5, color: 'green'}}
      iconColor={colors.danger}
      icon={()=><Ionicons name="ios-search-sharp" size={24} color={colors.secondary} />}
      selectionColor={colors.secondary}
    />
    )
}
export default memo(CustomSwitchBar)