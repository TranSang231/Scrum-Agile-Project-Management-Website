import '../../assets/styles/pages/backlog/sprintColumn.scss';
import React, { useState, useEffect } from "react";
import CreateSprintForm from "../../components/backlog/createSprintForm.jsx";
import EditSprintForm from "../../components/backlog/editSprintForm.jsx";
import SprintCard from "../../components/backlog/SprintCard";
import axios from 'axios';

const SprintColumn = ({ projectId }) => {
  const API_URL = 'http://localhost:8000/api';
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sprints, setSprints] = useState([]);
  const [currentSprint, setCurrentSprint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: refreshToken
      });

      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
      throw error;
    }
  };

  const fetchSprints = async () => {
    try {
      const response = await axios.get(`${API_URL}/sprints/?project=${projectId}`, {
        headers: getAuthHeader()
      });
      setSprints(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await refreshToken();
          return fetchSprints();
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          window.location.href = '/login';
        }
      }
      setError('Failed to fetch sprints');
      setLoading(false);
      console.error('Error fetching sprints:', err);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchSprints();
    }
  }, [projectId]);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditSprint = (sprint) => {
    setCurrentSprint(sprint);
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentSprint(null);
  };

  const handleCreateSprint = async (sprintData) => {
    try {
      const response = await axios.post(
        `${API_URL}/sprints/`,
        {
          ...sprintData,
          project: projectId
        },
        { headers: getAuthHeader() }
      );
      setSprints([...sprints, response.data]);
      setIsCreateModalOpen(false);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await refreshToken();
          return handleCreateSprint(sprintData);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          window.location.href = '/login';
        }
      }
      console.error('Error creating sprint:', err);
      setError('Failed to create sprint');
    }
  };

  const handleSaveSprint = async (sprintData) => {
    try {
      const response = await axios.put(
        `${API_URL}/sprints/${currentSprint.id}/`,
        {
          ...sprintData,
          project: projectId
        },
        { headers: getAuthHeader() }
      );
      setSprints(sprints.map(sprint => 
        sprint.id === currentSprint.id ? response.data : sprint
      ));
      setIsEditModalOpen(false);
      setCurrentSprint(null);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await refreshToken();
          return handleSaveSprint(sprintData);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          window.location.href = '/login';
        }
      }
      console.error('Error updating sprint:', err);
      setError('Failed to update sprint');
    }
  };
  
  const handleDeleteSprint = async (sprintId) => {
    if (window.confirm('Are you sure you want to delete this sprint?')) {
      try {
        await axios.delete(
          `${API_URL}/sprints/${sprintId}/`,
          { headers: getAuthHeader() }
        );
        setSprints(sprints.filter(sprint => sprint.id !== sprintId));
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            await refreshToken();
            return handleDeleteSprint(sprintId);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            window.location.href = '/login';
          }
        }
        console.error('Error deleting sprint:', err);
        setError('Failed to delete sprint');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sprint__column">
      <button 
        className="sprint__button sprint__button--create" 
        onClick={handleOpenCreateModal}
      >
        Create Sprint
      </button>

      <div className="sprint__container">
        {sprints.map(sprint => (
          <SprintCard
            key={sprint.id}
            sprint={sprint}
            onEdit={handleEditSprint}
            onDelete={handleDeleteSprint}
          />
        ))}
      </div>

      <CreateSprintForm 
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateSprint}
      />

      <EditSprintForm 
        isOpen={isEditModalOpen}
        currentSprint={currentSprint}
        onClose={handleCloseEditModal}
        onSave={handleSaveSprint}
      />
    </div>
  );
};

export default SprintColumn;
