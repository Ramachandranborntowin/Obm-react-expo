import React, {
   
} from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import colors from "../color"
import { useRef, forwardRef, memo } from "react";
const Custom_virtual_store_textfield = forwardRef((props, ref)=>{
  return(
      <View
          style={{
            borderColor: colors.grey,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
            position: 'relative',
            height: 45,
          }}>
          <TextInput {...props} ref={ref} />
        </View>
  )
})
export default memo(Custom_virtual_store_textfield)
