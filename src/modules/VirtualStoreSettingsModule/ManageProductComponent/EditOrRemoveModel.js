import React, { useState } from 'react';
import { Button, Text, View, Dimensions, FlatList, TouchableOpacity, StyleSheet, TouchableHighlight, Pressable } from 'react-native';
import { Modal } from 'react-native-paper';
import { Header } from 'react-native/Libraries/NewAppScreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from "../../../../config/color"
import CustomEditIcon from '../../../../config/customIcon/customEditIcon';
import CustomDeleteIcon from '../../../../config/customIcon/customDeleteIcon';
import CustomModelPrimary from '../../../animation/CustomModelPrimary';

const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);

function EditOrRemoveModel(props) {
    const List = [{
        name: `Edit ${props.name}`,
        iconName: 'pencil-sharp',
    },
    {
        name: `Remove ${props.name}`,
        iconName: 'trash',
    }]

    return (
            <CustomModelPrimary 
            titleName = {'Select Type'} 
            list={List} 
            isEditOrDelete={true} 
            onPress={props.setEditOrRemoveModel}/>
    );
}

export default EditOrRemoveModel;