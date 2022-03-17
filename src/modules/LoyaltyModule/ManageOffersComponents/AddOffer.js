import React, {
  Component,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useWindowDimensions,
} from "react";
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import CustomDate from "../../../../config/customComponents/custom_Date_Picker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import fontSize from "../../../../config/fontSize";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import AllBranches from "./AllBranchesModel";
import { RadioButton } from "react-native-paper";
import colors from "../../../../config/color";
import CustomModelPrimary from "../../../animation/CustomModelPrimary";
import { AddOfferApi, MerchantBranchApi } from "../../../services/LoyaltyApi";
import { useFocusEffect } from "@react-navigation/core";
import CustomErrorComponent from "../../../../config/customComponents/custom_Error_message";
import {
  StyledTextButton,
  StyledTouchableOpacityButtonContainer,
} from "../../../../config/customStylesComponents/customCancelButton";
import {
  StyledLoyaltyTextArea,
  StyledLoyaltyTextField,
} from "../../../../config/customStylesComponents/customLoyaltyComponents";
import { styles } from "../LoyaltyStyles/Addoffer";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import custom_Alert from "../../../../config/customComponents/custom_Alert"
import custom_Toast from "../../../../config/customComponents/custom_Toast"
import { CustomHorzontalRadioButton } from "../../../../config/customComponents/custom_Radiobutton";
const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").Width);
const addUpdate = (prev, next)=>{
  console.log(prev, next)
}
const AddOffer = memo((props) => {
  console.log('component rerender')
  const [fieldName, setFieldName] = useState("");
  const [initialAllBranch, setInitialAllBranch] = useState(true);
  const [displayDate, setDisplayDate] = useState(false);
  const [enablePhotoModel, setEnablephotoModel] = useState(false);
  const [dateSelector, setDateSelector] = useState();
  const [enablebranchesModel, setEnableBranchesModel] = useState(false);
  const [branch, setBranch] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [displayViewValue, setDisplayViewValue] = useState(true)

  const offerTitleRef = useRef(null);
  const offerDescriptionRef = useRef(null);
  const noOfCouponRef = useRef(null);
  const couponCodeRef = useRef(null);
  const offersandTermsRef = useRef(null);
  let photo;
  useFocusEffect(
    useCallback(() => {
      let merchant_portals_id;
      let merchant_portals_external_id;
      props.loginData.data.merchant_portals.map((obj, index) => {
        if (obj.id == 6) {
          merchant_portals_id = obj.id;
          merchant_portals_external_id = obj.external_id;
        }
      });
      MerchantBranchApi(
        merchant_portals_id,
        props.loginData.data.merchant.id,
        merchant_portals_external_id
      ).then((res) => {
        let branch = [];
        res.data.data.result.map((obj) => {
          obj.value = false;
          branch.push(obj);
        });
        setBranch(branch);
      });
    }, [])
  );
  const radio_props_offer_type = [
    { label: "Percentage(%)", value: "0" },
    { label: "Amount($)", value: "1" },
    { label: "Buy x & get x", value: "2" },
  ];
  const radio_props_coupon_type = [
    { label: "Unlimited", value: "0" },
    { label: "Limited", value: "1" },
  ];
  const confirmSave = (save) => {
    custom_Alert({
      status: "Success",
      description: "Are sure you want to save offer?",
      onPress: ()=>save()
    });
  };

  const saveBranches = (props) => {
    console.log("initial props", props);
    if (props == "All Branches") {
      // branch
      // setOfferData({ ...offerData, selectBranch: "" });
      setSelectedBranches([]);
      setInitialAllBranch(true);
    } else {
      setInitialAllBranch(false);
      console.log("props", props);
      // let branches = props && props.map((data, index) => data.name).join(",");
      // setOfferData({ ...offerData, selectBranch: branches });
      setSelectedBranches(props);
    }
  };

  const AddOfferRadioButton = (props) => {
    // const { datas, value, onPress, name, errors, touched } = props;
    return (
      <View>
        <CustomHorzontalRadioButton {...props}/>
      </View>
    );
  };

  const DateComponent = (params) => {
    const {
      handleBlur,
      setDisplayDate,
      setDateSelector,
      setFieldName,
      dateSelector,
      fieldName,
      values,
      errors,
      touched
    } = params;
    return (
      <View>
        <Pressable
          onBlur={handleBlur(fieldName)}
          onPress={() => {
            setDisplayDate(true);
            setDateSelector(dateSelector);
            setFieldName(fieldName);
          }}
        >
          <View style={styles.clickable_text} pointerEvents="none">
            <StyledLoyaltyTextField
              placeholder="dd/mm/yyyy"
              placeholderTextColor={colors.black}
              value={values !== null ? values : "dd/mm/yyyy"}
              borderBottomWidth={0}
            />
            <FontAwesome5
              name="calendar"
              style={[
                styles.icon,
                { fontSize: fontSize.Beep_iconSize_2, marginLeft: "auto" },
              ]}
            />
          </View>
        </Pressable>
        {errors && touched && <CustomErrorComponent errormessagename={errors} />}
      </View>
    );
  };
const toastmsg = (msg)=>{
  custom_Toast({message: msg});
}
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
    data.append("start_on", `${new Date(values.startOn).getDate()}/${new Date(values.startOn).getMonth()+1}/${new Date(values.startOn).getFullYear()}`);
    data.append("end_on", `${new Date(values.expireOn).getDate()}/${new Date(values.expireOn).getMonth()+1}/${new Date(values.expireOn).getFullYear()}`);
    data.append("offer_for", values.offerDescription);
    data.append("offer_terms", values.offerTermsAgrement);
    data.append("limit_type", values.couponType);
    data.append("coupon_count", values.noOfCoupon);
    data.append("coupon_code", values.couponCode);
    data.append("offer_val", "");
    data.append("profimg", { ...values.offerImage, type: "image/jpeg" });

    AddOfferApi(data).then((res) => {
      if (res.data.error) {
        toastmsg(res.data.err_msg)
        // ToastAndroid.show(res.data.err_msg, ToastAndroid.LONG);
      } else {
        toastmsg(res.data.succ_msg)
        // ToastAndroid.show(res.data.succ_msg, ToastAndroid.LONG);
        props.navigation.navigate("ManageOffers");
      }
    });
  };

  const validationYup = Yup.object().shape({
    offerTitle: Yup.string()
      .required("Offer title cannot be empty")
      .min(4, `Offer title must be at least 4 char`),
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
      .required("Coupon code cannot be empty")
      .min(6, `Coupon code must have 6 char`),
    offerImage: Yup.mixed()
      .test("file", "Offer image cannot be empty", (value) => {
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
  console.log("enablebranchesModel", enablebranchesModel);
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
          // console.log("values", values);
          return (
            <>
              {enablebranchesModel && (
                <AllBranches
                  isModalVisible={enablebranchesModel}
                  onDismiss={() => {
                    setEnableBranchesModel(!enablebranchesModel);
                    // setInitialAllBranch(false)
                  }}
                  initialAllBranch={initialAllBranch}
                  type={"model"}
                  data={branch}
                  onPress={setFieldValue}
                  // setBranch={setBranch}
                  // allbranches={allBranches}
                  // setAllBranches={setAllBraches}
                  selectedBranch={selectedBranches}
                  // setSelectedBranches={setSelectedBranches}
                  saveData={saveBranches}
                />
              )}
              {displayDate ? (
                <CustomDate
                  removePreviousDate={true}
                  isForm={true}
                  setFieldValue={setFieldValue}
                  fieldName={fieldName}
                  setDisplayDate={setDisplayDate}
                  primaryDateDisplay = {true}
                />
              ) : null}
              {enablePhotoModel ? (
                <CustomModelPrimary
                  isForm={true}
                  setFieldValue={setFieldValue}
                  fieldName={"offerImage"}
                  setEnablephotoModel={setEnablephotoModel}
                  imageName={"OfferPhoto.jpg"}
                />
              ) : null}
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ zIndex: -1 }}
              >
                <View style={styles.container}>
                  <StyledLoyaltyTextField
                    ref={offerTitleRef}
                    returnKeyType={"next"}
                    onBlur={handleBlur("offerTitle")}
                    onChangeText={handleChange("offerTitle")}
                    onSubmitEditing={() => offerDescriptionRef.current.focus()}
                    placeholder="Offer Title*(Eg: 20% Discount for all beverages)"
                    borderBottomWidth={1.5}
                  />
                  {errors.offerTitle && touched.offerTitle && (
                    <CustomErrorComponent
                      errormessagename={errors.offerTitle}
                    />
                  )}

                  <AddOfferRadioButton
                    datas={radio_props_offer_type}
                    value={values.discountType}
                    onPress={setFieldValue}
                    name={"discountType"}
                    errors={errors.discountType}
                    touched={touched.discountType}
                  />

                  <View style={{ marginTop: 35 }}>
                    <StyledLoyaltyTextField
                      ref={offerDescriptionRef}
                      // value={values.couponType}
                      returnKeyType={"next"}
                      onSubmitEditing={() => {
                        if (values.couponType == 1) {
                          noOfCouponRef.current.focus();
                        } else {
                          couponCodeRef.current.focus();
                        }
                      }}
                      onChangeText={handleChange("offerDescription")}
                      placeholder="Offer Description"
                      onBlur={handleBlur("offerDescription")}
                      borderBottomWidth={1.5}
                    />
                  </View>

                  <Text style={styles.heading}>Offer For</Text>
                  {/* onPress={toggleModal} */}
                  <Pressable onPress={() => setEnableBranchesModel(true)}>
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          borderBottomWidth: 1,
                          borderColor: colors.Beepplus_border_color3,
                        },
                        // type == "dropdown"
                        //   ? { borderColor: colors.primary }
                        //   : { borderColor: colors.black },
                      ]}
                      pointerEvents="none"
                    >
                      <TextInput
                        style={[
                          {
                            fontSize: fontSize.Beep_subHeading,
                            color: colors.black,
                            borderBottomWidth: 1.5,
                            borderBottomColor: colors.Beepplus_border_color3,
                            margin: 0,
                            padding: 0,
                          },
                          { borderBottomWidth: 0, flex: 1 },
                          // type == "dropdown" && { paddingRight: 5 },
                        ]}
                        placeholder={
                          selectedBranches && selectedBranches.length > 0
                            ? selectedBranches.map((obj) => obj.name).join(",")
                            : "All Branches"
                        }
                        // placeholderTextColor={
                        //   type == "dropdown" ? colors.primary : colors.black
                        // }
                        placeholderTextColor={colors.black}
                      />
                      <IonIcon
                        name="caret-down-outline"
                        style={[
                          {
                            alignSelf: "center",
                            color: colors.Beepplus_icon_color,
                          },
                          // type == "dropdown"
                          //   ? { color: colors.primary }
                          //   : { color: colors.black },
                        ]}
                      />
                    </View>
                  </Pressable>

                  <Text style={styles.heading}>Start ON *</Text>

                  <DateComponent
                    handleBlur={handleBlur}
                    setDisplayDate={setDisplayDate}
                    setDateSelector={setDateSelector}
                    setFieldName={setFieldName}
                    dateSelector={"startDate"}
                    fieldName={"startOn"}
                    values={`${new Date(values.startOn).getDate() || `dd`}/${new Date(values.startOn).getMonth()+1 || `mm`}/${new Date(values.startOn).getFullYear() || `yyyy`}`}
                    // values={values.startOn}
                    errors={errors.startOn}
                    touched={touched.startOn}
                  />
                  <Text style={styles.heading}>Expire ON *</Text>

                  <DateComponent
                    handleBlur={handleBlur}
                    setDisplayDate={setDisplayDate}
                    setDateSelector={setDateSelector}
                    setFieldName={setFieldName}
                    dateSelector={"endDate"}
                    fieldName={"expireOn"}
                    // values={values.expireOn}
                    values={`${new Date(values.expireOn).getDate() || `dd`}/${new Date(values.expireOn).getMonth()+1 || `mm`}/${new Date(values.expireOn).getFullYear() || `yyyy`}`}
                    errors={errors.expireOn}
                    touched={touched.expireOn}
                  />
                  <Text
                    style={[
                      styles.heading,
                      { fontSize: fontSize.Beep_Text_Small },
                    ]}
                  >
                    Coupon Limit Type
                  </Text>

                  <AddOfferRadioButton
                    datas={radio_props_coupon_type}
                    value={values.couponType}
                    onPress={setFieldValue}
                    name={"couponType"}
                    errors={errors.couponType}
                    touched={touched.couponType}
                  />

                  {values.couponType == 1 && (
                    <View style={{ marginTop: 35 }}>
                      <StyledLoyaltyTextField
                        keyboardType="numeric"
                        ref={noOfCouponRef}
                        returnKeyType={"next"}
                        onSubmitEditing={() => couponCodeRef.current.focus()}
                        // onChangeText={(value) => {
                        //   setOfferData({ ...offerData, noOfCoupon: value });
                        //   validateNoOfCoupon(value);
                        // }}
                        onChangeText={handleChange("noOfCoupon")}
                        placeholder="No of coupon*"
                        onBlur={handleBlur("noOfCoupon")}
                        borderBottomWidth={1.5}
                      />
                    </View>
                  )}
                  {errors.noOfCoupon && touched.noOfCoupon && (
                    <CustomErrorComponent
                      errormessagename={errors.noOfCoupon}
                    />
                  )}
                  <View style={{ marginTop: 35 }}>
                    <StyledLoyaltyTextField
                      ref={couponCodeRef}
                      returnKeyType={"next"}
                      onSubmitEditing={() => offersandTermsRef.current.focus()}
                      onChangeText={handleChange("couponCode")}
                      placeholder="Coupon Code( 6 char only)*"
                      maxLength={6}
                      onBlur={handleBlur("couponCode")}
                      borderBottomWidth={1.5}
                    />
                  </View>
                  {errors.couponCode && touched.couponCode && (
                    <CustomErrorComponent
                      errormessagename={errors.couponCode}
                    />
                  )}
                  <Text
                    style={[
                      styles.heading,
                      { fontSize: fontSize.Beep_Text_Small },
                    ]}
                  >
                    Offer's Term's & Agreement
                  </Text>
                  <StyledLoyaltyTextArea
                    ref={offersandTermsRef}
                    // returnKeyType={"upload image and click submit button"}
                    onChangeText={handleChange("offerTermsAgrement")}
                    onBlur={handleBlur("offerTermsAgrement")}
                    multiline={true}
                    numberOfLines={4}
                  />
                  <View style={{ marginLeft: 15 }}>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                      <Text
                        style={[
                          styles.heading,
                          {
                            fontSize: fontSize.Beep_Text_Small,
                            marginTop: 0,
                            alignSelf: "center",
                          },
                        ]}
                      >
                        Offer Image*
                      </Text>
                      <View style={{ marginLeft: 25 }}>
                        <StyledTouchableOpacityButtonContainer
                          Color={colors.orange_combo}
                          onPress={() => setEnablephotoModel(true)}
                          Padding={22}
                        >
                          <StyledTextButton textSize={fontSize.Beep_Text_Small}>
                            UPLOAD
                          </StyledTextButton>
                        </StyledTouchableOpacityButtonContainer>
                      </View>
                    </View>
                    {errors.offerImage && (
                      <CustomErrorComponent
                        errormessagename={errors.offerImage}
                      />
                    )}

                    <Text style={[styles.heading, { marginTop: 5 }]}>
                      Recomended Image size less than 5MB and 600x350
                    </Text>
                    <Image
                      source={
                        values.offerImage.uri
                          ? { uri: values.offerImage.uri }
                          : require("../../../../assets/image/dummyimage.jpg")
                      }
                      style={styles.img}
                    ></Image>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 15,
                      marginBottom: 40,
                    }}
                  >
                    <StyledTouchableOpacityButtonContainer
                      Color={colors.secondary}
                      onPress={()=>confirmSave(handleSubmit)}
                      Padding={22}
                      // isValid={isValid}
                      // dirty={dirty}
                    >
                      <StyledTextButton textSize={fontSize.Beep_Text_Small}>
                        SAVE
                      </StyledTextButton>
                    </StyledTouchableOpacityButtonContainer>
                  </View>
                </View>
              </ScrollView>
            </>
          );
        }}
      </Formik>
      {/* </View> */}
    </>
  );
});
// export default AddOffer;
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedAddOffer = (props)=>{
  return(
    <CommonHigherOrderHeaderComponent
    pagename={AddOffer}
    headerTitle={"Add Offer"}
    // headerLeftIconType={"menu"}
    headerprops={props}
    {...props}
    />
  )
  }
export default connect(mapStateToProps, null)(ModefiedAddOffer);
