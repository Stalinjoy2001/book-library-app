import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useBooksContext } from '../context/BooksContext';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  const { state, dispatch } = useBooksContext();

  const isBorrowed = state.borrowedBooks.includes(book.id);
  const borrowedCount = state.borrowedBooks.length;

  const handleBorrow = () => {
    if (borrowedCount >= 3) {
      Alert.alert("Limit Reached", "You can only borrow 3 books at a time.");
      return;
    }

    if (isBorrowed) {
      Alert.alert("Already Borrowed", "You have already borrowed this book.");
      return;
    }

    dispatch({ type: "ADD_BORROWED_BOOK", payload: book.id });
    Alert.alert("Success", `"${book.title}" has been borrowed.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>

      <View style={styles.metaContainer}>
        <Text style={styles.meta}><Text style={styles.label}>Genre:</Text> {book.genre}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Language:</Text> {book.language}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Pages:</Text> {book.pages}</Text>
        <Text style={styles.meta}><Text style={styles.label}>Published:</Text> {book.publishedYear}</Text>
      </View>

      <TouchableOpacity
        onPress={handleBorrow}
        disabled={isBorrowed}
        style={[styles.button, isBorrowed && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>
          {isBorrowed ? "Already Borrowed" : "Borrow Book"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  author: {
    fontSize: 18,
    color: "#ccc",
    fontStyle: "italic",
    marginBottom: 20,
  },
  metaContainer: {
    marginBottom: 30,
  },
  meta: {
    fontSize: 16,
    color: "#ddd",
    marginVertical: 6,
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookDetailScreen;
