import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

interface Category {
  name: string;
  scale: number;
}

interface DailyTrackProps {
  categories: Category[];
  onRatingsChange: (newRatings: { [category: string]: number }) => void;
  onNoteChange: (newNote: string) => void;
  editable: boolean;
  ratings: { [category: string]: number };
  note: string;
}

const DailyTrack = ({ categories, editable, ratings: initialRatings,
note: initialNote, onRatingsChange, onNoteChange }: DailyTrackProps) => {
  const [ratings, setRatings] = useState<{ [category: string]: number }>(initialRatings);
  const [note, setNote] = useState<string>(initialNote);
  const currentDate = new Date().toLocaleDateString();

  const handleRating = (category: string, rating: number) => {
    const newRatings = { ...ratings, [category]: rating };
    setRatings(newRatings);
    onRatingsChange(newRatings);
  };

  const handleNoteChange = (newNote: string) => {
    setNote(newNote);
    onNoteChange(newNote);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{currentDate}</Text>
      {categories.map((category) => (
        <View key={category.name} style={styles.categoryContainer}>
          <Text style={styles.category}>{category.name}</Text>
          <View style={styles.sliderRow}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              step={0.5}
              value={ratings[category.name] || 0}
              onValueChange={(value) => handleRating(category.name, value)}
              minimumTrackTintColor="#00AEEF"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#00AEEF"
              disabled={!editable}
            />
            <Text style={styles.ratingText}>{ratings[category.name]?.toFixed(1) || '0'}</Text>
          </View>
        </View>
      ))}
      <TextInput
        style={styles.input}
        onChangeText={handleNoteChange}
        value={note}
        placeholder="Notes..."
        multiline
        textAlignVertical="top"
        placeholderTextColor="grey" 
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
    marginBottom: 8,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00AEEF',
  },
  ratingText: {
    width: 40, 
    textAlign: 'center',
    color: '#00AEEF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  slider: {
    width: '90%',
  },
  input: {
    alignSelf: 'stretch', 
    maxWidth: '100%',
    height: 100,
    fontSize: 18,
    borderColor: '#00AEEF',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 20,
    textAlign: 'left',
    color: 'grey',
  },
});

export default DailyTrack;
