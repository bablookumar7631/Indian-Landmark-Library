import React,{useState} from 'react'
import { Link } from "react-router-dom"
import './SignupLogin.css'

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    tc: false
  });

  const { name, email, password, password2, tc } = formData;

  const onChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!tc) {
      console.error("Please agree to the Terms and Conditions");
    } else if (password !== password2) {
      console.error("Passwords do not match");
    } else {
      try {
        const response = await fetch('http://localhost:8000/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        setFormData({
          name: '',
          email: '',
          password: '',
          password2: '',
          tc: false
        });
        console.log(data); // Handle successful signup response
      } catch (err) {
        console.error(err); // Handle signup error
      }
    }
  };

  return (
    <>
    <div className='loginSignup'>
        <h1 className='auth-head'>Create Your Account !</h1>
        <div className='auth-inner'>
            <h3>Signup Form</h3>
            <form onSubmit={onSubmit}>
              <input type="text" placeholder='Username' name='name' value={name} onChange={onChange} required/>

              <input type="email" placeholder='Email Address' name='email' value={email}  onChange={onChange} required autoComplete="off"/>

              <input type="password" placeholder='Password' name='password' value={password} onChange={onChange} required autoComplete="new-password"/>

              <input type="password" placeholder='Confirm Password' name="password2" value={password2} onChange={onChange} required autoComplete="new-password"/>

              <div className="checkbox-container">
              <input
                type="checkbox"
                id="tc"
                name="tc"
                checked={tc}
                onChange={onChange}
                required
              />
              <label htmlFor="agreeToTerms">I agree to the Terms and Conditions</label>
              </div>

              <input type="submit" value='Sign up' className='login_btn' />
            </form>
            <p>Already have an account ? <Link to="/login">Login</Link></p>
        </div> 
    </div>
    </>
  )
}

export default Signup
