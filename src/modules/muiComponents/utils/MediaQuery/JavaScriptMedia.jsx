import * as React from 'react';
import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';

const JavaScriptMedia=()=> {
  const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    }),
  );

  return <span>{`{ minWidth: 600 } matches: ${matches}`}</span>;
}
export default JavaScriptMedia