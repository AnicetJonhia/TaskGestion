import React, { useEffect, useState } from 'react';
import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import axios from 'axios';
import AllTasks from './TabsContent/AllTasks';
// import socketIOClient from 'socket.io-client';
//
// const ENDPOINT = 'http://localhost:5000';
// Function to get the first letter of the project name
const getAvatarLetter = (title) => {
    return title ? title.charAt(0) : '';
};

// Function to get the avatar color based on status
const getAvatarColor = (status) => {
    switch (status) {
        case 'Todo':
            return '#007bff'; // primary color
        case 'In progress':
            return '#17a2b8'; // info color
        case 'Completed':
            return '#28a745'; // success color
        default:
            return '#000000'; // default color
    }
};

const TabsContent = ({ activeTab }) => {
    const [tasks, setTasks] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/tasks/get-all-tasks', {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    }
                });
                if (Array.isArray(response.data.tasks)) {
                    setTasks(response.data.tasks); // Access tasks array from response.data.tasks
                } else {
                    setTasks([]); // Set to an empty array if not
                }
                setLoading(false);
                console.log("Data:", response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError(error.message); // Set error state with error message
                setLoading(false);
                // Handle errors as needed
            }
        };

        fetchTasks();


    }, []); // Only run once when the component mounts

    const getProjectsWithAvatars = (tasks) => {
        return tasks.map(task => ({
            ...task,
            avatar: getAvatarLetter(task.title),
            avatarColor: getAvatarColor(task.status)
        }));
    };

    const projectsWithAvatars = getProjectsWithAvatars(tasks);

    return (
        <>
            <TabContext value={activeTab}>
                <TabPanel value="all">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        projectsWithAvatars.map((project) => {
                            console.log('Project:', project); // Vérifiez la structure de project
                            return <AllTasks key={project._id} project={project} />;
                        })
                    )}
                </TabPanel>
                <TabPanel value="todo">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        projectsWithAvatars
                            .filter((project) => project.status === 'Todo')
                            .map((project) => (
                                <AllTasks key={project._id} project={project} />
                            ))
                    )}
                </TabPanel>
                <TabPanel value="inprogress">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        projectsWithAvatars
                            .filter((project) => project.status === 'In progress')
                            .map((project) => (
                                <AllTasks key={project._id} project={project} />
                            ))
                    )}
                </TabPanel>
                <TabPanel value="completed">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        projectsWithAvatars
                            .filter((project) => project.status === 'Completed')
                            .map((project) => (
                                <AllTasks key={project._id} project={project} />
                            ))
                    )}
                </TabPanel>
            </TabContext>
        </>
    );
};

export default TabsContent;
