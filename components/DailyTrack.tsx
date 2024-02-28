import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Category {
  name: string;
  scale: number;
}

interface DailyTrackProps {
  categories: Category[];
}

const DailyTrack = ({ categories }: DailyTrackProps) => {
  const [ratings, setRatings] = useState<{ [category: string]: number }>({});
  
  const currentDate = new Date().toLocaleDateString();

  const handleRating = (category: string, rating: number) => {
    setRatings(prevRatings => ({ ...prevRatings, [category]: rating }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{currentDate}</Text>
      {categories.map(category => (
        <View key={category.name} style={styles.categoryContainer}>
          <Text style={styles.category}>{category.name}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: category.scale }, (_, index) => index + 1).map(number => (
              <TouchableOpacity
                key={number}
                style={[
                  styles.circle,
                  ratings[category.name] === number && styles.selectedCircle
                ]}
                onPress={() => handleRating(category.name, number)}
              >
                <Text style={[
                  styles.circleText,
                  ratings[category.name] === number && styles.selectedCircleText
                ]}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
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
});

export default DailyTrack;
