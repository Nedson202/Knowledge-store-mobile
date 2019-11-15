import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import InitSetupProvider from './src/app/contexts/providers/InitSetupProvider';
import Navigator from './src/app/base/Navigator';
import { appRootStyle } from './src/app/styles';
import { store } from './src/app/graphql';
import Spinner from './src/app/components/common/Spinner';
import NavigationService from './src/app/base/NavigationService';
import useApolloClient from './src/app/components/CustomHooks/useApolloClient';

const App = () => {
  const [retrievingToken, setRetrievingToken] = useState(true);
  const client = useApolloClient();

  const getClient = async () => {
    if (client) {
      setRetrievingToken(false);
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  if (retrievingToken) {
    return (
      <Spinner />
    );
  }

  return (
    <View style={[appRootStyle.container]}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <InitSetupProvider>
            <Navigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </InitSetupProvider>
        </Provider>
      </ApolloProvider>
    </View>
  );
};

export default App;
