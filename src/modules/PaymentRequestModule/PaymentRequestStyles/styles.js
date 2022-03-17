import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 0,
    backgroundColor: colors.Beepplus_light_grey,
    height: deviceHeight,
    width: deviceWidth,
    flex: 1
    // fafafa
  },
});
