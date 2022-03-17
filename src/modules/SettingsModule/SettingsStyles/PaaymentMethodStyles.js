import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    touchIdContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
      }
})