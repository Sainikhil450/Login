import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation'; // Assuming you have a validation file for Signup
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/'); // Navigate to the login page on successful signup
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Enter name'
                            name="name"
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter Email'
                            name="email"
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter Password'
                            name="password"
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/Login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
