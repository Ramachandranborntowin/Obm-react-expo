import React from "react";
import { View,Image } from "react-native";
const SmallIcon = (porps) => {
  const { icon } = porps;
  return (
    <Image
      source={icon}
      style={[{
        height: 35,
        width: 35,
        alignSelf: "center",
        marginLeft: 5,
        marginRight: 20,
      },icon == "Pasarpbg" && { height: 40, width: 40 }]}
    ></Image>
  );
};
export default SmallIcon;
