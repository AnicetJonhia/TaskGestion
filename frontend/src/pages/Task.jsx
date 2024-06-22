import React from 'react';
import { Row, Container, Col } from "reactstrap";
import Create from '../Components/utils/Create';
import TaskBoard from './Task/TaskBord';


const Task = () => {
    return (
        <Container className={"container-fluid vh-100 d-flex flex-column"}>
            <Col className="flex-grow-1 overflow-y-auto overflow-y-auto-webkit-scrollbar">
                <Row className="justify-content-center text-primary mb-2">
                    <Col className=" align-items-center">
                        <h1 className="me-1">Task</h1>
                        <hr className=" d-block flex-grow-1"/>
                    </Col>
                    <Col className={"d-flex justify-content-end"}>
                        <Create/>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <TaskBoard/>
                </Row>
            </Col>
        </Container>
    );
};

export default Task;
