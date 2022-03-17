import {
    StyleSheet,
  } from "react-native";
  import colors from "../../../../config/color";
  import fontSize from "../../../../config/fontSize";

export const styles = StyleSheet.create({
    container_for_number: {
        backgroundColor: colors.secondary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 25, paddingBottom: 5
    },
    doller_font: {
        fontSize: fontSize.Beep_large_font, color: colors.Beepplus_fontcolor
    },
    input: {
        fontSize: fontSize.Beep_Input_Big, color: colors.primary, marginLeft: 5,
    },
    container: {
        margin: 20, marginTop: 15,
        backgroundColor: colors.Beepplus_container_background
    },
    detials: {
        margin: 20, marginTop: 0
    },
    listItem: {
        flexDirection: 'row', flex: 1, marginTop: 15
    },
    listItemKey: {
        flex: 0.8, color: colors.black
    },
    buttonText: {
        fontSize: fontSize.Beep_primaryButtonText,
        color: colors.primary,
        fontWeight: 'bold',
    },
    button: {
        minHeight: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        margin: 20,
        backgroundColor: colors.secondary

    },
})