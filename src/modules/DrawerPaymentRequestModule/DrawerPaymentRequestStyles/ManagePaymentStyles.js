import { StyleSheet, Dimensions } from "react-native";
import fontSize from "../../../../config/fontSize";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: colors.primary, zIndex: -1 },
    listHeaderDate: {color: colors.Beepplus_background_color,
    fontWeight: "bold",
    margin: 8,}
})