
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'supersecretkey';

mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

// Task Schema
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// NEW: Login Schema
const LoginSchema = new mongoose.Schema({
  email: String,
  password: String, // hashed
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);
const Login = mongoose.model('Login', LoginSchema); // NEW

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access Denied. No token provided.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: 'All fields required.' });
  if (await User.findOne({ email })) return res.status(400).json({ msg: 'Email exists.' });

  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = await new User({ name, email, password: hashedPassword, role }).save();


  await new Login({ email, password: hashedPassword }).save();

  res.json({ msg: 'Signup successful' });
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'All fields required.' });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found' });
  if (!(await bcrypt.compare(password, user.password))) return res.status(400).json({ msg: 'Incorrect password' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
});

// Task Routes
app.get('/api/tasks', authMiddleware, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
  const tasks = await Task.find(filter).populate('userId', 'name');
  res.json(tasks);
});

app.get('/api/tasks/:id', authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  if (req.user.role !== 'admin' && task.userId.toString() !== req.user.id)
    return res.status(403).json({ msg: 'Not allowed' });
  res.json(task);
});

app.post('/api/tasks', authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description) return res.status(400).json({ msg: 'Title and description required' });

  const task = await new Task({
    title,
    description,
    status,
    userId: req.user.id,
  }).save();

  res.json(task);
});

app.put('/api/tasks/:id', authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  if (req.user.role !== 'admin' && task.userId.toString() !== req.user.id)
    return res.status(403).json({ msg: 'Not allowed' });

  const { title, description, status } = req.body;
  task.title = title;
  task.description = description;
  task.status = status;
  await task.save();

  res.json(task);
});

app.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ msg: 'Task not found' });

  //  Add debug logs
  console.log(' Deleting Task:', {
    userRole: req.user.role,
    taskUserId: task.userId?.toString(),
    currentUserId: req.user.id,
  });

  if (req.user.role !== 'admin' && task.userId?.toString() !== req.user.id) {
    return res.status(403).json({ msg: 'Not allowed' });
  }

  await task.deleteOne();
  res.json({ msg: 'Task deleted' });
});


const PORT = 5000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
