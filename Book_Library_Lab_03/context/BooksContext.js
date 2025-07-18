import React, { createContext, useReducer, useContext } from "react";

const BooksContext = createContext();

const initialState = {
  borrowedBooks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BORROWED_BOOK":
      return { ...state, borrowedBooks: [...state.borrowedBooks, action.payload] };
    case "RETURN_BOOK":
      return { ...state, borrowedBooks: state.borrowedBooks.filter(id => id !== action.payload) };
    default:
      return state;
  }
};

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BooksContext.Provider value={{ state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => useContext(BooksContext);
