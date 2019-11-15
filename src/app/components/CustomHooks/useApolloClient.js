import { useEffect, useState } from 'react';
import { clientHandler } from '../../graphql';

const useApolloClient = () => {
  const [client, setClient] = useState({});

  const getClient = async () => {
    const customClient = await clientHandler();

    setClient(customClient);
  };

  useEffect(() => {
    getClient();
  }, []
  );

  return client;
};

export default useApolloClient;
