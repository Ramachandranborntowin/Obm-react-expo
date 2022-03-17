import React, { Component, useCallback, useMemo, useState, memo } from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  Alert,
  StatusBar,
  TouchableOpacity,
  Button,
  ToastAndroid,
  AlertIOS,
} from "react-native";
import { Formik } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { styles } from "./ForgetPasswordStyle";
import CustomErrorComponent from "../../../../config/customComponents/custom_Error_message";
// import { Actions } from 'react-native-router-flux';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import '../../config/GlobalStyles';
import * as Animatable from "react-native-animatable";
import {
  ForgetPasswordApi,
  validateOtpApi,
  newPasswordApi,
} from "../../../services/ForgetPasswordApi";
// import CustomTextField from '../Component/Custom-components/custom_TextField'
// import FooterButton from './Custom-components/custom_Footer_Button';
import CustomTextField from "../../../../config/customComponents/custom_TextField";
import colors from "../../../../config/color";
import CustomFooterButton from "../../../../config/customComponents/custom_Footer_Button";
import {
  StyledTextInput,
  StyledTextForgetPasswordHeading,
  StyledForgetPasswordDescription,
} from "../../../../config/customStylesComponents/customForgetPasswordStyleComponent";
import custom_Toast from "../../../../config/customComponents/custom_Toast";
import fontSize from "../../../../config/fontSize";
import { StyledSettingsHeading } from "../../../../config/customStylesComponents/customSettingsStylesComponent";
import {
  StyledTextButton,
  StyledTouchableOpacityButtonContainer,
} from "../../../../config/customStylesComponents/customCancelButton";
import { useFocusEffect } from "@react-navigation/core";
const platform = Platform.select({
  ios: "ios",
  android: "android",
});
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const ForgetPasswordLandingPage = (props) => {
  const [email, setEmail] = useState(null);
  const [otpEditable, setOtpEditable] = useState(true);
  const [otpValues, setOtpValues] = useState(0);
  const [vOtp, setVOtp] = useState(null);

  const [forgetpassword, setForgetPassword] = useState(null);
  const [forgetpasswordotp, setForgetpasswordOtp] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [newpassword, setNewPassword] = useState();
  const [userId, setUserId] = useState();
  const [otpErrors, setOtpErrors] = useState();
  const [passwordErrors, setPasswordErrors] = useState();
  const [validOtp, setValidOtp] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const emailrjx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const initialValues = {
    email: PropTypes.string,
  };
  const onSubmit = (values, onSubmitProps) => {
    console.log(onSubmitProps);
    ForgetPasswordApi(values.email).then((res) => {
      if (res.data.success) {
        setUserId(res.data.data.id);
        setForgetpasswordOtp(true);
        setEmail(values.email);
      } else {
        custom_Toast({ message: "Enter valid Email" });
      }
    });
    onSubmitProps.resetForm();
  };
  const validationYup = Yup.object({
    email: Yup.string()
      .required("Email cannot be empty")
      .email("Please enter valid email"),
  });

  const initialValues_forgetpasswordotp = {
    otp: PropTypes.string,
    newPassword: PropTypes.string,
  };
  const onSubmit_forgetpasswordotp = (values, onSubmitProps) => {
    console.log("hello");
    console.log(values.otp, values.newPassword);
    newPasswordApi(userId, values.newPassword).then((res) => {
      if (res.data.success) {
        props.navigation.navigate("Login");
      }
    });
  };
  const validationYup_forgetpasswordotp = Yup.object({
    otp: Yup.string()
      .required("OTP cannot be empty")
      .min(4, `OTP must be 4 char`)
      .test("otp value", (value) => {
        console.log("val", value);
        if (value && value.length >= 4 && otpValues == 0 && !validOtp) {
          validateOtpApi(userId, value).then((res) => {
            if (res.data.succ_msg && res.data.success) {
              custom_Toast({ message: res.data.succ_msg });
              // ToastAndroid.show(res.data.succ_msg, ToastAndroid.LONG);
              setValidOtp(true);
              setOtpErrors(undefined);
              return true;
            } else {
              custom_Toast({ message: res.data.err_msg });
              // ToastAndroid.show(res.data.err_msg, ToastAndroid.LONG);
              setOtpErrors(res.data.err_msg);
              setValidOtp(false);
              return false;
            }
          });
        }
        return true;
        // validateOtp(value)
      }),
    newPassword: Yup.string()
      .required("New password cannot be empty")
      .min(6, `New password must be at least 6 char`),
  });
  return (
    <>
      {forgetpasswordotp ? (
        <Formik
          initialValues={initialValues_forgetpasswordotp}
          onSubmit={onSubmit_forgetpasswordotp}
          validationSchema={validationYup_forgetpasswordotp}
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
            console.log("errors", errors);
            console.log("otp errors", otpErrors);
            return (
              <View style={{ flex: 1, backgroundColor: colors.primary }}>
                <ScrollView>
                  <View style={styles.container}>
                    <StyledTextForgetPasswordHeading>
                      Forget Your Password ?
                    </StyledTextForgetPasswordHeading>
                    <StyledForgetPasswordDescription style={styles.description}>
                      Enter your email address and we'll send you a password
                      reset via sms or email
                    </StyledForgetPasswordDescription>
                    <View style={{ marginTop: 15 }}>
                      <StyledTextInput
                        placeholder={"Enter OTP"}
                        keyboardType="numeric"
                        autoFocus={true}
                        maxLength={4}
                        onBlur={handleBlur("otp")}
                        onChangeText={handleChange("otp")}
                        editable={otpEditable}
                      />
                    </View>
                    {(errors.otp || otpErrors) && (
                      <CustomErrorComponent
                        errormessagename={otpErrors ? otpErrors : errors.otp}
                      />
                    )}
                    <ResendOtp
                      descriptionName={"Please Enter Otp before 2 mins"}
                      otpButtonName={"RESEND OTP"}
                      setOtpEditable={setOtpEditable}
                      email={email}
                      validOtp={validOtp}
                    />
                    <Text style={styles.description}>
                      set a new password for your account
                    </Text>

                    <View style={{ marginTop: 15 }}>
                      <StyledTextInput
                        value={email}
                        editable={false}
                        selectTextOnFocus={false}
                      />
                    </View>

                    {validOtp && (
                      <View style={{ marginTop: 15 }}>
                        <StyledTextInput
                          onChangeText={handleChange("newPassword")}
                          onBlur={handleBlur("newPassword")}
                          maxLength={8}
                          minLength={6}
                          placeholder="Enter the new password"
                        />
                      </View>
                    )}
                    {errors.newPassword && touched.newPassword && validOtp && (
                      <CustomErrorComponent
                        errormessagename={errors.newPassword}
                      />
                    )}
                  </View>
                </ScrollView>
                <View style={styles.footer}>
                  <CustomFooterButton
                    title={"SET NEW PASSWORD"}
                    onPress={handleSubmit}
                    dirty={dirty}
                    isValid={isValid}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      ) : (
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
              <View style={{ flex: 1, backgroundColor: colors.primary }}>
                <ScrollView>
                  <View style={styles.container}>
                    <StyledTextForgetPasswordHeading>
                      Forget Your Password ?
                    </StyledTextForgetPasswordHeading>
                    <StyledForgetPasswordDescription style={styles.description}>
                      Enter your email address and we'll send you a paassword
                      reset via sms or email
                    </StyledForgetPasswordDescription>
                    <View style={{ marginTop: 15, paddingLeft: 5 }}>
                      <StyledTextInput
                        onChangeText={handleChange("email")}
                        onSubmitEditing={handleSubmit}
                        onBlur={handleBlur("email")}
                        autoFocus={true}
                      />
                    </View>
                    {errors.email && touched.email && (
                      <CustomErrorComponent errormessagename={errors.email} />
                    )}
                  </View>
                </ScrollView>
                <View style={styles.footer}>
                  <CustomFooterButton
                    onPress={handleSubmit}
                    title={"SEND RESET CODE"}
                    dirty={dirty}
                    isValid={isValid}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      )}
    </>
  );
};
export default ForgetPasswordLandingPage;

export const ResendOtp = memo((props) => {
  const { descriptionName, otpButtonName, setOtpEditable, email, validOtp } = props;
  const [countSeconds, setCountSeconds] = useState(0);
  const [countMinutes, setCountMinutes] = useState(0);
  const [otpTimes, setOtpTimes] = useState("0:00");
  const [enableResendOtp, setEnableResendOtp] = useState(false);
  const resendotp = () => {
    ForgetPasswordApi(email).then((res) => {
      if (res.data.success) {
        setCountSeconds(0);
        setCountMinutes(0);
        setEnableResendOtp(false);
        custom_Toast({ message: res.data.succ_msg });
        setOtpEditable(true);
      } else {
        custom_Toast({ message: "Enter valid Email" });
      }
    });
  };
  const otpTime = () => {
    let modefiedCountSeconds;
    // if (countMinutes != 2) {
    setCountSeconds(countSeconds + 1);
    // }
    if (countSeconds == 60) {
      setCountSeconds(0);
      setCountMinutes(countMinutes + 1);
    }
    if (countSeconds < 10) {
      modefiedCountSeconds = `0${countSeconds}`;
    } else {
      modefiedCountSeconds = countSeconds;
    }
    return `${countMinutes}:${modefiedCountSeconds}`;
  };
  useFocusEffect(
    useCallback(() => {
      let time = "";
      const intervalId = setInterval(() => {
        console.log('validOtp', validOtp)
        if(!validOtp){
        if (countMinutes != 2) {
          time = otpTime();
          setOtpTimes(time);
          console.log(time);
        } else {
          setEnableResendOtp(true);
          setOtpEditable(false);
          clearInterval(intervalId);
        }
      }else{
        clearInterval(intervalId);
      }
      }, 1000);
      return () => clearInterval(intervalId);
    }, [countSeconds, countMinutes, validOtp])
  );
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <StyledForgetPasswordDescription>
          {descriptionName}
        </StyledForgetPasswordDescription>
        {!enableResendOtp && (
          <Text
            style={{
              marginRight: 20,
              fontSize: fontSize.Beep_heading,
              marginLeft: "auto",
            }}
          >
            {otpTimes}
          </Text>
        )}
        {enableResendOtp && (
          <StyledTouchableOpacityButtonContainer
            onPress={resendotp}
            Color={colors.secondary}
            Padding={20}
            style={{ marginLeft: "auto" }}
          >
            <StyledTextButton textSize={fontSize.Beep_description}>
              {otpButtonName}
            </StyledTextButton>
          </StyledTouchableOpacityButtonContainer>
        )}
      </View>
    </View>
  );
});
