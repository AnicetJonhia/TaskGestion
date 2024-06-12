import React from 'react';
import { TabContent, TabPane } from 'reactstrap';

const TabsContent = ({ activeTab }) => {
    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId="all" style={{ backgroundColor: 'transparent' }}>
                <p>All tasks content...</p>
            </TabPane>
            <TabPane tabId="todo" style={{ backgroundColor: 'transparent' }}>
                <p>TODO tasks content...</p>
            </TabPane>
            <TabPane tabId="inprogress" style={{ backgroundColor: 'transparent' }}>
                <p>In Progress tasks content...</p>
            </TabPane>
            <TabPane tabId="completed" style={{ backgroundColor: 'transparent' }}>
                <p>Completed tasks content...</p>
            </TabPane>
        </TabContent>
    );
}

export default TabsContent;
