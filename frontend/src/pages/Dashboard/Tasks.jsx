import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import SectionHeader from './SectionHeader';
import TabsHeader from './Tasks/TabsHeader';
import TabsContent from "./Tasks/TabsContent";
import Create from '../../Components/utils/Create'

const Tasks = () => {
    const [activeTab, setActiveTab] = useState('all');

    const toggleTab = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <SectionHeader title="My tasks" />
            <Row className="justify-content-between mb-3">
                <Col>
                    <TabsHeader activeTab={activeTab} toggleTab={toggleTab} />
                </Col>
                <Col className="text-end">
                    <Create/>
                </Col>
            </Row>
            <TabsContent activeTab={activeTab} />
        </>
    );
}

export default Tasks;
