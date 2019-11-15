import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function getParam(params) {
  _navigator.dispatch(
    NavigationActions.getParam(params)
  );
}

export default {
  navigate,
  getParam,
  setTopLevelNavigator,
};
