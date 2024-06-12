import React from 'react';
import {Container , Row, Col} from 'reactstrap';
import ProjectSummary from"./Dashboard/ProjectSummary";
import Tasks from"./Dashboard/Tasks";
const Dashboard = () => {
    return (
        <Container className={"container-fluid"}>
            <Col>
                <Row className="justify-content-center text-primary mb-2 ">
                    <h1>Dashboard</h1>
                    <hr/>
                </Row>
                <Row className={"mb-3"}>
                    <ProjectSummary/>
                </Row>
                <Row>
                    <Tasks/>
                </Row>
            </Col>
        </Container>
    );
};

export default Dashboard;