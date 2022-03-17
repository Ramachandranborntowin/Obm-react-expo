import React from "react";
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  Switch,
  ToastAndroid,
} from "react-native";
import colors from "../../../../config/color";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import CustomHeadingSmall from "../../../../config/customComponents/custom_Heading_Small";
import CustomSwitchButton from "../../../../config/customComponents/cutom_Switch_Button";
import fontSize from "../../../../config/fontSize";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import SmallIcon from "../SettingsComponent/smallicon";
import SubHeading from "../SettingsComponent/SubHeading";
import { RadioButton } from "react-native-paper";
import { StyledLoyaltyTextArea } from "../../../../config/customStylesComponents/customLoyaltyComponents";
import CustomFooterButton from "../../../../config/customComponents/custom_Footer_Button";
import { CustomVerticalRadioButton } from "../../../../config/customComponents/custom_Radiobutton";
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    margin: 10,
    height: "50%",
  },
  heading: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  container_for_number: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  touchIdContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
const imageBase = `../../../../assets/image/`;
const Marketplace = (props) => {
  const [checked, setChecked] = React.useState("first");
  const initialValues = {
    offerTitle: "",
    discountType: "0",
    offerDescription: "",
    offerFor: "All Branches",
    // selectBranch: false,
    startOn: "",
    expireOn: "",
    couponType: "0",
    noOfCoupon: "",
    couponCode: "",
    offerTermsAgrement: "",
    offerImage: {},
  };
  const validationYup = Yup.object().shape({
    offerTitle: Yup.string()
      .required("OfferTitle cannot be empty")
      .min(4, `OfferTitle must be at least 4 char`),
    discountType: Yup.string().required("Please select discountType"),
    offerFor: Yup.string().required("Please select offer"),
    startOn: Yup.date().required("please enter start date"),
    expireOn: Yup.date()
      .required("please enter end date")
      .min(Yup.ref("startOn"), "end date can't be before start date"),

    noOfCoupon: Yup.string().when("couponType", {
      is: "1",
      then: Yup.string().required("NO Of Coupon cannot be empty"),
    }),

    couponCode: Yup.string()
      .required("CouponCode cannot be empty")
      .min(6, `CouponCode must have 6 char`),
    offerImage: Yup.mixed()
      .test("file", "OfferImage cannot be empty", (value) => {
        if (value.uri) {
          return value;
        }
      })
      .test("fileSize", "File Size is too large", (value) => {
        return value.size <= 5000000;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        if (value.type == "image") {
          return value;
        }
      }),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log("values", values);
    console.log("onSubmitProps", onSubmitProps);
    let merchant_portals_id;
    let merchant_portals_external_id;
    props.loginData.data.merchant_portals.map((obj, index) => {
      if (obj.id == 6) {
        merchant_portals_id = obj.id;
        merchant_portals_external_id = obj.external_id;
      }
    });

    let data = new FormData();
    data.append("portal_id", merchant_portals_id);
    data.append("external_id", merchant_portals_external_id);
    data.append("merchant_id", props.loginData.data.merchant.id);
    data.append("status", 1);
    data.append("branch_names", values.offerFor);
    data.append("offer_title", values.offerTitle);
    data.append("offer_type", values.discountType);
    data.append(
      "start_on",
      `${new Date(values.startOn).getDate()}/${
        new Date(values.startOn).getMonth() + 1
      }/${new Date(values.startOn).getFullYear()}`
    );
    data.append(
      "end_on",
      `${new Date(values.expireOn).getDate()}/${
        new Date(values.expireOn).getMonth() + 1
      }/${new Date(values.expireOn).getFullYear()}`
    );
    data.append("offer_for", values.offerDescription);
    data.append("offer_terms", values.offerTermsAgrement);
    data.append("limit_type", values.couponType);
    data.append("coupon_count", values.noOfCoupon);
    data.append("coupon_code", values.couponCode);
    data.append("offer_val", "");
    data.append("profimg", { ...values.offerImage, type: "image/jpeg" });

    AddOfferApi(data).then((res) => {
      if (res.data.error) {
        toastmsg(res.data.err_msg);
        // ToastAndroid.show(res.data.err_msg, ToastAndroid.LONG);
      } else {
        toastmsg(res.data.succ_msg);
        // ToastAndroid.show(res.data.succ_msg, ToastAndroid.LONG);
        props.navigation.navigate("ManageOffers");
      }
    });
  };
  const listOfMarketplace = [
    {
      name: "Pasarpbg",
      icon: require(`${imageBase}pasar.png`),
    },
    {
      name: "Visa/Mastercard",
      icon: require(`${imageBase}visamastercard.png`),
    },
    {
      name: "Rimba Point",
      icon: require(`${imageBase}rimba-point.png`),
    },
    {
      name: "Receive Notification",
      icon: require(`${imageBase}rimba-point.png`),
    },
  ];
  const listOfNotification = [
    {
      name: "Whatsapp",
      icon: require(`${imageBase}Whatsapplogo.png`),
    },
    {
      name: "E-mail",
      icon: require(`${imageBase}mail-box.png`),
    },
  ];
  const deliverymode = [
    { label: "Pickup", value: "0" },
    { label: "Door Delivery", value: "1" },
    { label: "pickup & Door Delivery", value: "2" },
  ];
  return (
    <>
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
          return (
            <>
              <View style={{ flex: 1, backgroundColor: colors.primary }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={{ padding: 30 }}>
                    <SubHeading title={"MarketPlace Settings"} />
                    {listOfMarketplace.map((obj, index) => (
                      <View
                        style={[
                          styles.touchIdContainer,
                          {
                            marginLeft: 0,
                            marginRight: 0,
                            flexDirection: "row",
                          },
                          index !== 0 && index % 2 === 0 && { marginTop: 30 },
                        ]}
                      >
                        <SmallIcon icon={obj.icon} />
                        <Text
                          style={{ color: colors.black, alignSelf: "center" }}
                        >
                          {obj.name}
                        </Text>
                        <CustomSwitchButton />
                      </View>
                    ))}

                    <SubHeading
                      title={"Notification Settings"}
                      style={{ marginTop: 30 }}
                    />

                    {listOfNotification.map((obj, index) => (
                      <View
                        style={[
                          styles.touchIdContainer,
                          { marginLeft: 0, marginRight: 0 },
                          index !== 0 && index % 2 === 0 && { marginTop: 30 },
                        ]}
                      >
                        <SmallIcon icon={obj.icon} />
                        <Text
                          style={{ color: colors.black, alignSelf: "center" }}
                        >
                          {obj.name}
                        </Text>
                        <CustomSwitchButton />
                      </View>
                    ))}
                    <SubHeading
                      title={"Delivery Mode"}
                      style={{ marginTop: 30 }}
                    />
                    <View style={{ marginTop: 10 }}>
                      <CustomVerticalRadioButton
                        datas={deliverymode}
                        value={"0"}
                        fontSize={fontSize.Beep_Text_Small}
                        marginVertival={10}
                      />
                    </View>
                    <SubHeading
                      title={"Pickup Address"}
                      style={{ marginTop: 30 }}
                    />
                    <StyledLoyaltyTextArea style={{marginTop: 20}}/>
                    <CustomFooterButton title={"SUBMIT"} />
                  </View>
                </ScrollView>
              </View>
            </>
          );
        }}
      </Formik>
    </>
  );
};
const ModefiedMarketplacePage = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={Marketplace}
      headerTitle={"Settings"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default ModefiedMarketplacePage;
