import React, { useState } from 'react';
import { Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import SectionHeader from './SectionHeader';

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
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames("justify-content-center text-primary text-body-tertiary fw-bolder", { active: activeTab === 'all' })}
                                onClick={() => { toggleTab('all'); }}
                            >
                                All Tasks
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames("justify-content-center text-primary text-body-tertiary fw-bolder", { active: activeTab === 'todo' })}
                                onClick={() => { toggleTab('todo'); }}
                            >
                                TODO
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames("justify-content-center text-primary text-body-tertiary fw-bolder", { active: activeTab === 'inprogress' })}
                                onClick={() => { toggleTab('inprogress'); }}
                            >
                                In Progress
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames("justify-content-center text-primary text-body-tertiary fw-bolder", { active: activeTab === 'completed' })}
                                onClick={() => { toggleTab('completed'); }}
                            >
                                Completed
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col className="text-end">
                    <Button color="primary" size="sm">
                        <i className="lni lni-plus"></i> Create
                    </Button>
                </Col>
            </Row>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="all" style={{backgroundColor: 'transparent'}}>
                    <p>All tasks content...</p>
                </TabPane>
                <TabPane tabId="todo" style={{backgroundColor: 'transparent'}}>
                    <p>TODO tasks content...</p>
                </TabPane>
                <TabPane tabId="inprogress" style={{backgroundColor: 'transparent'}}>
                    <p>In Progress tasks content...</p>
                </TabPane>
                <TabPane tabId="completed" style={{backgroundColor: 'transparent'}}>
                    <p>Completed tasks content...</p>
                </TabPane>
            </TabContent>
        </>
    );
}

export default Tasks;
