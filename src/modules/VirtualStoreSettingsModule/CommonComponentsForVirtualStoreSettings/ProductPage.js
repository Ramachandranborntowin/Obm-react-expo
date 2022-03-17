import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
  memo,
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
  KeyboardAvoidingView,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Formik, Field } from "formik";
import Toast from "react-native-root-toast";
import Custom_virtual_store_dropdown from "../../../../config/customComponents/custom_virtual_store_dropdown";
import Custom_virtual_store_textfield from "../../../../config/customComponents/custom_virtual_store_textfield";
import CustomFooterButton, {
  CustomFooterButtonWithoutBorderRadius,
} from "../../../../config/customComponents/custom_Footer_Button";
import colors from "../../../../config/color";
import {
  StyledEditStoreDetailListImage,
  StyledEditStoreDetailImageBlur,
  StyledEditStoreDetailsImageView,
} from "../../../../config/customStylesComponents/customVirtualStoreSettings";
import CustomErrorComponent from "../../../../config/customComponents/custom_Error_message";
import { CustomAddiconSecondary } from "../../../../config/customIcon/customAddIcon";
import { StyledLoyaltyTextArea } from "../../../../config/customStylesComponents/customLoyaltyComponents";
import CustomModelPrimary from "../../../animation/CustomModelPrimary";
import custom_Toast from "../../../../config/customComponents/custom_Toast";
const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 0,
    paddingTop: 10,
    backgroundColor: colors.primary,
  },
  heading: {
    color: colors.grey,
    paddingTop: 10,
  },
  attributes_container: {
    marginLeft: 40,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attributes_input: {
    borderRadius: 5,
    borderWidth: 1,
    flexGrow: 8,
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
const ProductForm = (props) => {
  console.log("product rammmm", props.routingName, props.dataList, props);
  const [enablePhotoModel, setEnablephotoModel] = useState(false);
  const [isImageEnabled, setIsImageEnabled] = useState(true);

  const confirmSave = (save, values) => {
    console.log(
      "before save",
      JSON.stringify(props.initialValues) === JSON.stringify(values) &&
        props.action == "Edit"
    );
    if (
      JSON.stringify(props.initialValues) === JSON.stringify(values) &&
      props.action == "Edit"
    ) {
      custom_Toast({
        message: "Nothing has been changed thats why we dont update your data",
      });
    } else {
      save();
    }
  };
  const toastmsg = (msg) => {
    console.log("message", msg);
    custom_Toast({ message: msg });
  };
  const onSubmitProductname = (values) => {
    // if(props.action == "Edit" && values[props.imageSet] == {}){
    //   delete values[props.imageSet]
    // }
    console.log("id action", props.id, props.action);
    props
      .onSubmit(
        values,
        props.portalId,
        props.externalId,
        props.merchantId,
        props.id || null,
        props.action || null
      )
      .then((res) => {
        console.log("respo", res);
        if (res.data.success) {
          custom_Toast({ message: res.data.succ_msg });
          props.navigation.goBack(null);
        } else {
          custom_Toast({ message: res.data.err_msg });
        }
      });
  };

  const ImageContainer = (params) => {
    return (
      <>
        <View
          style={{ flexDirection: "row", marginTop: 10, position: "relative" }}
        >
          <TouchableOpacity onPress={() => setEnablephotoModel(true)}>
            {(params.values != null &&
              params.values[props.imageSet] &&
              params.values[props.imageSet].uri) ||
            props?.image ? (
              <View>
                <StyledEditStoreDetailListImage
                  source={{
                    uri:
                      (params.values[props.imageSet] &&
                        params.values[props.imageSet].uri) ||
                      props?.image,
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  padding: 20,
                  backgroundColor: colors.Beepplus_ImageBackgroundContainer,
                  paddingVertical: 25,
                }}
              >
                <StyledEditStoreDetailImageBlur
                  source={require("../../../../assets/image/dummyimage.jpg")}
                />
                <View style={{ position: "absolute", left: 30, top: 30 }}>
                  <CustomAddiconSecondary />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <>
      <Formik
        initialValues={props.initialValues}
        onSubmit={onSubmitProductname}
        validationSchema={props.validationYup(isImageEnabled)}
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
          if (
            ((values.productImages &&
              Object.keys(values.productImages).length === 0) ||
              (values.categoreyImage &&
                Object.keys(values.categoreyImage).length === 0)) &&
            props.action == "Edit"
          ) {
            console.log("image enabled false");
            setIsImageEnabled(false);
          } else {
            setIsImageEnabled(true);
          }
          console.log("fieldArray", props.fieldArray);
          let formdatas =
            props.fieldArray.length > 0 &&
            props.fieldArray.map((obj) => {
              return {
                ...obj,
                errors: errors[obj.handleBlur],
                touched: touched[obj.handleBlur],
              };
            });
          console.log("values", values);
          return (
            <>
              {enablePhotoModel ? (
                <CustomModelPrimary
                  isForm={true}
                  setFieldValue={setFieldValue}
                  fieldName={props.imageSet}
                  setEnablephotoModel={setEnablephotoModel}
                  imageName={`${props.imageSet}.jpg`}
                />
              ) : null}
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={[{ zIndex: -1 }, styles.content]}
              >
                <KeyboardAvoidingView>
                  <>
                    {formdatas.length > 0 &&
                      formdatas.map((obj, index) => {
                        return (
                          <View key={index}>
                            <Text style={styles.heading}>{obj.name}</Text>
                            {obj.type == "dropdown" ? (
                              <Custom_virtual_store_dropdown
                                dropdownData={obj.dropdownData}
                                setFieldValue={setFieldValue}
                                fieldname={obj.handleBlur}
                                value={values[obj.handleBlur]}
                              />
                            ) : obj.type == "description" ? (
                              <StyledLoyaltyTextArea
                                multiline={true}
                                numberOfLines={4}
                                ref={obj.ref}
                                onBlur={handleBlur(obj.handleBlur)}
                                onChangeText={handleChange(obj.handleBlur)}
                                returnKeyType={obj.returnKeyType}
                                value={values[obj.handleBlur]}
                              />
                            ) : obj.type == "image" ? (
                              <>
                                <ImageContainer values={values} />
                              </>
                            ) : (
                              <>
                                <Custom_virtual_store_textfield
                                  ref={obj.ref}
                                  value={values[obj.handleBlur]}
                                  keyboardType={obj.keyboardType}
                                  returnKeyType={obj.returnKeyType}
                                  onSubmitEditing={() =>
                                    obj.onSubmitEditing.current.focus()
                                  }
                                  onChangeText={handleChange(obj.handleBlur)}
                                  // placeholder="Offer Description"
                                  onBlur={handleBlur(obj.handleBlur)}
                                />
                              </>
                            )}
                            {obj.errors &&
                              obj.touched &&
                              obj.type !== "image" && (
                                <CustomErrorComponent
                                  errormessagename={obj.errors}
                                />
                              )}
                            {obj.type == "image" && obj.errors && (
                              <CustomErrorComponent
                                errormessagename={obj.errors}
                              />
                            )}
                          </View>
                        );
                      })}
                  </>

                  <CustomFooterButton
                    title={props.buttonName}
                    onPress={() => confirmSave(handleSubmit, values)}
                  />
                </KeyboardAvoidingView>
              </ScrollView>
            </>
          );
        }}
      </Formik>
    </>
  );
};
export default memo(ProductForm);
