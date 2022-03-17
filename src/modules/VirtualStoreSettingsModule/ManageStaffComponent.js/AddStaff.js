import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import ProductForm from '../CommonComponentsForVirtualStoreSettings/ProductPage';
const AddStaff = (props) => {
  return (
      <ProductForm routingName = {props.route.name} buttonName={'Add Staff'}/>
  );
};

const ModefiedManageAddStaff = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={AddStaff}
        headerTitle={"Add Staff"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default ModefiedManageAddStaff;
