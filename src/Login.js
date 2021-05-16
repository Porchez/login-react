import './App.css';
import React, { useState } from 'react';
import doge from './doge.png';
import { Container, Form, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
function Login() {
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [isSigningUp, setIsSigningUp] = useState(false)

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
        const { email, password } = form
        const newErrors = {}
        // email errors
        if (!email || email === '') newErrors.email = 'Email is required!'
        // password errors
        if (!password || password === '') newErrors.password = 'Password is required!'
        return newErrors
    }

    const handleSignIn = (event) => {
        setIsSigningIn(true)
        event.preventDefault();
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsSigningIn(false)
        } else {
            setIsSigningIn(true)
        }
    }

    const handleSignUp = (event) => {
        setIsSigningUp(true)
        event.preventDefault();
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsSigningUp(false)
        } else {
            setIsSigningUp(true)
        }
    }

    const SignInButton = styled.button`
        border-radius: 3px;
        background-color: green;
        color: white;
        border: 1px solid;
        border-radius: 5px;
        padding: 0.5rem 1rem;
    `

    const SignUpButton = styled(SignInButton)`
        background-color: blue;
    `

    const formInput = (
        <Form onSubmit={handleSignIn}>
            <Form.Group controlId="formBasicEmail" className="mb-3 mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    onChange={e => setField('email', e.target.value)}
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={e => setField('password', e.target.value)}
                    isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex flex-row justify-content-between">
                <SignInButton name="button_sign_in" type="submit" className="mr-3">
                    <span className="d-flex flex-row align-items-center">
                        {isSigningIn && <Spinner className="mr-2" animation="border" size="sm" ></Spinner>}
                            Sign in
                    </span>
                </SignInButton>
                <SignUpButton name="button_sign_up" type="submit" variant="primary" onClick={handleSignUp}>
                    <span className="d-flex flex-row align-items-center">
                        {isSigningUp && <Spinner className="mr-2" animation="border" size="sm" ></Spinner>}
                            Sign up
                    </span>
                </SignUpButton>
            </div>
        </Form>
    );

    return (
        <Container className="p-5" >
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column ">
                    <div className="d-flex flex-row ">
                        <img src={doge} className="Logo-size mr-4" alt="logo" />
                        <h1> Sign in </h1>
                    </div>
                    {formInput}
                </div>
            </div>
        </Container>
    );
}

export default Login;