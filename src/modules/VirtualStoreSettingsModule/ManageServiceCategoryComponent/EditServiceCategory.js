import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import ProductForm from '../CommonComponentsForVirtualStoreSettings/ProductPage';
const EditServiceCategory = (props) => {
  return (
      <ProductForm routingName = {props.route.name} buttonName={'Edit Service Category'}/>
  );
};

const ModefiedEditServiceCategory = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={EditServiceCategory}
        headerTitle={"Edit Service Category"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default ModefiedEditServiceCategory;
