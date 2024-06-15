import React, { useEffect}from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import TODO from "../../assets/images/Dashboard/TODO.gif";
import INPROGRESS from "../../assets/images/Dashboard/INPROGRESS.gif";
import COMPLETED from "../../assets/images/Dashboard/COMPLETED.gif";

const ProjectSummary = () => {
    const [counts, setCounts] = React.useState({todoCount:0, inProgressCount:0,completedCount:0});
    useEffect(() => {
        // fonction pour récupérer les données de l'api
        const fetchTasksCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks/get-tasks-count');
                setCounts(response.data);
            } catch (error) {
                console.log( "Error fetching tasks counts",error);
            }

        };
        fetchTasksCounts();
    })

    return(
        <>
            <SectionHeader title="Project Summary"/>
            <Row>
                <Col>
                    <ProjectCard  color="primary" imgSrc={TODO} count={counts.todoCount} title="TODO Project"/>
                </Col>
                <Col>
                    <ProjectCard color="info" imgSrc={INPROGRESS} count={counts.inProgressCount} title="In Progress Project"/>
                </Col>
                <Col>
                    <ProjectCard color="success" imgSrc={COMPLETED} count={counts.completedCount} title="Completed Project"/>
                </Col>
            </Row>
        </>
    );
}

export default ProjectSummary;
