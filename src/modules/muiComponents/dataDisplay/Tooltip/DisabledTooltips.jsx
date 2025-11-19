import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const DisabledTooltips=()=> {
  return (
    <Tooltip title="You don't have permission to do this">
      <span>
        <Button disabled>A Disabled Button</Button>
      </span>
    </Tooltip>
  );
}
export default DisabledTooltips