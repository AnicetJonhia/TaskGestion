import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const TabsHeader = ({ activeTab, toggleTab }) => {
    return (
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
    );
}

export default TabsHeader;
