import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


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
    scale: 10,
    rating: dayData.categories[key],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dayData.date}</Text>
      {categoriesArray.map((category) => (
        <View key={category.name} style={styles.categoryContainer}>
          <Text style={styles.category}>{category.name}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: category.scale }, (_, index) => {
              const ratingValue = index + 1;
              const isSelected = category.rating === ratingValue;
              return (
                <View
                  key={ratingValue}
                  style={[
                    styles.circle,
                    isSelected && styles.selectedCircle,
                  ]}
                >
                  <Text
                    style={[
                      styles.circleText,
                      isSelected && styles.selectedCircleText,
                    ]}
                  >
                    {ratingValue}
                  </Text>
                </View>
              );
            })}
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
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'grey',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00AEEF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 1.5, 
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  selectedCircle: {
    backgroundColor: '#00AEEF',
    borderColor: '#00AEEF',
  },
  circleText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  selectedCircleText: {
    color: 'white',
  },
  noteContainer: {
    borderWidth: 2,
    borderColor: '#00AEEF',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    marginBottom: 10,
  },
  note: {
    height: 100,
    fontSize: 18,
    textAlign: 'left',
    color: 'grey',
  },
});

export default DayView;