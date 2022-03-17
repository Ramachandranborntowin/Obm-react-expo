import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../color";
import fontSize from "../fontSize";
import IonIcon from 'react-native-vector-icons/Ionicons';
import {CustomBlueDotIconSecondary, CustomBlueDotIconSecondaryOutline} from "./customBlueDotIcon";

// export const RadioBlueIcon = ()=>{
//     return(
//         <IonIcon
//     name={ "ellipse"}
//     style={{fontSize: fontSize.Beep_iconSize_2, color: colors.secondary}}
//   />
//     )
// }

// export const RadioOutlineIcon = ()=>{
//     return(
//         <IonIcon
//     name={ "ellipse-outline"}
//     style={{fontSize: fontSize.Beep_iconSize_2, color: colors.grey}}
//   />
//     )
// }

const CustomSwitchMerchantRadioIcon = (params) => {
    const {props, itemid} = params
    return(
        <>
        {props.data.merchant.id == itemid ? <CustomBlueDotIconSecondary /> : <CustomBlueDotIconSecondaryOutline />}
        </>
  )
}

export default CustomSwitchMerchantRadioIcon;
