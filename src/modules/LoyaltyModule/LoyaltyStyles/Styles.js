import {
    StyleSheet,Dimensions
  } from "react-native";
  import colors from "../../../../config/color";
  import fontSize from "../../../../config/fontSize";
  const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10,
    },
    touchable_icon: {
      borderWidth: 1,
      borderColor: colors.Beepplus_border_color2,
      alignItems: "center",
      justifyContent: "center",
      width: 100,
      height: 100,
      backgroundColor: colors.primary,
      borderRadius: 50,
  
      shadowColor: colors.secondary,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
    touchable_iconname: {
      textAlign: "center",
      color: colors.secondary,
    },
    content_transaction_history: {
      padding: 10,
      marginTop: 17,
    },
    content_transaction_history_text: {
      textAlign: "center",
      padding: 7,
    },
    dateContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingBottom: 5,
    },
    date_text: {
      color: colors.BeepplusTextColor,
      paddingHorizontal: 45,
      fontSize: fontSize.Beep_description,
    },
    listDate: {
      padding: 10,
      paddingBottom: 16,
      paddingTop: 16,
    },
    dateListContainer: {
      backgroundColor: colors.primary,
      flexDirection: "row",
      paddingLeft: 5,
      paddingRight: 30,
      paddingTop: 8,
      paddingBottom: 10,
    },
    listusername: {
      color: colors.black,
      paddingBottom: 5,
    },
    phone: {
      fontSize: fontSize.Beep_description,
      color: colors.BeepplusTextColor,
    },
    hash_id_container: {
      marginLeft: "auto",
      flexDirection: "row",
      alignItems: "center",
    },
    hash_id: {
      color: colors.green,
      fontWeight: "bold",
      paddingRight: 10,
    },
    list_s1: {
      fontSize: fontSize.Beep_Text_Small,
      color: colors.secondary,
    },
  });
  