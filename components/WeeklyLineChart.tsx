// WeeklyLineChart.tsx
import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment'; // Ensure moment is installed
import { dayData, DayData } from '@/Data/MockData'; // Adjust the path accordingly

const screenWidth = Dimensions.get('window').width;


const calculateAverages = (data: DayData[]) => {
  const sums: { [key: string]: number } = {};
  const counts: { [key: string]: number } = {};

  // Initialize sums and counts for each day of the week
  moment.weekdaysShort().forEach((day: string) => {
    sums[day] = 0;
    counts[day] = 0;
  });

  data.forEach((day: DayData) => {
    const dayOfWeek: string = moment(day.date).format('ddd');
    const dailyTotal: number = Object.values(day.categories).reduce(
      (total: number, rating: number) => total + rating,
      0
    );
    const dailyAverage: number = dailyTotal / Object.keys(day.categories).length;
    sums[dayOfWeek] += dailyAverage;
    counts[dayOfWeek] += 1;
  });

  // Calculate the average for each day of the week
  const averages: number[] = moment.weekdaysShort().map((day: string) => {
    return counts[day] ? sums[day] / counts[day] : 0;
  });

  return averages;
};


const weeklyAverages = calculateAverages(dayData);

const weeklyData = {
  labels: moment.weekdaysShort(), // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  datasets: [
    {
      data: weeklyAverages,
    }
  ]
};

const chartConfig = {
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

const WeeklyLineChart = () => {
  return (
    <View>
      <Text style={styles.chartTitle}>Weekly Overview</Text>
      <LineChart
        data={weeklyData}
        width={screenWidth}
        height={256}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartTitle: {
    textAlign: 'center', 
    fontSize: 18, 
    padding: 16, 
    color: 'grey'
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

export default WeeklyLineChart;
