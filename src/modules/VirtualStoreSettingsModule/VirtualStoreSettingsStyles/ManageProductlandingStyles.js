
import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
import fontSize from "../../../../config/fontSize";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
export const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: "row",
              // borderBottomColor: colors.grey,
              // borderBottomWidth: 3,
              padding: 15,
              paddingBottom: 10,
              backgroundColor: colors.primary
    },
    textBlue:{
      color: colors.secondary,
      fontWeight: "bold",
      fontSize: fontSize.Beep_subHeading,
      paddingTop: 10,
    }
  });