const BASE_URL = 'http://localhost:5000/api';

export const signupUser = async (data) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchTasks = async (token) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: { Authorization: token },
  });
  return res.json();
};

export const createTask = async (task, token) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, taskData, token) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(taskData),
  });
  return res.json();
};

export const fetchTaskById = async (id, token) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    headers: { Authorization: token },
  });
  return res.json();
};

export const deleteTaskApi = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || 'Failed to delete task.');
    }

    return data;
  } catch (error) {
    console.error(' Delete error:', error.message);
    return { error: true, msg: error.message };
  }
};

