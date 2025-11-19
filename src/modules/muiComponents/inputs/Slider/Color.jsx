import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const valuetext=(value)=> {
  return `${value}°C`;
}

const ColorSlider=()=> {
  return (
    <Box sx={{ width: 300 }}>
      <Slider aria-label="Temperature" defaultValue={30} getAriaValueText={valuetext} color="secondary" />
    </Box>
  );
}
export default ColorSlider