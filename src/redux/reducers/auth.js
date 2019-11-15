import { SET_LOGGEDIN_USER } from '../constants';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGEDIN_USER: {
      const isUser = !!Object.keys(action.user || {}).length;

      return {
        ...state,
        isAuthenticated: isUser,
        user: action.user || {}
      };
    }

    default: return state;
  }
};
