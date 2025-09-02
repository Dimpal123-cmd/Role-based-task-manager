
import React, { useState } from 'react';
import { signupUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await signupUser(form);
    if (res.msg === 'Signup successful') {
      alert(" Signup Successful! Please login.");
      navigate('/');
    } else {
      alert(res.msg);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Your Account</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={styles.input}
        />
        <select
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={styles.select}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.button}>Signup</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '360px',
    margin: '120px auto',
    padding: '30px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
    boxShadow: '0 8px 20px rgba(255, 126, 95, 0.5)',
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
  },
  title: {
    marginBottom: '25px',
    fontWeight: '700',
    letterSpacing: '1.1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    fontWeight: '600',
  },
  select: {
    margin: '12px 0',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    fontSize: '1rem',
  },
  button: {
    marginTop: '18px',
    padding: '13px 0',
    backgroundColor: '#4b134f',
    color: '#ffd700',
    fontWeight: '700',
    fontSize: '1.1rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default SignupForm;
