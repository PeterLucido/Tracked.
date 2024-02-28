import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, Text } from 'react-native';
import { View } from './Themed';

interface DayData {
  date: string;
  categories: { [category: string]: number };
}

interface CategoryBarGraphProps {
  dayData: DayData[];
}

const CategoryBarGraph = ({ dayData }: CategoryBarGraphProps) => {
  const categoryAverages: { [key: string]: number } = {};
  dayData.forEach(day => {
    Object.entries(day.categories).forEach(([category, rating]) => {
      if (!categoryAverages[category]) {
        categoryAverages[category] = 0;
      }
      categoryAverages[category] += rating;
    });
  });

  Object.keys(categoryAverages).forEach(category => {
    categoryAverages[category] /= dayData.length;
  });

  const chartData = {
    labels: Object.keys(categoryAverages),
    datasets: [{ data: Object.values(categoryAverages) }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(0, 174, 239, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, padding: 16, color: 'grey' }}>
        Average Per Category
      </Text>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        verticalLabelRotation={15}
        fromZero
        yAxisLabel=""
        yAxisSuffix=""
      />
    </View>
  );
};

export default CategoryBarGraph;
