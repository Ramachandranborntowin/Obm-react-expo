import React, { useState, createRef } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  PageLogo,
  StyledForgetPasswordText,
} from "../../../../config/customStylesComponents/customLoginStyleComponent";
import { styles } from "./LoginStyle";
import CustomLoginTextField from "../../../../config/customComponents/custom_Login_Text_Field";
import CustomLoginButton from "../../../../config/customComponents/custom_Login_Button";
import store from "../../../redux/store";
import colors from "../../../../config/color";
import LoginAction from "../../../redux/login/LoginAction";
import CustomErrorComponent from "../../../../config/customComponents/custom_Error_message";
import { boolean } from "yup/lib/locale";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const Login = (props) => {
  const [passwordTextVisible, setpasswordTextVisible] = useState(true);
  // const [isEmailValue, setIsEmailValue] = useState(false);
  // const emailrjx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const usernameRef = createRef(null);
  const passwordRef = createRef(null);

  const initialValues = {
    showEmail: "0",
    phonenumberOrEmail: "",
    password: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log(values, onSubmitProps);
    store.dispatch(LoginAction(values.phonenumberOrEmail, values.password));
    // onSubmitProps.resetForm();
  };

  const validationYup = Yup.object({
    phonenumberOrEmail: Yup.string().when("showEmail", {
      is: "1",
      then: Yup.string()
        .email("Please enter valid email")
        .required("email cannot be empty"),
      otherwise: Yup.string()
        .required("phonenumber cannot be empty")
        .min(6, `phonenumber must be at least 6 char`)
        .max(8, `phonenumber not greater than 8 char`),
    }),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(6, `Password must be at least 6 char`)
      .max(8, `Password not greater than 8 char`),
  });
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: colors.primary }}
      keyboardShouldPersistTaps={"handled"}
    >
      <View style={styles.container}>
        <View style={styles.logo_container}>
          <PageLogo
            height={deviceWidth <= 380 ? 230 : 300}
            width={300}
            source={require("../../../../assets/image/logo.png")}
          />
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationYup}
          // validateOnChange={false}
        >
          {(formik) => {
            const {
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              isSubmitting,
              loggingIn,
              dirty,
            } = formik;
            return (
              <View style={{ flex: 1, marginTop: 35 }}>
                {/* <Text style={styles.text_color}>Mobile Number or Email</Text> */}
                <SafeAreaView style={{ overflow: "hidden" }}>
                  <View style={{ marginBottom: 30 }}>
                    <CustomLoginTextField
                      // name={"phonenumberOrEmail"}
                      // value={values.phonenumberOrEmail}
                      ref={usernameRef != null && usernameRef}
                      placeholder="Mobile Number or Email"
                      returnKeyType="next"
                      placeholderTextColor={colors.secondary}
                      autoCorrect={false}
                      onBlur={handleBlur("phonenumberOrEmail")}
                      onSubmitEditing={() => passwordRef.current.focus()}
                      onChangeText={(event) => {
                        handleChange("phonenumberOrEmail")(event);
                        console.log(values.phonenumberOrEmail.includes("@"));
                        if (Number(values.phonenumberOrEmail)) {
                          console.log(values.showEmail);
                          handleChange("showEmail")("0");
                        } else {
                          handleChange("showEmail")("1");
                        }
                      }}
                      enablePasswordIcon={false}
                    />
                    {errors.phonenumberOrEmail &&
                      touched.phonenumberOrEmail && (
                        <CustomErrorComponent
                          errormessagename={errors.phonenumberOrEmail}
                        />
                      )}
                  </View>
                  {/* <Text style={styles.text_color}>Password</Text> */}
                  <View style={{ marginBottom: 30 }}>
                    <CustomLoginTextField
                      // name={"password"}
                      value={values.password}
                      ref={passwordRef != null && passwordRef}
                      secureTextEntry={passwordTextVisible}
                      autoCorrect={false}
                      placeholder="Password"
                      returnKeyType="done"
                      placeholderTextColor={colors.secondary}
                      onBlur={handleBlur("password")}
                      onSubmitEditing={handleSubmit}
                      onChangeText={handleChange("password")}
                      setpasswordTextVisible={setpasswordTextVisible}
                      passwordTextVisible={passwordTextVisible}
                      enablePasswordIcon={true}
                      maxLength={8}
                    />
                    {errors.password && touched.password && (
                      <CustomErrorComponent
                        errormessagename={errors.password}
                      />
                    )}
                    <TextInput
                      keyboard="none"
                      onChangeText={handleChange("showEmail")}
                      editable={false}
                    />
                  </View>
                </SafeAreaView>
                <CustomLoginButton
                  name="Login"
                  action={handleSubmit}
                  isValid={isValid}
                  dirty={dirty}
                  // isSubmitting={isSubmitting}
                />
                <TouchableHighlight style={styles.buttonSignup}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("Reset Password")}
                  >
                    <StyledForgetPasswordText>
                      Forgot Password?
                    </StyledForgetPasswordText>
                  </TouchableOpacity>
                </TouchableHighlight>
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};
export default Login;
