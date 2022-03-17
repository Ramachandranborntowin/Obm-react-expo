import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import fontSize from "../../../../config/fontSize";
import colors from "../../../../config/color";
import { styles } from "../VirtualStoreSettingsStyles/ManageProductlandingStyles";
import {
  StyledHorizontalline,
  StyledHorizontalLineDark,
} from "../../../../config/customStylesComponents/customHorizontalLine";
import CustomDeleteIcon from "../../../../config/customIcon/customDeleteIcon";
import { StyledEditStoreDetailListImage, StyledEditStoreDetailsImageView } from "../../../../config/customStylesComponents/customVirtualStoreSettings";
import { StyledSettingsHeading } from "../../../../config/customStylesComponents/customSettingsStylesComponent";

const Card = (params) => {
  const { onPress, navigationName, deleteProduct, upload_url, ...props } =
    params;
  return (
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => onPress(navigationName, {navigationParam: props.item, upload_url})}
      >
        
        <StyledEditStoreDetailListImage
          source={
            props.item?.image || props.item?.cat_image
              ? {
                  uri: `${upload_url}${
                    props.item?.image || props.item?.cat_image
                  }`,
                }
              : require("../../../../assets/image/no_image.jpeg")
          }
        />
        
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: fontSize.Beep_subHeading }}>
            {props.item?.name || props.item?.cat_name || ""}
          </Text>
          <StyledSettingsHeading style={{ paddingTop: 10 }}>
            {props.item?.cat_desc || props.item?.cat_name || ""}
          </StyledSettingsHeading>
        </View>
        <TouchableOpacity
          style={{ alignSelf: "center", marginLeft: "auto" }}
          onPress={() => deleteProduct(props.item?.catid || props.item?.id )}
        >
          <CustomDeleteIcon />
        </TouchableOpacity>
      </TouchableOpacity>
      <StyledHorizontalline />
    </>
  );
};

export default memo(Card);
