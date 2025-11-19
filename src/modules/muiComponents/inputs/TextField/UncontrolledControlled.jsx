import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const StateTextFields=()=> {
  const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-name" label="Name" value={name} onChange={handleChange} />
      <TextField id="outlined-uncontrolled" label="Uncontrolled" defaultValue="foo" />
    </Box>
  );
}
export default StateTextFields
