import * as React from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const SliderSizes=()=> {
  return (
    <Box
      sx={{
        width: 300,
      }}
    >
      <Slider size="small" defaultValue={70} aria-label="Small" valueLabelDisplay="auto" />
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  );
}
export default SliderSizes
