import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const snapshot = await getDocs(collection(db, "books"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate("BookDetail", { book: item })}
    >
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <Text style={styles.genre}>{item.genre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Book Library</Text>
      </View>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        )}

        <TouchableOpacity
          style={styles.borrowedButton}
          onPress={() => navigation.navigate("BorrowedBooks")}
        >
          <Text style={styles.borrowedText}>View Borrowed Books</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // sync safe area with app background
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerContainer: {
    backgroundColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomColor: "#444",
    borderBottomWidth: 0.5,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  listItem: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderColor: "#fff",
    borderWidth: 1,
  },
  textWrapper: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  author: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  genre: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  borrowedButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  borrowedText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
