import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


export default function TabThreeScreen() {
  const [title, setTitle] = useState('');
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [frequency, setFrequency] = useState(null);
  const [rating, setRating] = useState(null);


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Title"
      />
      {/* <DropDownPicker
        open={open2}
        value={rating}
        setOpen={setOpen2}
        setValue={setRating}
        items={[
          {label: '1-3', value: '1-3'},
          {label: '1-5', value: '1-5'},
          {label: '1-10', value: '1-10'}
        ]}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdownDropdown}
        placeholder="Select Rating"
      />
      <DropDownPicker
        open={open1}
        value={frequency}
        setOpen={setOpen1}
        setValue={setFrequency}
        items={[
          {label: 'Daily', value: 'Daily'},
          {label: 'Weekdays', value: 'Weekdays'}
        ]}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdownDropdown}
        placeholder="Select Frequency"
      /> */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#ffffff"
  },
  input: {
    height: 52,
    fontSize: 18,
    borderColor: '#00AEEF',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 40,
    width: '100%',
    borderColor: '#00AEEF',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 18,
  },
  dropdownDropdown: {
    width: '100%',
    borderColor: '#00AEEF',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 3,
  },
  button: {
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
