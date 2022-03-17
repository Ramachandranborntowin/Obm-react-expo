import React from "react";
import { useRef, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import IonIcon from "react-native-vector-icons/Ionicons";
import colors from "../color";
import CustomEyeIcon from "../customIcon/customEyeIcon";
// import {CustomEyeIcon} from '../customIcon'
import {
  StyledTextInputLogin,
  StyledViewLogin,
  StyledIconLogin,
} from "../customStylesComponents/customLoginStyleComponent";
const CustomLoginTextField = forwardRef((props, ref) => {
  const {
    setpasswordTextVisible,
    passwordTextVisible,
    enablePasswordIcon,
    ...rest
  } = { ...props };

  return (
    <View>
      <StyledViewLogin>
        <StyledTextInputLogin {...rest} ref={ref}></StyledTextInputLogin>
        {enablePasswordIcon && (
          <StyledIconLogin
            onPress={() => setpasswordTextVisible(!passwordTextVisible)}
          >
            <CustomEyeIcon name={passwordTextVisible} />
          </StyledIconLogin>
        )}
      </StyledViewLogin>
    </View>
  );
});
export default React.memo(CustomLoginTextField);
