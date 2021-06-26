import React, {
  useState, useEffect, createContext, useMemo,
  useContext,
} from 'react';

import { useHistory } from 'react-router-dom';
import Error from './pages/Error';

type ErrorHandlerProps = {
  children: React.ReactNode;
};

const ErrorStatusContext = createContext(undefined as any);

const ErrorHandler = ({ children }: ErrorHandlerProps) => {
  const history = useHistory();
  const [errorStatusCode, setErrorStatusCode] = useState('');

  useEffect(() => {
    const unlisten = history.listen(() => setErrorStatusCode(''));
    return unlisten;
  }, []);

  const renderContent = () => {
    if (errorStatusCode) {
      return <Error statusCode={errorStatusCode} />;
    }

    return children;
  };

  const contextPayload = useMemo(
    () => ({ setErrorStatusCode }),
    [setErrorStatusCode],
  );

  return (
    <ErrorStatusContext.Provider value={contextPayload}>
      {renderContent()}
    </ErrorStatusContext.Provider>
  );
};

const useErrorStatus = () => useContext(ErrorStatusContext);

export { useErrorStatus };
export default ErrorHandler;
