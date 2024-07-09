// import React, {useState} from 'react'
// import { Link } from "react-router-dom"
// import './SignupLogin.css'
// import toast from 'react-hot-toast';


// const Login = () => {

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const { email, password } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });


//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://127.0.0.1:8000/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();
//       toast.success('Login Successfully', {position:'top-right'});
//       setFormData({
//         email: '',
//         password: ''
//       });
//       console.log(data); // Handle successful login response
//     } catch (err) {
//       console.error(err); // Handle login error
//       toast.error('Login Failed');
//     }
//   };

//   return (
//     <>
//     <div className='loginSignup loginMargin'>
//         <h1 className='auth-head'>Login Your Self !</h1>
//         <div className='auth-inner'>
//             <h3>Login Form</h3>
//             <form onSubmit={onSubmit}>
//               <input type="email" placeholder='User Email' name="email" value={email} onChange={onChange} required autoComplete="off" />

//               <input type="password" placeholder='Password' name="password" value={password} onChange={onChange} required autoComplete="new-password"/>

//               <input type="submit" value='Login' className='login_btn' />

//               <div className="passwordHandl">
//                 <p>Change Password</p>
//                 <p>Forget Password</p>
//               </div>
//             </form>
//             <p>Don't have an account ? <Link to="/signup">Signup</Link></p>
//         </div> 
//     </div>
//     </>
//   )
// }

// export default Login



import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './SignupLogin.css';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // const [changePasswordData, setChangePasswordData] = useState({
  //   oldPassword: '',
  //   newPassword: '',
  //   confirmNewPassword: ''
  // });

  // const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  // const [showChangePassword, setShowChangePassword] = useState(false);
  // const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { email, password } = formData;
  // const { oldPassword, newPassword, confirmNewPassword } = changePasswordData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  // const onChangePassword = e => setChangePasswordData({ ...changePasswordData, [e.target.name]: e.target.value });
  // const onForgotPasswordEmailChange = e => setForgotPasswordEmail(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Login Successfully', { position: 'top-right' });
        localStorage.setItem('token', data.token.access); // Save the token
        setFormData({
          email: '',
          password: ''
        });
        console.log(data); // Handle successful login response
      } else {
        toast.error(data.errors?.non_field_errors?.[0] || 'Login Failed');
      }
    } catch (err) {
      console.error(err); // Handle login error
      toast.error('Login Failed');
    }
  };

  // const onChangePasswordSubmit = async e => {
  //   e.preventDefault();
  //   if (newPassword !== confirmNewPassword) {
  //     toast.error('Passwords do not match');
  //     return;
  //   }
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch('http://127.0.0.1:8000/changepassword/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({ password: newPassword, password2: confirmNewPassword })
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       toast.success('Password Changed Successfully', { position: 'top-right' });
  //       setChangePasswordData({
  //         oldPassword: '',
  //         newPassword: '',
  //         confirmNewPassword: ''
  //       });
  //     } else {
  //       toast.error(data.errors?.non_field_errors?.[0] || 'Password Change Failed');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('Password Change Failed');
  //   }
  // };

  // const onForgotPasswordSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/send-reset-password-email/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ email: forgotPasswordEmail })
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       toast.success('Password Reset Link Sent', { position: 'top-right' });
  //       setForgotPasswordEmail('');
  //     } else {
  //       toast.error(data.errors?.non_field_errors?.[0] || 'Failed to Send Reset Link');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('Failed to Send Reset Link');
  //   }
  // };

  return (
    <>
      <div className='loginSignup loginMargin'>
        <h1 className='auth-head'>Login Your Self !</h1>
        <div className='auth-inner'>
          <h3>Login Form</h3>
          <form onSubmit={onSubmit}>
            <input type="email" placeholder='User Email' name="email" value={email} onChange={onChange} required autoComplete="off" />
            <input type="password" placeholder='Password' name="password" value={password} onChange={onChange} required autoComplete="new-password" />
            <input type="submit" value='Login' className='login_btn' />
          </form>
          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          <div className="passwordHandle">
            <p><Link to="/change-password">Change Password</Link></p>
            <p><Link to="/forget-Password">Forget Password</Link></p>
            {/* <p><button type="button" onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button></p>
            <p><button type="button" onClick={() => setShowForgotPassword(!showForgotPassword)}>Forget Password</button></p> */}
          </div>
        </div>

        {/* Conditionally render the Change Password Form */}
        {/* {showChangePassword && (
          <div className='auth-inner'>
            <h3>Change Password</h3>
            <form onSubmit={onChangePasswordSubmit}>
              <input type="password" placeholder='Old Password' name="oldPassword" value={oldPassword} onChange={onChangePassword} required autoComplete="off" />
              <input type="password" placeholder='New Password' name="newPassword" value={newPassword} onChange={onChangePassword} required autoComplete="off" />
              <input type="password" placeholder='Confirm New Password' name="confirmNewPassword" value={confirmNewPassword} onChange={onChangePassword} required autoComplete="off" />
              <input type="submit" value='Change Password' className='login_btn' />
            </form>
          </div>
        )} */}

        {/* Conditionally render the Forgot Password Form */}
        {/* {showForgotPassword && (
          <div className='auth-inner'>
            <h3>Forgot Password</h3>
            <form onSubmit={onForgotPasswordSubmit}>
              <input type="email" placeholder='Enter your email' value={forgotPasswordEmail} onChange={onForgotPasswordEmailChange} required autoComplete="off" />
              <input type="submit" value='Send Reset Link' className='login_btn' />
            </form>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Login;



