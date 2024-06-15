import React, { useEffect, useState } from 'react';
import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';

import AllTasks from './TabsContent/AllTasks';

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
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tasks/get-all-tasks');
                const data = await response.json();
                setTasks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

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
            <TabContext  value={activeTab}>
                <TabPanel value="all">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        projectsWithAvatars.map((project) => (
                            <AllTasks key={project._id} project={project} />
                        ))
                    )}
                </TabPanel>
                <TabPanel value="todo">
                    {loading ? (
                        <p>Loading...</p>
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
