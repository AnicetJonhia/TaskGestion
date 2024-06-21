import React, { useState } from 'react';
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Create = ({ addTask }) => {
    const [modal, setModal] = useState(false);
    const [taskName, setTaskName] = useState("");

    const toggle = () => setModal(!modal);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ id: Date.now(), name: taskName, status: 'todo' });
        setTaskName("");
        toggle();
    };

    return (
        <div>
            <Tooltip title="Add Tasks" placement="top-start">
                <Fab variant="extended" color="primary" aria-label="add" onClick={toggle}>
                  <AddIcon /> Create
                </Fab>
            </Tooltip>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Task</ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="taskName">Task Name</Label>
                            <Input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Add Task</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
};

export default Create;
