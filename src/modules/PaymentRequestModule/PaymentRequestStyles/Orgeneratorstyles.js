import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    container: {
      padding: 10,
      marginBottom: 0,
      // marginTop: 20,
      flex: 1,
      backgroundColor: colors.primary,
      // fafafa
    },
    card_header: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    card_header_number: {
      textAlign: "center",
      fontSize: 40,
      color: "black",
      marginLeft: -10,
    },
    textScantopay: {
      textAlign: "center",
      fontSize: 17,
      color: colors.whiteoff,
    },
    footer: {
      borderWidth: 2,
      borderColor: colors.bg_screen2,
      padding: 15,
      left: 0,
      right: 0,
      bottom: 0,
      position: "absolute",
      width: "100%",
      backgroundColor: colors.secondary,
      borderRadius: 7,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    },
    textPaymentSucessfull: {
      fontSize: 20,
      justifyContent: "center",
      color: colors.bg_screen2,
      fontWeight: "bold",
    },
    orscannericoncontainer: {
        marginLeft: "auto",
        backgroundColor: colors.Beepplus_light_grey,
        borderRadius: 7,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        padding: 1,
      }
})
