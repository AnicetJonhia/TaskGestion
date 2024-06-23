import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import CreateImage from '../../assets/images/Create/Create.gif';

const Create = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        category: '',
        priority: '',
    });
    const [errors, setErrors] = useState({});
    const [snackbarMsg, setSnackbarMsg] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            category: '',
            priority: '',
        });
        setErrors({});
    };

    const handleSnackbarClose = () => setSnackbarMsg(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.priority) newErrors.priority = 'Priority is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.post('http://localhost:5000/api/tasks/create-task', formData, config);
                setSnackbarMsg({ variant: 'success', message: response.data.msg });
                handleClose();
            } catch (error) {
                console.error('Error:', error);
                setSnackbarMsg({ variant: 'error', message: error.response.data.message || 'Something went wrong. Please try again.' });
            }
        } else {
            setErrors(newErrors);
        }
    };

    const action = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <>
            <Tooltip title="Add Task" placement="top-start">
                <Fab variant="extended" color="primary" aria-label="add" onClick={handleOpen}>
                    <AddIcon /> Create
                </Fab>
            </Tooltip>
            <Modal isOpen={open} toggle={handleClose} size="md">
                <ModalHeader toggle={handleClose}>
                    <img
                        src={CreateImage}
                        alt="Logo"
                        className="img-fluid rounded sidebar-logo"
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <span>Create Task</span>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
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
                                value={formData.category}
                                onChange={handleChange}
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
                                value={formData.description}
                                onChange={handleChange}
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
                                        value={formData.dueDate}
                                        onChange={handleChange}
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
                                        value={formData.priority}
                                        onChange={handleChange}
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
                        <Button color="primary" type="submit" block>Create</Button>
                    </Form>
                </ModalBody>
            </Modal>
            {snackbarMsg && (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={Boolean(snackbarMsg)}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <SnackbarContent
                        message={snackbarMsg.message}
                        action={action}
                        sx={{
                            backgroundColor: snackbarMsg.variant === 'success' ? 'green' : 'red',
                            color: 'white',
                        }}
                    />
                </Snackbar>

            )}
        </>
    );
};

export default Create;
