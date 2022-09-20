import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { putPerson } from '../../services/personData';
import { useDispatch, useSelector } from 'react-redux';
import { updatePerson } from '../../slices/dataSlice';

import { setError, setErrorMessage } from '../../slices/uiSlice';
import { useEffect } from 'react';
import { useState } from 'react';

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

function EditModal({ open, setOpen, text, id }) {
  const dispatch = useDispatch();

  const [namePerson, setNamePerson] = useState('');
  const [lastNamePerson, setLastNamePerson] = useState('');
  const [documentTypePerson, setDocumentTypePerson] = useState('');
  const [documentNumberPerson, setDocumentNumberPerson] = useState('');
  const [hobbiePerson, setHobbiePerson] = useState('');

  const people = useSelector((state) => state.data.person);
  const error = useSelector((state) => state.ui.error);
  const errorMessage = useSelector((state) => state.ui.errorMessage);

  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = namePerson;
    const lastName = lastNamePerson;
    const documentType = documentTypePerson;
    const document = documentNumberPerson;
    const hobbie = hobbiePerson;
    putPerson({ name, lastName, documentType, document, hobbie, id })
      .then((res) => {
        dispatch(updatePerson(res));
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

  useEffect(() => {
    const person = people.filter((data) => data.id === id)[0];
    setNamePerson(person['name']);
    setLastNamePerson(person['last_name']);
    setDocumentTypePerson(person['document_type']);
    setDocumentNumberPerson(person['document']);
    setHobbiePerson(person['hobbie']);
  }, []);

  const handlePersonName = (e) => {
    setNamePerson(e.target.value);
  };

  const handlePersonLastName = (e) => {
    setLastNamePerson(e.target.value);
  };

  const handleDocumentType = (e) => {
    setDocumentTypePerson(e.target.value);
  };

  const handleDocumentNumber = (e) => {
    setDocumentNumberPerson(e.target.value);
  };

  const habldeHobbie = (e) => {
    setHobbiePerson(e.target.value);
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
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="given-name"
            value={namePerson}
            onChange={handlePersonName}
          />
          <TextField
            margin="normal"
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="family-name"
            value={lastNamePerson}
            onChange={handlePersonLastName}
          />
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="document_type">Document Type</InputLabel>
            <Select
              labelId="document_type"
              id="document_type"
              label="document_type"
              name="document_type"
              value={documentTypePerson}
              onChange={handleDocumentType}
            >
              <MenuItem value="CC">Cedula ciudanida</MenuItem>
              <MenuItem value="TI">Tarjeta identidad</MenuItem>
              <MenuItem value="NUIP">Registro civil</MenuItem>
              <MenuItem value="CE">Ceduala extranjera</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="document"
            label="Document"
            name="document"
            type="number"
            value={documentNumberPerson}
            onChange={handleDocumentNumber}
          />
          <TextField
            margin="normal"
            fullWidth
            id="hobbie"
            label="Hobbie"
            name="hobbie"
            value={hobbiePerson}
            onChange={habldeHobbie}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            {text}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default EditModal;
