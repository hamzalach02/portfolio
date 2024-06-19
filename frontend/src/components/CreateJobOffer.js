import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';

const CreateJobOfferButton = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dynamicFields, setDynamicFields] = useState([{ name: 'Link', value: '' }]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const token = Cookies.get('jwtToken');

  const handleCreateJob = async () => {
    if (!validateForm()) {
      return;
    }

    setOpenDialog(false);
    setLoading(true);

    try {
      const additionalInfo = dynamicFields
        .filter(field => field.value)
        .map(field => `${field.name}: ${field.value}`)
        .join('\n\n');
      const fullDescription = `${description}${additionalInfo ? `\n\n${additionalInfo}` : ''}`;
      const response = await axios.post('http://localhost:8080/auth/createJob', {
        title: title,
        description: fullDescription,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSnackbarMessage('Job offer created successfully');
        setOpenSnackbar(true);
        setTitle('');
        setDescription('');
        setDynamicFields([{ name: 'Link', value: '' }]);
      }
    } catch (error) {
      setSnackbarMessage('Error creating job offer');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDynamicFieldChange = (index, value) => {
    const newFields = [...dynamicFields];
    newFields[index].value = value;
    setDynamicFields(newFields);
  };

  const handleAddField = () => {
    setDynamicFields([...dynamicFields, { name: '', value: '' }]);
  };

  const handleRemoveField = (index) => {
    const newFields = dynamicFields.filter((_, i) => i !== index);
    setDynamicFields(newFields);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            minWidth: 0,
            boxShadow: 3,
            backgroundImage: 'linear-gradient(to bottom right, #0077B5, #005f89)',
            '&:hover': {
              backgroundImage: 'linear-gradient(to bottom right, #005f89, #004866)',
              boxShadow: 6,
            },
            '&:active': {
              boxShadow: 12,
            },
            fontSize: 24,
            lineHeight: 1,
            padding: 0,
            color: 'white',
          }}
        >
          +
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Create Job Offer
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title}
              sx={{
                bgcolor: 'white',
                borderRadius: 1,
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description}
              sx={{
                bgcolor: 'white',
                borderRadius: 1,
              }}
            />
            {dynamicFields.map((field, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: 2 }}>
                <TextField
                  label={`Field ${index + 1} Name`}
                  variant="outlined"
                  value={field.name}
                  onChange={(e) => {
                    const newFields = [...dynamicFields];
                    newFields[index].name = e.target.value;
                    setDynamicFields(newFields);
                  }}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    flex: 1,
                    marginRight: 1,
                  }}
                />
                <TextField
                  label={`Field ${index + 1} Value`}
                  variant="outlined"
                  value={field.value}
                  onChange={(e) => handleDynamicFieldChange(index, e.target.value)}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    flex: 1,
                  }}
                />
                <Button
                  onClick={() => handleRemoveField(index)}
                  color="secondary"
                  sx={{ marginLeft: 1 }}
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Button
              onClick={handleAddField}
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, backgroundColor: '#0077B5' }}
            >
              Add Field
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateJob}
            disabled={loading}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0077B5',
              color: 'white',
              '&:hover': {
                backgroundColor: '#005f89',
              },
              '&:active': {
                backgroundColor: '#004866',
              },
              padding: '8px 16px',
              boxShadow: 1,
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s',
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('successfully') ? "success" : "error"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateJobOfferButton;
