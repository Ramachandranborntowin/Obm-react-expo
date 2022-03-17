import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import fontSize from "../fontSize";
const CustomEditIcon = (props)=>{
  const {iconcolor} = props
    return(
        <FontAwesome5
                  name={"pencil-alt"}
                  style={[{
                    fontSize: fontSize.Beep_iconSize_2,
                  }, iconcolor && {color: iconcolor}]}
                />
    )
}
export default CustomEditIcon