import IonIcon from "react-native-vector-icons/Ionicons";
import React from "react";
import colors from "../color"
import fontSize from "../fontSize";
const CustomTimeIcon = (props)=>{
    const {color} = props
    return(
        <IonIcon
                name={"time-outline"}
                style={{
                  fontSize: fontSize.Beep_large_font,
                  color: color,
                }}
              />
    )
}
export default CustomTimeIcon