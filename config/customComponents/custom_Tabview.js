import React, { memo, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import colors from "../color";

const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").Width);
const customTabview = (params) => {
  const { renderScene_parent, routes_parent, index, setIndex, secondaryTab } = params;
  const [routes] = useState(routes_parent);
  const renderScene = SceneMap(renderScene_parent);
  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // initialLayout={{ width: deviceHeight }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: colors.secondary, height: 2 }}
          renderLabel={({ route, color }) => {
            console.log('route', route)
            return(
            <Text
            numberOfLines={1}
              style={ secondaryTab ? [{margin: 8, fontWeight: 'bold', fontSize: 11}, props.navigationState.index == route.i
              ? {color: colors.secondary}
              : {color: '#C0C0C0'}]:{ color: colors.secondary, margin: 8, fontWeight: "bold" }}
            >
              {route.title}
            </Text>
          )}}
          style={{ backgroundColor: colors.primary, elevation: 0 }}
        />
      )}
    ></TabView>
  );
};

export default memo(customTabview);
