import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import MarketPlaceDetailPage from './MarketPlaceDetailPage';
import { connect } from "react-redux";
const MarketPlaceOrderInProgress = (props) => {
  console.log('props', props)
    return(
        <MarketPlaceDetailPage name="inprogress" navigation = {props.navigation} apiData={props.route.params.navigationData}/>
    )
    }

const ModefiedMarketPlaceOrderInProgress = (props)=>{
    return(
      <CommonHigherOrderHeaderComponent
      pagename={MarketPlaceOrderInProgress}
      headerTitle={"Order Details"}
      // headerLeftIconType={"menu"}
      headerprops={props}
      {...props}
      />
    )
    }
  export default ModefiedMarketPlaceOrderInProgress;
//   connect(mapStateToProps, null)
