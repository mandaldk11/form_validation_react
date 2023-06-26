import React, { useEffect, useState } from 'react'
import Login from './Login';
// import Home from './Home';
export default function Form() {
    const initialValue = { username: '', email: '', password: '' }
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)


    const handleInput = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        setIsSubmit(true);
    }



    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
            localStorage.setItem('userData',JSON.stringify(formValues))
        }
    }, [formErrors])
    const validate = (values) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
        const errors = {}
        // name validation
        if (!values.username) {
            errors.username = 'name is required *'
        }
        // email validation
        if (!values.email) {
            errors.email = 'email is required *'
        }
        else if (!emailRegex.test(values.email)) {
            errors.email = 'please enter valid email*'
        }
        // password validation
        if (!values.password) {
            errors.password = 'password is required *'
        } else if (!passwordRegex.test(values.password)) {
            errors.password = 'password must contain one uppercase,lowercase,special,character minmum 8 character *'
        }
        return errors
    };



    return (
        <>
            {Object.keys(formErrors).length === 0 && isSubmit ? <Login/> : <div className='container my-4 mx-4' style={{ width: '450px', border: '1px solid grey',borderRadius:'8px', padding: '20px' }}>
                <form onSubmit={submitHandler}>
                    <h3 className='text-center'>Registration-page</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">username</label>
                        <input name='username' onChange={handleInput} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.username}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name='email' onChange={handleInput} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.email}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={handleInput} name='password' type="password" className="form-control" id="exampleInputPassword1" />
                        <div id="emailHelp" className="form-text" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.password}</div>
                    </div>

                    <button type="submit" style={{width:'400px'}} className="btn btn-primary">Submit</button>
                </form>
            </div>}

        </>
    )
}
