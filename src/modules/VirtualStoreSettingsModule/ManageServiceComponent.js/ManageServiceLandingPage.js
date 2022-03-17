import React, {
    Component,
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
  import Lists from "../CommonComponentsForVirtualStoreSettings/Lists"
  const ManageServiceLandingPage = (props) => {
    return (
      <Lists props={props} navigationNameEdit={'EditService'} navigationNameAdd={'AddService'} descriptionName={'service'}/>
    );
  };
  
  const ModefiedManageServiceLandingPage = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={ManageServiceLandingPage}
        headerTitle={"Manage Service"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default ModefiedManageServiceLandingPage;
  