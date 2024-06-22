import React from 'react';
import {Container , Row, Col} from 'reactstrap';
import ProjectSummary from"./Dashboard/ProjectSummary";
import Tasks from"./Dashboard/Tasks";
const Dashboard = () => {
    return (
        <Container className={"container-fluid vh-100 d-flex flex-column"}>
            <Col className="flex-grow-1 overflow-y-auto overflow-y-auto-webkit-scrollbar">
                <Row className="justify-content-center text-primary mb-2 ">
                    <h1>Dashboard</h1>
                    <hr/>
                </Row>
                <Row className={"mb-3"}>
                    <ProjectSummary/>
                </Row>
                <Row className={"mb-5"}>
                    <Tasks/>
                </Row>
            </Col>
        </Container>
    );
};

export default Dashboard;