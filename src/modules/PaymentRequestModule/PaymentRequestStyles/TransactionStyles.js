import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../config/color";
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
    Listcontainer: {
      padding: 14,
      borderBottomColor: "#bcc0bf",
      borderBottomWidth: 1,
      flexDirection: "row",
      flex: 1,
    },
    dayDate: {
      color: "#a5a9a8",
      fontWeight: "bold",
      margin: 8,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "#fafafa",
      padding: 10,
    },
    footerIcon: {
      alignSelf: "center",
      fontSize: 20,
      color: colors.secondary,
      padding: 5,
    },
    listImage: {
      height: deviceHeight / 26,
      width: deviceWidth / 14.2,
      alignSelf: "center",
    },
    iconCircle: {
      alignSelf: "center",
      fontSize: 8,
      marginLeft: 8,
    },
    textQrgenerated: {
      alignSelf: "center",
      marginLeft: 5,
    },
    amountandTimingContainer: {
      marginLeft: "auto",
      alignItems: "flex-end",
    },
    timing: {
      fontWeight: "bold",
      fontSize: 16,
    },
    chevionIcon: {
      alignSelf: "center",
      fontSize: 20,
      paddingLeft: 10,
      color: "#868686",
    },
  });
  export default styles
  