import { AsyncStorage } from 'react-native';

import { TOKEN_LABEL, HISTORY_KEY } from '../settings';

export const setTokenToStorage = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_LABEL, token);
  } catch (error) {
    return error;
  }
};

export const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_LABEL) || '';
    return token;
  } catch (error) {
    return error;
  }
};

export const removeTokenFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_LABEL);
  } catch (error) {
    return error;
  }
};

export const createSearchHistory = async (newHistory) => {
  const searchHistory = await AsyncStorage.getItem(HISTORY_KEY);
  try {
    const parsedHistory = JSON.parse(searchHistory) || [];
    const createUniqueItems = parsedHistory.filter(item => {
      if (item.value.toLowerCase() !== newHistory.toLowerCase()) {
        return item;
      }
    });

    const previousHistory = createUniqueItems.slice(0, 5);
    const historyItem = {
      id: createUniqueItems.length + Math.floor(Math.random() * 1000 + 100),
      value: newHistory,
    };
    const updatedHistory = JSON.stringify([historyItem, ...previousHistory]);

    await AsyncStorage.setItem(HISTORY_KEY, updatedHistory);
  } catch (error) {
    return error;
  }
};

export const retrieveSearchHistory = async () => {
  try {
    const searchHistory = await AsyncStorage.getItem(HISTORY_KEY);
    const parsedHistory = JSON.parse(searchHistory) || [];

    return parsedHistory;
  } catch (error) {
    return error;
  }
};

export const clearSearchHistory = (id, history) => {
  try {
    let filterHistory = [];

    if (id) {
      filterHistory = history.filter(item => item.id !== id);
    }

    const stringifyHistory = JSON.stringify(filterHistory);
    AsyncStorage.setItem(HISTORY_KEY, stringifyHistory);

    return filterHistory;
  } catch (error) {
    return error;
  }
};
