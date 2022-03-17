import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import MarketPlaceDetailPage from './MarketPlaceDetailPage';
import { connect } from "react-redux";
const MarketPlaceOrderCompleted = (props) => {
    return(
        <MarketPlaceDetailPage name="completed" navigation = {props.navigation} apiData={props.route.params.navigationData} />
    )
    }

const ModefiedMarketPlaceOrderCompleted = (props)=>{
    return(
      <CommonHigherOrderHeaderComponent
      pagename={MarketPlaceOrderCompleted}
      headerTitle={"Order Details"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
      />
    )
    }
  export default ModefiedMarketPlaceOrderCompleted;
//   connect(mapStateToProps, null)
