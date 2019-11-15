import React from 'react';
import { Button } from 'react-native-elements';
import { View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import CustomText from '../../components/common/CustomText';
import Spinner from '../../components/common/Spinner';

import { searchStyle } from '../../styles';
import { OUTLINE_TYPE } from '../../settings';

const Browse = ({ navigateToResult, genreList, genreLoading }) => {
  const renderGenres = () => {
    if (genreLoading) {
      return <Spinner />;
    }

    const genres = ({ genre, id }) => (
      <Button
        key={id}
        title={genre}
        type={OUTLINE_TYPE}
        titleStyle={searchStyle.browseListItemText}
        buttonStyle={searchStyle.browseListItem}
        onPress={navigateToResult(genre)}
      />
    );

    return (
      <FlatGrid
        items={genreList}
        renderItem={({ item }) => genres(item)}
        spacing={20}
      />
    );
  };

  return (
    <View style={searchStyle.browseListView}>
      <CustomText
        style={searchStyle.browseListHeader}
      >
        Browse All
        </CustomText>
      {renderGenres()}
    </View>
  );
};

export default Browse;
