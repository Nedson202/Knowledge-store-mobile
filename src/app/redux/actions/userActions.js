import { SET_LOGGEDIN_USER } from '../constants';

const setCurrentUser = user => ({
  type: SET_LOGGEDIN_USER,
  user
});

export { setCurrentUser, };
