import React, { forwardRef } from "react";
import { StyleSheet, Text, TouchableOpacity, TextInput,View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from "react-native-material-textfield-plus";
import colors from "../color";
import fontSize from "../fontSize";
import { StyledTextFieldWithPrefix } from "../customStylesComponents/DrawerPaymentRequest";
import Custom_virtual_store_textfield from "./custom_virtual_store_textfield";
const styles = StyleSheet.create({
  textInputStyle: {
    minHeight: 55,
    fontSize: fontSize.Beep_subHeading,
    paddingLeft: 5,
    color: "black",
    borderRadius: 7,
    borderColor: "black",
    borderWidth: 1,
    paddingLeft: 15,
    marginTop: 15,
    backgroundColor: colors.gray_c,
  },
  btn_upload: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

const CustomTextField = (props) => {
  const {
    onSubmitEditing,
    autoFocus,
    value,
    editable,
    selectTextOnFocus,
    onChangeText,
    maxLength,
    keyboardType,
    placeholder,
  } = { ...props };
  return (
    <TextInput
      style={styles.textInputStyle}
      placeholder={placeholder}
      autoFocus={autoFocus}
      maxLength={maxLength}
      keyboardType={keyboardType}
      value={value}
      editable={editable}
      selectTextOnFocus={selectTextOnFocus}
      onChangeText={(val) => {
        onChangeText(val);
      }}
      onSubmitEditing={() => {
        onSubmitEditing();
      }}
    ></TextInput>
  );
};
export default CustomTextField;

export const CustomTextFieldHoverPlaceholder = React.memo(
  forwardRef((props, ref) => {
    // const {
    //   onBlur,
    //   onSubmitEditing,
    //   data,
    //   securedTextEntry,
    //   array,
    //   index,
    //   textVisible,
    //   onChangeText,
    // } = { ...props };
    return <TextField ref={ref} {...props} />;
  })
);

// data.name === 'Current Password' ? eyeiconCurrPassword : (data.name === 'New Password' ? eyeiconNPassword : eyeiconCPassword)

export const CustomTextFieldWithPrefixBND = React.memo(
  forwardRef((props, ref) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <StyledTextFieldWithPrefix style={{textAlignVertical: "center", borderRightWidth: 0}}>BND</StyledTextFieldWithPrefix>
        <View style={{ flexGrow: 9, marginLeft: -5 }}>
          <Custom_virtual_store_textfield />
        </View>
      </View>
    );
  })
);
