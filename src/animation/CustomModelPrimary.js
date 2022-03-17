import React, { useState, memo } from "react";
import {
  Button,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { Modal } from "react-native-paper";
import { Header } from "react-native/Libraries/NewAppScreen";
import IonIcon from "react-native-vector-icons/Ionicons";
import colors from "../../config/color";
import fontSize from "../../config/fontSize";
import useCameraOrGallery from "../../config/customHooks/useCameraOrGallery";
import {
  StyledTextButton,
  StyledTouchableOpacityButtonContainer,
} from "../../config/customStylesComponents/customCancelButton";
import { StyledLoyaltyTextArea } from "../../config/customStylesComponents/customLoyaltyComponents";

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  btn_upload: {
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41,

    // elevation: 2,
    // backgroundColor: '#FF9900',
    padding: 12,
    borderRadius: 7,
  },
});
function CustomModelPrimary(props) {
  const List = [
    {
      name: "Camera",
      iconName: "camera",
      imagefrom: "openCamera",
    },
    {
      name: "Choose from gallery",
      iconName: "image",
      imagefrom: "openGallery",
    },
  ];
  const ListView = ({ data }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={async () => {
          if (props.isForm) {
            const result = await useCameraOrGallery(
              data.imagefrom,
              props.imageName
            );
            console.log('image result', result)
            props.setFieldValue(props.fieldName, result);
            props.setEnablephotoModel(false);
          } else if (props.isEditOrDelete) {
            props.onPress(false);
          } else {
            const result = await useCameraOrGallery(
              data.imagefrom,
              props.imageName
            );
            console.log('image result', result)
            props.setImages(result.uri, false);
          }
        }}
      >
        <IonIcon
          name={data.iconName}
          style={[
            {
              fontSize: fontSize.Beep_login_logo,
              paddingHorizontal: 20,
              paddingVertical: 15,
            },
            data.iconName == "trash"
              ? { color: colors.danger }
              : { color: colors.dark_grey },
          ]}
        />
        <Text style={{ fontSize: fontSize.Beep_textStyle, paddingRight: 20 }}>
          {data.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      visible={true}
      onDismiss={() => {
        if (props.isForm) {
          props.setEnablephotoModel(false);
        } else if (props.isEditOrDelete) {
          props.onPress(false);
        } else {
          props.setImages(null, false);
        }
      }}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 5,
          // maxWidth: deviceWidth / 1.2,
        }}
      >
        <View
          style={{
            backgroundColor: colors.secondary,
            padding: 25,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              textAlign: "center",
              fontSize: fontSize.Beep_subHeading,
              fontWeight: "bold",
            }}
          >
            {props.titleName ? props.titleName : "UPLOAD IMAGE"}
          </Text>
        </View>
        {props.list && props.list.length > 0
          ? props.list.map((data, index) => <ListView data={data} />)
          : List.map((data, index) => <ListView data={data} />)}
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
            margin: 15,
          }}
        >
          <StyledTouchableOpacityButtonContainer
            onPress={() => {
              if (props.isForm) {
                props.setEnablephotoModel(false);
              } else if (props.isEditOrDelete) {
                props.onPress(false);
              } else {
                props.setImages(null, false);
              }
            }}
            Color={colors.secondary}
            Padding={12}
          >
            <StyledTextButton textSize={fontSize.Beep_subHeading}>
              CLOSE
            </StyledTextButton>
          </StyledTouchableOpacityButtonContainer>
        </View>
      </View>
    </Modal>
  );
}

export default memo(CustomModelPrimary);

const  CustomModelForUpdate = (props) => {
  const {onPress, ...textFieldParams} = props
  return (
    <Modal
      visible={true}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      onDismiss={() => {
        onPress(false)
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 5,
          minWidth: deviceWidth / 1.2,
          maxWidth: deviceWidth / 1.2,
        }}
      >
        <View
          style={{
            backgroundColor: colors.secondary,
            padding: 25,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              textAlign: "center",
              fontSize: fontSize.Beep_subHeading,
              fontWeight: "bold",
            }}
          >
            {"BANNER TITLE"}
          </Text>
        </View>
        <View style={{ margin: 20 }}>
          <StyledLoyaltyTextArea {...textFieldParams}/>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
            margin: 15,
          }}
        >
          <StyledTouchableOpacityButtonContainer
            onPress={()=>onPress(false)}
            Color={colors.secondary}
            Padding={30}
          >
            <StyledTextButton textSize={fontSize.Beep_subHeading}>
              UPDATE
            </StyledTextButton>
          </StyledTouchableOpacityButtonContainer>
        </View>
      </View>
    </Modal>
  );
};
export const CustomModelUpdate =  memo(CustomModelForUpdate)
