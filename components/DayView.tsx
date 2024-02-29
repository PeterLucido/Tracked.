import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface Rating {
  [key: string]: number;
}

interface DayData {
  id: string;
  date: string;
  categories: Rating;
  note: string;
}

interface DayViewProps {
  dayData: DayData;
}

const DayView = ({ dayData }: DayViewProps) => {
  const categoriesArray = Object.keys(dayData.categories).map((key) => ({
    name: key,
    rating: dayData.categories[key],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dayData.date}</Text>
      {categoriesArray.map((category) => (
        <View key={category.name} style={styles.categoryContainer}>
          <Text style={styles.category}>{category.name}</Text>
          <View style={styles.sliderRow}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              step={0.5}
              value={category.rating}
              minimumTrackTintColor="#00AEEF"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#00AEEF"
              disabled={true}
            />
            <Text style={styles.ratingText}>{category.rating.toFixed(1)}</Text>
          </View>
        </View>
      ))}
      <View style={styles.noteContainer}>
        <Text style={styles.note}>{dayData.note}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'grey',
    alignSelf: 'center', 
  },
  categoryContainer: {
    alignSelf: 'stretch', // Stretch to take full width
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between the slider and rating text
    width: '100%', // Full width
  },
  slider: {
    flex: 1, // Slider takes as much space as possible
  },
  ratingText: {
    width: 40,
    textAlign: 'center',
    color: '#00AEEF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00AEEF',
  },
  noteContainer: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: '#00AEEF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    height: 100,
  },
  note: {
    color: 'grey',
    fontSize: 18,
  },
});

export default DayView;
