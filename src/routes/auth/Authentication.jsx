import { Box, Icon, TextField, Button, Typography, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setShowPassword, setError, setErrorMessage } from '../../slices/uiSlice';
import { setUserInfo } from '../../slices/userSlice';

// Services
import { login } from '../../services/authApi';

function Authentication({ isLoggin }) {
  const dispatch = useDispatch();
  const showPassword = useSelector((state) => state.ui.showPassword);
  const error = useSelector((state) => state.ui.error);
  const errorMessage = useSelector((state) => state.ui.errorMessage);

  if (isLoggin) return <Navigate to="/dashboard" replace />;

  const handleClickShowPassword = () => dispatch(setShowPassword(!showPassword));
  const handleMouseDownPassword = () => dispatch(setShowPassword(!showPassword));

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    login(username, password)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUserInfo({ isLoggin: true }));
        }
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
    <Box
      sx={{
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
      }}
    >
      {error && (
        <Snackbar open={error} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '100%', backgroundColor: 'red', color: 'white' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      <Icon sx={{ fontSize: 100 }}>person</Icon>
      <Typography component="h1" variant="h4">
        Sign in
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

export default Authentication;
