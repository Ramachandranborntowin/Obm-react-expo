import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const styles = StyleSheet.create({
    horizontalline: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border_color,
    },
    heading: {
      fontWeight: 'bold',
      color: colors.secondary,
    },
    img: {
      height: 70,
      width: 70,
    },
    button: {
      minHeight: 55,
      justifyContent: 'center',
      marginTop: 0,
      // borderRadius: ,
      borderColor: colors.secondary,
      borderRadius: 7,
      backgroundColor: colors.secondary,
      margin: 15,
    //   paddingHorizontal: 20,
    },
    buttonText: {
      fontSize: 17,
      color: colors.primary,
      fontWeight: 'bold',
    },
    btn_acceptall: {
      alignSelf: 'center',
      backgroundColor: colors.Beepplus_buttoncolor,
      marginRight: 10,
      marginVertical: 10,
      padding: 5,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    btn_rejectall: {
      alignSelf: 'center',
      backgroundColor: colors.danger,
      padding: 5,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
  });