
import React, { useState, useEffect } from 'react';
import { createTask } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo'
  });

  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      alert('You are not logged in!');
      navigate('/');
    } else {
      setToken(t);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createTask(task, token);

    if (res && res.title) {
      alert('Task created!');
      navigate('/dashboard');
    } else {
      alert('Error creating task.');
      console.error('Task create failed:', res);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Title"
          required
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Description"
          required
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          style={styles.input}
        />
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          style={styles.select}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" style={styles.button}>Create Task</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '450px',
    margin: '60px auto',
    padding: '25px',
    borderRadius: '15px',
    backgroundColor: '#e3f2fd',
    boxShadow: '0 8px 15px rgba(3, 169, 244, 0.3)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
  },
  title: {
    marginBottom: '28px',
    color: '#0277bd',
    fontWeight: '700',
    letterSpacing: '1.1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '14px 15px',
    margin: '10px 0',
    borderRadius: '7px',
    border: '1px solid #90caf9',
    outline: 'none',
    fontSize: '1rem',
    fontWeight: '600',
  },
  select: {
    padding: '12px',
    margin: '12px 0',
    borderRadius: '7px',
    border: '1px solid #90caf9',
    fontWeight: '600',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    marginTop: '18px',
    padding: '14px 0',
    backgroundColor: '#0288d1',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.1rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default TaskForm;
