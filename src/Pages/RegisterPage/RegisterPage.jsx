import React, { useState } from 'react';
import './RegisterPage.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [PasswordHash, setPasswordHash] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://localhost:7099/api/User/register', { firstName, lastName, email, PasswordHash });
        const token = response.data.token;
        localStorage.setItem('authToken', token); 
        setError('');
        setShowError(false);
        window.location.href = 'https://localhost:3000/';
    } catch (error) {
        console.error('Error during registration:', error);
        setError('Ocorreu um erro durante o registro. Por favor, tente novamente.');
        setShowError(true);
    }
};


  return (
    <MDBContainer fluid className='d-flex justify-content-center align-items-center vh-100 p-4'>
      <MDBRow className='w-100'>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Nos Te ajudamos a <br />
            <span className="text-primary">Se Organizar!</span>
          </h1>
          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md='6' className='d-flex justify-content-center'>
          <MDBCard className='my-5 w-100' style={{ maxWidth: '500px' }}>
            <MDBCardBody className='p-5'>
              <form onSubmit={handleRegister}>
                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='First name'
                      id='firstName'
                      type='text'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </MDBCol>

                  <MDBCol col='6'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Last name'
                      id='lastName'
                      type='text'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass='mb-4'
                  label='Email'
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='PasswordHash'
                  id='PasswordHash'
                  type='PasswordHash'
                  value={PasswordHash}
                  onChange={(e) => setPasswordHash(e.target.value)}
                />


                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Sign Up</MDBBtn>

                <div className="text-center">
                  <p>or sign up with:</p>
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='facebook-f' size="sm"/>
                  </MDBBtn>
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='twitter' size="sm"/>
                  </MDBBtn>
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='google' size="sm"/>
                  </MDBBtn>
                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='github' size="sm"/>
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {showError && (
        <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x p-3" role="alert" style={{ zIndex: 1050 }}>
          {error}
        </div>
      )}
    </MDBContainer>
  );
}

export default RegisterPage;
