import React from 'react';
import {
    Text,
    View,
    Pressable,
    StyleSheet,
   TouchableOpacity, 
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomArrowOutlineRight from '../customIcon/customArrowOutlineRight';
import { StyledSettingsSelectTagContainerText, StyledSettingsSelectTagContainer } from '../customStylesComponents/customSettingsStylesComponent';
const styles = StyleSheet.create({
    dropdownContainer: {
        marginRight: 15,
        marginTop: 12,
        marginLeft: 10,
    },
})
const Selecttag = (params) => {
    const {onPress, obj, name, props, routename} = {...params}
    return (
        <Pressable onPress={ () => (obj && obj.name) ? onPress(obj.name): (props.navigation.navigate(routename))}>
           <StyledSettingsSelectTagContainer style={styles.dropdownContainer}>
                <StyledSettingsSelectTagContainerText>{(obj && obj.name) ? obj.name : name}</StyledSettingsSelectTagContainerText>
                <CustomArrowOutlineRight style={{marginLeft: 'auto', alignSelf: 'center',}}/>
            </StyledSettingsSelectTagContainer>
        </Pressable>
    )
}
export default Selecttag
export const SelectTagWithTextCenter = (props)=>{
    const {navigationName, name, navigation, allStoreDetails, afterStoreUpdated, setAfterStoreUpdate} = {...props}
    return(
        <Pressable onPress={ () => navigation.navigate(navigationName, navigationName == "EditStoreDetails" ? {
            storeDetails: allStoreDetails,
            afterStoreUpdated,
            setAfterStoreUpdate
        } : null)}>
            <StyledSettingsSelectTagContainer style={{justifyContent: 'center'}}>
            <Text>{name}</Text>
            </StyledSettingsSelectTagContainer>
        </Pressable>
    )

}