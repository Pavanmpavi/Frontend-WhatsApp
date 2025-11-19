import React from 'react';

export const usePrevious = (value) => {
  const ref = React.useRef(undefined);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
