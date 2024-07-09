import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { uidb64, token } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match", { position: 'top-right' });
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/reset-password/${uidb64}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword, password2: confirmNewPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success(data.msg, { position: 'top-right' });
    } catch (err) {
      console.error('Error:', err.message || err);
      toast.error(err.message || 'Failed to reset password. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className='forgetPass loginMargin'>
      <h1 className='auth-head'>Reset Your Password !</h1>
      <div className='auth-inner'>
        <h3>Reset Password</h3>
        <form onSubmit={onSubmit}>
          <input
            type="password"
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            type="password"
            placeholder='Confirm New Password'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            autoComplete="off"
          />
          <input type="submit" value='Change Password' className='login_btn' />
        </form>
      </div>
    </div>
  )
}

export default SetNewPassword;


