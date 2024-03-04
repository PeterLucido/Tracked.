import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, Timestamp } from 'firebase/firestore';
import DayView from '@/components/DayView';
import Loading from '@/components/loading';
import SignUp from '@/components/SignUp';

interface DayData {
  id: string;
  date: string
  categories: { [key: string]: number };
  note: string;
}

export default function Day() {
  const { id } = useLocalSearchParams();
  const [dayData, setDayData] = useState<DayData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const fetchDayData = async () => {
      if (user && typeof id === 'string') {
        setLoading(true);
        const firestore = getFirestore();
        const dayRef = doc(firestore, 'users', user.uid, 'days', id);
  
        try {
          const docSnap = await getDoc(dayRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const date = data.date instanceof Timestamp ? data.date.toDate().toISOString().split('T')[0] : data.date;
            setDayData({
              id: docSnap.id,
              date: date,
              categories: data.categories,
              note: data.note,
            });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching day data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    if (user && id) {
      fetchDayData();
    }
  }, [user, id]);
  
  if (!user) {
    return <SignUp />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.main}>
      {dayData ? (
        <ScrollView contentContainerStyle={styles.container}>
          <DayView dayData={dayData} />
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>There is no data for this day yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    color: 'grey',
  },
});
