import React,{memo} from 'react'
import colors from '../color';
import { FontAwesome } from "@expo/vector-icons";
const CustomFileIconWithBackgroundBlue = (props)=>{
    return(
        <FontAwesome
              name="file-text"
              size={24}
              color={colors.primary}
              style={{
                backgroundColor: colors.Beepplus_Background_Blue,
                marginLeft: "auto",
                padding: 10,
              }}
            />
    )
}
export default memo(CustomFileIconWithBackgroundBlue)