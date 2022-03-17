import React, {
  Component,
  useState,
  useEffect,
  memo,
  useCallback,
} from "react";
import { RadioButton } from "react-native-paper";
import { Formik, Field } from "formik";
import { StyleSheet, View, Text } from "react-native";
import fontSize from "../fontSize";
import colors from "../color";
import CustomErrorComponent from "./custom_Error_message";

const styles = StyleSheet.create({
  radiobutton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
  },
});

const CustomRadioButton = (props) => {
  return <RadioButton {...props} />;
};

const FormikRadioButton = (props) => {
  const { datas, value, onPress, name, errors, touched } = props;
  return (
    <Field type="text">
      {(params) => {
        const { field } = params;
        console.log("fields", field);
        return datas.map((obj, i) => (
          <View style={[{ flexDirection: "row", alignItems: "center", marginTop: props.marginVertival || 0 }]} >
            <CustomRadioButton
              key={obj.value}
              value={obj.value}
              status={value === obj.value ? "checked" : "unchecked"}
              // {...field}
              onPress={() => onPress(name, obj.value)}
              color={colors.secondary}
            />
            <Text
              style={{
                fontSize: props.fontSize || fontSize.Beep_radiobutton_label,
                color: colors.black,
                fontWeight: "800",
              }}
            >
              {obj.label}
            </Text>
          </View>
        ));
      }}
    </Field>
  );
};
export const CustomHorzontalRadioButton = ({ errors, touched, ...props }) => {
  return (
    <View>
      <View style={[styles.radiobutton]}>
        <FormikRadioButton {...props} />
      </View>
      {errors && touched && <CustomErrorComponent errormessagename={errors} />}
    </View>
  );
};
export const CustomVerticalRadioButton = ({ errors, touched, ...props }) => {
  return (
    <View>
      <View>
        <FormikRadioButton {...props} />
      </View>
      {errors && touched && <CustomErrorComponent errormessagename={errors} />}
    </View>
  );
};
