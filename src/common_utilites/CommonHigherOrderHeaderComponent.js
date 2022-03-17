import Header from "./Header";
import React from "react";
const CommonHigherOrderHeaderComponent = ({pagename, ...props})=>{
    const ModefiedPage = Header(pagename)
return (
  <ModefiedPage 
  {...props}/>
)
}
export default CommonHigherOrderHeaderComponent