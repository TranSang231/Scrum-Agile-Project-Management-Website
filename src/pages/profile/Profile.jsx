// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  IconButton,
  Alert,
  Container,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import NavLeft from '../../components/layouts/NavLeft';
import NavTop from '../../components/layouts/NavTop';
import axios from 'axios';
import '../../assets/styles/pages/profile/Profile.scss';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        address: user.address || '',
      });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No token found');

      const profileResponse = await axios.get('http://localhost:8000/api/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!profileResponse.data || profileResponse.data.length === 0) {
        throw new Error('Profile not found');
      }

      const profileId = profileResponse.data[0].id;

      await axios.patch(`http://localhost:8000/api/profile/${profileId}/`, {
        phone_number: formData.phone_number,
        address: formData.address,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setError('');

      const updatedProfileResponse = await axios.get('http://localhost:8000/api/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (updatedProfileResponse.data && updatedProfileResponse.data.length > 0) {
        const profile = updatedProfileResponse.data[0];
        setFormData(prev => ({
          ...prev,
          phone_number: profile.phone_number || '',
          address: profile.address || ''
        }));
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Error updating profile');
    }
  };

  return (
    <div className="profile-container">
      <NavLeft />
      <div className="profile-content">
        <NavTop />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Profile Header */}
            <Grid item xs={12}>
              <Card>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={user?.avatar_url}
                    sx={{ width: 100, height: 100, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {formData.first_name && formData.last_name 
                        ? `${formData.first_name} ${formData.last_name}`
                        : formData.email}
                    </Typography>
                    <Typography color="textSecondary">
                      {formData.email}
                    </Typography>
                  </Box>
                  {!isEditing ? (
                    <IconButton 
                      onClick={handleEdit} 
                      color="primary" 
                      sx={{ ml: 'auto' }}
                    >
                      <EditIcon />
                    </IconButton>
                  ) : (
                    <Box sx={{ ml: 'auto' }}>
                      <IconButton onClick={handleSave} color="primary">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="error">
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Card>
            </Grid>

            {/* Alerts */}
            {(error || success) && (
              <Grid item xs={12}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
              </Grid>
            )}

            {/* Profile Details */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        disabled={true}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        disabled={true}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        disabled={true}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        variant="outlined"
                        placeholder="Enter your phone number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        variant="outlined"
                        placeholder="Enter your address"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
