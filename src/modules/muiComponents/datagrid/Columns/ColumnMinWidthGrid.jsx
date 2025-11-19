import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  {
    id: 1,
    username: '@MUI',
    age: 38,
  },
];

const ColumnMinWidthGrid=()=> {
  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid columns={[{ field: 'username', minWidth: 150 }, { field: 'age' }]} rows={rows} />
    </div>
  );
}
export default ColumnMinWidthGrid