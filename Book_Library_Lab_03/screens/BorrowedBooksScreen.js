import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useBooksContext } from "../context/BooksContext";

const BorrowedBooksScreen = () => {
  const { state, dispatch } = useBooksContext();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const snapshot = await getDocs(collection(db, "books"));
      const allBooks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = allBooks.filter(book => state.borrowedBooks.includes(book.id));
      setBooks(filtered);
    };
    fetchBooks();
  }, [state.borrowedBooks]);

  const handleReturn = (id) => {
    dispatch({ type: "RETURN_BOOK", payload: id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Button title="Return Book" onPress={() => handleReturn(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={books} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  title: { fontWeight: "bold" },
});

export default BorrowedBooksScreen;
