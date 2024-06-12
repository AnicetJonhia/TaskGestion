import React from 'react';
import { Row } from 'reactstrap';

const SectionHeader = ({ title }) => (
    <Row className="justify-content-center text-primary mb-2 text-body-emphasis fw-bold">
        <span>{title}</span>
    </Row>
);

export default SectionHeader;
