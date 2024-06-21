import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditTask = ({ task, editTask, setEditingTask }) => {
    const [taskName, setTaskName] = useState(task.name);

    useEffect(() => {
        setTaskName(task.name);
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTask({ ...task, name: taskName });
        setEditingTask(null);
    };

    return (
        <Modal isOpen={Boolean(task)} toggle={() => setEditingTask(null)}>
            <ModalHeader toggle={() => setEditingTask(null)}>Edit Task</ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <FormGroup>
                        <Label for="taskName">Task Name</Label>
                        <Input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">Save Changes</Button>{' '}
                    <Button color="secondary" onClick={() => setEditingTask(null)}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default EditTask;
