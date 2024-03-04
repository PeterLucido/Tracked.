import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, getFirestore } from 'firebase/firestore';


interface MarkedDate {
  selected: boolean;
  selectedColor: string;
}

interface MarkedDates {
  [date: string]: MarkedDate;
}

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

const calculateAverageRating = (categories: { [key: string]: number }): number => {
  const total = Object.values(categories).reduce((sum, rating) => sum + rating, 0);
  const average = total / Object.keys(categories).length;
  return average;
};

const CalendarView = () => {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchDayData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const firestore = getFirestore();
        const daysCollectionRef = collection(firestore, 'users', user.uid, 'days');
        try {
          const querySnapshot = await getDocs(daysCollectionRef);
          const fetchedDays = querySnapshot.docs.reduce((acc: MarkedDates, doc: QueryDocumentSnapshot<DocumentData>) => {
            const dayData = doc.data();
            // Ensure dayData.categories is the correct type before passing to calculateAverageRating
            const averageRating = calculateAverageRating(dayData.categories as { [key: string]: number });
            const color = ratingToPastelColor(averageRating);
            acc[doc.id] = { selected: true, selectedColor: color };
            return acc;
          }, {} as MarkedDates); // Type the initial value as MarkedDates
          setMarkedDates(fetchedDays);
        } catch (error) {
          console.error('Error fetching day data:', error);
        }
      }
    };

    fetchDayData();
  }, []);

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
          textDayFontSize: 15,
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
