import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });
            console.log('Login successful:', response.data);
            setError('');
            setShowError(false);
        } catch (error) {
            console.error('Error during login:', error);
            setError('Ocorreu um erro durante o login. Por favor, verifique suas credenciais e tente novamente.');
            setShowError(true);
        }
    };

    return (
        <MDBContainer fluid className="d-flex flex-column justify-content-center align-items-center p-3 h-custom" style={{ minHeight: '100vh' }}>

            <MDBRow className="w-100 d-flex justify-content-center align-items-center">
                <MDBCol md='6' className="d-none d-md-flex justify-content-center align-items-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol md='6' className="d-flex justify-content-center">
                    <MDBCard className='w-75'>
                        <MDBCardBody className='p-5 mt-5'>
                            <div className="d-flex flex-column align-items-center">
                                <MDBInput
                                    wrapperClass='mb-4 w-75'
                                    label='Email address'
                                    id='formControlLg'
                                    type='email'
                                    size="md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4 w-75'
                                    label='Password'
                                    id='formControlLg'
                                    type='password'
                                    size="md"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <MDBBtn className="mb-0 px-5" size='lg' onClick={handleLogin}>Login</MDBBtn>
                                <p className="small fw-bold mt-2 pt-1 mb-2 text-center">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary w-100" style={{ position: 'absolute', bottom: 0 }}>
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>
            </div>

            {showError && (
                <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x m-3" role="alert" style={{ zIndex: 1050 }}>
                    {error}
                </div>
            )}

        </MDBContainer>
    );
}

export default LoginPage;
