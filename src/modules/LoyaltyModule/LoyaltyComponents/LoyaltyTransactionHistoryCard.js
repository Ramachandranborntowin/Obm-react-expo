import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StyledAccessIcon } from '../../../../config/customStylesComponents/customAccessIcon';
import {styles} from "../LoyaltyStyles/Styles"

const LoyaltyTransactionHistoryCard = (params) => {
    const {dateandTime, item, split_date, props} = params
    const baseasserts = `../../../../assets/`;
    return(
    <View>
        <View>
          <Text style={styles.listDate}>
            {dateandTime} {split_date[1]}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.dateListContainer}
          onPress={() => props.navigation.navigate("LoyaltyTransactionDetials")}
        >
          <StyledAccessIcon
            source={require(`${baseasserts}image/app_ic.png`)}
            style={{marginRight: 5}}
          />
          <View>
            <Text style={styles.listusername}>{item.customer_name}</Text>
            <Text style={styles.phone}>+673{item.customer_mobile}</Text>
          </View>

          <View style={styles.hash_id_container}>
            <Text style={styles.hash_id}># {item.id}</Text>
            <Text style={styles.list_s1}>xs{item.points}</Text>
          </View>
        </TouchableOpacity>
      </View>)
}

export default LoyaltyTransactionHistoryCard
