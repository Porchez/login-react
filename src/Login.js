import { Button, Container, Form, Spinner } from 'react-bootstrap';
import doge from './doge.png';
import React, { useState } from 'react';
import './App.css';

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

    const handleSubmit = (event) => {
        setIsSigningIn(true)
        event.preventDefault();
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            alert('Signing in...')
            setIsSigningIn(false)
        }
    }


    return (
        <Container className="p-5" >
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column ">
                    <div className="d-flex flex-row ">
                        <img src={doge} className="Logo-size mr-4" alt="logo" />
                        <h1> Sign in </h1>
                    </div>
                    <Form onSubmit={handleSubmit}>
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
                            <Button type="submit" variant="success" className="mr-3">
                                <span className="d-flex flex-row align-items-center">
                                    {isSigningIn && <Spinner className="mr-2" animation="border" size="sm" ></Spinner>}
                                         Sign in
                                    </span>
                            </Button>
                            <Button variant="primary">
                                <span className="d-flex flex-row align-items-center">
                                    {isSigningUp && <Spinner className="mr-2" animation="border" size="sm" ></Spinner>}
                                        Sign up
                                    </span>
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default Login;