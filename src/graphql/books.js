import { gql } from 'apollo-boost';

const addBook = gql`
  mutation($name: String!, $year: String!, $description: String!, $image: String, $authors: [String], $genre: [String]) {
    addBook(name: $name, description: $description, year: $year, image: $image, authors: $authors,
      genre: $genre) {
      name
    }
  }
`;

const bookFilter = gql`
  query($search: String, $from: ID, $size: ID) {
    searchBooks(searchQuery: $search, from: $from, size: $size) {
      id
      name
      genre
      authors
      averageRating
      googleAverageRating
      year
      image
      userId
      downloadable
    }
  }
`;

const fetchBook = gql`
  query($bookId: String!) {
    book(id: $bookId){
      id
      name
      genre
      authors
      averageRating
      description
      googleAverageRating
      image
      isFavorite
      downloadable
      year
      userId
      moreBooks{
        id
        name
        genre
        authors
        averageRating
        description
        googleAverageRating
        image
        downloadable
        year
        userId
      }
      reviews{
      id,
      review,
      reviewer,
      rating,
      picture
      avatarColor
      likes
      userId
      bookId
      createdAt
      updatedAt
      replies {
        id
        reply
        replier
        avatarColor
        picture
        likes
        userId
        reviewId
        createdAt
        updatedAt
      }
      }
    }
  }
`;

const fetchAllBooks = gql`
  {
    books{
      id
      name
      genre
      authors
      averageRating
      googleAverageRating
      year
      image
      userId
    }
  }
`;

const fetchUsersBooks = gql`
  query($token: String!) {
    usersBooks(token: $token) {
      id
      name
      genre
      authors
      averageRating
      googleAverageRating
      year
      image
      userId
    }
  }
`;

const removeFavoritesMutation = gql`
  mutation($books: [String]){
    removeFavorites(books: $books){
      message
    }
  }
`;

const getFavorites = gql`
  query($token: String) {
    favoriteBooks(token: $token) {
      id
      name
      genre
      authors
      averageRating
      description
      googleAverageRating
      image
      downloadable
      year
      userId
    }
  }
`;

const addToFavorites = gql`
  mutation($bookId: String){
    addFavorite(bookId: $bookId){
      message
    }
  }
`;

const removeBook = gql`
  mutation($bookId: String){
    deleteBook(bookId: $bookId){
      message
    }
  }
`;

export {
  fetchBook, fetchAllBooks,
  removeFavoritesMutation, addBook, fetchUsersBooks,
  removeBook, addToFavorites, getFavorites, bookFilter,
};
