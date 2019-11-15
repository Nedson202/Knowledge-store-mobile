import React from 'react';
import { SearchBar, } from 'react-native-elements';
import { Platform } from 'react-native';
import {
  ios, android, SEARCH_PLACEHOLDER, georgia
} from '../../settings';

const SearchInput = ({
  handleSearchFocus, closeRecentSearches, searchText,
  handleSearch, showLoading
}) => {
  return (
    <SearchBar
      placeholder={SEARCH_PLACEHOLDER}
      platform={Platform.OS === ios ? ios : android}
      onFocus={handleSearchFocus}
      showLoading={showLoading}
      onCancel={closeRecentSearches}
      inputStyle={{ fontFamily: georgia }}
      onChangeText={handleSearch}
      value={searchText}
    />
  );
};

export default SearchInput;
