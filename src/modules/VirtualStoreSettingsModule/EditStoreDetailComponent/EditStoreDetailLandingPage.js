import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
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
  SectionList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../../config/color";
import Custom_virtual_store_dropdown from "../../../../config/customComponents/custom_virtual_store_dropdown";
import { CustomFooterButtonWithoutBorderRadius } from "../../../../config/customComponents/custom_Footer_Button";
import IonIcon from "react-native-vector-icons/Ionicons";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
import fontSize from "../../../../config/fontSize";
import { Checkbox } from "react-native-paper";
import CustomTime from "../../../../config/customComponents/custom_Time";
import { styles } from "../VirtualStoreSettingsStyles/EditStoreDetailStyles";
import { StyledProfileLogoSecondary } from "../../../../config/customStylesComponents/customProfileLogo";
import CustomTextField from "../../../../config/customComponents/custom_TextField";
import { StyledTextInput } from "../../../../config/customStylesComponents/customForgetPasswordStyleComponent";
import { StyledCameraIconRound } from "../../../../config/customStylesComponents/customCameaIconRound";
import CustomEditIcon from "../../../../config/customIcon/customEditIcon";
import {
  StyledEditStoreDetailsIcon,
  StyledEditStoreDateTimeContainer,
} from "../../../../config/customStylesComponents/customVirtualStoreSettings";
import CustomLocationIcon from "../../../../config/customIcon/customLocationIcon";
import CustomTimeIcon from "../../../../config/customIcon/customTimeIcon";
import { CustomCheckboxSecondary } from "../../../../config/customComponents/custom_Checkbox";
import custom_Alert from "../../../../config/customComponents/custom_Alert";
import { StyledLoyaltyTextArea } from "../../../../config/customStylesComponents/customLoyaltyComponents";
import Custom_virtual_store_textfield from "../../../../config/customComponents/custom_virtual_store_textfield";
import CustomModelPrimary, {
  CustomModelUpdate,
} from "../../../animation/CustomModelPrimary";
import { FontAwesome5 } from "@expo/vector-icons";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import CustomErrorComponent from "../../../../config/customComponents/custom_Error_message";
import custom_Toast from "../../../../config/customComponents/custom_Toast";
import {updateStoreApi} from "../../../services/VirtualStoreSettingsApi"
import useMerchantidExternalid from "../../../../config/customHooks/useMerchantidExternalid";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import { getStoreDetails } from "../../../services/VirtualStoreSettingsApi";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);


const EditStoreDetailLandingPage = (props) => {
  const [storeDetails, setStoreDetails] = useState({})
  const [afterUpdate, setAfterUpdate] = useState(0)
  const {
    merchant_portals_id,
    merchant_portals_external_id,
    merchant_portals_merchant_id,
  } = useMerchantidExternalid(3, props.loginData);
  useFocusEffect(
    useCallback(() => {
      getStoreDetails(
        merchant_portals_merchant_id,
        merchant_portals_id,
        merchant_portals_external_id
      ).then((res) => {
        if (res.data.success) {
          setStoreDetails(res.data);
          console.log(res.data);
        }
      });
    }, [afterUpdate])
  )
  const [imageValueasGlobal, setImagevalueasGlobal] = useState({});
  console.log("edit store detail", props);
  const iconArray = [
    {
      name: "facebook",
    },
    {
      name: "instagram",
    },
    {
      name: "tiktok",
    },
  ];
  const descriptionRef = useRef(null);
  const [enablePhotoModel, setEnablePhotoModel] = useState(false);
  // let storeDetails = {}
  // let setAfterStoreUpdated = props.route.params.setAfterStoreUpdated;
  const keys = storeDetails.data && Object.keys(storeDetails?.data.admindet);
  console.log('keys',keys)
  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let pickupHours = weekdays.map((obj) => {
    let type = keys && keys.find((val) => {
      return val == `${obj}_type`;
    });
    let am = keys && keys.find((val) => {
      return val == `${obj}_am`;
    });
    let pm = keys && keys.find((val) => {
      return val == `${obj}_pm`;
    });
    return {
      type: { type, value: storeDetails.data && storeDetails?.data.admindet[type] },
      am: { am, value: storeDetails.data && storeDetails?.data.admindet[am] != null ? storeDetails?.data.admindet[am] : "10:00 Am" },
      pm: { pm, value: storeDetails.data && storeDetails?.data.admindet[pm] != null ? storeDetails?.data.admindet[pm] : "6:00 Pm"},
    };
  });
  
  console.log(pickupHours);
  const baseImageUrl = "../../../../assets/image/";
  const baseIconUrl = "../../../../assets/icons/";
  const [showEdit, setShowEdit] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [editmodel, setEditModel] = useState(false);
  const [am_or_pm, setAmOrPm] = useState("");
  const [indexofTime, setIndexOfTime] = useState();
  const editable = () => {
    let editCanceltxt;
    if (showEdit) {
      editCanceltxt = "Cancel";
    } else {
      editCanceltxt = "Edit";
    }
    custom_Alert({
      status: "Edit Store Details",
      description: `Are sure you want to ${editCanceltxt} Store Details?`,
      onPress: () => {
        setShowEdit(!showEdit);
      },
    });
  };
  const setImages = (image, imageModelVisible) => {
    console.log(image);
    setEnablePhotoModel(imageModelVisible);
  };
  console.log('initialvalues', storeDetails.data)
  const initialValues = {
    image: {},
    description: storeDetails.data && storeDetails?.data.admindet.description,
    delevery: "pickuponly",
    address: storeDetails.data && storeDetails?.data.admindet.alter_address,
    number:
    storeDetails.data && storeDetails?.data.admindet?.mobile_1 ||
    storeDetails.data && storeDetails?.data.admindet?.mobile_2,
    pickupHours: pickupHours || [],
    facebook: storeDetails.data && storeDetails?.data.admindet?.fb_link,
    instagram: storeDetails.data && storeDetails?.data.admindet?.insta_link,
    tiktok: storeDetails.data && storeDetails?.data.admindet?.tiktok_link,
  };
  console.log('initialvalues', initialValues)
  const onSubmit = (values) => {
    console.log("hello", values, pickupHours[0]);
    const fieldData = [
      {
        key: "portal_id",
        val: merchant_portals_id
      },
      {
        key: "external_id",
        val: merchant_portals_external_id
      },
      {
        key: "merchant_id",
        val: merchant_portals_merchant_id
      },
      {
        key: "storeval",
        val: storeDetails?.data?.admindet.store_off,
      },
      {
        key: "sundaychkbox",
        val: values.pickupHours[0]?.type.value,
      },
      {
        key: "mondaychkbox",
        val: values.pickupHours[1]?.type.value,
      },
      {
        key: "tuesdaychkbox",
        val: values.pickupHours[2]?.type.value,
      },
      {
        key: "wednesdaychkbox",
        val: values.pickupHours[3]?.type.value,
      },
      {
        key: "thursdaychkbox",
        val: values.pickupHours[4]?.type.value,
      },
      {
        key: "fridaychkbox",
        val: values.pickupHours[5]?.type.value,
      },
      {
        key: "saturdaychkbox",
        val: values.pickupHours[6]?.type.value,
      },
      {
        key: "sundayam",
        val: values.pickupHours[0]?.am.value,
      },
      {
        key: "sundaypm",
        val: values.pickupHours[0]?.pm.value,
      },
      {
        key: "mondayam",
        val: values.pickupHours[1]?.am.value,
      },
      {
        key: "mondaypm",
        val: values.pickupHours[1]?.pm.value,
      },
      {
        key: "tuesdayam",
        val: values.pickupHours[2]?.am.value,
      },
      {
        key: "tuesdaypm",
        val: values.pickupHours[2]?.pm.value,
      },
      {
        key: "wednesdayam",
        val: values.pickupHours[3]?.am.value,
      },
      {
        key: "wednesdaypm",
        val: values.pickupHours[3]?.pm.value,
      },
      {
        key: "thursdayam",
        val: values.pickupHours[4]?.am.value,
      },
      {
        key: "thursdaypm",
        val: values.pickupHours[4]?.pm.value,
      },
      {
        key: "fridayam",
        val: values.pickupHours[5]?.am.value,
      },
      {
        key: "fridaypm",
        val: values.pickupHours[5]?.pm.value,
      },
      {
        key: "saturdayam",
        val: values.pickupHours[6]?.am.value,
      },
      {
        key: "saturdaypm",
        val: values.pickupHours[6]?.pm.value,
      },
      {
        key: "cphone",
        val: values.number,
      },
      {
        key: "caddr",
        val: values.address,
      },
      {
        key: "cdesc",
        val: values.description,
      },
      {
        key: "delmod",
        val: values.delevery,
      },
      {
        key: "idProfile",
        val: values.image,
      },
      {
        key: "facebook",
        val: values.facebook
      },
      {
        key: "instagram",
        val: values.instagram
      },
      {
        key: "tiktok",
        val: values.tiktok
      }
    ];
    let data = new FormData();
    fieldData.forEach((obj) => {
      obj.key === "idProfile" && setImagevalueasGlobal(obj.val);
      obj.key === "idProfile" && Object.keys(obj.val).length === 0
        ? null
        : data.append(obj.key, obj.val);
    });
    updateStoreApi(data).then((res) => {
      console.log("respo", res);
      if (res.data.success) {
        custom_Toast({ message: res.data.succ_msg });
        setAfterUpdate((previousupdate)=>previousupdate+1)
        setShowEdit(false)
        // setAfterStoreUpdated((previousdata)=>previousdata)
      } else {
        custom_Toast({ message: res.data.err_msg });
      }
    });
    console.log(data);
  };
  const validationSchema = Yup.object().shape({
    image:
      !Object.keys(imageValueasGlobal).length === 0
        ? Yup.mixed()
            .test("fileSize", "File Size is too large", (value) => {
              return value.size <= 5000000;
            })
            .test("fileType", "Unsupported File Format", (value) => {
              if (value.type == "image") {
                return value;
              }
            })
        : null,
    description: Yup.string().min(
      1,
      "Description should be minimum 5 character"
    ).max(120, "Description should be maximum 120 character"),
    address: Yup.string().min(1, "Address should be minimum 10 character").max(120, "Address should be maximum 10 character"),
    number: Yup.string()
      .min(6, "Phone number should be minimum 6 character")
      .max(8, "Phone number should be minimum 8 character"),
    facebook: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url for facebook!"
    ),
    instagram: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url for instagram!"
    ),
    tiktok: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url for tiktok!"
    ),
  });

  const confirmSave = (save, values) => {
    if((JSON.stringify(initialValues) === JSON.stringify(values))){
      custom_Toast({ message: "Nothing has been changed thats why we dont sent your data" });
    }else{
      save();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
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
          setValues,
        } = formik;
        console.log("values", values);
        return (
          <>
            {editmodel && (
              <CustomModelUpdate
                onPress={setEditModel}
                value={values.description}
                setFieldValue={setFieldValue}
                onChangeText={handleChange("description")}
                multiline={true}
                numberOfLines={4}
              />
            )}
            {enablePhotoModel && (
              <CustomModelPrimary
                isForm={true}
                setFieldValue={setFieldValue}
                fieldName={"image"}
                setEnablephotoModel={setEnablePhotoModel}
                imageName={`image.jpg`}
              />
            )}
            {openTime && (
              <CustomTime
                hideDate={(opentimeboolean, time) => {
                  setOpenTime(opentimeboolean);
                  let a = [...values.pickupHours];
                  time != null && (a[indexofTime][am_or_pm].value = time);
                  setFieldValue("pickupHours", a);
                }}
              />
            )}
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ zIndex: -1 }}
              keyboardShouldPersistTaps={'handled'}
            >
              <View style={[styles.contentBorder]}>
                <View
                  style={[
                    styles.content,
                    {
                      paddingBottom: 30,
                      flexDirection: "row",
                      paddingTop: 20,
                      paddingLeft: 7,
                      position: "relative",
                    },
                  ]}
                >
                  <StyledProfileLogoSecondary
                    source={
                      values?.image.uri ||
                      (storeDetails.data && storeDetails?.data.admindet.logo &&
                        storeDetails?.upload_url)
                        ? {
                            uri:
                              values.image.uri ||
                              `${storeDetails?.upload_url}${storeDetails?.data.admindet.logo}`,
                          }
                        : require("../../../../assets/icons/Avathar.png")
                    }
                  />
                  {errors.image && (
                              <CustomErrorComponent
                                errormessagename={errors.image}
                              />
                            )}
                  {showEdit && (
                    <StyledCameraIconRound
                      style={styles.camera_icon}
                      onPress={() => setEnablePhotoModel(true)}
                    >
                      <IonIcon
                        name={"camera"}
                        style={{ color: colors.black }}
                      />
                    </StyledCameraIconRound>
                  )}
                  <View style={styles.logoContent}>
                    <Text style={styles.logoContentHeading}>
                      {storeDetails.data && storeDetails?.data.admindet.admin_name}
                    </Text>
                    <Text>{values.description && values.description}</Text>
                    {showEdit && (<>
                      <TouchableOpacity
                        style={{ marginLeft: "auto", paddingRight: 20 }}
                        onPress={() => setEditModel(true)}
                      >
                        <CustomEditIcon />
                      </TouchableOpacity>
                      {errors.description && (
                              <CustomErrorComponent
                                errormessagename={errors.description}
                              />
                            )}
                      </>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    styles.content,
                    {
                      marginTop: -20,
                      borderColor: colors.grey,
                      borderTopLeftRadius: 25,
                      borderTopRightRadius: 25,
                      padding: 10,
                      paddingLeft: 5,
                    },
                  ]}
                >
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <IonIcon name={"home"} style={styles.homeicon} />
                    <Text style={styles.text_StoreTime}>Store Detail</Text>
                  </View>
                  <TouchableOpacity onPress={editable}>
                    <Text
                      style={[
                        styles.text_edit,
                        { paddingVertical: 15 },
                        showEdit && { color: colors.danger },
                      ]}
                    >
                      {showEdit ? "CANCEL" : "EDIT"}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.list_heading}>Mode Of delivery</Text>
                  <View style={[styles.list_container]}>
                    <MaterialCommunityIcons
                      name="truck-fast-outline"
                      size={35}
                      color={colors.dark_grey}
                    />
                    {showEdit ? (
                      <View style={{ flexGrow: 1, paddingLeft: 10 }}>
                        <Custom_virtual_store_dropdown
                          fieldname={"delivery"}
                          setFieldValue={setFieldValue}
                          dropdownData={[
                            {
                              Beeppluslabel: "pickup only",
                              Beepplusvalue: "pickuponly",
                            },
                          ]}
                        />
                      </View>
                    ) : (
                      <Text style={styles.list_name}>Pickup Only</Text>
                    )}
                  </View>
                  <View style={{marginLeft: 35}}>
                  {errors.delevery && (
                              <CustomErrorComponent
                                errormessagename={errors.delevery}
                              />
                            )}
                            </View>
                  <View style={styles.list_container}>
                    <CustomLocationIcon color={colors.danger} />
                    {showEdit ? (
                      <View
                        style={{ marginLeft: 20, flexGrow: 1, marginRight: 25 }}
                      >
                        <StyledLoyaltyTextArea
                          multiline={true}
                          numberOfLines={4}
                          value={values.address}
                          onChangeText={handleChange("address")}
                        />
                      </View>
                    ) : (
                      <Text
                        style={[
                          styles.list_name,
                          { paddingLeft: 20, flexGrow: 1 },
                        ]}
                      >
                        {storeDetails.data && storeDetails?.data.admindet.alter_address}
                      </Text>
                    )}
                  </View>
                  <View style={{marginLeft: 35}}>
                  {errors.address && (
                              <CustomErrorComponent
                                errormessagename={errors.address}
                              />
                            )}
                            </View>
                  <View style={[styles.list_container]}>
                    <StyledEditStoreDetailsIcon
                      source={require(`${baseImageUrl}Whatsapplogo.png`)}
                    />
                    {showEdit ? (
                      <View
                        style={{
                          marginLeft: 10,
                          flexGrow: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Custom_virtual_store_textfield
                          value={values.number}
                          keyboardType={"numeric"}
                          maxLength={8}
                          onChangeText={handleChange("number")}
                        />
                      </View>
                    ) : (
                      <Text
                        style={[
                          styles.list_name,
                          {
                            color: colors.secondary,
                            fontWeight: "bold",
                            flexGrow: 1,
                          },
                        ]}
                      >
                        {storeDetails.data && storeDetails?.data.admindet?.mobile_1 ||
                          storeDetails.data && storeDetails?.data.admindet?.mobile_2}
                      </Text>
                    )}
                  </View>
                  <View style={{marginLeft: 35}}>
                  {errors.number && (
                              <CustomErrorComponent
                                errormessagename={errors.number}
                              />
                            )}
                            </View>
                  <View>
                    <View
                      style={[styles.list_container, { alignItems: "center" }]}
                    >
                      <CustomTimeIcon color={colors.grey} />
                      <Text style={[styles.list_heading, { marginLeft: 20 }]}>
                        Pickup Hours
                      </Text>
                    </View>

                    {values.pickupHours.length > 0 &&
                      values.pickupHours.map((obj, index) => (
                        <View>
                          {showEdit ? (
                            <View
                              style={[
                                styles.pickuphourList,
                                {
                                  marginLeft: 40,
                                  flexWrap: "wrap",
                                  marginRight: -20,
                                  justifyContent: "space-around",
                                },
                              ]}
                            >
                              <CustomCheckboxSecondary
                                status={
                                  +obj.type.value ? "checked" : "unchecked"
                                }
                                onPress={() => {
                                  let a = [...values.pickupHours];
                                  a[index].type.value = !parseInt(
                                    obj.type.value
                                  )
                                    ? 1
                                    : 0;
                                  console.log(!parseInt(obj.type.value), a);
                                  setFieldValue("pickupHours", a);
                                }}
                              />
                              <StyledEditStoreDateTimeContainer>
                                <Text style={{ fontWeight: "bold" }}>
                                  {obj.type.type && obj.type.type.substring(0, 3).toUpperCase()}
                                </Text>
                              </StyledEditStoreDateTimeContainer>
                               
                                <StyledEditStoreDateTimeContainer
                                onPress={() => {
                                  if(+obj.type.value){
                                    custom_Toast({message: "please uncheck the check box after selet the date"})
                                    return null;
                                  }
                                  setIndexOfTime(index);
                                  setAmOrPm("am");
                                  setOpenTime(true);
                                }}
                              >
                                <Text>{obj.am.value}</Text>
                              </StyledEditStoreDateTimeContainer>
                              <StyledEditStoreDateTimeContainer
                                onPress={() => {
                                  if(+obj.type.value){
                                    custom_Toast({message: "please uncheck the check box after selet the date"})
                                    return null;
                                  }
                                  setIndexOfTime(index);
                                  setAmOrPm("pm");
                                  setOpenTime(true);
                                }}
                              >
                                <Text>{obj.pm.value}</Text>
                              </StyledEditStoreDateTimeContainer>
                          
                            </View>
                          ) : (
                            <View style={styles.pickuphourList}>
                              <IonIcon name={"ellipse"} />
                              <Text
                                style={[
                                  styles.list_name,
                                  +obj.type.value && {
                                    textDecorationLine: "line-through",
                                    textDecorationStyle: "solid",
                                  },
                                ]}
                                numberOfLines={1}
                              >{`${obj.type.type && obj.type.type
                                .substring(0, 3)
                                .toUpperCase()} - ${obj.am.value} - ${
                                obj.pm.value
                              }`}</Text>
                            </View>
                          )}
                        </View>
                      ))}
                  </View>
                  {showEdit ? (
                    <>
                      {iconArray.map(({ name }) => (
                        <View style={styles.iconEditerContainer}>
                          <View style={styles.iconEditor}>
                            {name === "tiktok" ? (
                              <Image
                                source={require("../../../../assets/icons/tik-tok.png")}
                              />
                            ) : (
                              <FontAwesome5
                                name={name}
                                size={fontSize.Beep_login_logo}
                                color="black"
                              />
                            )}

                          </View>
                          <View style={styles.iconUrlTextField}>
                            <Custom_virtual_store_textfield
                              value={values[name]}
                              onChangeText={handleChange(name)}
                            />
                          </View>
                          {errors[name] && (
                              <CustomErrorComponent
                                errormessagename={errors[name]}
                              />
                            )}
                        </View>
                      ))}
                    </>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {iconArray.map(({ name }) => (
                        <View style={{ alignItems: "center" }}>
                          {name === "tiktok" ? (
                            <Image
                              source={require("../../../../assets/icons/tik-tok.png")}
                            />
                          ) : (
                            <FontAwesome5
                              name={name}
                              size={fontSize.Beep_login_logo}
                              color="black"
                            />
                          )}
                          <Text>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {showEdit && (
                    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                      <CustomFooterButtonWithoutBorderRadius
                        title="SUBMIT"
                        onPress={() => confirmSave(handleSubmit, values)}
                      />
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
const ModefiedEditStoreDetailLandingPage = (props) => {
  return (
    <CommonHigherOrderHeaderComponent
      pagename={EditStoreDetailLandingPage}
      headerTitle={"Store Details"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
    />
  );
};
export default connect(mapStateToProps, null)(ModefiedEditStoreDetailLandingPage);
