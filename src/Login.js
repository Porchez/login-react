import { Button, Container, Form } from 'react-bootstrap';
import doge from './doge.png';
import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
        }
    }

    render() {
        return (
            <Container className="p-5" >
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column ">
                        <div className="d-flex flex-row ">
                            <img src={doge} className="Logo-size mr-4" alt="logo" />
                            <h1> Sign in </h1>
                        </div>
                        <Form>

                            <Form.Group controlId="formBasicEmail" className="mb-3 mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <div className="d-flex flex-row justify-content-start">
                                <Button variant="success" className="mr-3"> Sign in </Button>
                                <Button variant="primary"> Sign up </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
        );
    }
}
export default Login;