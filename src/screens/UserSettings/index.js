import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Switch } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useDispatch } from 'react-redux';

import HeaderTitle from '../../components/common/HeaderTitle';
import CustomText from '../../components/common/CustomText';
import { viewWidth } from '../../utils';
import { userSettingStyles } from '../../styles';
import { removeTokenFromStorage } from '../../utils';
import { setCurrentUser } from '../../redux/actions/userActions';

const settingsData = [
  {
    key: 1,
    value: 'Recommended books',
    switchRequired: true,
    active: false
  },
  {
    key: 2,
    value: 'Recent searches',
    switchRequired: true,
    active: false
  },
  {
    key: 3,
    value: 'Logout',
    switchRequired: false
  }
];

const UserSettings = () => {
  const [recentSearchActive, setRecentSearchActive] = useState(false);
  const dispatch = useDispatch();

  const handleUserLogout = async () => {
    await removeTokenFromStorage();
    dispatch(setCurrentUser());
  };

  const toggleRecentSearches = (value) => {
    setRecentSearchActive(value);
  };

  const groupMethods = {
    '2': toggleRecentSearches,
    '3': handleUserLogout
  };

  const groupActiveStatus = {
    '1': recentSearchActive
  };

  settingsData.forEach(setting => {
    const method = groupMethods[setting.key];
    const activeStatus = groupActiveStatus[setting.key];

    if (method) {
      setting.method = method;
    }

    if (activeStatus) {
      setting.active = activeStatus;
    }
  });

  const renderView = () => {
    const settingsItem = ({ id, value, switchRequired, active, method }) => (
      <View key={id} style={userSettingStyles.settingItem}>
        <TouchableWithoutFeedback
          onPress={method}
        >
          <CustomText style={userSettingStyles.settingItemText}>
            {value}
          </CustomText>
        </TouchableWithoutFeedback>
        {
          switchRequired &&
          <Switch
            value={active}
            onValueChange={method && method}
          />
        }
      </View>
    );

    return (
      <FlatGrid
        itemDimension={viewWidth}
        items={settingsData}
        renderItem={({ item }) => settingsItem(item)}
      />
    );
  };

  return (
    <React.Fragment>
      {renderView()}
    </React.Fragment>
  );
};

UserSettings.navigationOptions = {
  headerTitle: (
    <HeaderTitle title={'Settings'} />
  ),
  headerStyle: {
    elevation: 0
  }
};

export default UserSettings;

