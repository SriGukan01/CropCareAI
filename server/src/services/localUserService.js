const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

const USERS_FILE = path.join(__dirname, '..', '..', 'data', 'users_local.json');

const loadUsers = () => {
  try {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch (e) {
    logger.error(`Error loading local users: ${e.message}`);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (e) {
    logger.error(`Error saving local users: ${e.message}`);
  }
};

const findUserByEmail = (email) => {
  const users = loadUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

const findUserById = (id) => {
  const users = loadUsers();
  return users.find((u) => u.id === id || u._id === id);
};

const createUser = async ({ name, email, password, preferredLanguage, role = 'user' }) => {
  const users = loadUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = {
    _id: 'local_user_' + Date.now(),
    id: 'local_user_' + Date.now(),
    name,
    email: email.toLowerCase(),
    passwordHash,
    preferredLanguage: preferredLanguage || 'en',
    role,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
};

const verifyPassword = async (user, password) => {
  return bcrypt.compare(password, user.passwordHash);
};

module.exports = {
  loadUsers,
  findUserByEmail,
  findUserById,
  createUser,
  verifyPassword
};
