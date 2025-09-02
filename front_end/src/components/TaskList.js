import React from 'react';
import { useNavigate } from 'react-router-dom';

function TaskList({ tasks, reload }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(' Delete failed:', data);
        alert(data.msg || 'Failed to delete task.');
        return;
      }

      alert(data.msg || 'Task deleted successfully.');
      reload(); // Refresh tasks
    } catch (err) {
      console.error('Network error:', err);
      alert('Something went wrong while deleting the task.');
    }
  };

  return (
    <div style={styles.container}>
      {tasks.length === 0 ? (
        <p style={styles.noTask}>No tasks found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Status</th>
              {role === 'admin' && <th style={styles.th}>User</th>}
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id} style={styles.tr}>
                <td style={styles.td}>{t.title}</td>
                <td style={styles.td}>{t.description}</td>
                <td style={{ ...styles.td, textTransform: 'capitalize' }}>
                  {t.status.replace('-', ' ')}
                </td>
                {role === 'admin' && (
                  <td style={styles.td}>{t.userId?.name || 'N/A'}</td>
                )}
                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => navigate(`/edit-task/${t._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


const styles = {
  container: {
    overflowX: 'auto',
  },
  noTask: {
    color: '#777',
    fontSize: '1.1rem',
    textAlign: 'center',
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  theadRow: {
    backgroundColor: '#4a90e2',
    color: 'white',
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: '600',
  },
  tr: {
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s ease',
  },
  td: {
    padding: '12px 15px',
    verticalAlign: 'middle',
  },
  deleteBtn: {
    padding: '6px 14px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    marginLeft: '8px',
  },
  editBtn: {
    padding: '6px 14px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
};

export default TaskList;
