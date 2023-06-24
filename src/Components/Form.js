import React, { useEffect, useState } from 'react'

export default function Form() {
    const initialData = { username: '', email: '', password: '', confirmPassword: '' }
    const [formValues, setFormValues] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true)
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)

        }
    }, [formErrors])

    const validate = (values) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        const errors = {};
        // name Validation 
        if (!values.username) {
            errors.username = 'username is required *'
        }
        // email Validation 
        if (!values.email) {
            errors.email = 'email is required *'
        } else if (!emailRegex.test(values.email)) {
            errors.email = 'this is not a valid email format *'
        }
        // password Validation 
        if (!values.password) {
            errors.password = 'password is required *'
        } else if (!passRegex.test(values.password)) {
            errors.password = ' atleast 8 character & contain one special,numeric,lowercase,uppercase character, *'
        }
        // confirmPassword Validation 
        if (!values.confirmPassword) {
            errors.confirmPassword = 'confirmPassword is required *'
        }
        else if (!passRegex.test(values.confirmPassword)) {
            errors.confirmPassword = ' atleast 8 character & contain one special,numeric,lowercase,uppercase character, *'
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'confirmPassword and passwaord is not match *'
        }
        return errors

    }
    return (
        <>
            <form onSubmit={submitHandler}>
                {Object.keys(formErrors).length === 0 && isSubmit ? <h3 style={{ color: 'green' }} className='text-center container my-4' >Register-successfully</h3> :
                    <div className='container my-4' style={{ border: '1px solid #9897A9', width: '480px', padding: '25px', borderRadius: '8px' }}>
                        <h3 className='text-center'>Registration-Form</h3>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className="form-label">Username</label>
                            <input autoComplete='off' value={formValues.usernamename} name='username' onChange={handleInputChange} type="text" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.username}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input autoComplete='off' value={formValues.email} name='email' onChange={handleInputChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.email}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                            <input autoComplete='off' value={formValues.password} name='password' onChange={handleInputChange} type="password" className="form-control" id="exampleInputPassword" />
                            <div id="emailHelp" className="form-text" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.password}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm-Password</label>
                            <input autoComplete='off' value={formValues.confirmPassword} name='confirmPassword' onChange={handleInputChange} type="password" className="form-control" id="exampleInputPassword1" />
                            <div id="emailHelp" className="form-text" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.confirmPassword}</div>
                        </div>

                        <button type="submit" style={{ width: '430px', padding: '8px', backgroundColor: '#8080FF', color: 'white', border: '1px solid #8080FF' }}>Register</button>
                    </div>}
            </form>
        </>
    )
}
