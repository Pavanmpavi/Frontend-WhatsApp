import React from 'react';

export const useTimeout = (callback, delay) => {
  const savedCallback = React.useRef(undefined);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick=() =>{
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};
