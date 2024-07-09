import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/send-reset-password-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success(data.msg, { position: 'top-right' });
    } catch (err) {
      console.error('Error:', err.message || err);
      toast.error(err.message || 'Failed to send reset email. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className='forgetPass loginMargin'>
      <h1 className='auth-head'>Send Reset Email !</h1>
      <div className='auth-inner'>
        <h3>Send Mail</h3>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input type="submit" value='Send Reset Email' className='login_btn' />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;






