import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, Text } from 'react-native';
import { View } from './Themed';
import { DayData } from '@/Data/MockData'; // Import the DayData interface and dayData array

const CategoryBarGraph = ({ dayData }: { dayData: DayData[] }) => {
  // Calculate averages for each category
  const categoryAverages: { [key: string]: number } = {};
  dayData.forEach(day => {
    Object.entries(day.categories).forEach(([category, rating]) => {
      categoryAverages[category] = (categoryAverages[category] || 0) + rating;
    });
  });
  // Calculate the average for each category
  Object.keys(categoryAverages).forEach(category => {
    categoryAverages[category] /= dayData.length;
  });

  const chartData = {
    labels: Object.keys(categoryAverages),
    datasets: [
      {
        data: Object.values(categoryAverages)
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(0, 174, 239, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 18, padding: 16, color: 'grey'}}>Average Per Category</Text>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={250}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={15}
      />
    </View>
  );
};

export default CategoryBarGraph;
