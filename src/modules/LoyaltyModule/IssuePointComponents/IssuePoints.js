import React, {
  Component,
  useCallback,
  useState,
  createRef,
  useEffect,
} from "react";
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
  FlatList,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
  ToastAndroid,
} from "react-native";
import colors from "../../../../config/color";
import {
  CommonDataApi,
  GetPointsApi,
  IssuePointApi,
  MerchantIssuePoints,
} from "../../../services/LoyaltyApi";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import QrScanner from "../../../../config/projectDependency/QrScanner";
import { styles } from "../LoyaltyStyles/IssuePoints";
import { CustomFooterButtonWithoutBorderRadius } from "../../../../config/customComponents/custom_Footer_Button";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { StyledDollerIconTopHeaderText } from "../../../../config/customStylesComponents/customDollerIcon";
import { StyledHeaderTextFieldView } from "../../../../config/customStylesComponents/customLoyaltyComponents";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import custom_Alert from "../../../../config/customComponents/custom_Alert";
import custom_Toast from "../../../../config/customComponents/custom_Toast";

const IssuePoints = (props) => {
  const [number, setNumber] = useState("");
  // const [merchant_portals_id, setMerchantPortalId] = useState()
  // const [merchant_portals_external_id, setMerchantPortalExternalId] = useState()
  const [issuePoint, setIssuePoint] = useState([]);
  const [avaliablePoints, setAvaliablePoints] = useState();
  const [enableqr, setEnableQr] = useState(false);
  const [points, setPoints] = useState();
  // const [qrValue, setQrValue] = useState(null)
  let data = {
    name: `Merchant ID`,
    show_xspoint: `Available Points`,
    program: `Program`,
    show_amount: `1 XS point`,
  };
  const amount = createRef(null);

  useFocusEffect(
    useCallback(() => {
      let merchant_portals_id;
      let merchant_portals_external_id;
      props.loginData.data.merchant_portals.map((obj, index) => {
        console.log(obj.id);
        if (obj.id == 6) {
          // setMerchantPortalId(obj.id)
          // setMerchantPortalExternalId(obj.external_id)
          merchant_portals_id = obj.id;
          merchant_portals_external_id = obj.external_id;
        }
      });
      console.log(merchant_portals_id);
      console.log(merchant_portals_external_id);
      if (merchant_portals_id && merchant_portals_external_id) {
        IssuePointApi(
          merchant_portals_id,
          props.loginData.data.merchant.id,
          merchant_portals_external_id
        ).then((res) => {
          if (res.status === 200 && res.data.success) {
            let issue = [...issuePoint];
            for (const issuepoints in res.data.data.result.results) {
              if (issuepoints == "name" || issuepoints == "xs_points") {
                if (issuepoints == "xs_points") {
                  setAvaliablePoints(res.data.data.result.results[issuepoints]);
                }
                console.log("k", data[issuepoints]);
                issue.push({
                  key: data[issuepoints],
                  value: res.data.data.result.results[issuepoints],
                });
              }
            }
            CommonDataApi(
              merchant_portals_id,
              props.loginData.data.merchant.id,
              merchant_portals_external_id
            ).then((res) => {
              console.log(res.data.data);
              for (const commondata in res.data.data) {
                if (commondata == "program" || commondata == "show_amount") {
                  console.log("k", commondata);
                  issue.push({
                    key: data[commondata],
                    value:
                      commondata == "show_amount"
                        ? `$ ${res.data.data[commondata]}`
                        : res.data.data[commondata],
                  });
                }
              }
              setIssuePoint(issue);
            });
          } else {
            console.log('wnfieldss', res.data);
            custom_Alert({
              status: "Failed !",
              description: res.data.err_msg,
            });
          }
        });
      }
      return () => {
        setAvaliablePoints("");
        setIssuePoint([]);
      };
    }, [])
  );
  // const sendIssuePoints = () => {
  //   console.log(number.length);
  //   if (number.length > 0) {
  //     let merchant_portals_id;
  //     let merchant_portals_external_id;
  //     props.loginData.data.merchant_portals.map((obj, index) => {
  //       console.log(obj.id);
  //       if (obj.id == 6) {
  //         // setMerchantPortalId(obj.id)
  //         // setMerchantPortalExternalId(obj.external_id)
  //         merchant_portals_id = obj.id;
  //         merchant_portals_external_id = obj.external_id;
  //       }
  //     });
  //     GetPointsApi(
  //       merchant_portals_id,
  //       props.loginData.data.merchant.id,
  //       merchant_portals_external_id,
  //       number
  //     ).then((res) => {
  //       console.log(res.data);
  //       if (!res.data.success) {
  //         toastmsg(res.data.err_msg)
  //         // ToastAndroid.show(res.data.err_msg, ToastAndroid.LONG);
  //       } else {
  //         setPoints(res.data.data.point);
  //         console.log("hell", res.data.data.point);
  //         console.log("world", avaliablePoints);
  //         console.log(+res.data.data.point <= avaliablePoints);
  //         if (+res.data.data.point <= avaliablePoints) {
  //           console.log("hello");
  //           setEnableQr(true);
  //           if (qrValue !== null) {
  //             MerchantIssuePoints(
  //               merchant_portals_id,
  //               props.loginData.data.merchant.id,
  //               merchant_portals_external_id,
  //               qrValue,
  //               "",
  //               res.data.data.point,
  //               number
  //             ).then((res) => {
  //               if (res.data.success) {
  //                 toastmsg(res.data.succ_msg)
  //                 // ToastAndroid.show(res.data.succ_msg, ToastAndroid.LONG);
  //               } else {
  //                 toastmsg(res.data.err_msg)
  //                 // ToastAndroid.show(res.data.err_msg, ToastAndroid.LONG);
  //               }
  //             });
  //           }
  //         } else {
  //           toastmsg("Your xs point amount is too low")
  //           // ToastAndroid.show(
  //           //   "Your xs point amount is too low",
  //           //   ToastAndroid.LONG
  //           // );
  //         }
  //       }
  //     });
  //   } else {
  //     toastmsg("Please enter the amount")
  //     // ToastAndroid.show("Please enter the amount", ToastAndroid.LONG);
  //   }
  // };
  const sendScanedData = (...params) => {
    const [orscannedData] = params;
    setEnableQr(false);
    custom_Alert({
      status: "Confirm to issue points?",
      description: `You are issuing ${number * 10}XS points to user`,
      onPress: () => {
        if (points) {
          let merchant_portals_id;
          let merchant_portals_external_id;
          props.loginData.data.merchant_portals.map((obj, index) => {
            console.log(obj.id);
            if (obj.id == 6) {
              // setMerchantPortalId(obj.id)
              // setMerchantPortalExternalId(obj.external_id)
              merchant_portals_id = obj.id;
              merchant_portals_external_id = obj.external_id;
            }
          });
          MerchantIssuePoints(
            merchant_portals_id,
            props.loginData.data.merchant.id,
            merchant_portals_external_id,
            orscannedData,
            "",
            points,
            number
          ).then((res) => {
            console.log("merchantissue", res.data.data);
            if (res.data.success) {
              props.navigation.navigate(
                "IssueSuccessfulandCancel",
                res.data.data
              );
            } else {
              // props.navigation.navigate('IssueSuccessfulandCancel')
              toastmsg(res.data.err_msg);
              // ToastAndroid.show(res.data.err_msg, ToastAndroid.SHORT);
            }
          });
        }
      },
    });
  };
  const initialValues = {
    issuePoints: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    setNumber(values.issuePoints);
    let merchant_portals_id;
    let merchant_portals_external_id;
    props.loginData.data.merchant_portals.map((obj, index) => {
      console.log(obj.id);
      if (obj.id == 6) {
        // setMerchantPortalId(obj.id)
        // setMerchantPortalExternalId(obj.external_id)
        merchant_portals_id = obj.id;
        merchant_portals_external_id = obj.external_id;
      }
    });
    GetPointsApi(
      merchant_portals_id,
      props.loginData.data.merchant.id,
      merchant_portals_external_id,
      values.issuePoints
    ).then((res) => {
      if (!res.data.success) {
        toastmsg(res.data.err_msg);
        // ToastAndroid.show(res.data.err_msg, ToastAndroid.LONG);
      } else {
        setPoints(res.data.data.point);
        if (+res.data.data.point <= avaliablePoints) {
          setEnableQr(true);
          if (qrValue !== null) {
            MerchantIssuePoints(
              merchant_portals_id,
              props.loginData.data.merchant.id,
              merchant_portals_external_id,
              qrValue,
              "",
              res.data.data.point,
              values.issuePoints
            ).then((res) => {
              if (res.data.success) {
                toastmsg(res.data.succ_msg);
                // ToastAndroid.show(res.data.succ_msg, ToastAndroid.LONG);
              } else {
                toastmsg(res.data.err_msg);
                // ToastAndroid.show(res.data.err_msg, ToastAndroid.LONG);
              }
            });
          }
        } else {
          toastmsg("Your xs point amount is too low");
          // ToastAndroid.show(
          //   "Your xs point amount is too low",
          //   ToastAndroid.LONG
          // );
        }
      }
    });
  };
  console.log("issue point dataa", issuePoint);
  const validationYup = Yup.object().shape({
    issuePoints: Yup.string().required("Please enter the amount"),
  });
  const toastmsg = (msg) => {
    custom_Toast({ message: msg });
  };
  return (
    <>
      {!enableqr ? (
        <ScrollView
          style={{ backgroundColor: colors.primary }}
          keyboardShouldPersistTaps={"handled"}
        >
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
                setFieldValue,
              } = formik;
              // console.log("values", values);
              return (
                <View>
                  <StyledHeaderTextFieldView>
                    <StyledDollerIconTopHeaderText>
                      $
                    </StyledDollerIconTopHeaderText>
                    <TextInput
                      ref={amount}
                      placeholder="0.00"
                      keyboardType="numeric"
                      // autoFocus={true}
                      //   onChangeText={setNumber}
                      onBlur={handleBlur("issuePoints")}
                      onChangeText={handleChange("issuePoints")}
                      style={styles.input}
                      placeholderTextColor={colors.primary}
                      onSubmitEditing={handleSubmit}
                    ></TextInput>
                    {
                      errors.issuePoints &&
                        touched.issuePoints &&
                        toastmsg(errors.issuePoints)
                      // ToastAndroid.show(errors.issuePoints, ToastAndroid.SHORT)
                    }
                  </StyledHeaderTextFieldView>
                  <View style={styles.container}>
                    <View style={styles.detials}>
                      {issuePoint.map((item, index) => (
                        <View style={styles.listItem} key={item.key}>
                          <Text style={styles.listItemKey}>{item.key}</Text>
                          <Text style={{ color: colors.black, flex: 0.6 }}>
                            {item.value}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={{ margin: 20 }}>
                    <CustomFooterButtonWithoutBorderRadius
                      onPress={handleSubmit}
                      title={"ISSUE POINTS"}
                      isValid={isValid}
                      dirty={dirty}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
          <TextInput />
        </ScrollView>
      ) : (
        <QrScanner sendScanedData={sendScanedData} />
      )}
    </>
  );
};
// export default IssuePoints;
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};

const ModefiedIssuePoints = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={IssuePoints}
      headerTitle={"Issue Points"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedIssuePoints);
{
  /* <IssuedSuccessfullandCancel /> */
}
