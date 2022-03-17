import React, { Component, useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Platform,
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    SafeAreaView,
    TouchableHighlight,
    Alert,
    FlatList, StatusBar, TouchableOpacity, Modal, Pressable
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import fontSize from '../fontSize';
import colors from '../color'
import { StyledSwitchMerchantContaiiner } from '../customStylesComponents/customSwitchMerchantStyleComponent';
import CustomSwitchMerchantRadioIcon from '../customIcon/customSwitchMerchantRadioIcon';
import { StyledHorizontalLineDark } from '../customStylesComponents/customHorizontalLine';
const styles = StyleSheet.create({
    listHeader: {
        backgroundColor: colors.primary, padding: 8, flexDirection: 'row'
    },
    name: {
        fontWeight: 'bold', fontSize: fontSize.Beep_subHeading, paddingBottom: 8
    },
    iconContainer: {
        alignSelf: 'center', marginLeft: 'auto'
    },
})
const SwitchMerchantCart = (params) => {
    const {onPress, props, item} = {...params}
    const [colorsContainer, setColorsContainer] = useState(colors.primary)
    useEffect(()=>{
        if(props.loginData.data.merchant.id == item.id){
            setColorsContainer(colors.Beepplus_light_grey)
        }else{
            setColorsContainer(colors.primary)
        }
    }, [props.loginData.data.merchant.id, item.id])
    return (
        <TouchableOpacity onPress={() => onPress(item.id, props)} disabled={props.loginData.data.merchant.id == item.id && true}>
            <StyledSwitchMerchantContaiiner backgroundColor={colorsContainer} >
                <View >
                    <Text style={styles.name}>
                        {item.name}
                    </Text>
                    <Text>{item.email_id}</Text>
                    <Text style={{ color: colors.grey }}>{item.mobile_no}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <CustomSwitchMerchantRadioIcon props={props.loginData} itemid={item.id} />
                </View>
            </StyledSwitchMerchantContaiiner>
           <StyledHorizontalLineDark /></TouchableOpacity>
            
    )
}
export default SwitchMerchantCart