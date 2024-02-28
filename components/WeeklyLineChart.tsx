import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const weeklyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [5, 6, 7, 8, 9, 9, 8] 
    }
  ]
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 174, 239, ${opacity})`, // Blue color
  labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // Grey labels
  strokeWidth: 2,
  decimalPlaces: 1,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#00AEEF"
  }
};

const WeeklyLineChart = () => {
  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 18, padding: 16, color: 'grey'}}>Weekly Overview</Text>
      <LineChart
        data={weeklyData}
        width={screenWidth}
        height={256}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default WeeklyLineChart;
