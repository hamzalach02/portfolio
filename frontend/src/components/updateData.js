import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MultipleValueTextInput from 'react-multivalue-text-input';

function UserUpdate({ user }) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    website: '',
    birthdate: '',
    job: '',
    educationDegree: '',
    skills: []
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        fullName: user.fullName || '',
        website: user.website || '',
        birthdate: user.birthdate || '',
        job: user.job || '',
        educationDegree: user.educationDegree || '',
        skills: user.skills || []
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    const jwtToken = Cookies.get('jwtToken');
    axios.put('http://localhost:8080/auth/update', formData, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('User updated successfully:', response.data);
      // You can add further actions upon successful update if needed
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f3f6f8', borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{ style: { backgroundColor: '#fff', borderRadius: '4px' } }}
      />
      <TextField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{ style: { backgroundColor: '#fff', borderRadius: '4px' } }}
      />
      <TextField
        label="Website"
        name="website"
        value={formData.website}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{ style: { backgroundColor: '#fff', borderRadius: '4px' } }}
      />
      <TextField
        label="Birthdate"
        name="birthdate"
        type="date"
        value={formData.birthdate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        InputProps={{ style: { backgroundColor: '#fff', borderRadius: '4px' } }}
      />
      <TextField
        label="Job"
        name="job"
        value={formData.job}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{ style: { backgroundColor: '#fff', borderRadius: '4px' } }}
      />
      <TextField
        label="Education Degree"
        name="educationDegree"
        value={formData.educationDegree}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{ style: { backgroundColor: '#fff', borderRadius: '4px' } }}
      />
      <div style={{ width: '100%', marginBottom: '16px' }}>
        <label style={{ color: '#333', marginBottom: '8px', fontWeight: 'bold' }}>Skills:</label>
        <MultipleValueTextInput
          onItemAdded={(item) => setFormData(prevState => ({ ...prevState, skills: [...formData.skills, item] }))}
          onItemDeleted={(item) => setFormData(prevState => ({ ...prevState, skills: formData.skills.filter(skill => skill !== item) }))}
          name="skills"
          placeholder="Enter your skills, separate them with commas or press enter"
          deleteButton={<span style={{ color: '#333' }}>(x)</span>}
          values={formData.skills}
          style={{ width: '100%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px', backgroundColor: '#fff' }}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleUpdate} style={{ width: '100%', marginTop: '16px', backgroundColor: '#0077B5', color: '#fff', }}>
        Update Profile
      </Button>
    </div>
  );
}

export default UserUpdate;
