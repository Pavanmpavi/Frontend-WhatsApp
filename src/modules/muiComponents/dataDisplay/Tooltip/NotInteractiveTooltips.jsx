import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const NotInteractiveTooltips=()=> {
  return (
    <Tooltip title="Add" disableInteractive>
      <Button>Not interactive</Button>
    </Tooltip>
  );
}
export default NotInteractiveTooltips