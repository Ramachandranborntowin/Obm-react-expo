import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
import fontSize from "../../../../config/fontSize";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    horzontal_line: {
      borderTopWidth: 1,
      borderTopColor: colors.Beepplus_border_color,
    },
    container: {
      margin: 15,
      marginBottom: 13,
    },
    symbolDoller: {
      fontSize: fontSize.Beep_login_logo,
      alignSelf: 'center',
    },
    qrCodeGenerator: {
      padding: 5,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: colors.Beepplus_border_color,
      flexDirection: 'row',
    },
    qrCodetext: {
      color: colors.border_color,
      fontSize: fontSize.Beep_description,
    },
    List: {
      margin: 15,
      marginTop: 3,
      marginBottom: 15,
    },
    listItem: {
      flexDirection: 'row',
      flex: 1,
      marginTop: 12,
    },
    listItemKey: {
      flex: 0.6,
      color: 'black',
    },
    Headingtext: {
      color: colors.sub_heading_text_color,
      fontSize: fontSize.Beep_heading,
    },
    listForIformation: {
      flexDirection: 'row',
      flex: 1,
      marginTop: 10,
    },
    containerforTracking: {
      margin: 15,
      marginBottom: 20,
    },
  });