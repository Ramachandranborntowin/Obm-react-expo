import React from 'react';
import {StyledSettingsMerchantButton, StyledSettingsMerchantButtonText} from "../customStylesComponents/customSettingsStylesComponent"
const SwitchMerchantButton = (params) => {
    const {props, name} = {...params}
    return (
        <StyledSettingsMerchantButton onPress={() => props.navigation.navigate('SwitchMerchant')}>
            <StyledSettingsMerchantButtonText>
                {name}
            </StyledSettingsMerchantButtonText>
        </StyledSettingsMerchantButton>
    )
}
export default SwitchMerchantButton