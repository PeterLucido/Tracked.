import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState, useEffect } from 'react';
import DayView from '@/components/DayView';
import { dayData } from '@/Data/MockData'; 
import { DayData } from '@/Data/MockData';
import { useLocalSearchParams } from 'expo-router';

export default function Day() {
  const { id } = useLocalSearchParams();
  const [selectedDayData, setSelectedDayData] = useState<DayData | undefined>();
  const selectedDayId = id

  useEffect(() => {
    const daysData = dayData.find(day => day.id === selectedDayId);
    setSelectedDayData(daysData);
  }, [selectedDayId]);

  return (
    <View style={styles.main}>
      {selectedDayData ? (
        <DayView dayData={selectedDayData} />
      ) : (
        <Text style={styles.noDataText}>There is no data for this day yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    color: 'grey',
  },
});
