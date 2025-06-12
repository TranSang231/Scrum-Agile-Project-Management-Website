import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
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
              />
              <SprintColumn 
                activeSprint="Sprint 1" 
                projectId={projectId}
                sprints={sprints}
                setSprints={setSprints}
                allEpics={allEpics}
              />
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Backlog;