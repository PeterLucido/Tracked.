import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Screen width for responsive chart sizing
const screenWidth = Dimensions.get('window').width;

// Data and Config Types
interface LineChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

const monthlyFeelingsData: LineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
    data: [3, 4, 7, 8, 8, 8, 9, 8, 8, 10, 8, 9]
  }]
};

// Example chart configuration
const defaultChartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 174, 239, ${opacity})`, 
  labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 1,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#00AEEF"
  }
};

// Adjusted LineChartComponentProps to not use React.FC
interface LineChartComponentProps {
  data?: LineChartData;
  chartConfig?: typeof defaultChartConfig;
}

function MonthlyLineChart({ data = monthlyFeelingsData, chartConfig = defaultChartConfig }: LineChartComponentProps) {
  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, padding: 16, color: 'grey' }}>Monthly Overview</Text>
      <LineChart
        data={data}
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
}

export default MonthlyLineChart;
