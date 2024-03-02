import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { getFirestore, doc, setDoc, deleteDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface Category {
  id: string;
  name: string;
}

export default function TabThreeScreen() {
  const [categoriesInput, setCategoriesInput] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const firestore = getFirestore();
  
        // Adjust the path to the userCategories subcollection
        const categoriesQuery = query(collection(firestore, 'categories', user.uid, 'userCategories'));
  
        const querySnapshot = await getDocs(categoriesQuery);
        const fetchedCategories: Category[] = [];
        querySnapshot.forEach((doc) => {
          fetchedCategories.push({ id: doc.id, name: doc.data().name });
        });
        setCategories(fetchedCategories);
      } else {
        console.error('No user logged in.');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  

  const handleSave = async () => {
    const newCategories = categoriesInput.split(',').map(category => category.trim());
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const firestore = getFirestore();
        const categoriesCollectionRef = collection(firestore, 'categories', user.uid, 'userCategories');
  
        // Create a new document for each new category
        newCategories.forEach(async (categoryName) => {
          const newCategoryRef = doc(categoriesCollectionRef);
          await setDoc(newCategoryRef, { name: categoryName });
        });
  
        console.log('Categories saved:', newCategories);
  
        // Fetch and set the updated categories
        fetchCategories();
  
        // Clear input field
        setCategoriesInput('');
      } else {
        console.error('No user logged in.');
      }
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };
  

  const handleDelete = async (categoryId: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const firestore = getFirestore();
  
        // Adjust the path to point to the individual category document within the userCategories subcollection
        const categoryDocRef = doc(firestore, 'categories', user.uid, 'userCategories', categoryId);
  
        await deleteDoc(categoryDocRef);
        console.log('Category deleted:', categoryId);
  
        // Refresh categories list
        fetchCategories();
      } else {
        console.error('No user logged in.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setCategoriesInput}
        value={categoriesInput}
        placeholder="Categories (separated by commas)"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.categoryList}
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  categoryList: {
    flex: 1,
    marginTop: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 16,
  },
  deleteIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
});
