import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import InitSetupProvider from './src/contexts/providers/InitSetupProvider';
import Navigator from './src/base/Navigator';
import { appRootStyle } from './src/styles';
import { store, clientHandler } from './src/graphql';
import Spinner from './src/components/common/Spinner';
import NavigationService from './src/navigation';

const App = () => {
  const [client, setClient] = useState({});
  const [retrievingToken, setRetrievingToken] = useState(true);

  const getClient = async () => {
    const customClient = await clientHandler();

    setClient(customClient);
    setRetrievingToken(false);
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
