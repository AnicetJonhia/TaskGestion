import React from 'react';
import { Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

const TabsHeader = ({ activeTab, handleChange }) => {
    return (
        <TabContext value={activeTab}>
            <TabList
                onChange={handleChange}
                aria-label="Tasks tabs"
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab label="All Tasks" value="all" />
                <Tab label="TODO" value="todo" />
                <Tab label="In Progress" value="inprogress" />
                <Tab label="Completed" value="completed" />
            </TabList>
        </TabContext>
    );
};

export default TabsHeader;
