import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { router } from 'expo-router';
import { dayData } from '@/Data/MockData'; // Adjust the path as necessary


interface MarkedDate {
  selected: boolean;
  selectedColor: string;
}

interface MarkedDates {
  [date: string]: MarkedDate;
}


// Function to interpolate between pastel colors based on rating
const ratingToPastelColor = (rating: number): string => {
  const normalizedRating = (rating - 1) / 9;
  let r, g, b = 0;
  if (normalizedRating < 0.5) {
    r = 255;
    g = Math.round(205 * normalizedRating * 2);
    b = Math.round(128 * normalizedRating * 2);
  } else {
    r = Math.round(255 * (1 - normalizedRating) * 2);
    g = 205;
    b = 128;
  }
  return `rgb(${r},${g},${b})`;
};

// Calculate the average rating for each day
const calculateAverageRating = (categories: { [key: string]: number }): number => {
  const total = Object.values(categories).reduce((sum, rating) => sum + rating, 0);
  const average = total / Object.keys(categories).length;
  return average;
};

// Prepare marked dates with color coding
const prepareMarkedDates = (): MarkedDates => {
  return dayData.reduce((acc: MarkedDates, day) => {
    const averageRating = calculateAverageRating(day.categories);
    const color = ratingToPastelColor(averageRating);
    acc[day.date] = { selected: true, selectedColor: color };
    return acc;
  }, {});
};

const CalendarView = () => {
  const markedDates = prepareMarkedDates();

  const handleDayPress = (dayId: { dateString: string }) => {
    router.push(`/day/${dayId.dateString}`);
    console.log('Selected day:', dayId.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        enableSwipeMonths={true}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          textSectionTitleColor: 'grey',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 20,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CalendarView;
