import { StyleSheet, Dimensions } from "react-native";
import fontSize from "../../../../config/fontSize";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: deviceHeight,
        padding: 15,
    },
    headingContainer: { flexDirection: "row", alignItems: "center" },
    statusContainer: {
        padding: 5,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: colors.Beepplus_border_color,
        flexDirection: "row",
      },
      statusText:{
        color: colors.border_color,
        fontSize: fontSize.Beep_description,
      },
      listContainer:{
        margin: 15,
        marginTop: 3,
        marginBottom: 15,
      },
      listvaluescontainer:{
        flexDirection: "row",
        marginTop: 12,
      },
      listKeyText: {
        flex: 0.6,
        color: colors.black,
      },
      listValueText: { color: colors.dark_grey, flex: 0.8 }
})