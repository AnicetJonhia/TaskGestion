import React from 'react';
import { Row, Col } from 'reactstrap';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import TODO from "../../assets/images/Dashboard/TODO.gif";
import INPROGRESS from "../../assets/images/Dashboard/INPROGRESS.gif";
import COMPLETED from "../../assets/images/Dashboard/COMPLETED.gif";

const ProjectSummary = () => (
    <>
        <SectionHeader title="Project Summary" />
        <Row>
            <Col>
                <ProjectCard color="primary" imgSrc={TODO} count="17" title="TODO Project" />
            </Col>
            <Col>
                <ProjectCard color="info" imgSrc={INPROGRESS} count="04" title="In Progress Project" />
            </Col>
            <Col>
                <ProjectCard color="secondary" imgSrc={COMPLETED} count="02" title="Completed Project" />
            </Col>
        </Row>
    </>
);

export default ProjectSummary;
