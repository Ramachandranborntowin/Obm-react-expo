import IonIcon from "react-native-vector-icons/Ionicons";
import React from "react";
import colors from "../color"
import fontSize from "../fontSize";
const CustomLocationIcon = (props)=>{
    const {color} = props
    return(
        <IonIcon
              name={"location-sharp"}
              style={{
                color: color,
                fontSize: fontSize.Beep_iconSize_4,
              }}
            />
    )
}
export default CustomLocationIcon