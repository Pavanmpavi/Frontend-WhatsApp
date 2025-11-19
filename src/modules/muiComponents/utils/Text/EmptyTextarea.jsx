import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const EmptyTextarea=()=> {
  return <TextareaAutosize aria-label="empty textarea" placeholder="Empty" style={{ width: 200 }} />;
}
export default EmptyTextarea