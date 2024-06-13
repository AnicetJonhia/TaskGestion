import React from 'react';
import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';

import AllTasks from './TabsContent/AllTasks';
import TodoTasks from './TabsContent/TodoTasks';
import InProgressTasks from './TabsContent/InProgressTasks';
import CompletedTasks from './TabsContent/CompletedTasks';


const project = {
    name: 'Staak Project',
    category: 'Web',
    progress: 45,
    avatar: 'S',
    avatarColor: 'lightgreen'
};
const TabsContent = ({ activeTab }) => {
    return (
        <>
            <TabContext value={activeTab}>
                <TabPanel value="all">
                    <AllTasks project={project}/>
                </TabPanel>
                <TabPanel value="todo">
                    <TodoTasks />
                </TabPanel>
                <TabPanel value="inprogress">
                    <InProgressTasks />
                </TabPanel>
                <TabPanel value="completed">
                    <CompletedTasks />
                </TabPanel>
            </TabContext>
        </>
    );
};

export default TabsContent;
