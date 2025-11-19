import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const BasicSortingGrid=()=> {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'commodity',
      sort: 'asc',
    },
  ]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...data} sortModel={sortModel} onSortModelChange={(model) => setSortModel(model)} />
    </div>
  );
}
export default BasicSortingGrid