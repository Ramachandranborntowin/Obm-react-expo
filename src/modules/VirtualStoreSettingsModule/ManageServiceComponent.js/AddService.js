import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import ProductForm from '../CommonComponentsForVirtualStoreSettings/ProductPage';
const AddService = (props) => {
  return (
      <ProductForm routingName = {props.route.name} buttonName={'Add Service'}/>
  );
};

const ModefiedManageAddService = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={AddService}
        headerTitle={"Add Service"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default ModefiedManageAddService;
