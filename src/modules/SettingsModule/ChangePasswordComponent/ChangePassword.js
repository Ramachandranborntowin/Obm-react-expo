import React, { useState, useRef } from "react";
import {
  ToastAndroid,
  Animated,
  Button,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Pressable,
  ScrollView,
} from "react-native";
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from "react-native-material-textfield-plus";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Animatable from "react-native-animatable";
import { Header } from "react-native/Libraries/NewAppScreen";
import IonIcon from "react-native-vector-icons/Ionicons";
// import { ScrollView } from 'react-native-gesture-handler';
import { ChangePasswordApi } from "../../../services/ChangePasswordApi";
import colors from "../../../../config/color";
import fontSize from "../../../../config/fontSize";
import custom_Toast from "../../../../config/customComponents/custom_Toast"
import { CustomTextFieldHoverPlaceholder } from "../../../../config/customComponents/custom_TextField";
import { CustomFooterButtonWithoutBorderRadius } from "../../../../config/customComponents/custom_Footer_Button";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  updatePassword: {
    padding: 16,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  errMsg: {
    color: colors.danger,
    paddingLeft: 10,
  },
});
const data = [
  {
    name: "Current Password",
    autofocus: true,
    initialvaluesnames: "currentPassword",
  },
  {
    name: "New Password",
    initialvaluesnames: "newPassword",
  },
  {
    name: "Confirm Password",
    initialvaluesnames: "confirmPassword",
  },
];
const ChangePassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [passwordTextVisible, setpasswordTextVisible] = useState(false);
  const [CurrPassword, setCurrPassword] = useState(true);
  const [NPassword, setNPassword] = useState(true);
  const [CPassword, setCPassword] = useState(true);
  const [eyeiconCurrPassword, setEyeiconCurrPassword] = useState("eye-off");
  const [eyeiconNPassword, setEyeiconNPassword] = useState("eye-off");
  const [eyeiconCPassword, setEyeiconCPassword] = useState("eye-off");
  const [currpasswordError, setCurrpasswordError] = useState();
  const [newpasswordError, setnewPasswordError] = useState();
  const [conformpasswordError, setConformPasswordError] = useState();
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const conformPasswordRef = useRef(null);
  const textVisible = (name) => {
    if (name === "Current Password") {
      setEyeiconCurrPassword(CurrPassword ? "eye" : "eye-off");
      setCurrPassword(!CurrPassword);
    } else if (name === "New Password") {
      setEyeiconNPassword(NPassword ? "eye" : "eye-off");
      setNPassword(!NPassword);
    } else {
      setEyeiconCPassword(CPassword ? "eye" : "eye-off");
      setCPassword(!CPassword);
    }
  };
  // const submitEditing = (data) => {
  //   if (data.name === "Current Password") {
  //     newPasswordRef.current.focus();
  //   }
  //   if (data.name === "New Password") {
  //     conformPasswordRef.current.focus();
  //   }
  //   if (data.name === "Confirm Password") {
  //     submit();
  //   }
  // };
  const securedTextEntry = (data) => {
    console.log(data);
    if (data.name === "Current Password") {
      return CurrPassword;
    } else if (data.name === "New Password") {
      return NPassword;
    } else {
      return CPassword;
    }
  };

  const initialValues = {
    currentPassword: "",
    confirmPassword: "",
    newPassword: "",
  };
  const toastmsg = (msg)=>{
    custom_Toast({message: msg})
  }
  const onSubmit = (values, onSubmitProps) => {
    console.log(values);
    ChangePasswordApi(values.currentPassword, values.newPassword).then(
      (res) => {
        console.log(res);
        if (res.data.succ_msg && res.data.success) {
          toastmsg(res.data.succ_msg)
          props.navigation.goBack(null);
        } else {
          toastmsg(res.data.err_msg)
        }
      }
    );
  };

  const validationYup = Yup.object({
    currentPassword: Yup.string()
      .required("Current Password cannot be empty")
      .min(6, `Current Password must be at least 6 char`)
      .max(8, `Current Password is greater than 8 char`),

    newPassword: Yup.string()
      .required("New Password cannot be empty")
      .min(6, `New Password must be at least 6 char`)
      .max(8, `New Password is greater than 8 char`),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), ""],
        "Confirm Password Must Match to New password"
      )
      .required("Confirm Password cannot be empty"),

  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationYup}
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
          <ScrollView style={[styles.container]}>
            <View>
              <View style={styles.updatePassword}>
                <Text>Update your password</Text>
              </View>
              <View
                style={{ paddingBottom: 10, backgroundColor: colors.primary }}
              >
                {data.map((data, index, datas) => (
                  <View style={styles.content}>
                    <CustomTextFieldHoverPlaceholder
                      ref={
                        data.name === "Current Password"
                          ? currentPasswordRef
                          : data.name === "New Password"
                          ? newPasswordRef
                          : conformPasswordRef
                      }
                      secureTextEntry={securedTextEntry(data)}
                      onChangeText={handleChange(data.initialvaluesnames)}
                      onBlur={handleBlur(data.initialvaluesnames)}
                      onSubmitEditing={()=>{
                        data.name === "Current Password"
                          ? newPasswordRef.current.focus()
                          : data.name === "New Password"
                          ? conformPasswordRef.current.focus()
                          : handleSubmit
                      }
                      }
                      // data={data}
                      // textVisible={textVisible}
                      // array={datas}
                      // index={index}
                      autoCapitalize="none"
                      maxLength={8}
                      returnKeyType={
                        datas.length - 1 === index ? "Done" : "next"
                      }
                      key={data.name}
                      label={data.name}
                      // autoFocus={data.autofocus}
                      tintColor={colors.secondary}
                      lineWidth={1}
                      suffix={
                        <TouchableOpacity
                          onPress={() => textVisible(data.name)}
                        >
                          <IonIcon
                            name={
                              data.name === "Current Password"
                                ? eyeiconCurrPassword
                                : data.name === "New Password"
                                ? eyeiconNPassword
                                : eyeiconCPassword
                            }
                            style={{
                              fontSize: fontSize.Beep_login_logo,
                              color: colors.secondary,
                            }}
                          />
                        </TouchableOpacity>
                      }
                    />
                    {errors.currentPassword &&
                      touched.currentPassword &&
                      data.name === "Current Password" && (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                          <Text style={styles.errMsg}>
                            {errors.currentPassword}
                          </Text>
                        </Animatable.View>
                      )}
                    {errors.newPassword &&
                      touched.newPassword &&
                      data.name === "New Password" && (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                          <Text style={styles.errMsg}>
                            {errors.newPassword}
                          </Text>
                        </Animatable.View>
                      )}
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      data.name === "Confirm Password" && (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                          <Text style={styles.errMsg}>
                            {errors.confirmPassword}
                          </Text>
                        </Animatable.View>
                      )}
                  </View>
                ))}
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ marginTop: 15, marginHorizontal: 15 }}>
              <CustomFooterButtonWithoutBorderRadius
                onPress={handleSubmit}
                title={"SUBMIT"}
                isValid={isValid}
                dirty={dirty}
              />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

const ModefiedChangePassword = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={ChangePassword}
    headerTitle={"Change Password"}
    // headerLeftIconType={"menu"}
    headerprops={props}
    {...props}
    />
  )
  }
export default ModefiedChangePassword;
