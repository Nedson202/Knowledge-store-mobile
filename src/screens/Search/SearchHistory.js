import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import CustomText from '../../components/common/CustomText';
import Icon from '../../components/common/Icon';

import { searchStyle } from '../../styles';
import { viewWidth } from '../../utils';
import { BLACK_4, GREY_1, CLOSE, ICON_30, TIME_ICON } from '../../settings';

const SearchHistory = (props) => {
  const { searchHistory, clearSearchHistory, navigateToResult } = props;

  const renderHistoryList = () => {
    const historyItem = ({ value, id }) => (
      <View key={id} style={searchStyle.historyListItem}>
        <TouchableWithoutFeedback
          onPress={navigateToResult(value)}
        >
          <View style={searchStyle.historyListItemLabel}>
            <Icon
              name={TIME_ICON}
              color={GREY_1}
              style={searchStyle.labelIcon}
            />
            <CustomText>
              {value}
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={clearSearchHistory(id)}
        >
          <Icon name={CLOSE} color={BLACK_4} />
        </TouchableWithoutFeedback>
      </View>
    );

    return (
      <FlatGrid
        itemDimension={viewWidth}
        style={searchStyle.history}
        items={searchHistory}
        renderItem={({ item }) => historyItem(item)}
      />
    );
  };

  const renderHistory = () => {
    if (!searchHistory.length) {
      return;
    }

    return (
      <View style={searchStyle.searchHistoryView}>
        <View style={searchStyle.recentSearchHeader}>
          <CustomText
            style={searchStyle.browseListHeader}
          >
            Recent Searches
          </CustomText>
          <TouchableWithoutFeedback
            onPress={clearSearchHistory()}
          >
            <Icon
              name={CLOSE}
              color={BLACK_4}
              size={ICON_30}
              style={searchStyle.closeIcon}
            />
          </TouchableWithoutFeedback>
        </View>
        {renderHistoryList()}
      </View>
    );
  };

  return (
    <View>
      {renderHistory()}
    </View>
  );
};

export default SearchHistory;
