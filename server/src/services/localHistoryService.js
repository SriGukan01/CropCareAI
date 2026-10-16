const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'predictions_local.json');

const loadRecords = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    logger.error(`Error reading local predictions file: ${err.message}`);
    return [];
  }
};

const saveRecords = (records) => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    logger.error(`Error writing local predictions file: ${err.message}`);
  }
};

const addRecord = (prediction) => {
  try {
    const records = loadRecords();
    records.unshift(prediction);
    // Keep last 100 entries to prevent unbounded growth
    if (records.length > 100) {
      records.length = 100;
    }
    saveRecords(records);
    return prediction;
  } catch (err) {
    logger.error(`Error saving local prediction record: ${err.message}`);
    return prediction;
  }
};

const getRecords = (options = {}) => {
  let records = loadRecords();

  if (options.userId) {
    records = records.filter(
      (r) => !r.user || (r.user && r.user.toString() === options.userId.toString())
    );
  }

  if (options.status) {
    records = records.filter((r) => r.status === options.status);
  }

  if (options.search) {
    const s = options.search.toLowerCase();
    records = records.filter(
      (r) =>
        (r.finalLabel && r.finalLabel.toLowerCase().includes(s)) ||
        (r.disease && r.disease.name && r.disease.name.toLowerCase().includes(s))
    );
  }

  const total = records.length;
  const page = parseInt(options.page || '1', 10);
  const limit = parseInt(options.limit || '10', 10);
  const start = (page - 1) * limit;
  const paginated = records.slice(start, start + limit);

  return {
    predictions: paginated,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

const getRecordById = (id) => {
  const records = loadRecords();
  return records.find((r) => r._id === id || r.shareToken === id);
};

const deleteRecord = (id) => {
  const records = loadRecords();
  const index = records.findIndex((r) => r._id === id);
  if (index !== -1) {
    const removed = records.splice(index, 1)[0];
    saveRecords(records);
    return removed;
  }
  return null;
};

module.exports = {
  addRecord,
  getRecords,
  getRecordById,
  deleteRecord
};
