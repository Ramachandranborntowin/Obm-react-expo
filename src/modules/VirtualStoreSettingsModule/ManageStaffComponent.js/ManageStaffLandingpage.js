import React, {
    Component,
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import CommonHigherOrderHeaderComponent from "../../../common_utilites/CommonHigherOrderHeaderComponent";
  import Lists from "../CommonComponentsForVirtualStoreSettings/Lists"
  const ManageStaffLandingPage = (props) => {
    return (
      <Lists props={props} navigationNameEdit={'EditStaff'} navigationNameAdd={'AddStaff'} descriptionName={'staff'}/>
    );
  };
  
  const ModefiedManageStaffLandingPage = (props) => {
    return (
      <CommonHigherOrderHeaderComponent
        pagename={ManageStaffLandingPage}
        headerTitle={"Manage Staff"}
        // headerLeftIconType={"menu"}
        headerprops={props}
        {...props}
      />
    );
  };
  export default ModefiedManageStaffLandingPage;
  