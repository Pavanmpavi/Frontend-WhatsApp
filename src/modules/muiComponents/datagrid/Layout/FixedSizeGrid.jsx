import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const FixedSizeGrid=()=> {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid {...data} />
      </div>
    </div>
  );
}
export default FixedSizeGrid