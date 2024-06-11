import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, Input, Row, Modal, ModalBody } from "reactstrap";

import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

import RegisterImage1 from "../assets/images/RegisterImage1.gif";
import RegisterImage2 from "../assets/images/RegisterImage2.gif";
import Logo from "../assets/images/Logo.png"

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password!== confirmPassword) {
      setError('Passwords do not match');
      toggleModal();
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      if (response.data) {
        localStorage.setItem('token', response.data.accessToken);
        setSuccess('Registration successful');
        setIsOpen(true); // Ouvrir le modal pour afficher le message de succès
        setTimeout(() => {
          setIsOpen(false);
          navigate('/home');// Fermer le modal après 4 secondes
        }, 1000);

      } else {
        setError('Registration failed');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.msg || 'Registration failed');
      } else {
        setError('Registration failed');
      }
      toggleModal();
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
    <div className="container-xxl justify-content-center h-100">
      <Row className="align-items-center d-flex m-xxl-5 h-100">
        <Col className="d-none d-md-block">
          <img
            src={RegisterImage1}
            alt="Login Illustration"
            className="img-fluid rounded"
          />
        </Col>
        <Col className="lg-5">
          <Card className="shadow-sm p-4 h-auto ">
            <CardBody>
              <CardTitle tag="h1" className="text-center">
                <img
                  src={Logo}
                  alt="Login Illustration"
                  className="img-fluid rounded"
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                TaskGestion
              </CardTitle>
              <CardText className="text-center">Register for continuing</CardText>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input type="text" placeholder="Enter username" value={name}
                    onChange={(e) => setName(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <Input type="email" placeholder="Enter email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <Input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <Input type="password" placeholder="Confirm Password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} required />
                </FormGroup>

                <Button type="submit" color="primary" className="w-100">Sign up</Button>
              </Form>
              <p className="text-center my-3">----- or continue with -----</p>
              <div className="d-flex justify-content-center">
                <FaGoogle className=" mx-2 text-success" style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
                <FaGithub className="mx-2" style={{ fontSize: '1.5rem', cursor: 'pointer', color: '#333' }} />
                <FaFacebook className="mx-2 text-primary" style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
              </div>
              <div className="text-center mt-3">
                Already have an account??
                <Link to="/login" className="text-danger text-decoration-none"> Log In</Link>
              </div>
            </CardBody>
          </Card>

        </Col>
        <Col className="d-none d-md-block">
          <img
            src={RegisterImage2}
            alt="Login Illustration"
            className="img-fluid rounded"
          />
        </Col>
      </Row>

      {/* Modal pour afficher les erreurs et le succès */}
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalBody>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!error && success && <p style={{ color: 'green' }}>{success}</p>} {/* Affichage
           conditionnel du message
           de succès */}
        </ModalBody>

      </Modal>
    </div>
  );
};

export default Register;
