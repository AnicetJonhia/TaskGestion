import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { Form, FormGroup, Input, Button, Card, CardBody, CardTitle, CardText, Row, Col, Modal,ModalBody} from 'reactstrap';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import LoginImage1 from '../assets/images/LoginImage1.gif'
import LoginImage2 from '../assets/images/LoginImage2.gif'
import Logo from "../assets/images/Logo.png";
const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => setIsOpen(!isOpen);
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { name, password });
      localStorage.setItem('token', response.data.accessToken);
      setSuccess('Login successful');
      toggleModal();
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      setError(error.response.data || 'Login failed');
      toggleModal();
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
      <div className="container-xxl justify-content-center h-100">
          <Row className="align-items-center d-flex m-xxl-5 h-100">
              <Col  className="d-none d-md-block">
                  <img
                    src={LoginImage1}
                    alt="Login Illustration"
                    className="img-fluid rounded"
                  />
              </Col>
              <Col className="lg-5" >
                  <Card className=" shadow-sm p-4 h-auto ">
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
                          <CardText className="text-center">Connect for continuing</CardText>
                          <Form onSubmit={handleSubmit}>
                              <FormGroup>
                                  <Input type="text" placeholder="Enter username" value={name} onChange={(e) => setName(e.target.value)} required />
                              </FormGroup>
                              <FormGroup>
                                  <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                              </FormGroup>

                              <Button type="submit" color={"primary"} className="w-100">Sign in</Button>
                          </Form>
                          <p className="text-center my-3">----- or continue with -----</p>
                          <div className="d-flex justify-content-center">
                              <FaGoogle className=" mx-2 text-success" style={{fontSize: '1.5rem', cursor: 'pointer'}}/>
                              <FaGithub className="mx-2" style={{fontSize: '1.5rem', cursor: 'pointer', color: '#333'}}/>
                              <FaFacebook className="mx-2 text-primary" style={{fontSize: '1.5rem', cursor: 'pointer'}}/>
                          </div>
                          <div className="text-center mt-3">
                              Not a member?
                              <Link to="/register"  className="text-danger text-decoration-none"> Register Now</Link>
                          </div>
                      </CardBody>
                  </Card>

              </Col>
               <Col  className="d-none d-md-block">
                  <img
                    src={LoginImage2}
                    alt="Login Illustration"
                    className="img-fluid rounded"
                  />
              </Col>
          </Row>

           {/* Modal pour afficher les erreurs et le succès */}
          <Modal isOpen={isOpen} toggle={toggleModal}>
            <ModalBody>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {!error && success && <p style={{ color: 'green' }}>{success}</p>}
            </ModalBody>
          </Modal>

      </div>
  );
};

export default Login;
