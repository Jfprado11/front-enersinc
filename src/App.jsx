import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from './slices/userSlice';
import AuthenticationManager from './services/jwtAuth';
import './App.css';

// Routes
import Authentication from './routes/auth/Authentication';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './routes/dashboard/dashboard';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const auth = new AuthenticationManager();
    console.log(auth.currentToken);
    if (auth.currentToken) {
      dispatch(setUserInfo({ isLoggin: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="login"
          element={
            <Container maxWidth="xs" sx={{ pt: 9 }}>
              <Authentication isLoggin={user.isLoggin} />
            </Container>
          }
        />
        <Route path="dashboard" element={<Dashboard isLoggin={user.isLoggin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
