import { useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Box, FormControlLabel, IconButton, Icon } from '@mui/material';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchPersonAll } from '../../slices/dataSlice';

const MatEdit = ({ index }) => {
  const handleEditClick = () => {
    console.log(index);
  };

  return (
    <FormControlLabel
      control={
        <IconButton color="secondary" aria-label="add an alarm" onClick={handleEditClick}>
          <Icon sx={{ color: '#1976d2' }}>edit</Icon>
        </IconButton>
      }
    />
  );
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'last_name', headerName: 'Last Name', width: 200 },
  {
    field: 'document_type',
    headerName: 'Document Type',
    width: 140,
  },
  {
    field: 'document',
    headerName: 'Document',
    type: 'numeric',
    width: 140,
  },

  {
    field: 'hobbie',
    headerName: 'Hobbie',
    width: 250,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 140,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }}>
          <MatEdit index={params.row.id} />
        </div>
      );
    },
  },
];

function TablePerson() {
  const dispatch = useDispatch();

  const people = useSelector((state) => state.data.person, shallowEqual);

  useEffect(() => {
    dispatch(fetchPersonAll());
    console.log(people);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: '90%', margin: '0 auto', mt: 8, height: '70%', backgroundColor: 'white' }}>
      <DataGrid rows={people} columns={columns} pageSize={6} rowsPerPageOptions={[6]} checkboxSelection />
    </Box>
  );
}

export default TablePerson;
