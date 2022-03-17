import { StyleSheet, Dimensions } from "react-native";
import fontSize from "../../../../config/fontSize";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: colors.primary, zIndex: -1 }
})