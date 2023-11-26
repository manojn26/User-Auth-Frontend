import { useState } from 'react'
import { Container, Form, Button } from "react-bootstrap"
import "../styles/SignUp.css"
import { Link } from "react-router-dom"
import axios from "axios"
import API_URL from "../../config/global"

const SignUp = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });



    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData);
        try {
            const response = await axios.post(`${API_URL}/signin/verify`, formData);
            console.log(response);
            if (response.data === true) {
                alert("Registration link sent to your mail id")
            } else if (response.data === false) {
                alert("You are already a user")
            }
        } catch (err) {
            console.log("Error During Registration", err)
        }
    }


    return (
        <Container>
            <h1>Registration Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Full Name : </Form.Label>
                    <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email : </Form.Label>
                    <Form.Control type='text' name='email' value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password : </Form.Label>
                    <Form.Control type='password' name='password' value={formData.password} onChange={handleChange} required />
                </Form.Group>

                <Button variant='primary' type='submit'>Register</Button>
                <br />
                <br />
                <p>Already have an Account <Link to="/login">Login</Link> </p>
            </Form>
        </Container>
    )
}

export default SignUp