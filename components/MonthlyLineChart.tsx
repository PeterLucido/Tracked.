import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { dayData, DayData } from '@/Data/MockData'; // Adjust the path accordingly

const screenWidth = Dimensions.get('window').width;

interface LineChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

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

interface LineChartComponentProps {
  data?: LineChartData;
  chartConfig?: typeof defaultChartConfig;
}

const calculateMonthlyAverages = (data: DayData[]): number[] => {
  const sums: { [key: string]: number } = {};
  const counts: { [key: string]: number } = {};

  data.forEach((day) => {
    const month = moment(day.date).format('MMM'); 
    sums[month] = sums[month] || 0;
    counts[month] = (counts[month] || 0) + 1;

    const dailyTotal = Object.values(day.categories).reduce((total, rating) => total + rating, 0);
    const dailyAverage = dailyTotal / Object.keys(day.categories).length;
    sums[month] += dailyAverage;
  });

  const monthlyAverages = moment.monthsShort().map((month) => {
    return sums[month] ? sums[month] / counts[month] : 0;
  });

  return monthlyAverages;
};

const monthlyAveragesData = calculateMonthlyAverages(dayData);

const monthlyFeelingsData: LineChartData = {
  labels: moment.monthsShort(),
  datasets: [{
    data: monthlyAveragesData
  }]
};

function MonthlyLineChart({ data = monthlyFeelingsData, chartConfig = defaultChartConfig }: LineChartComponentProps) {
  return (
    <View>
      <Text style={styles.chartTitle}>Monthly Overview</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

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

export default MonthlyLineChart;
