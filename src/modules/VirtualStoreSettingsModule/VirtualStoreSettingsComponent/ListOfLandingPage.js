import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import colors from '../../../../config/color';
import { SelectTagWithTextCenter } from '../../../../config/customComponents/custom_Selecttag';
const ListOfLandingPage = (props) => {
    console.log('list of landing page');
    return(
      <View style={{margin: 8}}>
          <SelectTagWithTextCenter {...props}/>
      </View>
    )
};

export default ListOfLandingPage;
