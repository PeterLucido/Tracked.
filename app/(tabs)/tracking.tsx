import { StyleSheet, ScrollView } from 'react-native';
import MonthlyLineChart from '@/components/MonthlyLineChart';
import WeeklyLineChart from '@/components/WeeklyLineChart';
import CategoryBarGraph from '@/components/CategoryBarGraph';
import { View } from '@/components/Themed';
import { dayData } from '@/Data/MockData';


export default function Tracking() {

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        <CategoryBarGraph dayData={dayData}/>
        <WeeklyLineChart />
        <MonthlyLineChart />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    // marginTop: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});