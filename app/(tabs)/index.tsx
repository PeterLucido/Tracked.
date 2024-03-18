import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DailyTrack from '@/components/DailyTrack';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '@/components/loading';
import SignUp from '@/components/SignUp';
import Login from '@/components/Login';
import { router } from 'expo-router';

const getFormattedDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<{ name: string; scale: number }[]>([]);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [, setSaveSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataFetchedForToday, setDataFetchedForToday] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

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
          await fetchDayData(firestore, currentUser.uid);
        } catch (error) {
          console.error('Error fetching categories or day data:', error);
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchDayData = async (firestore: any, userId: string) => {
    const today = getFormattedDate();
    const userDayRef = doc(firestore, 'users', userId, 'days', today);

    try {
      const docSnap = await getDoc(userDayRef);
      if (docSnap.exists()) {
        const dayData = docSnap.data();
        setRatings(dayData.categories);
        setNote(dayData.note);
        setDataFetchedForToday(true);
      } else {
        setDataFetchedForToday(false);
      }
    } catch (error) {
      console.error('Error fetching day data:', error);
    }
  };

  const handleRatingsChange = (newRatings: { [key: string]: number }) => {
    setRatings(newRatings);
  };

  const handleNoteChange = (newNote: string) => {
    setNote(newNote);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
  
    if (user) {
      const firestore = getFirestore();
      const userDayRef = doc(firestore, 'users', user.uid, 'days', new Date().toISOString().split('T')[0]);
  
      try {
        await setDoc(userDayRef, {
          date: new Date(),
          categories: ratings,
          note: note,
        });
        setIsSaving(false); 
        setShowModal(true);
        setDataFetchedForToday(true);
      } catch (error) {
        setIsSaving(false);
      }
    } else {
      console.error('No user is logged in.');
      setIsSaving(false);
    }
  };

  const handleCreateCategory = () => {
    router.push('/create');
  };
  

  if (!user) {
    return isLoginView ? (
      <Login toggleView={() => setIsLoginView(!isLoginView)} />
    ) : (
      <SignUp toggleView={() => setIsLoginView(!isLoginView)} />
    );
  }

  return (
    <View style={styles.main}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {categories.length === 0 ? (
            <View style={styles.container}>
              <Text style={styles.noFound}>No categories found. Please create a category.</Text>
              <TouchableOpacity onPress={handleCreateCategory} style={styles.createCategoryButton}>
                <Text style={styles.buttonText}>Create Category</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <DailyTrack
                categories={categories}
                onRatingsChange={handleRatingsChange}
                onNoteChange={handleNoteChange}
                editable={!dataFetchedForToday}
                ratings={ratings}
                note={note} 
              />
              <TouchableOpacity style={styles.buttonSave} onPress={handleSave} disabled={isSaving || dataFetchedForToday}>
                <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your day has been Tracked.</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModal(!showModal)}>
              <Text style={styles.textStyle}>Sick!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  buttonSave: {
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 50,
  },
  createCategoryButton: {
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
  },
  noFound: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'grey',
    alignSelf: 'center',
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#00AEEF",
    width: '80%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: "center"
  }
});
