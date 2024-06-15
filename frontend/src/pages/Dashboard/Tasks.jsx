import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Box } from '@mui/material';
import SectionHeader from './SectionHeader';
import Create from '../../Components/utils/Create';
import TabsHeader    from "./Tasks/TabsHeader";
import TabsContent from './Tasks/TabsContent';

const Tasks = () => {
    const [activeTab, setActiveTab] = useState('all');

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <SectionHeader title="My tasks" />
            <Row>
                <Col>
                    <Box  sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabsHeader activeTab={activeTab} handleChange={handleChange} />
                    </Box>
                </Col>
                <Col className="text-end">
                    <Create />
                </Col>

            </Row>
            <Row >
                <TabsContent activeTab={activeTab}/>

            </Row>
        </>
    );
};

export default Tasks;
