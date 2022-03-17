import { StyleSheet } from "react-native";
import colors from "../../../../config/color";
import fontSize from "../../../../config/fontSize";

export const styles = StyleSheet.create({
    listContainer: {
      flexDirection: "row",
      padding: 20,
      paddingLeft: 30,
      paddingTop: 15,
      borderBottomColor: colors.Beepplus_border_color,
      borderBottomWidth: 1,
      backgroundColor: colors.primary,
    },
    img: {
      height: 80,
      width: 90,
    },
    content: {
      paddingLeft: 20,
      paddingTop: 5,
    },
    headingText:{
        color: colors.primary,
        fontSize: fontSize.Beep_description,
    },
    container:{
      flexDirection: "row",
              padding: 20,
              backgroundColor: colors.secondary,
    }
  });