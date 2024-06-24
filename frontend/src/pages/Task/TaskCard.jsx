import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardBody, CardTitle, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Button } from 'reactstrap';
import LinearProgress from '@mui/material/LinearProgress';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { deleteTask, updateTask } from '../../services/api'; // Assurez-vous d'importer correctement votre fonction deleteTask et updateTask

const TaskCard = ({ task, onDelete, onUpdate }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { type: 'TASK', id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' ou 'error'
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        category: task.category,
        priority: task.priority,
    });
    const [errors, setErrors] = useState({});

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'low':
                return 'primary';
            case 'medium':
                return 'success';
            case 'high':
                return 'error';
            default:
                return 'primary'; // Default color if priority doesn't match
        }
    };

    const handleDeleteClick = async () => {
        try {
            const message = await deleteTask(task._id);
            setSnackbarMessage(message);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            onDelete(task._id); // Appel d'une fonction parente pour mettre à jour l'état des tâches après la suppression
        } catch (error) {
            console.error('Failed to delete task:', error);
            setSnackbarMessage('Failed to delete task');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setErrors({});
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!editFormData.title) newErrors.title = 'Title is required';
        if (!editFormData.description) newErrors.description = 'Description is required';
        if (!editFormData.dueDate) newErrors.dueDate = 'Due date is required';
        if (!editFormData.category) newErrors.category = 'Category is required';
        if (!editFormData.priority) newErrors.priority = 'Priority is required';
        return newErrors;
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            try {
                const updatedTask = await updateTask(task._id, editFormData);
                setSnackbarMessage('Task updated successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                onUpdate(updatedTask); // Appel d'une fonction parente pour mettre à jour l'état des tâches après la modification
                handleEditModalClose();
            } catch (error) {
                console.error('Error:', error);
                setSnackbarMessage('Failed to update task');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const actions = [
        { icon: <EditIcon />, name: 'Edit', onClick: handleEditClick },
        { icon: <DeleteIcon />, name: 'Delete', onClick: handleDeleteClick }
    ];

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, position: 'relative' }}>
            <Card className={`mb-1 border-${getPriorityColor(task.priority)}`}>
                <CardBody>
                    <Col xs={8}>
                        <CardTitle>{task.title}</CardTitle>
                        <LinearProgress variant="determinate" value={100} color={getPriorityColor(task.priority)} />
                    </Col>
                    <Col xs={4} className="text-end">
                        <SpeedDial
                            ariaLabel="Actions"
                            sx={{
                                position: 'absolute',
                                bottom: 24,
                                right: 5,
                                '& .MuiSpeedDial-fab': {
                                    width: '32px',
                                    height: '32px',
                                },
                            }}
                            icon={<SpeedDialIcon />}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={action.onClick}
                                />
                            ))}
                        </SpeedDial>
                    </Col>
                </CardBody>
            </Card>
            <Modal isOpen={editModalOpen} toggle={handleEditModalClose} size="md">
                <ModalHeader toggle={handleEditModalClose}>Edit Task</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleEditSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={editFormData.title}
                                onChange={handleEditChange}
                                invalid={!!errors.title}
                            />
                            {errors.title && <p className="text-danger">{errors.title}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <Input
                                type="text"
                                id="category"
                                name="category"
                                value={editFormData.category}
                                onChange={handleEditChange}
                                invalid={!!errors.category}
                            />
                            {errors.category && <p className="text-danger">{errors.category}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="textarea"
                                id="description"
                                name="description"
                                value={editFormData.description}
                                onChange={handleEditChange}
                                invalid={!!errors.description}
                            />
                            {errors.description && <p className="text-danger">{errors.description}</p>}
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="dueDate">Due Date</Label>
                                    <Input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={editFormData.dueDate}
                                        onChange={handleEditChange}
                                        invalid={!!errors.dueDate}
                                    />
                                    {errors.dueDate && <p className="text-danger">{errors.dueDate}</p>}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="priority">Priority</Label>
                                    <Input
                                        type="select"
                                        id="priority"
                                        name="priority"
                                        value={editFormData.priority}
                                        onChange={handleEditChange}
                                        invalid={!!errors.priority}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </Input>
                                    {errors.priority && <p className="text-danger">{errors.priority}</p>}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button color="primary" type="submit" block>Update</Button>
                    </Form>
                </ModalBody>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <SnackbarContent
                    sx={{
                        backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
                    }}
                    message={snackbarMessage}
                    onClose={handleCloseSnackbar}
                />
            </Snackbar>
        </div>
    );
};

export default TaskCard;
