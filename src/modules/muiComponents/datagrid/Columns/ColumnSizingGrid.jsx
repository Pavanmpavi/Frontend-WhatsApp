import * as React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';

const rows = [
  {
    id: 1,
    username: '@MUI',
    age: 20,
  },
];

const ColumnSizingGrid=()=> {
  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGridPro
        columns={[{ field: 'id' }, { field: 'username', minWidth: 150 }, { field: 'age', resizable: false }]}
        rows={rows}
      />
    </div>
  );
}
export default ColumnSizingGrid