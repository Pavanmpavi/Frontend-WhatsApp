import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const DisableFilteringGrid=()=> {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        {...data}
        columns={data.columns.map((column) => ({
          ...column,
          filterable: false,
        }))}
      />
    </div>
  );
}
export default DisableFilteringGrid