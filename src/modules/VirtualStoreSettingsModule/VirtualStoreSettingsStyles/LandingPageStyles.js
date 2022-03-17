import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
import fontSize from "../../../../config/fontSize";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

export const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor: colors.primary, padding: 20 },
    logoAligmant: {justifyContent: "center", alignItems: "center"},
    username:{
        color: colors.black,
        fontSize: fontSize.Beep_primaryButtonText,
        fontWeight: "bold",
        marginTop: 10,
      },
      link:{ color: colors.secondary, fontSize: fontSize.Beep_subHeading, textAlign: 'center', textDecorationLine: 'underline' },
      heading:{ color: colors.black, fontSize: fontSize.Beep_subHeading }
});