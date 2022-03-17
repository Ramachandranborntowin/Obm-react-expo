import React from 'react';
import CommonHigherOrderHeaderComponent from '../../../common_utilites/CommonHigherOrderHeaderComponent';
import ProductForm from '../CommonComponentsForVirtualStoreSettings/ProductPage';
const EditStaff = (props) => {
  return (
      <ProductForm routingName = {props.route.name} buttonName={'Edit Staff'}/>
  );
};

const ModefiedManageEditStaff = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={EditStaff}
        headerTitle={"Edit Staff"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default ModefiedManageEditStaff;
