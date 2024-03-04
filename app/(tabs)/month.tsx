import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import CalendarView from '@/components/Calender';



export default function Day() {

  return (
    <View style={styles.container}>
      <CalendarView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
