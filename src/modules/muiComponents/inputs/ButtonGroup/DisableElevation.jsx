import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const DisableElevation=()=> {
  return (
    <ButtonGroup disableElevation variant="contained">
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
  );
}
export default DisableElevation