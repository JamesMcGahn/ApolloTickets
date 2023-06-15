import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import loginAUser from '../graphql/mutations/loginAUser';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({ password: '', email: '' });

  const [loggedIn, { data, loading, error }] = useMutation(loginAUser, {
    variables: { loginUser },
    onCompleted: () => {
      navigate('/agent/dashboard');
    },
    onError(err) {
      toast.error(err.message, {
        theme: 'colored',
      });
    },
  });

  const onChangeHandler = (e) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser.email && loginUser.password) {
      loggedIn(loginUser);
    } else {
      toast.error(
        `Fill in your ${
          !loginUser.email && !loginUser.password
            ? 'email and password.'
            : !loginUser.email
            ? 'email'
            : 'password'
        }`,
        {
          theme: 'colored',
        },
      );
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '90vh',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
        }}
        autoComplete="off"
      >
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="subtitle1" component="h2">
            Lets to Get Started.
          </Typography>
        </Container>
        <div>
          <TextField
            required
            type="text"
            id="email"
            label="Email"
            name="email"
            value={loginUser.email}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <TextField
            required
            type="password"
            id="password"
            label="Password"
            name="password"
            value={loginUser.password}
            onChange={onChangeHandler}
          />
        </div>
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
export default Login;
