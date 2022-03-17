import IonIcon from "react-native-vector-icons/Ionicons";
import React from "react";
import colors from "../color"
import fontSize from "../fontSize";
const CustomDeleteIcon = (props)=>{
    return(
        <IonIcon
              name={"trash"}
              style={{
                color: colors.danger,
                fontSize: fontSize.Beep_login_logo,
              }}
            />
    )
}
export default CustomDeleteIcon