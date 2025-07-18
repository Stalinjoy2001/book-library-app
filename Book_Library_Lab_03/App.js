import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import BookDetailScreen from "./screens/BookDetailScreen";
import BorrowedBooksScreen from "./screens/BorrowedBooksScreen";
import { BooksProvider } from "./context/BooksContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BooksProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BookDetail" component={BookDetailScreen} />
          <Stack.Screen name="BorrowedBooks" component={BorrowedBooksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BooksProvider>
  );
}
