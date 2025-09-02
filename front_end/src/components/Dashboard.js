import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../utils/api';
import TaskList from './TaskList';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!token) return navigate('/');
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await fetchTasks(token);
    setTasks(res);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{role === 'admin' ? 'Admin' : 'User'} Dashboard</h2>
      <div style={styles.btnGroup}>
        <button onClick={() => navigate('/taskform')} style={styles.addBtn}>Add New Task</button>
        <button onClick={() => { localStorage.clear(); navigate('/'); }} style={styles.logoutBtn}>Logout</button>
      </div>
      <hr style={styles.hr} />
      {loading ? <p style={styles.loading}>Loading tasks...</p> : <TaskList tasks={tasks} reload={loadTasks} />}
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontWeight: '700',
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
  },
  btnGroup: {
    marginBottom: '20px',
  },
  addBtn: {
    padding: '10px 18px',
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: '7px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '15px',
    transition: 'background-color 0.3s ease',
  },
  logoutBtn: {
    padding: '10px 18px',
    backgroundColor: '#f44336',
    color: 'white',
    borderRadius: '7px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  hr: {
    margin: '15px 0 30px 0',
    borderColor: '#ddd',
  },
  loading: {
    fontSize: '1.1rem',
    color: '#666',
  }
};

export default Dashboard;
