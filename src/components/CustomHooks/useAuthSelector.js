import 'react';
import { useSelector } from 'react-redux';

function useAuthSelector() {
  const authData = useSelector(({ auth }) => auth);
  const { isAuthenticated, user } = authData;

  return { isAuthenticated, user, auth: authData };
}

export default useAuthSelector;
