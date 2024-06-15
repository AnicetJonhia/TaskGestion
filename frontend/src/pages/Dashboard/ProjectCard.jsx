import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg } from 'reactstrap';

const ProjectCard = ({ color, imgSrc, count, title }) => (
    <Card  className="my-2" color={color} inverse style={{ width: '13rem', boxShadow: '10px 10px 10px rgba(0.3, 0.3, 0.3, 0.3)' }}>
        <CardBody>
            <CardTitle className="mb-3">
                <CardImg alt="Card image cap" src={imgSrc} style={{ height: 100, width: 100 }} top />
            </CardTitle>
            <CardText tag="h2">{count}</CardText>
            <CardText>{title}</CardText>
        </CardBody>
    </Card>
);

export default ProjectCard;
