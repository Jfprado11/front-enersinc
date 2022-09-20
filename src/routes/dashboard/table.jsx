import { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Box, FormControlLabel, IconButton, Icon, Button, Container, Snackbar, Alert } from '@mui/material';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { destroyPerson, fetchPersonAll } from '../../slices/dataSlice';

import EditModal from './editModal';
import ModalPerson from './modal';
import { deletePerson } from '../../services/personData';
import { setError, setErrorMessage } from '../../slices/uiSlice';

const MatEdit = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setOpen(true);
  };

  return (
    <>
      <EditModal open={open} setOpen={setOpen} text={'edit'} id={data.id} />
      <FormControlLabel
        control={
          <IconButton color="secondary" aria-label="add an alarm" onClick={handleEditClick}>
            <Icon sx={{ color: '#1976d2' }}>edit</Icon>
          </IconButton>
        }
      />
    </>
  );
};

const MatDelete = ({ data }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);
  const errorMessage = useSelector((state) => state.ui.errorMessage);

  const handleDeleteClick = () => {
    deletePerson(data.id)
      .then((res) => {
        dispatch(destroyPerson(res));
      })
      .catch((err) => {
        dispatch(setError(true));
        dispatch(setErrorMessage(err.message));
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setError(false));
          dispatch(setErrorMessage(''));
        }, 3000);
      });
  };

  return (
    <>
      {error && (
        <Snackbar open={error} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '100%', backgroundColor: 'red', color: 'white' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      <FormControlLabel
        control={
          <IconButton color="error" aria-label="add an alarm" onClick={handleDeleteClick}>
            <Icon>delete</Icon>
          </IconButton>
        }
      />
    </>
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
        <Container sx={{ display: 'flex', cursor: 'pointer' }}>
          <MatEdit data={params.row} />
          <MatDelete data={params.row} />
        </Container>
      );
    },
  },
];

function TablePerson() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const people = useSelector((state) => state.data.person, shallowEqual);

  const handleclick = (event) => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchPersonAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalPerson open={open} setOpen={setOpen} text={'create'} />
      <Button variant="contained" sx={{ position: 'absolute', top: '90px', right: '80px' }} onClick={handleclick}>
        Create Person
      </Button>
      <Box sx={{ width: '90%', margin: '0 auto', mt: 11, height: '70%', backgroundColor: 'white' }}>
        <DataGrid rows={people} columns={columns} pageSize={8} rowsPerPageOptions={[5]} />
      </Box>
    </>
  );
}

export default TablePerson;
