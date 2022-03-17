import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import ProductForm from '../CommonComponentsForVirtualStoreSettings/ProductPage';
const EditService = (props) => {
  return (
      <ProductForm routingName = {props.route.name} buttonName={'Edit Service'} />
  );
};

const ModefiedManageEditService = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={EditService}
        headerTitle={"Edit Service"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default ModefiedManageEditService;
