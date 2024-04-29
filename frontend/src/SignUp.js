import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './SignUpValidation'
import axios from "axios";


function SignUp() {

  const[values, setValues] = useState({
    username: '',
    email: '',
    password: ''

  })

  // hook
  const navigate = useNavigate();

  const[errors, setErrors] = useState({})
 
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  // const handleInput = (event) => {
  //   setValues({ ...values, [event.target.name]: event.target.value });
  // };

  useEffect(() => {
    setErrors(validation(values));
  }, [values]);  


  const handleSubmit = (event) => {
    event.preventDefault();
   // setErrors(validation(values));


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const validationErrors = validation(values);
  //   setErrors(validationErrors);

    if(errors.username === "" && errors.email === "" && errors.password === ""){
      console.log(values);
      axios.post('http://localhost:8081/signup',values)
      .then(res => 
       navigate("/")
      )
      .catch((err )=> console.log(err))
    }
  }



  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const validationErrors = validation(values);
  //   setErrors(validationErrors);
  
  //   // Check validationErrors instead of errors
  //   if(validationErrors.username === "" && validationErrors.email === "" && validationErrors.password === ""){
  //     axios.post('http://localhost:8081/signup',values)
  //     .then(res => 
  //      navigate("/")
  //     )
  //     .catch(err => console.log(err))
  //   }
  // }
  

  return (
    <div className= ' d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-35'>
          <h2>SignUp</h2>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
                  <label htmlFor="username"><strong>Username</strong></label>
                  <input type="text" placeholder='Enter your name' name='username'
                  onChange={handleInput}  className='form-control rounded-0'></input>
                  {errors.username && <span className='text-danger'>{errors.username}</span>}

            </div>

            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='abc@gmail.com' name='email'
                onChange={handleInput} className='form-control rounded-0'></input>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
           
            </div>
            
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password'
                onChange={handleInput} className='form-control rounded-0'></input>
                {errors.password && <span className='text-danger'>{errors.password}</span>}

            </div>

            <button type='submit' className='btn btn-success w-100 rounded-0'><strong>SignUp</strong></button>
            <p>You are agree to our terms and policies</p>
            <Link to="/"  className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
          </form>
        </div>
    </div>
  )
}

export default SignUp
