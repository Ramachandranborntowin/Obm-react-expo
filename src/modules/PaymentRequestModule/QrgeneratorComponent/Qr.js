import React, {
    Component,
    memo,
    useState,
    useEffect,
    useMemo,
    useCallback,
  } from "react";
  import {
    View,
    Text,
  } from "react-native";
  import CustomArrowUp from "../../../../config/customIcon/customArrowUp";
  import { StyledQrImage } from "../../../../config/customStylesComponents/customQrgenerator";
  import { styles } from "../PaymentRequestStyles/Orgeneratorstyles";
const Qr = (props) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <StyledQrImage source={{ uri: props.qrimage }} />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomArrowUp textAlign={"center"} />
          <Text style={styles.textScantopay}>SCAN TO PAY</Text>
        </View>
      </>
    );
  };
  export default memo(Qr)