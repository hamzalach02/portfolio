import React, { useState } from 'react';
import { Button, TextField, Typography, Link, Paper, Box, Snackbar, IconButton, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MultipleValueTextInput from 'react-multivalue-text-input';
import axios from 'axios'; // Import Axios
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skills, setSkills] = useState([]);
    const [website, setWebsite] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [job, setJob] = useState('');
    const [educationDegree, setEducationDegree] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleRegister = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/auth/signup', {
                email: email,
                password: password,
                fullName: name,
                website: website,
                birthdate: birthdate,
                job: job,
                educationDegree: educationDegree,
                skills: skills
            });

            console.log('Response:', response.data);
            console.log('Registration successful');

            // Navigate to the login page after successful registration
            navigate('/'); // Navigate to the login page

            // Show success message
            setSuccess(true);
        } catch (error) {
            setError(error.response.data.message || 'Registration failed');
            console.error('Registration error:', error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0', // Background shading color
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: '500px' }}>
                <Typography component="h1" variant="h5" mb={2}>
                    Sign up
                </Typography>
                <form noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                    <TextField
                        margin="normal"
                        fullWidth
                        id="website"
                        label="Website"
                        name="website"
                        autoComplete="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="birthdate"
                        label="Birthdate"
                        name="birthdate"
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="job"
                        label="Job"
                        name="job"
                        autoComplete="job-title"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="educationDegree"
                        label="Education Degree"
                        name="educationDegree"
                        autoComplete="education-degree"
                        value={educationDegree}
                        onChange={(e) => setEducationDegree(e.target.value)}
                    />
                    {/* Add the MultiValueTextInput for skills */}
                    <Typography variant="body1" mt={2}>
                        Skills
                    </Typography>
                    <div style={{ marginBottom: '16px' }}>
                        <MultipleValueTextInput
                            onItemAdded={(item) => setSkills([...skills, item])} // Add the new skill to the skills array
                            onItemDeleted={(item) => setSkills(skills.filter(skill => skill !== item))} // Remove the deleted skill from the skills array

                            name="skills"
                            placeholder="Enter your skills, separate them with commas or press enter"
                            deleteButton={<span>(x)</span>}
                            style={{ width: '100%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                        />
                    </div>
                    {/* End of MultiValueTextInput */}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleRegister}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                    <Typography variant="body2" mt={2}>
                        Already have an account? <Link component={RouterLink} to="/">Sign in</Link>
                    </Typography>
                </form>
                {/* Success message */}
                <Snackbar
                    open={success}
                    autoHideDuration={6000}
                    onClose={() => setSuccess(false)}
                    message="User created successfully"
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSuccess(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                    sx={{
                        backgroundColor: '#4caf50', // Green color for success message
                    }}
                />
            </Paper>
        </Box>
    );
}

export default Register;
