
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import EditTaskForm from './components/EditTaskForm';

function App() {
  return (
    <Router>

      <nav style={styles.nav}>
        <a href="#/">Login</a> |{" "}
        <a href="#/signup">Signup</a> |{" "}
        <a href="#/dashboard">Dashboard</a> |{" "}
        <a href="#/taskform">Task Form</a>
      </nav>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<EditTaskForm />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    padding: '10px',
    background: '#f0f0f0',
    textAlign: 'center',
    marginBottom: '20px'
  }
};

export default App;
