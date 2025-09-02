
import React, { useState } from 'react';
import { loginUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginUser({ email, password });

    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.user.role);
      localStorage.setItem('name', res.user.name);
      localStorage.setItem('id', res.user.id);

      alert(' Login Successful');
      navigate('/dashboard');
    } else {
      alert(res.msg || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login to Your Account</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p
        onClick={() => navigate('/signup')}
        style={styles.signupLink}
      >
        Don't have an account? <span style={{ color: '#007bff' }}>Sign up</span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: '350px',
    margin: '120px auto',
    padding: '30px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    boxShadow: '0 10px 25px rgba(37, 117, 252, 0.4)',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
  },
  title: {
    marginBottom: '25px',
    fontWeight: '700',
    letterSpacing: '1.2px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '6px',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    fontWeight: '600',
  },
  button: {
    marginTop: '15px',
    padding: '12px 0',
    backgroundColor: '#ffcc00',
    color: '#333',
    fontWeight: '700',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  signupLink: {
    marginTop: '18px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  }
};

export default LoginForm;
