import * as React from 'react';
import mediaQuery from 'css-mediaquery';

import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MyComponent=()=>  {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}

const ServerSide=()=> {
  const ssrMatchMedia = (query) => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width: 800,
    }),
  });

  return (
    <ThemeProvider
      theme={{
        components: {
          MuiUseMediaQuery: {
            // Change the default options of useMediaQuery
            defaultProps: { ssrMatchMedia },
          },
        },
      }}
    >
      <MyComponent />
    </ThemeProvider>
  );
}
export default ServerSide
