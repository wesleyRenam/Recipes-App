import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);

  const makeFetch = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`Ocorreu um erro, por favor tente novamente mais tarde. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    Error, isLoading, makeFetch,
  };
}

export default useFetch;
