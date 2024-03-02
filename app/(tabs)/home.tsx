import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DailyTrack from '@/components/DailyTrack';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '@/components/loading';
import SignUp from '@/components/SignUp';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<{ name: string; scale: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        const firestore = getFirestore();
        const categoriesCollectionRef = collection(firestore, 'categories', currentUser.uid, 'userCategories');
        try {
          const querySnapshot = await getDocs(categoriesCollectionRef);
          const fetchedCategories = querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            scale: 10
          }));
          setCategories(fetchedCategories);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <SignUp />;
  }

  return (
    <View style={styles.main}>
      {loading ? <Loading /> : (
        <ScrollView contentContainerStyle={styles.container}>
          <DailyTrack categories={categories} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
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
  },
  button: {
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
