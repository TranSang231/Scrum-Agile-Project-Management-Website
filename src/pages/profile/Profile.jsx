// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Divider,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import NavLeft from '../../components/layouts/NavLeft';
import NavTop from '../../components/layouts/NavTop';
import '../../assets/styles/pages/profile/Profile.scss';

const Profile = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone_number: '',
    address: '',
    avatarUrl: 'https://ui-avatars.com/api/?name=User&background=random'
  });
  const [editData, setEditData] = useState(userData);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user-profile/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const profile = data[0];
          const userData = {
            fullName: user?.first_name + ' ' + user?.last_name || '',
            email: user?.email || '',
            phone_number: profile.phone_number || '',
            address: profile.address || '',
            avatarUrl: profile.avatar || 'https://ui-avatars.com/api/?name=User&background=random'
          };
          setUserData(userData);
          setEditData(userData);
        }
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(userData);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user-profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          phone_number: editData.phone_number,
          address: editData.address,
        }),
      });

      if (response.ok) {
        setUserData(editData);
        setIsEditing(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(userData);
  };

  const handleChange = (field) => (event) => {
    setEditData({
      ...editData,
      [field]: event.target.value,
    });
  };

  return (
    <div className="dashboard">
      <NavLeft activeView={activeView} setActiveView={setActiveView} />
      <div className="dashboard__main">
        <NavTop />
        <div className="dashboard__container">
          <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h4" component="h1">
                Thông tin cá nhân
              </Typography>
              {!isEditing ? (
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              ) : (
                <Box>
                  <IconButton color="primary" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box display="flex" alignItems="center" mb={4}>
              <Avatar
                sx={{ width: 100, height: 100, mr: 3 }}
                src={userData.avatarUrl}
                alt={userData.fullName}
              />
              <Box>
                <Typography variant="h5">{userData.fullName}</Typography>
                <Typography color="textSecondary">{userData.email}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={userData.fullName}
                  disabled={true}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={userData.email}
                  disabled={true}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={isEditing ? editData.phone_number : userData.phone_number}
                  onChange={handleChange('phone_number')}
                  disabled={!isEditing}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  value={isEditing ? editData.address : userData.address}
                  onChange={handleChange('address')}
                  disabled={!isEditing}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Profile;
