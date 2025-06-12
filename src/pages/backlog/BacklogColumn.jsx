import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Droppable } from '@hello-pangea/dnd';
import '../../assets/styles/pages/backlog/backlogColumn.scss';
import EpicCard from "../../components/backlog/EpicCard";
import UserStoryCard from "../../components/backlog/UserStoryCard";
import EditEpicForm from "../../components/backlog/EditEpicForm";
import EditUserStoryForm from "../../components/backlog/EditUserStoryForm";
import axios from 'axios';

const BacklogColumn = ({ projectId, epics, setEpics, handleSaveEpic, handleDeleteEpic }) => {
    const API_URL = 'http://localhost:8000/api';
    const navigate = useNavigate();

    const [isCreatingEpic, setCreatingEpic] = useState(false);
    const [isCreatingUserStory, setCreatingUserStory] = useState(false);
    const [userStories, setUserStories] = useState([]);
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
            navigate('/login');
            throw error;
        }
    };

    // const fetchEpics = async () => {
    //     try {
    //         const token = localStorage.getItem('access_token');
    //         if (!token) {
    //             navigate('/login');
    //             return;
    //         }

    //         const response = await axios.get(`${API_URL}/epics/?project=${projectId}`, {
    //             headers: getAuthHeader()
    //         });

    //         console.log('Fetched epics for project:', projectId, response.data);
    //         setEpics(response.data);
    //     } catch (err) {
    //         if (err.response?.status === 401) {
    //             try {
    //                 await refreshToken();
    //                 return fetchEpics();
    //             } catch (refreshError) {
    //                 console.error('Token refresh failed:', refreshError);
    //                 navigate('/login');
    //             }
    //         }
    //         setError('Failed to fetch epics');
    //         console.error('Error fetching epics:', err);
    //     }
    // };

    const fetchUserStories = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get(`${API_URL}/user-stories/?project=${projectId}`, {
                headers: getAuthHeader()
            });

            console.log('Fetched user stories for project:', projectId, response.data);
            setUserStories(response.data);
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 401) {
                try {
                    await refreshToken();
                    return fetchUserStories();
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    navigate('/login');
                }
            }
            setError('Failed to fetch user stories');
            setLoading(false);
            console.error('Error fetching user stories:', err);
        }
    };

    useEffect(() => {
        if (projectId) {
            console.log('Fetching data for project:', projectId);
            // fetchEpics();
            fetchUserStories();
        }
    }, [projectId]);

    const handleCreateEpic = () => {
        setCreatingEpic(true);
    };

    // const handleCreateUserStory = () => {
    //     setCreatingUserStory(true);
    // };

    // const handleSaveEpic = async (epicData) => {
    //     try {
    //         console.log('0', epicData);
    //         const token = localStorage.getItem('access_token');
    //         if (!token) {
    //             navigate('/login'); 
    //             return;
    //         }

    //         console.log('1')

    //         const epicPayload = {
    //             ...epicData,
    //             project: projectId
    //         };

    //         console.log('2', epicPayload)

    //         if (epicData.id) {
    //             console.log("3")
    //             // Update existing epic
    //             const response = await axios.put(
    //                 `${API_URL}/epics/${epicData.id}/`,
    //                 epicPayload,
    //                 { headers: getAuthHeader() }
    //             );
    //             setEpics(epics.map(epic => 
    //                 epic.id === epicData.id ? response.data : epic
    //             ));
    //         } else {
    //             console.log("4")
    //             // Create new epic
    //             const response = await axios.post(
    //                 `${API_URL}/epics/`,
    //                 epicPayload,
    //                 { headers: getAuthHeader() }
    //             );
    //             setEpics([...epics, response.data]);
    //         }
    //         console.log('5')
    //         setCreatingEpic(false);
    //     } catch (err) {
    //         if (err.response?.status === 401) {
    //             try {
    //                 await refreshToken();
    //                 return handleSaveEpic(epicData);
    //             } catch (refreshError) {
    //                 console.error('Token refresh failed:', refreshError);
    //                 navigate('/login');
    //             }
    //         }
    //         console.error('Error saving epic:', err);
    //         setError('Failed to save epic');
    //     }
    // };

    // const handleSaveUserStory = async (userStoryData) => {
    //     try {
    //         const token = localStorage.getItem('access_token');
    //         if (!token) {
    //             navigate('/login');
    //             return;
    //         }

    //         const userStoryPayload = {
    //             ...userStoryData,
    //             project: projectId
    //         };

    //         if (userStoryData.id) {
    //             // Update existing user story
    //             const response = await axios.put(
    //                 `${API_URL}/user-stories/${userStoryData.id}/`,
    //                 userStoryPayload,
    //                 { headers: getAuthHeader() }
    //             );
    //             setUserStories(userStories.map(story => 
    //                 story.id === userStoryData.id ? response.data : story
    //             ));
    //         } else {
    //             // Create new user story
    //             const response = await axios.post(
    //                 `${API_URL}/user-stories/`,
    //                 userStoryPayload,
    //                 { headers: getAuthHeader() }
    //             );
    //             setUserStories([...userStories, response.data]);
    //         }
    //         setCreatingUserStory(false);
    //     } catch (err) {
    //         if (err.response?.status === 401) {
    //             try {
    //                 await refreshToken();
    //                 return handleSaveUserStory(userStoryData);
    //             } catch (refreshError) {
    //                 console.error('Token refresh failed:', refreshError);
    //                 navigate('/login');
    //             }
    //         }
    //         console.error('Error saving user story:', err);
    //         setError('Failed to save user story');
    //     }
    // };

    // const handleDeleteEpic = async (epicId) => {
    //     try {
    //         const token = localStorage.getItem('access_token');
    //         if (!token) {
    //             navigate('/login');
    //             return;
    //         }

    //         await axios.delete(
    //             `${API_URL}/epics/${epicId}/`,
    //             { headers: getAuthHeader() }
    //         );
    //         setEpics(epics.filter(epic => epic.id !== epicId));
    //     } catch (err) {
    //         if (err.response?.status === 401) {
    //             try {
    //                 await refreshToken();
    //                 return handleDeleteEpic(epicId);
    //             } catch (refreshError) {
    //                 console.error('Token refresh failed:', refreshError);
    //                 navigate('/login');
    //             }
    //         }
    //         console.error('Error deleting epic:', err);
    //         setError('Failed to delete epic');
    //     }
    // };

    // const handleDeleteUserStory = async (userStoryId) => {
    //     try {
    //         const token = localStorage.getItem('access_token');
    //         if (!token) {
    //             navigate('/login');
    //             return;
    //         }

    //         await axios.delete(
    //             `${API_URL}/user-stories/${userStoryId}/`,
    //             { headers: getAuthHeader() }
    //         );
    //         setUserStories(userStories.filter(story => story.id !== userStoryId));
    //     } catch (err) {
    //         if (err.response?.status === 401) {
    //             try {
    //                 await refreshToken();
    //                 return handleDeleteUserStory(userStoryId);
    //             } catch (refreshError) {
    //                 console.error('Token refresh failed:', refreshError);
    //                 navigate('/login');
    //             }
    //         }
    //         console.error('Error deleting user story:', err);
    //         setError('Failed to delete user story');
    //     }
    // };

    const handleEpicMovedToSprint = (epicId) => {
        // Remove the epic from the backlog
        setEpics(epics.filter(epic => epic.id !== epicId));
    };

    const renderEpicList = (provided, snapshot) => (
        <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`backlog__epic-list ${snapshot.isDraggingOver ? 'backlog__epic-list--dragging-over' : ''}`}
        >
            {epics && epics.length > 0 ? (
                epics.map((epic, index) => (
                    <EpicCard
                        key={epic.id}
                        epic={epic}
                        index={index}
                        onEditSave={handleSaveEpic}
                        onDelete={handleDeleteEpic}
                        isInSprint={false}
                    />
                ))
            ) : (
                <div className="no-epics">No epics found</div>
            )}
            {provided.placeholder}
        </div>
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="backlog__column">
            <div className="backlog__column-content">
                <div className="backlog__column-header">
                    <h2 className="backlog__column-title">Product Backlog</h2>
                    {/* <div className="backlog__column-actions">
                        <button className="backlog__column-button backlog__column-button--icon">
                            <svg className="backlog__column-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                        <button className="backlog__column-button backlog__column-button--icon">
                            <svg className="backlog__column-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </button>
                    </div> */}
                </div>

                {isCreatingEpic && (
                    <EditEpicForm
                        isCreating={true}
                        onSave={handleSaveEpic}
                        onCancel={() => setCreatingEpic(false)}
                        projectId={projectId}
                    />
                )}

                {/* {isCreatingUserStory && (
                    <EditUserStoryForm
                        isCreating={true}
                        onSave={handleSaveUserStory}
                        onCancel={() => setCreatingUserStory(false)}
                        projectId={projectId}
                    />
                )} */}

                <Droppable droppableId="backlog">
                    {renderEpicList}
                </Droppable>

                {/* <div className="backlog__user-story-list">
                    {userStories && userStories.length > 0 ? (
                        userStories.map((userStory) => (
                            <UserStoryCard
                                key={userStory.id}
                                userStory={userStory}
                                onEditSave={handleSaveUserStory}
                                onDelete={handleDeleteUserStory}
                            />
                        ))
                    ) : (
                        <div className="no-user-stories">No user stories found</div>
                    )}
                </div> */}
            </div>

            <div className="backlog__column-buttons">
                <button
                    className="backlog__column-button backlog__column-button--create backlog__column-button--epic"
                    onClick={handleCreateEpic}
                >
                    Create Epic
                </button>
                {/* <button
                    className="backlog__column-button backlog__column-button--create backlog__column-button--user-story"
                    onClick={handleCreateUserStory}
                >
                    Create User Story
                </button> */}
            </div>
        </div>
    );
};

export default BacklogColumn;