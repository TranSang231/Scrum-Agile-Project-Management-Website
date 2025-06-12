import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import { useProject } from '../../contexts/ProjectContext';
import '../../assets/styles/pages/backlog/backlog.scss';
import NavTop from '../../components/layouts/NavTop';
import NavLeft from '../../components/layouts/NavLeft';
import BacklogColumn from './BacklogColumn';
import SprintColumn from './SprintColumn';
import axios from 'axios';

const Backlog = () => {
  const { projectId } = useParams();
  const { currentProject } = useProject();
  const navigate = useNavigate();
  const API_URL = 'http://localhost:8000/api';

  const [activeView, setActiveView] = useState('backlog');
  const [timeFilter, setTimeFilter] = useState('This week');
  const [activeSprint] = useState('Sprint 1');
  const [currentView] = useState('This week');
  const [allEpics, setAllEpics] = useState([]);
  const [sprints, setSprints] = useState([]);

  // Filter epics that don't belong to any sprint
  const backlogEpics = allEpics.filter(epic => !epic.sprint);

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
      navigate('/login');
      throw error;
    }
  };

  const fetchEpics = async () => {
    try {
      const response = await axios.get(`${API_URL}/epics/?project=${projectId}`, {
        headers: getAuthHeader()
      });
      setAllEpics(response.data);
    } catch (err) {
      console.error('Error fetching epics:', err);
    }
  };

  const fetchSprints = async () => {
    try {
      const response = await axios.get(`${API_URL}/sprints/?project=${projectId}`, {
        headers: getAuthHeader()
      });
      setSprints(response.data);
    } catch (err) {
      console.error('Error fetching sprints:', err);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchEpics();
      fetchSprints();
    }
  }, [projectId]);

   const handleSaveEpic = async (epicData) => {
    try {
      console.log('Saving epic:', epicData);
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login'); 
        return;
      }

      const epicPayload = {
        ...epicData,
        project: projectId
      };

      if (epicData.id) {
        // Update existing epic
        const response = await axios.put(
          `${API_URL}/epics/${epicData.id}/`,
          epicPayload,
          { headers: getAuthHeader() }
        );
        setAllEpics(allEpics.map(epic => 
          epic.id === epicData.id ? response.data : epic
        ));
      } else {
        // Create new epic
        const response = await axios.post(
          `${API_URL}/epics/`,
          epicPayload,
          { headers: getAuthHeader() }
        );
        setAllEpics([...allEpics, response.data]);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await refreshToken();
          return handleSaveEpic(epicData);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          navigate('/login');
        }
      }
      console.error('Error saving epic:', err);
    }
  };

  const handleDeleteEpic = async (epicId) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.delete(
        `${API_URL}/epics/${epicId}/`,
        { headers: getAuthHeader() }
      );
      setAllEpics(allEpics.filter(epic => epic.id !== epicId));
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await refreshToken();
          return handleDeleteEpic(epicId);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          navigate('/login');
        }
      }
      console.error('Error deleting epic:', err);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside a droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      // If moving from backlog to sprint
      if (source.droppableId === 'backlog') {
        console.log('Moving from backlog to sprint:', destination.droppableId);
        const response = await axios.patch(
          `${API_URL}/epics/${draggableId}/`,
          { sprint: parseInt(destination.droppableId) },
          { headers: getAuthHeader() }
        );
        console.log('API Response:', response.data);

        // Update all epics with the new data
        setAllEpics(allEpics.map(epic => 
          epic.id === parseInt(draggableId) ? response.data : epic
        ));
      }
      // If moving between sprints
      else if (source.droppableId !== 'backlog' && destination.droppableId !== 'backlog') {
        console.log('Moving between sprints:', source.droppableId, 'to', destination.droppableId);
        const response = await axios.patch(
          `${API_URL}/epics/${draggableId}/`,
          { sprint: parseInt(destination.droppableId) },
          { headers: getAuthHeader() }
        );
        console.log('API Response:', response.data);

        // Update all epics with the new data
        setAllEpics(allEpics.map(epic => 
          epic.id === parseInt(draggableId) ? response.data : epic
        ));
      }
      // If moving from sprint to backlog
      else {
        console.log('Moving from sprint to backlog');
        const response = await axios.patch(
          `${API_URL}/epics/${draggableId}/`,
          { sprint: null },
          { headers: getAuthHeader() }
        );
        console.log('API Response:', response.data);

        // Update all epics with the new data
        setAllEpics(allEpics.map(epic => 
          epic.id === parseInt(draggableId) ? response.data : epic
        ));
      }
    } catch (err) {
      console.error('Error moving epic:', err);
      // Refresh data to ensure UI is in sync with backend
      fetchEpics();
      fetchSprints();
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="backlog">
        <NavLeft activeView={activeView} setActiveView={setActiveView} />
        
        <div className="backlog__main">
          <NavTop />
          
          <div className="backlog__container">
            <div className="backlog__header">
              <h1 className="backlog__title">Backlog</h1>
              <div className="backlog__time-filter">
                <span className="backlog__time-filter-text">{timeFilter}</span>
                <svg className="backlog__time-filter-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <div className="backlog__content">
              <BacklogColumn 
                projectId={projectId}
                epics={backlogEpics}
                setEpics={setAllEpics}
                handleSaveEpic={handleSaveEpic}
                handleDeleteEpic={handleDeleteEpic}
              />
              <SprintColumn 
                activeSprint="Sprint 1" 
                projectId={projectId}
                sprints={sprints}
                setSprints={setSprints}
                allEpics={allEpics}
                handleSaveEpic={handleSaveEpic}
                handleDeleteEpic={handleDeleteEpic}
              />
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Backlog;