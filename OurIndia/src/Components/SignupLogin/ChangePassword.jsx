import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './SignupLogin.css';
import toast from 'react-hot-toast';

const ChangePassword = () => {

  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const { oldPassword, newPassword, confirmNewPassword } = changePasswordData;

  const onChangePassword = e => setChangePasswordData({ ...changePasswordData, [e.target.name]: e.target.value });

  const onChangePasswordSubmit = async e => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/changepassword/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword, password2: confirmNewPassword })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Password Changed Successfully', { position: 'top-right' });
        setChangePasswordData({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      } else {
        toast.error(data.errors?.non_field_errors?.[0] || 'Password Change Failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Password Change Failed');
    }
  };

  return (
    <div className='loginSignup loginMargin'>
      <h1 className='auth-head'>Change Your Old Password !</h1>
      <div className='auth-inner'>
        <h3>Change Password</h3>
        <form onSubmit={onChangePasswordSubmit}>
          <input type="password" placeholder='Old Password' name="oldPassword" value={oldPassword} onChange={onChangePassword} required autoComplete="off" />
          <input type="password" placeholder='New Password' name="newPassword" value={newPassword} onChange={onChangePassword} required autoComplete="off" />
          <input type="password" placeholder='Confirm New Password' name="confirmNewPassword" value={confirmNewPassword} onChange={onChangePassword} required autoComplete="off" />
          <input type="submit" value='Change Password' className='login_btn' />
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
