import React, { useState } from 'react';
import { Button, TextField, Typography, Link, Paper, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: email,
                password: password
            });

            const token = response.data.token;

            // Save token in cookies
            Cookies.set('jwtToken', token);

            // console.log('JWT Token:', token);

            // Navigate to the homepage after successful login
            navigate('/home');
        } catch (error) {
            setError(error.response.data.message || 'Login failed');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
                <Typography component="h1" variant="h5" mb={2}>
                    Sign in
                </Typography>
                <form noValidate onSubmit={handleLogin}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography variant="body2" color="error" mt={1}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Sign In
                    </Button>
                    <Typography variant="body2" mt={2}>
                        Don't have an account? <Link component={RouterLink} to="/register">Sign up</Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
}

export default Login;
