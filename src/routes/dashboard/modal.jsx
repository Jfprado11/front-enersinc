import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { postPerson } from '../../services/personData';
import { useDispatch, useSelector } from 'react-redux';
import { addPerson } from '../../slices/dataSlice';

import { setError, setErrorMessage } from '../../slices/uiSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal({ open, setOpen, text }) {
  const dispatch = useDispatch();

  // const people = useSelector((state) => state.data.person);
  const error = useSelector((state) => state.ui.error);
  const errorMessage = useSelector((state) => state.ui.errorMessage);

  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const lastName = event.target.last_name.value;
    const documentType = event.target.document_type.value;
    const document = event.target.document.value;
    const hobbie = event.target.hobbie.value;
    if (!name || !lastName || !documentType || !document || !hobbie) {
      dispatch(setError(true));
      dispatch(setErrorMessage('some fields are not fill yet'));
      setTimeout(() => {
        dispatch(setError(false));
        dispatch(setErrorMessage(''));
      }, 2000);
      return;
    }
    postPerson({ name, lastName, documentType, document, hobbie })
      .then((res) => {
        dispatch(addPerson(res));
        setOpen(false);
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
    <div>
      {error && (
        <Snackbar open={error} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '100%', backgroundColor: 'red', color: 'white' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Person
          </Typography>
          <TextField margin="normal" fullWidth id="name" label="Name" name="name" autoComplete="given-name" />
          <TextField
            margin="normal"
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="family-name"
          />
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="document_type">Document Type</InputLabel>
            <Select labelId="document_type" id="document_type" label="document_type" name="document_type">
              <MenuItem value="CC">Cedula ciudanida</MenuItem>
              <MenuItem value="TI">Tarjeta identidad</MenuItem>
              <MenuItem value="NUIP">Registro civil</MenuItem>
              <MenuItem value="CE">Ceduala extranjera</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" fullWidth id="document" label="Document" name="document" type="number" />
          <TextField margin="normal" fullWidth id="hobbie" label="Hobbie" name="hobbie" />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            {text}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default BasicModal;
