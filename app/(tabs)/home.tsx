import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import DailyTrack from '@/components/DailyTrack';
import React from 'react';
import { Text, TouchableOpacity, TextInput } from 'react-native';

export default function Home() {
  const [note, setNote] = React.useState('');
  const categories = [
    { name: 'Work', scale: 10 },
    { name: 'Relationship', scale: 10 },
    { name: 'Happiness', scale: 10 },
    { name: 'Calm/Peace', scale: 10 },
    { name: 'Health', scale: 10 },
  ];

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        <DailyTrack categories={categories} />
        <TextInput
          style={styles.input}
          onChangeText={setNote}
          value={note}
          placeholder="Notes..."
          multiline
          textAlignVertical="top"
          placeholderTextColor="grey" 
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    height: 100,
    fontSize: 18,
    borderColor: '#00AEEF',
    borderWidth: 2,
    borderRadius: 5,
    width: '90%',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlign: 'left',
  },
});
