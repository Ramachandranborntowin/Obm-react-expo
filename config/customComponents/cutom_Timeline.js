import React from "react";
import { Text, View } from "react-native";
import Timeline from 'react-native-timeline-flatlist';
import colors from "../color";

const CustomTimeLine = (params) => {
  const { data } = { ...params };
  return (
    <View>
      <Timeline
        data={data}
        circleSize={12}
        // circleColor={data.circleColor}
        lineColor={colors.grey}
        showTime={false}
        lineWidth={1}
        titleStyle={{ marginTop: -15 }}
        descriptionStyle={{ marginBottom: 20 }}
        options={{
          style: { paddingTop: 10 },
        }}
      />
    </View>
  );
};

export default CustomTimeLine;
