import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  {
    id: 1,
    username: '@MUI',
    age: 38,
  },
];

const ColumnWidthGrid=()=> {
  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid columns={[{ field: 'username', width: 200 }, { field: 'age' }]} rows={rows} />
    </div>
  );
}
export default ColumnWidthGrid