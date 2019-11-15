import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../redux/reducers/rootReducer';
import { REACT_APP_NODE_ENV, REACT_APP_PROD_SERVER } from '../../config';
import { getTokenFromStorage, } from '../utils';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(
  rootReducer,
  enhancer
);

const nodeEnv = process.env.REACT_APP_NODE_ENV || REACT_APP_NODE_ENV;
const prodServer = process.env.REACT_APP_PROD_SERVER || REACT_APP_PROD_SERVER;
const serverUrl = nodeEnv.match('production')
  ? prodServer : 'http://127.0.0.1:4000';

const httpLink = createHttpLink({
  uri: `${serverUrl}/graphql`,
});

const logger = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ));
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }

  if (response) {
    response.errors = null;
  }
});

export const clientHandler = async () => {
  const token = await getTokenFromStorage();
  const authLink = setContext((_, { headers }) => ({
    ...headers,
    headers: {
      authorization: `Bearer ${token || ''}`,
    }
  }));

  const authFlowLink = authLink.concat(logger);

  const client = new ApolloClient({
    link: authFlowLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return client;
};

export * from './books';
export * from './genre';
export * from './reviews';
export * from './user';
