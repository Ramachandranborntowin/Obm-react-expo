import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import ProductForm from '../CommonComponentsForVirtualStoreSettings/ProductPage';
const ServiceFeesLandingPage = (props) => {
  return (
      <ProductForm routingName = {props.route.name} buttonName={'Update Fee'}/>
  );
};

const ModefiedServiceFeesLandingPage = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={ServiceFeesLandingPage}
        headerTitle={"Service Fee update"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default ModefiedServiceFeesLandingPage;
