import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { setUserInfo } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import authenticationManager from '../../services/jwtAuth';

// import MenuIcon from '@mui/icons-material/Menu';

// import { AppBar, Box, Toolbar, Typography, Button, IconButton, MenuIcon } from '@mui/material';

function ButtonAppBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUserInfo({ isLoggin: false }));
    authenticationManager.logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Person Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;
